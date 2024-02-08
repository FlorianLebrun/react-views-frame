
export class CallSite {
   status: number // -1: not stacked, 0: pending, 1: working, 2:resolved, 3:rejected

   self: Object
   proc: Function
   args: Array<any>
   next: CallSite
   back: CallSite

   _when: Promise<any>
   _resolve: Function
   _reject: Function
   _data: any

   constructor(self, proc, args) {
      this.status = -1
      this.self = self
      this.proc = proc
      this.args = args
   }
   containOf(proc): CallSite {
      for (let c = this as CallSite; c; c = c.back) {
         if (c.proc === proc && c.status < 2) {
            return c
         }
      }
   }
   abortAllOf(proc) {
      for (let c = this as CallSite; c; c = c.back) {
         if (c.proc === proc && c.status < 2) {
            this.abort("aborted")
         }
      }
   }
   abort(data) {
      if (this.status < 2) {
         this.status = 3
         this._data = data
         this._reject && this._reject(data)
         const nextCall = this.next
         if (nextCall) {
            this.next.back = null
            this.next = null
            nextCall._do()
         }
      }
      else if (this.status < 3) {
         throw new Error("'abort/complete' cannot applied twice on CallSite")
      }
   }
   complete(data) {
      if (this.status < 2) {
         this.status = 2
         this._data = data
         this._resolve && this._resolve(data)
         const nextCall = this.next
         if (nextCall) {
            this.next.back = null
            this.next = null
            nextCall._do()
         }
      }
      else if (this.status < 3) {
         throw new Error("'abort/complete' cannot applied twice on CallSite")
      }
   }
   when() {
      if (!this._when) {
         switch (this.status) {
            case 2:
               this._when = Promise.resolve(this._data)
               break
            case 3:
               this._when = Promise.reject(this._data)
               break
            default:
               this._when = new Promise((_resolve, _reject) => {
                  this._resolve = _resolve
                  this._reject = _reject
               })
         }
      }
      return this._when
   }
   _do() {
      if (this.status < 1) {
         this.status = 1
         try {
            let result = this.proc.apply(this.self, this.args)
            if (result instanceof Promise) {
               result.then(data => {
                  this.complete(data)
               }, e => {
                  this.abort(e)
               })
            }
            else {
               this.complete(result)
            }
         }
         catch (e) {
            this.abort(e)
         }
      }
      else {
         throw new Error("'_do' cannot applied twice on CallSite")
      }
   }
   execute(after: CallSite) {
      if (this.status < 0) {
         this.status = 0
         if (after) {
            if (after.next) {
               this.next = after.next
               this.next.back = this
            }
            if (after.status < 2 || after.back) {
               this.back = after
               after.next = this
            }
         }
         if (!this.back) {
            this._do()
         }
      }
      else {
         throw new Error("'execute' cannot applied twice on CallSite")
      }
   }
}

export default class CallChain {
   tos: CallSite
   call(self, proc, args): CallSite {
      const call = new CallSite(self, proc, args)
      call.execute(this.tos)
      this.tos = call
      return call
   }
   abortAllOf(proc: Function) {
      return this.tos && this.tos.abortAllOf(proc)
   }
   containOf(proc: Function): CallSite {
      return this.tos && this.tos.containOf(proc)
   }
}
