"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStorage = createStorage;
exports.deleteStorage = deleteStorage;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-use-before-define */
/* eslint-disable react/no-multi-comp */

var Storage = exports.Storage = function Storage() {
  _classCallCheck(this, Storage);
};

var storageIdGenerator = 0;
var storages = {};

function createStorage(id) {
  if (!id) id = "st" + storageIdGenerator++;
  storages[id] = new Storage();
}

function deleteStorage(id) {
  delete storages[id];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc3RvcmFnZS5qcyJdLCJuYW1lcyI6WyJjcmVhdGVTdG9yYWdlIiwiZGVsZXRlU3RvcmFnZSIsIlN0b3JhZ2UiLCJzdG9yYWdlSWRHZW5lcmF0b3IiLCJzdG9yYWdlcyIsImlkIl0sIm1hcHBpbmdzIjoiOzs7OztRQVNnQkEsYSxHQUFBQSxhO1FBS0FDLGEsR0FBQUEsYTs7OztBQWRoQjtBQUNBOztJQUVhQyxPLFdBQUFBLE87Ozs7QUFHYixJQUFJQyxxQkFBNkIsQ0FBakM7QUFDQSxJQUFNQyxXQUFrQyxFQUF4Qzs7QUFFTyxTQUFTSixhQUFULENBQXVCSyxFQUF2QixFQUFtQztBQUN4QyxNQUFJLENBQUNBLEVBQUwsRUFBU0EsS0FBSyxPQUFRRixvQkFBYjtBQUNUQyxXQUFTQyxFQUFULElBQWUsSUFBSUgsT0FBSixFQUFmO0FBQ0Q7O0FBRU0sU0FBU0QsYUFBVCxDQUF1QkksRUFBdkIsRUFBbUM7QUFDeEMsU0FBT0QsU0FBU0MsRUFBVCxDQUFQO0FBQ0QiLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIG5vLXVzZS1iZWZvcmUtZGVmaW5lICovXHJcbi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLW11bHRpLWNvbXAgKi9cclxuXHJcbmV4cG9ydCBjbGFzcyBTdG9yYWdlIHtcclxufVxyXG5cclxubGV0IHN0b3JhZ2VJZEdlbmVyYXRvcjogbnVtYmVyID0gMFxyXG5jb25zdCBzdG9yYWdlczogeyBbc3RyaW5nXTogU3RvcmFnZSB9ID0ge31cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdG9yYWdlKGlkOiBzdHJpbmcpIHtcclxuICBpZiAoIWlkKSBpZCA9IFwic3RcIiArIChzdG9yYWdlSWRHZW5lcmF0b3IrKylcclxuICBzdG9yYWdlc1tpZF0gPSBuZXcgU3RvcmFnZSgpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVTdG9yYWdlKGlkOiBzdHJpbmcpIHtcclxuICBkZWxldGUgc3RvcmFnZXNbaWRdXHJcbn0iXX0=