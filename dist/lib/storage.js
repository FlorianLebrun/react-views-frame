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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9BcHBsaWNhdGlvbi9zdG9yYWdlLmpzIl0sIm5hbWVzIjpbImNyZWF0ZVN0b3JhZ2UiLCJkZWxldGVTdG9yYWdlIiwiU3RvcmFnZSIsInN0b3JhZ2VJZEdlbmVyYXRvciIsInN0b3JhZ2VzIiwiaWQiXSwibWFwcGluZ3MiOiI7Ozs7O1FBU2dCQSxhLEdBQUFBLGE7UUFLQUMsYSxHQUFBQSxhOzs7O0FBZGhCO0FBQ0E7O0lBRWFDLE8sV0FBQUEsTzs7OztBQUdiLElBQUlDLHFCQUE2QixDQUFqQztBQUNBLElBQU1DLFdBQWtDLEVBQXhDOztBQUVPLFNBQVNKLGFBQVQsQ0FBdUJLLEVBQXZCLEVBQW1DO0FBQ3hDLE1BQUksQ0FBQ0EsRUFBTCxFQUFTQSxLQUFLLE9BQVFGLG9CQUFiO0FBQ1RDLFdBQVNDLEVBQVQsSUFBZSxJQUFJSCxPQUFKLEVBQWY7QUFDRDs7QUFFTSxTQUFTRCxhQUFULENBQXVCSSxFQUF2QixFQUFtQztBQUN4QyxTQUFPRCxTQUFTQyxFQUFULENBQVA7QUFDRCIsImZpbGUiOiJzdG9yYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tdXNlLWJlZm9yZS1kZWZpbmUgKi9cclxuLyogZXNsaW50LWRpc2FibGUgcmVhY3Qvbm8tbXVsdGktY29tcCAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0b3JhZ2Uge1xyXG59XHJcblxyXG5sZXQgc3RvcmFnZUlkR2VuZXJhdG9yOiBudW1iZXIgPSAwXHJcbmNvbnN0IHN0b3JhZ2VzOiB7IFtzdHJpbmddOiBTdG9yYWdlIH0gPSB7fVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0b3JhZ2UoaWQ6IHN0cmluZykge1xyXG4gIGlmICghaWQpIGlkID0gXCJzdFwiICsgKHN0b3JhZ2VJZEdlbmVyYXRvcisrKVxyXG4gIHN0b3JhZ2VzW2lkXSA9IG5ldyBTdG9yYWdlKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVN0b3JhZ2UoaWQ6IHN0cmluZykge1xyXG4gIGRlbGV0ZSBzdG9yYWdlc1tpZF1cclxufSJdfQ==