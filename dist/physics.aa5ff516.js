// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@splinetool/runtime/build/physics.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.World = exports.VectorOps = exports.Vector3 = exports.UnitMultibodyJoint = exports.UnitImpulseJoint = exports.Triangle = exports.TriMesh = exports.TempContactManifold = exports.TempContactForceEvent = exports.SphericalMultibodyJoint = exports.SphericalImpulseJoint = exports.SolverFlags = exports.ShapeType = exports.ShapeTOI = exports.ShapeContact = exports.ShapeColliderTOI = exports.Shape = exports.SerializationPipeline = exports.Segment = exports.SdpMatrix3Ops = exports.SdpMatrix3 = exports.RoundTriangle = exports.RoundCylinder = exports.RoundCuboid = exports.RoundConvexPolyhedron = exports.RoundCone = exports.RotationOps = exports.RigidBodyType = exports.RigidBodySet = exports.RigidBodyDesc = exports.RigidBody = exports.RevoluteMultibodyJoint = exports.RevoluteImpulseJoint = exports.RayIntersection = exports.RayColliderToi = exports.RayColliderIntersection = exports.Ray = exports.QueryPipeline = exports.QueryFilterFlags = exports.Quaternion = exports.PrismaticMultibodyJoint = exports.PrismaticImpulseJoint = exports.Polyline = exports.PointProjection = exports.PointColliderProjection = exports.PhysicsPipeline = exports.NarrowPhase = exports.MultibodyJointSet = exports.MultibodyJoint = exports.MotorModel = exports.MassPropsMode = exports.KinematicCharacterController = exports.JointType = exports.JointData = exports.IslandManager = exports.IntegrationParameters = exports.ImpulseJointSet = exports.ImpulseJoint = exports.Heightfield = exports.HalfSpace = exports.FixedMultibodyJoint = exports.FixedImpulseJoint = exports.FeatureType = exports.EventQueue = exports.DebugRenderPipeline = exports.DebugRenderBuffers = exports.Cylinder = exports.Cuboid = exports.ConvexPolyhedron = exports.Cone = exports.ColliderSet = exports.ColliderDesc = exports.Collider = exports.CoefficientCombineRule = exports.CharacterCollision = exports.Capsule = exports.CCDSolver = exports.BroadPhase = exports.Ball = exports.ActiveHooks = exports.ActiveEvents = exports.ActiveCollisionTypes = void 0;
exports.init = XI;
exports.version = VI;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var A;
var I = new Array(32).fill(void 0);
function g(A) {
  return I[A];
}
I.push(void 0, null, !0, !1);
var C = I.length;
function B(A) {
  var B = g(A);
  return function (A) {
    A < 36 || (I[A] = C, C = A);
  }(A), B;
}
function Q(A) {
  C === I.length && I.push(I.length + 1);
  var g = C;
  return C = I[g], I[g] = A, g;
}
function E(A) {
  return null == A;
}
var i = new Float64Array();
function D() {
  return 0 === i.byteLength && (i = new Float64Array(A.memory.buffer)), i;
}
var o = new Int32Array();
function G() {
  return 0 === o.byteLength && (o = new Int32Array(A.memory.buffer)), o;
}
var w = new TextDecoder("utf-8", {
  ignoreBOM: !0,
  fatal: !0
});
w.decode();
var k = new Uint8Array();
function S(I, g) {
  return w.decode((0 === k.byteLength && (k = new Uint8Array(A.memory.buffer)), k).subarray(I, I + g));
}
function a(A, I) {
  if (!(A instanceof I)) throw new Error("expected instance of ".concat(I.name));
  return A.ptr;
}
var M = new Float32Array();
function K() {
  return 0 === M.byteLength && (M = new Float32Array(A.memory.buffer)), M;
}
var y = 32;
function J(A) {
  if (1 == y) throw new Error("out of js stack");
  return I[--y] = A, y;
}
function U(A, I) {
  return K().subarray(A / 4, A / 4 + I);
}
var h = new Uint32Array();
function N() {
  return 0 === h.byteLength && (h = new Uint32Array(A.memory.buffer)), h;
}
var F = 0;
function q(A, I) {
  var g = I(4 * A.length);
  return K().set(A, g / 4), F = A.length, g;
}
function R(A, I) {
  var g = I(4 * A.length);
  return N().set(A, g / 4), F = A.length, g;
}
function s(I, g) {
  try {
    return I.apply(this, g);
  } catch (I) {
    A.__wbindgen_exn_store(Q(I));
  }
}
Object.freeze({
  Revolute: 0,
  0: "Revolute",
  Fixed: 1,
  1: "Fixed",
  Prismatic: 2,
  2: "Prismatic",
  Spherical: 3,
  3: "Spherical",
  Generic: 4,
  4: "Generic"
}), Object.freeze({
  AccelerationBased: 0,
  0: "AccelerationBased",
  ForceBased: 1,
  1: "ForceBased"
});
var c = Object.freeze({
  X: 0,
  0: "X",
  Y: 1,
  1: "Y",
  Z: 2,
  2: "Z",
  AngX: 3,
  3: "AngX",
  AngY: 4,
  4: "AngY",
  AngZ: 5,
  5: "AngZ"
});
Object.freeze({
  Dynamic: 0,
  0: "Dynamic",
  Fixed: 1,
  1: "Fixed",
  KinematicPositionBased: 2,
  2: "KinematicPositionBased",
  KinematicVelocityBased: 3,
  3: "KinematicVelocityBased"
}), Object.freeze({
  Vertex: 0,
  0: "Vertex",
  Edge: 1,
  1: "Edge",
  Face: 2,
  2: "Face",
  Unknown: 3,
  3: "Unknown"
}), Object.freeze({
  Ball: 0,
  0: "Ball",
  Cuboid: 1,
  1: "Cuboid",
  Capsule: 2,
  2: "Capsule",
  Segment: 3,
  3: "Segment",
  Polyline: 4,
  4: "Polyline",
  Triangle: 5,
  5: "Triangle",
  TriMesh: 6,
  6: "TriMesh",
  HeightField: 7,
  7: "HeightField",
  Compound: 8,
  8: "Compound",
  ConvexPolyhedron: 9,
  9: "ConvexPolyhedron",
  Cylinder: 10,
  10: "Cylinder",
  Cone: 11,
  11: "Cone",
  RoundCuboid: 12,
  12: "RoundCuboid",
  RoundTriangle: 13,
  13: "RoundTriangle",
  RoundCylinder: 14,
  14: "RoundCylinder",
  RoundCone: 15,
  15: "RoundCone",
  RoundConvexPolyhedron: 16,
  16: "RoundConvexPolyhedron",
  HalfSpace: 17,
  17: "HalfSpace"
});
var Y = /*#__PURE__*/function () {
  function Y() {
    _classCallCheck(this, Y);
    var I = A.rawbroadphase_new();
    return Y.__wrap(I);
  }
  _createClass(Y, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawbroadphase_free(I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(Y.prototype);
      return I.ptr = A, I;
    }
  }]);
  return Y;
}();
var L = /*#__PURE__*/function () {
  function L() {
    _classCallCheck(this, L);
    var I = A.rawccdsolver_new();
    return L.__wrap(I);
  }
  _createClass(L, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawccdsolver_free(I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(L.prototype);
      return I.ptr = A, I;
    }
  }]);
  return L;
}();
var H = /*#__PURE__*/function () {
  function H() {
    _classCallCheck(this, H);
    var I = A.rawcharactercollision_new();
    return H.__wrap(I);
  }
  _createClass(H, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawcharactercollision_free(I);
    }
  }, {
    key: "handle",
    value: function handle() {
      return A.rawcharactercollision_handle(this.ptr);
    }
  }, {
    key: "translationApplied",
    value: function translationApplied() {
      var I = A.rawcharactercollision_translationApplied(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "translationRemaining",
    value: function translationRemaining() {
      var I = A.rawcharactercollision_translationRemaining(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "toi",
    value: function toi() {
      return A.rawcharactercollision_toi(this.ptr);
    }
  }, {
    key: "worldWitness1",
    value: function worldWitness1() {
      var I = A.rawcharactercollision_worldWitness1(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "worldWitness2",
    value: function worldWitness2() {
      var I = A.rawcharactercollision_worldWitness2(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "worldNormal1",
    value: function worldNormal1() {
      var I = A.rawcharactercollision_worldNormal1(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "worldNormal2",
    value: function worldNormal2() {
      var I = A.rawcharactercollision_worldNormal2(this.ptr);
      return QA.__wrap(I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(H.prototype);
      return I.ptr = A, I;
    }
  }]);
  return H;
}();
var l = /*#__PURE__*/function () {
  function l() {
    _classCallCheck(this, l);
    var I = A.rawcolliderset_new();
    return l.__wrap(I);
  }
  _createClass(l, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawcolliderset_free(I);
    }
  }, {
    key: "coTranslation",
    value: function coTranslation(I) {
      var g = A.rawcolliderset_coTranslation(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "coRotation",
    value: function coRotation(I) {
      var g = A.rawcolliderset_coRotation(this.ptr, I);
      return _.__wrap(g);
    }
  }, {
    key: "coSetTranslation",
    value: function coSetTranslation(I, g, C, B) {
      A.rawcolliderset_coSetTranslation(this.ptr, I, g, C, B);
    }
  }, {
    key: "coSetTranslationWrtParent",
    value: function coSetTranslationWrtParent(I, g, C, B) {
      A.rawcolliderset_coSetTranslationWrtParent(this.ptr, I, g, C, B);
    }
  }, {
    key: "coSetRotation",
    value: function coSetRotation(I, g, C, B, Q) {
      A.rawcolliderset_coSetRotation(this.ptr, I, g, C, B, Q);
    }
  }, {
    key: "coSetRotationWrtParent",
    value: function coSetRotationWrtParent(I, g, C, B, Q) {
      A.rawcolliderset_coSetRotationWrtParent(this.ptr, I, g, C, B, Q);
    }
  }, {
    key: "coIsSensor",
    value: function coIsSensor(I) {
      return 0 !== A.rawcolliderset_coIsSensor(this.ptr, I);
    }
  }, {
    key: "coShapeType",
    value: function coShapeType(I) {
      return A.rawcolliderset_coShapeType(this.ptr, I) >>> 0;
    }
  }, {
    key: "coHalfspaceNormal",
    value: function coHalfspaceNormal(I) {
      var g = A.rawcolliderset_coHalfspaceNormal(this.ptr, I);
      return 0 === g ? void 0 : QA.__wrap(g);
    }
  }, {
    key: "coHalfExtents",
    value: function coHalfExtents(I) {
      var g = A.rawcolliderset_coHalfExtents(this.ptr, I);
      return 0 === g ? void 0 : QA.__wrap(g);
    }
  }, {
    key: "coSetHalfExtents",
    value: function coSetHalfExtents(I, g) {
      a(g, QA), A.rawcolliderset_coSetHalfExtents(this.ptr, I, g.ptr);
    }
  }, {
    key: "coRadius",
    value: function coRadius(I) {
      try {
        var _B = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawcolliderset_coRadius(_B, this.ptr, I);
        var g = G()[_B / 4 + 0],
          C = K()[_B / 4 + 1];
        return 0 === g ? void 0 : C;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "coSetRadius",
    value: function coSetRadius(I, g) {
      A.rawcolliderset_coSetRadius(this.ptr, I, g);
    }
  }, {
    key: "coHalfHeight",
    value: function coHalfHeight(I) {
      try {
        var _B2 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawcolliderset_coHalfHeight(_B2, this.ptr, I);
        var g = G()[_B2 / 4 + 0],
          C = K()[_B2 / 4 + 1];
        return 0 === g ? void 0 : C;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "coSetHalfHeight",
    value: function coSetHalfHeight(I, g) {
      A.rawcolliderset_coSetHalfHeight(this.ptr, I, g);
    }
  }, {
    key: "coRoundRadius",
    value: function coRoundRadius(I) {
      try {
        var _B3 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawcolliderset_coRoundRadius(_B3, this.ptr, I);
        var g = G()[_B3 / 4 + 0],
          C = K()[_B3 / 4 + 1];
        return 0 === g ? void 0 : C;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "coSetRoundRadius",
    value: function coSetRoundRadius(I, g) {
      A.rawcolliderset_coSetRoundRadius(this.ptr, I, g);
    }
  }, {
    key: "coVertices",
    value: function coVertices(I) {
      try {
        var _B4 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawcolliderset_coVertices(_B4, this.ptr, I);
        var g = G()[_B4 / 4 + 0],
          C = G()[_B4 / 4 + 1];
        var _Q;
        return 0 !== g && (_Q = U(g, C).slice(), A.__wbindgen_free(g, 4 * C)), _Q;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "coIndices",
    value: function coIndices(I) {
      try {
        var _B5 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawcolliderset_coIndices(_B5, this.ptr, I);
        var g = G()[_B5 / 4 + 0],
          C = G()[_B5 / 4 + 1];
        var _Q2;
        return 0 !== g && (_Q2 = function (A, I) {
          return N().subarray(A / 4, A / 4 + I);
        }(g, C).slice(), A.__wbindgen_free(g, 4 * C)), _Q2;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "coHeightfieldHeights",
    value: function coHeightfieldHeights(I) {
      try {
        var _B6 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawcolliderset_coHeightfieldHeights(_B6, this.ptr, I);
        var g = G()[_B6 / 4 + 0],
          C = G()[_B6 / 4 + 1];
        var _Q3;
        return 0 !== g && (_Q3 = U(g, C).slice(), A.__wbindgen_free(g, 4 * C)), _Q3;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "coHeightfieldScale",
    value: function coHeightfieldScale(I) {
      var g = A.rawcolliderset_coHeightfieldScale(this.ptr, I);
      return 0 === g ? void 0 : QA.__wrap(g);
    }
  }, {
    key: "coHeightfieldNRows",
    value: function coHeightfieldNRows(I) {
      try {
        var _B7 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawcolliderset_coHeightfieldNRows(_B7, this.ptr, I);
        var g = G()[_B7 / 4 + 0],
          C = G()[_B7 / 4 + 1];
        return 0 === g ? void 0 : C >>> 0;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "coHeightfieldNCols",
    value: function coHeightfieldNCols(I) {
      try {
        var _B8 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawcolliderset_coHeightfieldNCols(_B8, this.ptr, I);
        var g = G()[_B8 / 4 + 0],
          C = G()[_B8 / 4 + 1];
        return 0 === g ? void 0 : C >>> 0;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "coParent",
    value: function coParent(I) {
      try {
        var _B9 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawcolliderset_coParent(_B9, this.ptr, I);
        var g = G()[_B9 / 4 + 0],
          C = D()[_B9 / 8 + 1];
        return 0 === g ? void 0 : C;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "coSetEnabled",
    value: function coSetEnabled(I, g) {
      A.rawcolliderset_coSetEnabled(this.ptr, I, g);
    }
  }, {
    key: "coIsEnabled",
    value: function coIsEnabled(I) {
      return 0 !== A.rawcolliderset_coIsEnabled(this.ptr, I);
    }
  }, {
    key: "coFriction",
    value: function coFriction(I) {
      return A.rawcolliderset_coFriction(this.ptr, I);
    }
  }, {
    key: "coRestitution",
    value: function coRestitution(I) {
      return A.rawcolliderset_coRestitution(this.ptr, I);
    }
  }, {
    key: "coDensity",
    value: function coDensity(I) {
      return A.rawcolliderset_coDensity(this.ptr, I);
    }
  }, {
    key: "coMass",
    value: function coMass(I) {
      return A.rawcolliderset_coMass(this.ptr, I);
    }
  }, {
    key: "coVolume",
    value: function coVolume(I) {
      return A.rawcolliderset_coVolume(this.ptr, I);
    }
  }, {
    key: "coCollisionGroups",
    value: function coCollisionGroups(I) {
      return A.rawcolliderset_coCollisionGroups(this.ptr, I) >>> 0;
    }
  }, {
    key: "coSolverGroups",
    value: function coSolverGroups(I) {
      return A.rawcolliderset_coSolverGroups(this.ptr, I) >>> 0;
    }
  }, {
    key: "coActiveHooks",
    value: function coActiveHooks(I) {
      return A.rawcolliderset_coActiveHooks(this.ptr, I) >>> 0;
    }
  }, {
    key: "coActiveCollisionTypes",
    value: function coActiveCollisionTypes(I) {
      return A.rawcolliderset_coActiveCollisionTypes(this.ptr, I);
    }
  }, {
    key: "coActiveEvents",
    value: function coActiveEvents(I) {
      return A.rawcolliderset_coActiveEvents(this.ptr, I) >>> 0;
    }
  }, {
    key: "coContactForceEventThreshold",
    value: function coContactForceEventThreshold(I) {
      return A.rawcolliderset_coContactForceEventThreshold(this.ptr, I);
    }
  }, {
    key: "coContainsPoint",
    value: function coContainsPoint(I, g) {
      a(g, QA);
      return 0 !== A.rawcolliderset_coContainsPoint(this.ptr, I, g.ptr);
    }
  }, {
    key: "coCastShape",
    value: function coCastShape(I, g, C, B, Q, E, i, D) {
      a(g, QA), a(C, IA), a(B, QA), a(Q, _), a(E, QA);
      var o = A.rawcolliderset_coCastShape(this.ptr, I, g.ptr, C.ptr, B.ptr, Q.ptr, E.ptr, i, D);
      return 0 === o ? void 0 : BA.__wrap(o);
    }
  }, {
    key: "coCastCollider",
    value: function coCastCollider(I, g, C, B, Q, E) {
      a(g, QA), a(B, QA);
      var i = A.rawcolliderset_coCastCollider(this.ptr, I, g.ptr, C, B.ptr, Q, E);
      return 0 === i ? void 0 : gA.__wrap(i);
    }
  }, {
    key: "coIntersectsShape",
    value: function coIntersectsShape(I, g, C, B) {
      a(g, IA), a(C, QA), a(B, _);
      return 0 !== A.rawcolliderset_coIntersectsShape(this.ptr, I, g.ptr, C.ptr, B.ptr);
    }
  }, {
    key: "coContactShape",
    value: function coContactShape(I, g, C, B, Q) {
      a(g, IA), a(C, QA), a(B, _);
      var E = A.rawcolliderset_coContactShape(this.ptr, I, g.ptr, C.ptr, B.ptr, Q);
      return 0 === E ? void 0 : CA.__wrap(E);
    }
  }, {
    key: "coContactCollider",
    value: function coContactCollider(I, g, C) {
      var B = A.rawcolliderset_coContactCollider(this.ptr, I, g, C);
      return 0 === B ? void 0 : CA.__wrap(B);
    }
  }, {
    key: "coProjectPoint",
    value: function coProjectPoint(I, g, C) {
      a(g, QA);
      var B = A.rawcolliderset_coProjectPoint(this.ptr, I, g.ptr, C);
      return X.__wrap(B);
    }
  }, {
    key: "coIntersectsRay",
    value: function coIntersectsRay(I, g, C, B) {
      a(g, QA), a(C, QA);
      return 0 !== A.rawcolliderset_coIntersectsRay(this.ptr, I, g.ptr, C.ptr, B);
    }
  }, {
    key: "coCastRay",
    value: function coCastRay(I, g, C, B, Q) {
      a(g, QA), a(C, QA);
      return A.rawcolliderset_coCastRay(this.ptr, I, g.ptr, C.ptr, B, Q);
    }
  }, {
    key: "coCastRayAndGetNormal",
    value: function coCastRayAndGetNormal(I, g, C, B, Q) {
      a(g, QA), a(C, QA);
      var E = A.rawcolliderset_coCastRayAndGetNormal(this.ptr, I, g.ptr, C.ptr, B, Q);
      return 0 === E ? void 0 : u.__wrap(E);
    }
  }, {
    key: "coSetSensor",
    value: function coSetSensor(I, g) {
      A.rawcolliderset_coSetSensor(this.ptr, I, g);
    }
  }, {
    key: "coSetRestitution",
    value: function coSetRestitution(I, g) {
      A.rawcolliderset_coSetRestitution(this.ptr, I, g);
    }
  }, {
    key: "coSetFriction",
    value: function coSetFriction(I, g) {
      A.rawcolliderset_coSetFriction(this.ptr, I, g);
    }
  }, {
    key: "coFrictionCombineRule",
    value: function coFrictionCombineRule(I) {
      return A.rawcolliderset_coFrictionCombineRule(this.ptr, I) >>> 0;
    }
  }, {
    key: "coSetFrictionCombineRule",
    value: function coSetFrictionCombineRule(I, g) {
      A.rawcolliderset_coSetFrictionCombineRule(this.ptr, I, g);
    }
  }, {
    key: "coRestitutionCombineRule",
    value: function coRestitutionCombineRule(I) {
      return A.rawcolliderset_coRestitutionCombineRule(this.ptr, I) >>> 0;
    }
  }, {
    key: "coSetRestitutionCombineRule",
    value: function coSetRestitutionCombineRule(I, g) {
      A.rawcolliderset_coSetRestitutionCombineRule(this.ptr, I, g);
    }
  }, {
    key: "coSetCollisionGroups",
    value: function coSetCollisionGroups(I, g) {
      A.rawcolliderset_coSetCollisionGroups(this.ptr, I, g);
    }
  }, {
    key: "coSetSolverGroups",
    value: function coSetSolverGroups(I, g) {
      A.rawcolliderset_coSetSolverGroups(this.ptr, I, g);
    }
  }, {
    key: "coSetActiveHooks",
    value: function coSetActiveHooks(I, g) {
      A.rawcolliderset_coSetActiveHooks(this.ptr, I, g);
    }
  }, {
    key: "coSetActiveEvents",
    value: function coSetActiveEvents(I, g) {
      A.rawcolliderset_coSetActiveEvents(this.ptr, I, g);
    }
  }, {
    key: "coSetActiveCollisionTypes",
    value: function coSetActiveCollisionTypes(I, g) {
      A.rawcolliderset_coSetActiveCollisionTypes(this.ptr, I, g);
    }
  }, {
    key: "coSetShape",
    value: function coSetShape(I, g) {
      a(g, IA), A.rawcolliderset_coSetShape(this.ptr, I, g.ptr);
    }
  }, {
    key: "coSetContactForceEventThreshold",
    value: function coSetContactForceEventThreshold(I, g) {
      A.rawcolliderset_coSetContactForceEventThreshold(this.ptr, I, g);
    }
  }, {
    key: "coSetDensity",
    value: function coSetDensity(I, g) {
      A.rawcolliderset_coSetDensity(this.ptr, I, g);
    }
  }, {
    key: "coSetMass",
    value: function coSetMass(I, g) {
      A.rawcolliderset_coSetMass(this.ptr, I, g);
    }
  }, {
    key: "coSetMassProperties",
    value: function coSetMassProperties(I, g, C, B, Q) {
      a(C, QA), a(B, QA), a(Q, _), A.rawcolliderset_coSetMassProperties(this.ptr, I, g, C.ptr, B.ptr, Q.ptr);
    }
  }, {
    key: "len",
    value: function len() {
      return A.rawcolliderset_len(this.ptr) >>> 0;
    }
  }, {
    key: "contains",
    value: function contains(I) {
      return 0 !== A.rawcolliderset_contains(this.ptr, I);
    }
  }, {
    key: "createCollider",
    value: function createCollider(I, g, C, B, Q, E, i, o, w, k, S, M, K, y, J, U, h, N, F, q, R, s, c, Y) {
      try {
        var _l = A.__wbindgen_add_to_stack_pointer(-16);
        a(g, IA), a(C, QA), a(B, _), a(i, QA), a(o, QA), a(w, _), a(Y, v), A.rawcolliderset_createCollider(_l, this.ptr, I, g.ptr, C.ptr, B.ptr, Q, E, i.ptr, o.ptr, w.ptr, k, S, M, K, y, J, U, h, N, F, q, R, s, c, Y.ptr);
        var L = G()[_l / 4 + 0],
          H = D()[_l / 8 + 1];
        return 0 === L ? void 0 : H;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "remove",
    value: function remove(I, g, C, B) {
      a(g, b), a(C, v), A.rawcolliderset_remove(this.ptr, I, g.ptr, C.ptr, B);
    }
  }, {
    key: "isHandleValid",
    value: function isHandleValid(I) {
      return 0 !== A.rawcolliderset_contains(this.ptr, I);
    }
  }, {
    key: "forEachColliderHandle",
    value: function forEachColliderHandle(g) {
      try {
        A.rawcolliderset_forEachColliderHandle(this.ptr, J(g));
      } finally {
        I[y++] = void 0;
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(l.prototype);
      return I.ptr = A, I;
    }
  }]);
  return l;
}();
var t = /*#__PURE__*/function () {
  function t() {
    _classCallCheck(this, t);
  }
  _createClass(t, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawcontactforceevent_free(I);
    }
  }, {
    key: "collider1",
    value: function collider1() {
      return A.rawcharactercollision_handle(this.ptr);
    }
  }, {
    key: "collider2",
    value: function collider2() {
      return A.rawcontactforceevent_collider2(this.ptr);
    }
  }, {
    key: "total_force",
    value: function total_force() {
      var I = A.rawcontactforceevent_total_force(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "total_force_magnitude",
    value: function total_force_magnitude() {
      return A.rawcontactforceevent_total_force_magnitude(this.ptr);
    }
  }, {
    key: "max_force_direction",
    value: function max_force_direction() {
      var I = A.rawcontactforceevent_max_force_direction(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "max_force_magnitude",
    value: function max_force_magnitude() {
      return A.rawcontactforceevent_max_force_magnitude(this.ptr);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(t.prototype);
      return I.ptr = A, I;
    }
  }]);
  return t;
}();
var p = /*#__PURE__*/function () {
  function p() {
    _classCallCheck(this, p);
  }
  _createClass(p, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawcontactmanifold_free(I);
    }
  }, {
    key: "normal",
    value: function normal() {
      var I = A.rawcontactmanifold_normal(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "local_n1",
    value: function local_n1() {
      var I = A.rawcontactmanifold_local_n1(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "local_n2",
    value: function local_n2() {
      var I = A.rawcontactmanifold_local_n2(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "subshape1",
    value: function subshape1() {
      return A.rawcontactmanifold_subshape1(this.ptr) >>> 0;
    }
  }, {
    key: "subshape2",
    value: function subshape2() {
      return A.rawcontactmanifold_subshape2(this.ptr) >>> 0;
    }
  }, {
    key: "num_contacts",
    value: function num_contacts() {
      return A.rawcontactmanifold_num_contacts(this.ptr) >>> 0;
    }
  }, {
    key: "contact_local_p1",
    value: function contact_local_p1(I) {
      var g = A.rawcontactmanifold_contact_local_p1(this.ptr, I);
      return 0 === g ? void 0 : QA.__wrap(g);
    }
  }, {
    key: "contact_local_p2",
    value: function contact_local_p2(I) {
      var g = A.rawcontactmanifold_contact_local_p2(this.ptr, I);
      return 0 === g ? void 0 : QA.__wrap(g);
    }
  }, {
    key: "contact_dist",
    value: function contact_dist(I) {
      return A.rawcontactmanifold_contact_dist(this.ptr, I);
    }
  }, {
    key: "contact_fid1",
    value: function contact_fid1(I) {
      return A.rawcontactmanifold_contact_fid1(this.ptr, I) >>> 0;
    }
  }, {
    key: "contact_fid2",
    value: function contact_fid2(I) {
      return A.rawcontactmanifold_contact_fid2(this.ptr, I) >>> 0;
    }
  }, {
    key: "contact_impulse",
    value: function contact_impulse(I) {
      return A.rawcontactmanifold_contact_impulse(this.ptr, I);
    }
  }, {
    key: "contact_tangent_impulse_x",
    value: function contact_tangent_impulse_x(I) {
      return A.rawcontactmanifold_contact_tangent_impulse_x(this.ptr, I);
    }
  }, {
    key: "contact_tangent_impulse_y",
    value: function contact_tangent_impulse_y(I) {
      return A.rawcontactmanifold_contact_tangent_impulse_y(this.ptr, I);
    }
  }, {
    key: "num_solver_contacts",
    value: function num_solver_contacts() {
      return A.rawcontactmanifold_num_solver_contacts(this.ptr) >>> 0;
    }
  }, {
    key: "solver_contact_point",
    value: function solver_contact_point(I) {
      var g = A.rawcontactmanifold_solver_contact_point(this.ptr, I);
      return 0 === g ? void 0 : QA.__wrap(g);
    }
  }, {
    key: "solver_contact_dist",
    value: function solver_contact_dist(I) {
      return A.rawcontactmanifold_solver_contact_dist(this.ptr, I);
    }
  }, {
    key: "solver_contact_friction",
    value: function solver_contact_friction(I) {
      return A.rawcontactmanifold_solver_contact_friction(this.ptr, I);
    }
  }, {
    key: "solver_contact_restitution",
    value: function solver_contact_restitution(I) {
      return A.rawcontactmanifold_solver_contact_restitution(this.ptr, I);
    }
  }, {
    key: "solver_contact_tangent_velocity",
    value: function solver_contact_tangent_velocity(I) {
      var g = A.rawcontactmanifold_solver_contact_tangent_velocity(this.ptr, I);
      return QA.__wrap(g);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(p.prototype);
      return I.ptr = A, I;
    }
  }]);
  return p;
}();
var e = /*#__PURE__*/function () {
  function e() {
    _classCallCheck(this, e);
  }
  _createClass(e, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawcontactpair_free(I);
    }
  }, {
    key: "collider1",
    value: function collider1() {
      return A.rawcontactpair_collider1(this.ptr);
    }
  }, {
    key: "collider2",
    value: function collider2() {
      return A.rawcontactpair_collider2(this.ptr);
    }
  }, {
    key: "numContactManifolds",
    value: function numContactManifolds() {
      return A.rawcontactpair_numContactManifolds(this.ptr) >>> 0;
    }
  }, {
    key: "contactManifold",
    value: function contactManifold(I) {
      var g = A.rawcontactpair_contactManifold(this.ptr, I);
      return 0 === g ? void 0 : p.__wrap(g);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(e.prototype);
      return I.ptr = A, I;
    }
  }]);
  return e;
}();
var r = /*#__PURE__*/function () {
  function r() {
    _classCallCheck(this, r);
    var I = A.rawdebugrenderpipeline_new();
    return r.__wrap(I);
  }
  _createClass(r, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawdebugrenderpipeline_free(I);
    }
  }, {
    key: "vertices",
    value: function vertices() {
      return B(A.rawdebugrenderpipeline_vertices(this.ptr));
    }
  }, {
    key: "colors",
    value: function colors() {
      return B(A.rawdebugrenderpipeline_colors(this.ptr));
    }
  }, {
    key: "render",
    value: function render(I, g, C, B, Q) {
      a(I, v), a(g, l), a(C, n), a(B, j), a(Q, x), A.rawdebugrenderpipeline_render(this.ptr, I.ptr, g.ptr, C.ptr, B.ptr, Q.ptr);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(r.prototype);
      return I.ptr = A, I;
    }
  }]);
  return r;
}();
var d = /*#__PURE__*/function () {
  function d() {
    _classCallCheck(this, d);
  }
  _createClass(d, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawdeserializedworld_free(I);
    }
  }, {
    key: "takeGravity",
    value: function takeGravity() {
      var I = A.rawdeserializedworld_takeGravity(this.ptr);
      return 0 === I ? void 0 : QA.__wrap(I);
    }
  }, {
    key: "takeIntegrationParameters",
    value: function takeIntegrationParameters() {
      var I = A.rawdeserializedworld_takeIntegrationParameters(this.ptr);
      return 0 === I ? void 0 : Z.__wrap(I);
    }
  }, {
    key: "takeIslandManager",
    value: function takeIslandManager() {
      var I = A.rawdeserializedworld_takeIslandManager(this.ptr);
      return 0 === I ? void 0 : b.__wrap(I);
    }
  }, {
    key: "takeBroadPhase",
    value: function takeBroadPhase() {
      var I = A.rawdeserializedworld_takeBroadPhase(this.ptr);
      return 0 === I ? void 0 : Y.__wrap(I);
    }
  }, {
    key: "takeNarrowPhase",
    value: function takeNarrowPhase() {
      var I = A.rawdeserializedworld_takeNarrowPhase(this.ptr);
      return 0 === I ? void 0 : x.__wrap(I);
    }
  }, {
    key: "takeBodies",
    value: function takeBodies() {
      var I = A.rawdeserializedworld_takeBodies(this.ptr);
      return 0 === I ? void 0 : v.__wrap(I);
    }
  }, {
    key: "takeColliders",
    value: function takeColliders() {
      var I = A.rawdeserializedworld_takeColliders(this.ptr);
      return 0 === I ? void 0 : l.__wrap(I);
    }
  }, {
    key: "takeImpulseJoints",
    value: function takeImpulseJoints() {
      var I = A.rawdeserializedworld_takeImpulseJoints(this.ptr);
      return 0 === I ? void 0 : n.__wrap(I);
    }
  }, {
    key: "takeMultibodyJoints",
    value: function takeMultibodyJoints() {
      var I = A.rawdeserializedworld_takeMultibodyJoints(this.ptr);
      return 0 === I ? void 0 : j.__wrap(I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(d.prototype);
      return I.ptr = A, I;
    }
  }]);
  return d;
}();
var T = /*#__PURE__*/function () {
  function T(I) {
    _classCallCheck(this, T);
    var g = A.raweventqueue_new(I);
    return T.__wrap(g);
  }
  _createClass(T, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_raweventqueue_free(I);
    }
  }, {
    key: "drainCollisionEvents",
    value: function drainCollisionEvents(g) {
      try {
        A.raweventqueue_drainCollisionEvents(this.ptr, J(g));
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "drainContactForceEvents",
    value: function drainContactForceEvents(g) {
      try {
        A.raweventqueue_drainContactForceEvents(this.ptr, J(g));
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      A.raweventqueue_clear(this.ptr);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(T.prototype);
      return I.ptr = A, I;
    }
  }]);
  return T;
}();
var O = /*#__PURE__*/function () {
  function O() {
    _classCallCheck(this, O);
  }
  _createClass(O, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawgenericjoint_free(I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(O.prototype);
      return I.ptr = A, I;
    }
  }, {
    key: "spherical",
    value: function spherical(I, g) {
      a(I, QA), a(g, QA);
      var C = A.rawgenericjoint_spherical(I.ptr, g.ptr);
      return O.__wrap(C);
    }
  }, {
    key: "prismatic",
    value: function prismatic(I, g, C, B, Q, E) {
      a(I, QA), a(g, QA), a(C, QA);
      var i = A.rawgenericjoint_prismatic(I.ptr, g.ptr, C.ptr, B, Q, E);
      return 0 === i ? void 0 : O.__wrap(i);
    }
  }, {
    key: "fixed",
    value: function fixed(I, g, C, B) {
      a(I, QA), a(g, _), a(C, QA), a(B, _);
      var Q = A.rawgenericjoint_fixed(I.ptr, g.ptr, C.ptr, B.ptr);
      return O.__wrap(Q);
    }
  }, {
    key: "revolute",
    value: function revolute(I, g, C) {
      a(I, QA), a(g, QA), a(C, QA);
      var B = A.rawgenericjoint_revolute(I.ptr, g.ptr, C.ptr);
      return 0 === B ? void 0 : O.__wrap(B);
    }
  }]);
  return O;
}();
var n = /*#__PURE__*/function () {
  function n() {
    _classCallCheck(this, n);
    var I = A.rawimpulsejointset_new();
    return n.__wrap(I);
  }
  _createClass(n, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawimpulsejointset_free(I);
    }
  }, {
    key: "jointType",
    value: function jointType(I) {
      return A.rawimpulsejointset_jointType(this.ptr, I) >>> 0;
    }
  }, {
    key: "jointBodyHandle1",
    value: function jointBodyHandle1(I) {
      return A.rawimpulsejointset_jointBodyHandle1(this.ptr, I);
    }
  }, {
    key: "jointBodyHandle2",
    value: function jointBodyHandle2(I) {
      return A.rawimpulsejointset_jointBodyHandle2(this.ptr, I);
    }
  }, {
    key: "jointFrameX1",
    value: function jointFrameX1(I) {
      var g = A.rawimpulsejointset_jointFrameX1(this.ptr, I);
      return _.__wrap(g);
    }
  }, {
    key: "jointFrameX2",
    value: function jointFrameX2(I) {
      var g = A.rawimpulsejointset_jointFrameX2(this.ptr, I);
      return _.__wrap(g);
    }
  }, {
    key: "jointAnchor1",
    value: function jointAnchor1(I) {
      var g = A.rawimpulsejointset_jointAnchor1(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "jointAnchor2",
    value: function jointAnchor2(I) {
      var g = A.rawimpulsejointset_jointAnchor2(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "jointSetAnchor1",
    value: function jointSetAnchor1(I, g) {
      a(g, QA), A.rawimpulsejointset_jointSetAnchor1(this.ptr, I, g.ptr);
    }
  }, {
    key: "jointSetAnchor2",
    value: function jointSetAnchor2(I, g) {
      a(g, QA), A.rawimpulsejointset_jointSetAnchor2(this.ptr, I, g.ptr);
    }
  }, {
    key: "jointContactsEnabled",
    value: function jointContactsEnabled(I) {
      return 0 !== A.rawimpulsejointset_jointContactsEnabled(this.ptr, I);
    }
  }, {
    key: "jointSetContactsEnabled",
    value: function jointSetContactsEnabled(I, g) {
      A.rawimpulsejointset_jointSetContactsEnabled(this.ptr, I, g);
    }
  }, {
    key: "jointLimitsEnabled",
    value: function jointLimitsEnabled(I, g) {
      return 0 !== A.rawimpulsejointset_jointLimitsEnabled(this.ptr, I, g);
    }
  }, {
    key: "jointLimitsMin",
    value: function jointLimitsMin(I, g) {
      return A.rawimpulsejointset_jointLimitsMin(this.ptr, I, g);
    }
  }, {
    key: "jointLimitsMax",
    value: function jointLimitsMax(I, g) {
      return A.rawimpulsejointset_jointLimitsMax(this.ptr, I, g);
    }
  }, {
    key: "jointSetLimits",
    value: function jointSetLimits(I, g, C, B) {
      A.rawimpulsejointset_jointSetLimits(this.ptr, I, g, C, B);
    }
  }, {
    key: "jointConfigureMotorModel",
    value: function jointConfigureMotorModel(I, g, C) {
      A.rawimpulsejointset_jointConfigureMotorModel(this.ptr, I, g, C);
    }
  }, {
    key: "jointConfigureMotorVelocity",
    value: function jointConfigureMotorVelocity(I, g, C, B) {
      A.rawimpulsejointset_jointConfigureMotorVelocity(this.ptr, I, g, C, B);
    }
  }, {
    key: "jointConfigureMotorPosition",
    value: function jointConfigureMotorPosition(I, g, C, B, Q) {
      A.rawimpulsejointset_jointConfigureMotorPosition(this.ptr, I, g, C, B, Q);
    }
  }, {
    key: "jointConfigureMotor",
    value: function jointConfigureMotor(I, g, C, B, Q, E) {
      A.rawimpulsejointset_jointConfigureMotor(this.ptr, I, g, C, B, Q, E);
    }
  }, {
    key: "createJoint",
    value: function createJoint(I, g, C, B) {
      a(I, O);
      return A.rawimpulsejointset_createJoint(this.ptr, I.ptr, g, C, B);
    }
  }, {
    key: "remove",
    value: function remove(I, g) {
      A.rawimpulsejointset_remove(this.ptr, I, g);
    }
  }, {
    key: "len",
    value: function len() {
      return A.rawimpulsejointset_len(this.ptr) >>> 0;
    }
  }, {
    key: "contains",
    value: function contains(I) {
      return 0 !== A.rawimpulsejointset_contains(this.ptr, I);
    }
  }, {
    key: "forEachJointHandle",
    value: function forEachJointHandle(g) {
      try {
        A.rawimpulsejointset_forEachJointHandle(this.ptr, J(g));
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "forEachJointAttachedToRigidBody",
    value: function forEachJointAttachedToRigidBody(g, C) {
      try {
        A.rawimpulsejointset_forEachJointAttachedToRigidBody(this.ptr, g, J(C));
      } finally {
        I[y++] = void 0;
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(n.prototype);
      return I.ptr = A, I;
    }
  }]);
  return n;
}();
var Z = /*#__PURE__*/function () {
  function Z() {
    _classCallCheck(this, Z);
    var I = A.rawintegrationparameters_new();
    return Z.__wrap(I);
  }
  _createClass(Z, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawintegrationparameters_free(I);
    }
  }, {
    key: "dt",
    get: function get() {
      return A.rawintegrationparameters_dt(this.ptr);
    },
    set: function set(I) {
      A.rawintegrationparameters_set_dt(this.ptr, I);
    }
  }, {
    key: "erp",
    get: function get() {
      return A.rawcharactercollision_toi(this.ptr);
    },
    set: function set(I) {
      A.rawintegrationparameters_set_erp(this.ptr, I);
    }
  }, {
    key: "allowedLinearError",
    get: function get() {
      return A.rawintegrationparameters_allowedLinearError(this.ptr);
    },
    set: function set(I) {
      A.rawintegrationparameters_set_allowedLinearError(this.ptr, I);
    }
  }, {
    key: "predictionDistance",
    get: function get() {
      return A.rawintegrationparameters_predictionDistance(this.ptr);
    },
    set: function set(I) {
      A.rawintegrationparameters_set_predictionDistance(this.ptr, I);
    }
  }, {
    key: "maxVelocityIterations",
    get: function get() {
      return A.rawintegrationparameters_maxVelocityIterations(this.ptr) >>> 0;
    },
    set: function set(I) {
      A.rawintegrationparameters_set_maxVelocityIterations(this.ptr, I);
    }
  }, {
    key: "maxVelocityFrictionIterations",
    get: function get() {
      return A.rawintegrationparameters_maxVelocityFrictionIterations(this.ptr) >>> 0;
    },
    set: function set(I) {
      A.rawintegrationparameters_set_maxVelocityFrictionIterations(this.ptr, I);
    }
  }, {
    key: "maxStabilizationIterations",
    get: function get() {
      return A.rawintegrationparameters_maxStabilizationIterations(this.ptr) >>> 0;
    },
    set: function set(I) {
      A.rawintegrationparameters_set_maxStabilizationIterations(this.ptr, I);
    }
  }, {
    key: "minIslandSize",
    get: function get() {
      return A.rawintegrationparameters_minIslandSize(this.ptr) >>> 0;
    },
    set: function set(I) {
      A.rawintegrationparameters_set_minIslandSize(this.ptr, I);
    }
  }, {
    key: "maxCcdSubsteps",
    get: function get() {
      return A.rawintegrationparameters_maxCcdSubsteps(this.ptr) >>> 0;
    },
    set: function set(I) {
      A.rawintegrationparameters_set_maxCcdSubsteps(this.ptr, I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(Z.prototype);
      return I.ptr = A, I;
    }
  }]);
  return Z;
}();
var b = /*#__PURE__*/function () {
  function b() {
    _classCallCheck(this, b);
    var I = A.rawislandmanager_new();
    return b.__wrap(I);
  }
  _createClass(b, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawislandmanager_free(I);
    }
  }, {
    key: "forEachActiveRigidBodyHandle",
    value: function forEachActiveRigidBodyHandle(g) {
      try {
        A.rawislandmanager_forEachActiveRigidBodyHandle(this.ptr, J(g));
      } finally {
        I[y++] = void 0;
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(b.prototype);
      return I.ptr = A, I;
    }
  }]);
  return b;
}();
var W = /*#__PURE__*/function () {
  function W(I) {
    _classCallCheck(this, W);
    var g = A.rawkinematiccharactercontroller_new(I);
    return W.__wrap(g);
  }
  _createClass(W, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawkinematiccharactercontroller_free(I);
    }
  }, {
    key: "up",
    value: function up() {
      var I = A.rawkinematiccharactercontroller_up(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "setUp",
    value: function setUp(I) {
      a(I, QA), A.rawkinematiccharactercontroller_setUp(this.ptr, I.ptr);
    }
  }, {
    key: "offset",
    value: function offset() {
      return A.rawkinematiccharactercontroller_offset(this.ptr);
    }
  }, {
    key: "setOffset",
    value: function setOffset(I) {
      A.rawkinematiccharactercontroller_setOffset(this.ptr, I);
    }
  }, {
    key: "slideEnabled",
    value: function slideEnabled() {
      return 0 !== A.rawkinematiccharactercontroller_slideEnabled(this.ptr);
    }
  }, {
    key: "setSlideEnabled",
    value: function setSlideEnabled(I) {
      A.rawkinematiccharactercontroller_setSlideEnabled(this.ptr, I);
    }
  }, {
    key: "autostepMaxHeight",
    value: function autostepMaxHeight() {
      try {
        var _C = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawkinematiccharactercontroller_autostepMaxHeight(_C, this.ptr);
        var I = G()[_C / 4 + 0],
          g = K()[_C / 4 + 1];
        return 0 === I ? void 0 : g;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "autostepMinWidth",
    value: function autostepMinWidth() {
      try {
        var _C2 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawkinematiccharactercontroller_autostepMinWidth(_C2, this.ptr);
        var I = G()[_C2 / 4 + 0],
          g = K()[_C2 / 4 + 1];
        return 0 === I ? void 0 : g;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "autostepIncludesDynamicBodies",
    value: function autostepIncludesDynamicBodies() {
      var I = A.rawkinematiccharactercontroller_autostepIncludesDynamicBodies(this.ptr);
      return 16777215 === I ? void 0 : 0 !== I;
    }
  }, {
    key: "autostepEnabled",
    value: function autostepEnabled() {
      return 0 !== A.rawkinematiccharactercontroller_autostepEnabled(this.ptr);
    }
  }, {
    key: "enableAutostep",
    value: function enableAutostep(I, g, C) {
      A.rawkinematiccharactercontroller_enableAutostep(this.ptr, I, g, C);
    }
  }, {
    key: "disableAutostep",
    value: function disableAutostep() {
      A.rawkinematiccharactercontroller_disableAutostep(this.ptr);
    }
  }, {
    key: "maxSlopeClimbAngle",
    value: function maxSlopeClimbAngle() {
      return A.rawkinematiccharactercontroller_maxSlopeClimbAngle(this.ptr);
    }
  }, {
    key: "setMaxSlopeClimbAngle",
    value: function setMaxSlopeClimbAngle(I) {
      A.rawkinematiccharactercontroller_setMaxSlopeClimbAngle(this.ptr, I);
    }
  }, {
    key: "minSlopeSlideAngle",
    value: function minSlopeSlideAngle() {
      return A.rawkinematiccharactercontroller_minSlopeSlideAngle(this.ptr);
    }
  }, {
    key: "setMinSlopeSlideAngle",
    value: function setMinSlopeSlideAngle(I) {
      A.rawkinematiccharactercontroller_setMinSlopeSlideAngle(this.ptr, I);
    }
  }, {
    key: "snapToGroundDistance",
    value: function snapToGroundDistance() {
      try {
        var _C3 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawkinematiccharactercontroller_snapToGroundDistance(_C3, this.ptr);
        var I = G()[_C3 / 4 + 0],
          g = K()[_C3 / 4 + 1];
        return 0 === I ? void 0 : g;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }, {
    key: "enableSnapToGround",
    value: function enableSnapToGround(I) {
      A.rawkinematiccharactercontroller_enableSnapToGround(this.ptr, I);
    }
  }, {
    key: "disableSnapToGround",
    value: function disableSnapToGround() {
      A.rawkinematiccharactercontroller_disableSnapToGround(this.ptr);
    }
  }, {
    key: "snapToGroundEnabled",
    value: function snapToGroundEnabled() {
      return 0 !== A.rawkinematiccharactercontroller_snapToGroundEnabled(this.ptr);
    }
  }, {
    key: "computeColliderMovement",
    value: function computeColliderMovement(g, C, B, Q, i, D, o, G, w, k, S) {
      try {
        a(C, v), a(B, l), a(Q, V), a(D, QA), A.rawkinematiccharactercontroller_computeColliderMovement(this.ptr, g, C.ptr, B.ptr, Q.ptr, i, D.ptr, o, !E(G), E(G) ? 0 : G, w, !E(k), E(k) ? 0 : k, J(S));
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "computedMovement",
    value: function computedMovement() {
      var I = A.rawkinematiccharactercontroller_computedMovement(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "computedGrounded",
    value: function computedGrounded() {
      return 0 !== A.rawkinematiccharactercontroller_computedGrounded(this.ptr);
    }
  }, {
    key: "numComputedCollisions",
    value: function numComputedCollisions() {
      return A.rawkinematiccharactercontroller_numComputedCollisions(this.ptr) >>> 0;
    }
  }, {
    key: "computedCollision",
    value: function computedCollision(I, g) {
      a(g, H);
      return 0 !== A.rawkinematiccharactercontroller_computedCollision(this.ptr, I, g.ptr);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(W.prototype);
      return I.ptr = A, I;
    }
  }]);
  return W;
}();
var j = /*#__PURE__*/function () {
  function j() {
    _classCallCheck(this, j);
    var I = A.rawmultibodyjointset_new();
    return j.__wrap(I);
  }
  _createClass(j, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawmultibodyjointset_free(I);
    }
  }, {
    key: "jointType",
    value: function jointType(I) {
      return A.rawmultibodyjointset_jointType(this.ptr, I) >>> 0;
    }
  }, {
    key: "jointFrameX1",
    value: function jointFrameX1(I) {
      var g = A.rawmultibodyjointset_jointFrameX1(this.ptr, I);
      return _.__wrap(g);
    }
  }, {
    key: "jointFrameX2",
    value: function jointFrameX2(I) {
      var g = A.rawmultibodyjointset_jointFrameX2(this.ptr, I);
      return _.__wrap(g);
    }
  }, {
    key: "jointAnchor1",
    value: function jointAnchor1(I) {
      var g = A.rawmultibodyjointset_jointAnchor1(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "jointAnchor2",
    value: function jointAnchor2(I) {
      var g = A.rawmultibodyjointset_jointAnchor2(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "jointContactsEnabled",
    value: function jointContactsEnabled(I) {
      return 0 !== A.rawmultibodyjointset_jointContactsEnabled(this.ptr, I);
    }
  }, {
    key: "jointSetContactsEnabled",
    value: function jointSetContactsEnabled(I, g) {
      A.rawmultibodyjointset_jointSetContactsEnabled(this.ptr, I, g);
    }
  }, {
    key: "jointLimitsEnabled",
    value: function jointLimitsEnabled(I, g) {
      return 0 !== A.rawmultibodyjointset_jointLimitsEnabled(this.ptr, I, g);
    }
  }, {
    key: "jointLimitsMin",
    value: function jointLimitsMin(I, g) {
      return A.rawmultibodyjointset_jointLimitsMin(this.ptr, I, g);
    }
  }, {
    key: "jointLimitsMax",
    value: function jointLimitsMax(I, g) {
      return A.rawmultibodyjointset_jointLimitsMax(this.ptr, I, g);
    }
  }, {
    key: "createJoint",
    value: function createJoint(I, g, C, B) {
      a(I, O);
      return A.rawmultibodyjointset_createJoint(this.ptr, I.ptr, g, C, B);
    }
  }, {
    key: "remove",
    value: function remove(I, g) {
      A.rawmultibodyjointset_remove(this.ptr, I, g);
    }
  }, {
    key: "contains",
    value: function contains(I) {
      return 0 !== A.rawmultibodyjointset_contains(this.ptr, I);
    }
  }, {
    key: "forEachJointHandle",
    value: function forEachJointHandle(g) {
      try {
        A.rawmultibodyjointset_forEachJointHandle(this.ptr, J(g));
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "forEachJointAttachedToRigidBody",
    value: function forEachJointAttachedToRigidBody(g, C) {
      try {
        A.rawmultibodyjointset_forEachJointAttachedToRigidBody(this.ptr, g, J(C));
      } finally {
        I[y++] = void 0;
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(j.prototype);
      return I.ptr = A, I;
    }
  }]);
  return j;
}();
var x = /*#__PURE__*/function () {
  function x() {
    _classCallCheck(this, x);
    var I = A.rawnarrowphase_new();
    return x.__wrap(I);
  }
  _createClass(x, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawnarrowphase_free(I);
    }
  }, {
    key: "contacts_with",
    value: function contacts_with(I, g) {
      A.rawnarrowphase_contacts_with(this.ptr, I, Q(g));
    }
  }, {
    key: "contact_pair",
    value: function contact_pair(I, g) {
      var C = A.rawnarrowphase_contact_pair(this.ptr, I, g);
      return 0 === C ? void 0 : e.__wrap(C);
    }
  }, {
    key: "intersections_with",
    value: function intersections_with(I, g) {
      A.rawnarrowphase_intersections_with(this.ptr, I, Q(g));
    }
  }, {
    key: "intersection_pair",
    value: function intersection_pair(I, g) {
      return 0 !== A.rawnarrowphase_intersection_pair(this.ptr, I, g);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(x.prototype);
      return I.ptr = A, I;
    }
  }]);
  return x;
}();
var f = /*#__PURE__*/function () {
  function f() {
    _classCallCheck(this, f);
    var I = A.rawphysicspipeline_new();
    return f.__wrap(I);
  }
  _createClass(f, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawphysicspipeline_free(I);
    }
  }, {
    key: "step",
    value: function step(I, g, C, B, Q, E, i, D, o, G) {
      a(I, QA), a(g, Z), a(C, b), a(B, Y), a(Q, x), a(E, v), a(i, l), a(D, n), a(o, j), a(G, L), A.rawphysicspipeline_step(this.ptr, I.ptr, g.ptr, C.ptr, B.ptr, Q.ptr, E.ptr, i.ptr, D.ptr, o.ptr, G.ptr);
    }
  }, {
    key: "stepWithEvents",
    value: function stepWithEvents(I, g, C, B, E, i, D, o, G, w, k, S, M, K) {
      a(I, QA), a(g, Z), a(C, b), a(B, Y), a(E, x), a(i, v), a(D, l), a(o, n), a(G, j), a(w, L), a(k, T), A.rawphysicspipeline_stepWithEvents(this.ptr, I.ptr, g.ptr, C.ptr, B.ptr, E.ptr, i.ptr, D.ptr, o.ptr, G.ptr, w.ptr, k.ptr, Q(S), Q(M), Q(K));
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(f.prototype);
      return I.ptr = A, I;
    }
  }]);
  return f;
}();
var m = /*#__PURE__*/function () {
  function m() {
    _classCallCheck(this, m);
  }
  _createClass(m, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawpointcolliderprojection_free(I);
    }
  }, {
    key: "colliderHandle",
    value: function colliderHandle() {
      return A.rawpointcolliderprojection_colliderHandle(this.ptr);
    }
  }, {
    key: "point",
    value: function point() {
      var I = A.rawkinematiccharactercontroller_computedMovement(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "isInside",
    value: function isInside() {
      return 0 !== A.rawkinematiccharactercontroller_computedGrounded(this.ptr);
    }
  }, {
    key: "featureType",
    value: function featureType() {
      return A.rawpointcolliderprojection_featureType(this.ptr) >>> 0;
    }
  }, {
    key: "featureId",
    value: function featureId() {
      try {
        var _C4 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawpointcolliderprojection_featureId(_C4, this.ptr);
        var I = G()[_C4 / 4 + 0],
          g = G()[_C4 / 4 + 1];
        return 0 === I ? void 0 : g >>> 0;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(m.prototype);
      return I.ptr = A, I;
    }
  }]);
  return m;
}();
var X = /*#__PURE__*/function () {
  function X() {
    _classCallCheck(this, X);
  }
  _createClass(X, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawpointprojection_free(I);
    }
  }, {
    key: "point",
    value: function point() {
      var I = A.rawkinematiccharactercontroller_computedMovement(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "isInside",
    value: function isInside() {
      return 0 !== A.rawkinematiccharactercontroller_computedGrounded(this.ptr);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(X.prototype);
      return I.ptr = A, I;
    }
  }]);
  return X;
}();
var V = /*#__PURE__*/function () {
  function V() {
    _classCallCheck(this, V);
    var I = A.rawquerypipeline_new();
    return V.__wrap(I);
  }
  _createClass(V, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawquerypipeline_free(I);
    }
  }, {
    key: "update",
    value: function update(I, g) {
      a(I, v), a(g, l), A.rawquerypipeline_update(this.ptr, I.ptr, g.ptr);
    }
  }, {
    key: "castRay",
    value: function castRay(g, C, B, Q, i, D, o, G, w, k, S) {
      try {
        a(g, v), a(C, l), a(B, QA), a(Q, QA);
        var _M = A.rawquerypipeline_castRay(this.ptr, g.ptr, C.ptr, B.ptr, Q.ptr, i, D, o, !E(G), E(G) ? 0 : G, !E(w), E(w) ? 0 : w, !E(k), E(k) ? 0 : k, J(S));
        return 0 === _M ? void 0 : z.__wrap(_M);
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "castRayAndGetNormal",
    value: function castRayAndGetNormal(g, C, B, Q, i, D, o, G, w, k, S) {
      try {
        a(g, v), a(C, l), a(B, QA), a(Q, QA);
        var _M2 = A.rawquerypipeline_castRayAndGetNormal(this.ptr, g.ptr, C.ptr, B.ptr, Q.ptr, i, D, o, !E(G), E(G) ? 0 : G, !E(w), E(w) ? 0 : w, !E(k), E(k) ? 0 : k, J(S));
        return 0 === _M2 ? void 0 : P.__wrap(_M2);
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "intersectionsWithRay",
    value: function intersectionsWithRay(g, C, B, Q, i, D, o, G, w, k, S, M) {
      try {
        a(g, v), a(C, l), a(B, QA), a(Q, QA), A.rawquerypipeline_intersectionsWithRay(this.ptr, g.ptr, C.ptr, B.ptr, Q.ptr, i, D, J(o), G, !E(w), E(w) ? 0 : w, !E(k), E(k) ? 0 : k, !E(S), E(S) ? 0 : S, J(M));
      } finally {
        I[y++] = void 0, I[y++] = void 0;
      }
    }
  }, {
    key: "intersectionWithShape",
    value: function intersectionWithShape(g, C, B, Q, i, o, w, k, S, M) {
      try {
        var _h = A.__wbindgen_add_to_stack_pointer(-16);
        a(g, v), a(C, l), a(B, QA), a(Q, _), a(i, IA), A.rawquerypipeline_intersectionWithShape(_h, this.ptr, g.ptr, C.ptr, B.ptr, Q.ptr, i.ptr, o, !E(w), E(w) ? 0 : w, !E(k), E(k) ? 0 : k, !E(S), E(S) ? 0 : S, J(M));
        var K = G()[_h / 4 + 0],
          U = D()[_h / 8 + 1];
        return 0 === K ? void 0 : U;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16), I[y++] = void 0;
      }
    }
  }, {
    key: "projectPoint",
    value: function projectPoint(g, C, B, Q, i, D, o, G, w) {
      try {
        a(g, v), a(C, l), a(B, QA);
        var _k = A.rawquerypipeline_projectPoint(this.ptr, g.ptr, C.ptr, B.ptr, Q, i, !E(D), E(D) ? 0 : D, !E(o), E(o) ? 0 : o, !E(G), E(G) ? 0 : G, J(w));
        return 0 === _k ? void 0 : m.__wrap(_k);
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "projectPointAndGetFeature",
    value: function projectPointAndGetFeature(g, C, B, Q, i, D, o, G) {
      try {
        a(g, v), a(C, l), a(B, QA);
        var _w = A.rawquerypipeline_projectPointAndGetFeature(this.ptr, g.ptr, C.ptr, B.ptr, Q, !E(i), E(i) ? 0 : i, !E(D), E(D) ? 0 : D, !E(o), E(o) ? 0 : o, J(G));
        return 0 === _w ? void 0 : m.__wrap(_w);
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "intersectionsWithPoint",
    value: function intersectionsWithPoint(g, C, B, Q, i, D, o, G, w) {
      try {
        a(g, v), a(C, l), a(B, QA), A.rawquerypipeline_intersectionsWithPoint(this.ptr, g.ptr, C.ptr, B.ptr, J(Q), i, !E(D), E(D) ? 0 : D, !E(o), E(o) ? 0 : o, !E(G), E(G) ? 0 : G, J(w));
      } finally {
        I[y++] = void 0, I[y++] = void 0;
      }
    }
  }, {
    key: "castShape",
    value: function castShape(g, C, B, Q, i, D, o, G, w, k, S, M, K) {
      try {
        a(g, v), a(C, l), a(B, QA), a(Q, _), a(i, QA), a(D, IA);
        var _U = A.rawquerypipeline_castShape(this.ptr, g.ptr, C.ptr, B.ptr, Q.ptr, i.ptr, D.ptr, o, G, w, !E(k), E(k) ? 0 : k, !E(S), E(S) ? 0 : S, !E(M), E(M) ? 0 : M, J(K));
        return 0 === _U ? void 0 : gA.__wrap(_U);
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "intersectionsWithShape",
    value: function intersectionsWithShape(g, C, B, Q, i, D, o, G, w, k, S) {
      try {
        a(g, v), a(C, l), a(B, QA), a(Q, _), a(i, IA), A.rawquerypipeline_intersectionsWithShape(this.ptr, g.ptr, C.ptr, B.ptr, Q.ptr, i.ptr, J(D), o, !E(G), E(G) ? 0 : G, !E(w), E(w) ? 0 : w, !E(k), E(k) ? 0 : k, J(S));
      } finally {
        I[y++] = void 0, I[y++] = void 0;
      }
    }
  }, {
    key: "collidersWithAabbIntersectingAabb",
    value: function collidersWithAabbIntersectingAabb(g, C, B) {
      try {
        a(g, QA), a(C, QA), A.rawquerypipeline_collidersWithAabbIntersectingAabb(this.ptr, g.ptr, C.ptr, J(B));
      } finally {
        I[y++] = void 0;
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(V.prototype);
      return I.ptr = A, I;
    }
  }]);
  return V;
}();
var P = /*#__PURE__*/function () {
  function P() {
    _classCallCheck(this, P);
  }
  _createClass(P, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawraycolliderintersection_free(I);
    }
  }, {
    key: "colliderHandle",
    value: function colliderHandle() {
      return A.rawcharactercollision_handle(this.ptr);
    }
  }, {
    key: "normal",
    value: function normal() {
      var I = A.rawraycolliderintersection_normal(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "toi",
    value: function toi() {
      return A.rawraycolliderintersection_toi(this.ptr);
    }
  }, {
    key: "featureType",
    value: function featureType() {
      return A.rawraycolliderintersection_featureType(this.ptr) >>> 0;
    }
  }, {
    key: "featureId",
    value: function featureId() {
      try {
        var _C5 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawraycolliderintersection_featureId(_C5, this.ptr);
        var I = G()[_C5 / 4 + 0],
          g = G()[_C5 / 4 + 1];
        return 0 === I ? void 0 : g >>> 0;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(P.prototype);
      return I.ptr = A, I;
    }
  }]);
  return P;
}();
var z = /*#__PURE__*/function () {
  function z() {
    _classCallCheck(this, z);
  }
  _createClass(z, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawraycollidertoi_free(I);
    }
  }, {
    key: "colliderHandle",
    value: function colliderHandle() {
      return A.rawcharactercollision_handle(this.ptr);
    }
  }, {
    key: "toi",
    value: function toi() {
      return A.rawcharactercollision_toi(this.ptr);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(z.prototype);
      return I.ptr = A, I;
    }
  }]);
  return z;
}();
var u = /*#__PURE__*/function () {
  function u() {
    _classCallCheck(this, u);
  }
  _createClass(u, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawrayintersection_free(I);
    }
  }, {
    key: "normal",
    value: function normal() {
      var I = A.rawcharactercollision_worldWitness1(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "toi",
    value: function toi() {
      return A.rawcharactercollision_toi(this.ptr);
    }
  }, {
    key: "featureType",
    value: function featureType() {
      return A.rawrayintersection_featureType(this.ptr) >>> 0;
    }
  }, {
    key: "featureId",
    value: function featureId() {
      try {
        var _C6 = A.__wbindgen_add_to_stack_pointer(-16);
        A.rawrayintersection_featureId(_C6, this.ptr);
        var I = G()[_C6 / 4 + 0],
          g = G()[_C6 / 4 + 1];
        return 0 === I ? void 0 : g >>> 0;
      } finally {
        A.__wbindgen_add_to_stack_pointer(16);
      }
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(u.prototype);
      return I.ptr = A, I;
    }
  }]);
  return u;
}();
var v = /*#__PURE__*/function () {
  function v() {
    _classCallCheck(this, v);
    var I = A.rawrigidbodyset_new();
    return v.__wrap(I);
  }
  _createClass(v, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawrigidbodyset_free(I);
    }
  }, {
    key: "rbTranslation",
    value: function rbTranslation(I) {
      var g = A.rawrigidbodyset_rbTranslation(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "rbRotation",
    value: function rbRotation(I) {
      var g = A.rawrigidbodyset_rbRotation(this.ptr, I);
      return _.__wrap(g);
    }
  }, {
    key: "rbSleep",
    value: function rbSleep(I) {
      A.rawrigidbodyset_rbSleep(this.ptr, I);
    }
  }, {
    key: "rbIsSleeping",
    value: function rbIsSleeping(I) {
      return 0 !== A.rawrigidbodyset_rbIsSleeping(this.ptr, I);
    }
  }, {
    key: "rbIsMoving",
    value: function rbIsMoving(I) {
      return 0 !== A.rawrigidbodyset_rbIsMoving(this.ptr, I);
    }
  }, {
    key: "rbNextTranslation",
    value: function rbNextTranslation(I) {
      var g = A.rawrigidbodyset_rbNextTranslation(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "rbNextRotation",
    value: function rbNextRotation(I) {
      var g = A.rawrigidbodyset_rbNextRotation(this.ptr, I);
      return _.__wrap(g);
    }
  }, {
    key: "rbSetTranslation",
    value: function rbSetTranslation(I, g, C, B, Q) {
      A.rawrigidbodyset_rbSetTranslation(this.ptr, I, g, C, B, Q);
    }
  }, {
    key: "rbSetRotation",
    value: function rbSetRotation(I, g, C, B, Q, E) {
      A.rawrigidbodyset_rbSetRotation(this.ptr, I, g, C, B, Q, E);
    }
  }, {
    key: "rbSetLinvel",
    value: function rbSetLinvel(I, g, C) {
      a(g, QA), A.rawrigidbodyset_rbSetLinvel(this.ptr, I, g.ptr, C);
    }
  }, {
    key: "rbSetAngvel",
    value: function rbSetAngvel(I, g, C) {
      a(g, QA), A.rawrigidbodyset_rbSetAngvel(this.ptr, I, g.ptr, C);
    }
  }, {
    key: "rbSetNextKinematicTranslation",
    value: function rbSetNextKinematicTranslation(I, g, C, B) {
      A.rawrigidbodyset_rbSetNextKinematicTranslation(this.ptr, I, g, C, B);
    }
  }, {
    key: "rbSetNextKinematicRotation",
    value: function rbSetNextKinematicRotation(I, g, C, B, Q) {
      A.rawrigidbodyset_rbSetNextKinematicRotation(this.ptr, I, g, C, B, Q);
    }
  }, {
    key: "rbRecomputeMassPropertiesFromColliders",
    value: function rbRecomputeMassPropertiesFromColliders(I, g) {
      a(g, l), A.rawrigidbodyset_rbRecomputeMassPropertiesFromColliders(this.ptr, I, g.ptr);
    }
  }, {
    key: "rbSetAdditionalMass",
    value: function rbSetAdditionalMass(I, g, C) {
      A.rawrigidbodyset_rbSetAdditionalMass(this.ptr, I, g, C);
    }
  }, {
    key: "rbSetAdditionalMassProperties",
    value: function rbSetAdditionalMassProperties(I, g, C, B, Q, E) {
      a(C, QA), a(B, QA), a(Q, _), A.rawrigidbodyset_rbSetAdditionalMassProperties(this.ptr, I, g, C.ptr, B.ptr, Q.ptr, E);
    }
  }, {
    key: "rbLinvel",
    value: function rbLinvel(I) {
      var g = A.rawrigidbodyset_rbLinvel(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "rbAngvel",
    value: function rbAngvel(I) {
      var g = A.rawrigidbodyset_rbAngvel(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "rbLockTranslations",
    value: function rbLockTranslations(I, g, C) {
      A.rawrigidbodyset_rbLockTranslations(this.ptr, I, g, C);
    }
  }, {
    key: "rbSetEnabledTranslations",
    value: function rbSetEnabledTranslations(I, g, C, B, Q) {
      A.rawrigidbodyset_rbSetEnabledTranslations(this.ptr, I, g, C, B, Q);
    }
  }, {
    key: "rbLockRotations",
    value: function rbLockRotations(I, g, C) {
      A.rawrigidbodyset_rbLockRotations(this.ptr, I, g, C);
    }
  }, {
    key: "rbSetEnabledRotations",
    value: function rbSetEnabledRotations(I, g, C, B, Q) {
      A.rawrigidbodyset_rbSetEnabledRotations(this.ptr, I, g, C, B, Q);
    }
  }, {
    key: "rbDominanceGroup",
    value: function rbDominanceGroup(I) {
      return A.rawrigidbodyset_rbDominanceGroup(this.ptr, I);
    }
  }, {
    key: "rbSetDominanceGroup",
    value: function rbSetDominanceGroup(I, g) {
      A.rawrigidbodyset_rbSetDominanceGroup(this.ptr, I, g);
    }
  }, {
    key: "rbEnableCcd",
    value: function rbEnableCcd(I, g) {
      A.rawrigidbodyset_rbEnableCcd(this.ptr, I, g);
    }
  }, {
    key: "rbMass",
    value: function rbMass(I) {
      return A.rawrigidbodyset_rbMass(this.ptr, I);
    }
  }, {
    key: "rbInvMass",
    value: function rbInvMass(I) {
      return A.rawrigidbodyset_rbInvMass(this.ptr, I);
    }
  }, {
    key: "rbEffectiveInvMass",
    value: function rbEffectiveInvMass(I) {
      var g = A.rawrigidbodyset_rbEffectiveInvMass(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "rbLocalCom",
    value: function rbLocalCom(I) {
      var g = A.rawrigidbodyset_rbLocalCom(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "rbWorldCom",
    value: function rbWorldCom(I) {
      var g = A.rawrigidbodyset_rbWorldCom(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "rbInvPrincipalInertiaSqrt",
    value: function rbInvPrincipalInertiaSqrt(I) {
      var g = A.rawrigidbodyset_rbInvPrincipalInertiaSqrt(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "rbPrincipalInertiaLocalFrame",
    value: function rbPrincipalInertiaLocalFrame(I) {
      var g = A.rawrigidbodyset_rbPrincipalInertiaLocalFrame(this.ptr, I);
      return _.__wrap(g);
    }
  }, {
    key: "rbPrincipalInertia",
    value: function rbPrincipalInertia(I) {
      var g = A.rawrigidbodyset_rbPrincipalInertia(this.ptr, I);
      return QA.__wrap(g);
    }
  }, {
    key: "rbEffectiveWorldInvInertiaSqrt",
    value: function rbEffectiveWorldInvInertiaSqrt(I) {
      var g = A.rawrigidbodyset_rbEffectiveWorldInvInertiaSqrt(this.ptr, I);
      return $.__wrap(g);
    }
  }, {
    key: "rbEffectiveAngularInertia",
    value: function rbEffectiveAngularInertia(I) {
      var g = A.rawrigidbodyset_rbEffectiveAngularInertia(this.ptr, I);
      return $.__wrap(g);
    }
  }, {
    key: "rbWakeUp",
    value: function rbWakeUp(I) {
      A.rawrigidbodyset_rbWakeUp(this.ptr, I);
    }
  }, {
    key: "rbIsCcdEnabled",
    value: function rbIsCcdEnabled(I) {
      return 0 !== A.rawrigidbodyset_rbIsCcdEnabled(this.ptr, I);
    }
  }, {
    key: "rbNumColliders",
    value: function rbNumColliders(I) {
      return A.rawrigidbodyset_rbNumColliders(this.ptr, I) >>> 0;
    }
  }, {
    key: "rbCollider",
    value: function rbCollider(I, g) {
      return A.rawrigidbodyset_rbCollider(this.ptr, I, g);
    }
  }, {
    key: "rbBodyType",
    value: function rbBodyType(I) {
      return A.rawrigidbodyset_rbBodyType(this.ptr, I) >>> 0;
    }
  }, {
    key: "rbSetBodyType",
    value: function rbSetBodyType(I, g, C) {
      A.rawrigidbodyset_rbSetBodyType(this.ptr, I, g, C);
    }
  }, {
    key: "rbIsFixed",
    value: function rbIsFixed(I) {
      return 0 !== A.rawrigidbodyset_rbIsFixed(this.ptr, I);
    }
  }, {
    key: "rbIsKinematic",
    value: function rbIsKinematic(I) {
      return 0 !== A.rawrigidbodyset_rbIsKinematic(this.ptr, I);
    }
  }, {
    key: "rbIsDynamic",
    value: function rbIsDynamic(I) {
      return 0 !== A.rawrigidbodyset_rbIsDynamic(this.ptr, I);
    }
  }, {
    key: "rbLinearDamping",
    value: function rbLinearDamping(I) {
      return A.rawrigidbodyset_rbLinearDamping(this.ptr, I);
    }
  }, {
    key: "rbAngularDamping",
    value: function rbAngularDamping(I) {
      return A.rawrigidbodyset_rbAngularDamping(this.ptr, I);
    }
  }, {
    key: "rbSetLinearDamping",
    value: function rbSetLinearDamping(I, g) {
      A.rawrigidbodyset_rbSetLinearDamping(this.ptr, I, g);
    }
  }, {
    key: "rbSetAngularDamping",
    value: function rbSetAngularDamping(I, g) {
      A.rawrigidbodyset_rbSetAngularDamping(this.ptr, I, g);
    }
  }, {
    key: "rbSetEnabled",
    value: function rbSetEnabled(I, g) {
      A.rawrigidbodyset_rbSetEnabled(this.ptr, I, g);
    }
  }, {
    key: "rbIsEnabled",
    value: function rbIsEnabled(I) {
      return 0 !== A.rawrigidbodyset_rbIsEnabled(this.ptr, I);
    }
  }, {
    key: "rbGravityScale",
    value: function rbGravityScale(I) {
      return A.rawrigidbodyset_rbGravityScale(this.ptr, I);
    }
  }, {
    key: "rbSetGravityScale",
    value: function rbSetGravityScale(I, g, C) {
      A.rawrigidbodyset_rbSetGravityScale(this.ptr, I, g, C);
    }
  }, {
    key: "rbResetForces",
    value: function rbResetForces(I, g) {
      A.rawrigidbodyset_rbResetForces(this.ptr, I, g);
    }
  }, {
    key: "rbResetTorques",
    value: function rbResetTorques(I, g) {
      A.rawrigidbodyset_rbResetTorques(this.ptr, I, g);
    }
  }, {
    key: "rbAddForce",
    value: function rbAddForce(I, g, C) {
      a(g, QA), A.rawrigidbodyset_rbAddForce(this.ptr, I, g.ptr, C);
    }
  }, {
    key: "rbApplyImpulse",
    value: function rbApplyImpulse(I, g, C) {
      a(g, QA), A.rawrigidbodyset_rbApplyImpulse(this.ptr, I, g.ptr, C);
    }
  }, {
    key: "rbAddTorque",
    value: function rbAddTorque(I, g, C) {
      a(g, QA), A.rawrigidbodyset_rbAddTorque(this.ptr, I, g.ptr, C);
    }
  }, {
    key: "rbApplyTorqueImpulse",
    value: function rbApplyTorqueImpulse(I, g, C) {
      a(g, QA), A.rawrigidbodyset_rbApplyTorqueImpulse(this.ptr, I, g.ptr, C);
    }
  }, {
    key: "rbAddForceAtPoint",
    value: function rbAddForceAtPoint(I, g, C, B) {
      a(g, QA), a(C, QA), A.rawrigidbodyset_rbAddForceAtPoint(this.ptr, I, g.ptr, C.ptr, B);
    }
  }, {
    key: "rbApplyImpulseAtPoint",
    value: function rbApplyImpulseAtPoint(I, g, C, B) {
      a(g, QA), a(C, QA), A.rawrigidbodyset_rbApplyImpulseAtPoint(this.ptr, I, g.ptr, C.ptr, B);
    }
  }, {
    key: "rbUserData",
    value: function rbUserData(I) {
      return A.rawrigidbodyset_rbUserData(this.ptr, I) >>> 0;
    }
  }, {
    key: "rbSetUserData",
    value: function rbSetUserData(I, g) {
      A.rawrigidbodyset_rbSetUserData(this.ptr, I, g);
    }
  }, {
    key: "createRigidBody",
    value: function createRigidBody(I, g, C, B, Q, E, i, D, o, G, w, k, S, M, K, y, J, U, h, N, F, q, R, s) {
      a(g, QA), a(C, _), a(i, QA), a(D, QA), a(o, QA), a(G, QA), a(w, _);
      return A.rawrigidbodyset_createRigidBody(this.ptr, I, g.ptr, C.ptr, B, Q, E, i.ptr, D.ptr, o.ptr, G.ptr, w.ptr, k, S, M, K, y, J, U, h, N, F, q, R, s);
    }
  }, {
    key: "remove",
    value: function remove(I, g, C, B, Q) {
      a(g, b), a(C, l), a(B, n), a(Q, j), A.rawrigidbodyset_remove(this.ptr, I, g.ptr, C.ptr, B.ptr, Q.ptr);
    }
  }, {
    key: "len",
    value: function len() {
      return A.rawrigidbodyset_len(this.ptr) >>> 0;
    }
  }, {
    key: "contains",
    value: function contains(I) {
      return 0 !== A.rawrigidbodyset_contains(this.ptr, I);
    }
  }, {
    key: "forEachRigidBodyHandle",
    value: function forEachRigidBodyHandle(g) {
      try {
        A.rawrigidbodyset_forEachRigidBodyHandle(this.ptr, J(g));
      } finally {
        I[y++] = void 0;
      }
    }
  }, {
    key: "propagateModifiedBodyPositionsToColliders",
    value: function propagateModifiedBodyPositionsToColliders(I) {
      a(I, l), A.rawrigidbodyset_propagateModifiedBodyPositionsToColliders(this.ptr, I.ptr);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(v.prototype);
      return I.ptr = A, I;
    }
  }]);
  return v;
}();
var _ = /*#__PURE__*/function () {
  function _(I, g, C, B) {
    _classCallCheck(this, _);
    var Q = A.rawrotation_new(I, g, C, B);
    return _.__wrap(Q);
  }
  _createClass(_, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawrotation_free(I);
    }
  }, {
    key: "x",
    get: function get() {
      return A.rawintegrationparameters_dt(this.ptr);
    }
  }, {
    key: "y",
    get: function get() {
      return A.rawrotation_y(this.ptr);
    }
  }, {
    key: "z",
    get: function get() {
      return A.rawcharactercollision_toi(this.ptr);
    }
  }, {
    key: "w",
    get: function get() {
      return A.rawrotation_w(this.ptr);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(_.prototype);
      return I.ptr = A, I;
    }
  }, {
    key: "identity",
    value: function identity() {
      var I = A.rawrotation_identity();
      return _.__wrap(I);
    }
  }]);
  return _;
}();
var $ = /*#__PURE__*/function () {
  function $() {
    _classCallCheck(this, $);
  }
  _createClass($, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawsdpmatrix3_free(I);
    }
  }, {
    key: "elements",
    value: function elements() {
      return B(A.rawsdpmatrix3_elements(this.ptr));
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create($.prototype);
      return I.ptr = A, I;
    }
  }]);
  return $;
}();
var AA = /*#__PURE__*/function () {
  function AA() {
    _classCallCheck(this, AA);
    var I = A.rawserializationpipeline_new();
    return AA.__wrap(I);
  }
  _createClass(AA, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawserializationpipeline_free(I);
    }
  }, {
    key: "serializeAll",
    value: function serializeAll(I, g, C, Q, E, i, D, o, G) {
      a(I, QA), a(g, Z), a(C, b), a(Q, Y), a(E, x), a(i, v), a(D, l), a(o, n), a(G, j);
      return B(A.rawserializationpipeline_serializeAll(this.ptr, I.ptr, g.ptr, C.ptr, Q.ptr, E.ptr, i.ptr, D.ptr, o.ptr, G.ptr));
    }
  }, {
    key: "deserializeAll",
    value: function deserializeAll(I) {
      var g = A.rawserializationpipeline_deserializeAll(this.ptr, Q(I));
      return 0 === g ? void 0 : d.__wrap(g);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(AA.prototype);
      return I.ptr = A, I;
    }
  }]);
  return AA;
}();
var IA = /*#__PURE__*/function () {
  function IA() {
    _classCallCheck(this, IA);
  }
  _createClass(IA, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawshape_free(I);
    }
  }, {
    key: "castShape",
    value: function castShape(I, g, C, B, Q, E, i, D, o) {
      a(I, QA), a(g, _), a(C, QA), a(B, IA), a(Q, QA), a(E, _), a(i, QA);
      var G = A.rawshape_castShape(this.ptr, I.ptr, g.ptr, C.ptr, B.ptr, Q.ptr, E.ptr, i.ptr, D, o);
      return 0 === G ? void 0 : BA.__wrap(G);
    }
  }, {
    key: "intersectsShape",
    value: function intersectsShape(I, g, C, B, Q) {
      a(I, QA), a(g, _), a(C, IA), a(B, QA), a(Q, _);
      return 0 !== A.rawshape_intersectsShape(this.ptr, I.ptr, g.ptr, C.ptr, B.ptr, Q.ptr);
    }
  }, {
    key: "contactShape",
    value: function contactShape(I, g, C, B, Q, E) {
      a(I, QA), a(g, _), a(C, IA), a(B, QA), a(Q, _);
      var i = A.rawshape_contactShape(this.ptr, I.ptr, g.ptr, C.ptr, B.ptr, Q.ptr, E);
      return 0 === i ? void 0 : CA.__wrap(i);
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(I, g, C) {
      a(I, QA), a(g, _), a(C, QA);
      return 0 !== A.rawshape_containsPoint(this.ptr, I.ptr, g.ptr, C.ptr);
    }
  }, {
    key: "projectPoint",
    value: function projectPoint(I, g, C, B) {
      a(I, QA), a(g, _), a(C, QA);
      var Q = A.rawshape_projectPoint(this.ptr, I.ptr, g.ptr, C.ptr, B);
      return X.__wrap(Q);
    }
  }, {
    key: "intersectsRay",
    value: function intersectsRay(I, g, C, B, Q) {
      a(I, QA), a(g, _), a(C, QA), a(B, QA);
      return 0 !== A.rawshape_intersectsRay(this.ptr, I.ptr, g.ptr, C.ptr, B.ptr, Q);
    }
  }, {
    key: "castRay",
    value: function castRay(I, g, C, B, Q, E) {
      a(I, QA), a(g, _), a(C, QA), a(B, QA);
      return A.rawshape_castRay(this.ptr, I.ptr, g.ptr, C.ptr, B.ptr, Q, E);
    }
  }, {
    key: "castRayAndGetNormal",
    value: function castRayAndGetNormal(I, g, C, B, Q, E) {
      a(I, QA), a(g, _), a(C, QA), a(B, QA);
      var i = A.rawshape_castRayAndGetNormal(this.ptr, I.ptr, g.ptr, C.ptr, B.ptr, Q, E);
      return 0 === i ? void 0 : u.__wrap(i);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(IA.prototype);
      return I.ptr = A, I;
    }
  }, {
    key: "cuboid",
    value: function cuboid(I, g, C) {
      var B = A.rawshape_cuboid(I, g, C);
      return IA.__wrap(B);
    }
  }, {
    key: "roundCuboid",
    value: function roundCuboid(I, g, C, B) {
      var Q = A.rawshape_roundCuboid(I, g, C, B);
      return IA.__wrap(Q);
    }
  }, {
    key: "ball",
    value: function ball(I) {
      var g = A.rawshape_ball(I);
      return IA.__wrap(g);
    }
  }, {
    key: "halfspace",
    value: function halfspace(I) {
      a(I, QA);
      var g = A.rawshape_halfspace(I.ptr);
      return IA.__wrap(g);
    }
  }, {
    key: "capsule",
    value: function capsule(I, g) {
      var C = A.rawshape_capsule(I, g);
      return IA.__wrap(C);
    }
  }, {
    key: "cylinder",
    value: function cylinder(I, g) {
      var C = A.rawshape_cylinder(I, g);
      return IA.__wrap(C);
    }
  }, {
    key: "roundCylinder",
    value: function roundCylinder(I, g, C) {
      var B = A.rawshape_roundCylinder(I, g, C);
      return IA.__wrap(B);
    }
  }, {
    key: "cone",
    value: function cone(I, g) {
      var C = A.rawshape_cone(I, g);
      return IA.__wrap(C);
    }
  }, {
    key: "roundCone",
    value: function roundCone(I, g, C) {
      var B = A.rawshape_roundCone(I, g, C);
      return IA.__wrap(B);
    }
  }, {
    key: "polyline",
    value: function polyline(I, g) {
      var C = q(I, A.__wbindgen_malloc),
        B = F,
        Q = R(g, A.__wbindgen_malloc),
        E = F,
        i = A.rawshape_polyline(C, B, Q, E);
      return IA.__wrap(i);
    }
  }, {
    key: "trimesh",
    value: function trimesh(I, g) {
      var C = q(I, A.__wbindgen_malloc),
        B = F,
        Q = R(g, A.__wbindgen_malloc),
        E = F,
        i = A.rawshape_trimesh(C, B, Q, E);
      return IA.__wrap(i);
    }
  }, {
    key: "heightfield",
    value: function heightfield(I, g, C, B) {
      var Q = q(C, A.__wbindgen_malloc),
        E = F;
      a(B, QA);
      var i = A.rawshape_heightfield(I, g, Q, E, B.ptr);
      return IA.__wrap(i);
    }
  }, {
    key: "segment",
    value: function segment(I, g) {
      a(I, QA), a(g, QA);
      var C = A.rawshape_segment(I.ptr, g.ptr);
      return IA.__wrap(C);
    }
  }, {
    key: "triangle",
    value: function triangle(I, g, C) {
      a(I, QA), a(g, QA), a(C, QA);
      var B = A.rawshape_triangle(I.ptr, g.ptr, C.ptr);
      return IA.__wrap(B);
    }
  }, {
    key: "roundTriangle",
    value: function roundTriangle(I, g, C, B) {
      a(I, QA), a(g, QA), a(C, QA);
      var Q = A.rawshape_roundTriangle(I.ptr, g.ptr, C.ptr, B);
      return IA.__wrap(Q);
    }
  }, {
    key: "convexHull",
    value: function convexHull(I) {
      var g = q(I, A.__wbindgen_malloc),
        C = F,
        B = A.rawshape_convexHull(g, C);
      return 0 === B ? void 0 : IA.__wrap(B);
    }
  }, {
    key: "roundConvexHull",
    value: function roundConvexHull(I, g) {
      var C = q(I, A.__wbindgen_malloc),
        B = F,
        Q = A.rawshape_roundConvexHull(C, B, g);
      return 0 === Q ? void 0 : IA.__wrap(Q);
    }
  }, {
    key: "convexMesh",
    value: function convexMesh(I, g) {
      var C = q(I, A.__wbindgen_malloc),
        B = F,
        Q = R(g, A.__wbindgen_malloc),
        E = F,
        i = A.rawshape_convexMesh(C, B, Q, E);
      return 0 === i ? void 0 : IA.__wrap(i);
    }
  }, {
    key: "roundConvexMesh",
    value: function roundConvexMesh(I, g, C) {
      var B = q(I, A.__wbindgen_malloc),
        Q = F,
        E = R(g, A.__wbindgen_malloc),
        i = F,
        D = A.rawshape_roundConvexMesh(B, Q, E, i, C);
      return 0 === D ? void 0 : IA.__wrap(D);
    }
  }]);
  return IA;
}();
var gA = /*#__PURE__*/function () {
  function gA() {
    _classCallCheck(this, gA);
  }
  _createClass(gA, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawshapecollidertoi_free(I);
    }
  }, {
    key: "colliderHandle",
    value: function colliderHandle() {
      return A.rawcharactercollision_handle(this.ptr);
    }
  }, {
    key: "toi",
    value: function toi() {
      return A.rawcharactercollision_toi(this.ptr);
    }
  }, {
    key: "witness1",
    value: function witness1() {
      var I = A.rawcharactercollision_worldWitness1(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "witness2",
    value: function witness2() {
      var I = A.rawshapecollidertoi_witness2(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "normal1",
    value: function normal1() {
      var I = A.rawcharactercollision_worldNormal1(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "normal2",
    value: function normal2() {
      var I = A.rawshapecollidertoi_normal2(this.ptr);
      return QA.__wrap(I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(gA.prototype);
      return I.ptr = A, I;
    }
  }]);
  return gA;
}();
var CA = /*#__PURE__*/function () {
  function CA() {
    _classCallCheck(this, CA);
  }
  _createClass(CA, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawshapecontact_free(I);
    }
  }, {
    key: "distance",
    value: function distance() {
      return A.rawshapecontact_distance(this.ptr);
    }
  }, {
    key: "point1",
    value: function point1() {
      var I = A.rawkinematiccharactercontroller_computedMovement(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "point2",
    value: function point2() {
      var I = A.rawcharactercollision_worldWitness1(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "normal1",
    value: function normal1() {
      var I = A.rawshapecollidertoi_witness2(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "normal2",
    value: function normal2() {
      var I = A.rawcharactercollision_worldNormal1(this.ptr);
      return QA.__wrap(I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(CA.prototype);
      return I.ptr = A, I;
    }
  }]);
  return CA;
}();
var BA = /*#__PURE__*/function () {
  function BA() {
    _classCallCheck(this, BA);
  }
  _createClass(BA, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawshapetoi_free(I);
    }
  }, {
    key: "toi",
    value: function toi() {
      return A.rawintegrationparameters_dt(this.ptr);
    }
  }, {
    key: "witness1",
    value: function witness1() {
      var I = A.rawshapetoi_witness1(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "witness2",
    value: function witness2() {
      var I = A.rawcontactforceevent_total_force(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "normal1",
    value: function normal1() {
      var I = A.rawshapetoi_normal1(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "normal2",
    value: function normal2() {
      var I = A.rawshapetoi_normal2(this.ptr);
      return QA.__wrap(I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(BA.prototype);
      return I.ptr = A, I;
    }
  }]);
  return BA;
}();
var QA = /*#__PURE__*/function () {
  function QA(I, g, C) {
    _classCallCheck(this, QA);
    var B = A.rawvector_new(I, g, C);
    return QA.__wrap(B);
  }
  _createClass(QA, [{
    key: "__destroy_into_raw",
    value: function __destroy_into_raw() {
      var A = this.ptr;
      return this.ptr = 0, A;
    }
  }, {
    key: "free",
    value: function free() {
      var I = this.__destroy_into_raw();
      A.__wbg_rawvector_free(I);
    }
  }, {
    key: "x",
    get: function get() {
      return A.rawintegrationparameters_dt(this.ptr);
    },
    set: function set(I) {
      A.rawintegrationparameters_set_dt(this.ptr, I);
    }
  }, {
    key: "y",
    get: function get() {
      return A.rawrotation_y(this.ptr);
    },
    set: function set(I) {
      A.rawvector_set_y(this.ptr, I);
    }
  }, {
    key: "z",
    get: function get() {
      return A.rawcharactercollision_toi(this.ptr);
    },
    set: function set(I) {
      A.rawintegrationparameters_set_erp(this.ptr, I);
    }
  }, {
    key: "xyz",
    value: function xyz() {
      var I = A.rawvector_xyz(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "yxz",
    value: function yxz() {
      var I = A.rawvector_yxz(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "zxy",
    value: function zxy() {
      var I = A.rawvector_zxy(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "xzy",
    value: function xzy() {
      var I = A.rawvector_xzy(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "yzx",
    value: function yzx() {
      var I = A.rawvector_yzx(this.ptr);
      return QA.__wrap(I);
    }
  }, {
    key: "zyx",
    value: function zyx() {
      var I = A.rawvector_zyx(this.ptr);
      return QA.__wrap(I);
    }
  }], [{
    key: "__wrap",
    value: function __wrap(A) {
      var I = Object.create(QA.prototype);
      return I.ptr = A, I;
    }
  }, {
    key: "zero",
    value: function zero() {
      var I = A.rawvector_zero();
      return QA.__wrap(I);
    }
  }]);
  return QA;
}();
function EA(_x) {
  return _EA.apply(this, arguments);
}
function _EA() {
  _EA = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(I) {
    var C, _yield, w, a;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          void 0 === I && (I = new URL("rapier_wasm3d_bg.wasm", "<deleted>"));
          C = function () {
            var I = {
              wbg: {}
            };
            return I.wbg.__wbindgen_object_drop_ref = function (A) {
              B(A);
            }, I.wbg.__wbindgen_number_new = function (A) {
              return Q(A);
            }, I.wbg.__wbindgen_number_get = function (A, I) {
              var C = g(I),
                B = "number" == typeof C ? C : void 0;
              D()[A / 8 + 1] = E(B) ? 0 : B, G()[A / 4 + 0] = !E(B);
            }, I.wbg.__wbindgen_boolean_get = function (A) {
              var I = g(A);
              return "boolean" == typeof I ? I ? 1 : 0 : 2;
            }, I.wbg.__wbindgen_is_function = function (A) {
              return "function" == typeof g(A);
            }, I.wbg.__wbg_rawraycolliderintersection_new = function (A) {
              return Q(P.__wrap(A));
            }, I.wbg.__wbg_rawcontactforceevent_new = function (A) {
              return Q(t.__wrap(A));
            }, I.wbg.__wbg_call_168da88779e35f61 = function () {
              return s(function (A, I, C) {
                return Q(g(A).call(g(I), g(C)));
              }, arguments);
            }, I.wbg.__wbg_call_3999bee59e9f7719 = function () {
              return s(function (A, I, C, B) {
                return Q(g(A).call(g(I), g(C), g(B)));
              }, arguments);
            }, I.wbg.__wbg_call_e1f72c051cdab859 = function () {
              return s(function (A, I, C, B, E) {
                return Q(g(A).call(g(I), g(C), g(B), g(E)));
              }, arguments);
            }, I.wbg.__wbg_bind_10dfe70e95d2a480 = function (A, I, C, B) {
              return Q(g(A).bind(g(I), g(C), g(B)));
            }, I.wbg.__wbg_buffer_3f3d764d4747d564 = function (A) {
              return Q(g(A).buffer);
            }, I.wbg.__wbg_newwithbyteoffsetandlength_d9aa266703cb98be = function (A, I, C) {
              return Q(new Uint8Array(g(A), I >>> 0, C >>> 0));
            }, I.wbg.__wbg_new_8c3f0052272a457a = function (A) {
              return Q(new Uint8Array(g(A)));
            }, I.wbg.__wbg_set_83db9690f9353e79 = function (A, I, C) {
              g(A).set(g(I), C >>> 0);
            }, I.wbg.__wbg_length_9e1ae1900cb0fbd5 = function (A) {
              return g(A).length;
            }, I.wbg.__wbg_newwithbyteoffsetandlength_be22e5fcf4f69ab4 = function (A, I, C) {
              return Q(new Float32Array(g(A), I >>> 0, C >>> 0));
            }, I.wbg.__wbg_set_0e0314cf6675c1b9 = function (A, I, C) {
              g(A).set(g(I), C >>> 0);
            }, I.wbg.__wbg_length_9a2deed95d22668d = function (A) {
              return g(A).length;
            }, I.wbg.__wbg_newwithlength_a7168e4a1e8f5e12 = function (A) {
              return Q(new Float32Array(A >>> 0));
            }, I.wbg.__wbindgen_throw = function (A, I) {
              throw new Error(S(A, I));
            }, I.wbg.__wbindgen_memory = function () {
              return Q(A.memory);
            }, I;
          }();
          ("string" == typeof I || "function" == typeof Request && I instanceof Request || "function" == typeof URL && I instanceof URL) && (I = fetch(I));
          _context3.t0 = function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(A, I) {
              var _g, _g2;
              return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!("function" == typeof Response && A instanceof Response)) {
                      _context2.next = 19;
                      break;
                    }
                    if (!("function" == typeof WebAssembly.instantiateStreaming)) {
                      _context2.next = 13;
                      break;
                    }
                    _context2.prev = 2;
                    _context2.next = 5;
                    return WebAssembly.instantiateStreaming(A, I);
                  case 5:
                    return _context2.abrupt("return", _context2.sent);
                  case 8:
                    _context2.prev = 8;
                    _context2.t0 = _context2["catch"](2);
                    if (!("application/wasm" == A.headers.get("Content-Type"))) {
                      _context2.next = 12;
                      break;
                    }
                    throw _context2.t0;
                  case 12:
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", _context2.t0);
                  case 13:
                    _context2.next = 15;
                    return A.arrayBuffer();
                  case 15:
                    _g = _context2.sent;
                    _context2.next = 18;
                    return WebAssembly.instantiate(_g, I);
                  case 18:
                    return _context2.abrupt("return", _context2.sent);
                  case 19:
                    _context2.next = 21;
                    return WebAssembly.instantiate(A, I);
                  case 21:
                    _g2 = _context2.sent;
                    return _context2.abrupt("return", _g2 instanceof WebAssembly.Instance ? {
                      instance: _g2,
                      module: A
                    } : _g2);
                  case 23:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[2, 8]]);
            }));
            return function (_x2, _x3) {
              return _ref.apply(this, arguments);
            };
          }();
          _context3.next = 6;
          return I;
        case 6:
          _context3.t1 = _context3.sent;
          _context3.t2 = C;
          _context3.next = 10;
          return (0, _context3.t0)(_context3.t1, _context3.t2);
        case 10:
          _yield = _context3.sent;
          w = _yield.instance;
          a = _yield.module;
          return _context3.abrupt("return", function (I, g) {
            return A = I.exports, EA.__wbindgen_wasm_module = g, M = new Float32Array(), i = new Float64Array(), o = new Int32Array(), h = new Uint32Array(), k = new Uint8Array(), A;
          }(w, a));
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _EA.apply(this, arguments);
}
var iA = exports.Vector3 = /*#__PURE__*/_createClass(function iA(A, I, g) {
  _classCallCheck(this, iA);
  this.x = A, this.y = I, this.z = g;
});
var DA = exports.VectorOps = /*#__PURE__*/function () {
  function DA() {
    _classCallCheck(this, DA);
  }
  _createClass(DA, null, [{
    key: "new",
    value: function _new(A, I, g) {
      return new iA(A, I, g);
    }
  }, {
    key: "intoRaw",
    value: function intoRaw(A) {
      return new QA(A.x, A.y, A.z);
    }
  }, {
    key: "zeros",
    value: function zeros() {
      return DA.new(0, 0, 0);
    }
  }, {
    key: "fromRaw",
    value: function fromRaw(A) {
      if (!A) return null;
      var I = DA.new(A.x, A.y, A.z);
      return A.free(), I;
    }
  }, {
    key: "copy",
    value: function copy(A, I) {
      A.x = I.x, A.y = I.y, A.z = I.z;
    }
  }]);
  return DA;
}();
var oA = exports.Quaternion = /*#__PURE__*/_createClass(function oA(A, I, g, C) {
  _classCallCheck(this, oA);
  this.x = A, this.y = I, this.z = g, this.w = C;
});
var GA = exports.RotationOps = /*#__PURE__*/function () {
  function GA() {
    _classCallCheck(this, GA);
  }
  _createClass(GA, null, [{
    key: "identity",
    value: function identity() {
      return new oA(0, 0, 0, 1);
    }
  }, {
    key: "fromRaw",
    value: function fromRaw(A) {
      if (!A) return null;
      var I = new oA(A.x, A.y, A.z, A.w);
      return A.free(), I;
    }
  }, {
    key: "intoRaw",
    value: function intoRaw(A) {
      return new _(A.x, A.y, A.z, A.w);
    }
  }, {
    key: "copy",
    value: function copy(A, I) {
      A.x = I.x, A.y = I.y, A.z = I.z, A.w = I.w;
    }
  }]);
  return GA;
}();
var wA = exports.SdpMatrix3 = /*#__PURE__*/function () {
  function wA(A) {
    _classCallCheck(this, wA);
    this.elements = A;
  }
  _createClass(wA, [{
    key: "m11",
    get: function get() {
      return this.elements[0];
    }
  }, {
    key: "m12",
    get: function get() {
      return this.elements[1];
    }
  }, {
    key: "m21",
    get: function get() {
      return this.m12;
    }
  }, {
    key: "m13",
    get: function get() {
      return this.elements[2];
    }
  }, {
    key: "m31",
    get: function get() {
      return this.m13;
    }
  }, {
    key: "m22",
    get: function get() {
      return this.elements[3];
    }
  }, {
    key: "m23",
    get: function get() {
      return this.elements[4];
    }
  }, {
    key: "m32",
    get: function get() {
      return this.m23;
    }
  }, {
    key: "m33",
    get: function get() {
      return this.elements[5];
    }
  }]);
  return wA;
}();
var kA = exports.SdpMatrix3Ops = /*#__PURE__*/function () {
  function kA() {
    _classCallCheck(this, kA);
  }
  _createClass(kA, null, [{
    key: "fromRaw",
    value: function fromRaw(A) {
      var I = new wA(A.elements());
      return A.free(), I;
    }
  }]);
  return kA;
}();
var SA, aA, MA, KA, yA, JA, UA, hA, NA, FA, qA, RA;
!function (A) {
  A[A.Dynamic = 0] = "Dynamic", A[A.Fixed = 1] = "Fixed", A[A.KinematicPositionBased = 2] = "KinematicPositionBased", A[A.KinematicVelocityBased = 3] = "KinematicVelocityBased";
}(SA || (exports.RigidBodyType = SA = {}));
var sA = exports.RigidBody = /*#__PURE__*/function () {
  function sA(A, I, g) {
    _classCallCheck(this, sA);
    this.rawSet = A, this.colliderSet = I, this.handle = g;
  }
  _createClass(sA, [{
    key: "finalizeDeserialization",
    value: function finalizeDeserialization(A) {
      this.colliderSet = A;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return this.rawSet.contains(this.handle);
    }
  }, {
    key: "lockTranslations",
    value: function lockTranslations(A, I) {
      return this.rawSet.rbLockTranslations(this.handle, A, I);
    }
  }, {
    key: "lockRotations",
    value: function lockRotations(A, I) {
      return this.rawSet.rbLockRotations(this.handle, A, I);
    }
  }, {
    key: "setEnabledTranslations",
    value: function setEnabledTranslations(A, I, g, C) {
      return this.rawSet.rbSetEnabledTranslations(this.handle, A, I, g, C);
    }
  }, {
    key: "restrictTranslations",
    value: function restrictTranslations(A, I, g, C) {
      this.setEnabledTranslations(A, I, g, C);
    }
  }, {
    key: "setEnabledRotations",
    value: function setEnabledRotations(A, I, g, C) {
      return this.rawSet.rbSetEnabledRotations(this.handle, A, I, g, C);
    }
  }, {
    key: "restrictRotations",
    value: function restrictRotations(A, I, g, C) {
      this.setEnabledRotations(A, I, g, C);
    }
  }, {
    key: "dominanceGroup",
    value: function dominanceGroup() {
      return this.rawSet.rbDominanceGroup(this.handle);
    }
  }, {
    key: "setDominanceGroup",
    value: function setDominanceGroup(A) {
      this.rawSet.rbSetDominanceGroup(this.handle, A);
    }
  }, {
    key: "enableCcd",
    value: function enableCcd(A) {
      this.rawSet.rbEnableCcd(this.handle, A);
    }
  }, {
    key: "translation",
    value: function translation() {
      var A = this.rawSet.rbTranslation(this.handle);
      return DA.fromRaw(A);
    }
  }, {
    key: "rotation",
    value: function rotation() {
      var A = this.rawSet.rbRotation(this.handle);
      return GA.fromRaw(A);
    }
  }, {
    key: "nextTranslation",
    value: function nextTranslation() {
      var A = this.rawSet.rbNextTranslation(this.handle);
      return DA.fromRaw(A);
    }
  }, {
    key: "nextRotation",
    value: function nextRotation() {
      var A = this.rawSet.rbNextRotation(this.handle);
      return GA.fromRaw(A);
    }
  }, {
    key: "setTranslation",
    value: function setTranslation(A, I) {
      this.rawSet.rbSetTranslation(this.handle, A.x, A.y, A.z, I);
    }
  }, {
    key: "setLinvel",
    value: function setLinvel(A, I) {
      var g = DA.intoRaw(A);
      this.rawSet.rbSetLinvel(this.handle, g, I), g.free();
    }
  }, {
    key: "gravityScale",
    value: function gravityScale() {
      return this.rawSet.rbGravityScale(this.handle);
    }
  }, {
    key: "setGravityScale",
    value: function setGravityScale(A, I) {
      this.rawSet.rbSetGravityScale(this.handle, A, I);
    }
  }, {
    key: "setRotation",
    value: function setRotation(A, I) {
      this.rawSet.rbSetRotation(this.handle, A.x, A.y, A.z, A.w, I);
    }
  }, {
    key: "setAngvel",
    value: function setAngvel(A, I) {
      var g = DA.intoRaw(A);
      this.rawSet.rbSetAngvel(this.handle, g, I), g.free();
    }
  }, {
    key: "setNextKinematicTranslation",
    value: function setNextKinematicTranslation(A) {
      this.rawSet.rbSetNextKinematicTranslation(this.handle, A.x, A.y, A.z);
    }
  }, {
    key: "setNextKinematicRotation",
    value: function setNextKinematicRotation(A) {
      this.rawSet.rbSetNextKinematicRotation(this.handle, A.x, A.y, A.z, A.w);
    }
  }, {
    key: "linvel",
    value: function linvel() {
      return DA.fromRaw(this.rawSet.rbLinvel(this.handle));
    }
  }, {
    key: "angvel",
    value: function angvel() {
      return DA.fromRaw(this.rawSet.rbAngvel(this.handle));
    }
  }, {
    key: "mass",
    value: function mass() {
      return this.rawSet.rbMass(this.handle);
    }
  }, {
    key: "effectiveInvMass",
    value: function effectiveInvMass() {
      return DA.fromRaw(this.rawSet.rbEffectiveInvMass(this.handle));
    }
  }, {
    key: "invMass",
    value: function invMass() {
      return this.rawSet.rbInvMass(this.handle);
    }
  }, {
    key: "localCom",
    value: function localCom() {
      return DA.fromRaw(this.rawSet.rbLocalCom(this.handle));
    }
  }, {
    key: "worldCom",
    value: function worldCom() {
      return DA.fromRaw(this.rawSet.rbWorldCom(this.handle));
    }
  }, {
    key: "invPrincipalInertiaSqrt",
    value: function invPrincipalInertiaSqrt() {
      return DA.fromRaw(this.rawSet.rbInvPrincipalInertiaSqrt(this.handle));
    }
  }, {
    key: "principalInertia",
    value: function principalInertia() {
      return DA.fromRaw(this.rawSet.rbPrincipalInertia(this.handle));
    }
  }, {
    key: "principalInertiaLocalFrame",
    value: function principalInertiaLocalFrame() {
      return GA.fromRaw(this.rawSet.rbPrincipalInertiaLocalFrame(this.handle));
    }
  }, {
    key: "effectiveWorldInvInertiaSqrt",
    value: function effectiveWorldInvInertiaSqrt() {
      return kA.fromRaw(this.rawSet.rbEffectiveWorldInvInertiaSqrt(this.handle));
    }
  }, {
    key: "effectiveAngularInertia",
    value: function effectiveAngularInertia() {
      return kA.fromRaw(this.rawSet.rbEffectiveAngularInertia(this.handle));
    }
  }, {
    key: "sleep",
    value: function sleep() {
      this.rawSet.rbSleep(this.handle);
    }
  }, {
    key: "wakeUp",
    value: function wakeUp() {
      this.rawSet.rbWakeUp(this.handle);
    }
  }, {
    key: "isCcdEnabled",
    value: function isCcdEnabled() {
      return this.rawSet.rbIsCcdEnabled(this.handle);
    }
  }, {
    key: "numColliders",
    value: function numColliders() {
      return this.rawSet.rbNumColliders(this.handle);
    }
  }, {
    key: "collider",
    value: function collider(A) {
      return this.colliderSet.get(this.rawSet.rbCollider(this.handle, A));
    }
  }, {
    key: "setEnabled",
    value: function setEnabled(A) {
      this.rawSet.rbSetEnabled(this.handle, A);
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.rawSet.rbIsEnabled(this.handle);
    }
  }, {
    key: "bodyType",
    value: function bodyType() {
      return this.rawSet.rbBodyType(this.handle);
    }
  }, {
    key: "setBodyType",
    value: function setBodyType(A, I) {
      return this.rawSet.rbSetBodyType(this.handle, A, I);
    }
  }, {
    key: "isSleeping",
    value: function isSleeping() {
      return this.rawSet.rbIsSleeping(this.handle);
    }
  }, {
    key: "isMoving",
    value: function isMoving() {
      return this.rawSet.rbIsMoving(this.handle);
    }
  }, {
    key: "isFixed",
    value: function isFixed() {
      return this.rawSet.rbIsFixed(this.handle);
    }
  }, {
    key: "isKinematic",
    value: function isKinematic() {
      return this.rawSet.rbIsKinematic(this.handle);
    }
  }, {
    key: "isDynamic",
    value: function isDynamic() {
      return this.rawSet.rbIsDynamic(this.handle);
    }
  }, {
    key: "linearDamping",
    value: function linearDamping() {
      return this.rawSet.rbLinearDamping(this.handle);
    }
  }, {
    key: "angularDamping",
    value: function angularDamping() {
      return this.rawSet.rbAngularDamping(this.handle);
    }
  }, {
    key: "setLinearDamping",
    value: function setLinearDamping(A) {
      this.rawSet.rbSetLinearDamping(this.handle, A);
    }
  }, {
    key: "recomputeMassPropertiesFromColliders",
    value: function recomputeMassPropertiesFromColliders() {
      this.rawSet.rbRecomputeMassPropertiesFromColliders(this.handle, this.colliderSet.raw);
    }
  }, {
    key: "setAdditionalMass",
    value: function setAdditionalMass(A, I) {
      this.rawSet.rbSetAdditionalMass(this.handle, A, I);
    }
  }, {
    key: "setAdditionalMassProperties",
    value: function setAdditionalMassProperties(A, I, g, C, B) {
      var Q = DA.intoRaw(I),
        E = DA.intoRaw(g),
        i = GA.intoRaw(C);
      this.rawSet.rbSetAdditionalMassProperties(this.handle, A, Q, E, i, B), Q.free(), E.free(), i.free();
    }
  }, {
    key: "setAngularDamping",
    value: function setAngularDamping(A) {
      this.rawSet.rbSetAngularDamping(this.handle, A);
    }
  }, {
    key: "resetForces",
    value: function resetForces(A) {
      this.rawSet.rbResetForces(this.handle, A);
    }
  }, {
    key: "resetTorques",
    value: function resetTorques(A) {
      this.rawSet.rbResetTorques(this.handle, A);
    }
  }, {
    key: "addForce",
    value: function addForce(A, I) {
      var g = DA.intoRaw(A);
      this.rawSet.rbAddForce(this.handle, g, I), g.free();
    }
  }, {
    key: "applyImpulse",
    value: function applyImpulse(A, I) {
      var g = DA.intoRaw(A);
      this.rawSet.rbApplyImpulse(this.handle, g, I), g.free();
    }
  }, {
    key: "addTorque",
    value: function addTorque(A, I) {
      var g = DA.intoRaw(A);
      this.rawSet.rbAddTorque(this.handle, g, I), g.free();
    }
  }, {
    key: "applyTorqueImpulse",
    value: function applyTorqueImpulse(A, I) {
      var g = DA.intoRaw(A);
      this.rawSet.rbApplyTorqueImpulse(this.handle, g, I), g.free();
    }
  }, {
    key: "addForceAtPoint",
    value: function addForceAtPoint(A, I, g) {
      var C = DA.intoRaw(A),
        B = DA.intoRaw(I);
      this.rawSet.rbAddForceAtPoint(this.handle, C, B, g), C.free(), B.free();
    }
  }, {
    key: "applyImpulseAtPoint",
    value: function applyImpulseAtPoint(A, I, g) {
      var C = DA.intoRaw(A),
        B = DA.intoRaw(I);
      this.rawSet.rbApplyImpulseAtPoint(this.handle, C, B, g), C.free(), B.free();
    }
  }]);
  return sA;
}();
var cA = exports.RigidBodyDesc = /*#__PURE__*/function () {
  function cA(A) {
    _classCallCheck(this, cA);
    this.enabled = !0, this.status = A, this.translation = DA.zeros(), this.rotation = GA.identity(), this.gravityScale = 1, this.linvel = DA.zeros(), this.mass = 0, this.massOnly = !1, this.centerOfMass = DA.zeros(), this.translationsEnabledX = !0, this.translationsEnabledY = !0, this.angvel = DA.zeros(), this.principalAngularInertia = DA.zeros(), this.angularInertiaLocalFrame = GA.identity(), this.translationsEnabledZ = !0, this.rotationsEnabledX = !0, this.rotationsEnabledY = !0, this.rotationsEnabledZ = !0, this.linearDamping = 0, this.angularDamping = 0, this.canSleep = !0, this.sleeping = !1, this.ccdEnabled = !1, this.dominanceGroup = 0;
  }
  _createClass(cA, [{
    key: "setDominanceGroup",
    value: function setDominanceGroup(A) {
      return this.dominanceGroup = A, this;
    }
  }, {
    key: "setEnabled",
    value: function setEnabled(A) {
      return this.enabled = A, this;
    }
  }, {
    key: "setTranslation",
    value: function setTranslation(A, I, g) {
      if ("number" != typeof A || "number" != typeof I || "number" != typeof g) throw TypeError("The translation components must be numbers.");
      return this.translation = {
        x: A,
        y: I,
        z: g
      }, this;
    }
  }, {
    key: "setRotation",
    value: function setRotation(A) {
      return GA.copy(this.rotation, A), this;
    }
  }, {
    key: "setGravityScale",
    value: function setGravityScale(A) {
      return this.gravityScale = A, this;
    }
  }, {
    key: "setAdditionalMass",
    value: function setAdditionalMass(A) {
      return this.mass = A, this.massOnly = !0, this;
    }
  }, {
    key: "setLinvel",
    value: function setLinvel(A, I, g) {
      if ("number" != typeof A || "number" != typeof I || "number" != typeof g) throw TypeError("The linvel components must be numbers.");
      return this.linvel = {
        x: A,
        y: I,
        z: g
      }, this;
    }
  }, {
    key: "setAngvel",
    value: function setAngvel(A) {
      return DA.copy(this.angvel, A), this;
    }
  }, {
    key: "setAdditionalMassProperties",
    value: function setAdditionalMassProperties(A, I, g, C) {
      return this.mass = A, DA.copy(this.centerOfMass, I), DA.copy(this.principalAngularInertia, g), GA.copy(this.angularInertiaLocalFrame, C), this.massOnly = !1, this;
    }
  }, {
    key: "enabledTranslations",
    value: function enabledTranslations(A, I, g) {
      return this.translationsEnabledX = A, this.translationsEnabledY = I, this.translationsEnabledZ = g, this;
    }
  }, {
    key: "restrictTranslations",
    value: function restrictTranslations(A, I, g) {
      return this.enabledTranslations(A, I, g);
    }
  }, {
    key: "lockTranslations",
    value: function lockTranslations() {
      return this.enabledTranslations(!1, !1, !1);
    }
  }, {
    key: "enabledRotations",
    value: function enabledRotations(A, I, g) {
      return this.rotationsEnabledX = A, this.rotationsEnabledY = I, this.rotationsEnabledZ = g, this;
    }
  }, {
    key: "restrictRotations",
    value: function restrictRotations(A, I, g) {
      return this.enabledRotations(A, I, g);
    }
  }, {
    key: "lockRotations",
    value: function lockRotations() {
      return this.restrictRotations(!1, !1, !1);
    }
  }, {
    key: "setLinearDamping",
    value: function setLinearDamping(A) {
      return this.linearDamping = A, this;
    }
  }, {
    key: "setAngularDamping",
    value: function setAngularDamping(A) {
      return this.angularDamping = A, this;
    }
  }, {
    key: "setCanSleep",
    value: function setCanSleep(A) {
      return this.canSleep = A, this;
    }
  }, {
    key: "setSleeping",
    value: function setSleeping(A) {
      return this.sleeping = A, this;
    }
  }, {
    key: "setCcdEnabled",
    value: function setCcdEnabled(A) {
      return this.ccdEnabled = A, this;
    }
  }, {
    key: "setUserData",
    value: function setUserData(A) {
      return this.userData = A, this;
    }
  }], [{
    key: "dynamic",
    value: function dynamic() {
      return new cA(SA.Dynamic);
    }
  }, {
    key: "kinematicPositionBased",
    value: function kinematicPositionBased() {
      return new cA(SA.KinematicPositionBased);
    }
  }, {
    key: "kinematicVelocityBased",
    value: function kinematicVelocityBased() {
      return new cA(SA.KinematicVelocityBased);
    }
  }, {
    key: "fixed",
    value: function fixed() {
      return new cA(SA.Fixed);
    }
  }, {
    key: "newDynamic",
    value: function newDynamic() {
      return new cA(SA.Dynamic);
    }
  }, {
    key: "newKinematicPositionBased",
    value: function newKinematicPositionBased() {
      return new cA(SA.KinematicPositionBased);
    }
  }, {
    key: "newKinematicVelocityBased",
    value: function newKinematicVelocityBased() {
      return new cA(SA.KinematicVelocityBased);
    }
  }, {
    key: "newStatic",
    value: function newStatic() {
      return new cA(SA.Fixed);
    }
  }]);
  return cA;
}();
var YA = /*#__PURE__*/function () {
  function YA() {
    _classCallCheck(this, YA);
    this.fconv = new Float64Array(1), this.uconv = new Uint32Array(this.fconv.buffer), this.data = new Array(), this.size = 0;
  }
  _createClass(YA, [{
    key: "set",
    value: function set(A, I) {
      var g = this.index(A);
      for (; this.data.length <= g;) this.data.push(null);
      null == this.data[g] && (this.size += 1), this.data[g] = I;
    }
  }, {
    key: "len",
    value: function len() {
      return this.size;
    }
  }, {
    key: "delete",
    value: function _delete(A) {
      var I = this.index(A);
      I < this.data.length && (null != this.data[I] && (this.size -= 1), this.data[I] = null);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.data = new Array();
    }
  }, {
    key: "get",
    value: function get(A) {
      var I = this.index(A);
      return I < this.data.length ? this.data[I] : null;
    }
  }, {
    key: "forEach",
    value: function forEach(A) {
      var _iterator = _createForOfIteratorHelper(this.data),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _I = _step.value;
          null != _I && A(_I);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.data.filter(function (A) {
        return null != A;
      });
    }
  }, {
    key: "index",
    value: function index(A) {
      return this.fconv[0] = A, this.uconv[0];
    }
  }]);
  return YA;
}();
var LA = exports.RigidBodySet = /*#__PURE__*/function () {
  function LA(A) {
    var _this = this;
    _classCallCheck(this, LA);
    this.raw = A || new v(), this.map = new YA(), A && A.forEachRigidBodyHandle(function (I) {
      _this.map.set(I, new sA(A, null, I));
    });
  }
  _createClass(LA, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0, this.map && this.map.clear(), this.map = void 0;
    }
  }, {
    key: "finalizeDeserialization",
    value: function finalizeDeserialization(A) {
      this.map.forEach(function (I) {
        return I.finalizeDeserialization(A);
      });
    }
  }, {
    key: "createRigidBody",
    value: function createRigidBody(A, I) {
      var g = DA.intoRaw(I.translation),
        C = GA.intoRaw(I.rotation),
        B = DA.intoRaw(I.linvel),
        Q = DA.intoRaw(I.centerOfMass),
        E = DA.intoRaw(I.angvel),
        i = DA.intoRaw(I.principalAngularInertia),
        D = GA.intoRaw(I.angularInertiaLocalFrame),
        o = this.raw.createRigidBody(I.enabled, g, C, I.gravityScale, I.mass, I.massOnly, Q, B, E, i, D, I.translationsEnabledX, I.translationsEnabledY, I.translationsEnabledZ, I.rotationsEnabledX, I.rotationsEnabledY, I.rotationsEnabledZ, I.linearDamping, I.angularDamping, I.status, I.canSleep, I.sleeping, I.ccdEnabled, I.dominanceGroup);
      g.free(), C.free(), B.free(), Q.free(), E.free(), i.free(), D.free();
      var G = new sA(this.raw, A, o);
      return G.userData = I.userData, this.map.set(o, G), G;
    }
  }, {
    key: "remove",
    value: function remove(A, I, g, C, B) {
      for (var _I2 = 0; _I2 < this.raw.rbNumColliders(A); _I2 += 1) g.unmap(this.raw.rbCollider(A, _I2));
      C.forEachJointHandleAttachedToRigidBody(A, function (A) {
        return C.unmap(A);
      }), B.forEachJointHandleAttachedToRigidBody(A, function (A) {
        return B.unmap(A);
      }), this.raw.remove(A, I.raw, g.raw, C.raw, B.raw), this.map.delete(A);
    }
  }, {
    key: "len",
    value: function len() {
      return this.map.len();
    }
  }, {
    key: "contains",
    value: function contains(A) {
      return null != this.get(A);
    }
  }, {
    key: "get",
    value: function get(A) {
      return this.map.get(A);
    }
  }, {
    key: "forEach",
    value: function forEach(A) {
      this.map.forEach(A);
    }
  }, {
    key: "forEachActiveRigidBody",
    value: function forEachActiveRigidBody(A, I) {
      var _this2 = this;
      A.forEachActiveRigidBodyHandle(function (A) {
        I(_this2.get(A));
      });
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.map.getAll();
    }
  }]);
  return LA;
}();
var HA = exports.IntegrationParameters = /*#__PURE__*/function () {
  function HA(A) {
    _classCallCheck(this, HA);
    this.raw = A || new Z();
  }
  _createClass(HA, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }, {
    key: "dt",
    get: function get() {
      return this.raw.dt;
    },
    set: function set(A) {
      this.raw.dt = A;
    }
  }, {
    key: "erp",
    get: function get() {
      return this.raw.erp;
    },
    set: function set(A) {
      this.raw.erp = A;
    }
  }, {
    key: "allowedLinearError",
    get: function get() {
      return this.raw.allowedLinearError;
    },
    set: function set(A) {
      this.raw.allowedLinearError = A;
    }
  }, {
    key: "predictionDistance",
    get: function get() {
      return this.raw.predictionDistance;
    },
    set: function set(A) {
      this.raw.predictionDistance = A;
    }
  }, {
    key: "maxVelocityIterations",
    get: function get() {
      return this.raw.maxVelocityIterations;
    },
    set: function set(A) {
      this.raw.maxVelocityIterations = A;
    }
  }, {
    key: "maxVelocityFrictionIterations",
    get: function get() {
      return this.raw.maxVelocityFrictionIterations;
    },
    set: function set(A) {
      this.raw.maxVelocityFrictionIterations = A;
    }
  }, {
    key: "maxStabilizationIterations",
    get: function get() {
      return this.raw.maxStabilizationIterations;
    },
    set: function set(A) {
      this.raw.maxStabilizationIterations = A;
    }
  }, {
    key: "minIslandSize",
    get: function get() {
      return this.raw.minIslandSize;
    },
    set: function set(A) {
      this.raw.minIslandSize = A;
    }
  }, {
    key: "maxCcdSubsteps",
    get: function get() {
      return this.raw.maxCcdSubsteps;
    },
    set: function set(A) {
      this.raw.maxCcdSubsteps = A;
    }
  }]);
  return HA;
}();
!function (A) {
  A[A.Revolute = 0] = "Revolute", A[A.Fixed = 1] = "Fixed", A[A.Prismatic = 2] = "Prismatic", A[A.Spherical = 3] = "Spherical";
}(aA || (exports.JointType = aA = {})), function (A) {
  A[A.AccelerationBased = 0] = "AccelerationBased", A[A.ForceBased = 1] = "ForceBased";
}(MA || (exports.MotorModel = MA = {}));
var lA = exports.ImpulseJoint = /*#__PURE__*/function () {
  function lA(A, I, g) {
    _classCallCheck(this, lA);
    this.rawSet = A, this.bodySet = I, this.handle = g;
  }
  _createClass(lA, [{
    key: "finalizeDeserialization",
    value: function finalizeDeserialization(A) {
      this.bodySet = A;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return this.rawSet.contains(this.handle);
    }
  }, {
    key: "body1",
    value: function body1() {
      return this.bodySet.get(this.rawSet.jointBodyHandle1(this.handle));
    }
  }, {
    key: "body2",
    value: function body2() {
      return this.bodySet.get(this.rawSet.jointBodyHandle2(this.handle));
    }
  }, {
    key: "type",
    value: function type() {
      return this.rawSet.jointType(this.handle);
    }
  }, {
    key: "frameX1",
    value: function frameX1() {
      return GA.fromRaw(this.rawSet.jointFrameX1(this.handle));
    }
  }, {
    key: "frameX2",
    value: function frameX2() {
      return GA.fromRaw(this.rawSet.jointFrameX2(this.handle));
    }
  }, {
    key: "anchor1",
    value: function anchor1() {
      return DA.fromRaw(this.rawSet.jointAnchor1(this.handle));
    }
  }, {
    key: "anchor2",
    value: function anchor2() {
      return DA.fromRaw(this.rawSet.jointAnchor2(this.handle));
    }
  }, {
    key: "setAnchor1",
    value: function setAnchor1(A) {
      var I = DA.intoRaw(A);
      this.rawSet.jointSetAnchor1(this.handle, I), I.free();
    }
  }, {
    key: "setAnchor2",
    value: function setAnchor2(A) {
      var I = DA.intoRaw(A);
      this.rawSet.jointSetAnchor2(this.handle, I), I.free();
    }
  }, {
    key: "setContactsEnabled",
    value: function setContactsEnabled(A) {
      this.rawSet.jointSetContactsEnabled(this.handle, A);
    }
  }, {
    key: "contactsEnabled",
    value: function contactsEnabled() {
      return this.rawSet.jointContactsEnabled(this.handle);
    }
  }], [{
    key: "newTyped",
    value: function newTyped(A, I, g) {
      switch (A.jointType(g)) {
        case aA.Revolute:
          return new rA(A, I, g);
        case aA.Prismatic:
          return new eA(A, I, g);
        case aA.Fixed:
          return new pA(A, I, g);
        case aA.Spherical:
          return new dA(A, I, g);
        default:
          return new lA(A, I, g);
      }
    }
  }]);
  return lA;
}();
var tA = exports.UnitImpulseJoint = /*#__PURE__*/function (_lA) {
  _inherits(tA, _lA);
  var _super = _createSuper(tA);
  function tA() {
    _classCallCheck(this, tA);
    return _super.apply(this, arguments);
  }
  _createClass(tA, [{
    key: "limitsEnabled",
    value: function limitsEnabled() {
      return this.rawSet.jointLimitsEnabled(this.handle, this.rawAxis());
    }
  }, {
    key: "limitsMin",
    value: function limitsMin() {
      return this.rawSet.jointLimitsMin(this.handle, this.rawAxis());
    }
  }, {
    key: "limitsMax",
    value: function limitsMax() {
      return this.rawSet.jointLimitsMax(this.handle, this.rawAxis());
    }
  }, {
    key: "setLimits",
    value: function setLimits(A, I) {
      this.rawSet.jointSetLimits(this.handle, this.rawAxis(), A, I);
    }
  }, {
    key: "configureMotorModel",
    value: function configureMotorModel(A) {
      this.rawSet.jointConfigureMotorModel(this.handle, this.rawAxis(), A);
    }
  }, {
    key: "configureMotorVelocity",
    value: function configureMotorVelocity(A, I) {
      this.rawSet.jointConfigureMotorVelocity(this.handle, this.rawAxis(), A, I);
    }
  }, {
    key: "configureMotorPosition",
    value: function configureMotorPosition(A, I, g) {
      this.rawSet.jointConfigureMotorPosition(this.handle, this.rawAxis(), A, I, g);
    }
  }, {
    key: "configureMotor",
    value: function configureMotor(A, I, g, C) {
      this.rawSet.jointConfigureMotor(this.handle, this.rawAxis(), A, I, g, C);
    }
  }]);
  return tA;
}(lA);
var pA = exports.FixedImpulseJoint = /*#__PURE__*/function (_lA2) {
  _inherits(pA, _lA2);
  var _super2 = _createSuper(pA);
  function pA() {
    _classCallCheck(this, pA);
    return _super2.apply(this, arguments);
  }
  return _createClass(pA);
}(lA);
var eA = exports.PrismaticImpulseJoint = /*#__PURE__*/function (_tA) {
  _inherits(eA, _tA);
  var _super3 = _createSuper(eA);
  function eA() {
    _classCallCheck(this, eA);
    return _super3.apply(this, arguments);
  }
  _createClass(eA, [{
    key: "rawAxis",
    value: function rawAxis() {
      return c.X;
    }
  }]);
  return eA;
}(tA);
var rA = exports.RevoluteImpulseJoint = /*#__PURE__*/function (_tA2) {
  _inherits(rA, _tA2);
  var _super4 = _createSuper(rA);
  function rA() {
    _classCallCheck(this, rA);
    return _super4.apply(this, arguments);
  }
  _createClass(rA, [{
    key: "rawAxis",
    value: function rawAxis() {
      return c.AngX;
    }
  }]);
  return rA;
}(tA);
var dA = exports.SphericalImpulseJoint = /*#__PURE__*/function (_lA3) {
  _inherits(dA, _lA3);
  var _super5 = _createSuper(dA);
  function dA() {
    _classCallCheck(this, dA);
    return _super5.apply(this, arguments);
  }
  return _createClass(dA);
}(lA);
var TA = exports.JointData = /*#__PURE__*/function () {
  function TA() {
    _classCallCheck(this, TA);
  }
  _createClass(TA, [{
    key: "intoRaw",
    value: function intoRaw() {
      var A,
        I,
        g = DA.intoRaw(this.anchor1),
        C = DA.intoRaw(this.anchor2),
        B = !1,
        Q = 0,
        E = 0;
      switch (this.jointType) {
        case aA.Fixed:
          var _i = GA.intoRaw(this.frame1),
            _D = GA.intoRaw(this.frame2);
          I = O.fixed(g, _i, C, _D), _i.free(), _D.free();
          break;
        case aA.Prismatic:
          A = DA.intoRaw(this.axis), this.limitsEnabled && (B = !0, Q = this.limits[0], E = this.limits[1]), I = O.prismatic(g, C, A, B, Q, E), A.free();
          break;
        case aA.Spherical:
          I = O.spherical(g, C);
          break;
        case aA.Revolute:
          A = DA.intoRaw(this.axis), I = O.revolute(g, C, A), A.free();
      }
      return g.free(), C.free(), I;
    }
  }], [{
    key: "fixed",
    value: function fixed(A, I, g, C) {
      var B = new TA();
      return B.anchor1 = A, B.anchor2 = g, B.frame1 = I, B.frame2 = C, B.jointType = aA.Fixed, B;
    }
  }, {
    key: "spherical",
    value: function spherical(A, I) {
      var g = new TA();
      return g.anchor1 = A, g.anchor2 = I, g.jointType = aA.Spherical, g;
    }
  }, {
    key: "prismatic",
    value: function prismatic(A, I, g) {
      var C = new TA();
      return C.anchor1 = A, C.anchor2 = I, C.axis = g, C.jointType = aA.Prismatic, C;
    }
  }, {
    key: "revolute",
    value: function revolute(A, I, g) {
      var C = new TA();
      return C.anchor1 = A, C.anchor2 = I, C.axis = g, C.jointType = aA.Revolute, C;
    }
  }]);
  return TA;
}();
var OA = exports.ImpulseJointSet = /*#__PURE__*/function () {
  function OA(A) {
    var _this3 = this;
    _classCallCheck(this, OA);
    this.raw = A || new n(), this.map = new YA(), A && A.forEachJointHandle(function (I) {
      _this3.map.set(I, lA.newTyped(A, null, I));
    });
  }
  _createClass(OA, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0, this.map && this.map.clear(), this.map = void 0;
    }
  }, {
    key: "finalizeDeserialization",
    value: function finalizeDeserialization(A) {
      this.map.forEach(function (I) {
        return I.finalizeDeserialization(A);
      });
    }
  }, {
    key: "createJoint",
    value: function createJoint(A, I, g, C, B) {
      var Q = I.intoRaw(),
        E = this.raw.createJoint(Q, g, C, B);
      Q.free();
      var i = lA.newTyped(this.raw, A, E);
      return this.map.set(E, i), i;
    }
  }, {
    key: "remove",
    value: function remove(A, I) {
      this.raw.remove(A, I), this.unmap(A);
    }
  }, {
    key: "forEachJointHandleAttachedToRigidBody",
    value: function forEachJointHandleAttachedToRigidBody(A, I) {
      this.raw.forEachJointAttachedToRigidBody(A, I);
    }
  }, {
    key: "unmap",
    value: function unmap(A) {
      this.map.delete(A);
    }
  }, {
    key: "len",
    value: function len() {
      return this.map.len();
    }
  }, {
    key: "contains",
    value: function contains(A) {
      return null != this.get(A);
    }
  }, {
    key: "get",
    value: function get(A) {
      return this.map.get(A);
    }
  }, {
    key: "forEach",
    value: function forEach(A) {
      this.map.forEach(A);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.map.getAll();
    }
  }]);
  return OA;
}();
var nA = exports.MultibodyJoint = /*#__PURE__*/function () {
  function nA(A, I) {
    _classCallCheck(this, nA);
    this.rawSet = A, this.handle = I;
  }
  _createClass(nA, [{
    key: "isValid",
    value: function isValid() {
      return this.rawSet.contains(this.handle);
    }
  }, {
    key: "setContactsEnabled",
    value: function setContactsEnabled(A) {
      this.rawSet.jointSetContactsEnabled(this.handle, A);
    }
  }, {
    key: "contactsEnabled",
    value: function contactsEnabled() {
      return this.rawSet.jointContactsEnabled(this.handle);
    }
  }], [{
    key: "newTyped",
    value: function newTyped(A, I) {
      switch (A.jointType(I)) {
        case aA.Revolute:
          return new jA(A, I);
        case aA.Prismatic:
          return new WA(A, I);
        case aA.Fixed:
          return new bA(A, I);
        case aA.Spherical:
          return new xA(A, I);
        default:
          return new nA(A, I);
      }
    }
  }]);
  return nA;
}();
var ZA = exports.UnitMultibodyJoint = /*#__PURE__*/function (_nA) {
  _inherits(ZA, _nA);
  var _super6 = _createSuper(ZA);
  function ZA() {
    _classCallCheck(this, ZA);
    return _super6.apply(this, arguments);
  }
  return _createClass(ZA);
}(nA);
var bA = exports.FixedMultibodyJoint = /*#__PURE__*/function (_nA2) {
  _inherits(bA, _nA2);
  var _super7 = _createSuper(bA);
  function bA() {
    _classCallCheck(this, bA);
    return _super7.apply(this, arguments);
  }
  return _createClass(bA);
}(nA);
var WA = exports.PrismaticMultibodyJoint = /*#__PURE__*/function (_ZA) {
  _inherits(WA, _ZA);
  var _super8 = _createSuper(WA);
  function WA() {
    _classCallCheck(this, WA);
    return _super8.apply(this, arguments);
  }
  _createClass(WA, [{
    key: "rawAxis",
    value: function rawAxis() {
      return c.X;
    }
  }]);
  return WA;
}(ZA);
var jA = exports.RevoluteMultibodyJoint = /*#__PURE__*/function (_ZA2) {
  _inherits(jA, _ZA2);
  var _super9 = _createSuper(jA);
  function jA() {
    _classCallCheck(this, jA);
    return _super9.apply(this, arguments);
  }
  _createClass(jA, [{
    key: "rawAxis",
    value: function rawAxis() {
      return c.AngX;
    }
  }]);
  return jA;
}(ZA);
var xA = exports.SphericalMultibodyJoint = /*#__PURE__*/function (_nA3) {
  _inherits(xA, _nA3);
  var _super10 = _createSuper(xA);
  function xA() {
    _classCallCheck(this, xA);
    return _super10.apply(this, arguments);
  }
  return _createClass(xA);
}(nA);
var fA = exports.MultibodyJointSet = /*#__PURE__*/function () {
  function fA(A) {
    var _this4 = this;
    _classCallCheck(this, fA);
    this.raw = A || new j(), this.map = new YA(), A && A.forEachJointHandle(function (A) {
      _this4.map.set(A, nA.newTyped(_this4.raw, A));
    });
  }
  _createClass(fA, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0, this.map && this.map.clear(), this.map = void 0;
    }
  }, {
    key: "createJoint",
    value: function createJoint(A, I, g, C) {
      var B = A.intoRaw(),
        Q = this.raw.createJoint(B, I, g, C);
      B.free();
      var E = nA.newTyped(this.raw, Q);
      return this.map.set(Q, E), E;
    }
  }, {
    key: "remove",
    value: function remove(A, I) {
      this.raw.remove(A, I), this.map.delete(A);
    }
  }, {
    key: "unmap",
    value: function unmap(A) {
      this.map.delete(A);
    }
  }, {
    key: "len",
    value: function len() {
      return this.map.len();
    }
  }, {
    key: "contains",
    value: function contains(A) {
      return null != this.get(A);
    }
  }, {
    key: "get",
    value: function get(A) {
      return this.map.get(A);
    }
  }, {
    key: "forEach",
    value: function forEach(A) {
      this.map.forEach(A);
    }
  }, {
    key: "forEachJointHandleAttachedToRigidBody",
    value: function forEachJointHandleAttachedToRigidBody(A, I) {
      this.raw.forEachJointAttachedToRigidBody(A, I);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.map.getAll();
    }
  }]);
  return fA;
}();
!function (A) {
  A[A.Average = 0] = "Average", A[A.Min = 1] = "Min", A[A.Multiply = 2] = "Multiply", A[A.Max = 3] = "Max";
}(KA || (exports.CoefficientCombineRule = KA = {}));
var mA = exports.CCDSolver = /*#__PURE__*/function () {
  function mA(A) {
    _classCallCheck(this, mA);
    this.raw = A || new L();
  }
  _createClass(mA, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }]);
  return mA;
}();
var XA = exports.IslandManager = /*#__PURE__*/function () {
  function XA(A) {
    _classCallCheck(this, XA);
    this.raw = A || new b();
  }
  _createClass(XA, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }, {
    key: "forEachActiveRigidBodyHandle",
    value: function forEachActiveRigidBodyHandle(A) {
      this.raw.forEachActiveRigidBodyHandle(A);
    }
  }]);
  return XA;
}();
var VA = exports.BroadPhase = /*#__PURE__*/function () {
  function VA(A) {
    _classCallCheck(this, VA);
    this.raw = A || new Y();
  }
  _createClass(VA, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }]);
  return VA;
}();
var PA = exports.NarrowPhase = /*#__PURE__*/function () {
  function PA(A) {
    _classCallCheck(this, PA);
    this.raw = A || new x(), this.tempManifold = new zA(null);
  }
  _createClass(PA, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }, {
    key: "contactsWith",
    value: function contactsWith(A, I) {
      this.raw.contacts_with(A, I);
    }
  }, {
    key: "intersectionsWith",
    value: function intersectionsWith(A, I) {
      this.raw.intersections_with(A, I);
    }
  }, {
    key: "contactPair",
    value: function contactPair(A, I, g) {
      var C = this.raw.contact_pair(A, I);
      if (C) {
        var _I3 = C.collider1() != A;
        var _B10;
        for (_B10 = 0; _B10 < C.numContactManifolds(); ++_B10) this.tempManifold.raw = C.contactManifold(_B10), this.tempManifold.raw && g(this.tempManifold, _I3), this.tempManifold.free();
        C.free();
      }
    }
  }, {
    key: "intersectionPair",
    value: function intersectionPair(A, I) {
      return this.raw.intersection_pair(A, I);
    }
  }]);
  return PA;
}();
var zA = exports.TempContactManifold = /*#__PURE__*/function () {
  function zA(A) {
    _classCallCheck(this, zA);
    this.raw = A;
  }
  _createClass(zA, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }, {
    key: "normal",
    value: function normal() {
      return DA.fromRaw(this.raw.normal());
    }
  }, {
    key: "localNormal1",
    value: function localNormal1() {
      return DA.fromRaw(this.raw.local_n1());
    }
  }, {
    key: "localNormal2",
    value: function localNormal2() {
      return DA.fromRaw(this.raw.local_n2());
    }
  }, {
    key: "subshape1",
    value: function subshape1() {
      return this.raw.subshape1();
    }
  }, {
    key: "subshape2",
    value: function subshape2() {
      return this.raw.subshape2();
    }
  }, {
    key: "numContacts",
    value: function numContacts() {
      return this.raw.num_contacts();
    }
  }, {
    key: "localContactPoint1",
    value: function localContactPoint1(A) {
      return DA.fromRaw(this.raw.contact_local_p1(A));
    }
  }, {
    key: "localContactPoint2",
    value: function localContactPoint2(A) {
      return DA.fromRaw(this.raw.contact_local_p2(A));
    }
  }, {
    key: "contactDist",
    value: function contactDist(A) {
      return this.raw.contact_dist(A);
    }
  }, {
    key: "contactFid1",
    value: function contactFid1(A) {
      return this.raw.contact_fid1(A);
    }
  }, {
    key: "contactFid2",
    value: function contactFid2(A) {
      return this.raw.contact_fid2(A);
    }
  }, {
    key: "contactImpulse",
    value: function contactImpulse(A) {
      return this.raw.contact_impulse(A);
    }
  }, {
    key: "contactTangentImpulseX",
    value: function contactTangentImpulseX(A) {
      return this.raw.contact_tangent_impulse_x(A);
    }
  }, {
    key: "contactTangentImpulseY",
    value: function contactTangentImpulseY(A) {
      return this.raw.contact_tangent_impulse_y(A);
    }
  }, {
    key: "numSolverContacts",
    value: function numSolverContacts() {
      return this.raw.num_solver_contacts();
    }
  }, {
    key: "solverContactPoint",
    value: function solverContactPoint(A) {
      return DA.fromRaw(this.raw.solver_contact_point(A));
    }
  }, {
    key: "solverContactDist",
    value: function solverContactDist(A) {
      return this.raw.solver_contact_dist(A);
    }
  }, {
    key: "solverContactFriction",
    value: function solverContactFriction(A) {
      return this.raw.solver_contact_friction(A);
    }
  }, {
    key: "solverContactRestitution",
    value: function solverContactRestitution(A) {
      return this.raw.solver_contact_restitution(A);
    }
  }, {
    key: "solverContactTangentVelocity",
    value: function solverContactTangentVelocity(A) {
      return DA.fromRaw(this.raw.solver_contact_tangent_velocity(A));
    }
  }]);
  return zA;
}();
var uA = exports.ShapeContact = /*#__PURE__*/function () {
  function uA(A, I, g, C, B) {
    _classCallCheck(this, uA);
    this.distance = A, this.point1 = I, this.point2 = g, this.normal1 = C, this.normal2 = B;
  }
  _createClass(uA, null, [{
    key: "fromRaw",
    value: function fromRaw(A) {
      if (!A) return null;
      var I = new uA(A.distance(), DA.fromRaw(A.point1()), DA.fromRaw(A.point2()), DA.fromRaw(A.normal1()), DA.fromRaw(A.normal2()));
      return A.free(), I;
    }
  }]);
  return uA;
}();
!function (A) {
  A[A.Vertex = 0] = "Vertex", A[A.Edge = 1] = "Edge", A[A.Face = 2] = "Face", A[A.Unknown = 3] = "Unknown";
}(yA || (exports.FeatureType = yA = {}));
var vA = exports.PointProjection = /*#__PURE__*/function () {
  function vA(A, I) {
    _classCallCheck(this, vA);
    this.point = A, this.isInside = I;
  }
  _createClass(vA, null, [{
    key: "fromRaw",
    value: function fromRaw(A) {
      if (!A) return null;
      var I = new vA(DA.fromRaw(A.point()), A.isInside());
      return A.free(), I;
    }
  }]);
  return vA;
}();
var _A = exports.PointColliderProjection = /*#__PURE__*/function () {
  function _A(A, I, g, C, B) {
    _classCallCheck(this, _A);
    this.featureType = yA.Unknown, this.featureId = void 0, this.collider = A, this.point = I, this.isInside = g, void 0 !== B && (this.featureId = B), void 0 !== C && (this.featureType = C);
  }
  _createClass(_A, null, [{
    key: "fromRaw",
    value: function fromRaw(A, I) {
      if (!I) return null;
      var g = new _A(A.get(I.colliderHandle()), DA.fromRaw(I.point()), I.isInside(), I.featureType(), I.featureId());
      return I.free(), g;
    }
  }]);
  return _A;
}();
var $A = exports.Ray = /*#__PURE__*/function () {
  function $A(A, I) {
    _classCallCheck(this, $A);
    this.origin = A, this.dir = I;
  }
  _createClass($A, [{
    key: "pointAt",
    value: function pointAt(A) {
      return {
        x: this.origin.x + this.dir.x * A,
        y: this.origin.y + this.dir.y * A,
        z: this.origin.z + this.dir.z * A
      };
    }
  }]);
  return $A;
}();
var AI = exports.RayIntersection = /*#__PURE__*/function () {
  function AI(A, I, g, C) {
    _classCallCheck(this, AI);
    this.featureType = yA.Unknown, this.featureId = void 0, this.toi = A, this.normal = I, void 0 !== C && (this.featureId = C), void 0 !== g && (this.featureType = g);
  }
  _createClass(AI, null, [{
    key: "fromRaw",
    value: function fromRaw(A) {
      if (!A) return null;
      var I = new AI(A.toi(), DA.fromRaw(A.normal()), A.featureType(), A.featureId());
      return A.free(), I;
    }
  }]);
  return AI;
}();
var II = exports.RayColliderIntersection = /*#__PURE__*/function () {
  function II(A, I, g, C, B) {
    _classCallCheck(this, II);
    this.featureType = yA.Unknown, this.featureId = void 0, this.collider = A, this.toi = I, this.normal = g, void 0 !== B && (this.featureId = B), void 0 !== C && (this.featureType = C);
  }
  _createClass(II, null, [{
    key: "fromRaw",
    value: function fromRaw(A, I) {
      if (!I) return null;
      var g = new II(A.get(I.colliderHandle()), I.toi(), DA.fromRaw(I.normal()), I.featureType(), I.featureId());
      return I.free(), g;
    }
  }]);
  return II;
}();
var gI = exports.RayColliderToi = /*#__PURE__*/function () {
  function gI(A, I) {
    _classCallCheck(this, gI);
    this.collider = A, this.toi = I;
  }
  _createClass(gI, null, [{
    key: "fromRaw",
    value: function fromRaw(A, I) {
      if (!I) return null;
      var g = new gI(A.get(I.colliderHandle()), I.toi());
      return I.free(), g;
    }
  }]);
  return gI;
}();
var CI = exports.ShapeTOI = /*#__PURE__*/function () {
  function CI(A, I, g, C, B) {
    _classCallCheck(this, CI);
    this.toi = A, this.witness1 = I, this.witness2 = g, this.normal1 = C, this.normal2 = B;
  }
  _createClass(CI, null, [{
    key: "fromRaw",
    value: function fromRaw(A, I) {
      if (!I) return null;
      var g = new CI(I.toi(), DA.fromRaw(I.witness1()), DA.fromRaw(I.witness2()), DA.fromRaw(I.normal1()), DA.fromRaw(I.normal2()));
      return I.free(), g;
    }
  }]);
  return CI;
}();
var BI = exports.ShapeColliderTOI = /*#__PURE__*/function (_CI) {
  _inherits(BI, _CI);
  var _super11 = _createSuper(BI);
  function BI(A, I, g, C, B, Q) {
    var _this5;
    _classCallCheck(this, BI);
    _this5 = _super11.call(this, I, g, C, B, Q), _this5.collider = A;
    return _this5;
  }
  _createClass(BI, null, [{
    key: "fromRaw",
    value: function fromRaw(A, I) {
      if (!I) return null;
      var g = new BI(A.get(I.colliderHandle()), I.toi(), DA.fromRaw(I.witness1()), DA.fromRaw(I.witness2()), DA.fromRaw(I.normal1()), DA.fromRaw(I.normal2()));
      return I.free(), g;
    }
  }]);
  return BI;
}(CI);
var QI = exports.Shape = /*#__PURE__*/function () {
  function QI() {
    _classCallCheck(this, QI);
  }
  _createClass(QI, [{
    key: "castShape",
    value: function castShape(A, I, g, C, B, Q, E, i, D) {
      var o = DA.intoRaw(A),
        G = GA.intoRaw(I),
        w = DA.intoRaw(g),
        k = DA.intoRaw(B),
        S = GA.intoRaw(Q),
        a = DA.intoRaw(E),
        M = this.intoRaw(),
        K = C.intoRaw(),
        y = CI.fromRaw(null, M.castShape(o, G, w, K, k, S, a, i, D));
      return o.free(), G.free(), w.free(), k.free(), S.free(), a.free(), M.free(), K.free(), y;
    }
  }, {
    key: "intersectsShape",
    value: function intersectsShape(A, I, g, C, B) {
      var Q = DA.intoRaw(A),
        E = GA.intoRaw(I),
        i = DA.intoRaw(C),
        D = GA.intoRaw(B),
        o = this.intoRaw(),
        G = g.intoRaw(),
        w = o.intersectsShape(Q, E, G, i, D);
      return Q.free(), E.free(), i.free(), D.free(), o.free(), G.free(), w;
    }
  }, {
    key: "contactShape",
    value: function contactShape(A, I, g, C, B, Q) {
      var E = DA.intoRaw(A),
        i = GA.intoRaw(I),
        D = DA.intoRaw(C),
        o = GA.intoRaw(B),
        G = this.intoRaw(),
        w = g.intoRaw(),
        k = uA.fromRaw(G.contactShape(E, i, w, D, o, Q));
      return E.free(), i.free(), D.free(), o.free(), G.free(), w.free(), k;
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(A, I, g) {
      var C = DA.intoRaw(A),
        B = GA.intoRaw(I),
        Q = DA.intoRaw(g),
        E = this.intoRaw(),
        i = E.containsPoint(C, B, Q);
      return C.free(), B.free(), Q.free(), E.free(), i;
    }
  }, {
    key: "projectPoint",
    value: function projectPoint(A, I, g, C) {
      var B = DA.intoRaw(A),
        Q = GA.intoRaw(I),
        E = DA.intoRaw(g),
        i = this.intoRaw(),
        D = vA.fromRaw(i.projectPoint(B, Q, E, C));
      return B.free(), Q.free(), E.free(), i.free(), D;
    }
  }, {
    key: "intersectsRay",
    value: function intersectsRay(A, I, g, C) {
      var B = DA.intoRaw(I),
        Q = GA.intoRaw(g),
        E = DA.intoRaw(A.origin),
        i = DA.intoRaw(A.dir),
        D = this.intoRaw(),
        o = D.intersectsRay(B, Q, E, i, C);
      return B.free(), Q.free(), E.free(), i.free(), D.free(), o;
    }
  }, {
    key: "castRay",
    value: function castRay(A, I, g, C, B) {
      var Q = DA.intoRaw(I),
        E = GA.intoRaw(g),
        i = DA.intoRaw(A.origin),
        D = DA.intoRaw(A.dir),
        o = this.intoRaw(),
        G = o.castRay(Q, E, i, D, C, B);
      return Q.free(), E.free(), i.free(), D.free(), o.free(), G;
    }
  }, {
    key: "castRayAndGetNormal",
    value: function castRayAndGetNormal(A, I, g, C, B) {
      var Q = DA.intoRaw(I),
        E = GA.intoRaw(g),
        i = DA.intoRaw(A.origin),
        D = DA.intoRaw(A.dir),
        o = this.intoRaw(),
        G = AI.fromRaw(o.castRayAndGetNormal(Q, E, i, D, C, B));
      return Q.free(), E.free(), i.free(), D.free(), o.free(), G;
    }
  }], [{
    key: "fromRaw",
    value: function fromRaw(A, I) {
      var g = A.coShapeType(I);
      var C, B, Q, E, i, D, o;
      switch (g) {
        case JA.Ball:
          return new EI(A.coRadius(I));
        case JA.Cuboid:
          return C = A.coHalfExtents(I), new DI(C.x, C.y, C.z);
        case JA.RoundCuboid:
          return C = A.coHalfExtents(I), B = A.coRoundRadius(I), new oI(C.x, C.y, C.z, B);
        case JA.Capsule:
          return i = A.coHalfHeight(I), D = A.coRadius(I), new GI(i, D);
        case JA.Segment:
          return Q = A.coVertices(I), new wI(DA.new(Q[0], Q[1], Q[2]), DA.new(Q[3], Q[4], Q[5]));
        case JA.Polyline:
          return Q = A.coVertices(I), E = A.coIndices(I), new aI(Q, E);
        case JA.Triangle:
          return Q = A.coVertices(I), new kI(DA.new(Q[0], Q[1], Q[2]), DA.new(Q[3], Q[4], Q[5]), DA.new(Q[6], Q[7], Q[8]));
        case JA.RoundTriangle:
          return Q = A.coVertices(I), B = A.coRoundRadius(I), new SI(DA.new(Q[0], Q[1], Q[2]), DA.new(Q[3], Q[4], Q[5]), DA.new(Q[6], Q[7], Q[8]), B);
        case JA.HalfSpace:
          return o = DA.fromRaw(A.coHalfspaceNormal(I)), new iI(o);
        case JA.TriMesh:
          return Q = A.coVertices(I), E = A.coIndices(I), new MI(Q, E);
        case JA.HeightField:
          var _G = A.coHeightfieldScale(I),
            _w2 = A.coHeightfieldHeights(I),
            _k2 = A.coHeightfieldNRows(I),
            _S = A.coHeightfieldNCols(I);
          return new JI(_k2, _S, _w2, _G);
        case JA.ConvexPolyhedron:
          return Q = A.coVertices(I), E = A.coIndices(I), new KI(Q, E);
        case JA.RoundConvexPolyhedron:
          return Q = A.coVertices(I), E = A.coIndices(I), B = A.coRoundRadius(I), new yI(Q, E, B);
        case JA.Cylinder:
          return i = A.coHalfHeight(I), D = A.coRadius(I), new UI(i, D);
        case JA.RoundCylinder:
          return i = A.coHalfHeight(I), D = A.coRadius(I), B = A.coRoundRadius(I), new hI(i, D, B);
        case JA.Cone:
          return i = A.coHalfHeight(I), D = A.coRadius(I), new NI(i, D);
        case JA.RoundCone:
          return i = A.coHalfHeight(I), D = A.coRadius(I), B = A.coRoundRadius(I), new FI(i, D, B);
        default:
          throw new Error("unknown shape type: " + g);
      }
    }
  }]);
  return QI;
}();
!function (A) {
  A[A.Ball = 0] = "Ball", A[A.Cuboid = 1] = "Cuboid", A[A.Capsule = 2] = "Capsule", A[A.Segment = 3] = "Segment", A[A.Polyline = 4] = "Polyline", A[A.Triangle = 5] = "Triangle", A[A.TriMesh = 6] = "TriMesh", A[A.HeightField = 7] = "HeightField", A[A.ConvexPolyhedron = 9] = "ConvexPolyhedron", A[A.Cylinder = 10] = "Cylinder", A[A.Cone = 11] = "Cone", A[A.RoundCuboid = 12] = "RoundCuboid", A[A.RoundTriangle = 13] = "RoundTriangle", A[A.RoundCylinder = 14] = "RoundCylinder", A[A.RoundCone = 15] = "RoundCone", A[A.RoundConvexPolyhedron = 16] = "RoundConvexPolyhedron", A[A.HalfSpace = 17] = "HalfSpace";
}(JA || (exports.ShapeType = JA = {}));
var EI = exports.Ball = /*#__PURE__*/function (_QI) {
  _inherits(EI, _QI);
  var _super12 = _createSuper(EI);
  function EI(A) {
    var _this6;
    _classCallCheck(this, EI);
    _this6 = _super12.call(this), _this6.type = JA.Ball, _this6.radius = A;
    return _this6;
  }
  _createClass(EI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.ball(this.radius);
    }
  }]);
  return EI;
}(QI);
var iI = exports.HalfSpace = /*#__PURE__*/function (_QI2) {
  _inherits(iI, _QI2);
  var _super13 = _createSuper(iI);
  function iI(A) {
    var _this7;
    _classCallCheck(this, iI);
    _this7 = _super13.call(this), _this7.type = JA.HalfSpace, _this7.normal = A;
    return _this7;
  }
  _createClass(iI, [{
    key: "intoRaw",
    value: function intoRaw() {
      var A = DA.intoRaw(this.normal),
        I = IA.halfspace(A);
      return A.free(), I;
    }
  }]);
  return iI;
}(QI);
var DI = exports.Cuboid = /*#__PURE__*/function (_QI3) {
  _inherits(DI, _QI3);
  var _super14 = _createSuper(DI);
  function DI(A, I, g) {
    var _this8;
    _classCallCheck(this, DI);
    _this8 = _super14.call(this), _this8.type = JA.Cuboid, _this8.halfExtents = DA.new(A, I, g);
    return _this8;
  }
  _createClass(DI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.cuboid(this.halfExtents.x, this.halfExtents.y, this.halfExtents.z);
    }
  }]);
  return DI;
}(QI);
var oI = exports.RoundCuboid = /*#__PURE__*/function (_QI4) {
  _inherits(oI, _QI4);
  var _super15 = _createSuper(oI);
  function oI(A, I, g, C) {
    var _this9;
    _classCallCheck(this, oI);
    _this9 = _super15.call(this), _this9.type = JA.RoundCuboid, _this9.halfExtents = DA.new(A, I, g), _this9.borderRadius = C;
    return _this9;
  }
  _createClass(oI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.roundCuboid(this.halfExtents.x, this.halfExtents.y, this.halfExtents.z, this.borderRadius);
    }
  }]);
  return oI;
}(QI);
var GI = exports.Capsule = /*#__PURE__*/function (_QI5) {
  _inherits(GI, _QI5);
  var _super16 = _createSuper(GI);
  function GI(A, I) {
    var _this10;
    _classCallCheck(this, GI);
    _this10 = _super16.call(this), _this10.type = JA.Capsule, _this10.halfHeight = A, _this10.radius = I;
    return _this10;
  }
  _createClass(GI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.capsule(this.halfHeight, this.radius);
    }
  }]);
  return GI;
}(QI);
var wI = exports.Segment = /*#__PURE__*/function (_QI6) {
  _inherits(wI, _QI6);
  var _super17 = _createSuper(wI);
  function wI(A, I) {
    var _this11;
    _classCallCheck(this, wI);
    _this11 = _super17.call(this), _this11.type = JA.Segment, _this11.a = A, _this11.b = I;
    return _this11;
  }
  _createClass(wI, [{
    key: "intoRaw",
    value: function intoRaw() {
      var A = DA.intoRaw(this.a),
        I = DA.intoRaw(this.b),
        g = IA.segment(A, I);
      return A.free(), I.free(), g;
    }
  }]);
  return wI;
}(QI);
var kI = exports.Triangle = /*#__PURE__*/function (_QI7) {
  _inherits(kI, _QI7);
  var _super18 = _createSuper(kI);
  function kI(A, I, g) {
    var _this12;
    _classCallCheck(this, kI);
    _this12 = _super18.call(this), _this12.type = JA.Triangle, _this12.a = A, _this12.b = I, _this12.c = g;
    return _this12;
  }
  _createClass(kI, [{
    key: "intoRaw",
    value: function intoRaw() {
      var A = DA.intoRaw(this.a),
        I = DA.intoRaw(this.b),
        g = DA.intoRaw(this.c),
        C = IA.triangle(A, I, g);
      return A.free(), I.free(), g.free(), C;
    }
  }]);
  return kI;
}(QI);
var SI = exports.RoundTriangle = /*#__PURE__*/function (_QI8) {
  _inherits(SI, _QI8);
  var _super19 = _createSuper(SI);
  function SI(A, I, g, C) {
    var _this13;
    _classCallCheck(this, SI);
    _this13 = _super19.call(this), _this13.type = JA.RoundTriangle, _this13.a = A, _this13.b = I, _this13.c = g, _this13.borderRadius = C;
    return _this13;
  }
  _createClass(SI, [{
    key: "intoRaw",
    value: function intoRaw() {
      var A = DA.intoRaw(this.a),
        I = DA.intoRaw(this.b),
        g = DA.intoRaw(this.c),
        C = IA.roundTriangle(A, I, g, this.borderRadius);
      return A.free(), I.free(), g.free(), C;
    }
  }]);
  return SI;
}(QI);
var aI = exports.Polyline = /*#__PURE__*/function (_QI9) {
  _inherits(aI, _QI9);
  var _super20 = _createSuper(aI);
  function aI(A, I) {
    var _this14;
    _classCallCheck(this, aI);
    _this14 = _super20.call(this), _this14.type = JA.Polyline, _this14.vertices = A, _this14.indices = null != I ? I : new Uint32Array(0);
    return _this14;
  }
  _createClass(aI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.polyline(this.vertices, this.indices);
    }
  }]);
  return aI;
}(QI);
var MI = exports.TriMesh = /*#__PURE__*/function (_QI10) {
  _inherits(MI, _QI10);
  var _super21 = _createSuper(MI);
  function MI(A, I) {
    var _this15;
    _classCallCheck(this, MI);
    _this15 = _super21.call(this), _this15.type = JA.TriMesh, _this15.vertices = A, _this15.indices = I;
    return _this15;
  }
  _createClass(MI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.trimesh(this.vertices, this.indices);
    }
  }]);
  return MI;
}(QI);
var KI = exports.ConvexPolyhedron = /*#__PURE__*/function (_QI11) {
  _inherits(KI, _QI11);
  var _super22 = _createSuper(KI);
  function KI(A, I) {
    var _this16;
    _classCallCheck(this, KI);
    _this16 = _super22.call(this), _this16.type = JA.ConvexPolyhedron, _this16.vertices = A, _this16.indices = I;
    return _this16;
  }
  _createClass(KI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return this.indices ? IA.convexMesh(this.vertices, this.indices) : IA.convexHull(this.vertices);
    }
  }]);
  return KI;
}(QI);
var yI = exports.RoundConvexPolyhedron = /*#__PURE__*/function (_QI12) {
  _inherits(yI, _QI12);
  var _super23 = _createSuper(yI);
  function yI(A, I, g) {
    var _this17;
    _classCallCheck(this, yI);
    _this17 = _super23.call(this), _this17.type = JA.RoundConvexPolyhedron, _this17.vertices = A, _this17.indices = I, _this17.borderRadius = g;
    return _this17;
  }
  _createClass(yI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return this.indices ? IA.roundConvexMesh(this.vertices, this.indices, this.borderRadius) : IA.roundConvexHull(this.vertices, this.borderRadius);
    }
  }]);
  return yI;
}(QI);
var JI = exports.Heightfield = /*#__PURE__*/function (_QI13) {
  _inherits(JI, _QI13);
  var _super24 = _createSuper(JI);
  function JI(A, I, g, C) {
    var _this18;
    _classCallCheck(this, JI);
    _this18 = _super24.call(this), _this18.type = JA.HeightField, _this18.nrows = A, _this18.ncols = I, _this18.heights = g, _this18.scale = C;
    return _this18;
  }
  _createClass(JI, [{
    key: "intoRaw",
    value: function intoRaw() {
      var A = DA.intoRaw(this.scale),
        I = IA.heightfield(this.nrows, this.ncols, this.heights, A);
      return A.free(), I;
    }
  }]);
  return JI;
}(QI);
var UI = exports.Cylinder = /*#__PURE__*/function (_QI14) {
  _inherits(UI, _QI14);
  var _super25 = _createSuper(UI);
  function UI(A, I) {
    var _this19;
    _classCallCheck(this, UI);
    _this19 = _super25.call(this), _this19.type = JA.Cylinder, _this19.halfHeight = A, _this19.radius = I;
    return _this19;
  }
  _createClass(UI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.cylinder(this.halfHeight, this.radius);
    }
  }]);
  return UI;
}(QI);
var hI = exports.RoundCylinder = /*#__PURE__*/function (_QI15) {
  _inherits(hI, _QI15);
  var _super26 = _createSuper(hI);
  function hI(A, I, g) {
    var _this20;
    _classCallCheck(this, hI);
    _this20 = _super26.call(this), _this20.type = JA.RoundCylinder, _this20.borderRadius = g, _this20.halfHeight = A, _this20.radius = I;
    return _this20;
  }
  _createClass(hI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.roundCylinder(this.halfHeight, this.radius, this.borderRadius);
    }
  }]);
  return hI;
}(QI);
var NI = exports.Cone = /*#__PURE__*/function (_QI16) {
  _inherits(NI, _QI16);
  var _super27 = _createSuper(NI);
  function NI(A, I) {
    var _this21;
    _classCallCheck(this, NI);
    _this21 = _super27.call(this), _this21.type = JA.Cone, _this21.halfHeight = A, _this21.radius = I;
    return _this21;
  }
  _createClass(NI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.cone(this.halfHeight, this.radius);
    }
  }]);
  return NI;
}(QI);
var FI = exports.RoundCone = /*#__PURE__*/function (_QI17) {
  _inherits(FI, _QI17);
  var _super28 = _createSuper(FI);
  function FI(A, I, g) {
    var _this22;
    _classCallCheck(this, FI);
    _this22 = _super28.call(this), _this22.type = JA.RoundCone, _this22.halfHeight = A, _this22.radius = I, _this22.borderRadius = g;
    return _this22;
  }
  _createClass(FI, [{
    key: "intoRaw",
    value: function intoRaw() {
      return IA.roundCone(this.halfHeight, this.radius, this.borderRadius);
    }
  }]);
  return FI;
}(QI);
!function (A) {
  A[A.DYNAMIC_DYNAMIC = 1] = "DYNAMIC_DYNAMIC", A[A.DYNAMIC_KINEMATIC = 12] = "DYNAMIC_KINEMATIC", A[A.DYNAMIC_FIXED = 2] = "DYNAMIC_FIXED", A[A.KINEMATIC_KINEMATIC = 52224] = "KINEMATIC_KINEMATIC", A[A.KINEMATIC_FIXED = 8704] = "KINEMATIC_FIXED", A[A.FIXED_FIXED = 32] = "FIXED_FIXED", A[A.DEFAULT = 15] = "DEFAULT", A[A.ALL = 60943] = "ALL";
}(UA || (exports.ActiveCollisionTypes = UA = {}));
var qI = exports.Collider = /*#__PURE__*/function () {
  function qI(A, I, g, C) {
    _classCallCheck(this, qI);
    this.colliderSet = A, this.handle = I, this._parent = g, this._shape = C;
  }
  _createClass(qI, [{
    key: "finalizeDeserialization",
    value: function finalizeDeserialization(A) {
      null != this.handle && (this._parent = A.get(this.colliderSet.raw.coParent(this.handle)));
    }
  }, {
    key: "ensureShapeIsCached",
    value: function ensureShapeIsCached() {
      this._shape || (this._shape = QI.fromRaw(this.colliderSet.raw, this.handle));
    }
  }, {
    key: "shape",
    get: function get() {
      return this.ensureShapeIsCached(), this._shape;
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return this.colliderSet.raw.contains(this.handle);
    }
  }, {
    key: "translation",
    value: function translation() {
      return DA.fromRaw(this.colliderSet.raw.coTranslation(this.handle));
    }
  }, {
    key: "rotation",
    value: function rotation() {
      return GA.fromRaw(this.colliderSet.raw.coRotation(this.handle));
    }
  }, {
    key: "isSensor",
    value: function isSensor() {
      return this.colliderSet.raw.coIsSensor(this.handle);
    }
  }, {
    key: "setSensor",
    value: function setSensor(A) {
      this.colliderSet.raw.coSetSensor(this.handle, A);
    }
  }, {
    key: "setShape",
    value: function setShape(A) {
      var I = A.intoRaw();
      this.colliderSet.raw.coSetShape(this.handle, I), I.free(), this._shape = A;
    }
  }, {
    key: "setEnabled",
    value: function setEnabled(A) {
      this.colliderSet.raw.coSetEnabled(this.handle, A);
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      return this.colliderSet.raw.coIsEnabled(this.handle);
    }
  }, {
    key: "setRestitution",
    value: function setRestitution(A) {
      this.colliderSet.raw.coSetRestitution(this.handle, A);
    }
  }, {
    key: "setFriction",
    value: function setFriction(A) {
      this.colliderSet.raw.coSetFriction(this.handle, A);
    }
  }, {
    key: "frictionCombineRule",
    value: function frictionCombineRule() {
      return this.colliderSet.raw.coFrictionCombineRule(this.handle);
    }
  }, {
    key: "setFrictionCombineRule",
    value: function setFrictionCombineRule(A) {
      this.colliderSet.raw.coSetFrictionCombineRule(this.handle, A);
    }
  }, {
    key: "restitutionCombineRule",
    value: function restitutionCombineRule() {
      return this.colliderSet.raw.coRestitutionCombineRule(this.handle);
    }
  }, {
    key: "setRestitutionCombineRule",
    value: function setRestitutionCombineRule(A) {
      this.colliderSet.raw.coSetRestitutionCombineRule(this.handle, A);
    }
  }, {
    key: "setCollisionGroups",
    value: function setCollisionGroups(A) {
      this.colliderSet.raw.coSetCollisionGroups(this.handle, A);
    }
  }, {
    key: "setSolverGroups",
    value: function setSolverGroups(A) {
      this.colliderSet.raw.coSetSolverGroups(this.handle, A);
    }
  }, {
    key: "activeHooks",
    value: function activeHooks() {
      return this.colliderSet.raw.coActiveHooks(this.handle);
    }
  }, {
    key: "setActiveHooks",
    value: function setActiveHooks(A) {
      this.colliderSet.raw.coSetActiveHooks(this.handle, A);
    }
  }, {
    key: "activeEvents",
    value: function activeEvents() {
      return this.colliderSet.raw.coActiveEvents(this.handle);
    }
  }, {
    key: "setActiveEvents",
    value: function setActiveEvents(A) {
      this.colliderSet.raw.coSetActiveEvents(this.handle, A);
    }
  }, {
    key: "activeCollisionTypes",
    value: function activeCollisionTypes() {
      return this.colliderSet.raw.coActiveCollisionTypes(this.handle);
    }
  }, {
    key: "setContactForceEventThreshold",
    value: function setContactForceEventThreshold(A) {
      return this.colliderSet.raw.coSetContactForceEventThreshold(this.handle, A);
    }
  }, {
    key: "contactForceEventThreshold",
    value: function contactForceEventThreshold() {
      return this.colliderSet.raw.coContactForceEventThreshold(this.handle);
    }
  }, {
    key: "setActiveCollisionTypes",
    value: function setActiveCollisionTypes(A) {
      this.colliderSet.raw.coSetActiveCollisionTypes(this.handle, A);
    }
  }, {
    key: "setDensity",
    value: function setDensity(A) {
      this.colliderSet.raw.coSetDensity(this.handle, A);
    }
  }, {
    key: "setMass",
    value: function setMass(A) {
      this.colliderSet.raw.coSetMass(this.handle, A);
    }
  }, {
    key: "setMassProperties",
    value: function setMassProperties(A, I, g, C) {
      var B = DA.intoRaw(I),
        Q = DA.intoRaw(g),
        E = GA.intoRaw(C);
      this.colliderSet.raw.coSetMassProperties(this.handle, A, B, Q, E), B.free(), Q.free(), E.free();
    }
  }, {
    key: "setTranslation",
    value: function setTranslation(A) {
      this.colliderSet.raw.coSetTranslation(this.handle, A.x, A.y, A.z);
    }
  }, {
    key: "setTranslationWrtParent",
    value: function setTranslationWrtParent(A) {
      this.colliderSet.raw.coSetTranslationWrtParent(this.handle, A.x, A.y, A.z);
    }
  }, {
    key: "setRotation",
    value: function setRotation(A) {
      this.colliderSet.raw.coSetRotation(this.handle, A.x, A.y, A.z, A.w);
    }
  }, {
    key: "setRotationWrtParent",
    value: function setRotationWrtParent(A) {
      this.colliderSet.raw.coSetRotationWrtParent(this.handle, A.x, A.y, A.z, A.w);
    }
  }, {
    key: "shapeType",
    value: function shapeType() {
      return this.colliderSet.raw.coShapeType(this.handle);
    }
  }, {
    key: "halfExtents",
    value: function halfExtents() {
      return DA.fromRaw(this.colliderSet.raw.coHalfExtents(this.handle));
    }
  }, {
    key: "setHalfExtents",
    value: function setHalfExtents(A) {
      var I = DA.intoRaw(A);
      this.colliderSet.raw.coSetHalfExtents(this.handle, I);
    }
  }, {
    key: "radius",
    value: function radius() {
      return this.colliderSet.raw.coRadius(this.handle);
    }
  }, {
    key: "setRadius",
    value: function setRadius(A) {
      this.colliderSet.raw.coSetRadius(this.handle, A);
    }
  }, {
    key: "roundRadius",
    value: function roundRadius() {
      return this.colliderSet.raw.coRoundRadius(this.handle);
    }
  }, {
    key: "setRoundRadius",
    value: function setRoundRadius(A) {
      this.colliderSet.raw.coSetRoundRadius(this.handle, A);
    }
  }, {
    key: "halfHeight",
    value: function halfHeight() {
      return this.colliderSet.raw.coHalfHeight(this.handle);
    }
  }, {
    key: "setHalfHeight",
    value: function setHalfHeight(A) {
      this.colliderSet.raw.coSetHalfHeight(this.handle, A);
    }
  }, {
    key: "vertices",
    value: function vertices() {
      return this.colliderSet.raw.coVertices(this.handle);
    }
  }, {
    key: "indices",
    value: function indices() {
      return this.colliderSet.raw.coIndices(this.handle);
    }
  }, {
    key: "heightfieldHeights",
    value: function heightfieldHeights() {
      return this.colliderSet.raw.coHeightfieldHeights(this.handle);
    }
  }, {
    key: "heightfieldScale",
    value: function heightfieldScale() {
      var A = this.colliderSet.raw.coHeightfieldScale(this.handle);
      return DA.fromRaw(A);
    }
  }, {
    key: "heightfieldNRows",
    value: function heightfieldNRows() {
      return this.colliderSet.raw.coHeightfieldNRows(this.handle);
    }
  }, {
    key: "heightfieldNCols",
    value: function heightfieldNCols() {
      return this.colliderSet.raw.coHeightfieldNCols(this.handle);
    }
  }, {
    key: "parent",
    value: function parent() {
      return this._parent;
    }
  }, {
    key: "friction",
    value: function friction() {
      return this.colliderSet.raw.coFriction(this.handle);
    }
  }, {
    key: "restitution",
    value: function restitution() {
      return this.colliderSet.raw.coRestitution(this.handle);
    }
  }, {
    key: "density",
    value: function density() {
      return this.colliderSet.raw.coDensity(this.handle);
    }
  }, {
    key: "mass",
    value: function mass() {
      return this.colliderSet.raw.coMass(this.handle);
    }
  }, {
    key: "volume",
    value: function volume() {
      return this.colliderSet.raw.coVolume(this.handle);
    }
  }, {
    key: "collisionGroups",
    value: function collisionGroups() {
      return this.colliderSet.raw.coCollisionGroups(this.handle);
    }
  }, {
    key: "solverGroups",
    value: function solverGroups() {
      return this.colliderSet.raw.coSolverGroups(this.handle);
    }
  }, {
    key: "containsPoint",
    value: function containsPoint(A) {
      var I = DA.intoRaw(A),
        g = this.colliderSet.raw.coContainsPoint(this.handle, I);
      return I.free(), g;
    }
  }, {
    key: "projectPoint",
    value: function projectPoint(A, I) {
      var g = DA.intoRaw(A),
        C = vA.fromRaw(this.colliderSet.raw.coProjectPoint(this.handle, g, I));
      return g.free(), C;
    }
  }, {
    key: "intersectsRay",
    value: function intersectsRay(A, I) {
      var g = DA.intoRaw(A.origin),
        C = DA.intoRaw(A.dir),
        B = this.colliderSet.raw.coIntersectsRay(this.handle, g, C, I);
      return g.free(), C.free(), B;
    }
  }, {
    key: "castShape",
    value: function castShape(A, I, g, C, B, Q, E) {
      var i = DA.intoRaw(A),
        D = DA.intoRaw(g),
        o = GA.intoRaw(C),
        G = DA.intoRaw(B),
        w = I.intoRaw(),
        k = CI.fromRaw(this.colliderSet, this.colliderSet.raw.coCastShape(this.handle, i, w, D, o, G, Q, E));
      return i.free(), D.free(), o.free(), G.free(), w.free(), k;
    }
  }, {
    key: "castCollider",
    value: function castCollider(A, I, g, C, B) {
      var Q = DA.intoRaw(A),
        E = DA.intoRaw(g),
        i = BI.fromRaw(this.colliderSet, this.colliderSet.raw.coCastCollider(this.handle, Q, I.handle, E, C, B));
      return Q.free(), E.free(), i;
    }
  }, {
    key: "intersectsShape",
    value: function intersectsShape(A, I, g) {
      var C = DA.intoRaw(I),
        B = GA.intoRaw(g),
        Q = A.intoRaw(),
        E = this.colliderSet.raw.coIntersectsShape(this.handle, Q, C, B);
      return C.free(), B.free(), Q.free(), E;
    }
  }, {
    key: "contactShape",
    value: function contactShape(A, I, g, C) {
      var B = DA.intoRaw(I),
        Q = GA.intoRaw(g),
        E = A.intoRaw(),
        i = uA.fromRaw(this.colliderSet.raw.coContactShape(this.handle, E, B, Q, C));
      return B.free(), Q.free(), E.free(), i;
    }
  }, {
    key: "contactCollider",
    value: function contactCollider(A, I) {
      return uA.fromRaw(this.colliderSet.raw.coContactCollider(this.handle, A.handle, I));
    }
  }, {
    key: "castRay",
    value: function castRay(A, I, g) {
      var C = DA.intoRaw(A.origin),
        B = DA.intoRaw(A.dir),
        Q = this.colliderSet.raw.coCastRay(this.handle, C, B, I, g);
      return C.free(), B.free(), Q;
    }
  }, {
    key: "castRayAndGetNormal",
    value: function castRayAndGetNormal(A, I, g) {
      var C = DA.intoRaw(A.origin),
        B = DA.intoRaw(A.dir),
        Q = AI.fromRaw(this.colliderSet.raw.coCastRayAndGetNormal(this.handle, C, B, I, g));
      return C.free(), B.free(), Q;
    }
  }]);
  return qI;
}();
!function (A) {
  A[A.Density = 0] = "Density", A[A.Mass = 1] = "Mass", A[A.MassProps = 2] = "MassProps";
}(hA || (exports.MassPropsMode = hA = {}));
var RI = exports.ColliderDesc = /*#__PURE__*/function () {
  function RI(A) {
    _classCallCheck(this, RI);
    this.enabled = !0, this.shape = A, this.massPropsMode = hA.Density, this.density = 1, this.friction = .5, this.restitution = 0, this.rotation = GA.identity(), this.translation = DA.zeros(), this.isSensor = !1, this.collisionGroups = 4294967295, this.solverGroups = 4294967295, this.frictionCombineRule = KA.Average, this.restitutionCombineRule = KA.Average, this.activeCollisionTypes = UA.DEFAULT, this.activeEvents = 0, this.activeHooks = 0, this.mass = 0, this.centerOfMass = DA.zeros(), this.contactForceEventThreshold = 0, this.principalAngularInertia = DA.zeros(), this.angularInertiaLocalFrame = GA.identity();
  }
  _createClass(RI, [{
    key: "setTranslation",
    value: function setTranslation(A, I, g) {
      if ("number" != typeof A || "number" != typeof I || "number" != typeof g) throw TypeError("The translation components must be numbers.");
      return this.translation = {
        x: A,
        y: I,
        z: g
      }, this;
    }
  }, {
    key: "setRotation",
    value: function setRotation(A) {
      return GA.copy(this.rotation, A), this;
    }
  }, {
    key: "setSensor",
    value: function setSensor(A) {
      return this.isSensor = A, this;
    }
  }, {
    key: "setEnabled",
    value: function setEnabled(A) {
      return this.enabled = A, this;
    }
  }, {
    key: "setDensity",
    value: function setDensity(A) {
      return this.massPropsMode = hA.Density, this.density = A, this;
    }
  }, {
    key: "setMass",
    value: function setMass(A) {
      return this.massPropsMode = hA.Mass, this.mass = A, this;
    }
  }, {
    key: "setMassProperties",
    value: function setMassProperties(A, I, g, C) {
      return this.massPropsMode = hA.MassProps, this.mass = A, DA.copy(this.centerOfMass, I), DA.copy(this.principalAngularInertia, g), GA.copy(this.angularInertiaLocalFrame, C), this;
    }
  }, {
    key: "setRestitution",
    value: function setRestitution(A) {
      return this.restitution = A, this;
    }
  }, {
    key: "setFriction",
    value: function setFriction(A) {
      return this.friction = A, this;
    }
  }, {
    key: "setFrictionCombineRule",
    value: function setFrictionCombineRule(A) {
      return this.frictionCombineRule = A, this;
    }
  }, {
    key: "setRestitutionCombineRule",
    value: function setRestitutionCombineRule(A) {
      return this.restitutionCombineRule = A, this;
    }
  }, {
    key: "setCollisionGroups",
    value: function setCollisionGroups(A) {
      return this.collisionGroups = A, this;
    }
  }, {
    key: "setSolverGroups",
    value: function setSolverGroups(A) {
      return this.solverGroups = A, this;
    }
  }, {
    key: "setActiveHooks",
    value: function setActiveHooks(A) {
      return this.activeHooks = A, this;
    }
  }, {
    key: "setActiveEvents",
    value: function setActiveEvents(A) {
      return this.activeEvents = A, this;
    }
  }, {
    key: "setActiveCollisionTypes",
    value: function setActiveCollisionTypes(A) {
      return this.activeCollisionTypes = A, this;
    }
  }, {
    key: "setContactForceEventThreshold",
    value: function setContactForceEventThreshold(A) {
      return this.contactForceEventThreshold = A, this;
    }
  }], [{
    key: "ball",
    value: function ball(A) {
      var I = new EI(A);
      return new RI(I);
    }
  }, {
    key: "capsule",
    value: function capsule(A, I) {
      var g = new GI(A, I);
      return new RI(g);
    }
  }, {
    key: "segment",
    value: function segment(A, I) {
      var g = new wI(A, I);
      return new RI(g);
    }
  }, {
    key: "triangle",
    value: function triangle(A, I, g) {
      var C = new kI(A, I, g);
      return new RI(C);
    }
  }, {
    key: "roundTriangle",
    value: function roundTriangle(A, I, g, C) {
      var B = new SI(A, I, g, C);
      return new RI(B);
    }
  }, {
    key: "polyline",
    value: function polyline(A, I) {
      var g = new aI(A, I);
      return new RI(g);
    }
  }, {
    key: "trimesh",
    value: function trimesh(A, I) {
      var g = new MI(A, I);
      return new RI(g);
    }
  }, {
    key: "cuboid",
    value: function cuboid(A, I, g) {
      var C = new DI(A, I, g);
      return new RI(C);
    }
  }, {
    key: "roundCuboid",
    value: function roundCuboid(A, I, g, C) {
      var B = new oI(A, I, g, C);
      return new RI(B);
    }
  }, {
    key: "heightfield",
    value: function heightfield(A, I, g, C) {
      var B = new JI(A, I, g, C);
      return new RI(B);
    }
  }, {
    key: "cylinder",
    value: function cylinder(A, I) {
      var g = new UI(A, I);
      return new RI(g);
    }
  }, {
    key: "roundCylinder",
    value: function roundCylinder(A, I, g) {
      var C = new hI(A, I, g);
      return new RI(C);
    }
  }, {
    key: "cone",
    value: function cone(A, I) {
      var g = new NI(A, I);
      return new RI(g);
    }
  }, {
    key: "roundCone",
    value: function roundCone(A, I, g) {
      var C = new FI(A, I, g);
      return new RI(C);
    }
  }, {
    key: "convexHull",
    value: function convexHull(A) {
      var I = new KI(A, null);
      return new RI(I);
    }
  }, {
    key: "convexMesh",
    value: function convexMesh(A, I) {
      var g = new KI(A, I);
      return new RI(g);
    }
  }, {
    key: "roundConvexHull",
    value: function roundConvexHull(A, I) {
      var g = new yI(A, null, I);
      return new RI(g);
    }
  }, {
    key: "roundConvexMesh",
    value: function roundConvexMesh(A, I, g) {
      var C = new yI(A, I, g);
      return new RI(C);
    }
  }]);
  return RI;
}();
var sI = exports.ColliderSet = /*#__PURE__*/function () {
  function sI(A) {
    var _this23 = this;
    _classCallCheck(this, sI);
    this.raw = A || new l(), this.map = new YA(), A && A.forEachColliderHandle(function (A) {
      _this23.map.set(A, new qI(_this23, A, null));
    });
  }
  _createClass(sI, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0, this.map && this.map.clear(), this.map = void 0;
    }
  }, {
    key: "castClosure",
    value: function castClosure(A) {
      var _this24 = this;
      return function (I) {
        return A ? A(_this24.get(I)) : void 0;
      };
    }
  }, {
    key: "finalizeDeserialization",
    value: function finalizeDeserialization(A) {
      this.map.forEach(function (I) {
        return I.finalizeDeserialization(A);
      });
    }
  }, {
    key: "createCollider",
    value: function createCollider(A, I, g) {
      var C = null != g && null != g;
      if (C && isNaN(g)) throw Error("Cannot create a collider with a parent rigid-body handle that is not a number.");
      var B = I.shape.intoRaw(),
        Q = DA.intoRaw(I.translation),
        E = GA.intoRaw(I.rotation),
        i = DA.intoRaw(I.centerOfMass),
        D = DA.intoRaw(I.principalAngularInertia),
        o = GA.intoRaw(I.angularInertiaLocalFrame),
        G = this.raw.createCollider(I.enabled, B, Q, E, I.massPropsMode, I.mass, i, D, o, I.density, I.friction, I.restitution, I.frictionCombineRule, I.restitutionCombineRule, I.isSensor, I.collisionGroups, I.solverGroups, I.activeCollisionTypes, I.activeHooks, I.activeEvents, I.contactForceEventThreshold, C, C ? g : 0, A.raw);
      B.free(), Q.free(), E.free(), i.free(), D.free(), o.free();
      var w = C ? A.get(g) : null,
        k = new qI(this, G, w, I.shape);
      return this.map.set(G, k), k;
    }
  }, {
    key: "remove",
    value: function remove(A, I, g, C) {
      this.raw.remove(A, I.raw, g.raw, C), this.unmap(A);
    }
  }, {
    key: "unmap",
    value: function unmap(A) {
      this.map.delete(A);
    }
  }, {
    key: "get",
    value: function get(A) {
      return this.map.get(A);
    }
  }, {
    key: "len",
    value: function len() {
      return this.map.len();
    }
  }, {
    key: "contains",
    value: function contains(A) {
      return null != this.get(A);
    }
  }, {
    key: "forEach",
    value: function forEach(A) {
      this.map.forEach(A);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this.map.getAll();
    }
  }]);
  return sI;
}();
var cI = exports.PhysicsPipeline = /*#__PURE__*/function () {
  function cI(A) {
    _classCallCheck(this, cI);
    this.raw = A || new f();
  }
  _createClass(cI, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }, {
    key: "step",
    value: function step(A, I, g, C, B, Q, E, i, D, o, G, w) {
      var k = DA.intoRaw(A);
      G ? this.raw.stepWithEvents(k, I.raw, g.raw, C.raw, B.raw, Q.raw, E.raw, i.raw, D.raw, o.raw, G.raw, w, w ? w.filterContactPair : null, w ? w.filterIntersectionPair : null) : this.raw.step(k, I.raw, g.raw, C.raw, B.raw, Q.raw, E.raw, i.raw, D.raw, o.raw), k.free();
    }
  }]);
  return cI;
}();
!function (A) {
  A[A.EXCLUDE_FIXED = 1] = "EXCLUDE_FIXED", A[A.EXCLUDE_KINEMATIC = 2] = "EXCLUDE_KINEMATIC", A[A.EXCLUDE_DYNAMIC = 4] = "EXCLUDE_DYNAMIC", A[A.EXCLUDE_SENSORS = 8] = "EXCLUDE_SENSORS", A[A.EXCLUDE_SOLIDS = 16] = "EXCLUDE_SOLIDS", A[A.ONLY_DYNAMIC = 3] = "ONLY_DYNAMIC", A[A.ONLY_KINEMATIC = 5] = "ONLY_KINEMATIC", A[A.ONLY_FIXED = 6] = "ONLY_FIXED";
}(NA || (exports.QueryFilterFlags = NA = {}));
var YI = exports.QueryPipeline = /*#__PURE__*/function () {
  function YI(A) {
    _classCallCheck(this, YI);
    this.raw = A || new V();
  }
  _createClass(YI, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }, {
    key: "update",
    value: function update(A, I) {
      this.raw.update(A.raw, I.raw);
    }
  }, {
    key: "castRay",
    value: function castRay(A, I, g, C, B, Q, E, i, D, o) {
      var G = DA.intoRaw(g.origin),
        w = DA.intoRaw(g.dir),
        k = gI.fromRaw(I, this.raw.castRay(A.raw, I.raw, G, w, C, B, Q, E, i, D, o));
      return G.free(), w.free(), k;
    }
  }, {
    key: "castRayAndGetNormal",
    value: function castRayAndGetNormal(A, I, g, C, B, Q, E, i, D, o) {
      var G = DA.intoRaw(g.origin),
        w = DA.intoRaw(g.dir),
        k = II.fromRaw(I, this.raw.castRayAndGetNormal(A.raw, I.raw, G, w, C, B, Q, E, i, D, o));
      return G.free(), w.free(), k;
    }
  }, {
    key: "intersectionsWithRay",
    value: function intersectionsWithRay(A, I, g, C, B, Q, E, i, D, o, G) {
      var w = DA.intoRaw(g.origin),
        k = DA.intoRaw(g.dir);
      this.raw.intersectionsWithRay(A.raw, I.raw, w, k, C, B, function (A) {
        return Q(II.fromRaw(I, A));
      }, E, i, D, o, G), w.free(), k.free();
    }
  }, {
    key: "intersectionWithShape",
    value: function intersectionWithShape(A, I, g, C, B, Q, E, i, D, o) {
      var G = DA.intoRaw(g),
        w = GA.intoRaw(C),
        k = B.intoRaw(),
        S = this.raw.intersectionWithShape(A.raw, I.raw, G, w, k, Q, E, i, D, o);
      return G.free(), w.free(), k.free(), S;
    }
  }, {
    key: "projectPoint",
    value: function projectPoint(A, I, g, C, B, Q, E, i, D) {
      var o = DA.intoRaw(g),
        G = _A.fromRaw(I, this.raw.projectPoint(A.raw, I.raw, o, C, B, Q, E, i, D));
      return o.free(), G;
    }
  }, {
    key: "projectPointAndGetFeature",
    value: function projectPointAndGetFeature(A, I, g, C, B, Q, E, i) {
      var D = DA.intoRaw(g),
        o = _A.fromRaw(I, this.raw.projectPointAndGetFeature(A.raw, I.raw, D, C, B, Q, E, i));
      return D.free(), o;
    }
  }, {
    key: "intersectionsWithPoint",
    value: function intersectionsWithPoint(A, I, g, C, B, Q, E, i, D) {
      var o = DA.intoRaw(g);
      this.raw.intersectionsWithPoint(A.raw, I.raw, o, C, B, Q, E, i, D), o.free();
    }
  }, {
    key: "castShape",
    value: function castShape(A, I, g, C, B, Q, E, i, D, o, G, w, k) {
      var S = DA.intoRaw(g),
        a = GA.intoRaw(C),
        M = DA.intoRaw(B),
        K = Q.intoRaw(),
        y = BI.fromRaw(I, this.raw.castShape(A.raw, I.raw, S, a, M, K, E, i, D, o, G, w, k));
      return S.free(), a.free(), M.free(), K.free(), y;
    }
  }, {
    key: "intersectionsWithShape",
    value: function intersectionsWithShape(A, I, g, C, B, Q, E, i, D, o, G) {
      var w = DA.intoRaw(g),
        k = GA.intoRaw(C),
        S = B.intoRaw();
      this.raw.intersectionsWithShape(A.raw, I.raw, w, k, S, Q, E, i, D, o, G), w.free(), k.free(), S.free();
    }
  }, {
    key: "collidersWithAabbIntersectingAabb",
    value: function collidersWithAabbIntersectingAabb(A, I, g) {
      var C = DA.intoRaw(A),
        B = DA.intoRaw(I);
      this.raw.collidersWithAabbIntersectingAabb(C, B, g), C.free(), B.free();
    }
  }]);
  return YI;
}();
var LI = exports.SerializationPipeline = /*#__PURE__*/function () {
  function LI(A) {
    _classCallCheck(this, LI);
    this.raw = A || new AA();
  }
  _createClass(LI, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }, {
    key: "serializeAll",
    value: function serializeAll(A, I, g, C, B, Q, E, i, D) {
      var o = DA.intoRaw(A);
      var G = this.raw.serializeAll(o, I.raw, g.raw, C.raw, B.raw, Q.raw, E.raw, i.raw, D.raw);
      return o.free(), G;
    }
  }, {
    key: "deserializeAll",
    value: function deserializeAll(A) {
      return eI.fromRaw(this.raw.deserializeAll(A));
    }
  }]);
  return LI;
}();
var HI = exports.DebugRenderBuffers = /*#__PURE__*/_createClass(function HI(A, I) {
  _classCallCheck(this, HI);
  this.vertices = A, this.colors = I;
});
var lI = exports.DebugRenderPipeline = /*#__PURE__*/function () {
  function lI(A) {
    _classCallCheck(this, lI);
    this.raw = A || new r();
  }
  _createClass(lI, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0, this.vertices = void 0, this.colors = void 0;
    }
  }, {
    key: "render",
    value: function render(A, I, g, C, B) {
      this.raw.render(A.raw, I.raw, g.raw, C.raw, B.raw), this.vertices = this.raw.vertices(), this.colors = this.raw.colors();
    }
  }]);
  return lI;
}();
var tI = exports.CharacterCollision = /*#__PURE__*/_createClass(function tI() {
  _classCallCheck(this, tI);
});
var pI = exports.KinematicCharacterController = /*#__PURE__*/function () {
  function pI(A, I, g, C, B) {
    _classCallCheck(this, pI);
    this.params = I, this.bodies = g, this.colliders = C, this.queries = B, this.raw = new W(A), this.rawCharacterCollision = new H(), this._applyImpulsesToDynamicBodies = !1, this._characterMass = null;
  }
  _createClass(pI, [{
    key: "free",
    value: function free() {
      this.raw && (this.raw.free(), this.rawCharacterCollision.free()), this.raw = void 0, this.rawCharacterCollision = void 0;
    }
  }, {
    key: "up",
    value: function up() {
      return this.raw.up();
    }
  }, {
    key: "setUp",
    value: function setUp(A) {
      var I = DA.intoRaw(A);
      return this.raw.setUp(I);
    }
  }, {
    key: "applyImpulsesToDynamicBodies",
    value: function applyImpulsesToDynamicBodies() {
      return this._applyImpulsesToDynamicBodies;
    }
  }, {
    key: "setApplyImpulsesToDynamicBodies",
    value: function setApplyImpulsesToDynamicBodies(A) {
      this._applyImpulsesToDynamicBodies = A;
    }
  }, {
    key: "characterMass",
    value: function characterMass() {
      return this._characterMass;
    }
  }, {
    key: "setCharacterMass",
    value: function setCharacterMass(A) {
      this._characterMass = A;
    }
  }, {
    key: "offset",
    value: function offset() {
      return this.raw.offset();
    }
  }, {
    key: "setOffset",
    value: function setOffset(A) {
      this.raw.setOffset(A);
    }
  }, {
    key: "slideEnabled",
    value: function slideEnabled() {
      return this.raw.slideEnabled();
    }
  }, {
    key: "setSlideEnabled",
    value: function setSlideEnabled(A) {
      this.raw.setSlideEnabled(A);
    }
  }, {
    key: "autostepMaxHeight",
    value: function autostepMaxHeight() {
      return this.raw.autostepMaxHeight();
    }
  }, {
    key: "autostepMinWidth",
    value: function autostepMinWidth() {
      return this.raw.autostepMinWidth();
    }
  }, {
    key: "autostepIncludesDynamicBodies",
    value: function autostepIncludesDynamicBodies() {
      return this.raw.autostepIncludesDynamicBodies();
    }
  }, {
    key: "autostepEnabled",
    value: function autostepEnabled() {
      return this.raw.autostepEnabled();
    }
  }, {
    key: "enableAutostep",
    value: function enableAutostep(A, I, g) {
      this.raw.enableAutostep(A, I, g);
    }
  }, {
    key: "disableAutostep",
    value: function disableAutostep() {
      return this.raw.disableAutostep();
    }
  }, {
    key: "maxSlopeClimbAngle",
    value: function maxSlopeClimbAngle() {
      return this.raw.maxSlopeClimbAngle();
    }
  }, {
    key: "setMaxSlopeClimbAngle",
    value: function setMaxSlopeClimbAngle(A) {
      this.raw.setMaxSlopeClimbAngle(A);
    }
  }, {
    key: "minSlopeSlideAngle",
    value: function minSlopeSlideAngle() {
      return this.raw.minSlopeSlideAngle();
    }
  }, {
    key: "setMinSlopeSlideAngle",
    value: function setMinSlopeSlideAngle(A) {
      this.raw.setMinSlopeSlideAngle(A);
    }
  }, {
    key: "snapToGroundDistance",
    value: function snapToGroundDistance() {
      return this.raw.snapToGroundDistance();
    }
  }, {
    key: "enableSnapToGround",
    value: function enableSnapToGround(A) {
      this.raw.enableSnapToGround(A);
    }
  }, {
    key: "disableSnapToGround",
    value: function disableSnapToGround() {
      this.raw.disableSnapToGround();
    }
  }, {
    key: "snapToGroundEnabled",
    value: function snapToGroundEnabled() {
      return this.raw.snapToGroundEnabled();
    }
  }, {
    key: "computeColliderMovement",
    value: function computeColliderMovement(A, I, g, C, B) {
      var Q = DA.intoRaw(I);
      this.raw.computeColliderMovement(this.params.dt, this.bodies.raw, this.colliders.raw, this.queries.raw, A.handle, Q, this._applyImpulsesToDynamicBodies, this._characterMass, g, C, this.colliders.castClosure(B)), Q.free();
    }
  }, {
    key: "computedMovement",
    value: function computedMovement() {
      return DA.fromRaw(this.raw.computedMovement());
    }
  }, {
    key: "computedGrounded",
    value: function computedGrounded() {
      return this.raw.computedGrounded();
    }
  }, {
    key: "numComputedCollisions",
    value: function numComputedCollisions() {
      return this.raw.numComputedCollisions();
    }
  }, {
    key: "computedCollision",
    value: function computedCollision(A, I) {
      if (this.raw.computedCollision(A, this.rawCharacterCollision)) {
        var _A2 = this.rawCharacterCollision;
        return (I = null != I ? I : new tI()).translationApplied = DA.fromRaw(_A2.translationApplied()), I.translationRemaining = DA.fromRaw(_A2.translationRemaining()), I.toi = _A2.toi(), I.witness1 = DA.fromRaw(_A2.worldWitness1()), I.witness2 = DA.fromRaw(_A2.worldWitness2()), I.normal1 = DA.fromRaw(_A2.worldNormal1()), I.normal2 = DA.fromRaw(_A2.worldNormal2()), I.collider = this.colliders.get(_A2.handle()), I;
      }
      return null;
    }
  }]);
  return pI;
}();
var eI = exports.World = /*#__PURE__*/function () {
  function eI(A, I, g, C, B, Q, E, i, D, o, G, w, k, S) {
    _classCallCheck(this, eI);
    this.gravity = A, this.integrationParameters = new HA(I), this.islands = new XA(g), this.broadPhase = new VA(C), this.narrowPhase = new PA(B), this.bodies = new LA(Q), this.colliders = new sI(E), this.impulseJoints = new OA(i), this.multibodyJoints = new fA(D), this.ccdSolver = new mA(o), this.queryPipeline = new YI(G), this.physicsPipeline = new cI(w), this.serializationPipeline = new LI(k), this.debugRenderPipeline = new lI(S), this.characterControllers = new Set(), this.impulseJoints.finalizeDeserialization(this.bodies), this.bodies.finalizeDeserialization(this.colliders), this.colliders.finalizeDeserialization(this.bodies);
  }
  _createClass(eI, [{
    key: "free",
    value: function free() {
      this.integrationParameters.free(), this.islands.free(), this.broadPhase.free(), this.narrowPhase.free(), this.bodies.free(), this.colliders.free(), this.impulseJoints.free(), this.multibodyJoints.free(), this.ccdSolver.free(), this.queryPipeline.free(), this.physicsPipeline.free(), this.serializationPipeline.free(), this.debugRenderPipeline.free(), this.characterControllers.forEach(function (A) {
        return A.free();
      }), this.integrationParameters = void 0, this.islands = void 0, this.broadPhase = void 0, this.narrowPhase = void 0, this.bodies = void 0, this.colliders = void 0, this.ccdSolver = void 0, this.impulseJoints = void 0, this.multibodyJoints = void 0, this.queryPipeline = void 0, this.physicsPipeline = void 0, this.serializationPipeline = void 0, this.debugRenderPipeline = void 0, this.characterControllers = void 0;
    }
  }, {
    key: "takeSnapshot",
    value: function takeSnapshot() {
      return this.serializationPipeline.serializeAll(this.gravity, this.integrationParameters, this.islands, this.broadPhase, this.narrowPhase, this.bodies, this.colliders, this.impulseJoints, this.multibodyJoints);
    }
  }, {
    key: "debugRender",
    value: function debugRender() {
      return this.debugRenderPipeline.render(this.bodies, this.colliders, this.impulseJoints, this.multibodyJoints, this.narrowPhase), new HI(this.debugRenderPipeline.vertices, this.debugRenderPipeline.colors);
    }
  }, {
    key: "step",
    value: function step(A, I) {
      this.physicsPipeline.step(this.gravity, this.integrationParameters, this.islands, this.broadPhase, this.narrowPhase, this.bodies, this.colliders, this.impulseJoints, this.multibodyJoints, this.ccdSolver, A, I), this.queryPipeline.update(this.bodies, this.colliders);
    }
  }, {
    key: "propagateModifiedBodyPositionsToColliders",
    value: function propagateModifiedBodyPositionsToColliders() {
      this.bodies.raw.propagateModifiedBodyPositionsToColliders(this.colliders.raw);
    }
  }, {
    key: "updateSceneQueries",
    value: function updateSceneQueries() {
      this.propagateModifiedBodyPositionsToColliders(), this.queryPipeline.update(this.bodies, this.colliders);
    }
  }, {
    key: "timestep",
    get: function get() {
      return this.integrationParameters.dt;
    },
    set: function set(A) {
      this.integrationParameters.dt = A;
    }
  }, {
    key: "maxVelocityIterations",
    get: function get() {
      return this.integrationParameters.maxVelocityIterations;
    },
    set: function set(A) {
      this.integrationParameters.maxVelocityIterations = A;
    }
  }, {
    key: "maxVelocityFrictionIterations",
    get: function get() {
      return this.integrationParameters.maxVelocityFrictionIterations;
    },
    set: function set(A) {
      this.integrationParameters.maxVelocityFrictionIterations = A;
    }
  }, {
    key: "maxStabilizationIterations",
    get: function get() {
      return this.integrationParameters.maxStabilizationIterations;
    },
    set: function set(A) {
      this.integrationParameters.maxStabilizationIterations = A;
    }
  }, {
    key: "createRigidBody",
    value: function createRigidBody(A) {
      return this.bodies.createRigidBody(this.colliders, A);
    }
  }, {
    key: "createCharacterController",
    value: function createCharacterController(A) {
      var I = new pI(A, this.integrationParameters, this.bodies, this.colliders, this.queryPipeline);
      return this.characterControllers.add(I), I;
    }
  }, {
    key: "removeCharacterController",
    value: function removeCharacterController(A) {
      this.characterControllers.delete(A), A.free();
    }
  }, {
    key: "createCollider",
    value: function createCollider(A, I) {
      var g = I ? I.handle : void 0;
      return this.colliders.createCollider(this.bodies, A, g);
    }
  }, {
    key: "createImpulseJoint",
    value: function createImpulseJoint(A, I, g, C) {
      return this.impulseJoints.createJoint(this.bodies, A, I.handle, g.handle, C);
    }
  }, {
    key: "createMultibodyJoint",
    value: function createMultibodyJoint(A, I, g, C) {
      return this.multibodyJoints.createJoint(A, I.handle, g.handle, C);
    }
  }, {
    key: "getRigidBody",
    value: function getRigidBody(A) {
      return this.bodies.get(A);
    }
  }, {
    key: "getCollider",
    value: function getCollider(A) {
      return this.colliders.get(A);
    }
  }, {
    key: "getImpulseJoint",
    value: function getImpulseJoint(A) {
      return this.impulseJoints.get(A);
    }
  }, {
    key: "getMultibodyJoint",
    value: function getMultibodyJoint(A) {
      return this.multibodyJoints.get(A);
    }
  }, {
    key: "removeRigidBody",
    value: function removeRigidBody(A) {
      this.bodies && this.bodies.remove(A.handle, this.islands, this.colliders, this.impulseJoints, this.multibodyJoints);
    }
  }, {
    key: "removeCollider",
    value: function removeCollider(A, I) {
      this.colliders && this.colliders.remove(A.handle, this.islands, this.bodies, I);
    }
  }, {
    key: "removeImpulseJoint",
    value: function removeImpulseJoint(A, I) {
      this.impulseJoints && this.impulseJoints.remove(A.handle, I);
    }
  }, {
    key: "removeMultibodyJoint",
    value: function removeMultibodyJoint(A, I) {
      this.impulseJoints && this.multibodyJoints.remove(A.handle, I);
    }
  }, {
    key: "forEachCollider",
    value: function forEachCollider(A) {
      this.colliders.forEach(A);
    }
  }, {
    key: "forEachRigidBody",
    value: function forEachRigidBody(A) {
      this.bodies.forEach(A);
    }
  }, {
    key: "forEachActiveRigidBody",
    value: function forEachActiveRigidBody(A) {
      this.bodies.forEachActiveRigidBody(this.islands, A);
    }
  }, {
    key: "castRay",
    value: function castRay(A, I, g, C, B, Q, E, i) {
      return this.queryPipeline.castRay(this.bodies, this.colliders, A, I, g, C, B, Q ? Q.handle : null, E ? E.handle : null, this.colliders.castClosure(i));
    }
  }, {
    key: "castRayAndGetNormal",
    value: function castRayAndGetNormal(A, I, g, C, B, Q, E, i) {
      return this.queryPipeline.castRayAndGetNormal(this.bodies, this.colliders, A, I, g, C, B, Q ? Q.handle : null, E ? E.handle : null, this.colliders.castClosure(i));
    }
  }, {
    key: "intersectionsWithRay",
    value: function intersectionsWithRay(A, I, g, C, B, Q, E, i, D) {
      this.queryPipeline.intersectionsWithRay(this.bodies, this.colliders, A, I, g, C, B, Q, E ? E.handle : null, i ? i.handle : null, this.colliders.castClosure(D));
    }
  }, {
    key: "intersectionWithShape",
    value: function intersectionWithShape(A, I, g, C, B, Q, E, i) {
      var D = this.queryPipeline.intersectionWithShape(this.bodies, this.colliders, A, I, g, C, B, Q ? Q.handle : null, E ? E.handle : null, this.colliders.castClosure(i));
      return null != D ? this.colliders.get(D) : null;
    }
  }, {
    key: "projectPoint",
    value: function projectPoint(A, I, g, C, B, Q, E) {
      return this.queryPipeline.projectPoint(this.bodies, this.colliders, A, I, g, C, B ? B.handle : null, Q ? Q.handle : null, this.colliders.castClosure(E));
    }
  }, {
    key: "projectPointAndGetFeature",
    value: function projectPointAndGetFeature(A, I, g, C, B, Q) {
      return this.queryPipeline.projectPointAndGetFeature(this.bodies, this.colliders, A, I, g, C ? C.handle : null, B ? B.handle : null, this.colliders.castClosure(Q));
    }
  }, {
    key: "intersectionsWithPoint",
    value: function intersectionsWithPoint(A, I, g, C, B, Q, E) {
      this.queryPipeline.intersectionsWithPoint(this.bodies, this.colliders, A, this.colliders.castClosure(I), g, C, B ? B.handle : null, Q ? Q.handle : null, this.colliders.castClosure(E));
    }
  }, {
    key: "castShape",
    value: function castShape(A, I, g, C, B, Q, E, i, D, o, G) {
      return this.queryPipeline.castShape(this.bodies, this.colliders, A, I, g, C, B, Q, E, i, D ? D.handle : null, o ? o.handle : null, this.colliders.castClosure(G));
    }
  }, {
    key: "intersectionsWithShape",
    value: function intersectionsWithShape(A, I, g, C, B, Q, E, i, D) {
      this.queryPipeline.intersectionsWithShape(this.bodies, this.colliders, A, I, g, this.colliders.castClosure(C), B, Q, E ? E.handle : null, i ? i.handle : null, this.colliders.castClosure(D));
    }
  }, {
    key: "collidersWithAabbIntersectingAabb",
    value: function collidersWithAabbIntersectingAabb(A, I, g) {
      this.queryPipeline.collidersWithAabbIntersectingAabb(A, I, this.colliders.castClosure(g));
    }
  }, {
    key: "contactsWith",
    value: function contactsWith(A, I) {
      this.narrowPhase.contactsWith(A.handle, this.colliders.castClosure(I));
    }
  }, {
    key: "intersectionsWith",
    value: function intersectionsWith(A, I) {
      this.narrowPhase.intersectionsWith(A.handle, this.colliders.castClosure(I));
    }
  }, {
    key: "contactPair",
    value: function contactPair(A, I, g) {
      this.narrowPhase.contactPair(A.handle, I.handle, g);
    }
  }, {
    key: "intersectionPair",
    value: function intersectionPair(A, I) {
      return this.narrowPhase.intersectionPair(A.handle, I.handle);
    }
  }], [{
    key: "fromRaw",
    value: function fromRaw(A) {
      return A ? new eI(DA.fromRaw(A.takeGravity()), A.takeIntegrationParameters(), A.takeIslandManager(), A.takeBroadPhase(), A.takeNarrowPhase(), A.takeBodies(), A.takeColliders(), A.takeImpulseJoints(), A.takeMultibodyJoints()) : null;
    }
  }, {
    key: "restoreSnapshot",
    value: function restoreSnapshot(A) {
      return new LI().deserializeAll(A);
    }
  }]);
  return eI;
}();
!function (A) {
  A[A.COLLISION_EVENTS = 1] = "COLLISION_EVENTS", A[A.CONTACT_FORCE_EVENTS = 2] = "CONTACT_FORCE_EVENTS";
}(FA || (exports.ActiveEvents = FA = {}));
var rI = exports.TempContactForceEvent = /*#__PURE__*/function () {
  function rI() {
    _classCallCheck(this, rI);
  }
  _createClass(rI, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }, {
    key: "collider1",
    value: function collider1() {
      return this.raw.collider1();
    }
  }, {
    key: "collider2",
    value: function collider2() {
      return this.raw.collider2();
    }
  }, {
    key: "totalForce",
    value: function totalForce() {
      return DA.fromRaw(this.raw.total_force());
    }
  }, {
    key: "totalForceMagnitude",
    value: function totalForceMagnitude() {
      return this.raw.total_force_magnitude();
    }
  }, {
    key: "maxForceDirection",
    value: function maxForceDirection() {
      return DA.fromRaw(this.raw.max_force_direction());
    }
  }, {
    key: "maxForceMagnitude",
    value: function maxForceMagnitude() {
      return this.raw.max_force_magnitude();
    }
  }]);
  return rI;
}();
var dI = exports.EventQueue = /*#__PURE__*/function () {
  function dI(A, I) {
    _classCallCheck(this, dI);
    this.raw = I || new T(A);
  }
  _createClass(dI, [{
    key: "free",
    value: function free() {
      this.raw && this.raw.free(), this.raw = void 0;
    }
  }, {
    key: "drainCollisionEvents",
    value: function drainCollisionEvents(A) {
      this.raw.drainCollisionEvents(A);
    }
  }, {
    key: "drainContactForceEvents",
    value: function drainContactForceEvents(A) {
      var I = new rI();
      this.raw.drainContactForceEvents(function (g) {
        I.raw = g, A(I), I.free();
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      this.raw.clear();
    }
  }]);
  return dI;
}();
function TI(A, I, g, C) {
  return new (g || (g = Promise))(function (B, Q) {
    function E(A) {
      try {
        D(C.next(A));
      } catch (A) {
        Q(A);
      }
    }
    function i(A) {
      try {
        D(C.throw(A));
      } catch (A) {
        Q(A);
      }
    }
    function D(A) {
      var I;
      A.done ? B(A.value) : (I = A.value, I instanceof g ? I : new g(function (A) {
        A(I);
      })).then(E, i);
    }
    D((C = C.apply(A, I || [])).next());
  });
}
!function (A) {
  A[A.FILTER_CONTACT_PAIRS = 1] = "FILTER_CONTACT_PAIRS", A[A.FILTER_INTERSECTION_PAIRS = 2] = "FILTER_INTERSECTION_PAIRS";
}(qA || (exports.ActiveHooks = qA = {})), function (A) {
  A[A.EMPTY = 0] = "EMPTY", A[A.COMPUTE_IMPULSE = 1] = "COMPUTE_IMPULSE";
}(RA || (exports.SolverFlags = RA = {}));
for (var OI = {
    byteLength: function byteLength(A) {
      var I = fI(A),
        g = I[0],
        C = I[1];
      return 3 * (g + C) / 4 - C;
    },
    toByteArray: function toByteArray(A) {
      var I,
        g,
        C = fI(A),
        B = C[0],
        Q = C[1],
        E = new bI(function (A, I, g) {
          return 3 * (I + g) / 4 - g;
        }(0, B, Q)),
        i = 0,
        D = Q > 0 ? B - 4 : B;
      for (g = 0; g < D; g += 4) I = ZI[A.charCodeAt(g)] << 18 | ZI[A.charCodeAt(g + 1)] << 12 | ZI[A.charCodeAt(g + 2)] << 6 | ZI[A.charCodeAt(g + 3)], E[i++] = I >> 16 & 255, E[i++] = I >> 8 & 255, E[i++] = 255 & I;
      2 === Q && (I = ZI[A.charCodeAt(g)] << 2 | ZI[A.charCodeAt(g + 1)] >> 4, E[i++] = 255 & I);
      1 === Q && (I = ZI[A.charCodeAt(g)] << 10 | ZI[A.charCodeAt(g + 1)] << 4 | ZI[A.charCodeAt(g + 2)] >> 2, E[i++] = I >> 8 & 255, E[i++] = 255 & I);
      return E;
    },
    fromByteArray: function fromByteArray(A) {
      for (var I, g = A.length, C = g % 3, B = [], Q = 16383, E = 0, i = g - C; E < i; E += Q) B.push(mI(A, E, E + Q > i ? i : E + Q));
      1 === C ? (I = A[g - 1], B.push(nI[I >> 2] + nI[I << 4 & 63] + "==")) : 2 === C && (I = (A[g - 2] << 8) + A[g - 1], B.push(nI[I >> 10] + nI[I >> 4 & 63] + nI[I << 2 & 63] + "="));
      return B.join("");
    }
  }, nI = [], ZI = [], bI = "undefined" != typeof Uint8Array ? Uint8Array : Array, WI = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", jI = 0, xI = WI.length; jI < xI; ++jI) nI[jI] = WI[jI], ZI[WI.charCodeAt(jI)] = jI;
function fI(A) {
  var I = A.length;
  if (I % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
  var g = A.indexOf("=");
  return -1 === g && (g = I), [g, g === I ? 0 : 4 - g % 4];
}
function mI(A, I, g) {
  for (var C, B, Q = [], E = I; E < g; E += 3) C = (A[E] << 16 & 16711680) + (A[E + 1] << 8 & 65280) + (255 & A[E + 2]), Q.push(nI[(B = C) >> 18 & 63] + nI[B >> 12 & 63] + nI[B >> 6 & 63] + nI[63 & B]);
  return Q.join("");
}
function XI() {
  return TI(this, void 0, void 0, /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
}
function VI() {
  return function () {
    try {
      var _C7 = A.__wbindgen_add_to_stack_pointer(-16);
      A.version(_C7);
      var I = G()[_C7 / 4 + 0],
        g = G()[_C7 / 4 + 1];
      return S(I, g);
    } finally {
      A.__wbindgen_add_to_stack_pointer(16), A.__wbindgen_free(I, g);
    }
  }();
}
ZI["-".charCodeAt(0)] = 62, ZI["_".charCodeAt(0)] = 63;
var PI = exports.default = Object.freeze({
  __proto__: null,
  version: VI,
  Vector3: iA,
  VectorOps: DA,
  Quaternion: oA,
  RotationOps: GA,
  SdpMatrix3: wA,
  SdpMatrix3Ops: kA,
  get RigidBodyType() {
    return SA;
  },
  RigidBody: sA,
  RigidBodyDesc: cA,
  RigidBodySet: LA,
  IntegrationParameters: HA,
  get JointType() {
    return aA;
  },
  get MotorModel() {
    return MA;
  },
  ImpulseJoint: lA,
  UnitImpulseJoint: tA,
  FixedImpulseJoint: pA,
  PrismaticImpulseJoint: eA,
  RevoluteImpulseJoint: rA,
  SphericalImpulseJoint: dA,
  JointData: TA,
  ImpulseJointSet: OA,
  MultibodyJoint: nA,
  UnitMultibodyJoint: ZA,
  FixedMultibodyJoint: bA,
  PrismaticMultibodyJoint: WA,
  RevoluteMultibodyJoint: jA,
  SphericalMultibodyJoint: xA,
  MultibodyJointSet: fA,
  get CoefficientCombineRule() {
    return KA;
  },
  CCDSolver: mA,
  IslandManager: XA,
  BroadPhase: VA,
  NarrowPhase: PA,
  TempContactManifold: zA,
  Shape: QI,
  get ShapeType() {
    return JA;
  },
  Ball: EI,
  HalfSpace: iI,
  Cuboid: DI,
  RoundCuboid: oI,
  Capsule: GI,
  Segment: wI,
  Triangle: kI,
  RoundTriangle: SI,
  Polyline: aI,
  TriMesh: MI,
  ConvexPolyhedron: KI,
  RoundConvexPolyhedron: yI,
  Heightfield: JI,
  Cylinder: UI,
  RoundCylinder: hI,
  Cone: NI,
  RoundCone: FI,
  get ActiveCollisionTypes() {
    return UA;
  },
  Collider: qI,
  get MassPropsMode() {
    return hA;
  },
  ColliderDesc: RI,
  ColliderSet: sI,
  get FeatureType() {
    return yA;
  },
  Ray: $A,
  RayIntersection: AI,
  RayColliderIntersection: II,
  RayColliderToi: gI,
  PointProjection: vA,
  PointColliderProjection: _A,
  ShapeTOI: CI,
  ShapeColliderTOI: BI,
  ShapeContact: uA,
  World: eI,
  PhysicsPipeline: cI,
  SerializationPipeline: LI,
  get ActiveEvents() {
    return FA;
  },
  TempContactForceEvent: rI,
  EventQueue: dI,
  get ActiveHooks() {
    return qA;
  },
  get SolverFlags() {
    return RA;
  },
  DebugRenderBuffers: HI,
  DebugRenderPipeline: lI,
  get QueryFilterFlags() {
    return NA;
  },
  QueryPipeline: YI,
  init: XI,
  CharacterCollision: tI,
  KinematicCharacterController: pI
});
},{}],"C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52842" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","node_modules/@splinetool/runtime/build/physics.js"], null)
//# sourceMappingURL=/physics.aa5ff516.js.map