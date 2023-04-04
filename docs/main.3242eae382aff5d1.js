(self.webpackChunkportfolio = self.webpackChunkportfolio || []).push([
  [179],
  {
    545: (Bo, Be, ue) => {
      "use strict";
      function R(e) {
        return "function" == typeof e;
      }
      function j(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ce = j(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Se(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class De {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (R(r))
              try {
                r();
              } catch (i) {
                t = i instanceof ce ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  J(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof ce ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new ce(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) J(t);
            else {
              if (t instanceof De) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Se(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Se(n, t), t instanceof De && t._removeParent(this);
        }
      }
      De.EMPTY = (() => {
        const e = new De();
        return (e.closed = !0), e;
      })();
      const W = De.EMPTY;
      function be(e) {
        return (
          e instanceof De ||
          (e && "closed" in e && R(e.remove) && R(e.add) && R(e.unsubscribe))
        );
      }
      function J(e) {
        R(e) ? e() : e.unsubscribe();
      }
      const ne = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        re = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = re;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = re;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Ee(e) {
        re.setTimeout(() => {
          const { onUnhandledError: t } = ne;
          if (!t) throw e;
          t(e);
        });
      }
      function tt() {}
      const pt = kn("C", void 0, void 0);
      function kn(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let kt = null;
      function rn(e) {
        if (ne.useDeprecatedSynchronousErrorHandling) {
          const t = !kt;
          if ((t && (kt = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = kt;
            if (((kt = null), n)) throw r;
          }
        } else e();
      }
      class mn extends De {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), be(t) && t.add(this))
              : (this.destination = et);
        }
        static create(t, n, r) {
          return new k(t, n, r);
        }
        next(t) {
          this.isStopped
            ? q(
                (function gr(e) {
                  return kn("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? q(
                (function er(e) {
                  return kn("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? q(pt, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Re = Function.prototype.bind;
      function mt(e, t) {
        return Re.call(e, t);
      }
      class yn {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              T(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              T(r);
            }
          else T(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              T(n);
            }
        }
      }
      class k extends mn {
        constructor(t, n, r) {
          let o;
          if ((super(), R(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && ne.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && mt(t.next, i),
                  error: t.error && mt(t.error, i),
                  complete: t.complete && mt(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new yn(o);
        }
      }
      function T(e) {
        ne.useDeprecatedSynchronousErrorHandling
          ? (function gt(e) {
              ne.useDeprecatedSynchronousErrorHandling &&
                kt &&
                ((kt.errorThrown = !0), (kt.error = e));
            })(e)
          : Ee(e);
      }
      function q(e, t) {
        const { onStoppedNotification: n } = ne;
        n && re.setTimeout(() => n(e, t));
      }
      const et = {
          closed: !0,
          next: tt,
          error: function ge(e) {
            throw e;
          },
          complete: tt,
        },
        yt =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function at(e) {
        return e;
      }
      function vn(e) {
        return 0 === e.length
          ? at
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let Ne = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function Gt(e) {
              return (
                (e && e instanceof mn) ||
                ((function mr(e) {
                  return e && R(e.next) && R(e.error) && R(e.complete);
                })(e) &&
                  be(e))
              );
            })(n)
              ? n
              : new k(n, r, o);
            return (
              rn(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Br(r))((o, i) => {
              const s = new k({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    i(l), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [yt]() {
            return this;
          }
          pipe(...n) {
            return vn(n)(this);
          }
          toPromise(n) {
            return new (n = Br(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Br(e) {
        var t;
        return null !== (t = e ?? ne.Promise) && void 0 !== t ? t : Promise;
      }
      const Mt = j(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Ue = (() => {
        class e extends Ne {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Ot(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Mt();
          }
          next(n) {
            rn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            rn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            rn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? W
              : ((this.currentObservers = null),
                i.push(n),
                new De(() => {
                  (this.currentObservers = null), Se(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new Ne();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Ot(t, n)), e;
      })();
      class Ot extends Ue {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : W;
        }
      }
      function ze(e) {
        return R(e?.lift);
      }
      function ae(e) {
        return (t) => {
          if (ze(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function me(e, t, n, r, o) {
        return new Dn(e, t, n, r, o);
      }
      class Dn extends mn {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    t.error(l);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (l) {
                    t.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function Z(e, t) {
        return ae((n, r) => {
          let o = 0;
          n.subscribe(
            me(r, (i) => {
              r.next(e.call(t, i, o++));
            })
          );
        });
      }
      function yr(e) {
        return this instanceof yr ? ((this.v = e), this) : new yr(e);
      }
      function i3(e, t, n) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var o,
          r = n.apply(e, t || []),
          i = [];
        return (
          (o = {}),
          s("next"),
          s("throw"),
          s("return"),
          (o[Symbol.asyncIterator] = function () {
            return this;
          }),
          o
        );
        function s(f) {
          r[f] &&
            (o[f] = function (h) {
              return new Promise(function (g, y) {
                i.push([f, h, g, y]) > 1 || a(f, h);
              });
            });
        }
        function a(f, h) {
          try {
            !(function l(f) {
              f.value instanceof yr
                ? Promise.resolve(f.value.v).then(u, c)
                : d(i[0][2], f);
            })(r[f](h));
          } catch (g) {
            d(i[0][3], g);
          }
        }
        function u(f) {
          a("next", f);
        }
        function c(f) {
          a("throw", f);
        }
        function d(f, h) {
          f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
        }
      }
      function s3(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Hd(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function o(i, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    i({ value: u, done: a });
                  }, s);
                })(a, l, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const Vd = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Bd(e) {
        return R(e?.then);
      }
      function Ud(e) {
        return R(e[yt]);
      }
      function zd(e) {
        return Symbol.asyncIterator && R(e?.[Symbol.asyncIterator]);
      }
      function Gd(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const qd = (function l3() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Wd(e) {
        return R(e?.[qd]);
      }
      function Zd(e) {
        return i3(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield yr(n.read());
              if (o) return yield yr(void 0);
              yield yield yr(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Qd(e) {
        return R(e?.getReader);
      }
      function Cn(e) {
        if (e instanceof Ne) return e;
        if (null != e) {
          if (Ud(e))
            return (function u3(e) {
              return new Ne((t) => {
                const n = e[yt]();
                if (R(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Vd(e))
            return (function c3(e) {
              return new Ne((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Bd(e))
            return (function d3(e) {
              return new Ne((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Ee);
              });
            })(e);
          if (zd(e)) return Yd(e);
          if (Wd(e))
            return (function f3(e) {
              return new Ne((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Qd(e))
            return (function h3(e) {
              return Yd(Zd(e));
            })(e);
        }
        throw Gd(e);
      }
      function Yd(e) {
        return new Ne((t) => {
          (function p3(e, t) {
            var n, r, o, i;
            return (function r3(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = s3(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Ln(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function nt(e, t, n = 1 / 0) {
        return R(t)
          ? nt((r, o) => Z((i, s) => t(r, i, o, s))(Cn(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            ae((r, o) =>
              (function g3(e, t, n, r, o, i, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && t.complete();
                  },
                  h = (y) => (u < r ? g(y) : l.push(y)),
                  g = (y) => {
                    i && t.next(y), u++;
                    let C = !1;
                    Cn(n(y, c++)).subscribe(
                      me(
                        t,
                        (w) => {
                          o?.(w), i ? h(w) : t.next(w);
                        },
                        () => {
                          C = !0;
                        },
                        void 0,
                        () => {
                          if (C)
                            try {
                              for (u--; l.length && u < r; ) {
                                const w = l.shift();
                                s ? Ln(t, s, () => g(w)) : g(w);
                              }
                              f();
                            } catch (w) {
                              t.error(w);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    me(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function Ur(e = 1 / 0) {
        return nt(at, e);
      }
      const wn = new Ne((e) => e.complete());
      function ll(e) {
        return e[e.length - 1];
      }
      function Uo(e) {
        return (function y3(e) {
          return e && R(e.schedule);
        })(ll(e))
          ? e.pop()
          : void 0;
      }
      function Kd(e, t = 0) {
        return ae((n, r) => {
          n.subscribe(
            me(
              r,
              (o) => Ln(r, e, () => r.next(o), t),
              () => Ln(r, e, () => r.complete(), t),
              (o) => Ln(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Jd(e, t = 0) {
        return ae((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Xd(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new Ne((n) => {
          Ln(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Ln(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function Qe(e, t) {
        return t
          ? (function S3(e, t) {
              if (null != e) {
                if (Ud(e))
                  return (function C3(e, t) {
                    return Cn(e).pipe(Jd(t), Kd(t));
                  })(e, t);
                if (Vd(e))
                  return (function _3(e, t) {
                    return new Ne((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Bd(e))
                  return (function w3(e, t) {
                    return Cn(e).pipe(Jd(t), Kd(t));
                  })(e, t);
                if (zd(e)) return Xd(e, t);
                if (Wd(e))
                  return (function b3(e, t) {
                    return new Ne((n) => {
                      let r;
                      return (
                        Ln(n, t, () => {
                          (r = e[qd]()),
                            Ln(
                              n,
                              t,
                              () => {
                                let o, i;
                                try {
                                  ({ value: o, done: i } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                i ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => R(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (Qd(e))
                  return (function E3(e, t) {
                    return Xd(Zd(e), t);
                  })(e, t);
              }
              throw Gd(e);
            })(e, t)
          : Cn(e);
      }
      function ul(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new k({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function Ie(e) {
        for (let t in e) if (e[t] === Ie) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function Te(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(Te).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function dl(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const T3 = Ie({ __forward_ref__: Ie });
      function fl(e) {
        return (
          (e.__forward_ref__ = fl),
          (e.toString = function () {
            return Te(this());
          }),
          e
        );
      }
      function $(e) {
        return hl(e) ? e() : e;
      }
      function hl(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(T3) &&
          e.__forward_ref__ === fl
        );
      }
      function pl(e) {
        return e && !!e.ɵproviders;
      }
      const ef = "https://g.co/ng/security#xss";
      class S extends Error {
        constructor(t, n) {
          super(
            (function fs(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function Q(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function hs(e, t) {
        throw new S(-201, !1);
      }
      function qt(e, t) {
        null == e &&
          (function we(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function z(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function nr(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function ps(e) {
        return tf(e, gs) || tf(e, rf);
      }
      function tf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function nf(e) {
        return e && (e.hasOwnProperty(gl) || e.hasOwnProperty(L3))
          ? e[gl]
          : null;
      }
      const gs = Ie({ ɵprov: Ie }),
        gl = Ie({ ɵinj: Ie }),
        rf = Ie({ ngInjectableDef: Ie }),
        L3 = Ie({ ngInjectorDef: Ie });
      var H = (() => (
        ((H = H || {})[(H.Default = 0)] = "Default"),
        (H[(H.Host = 1)] = "Host"),
        (H[(H.Self = 2)] = "Self"),
        (H[(H.SkipSelf = 4)] = "SkipSelf"),
        (H[(H.Optional = 8)] = "Optional"),
        H
      ))();
      let ml;
      function Wt(e) {
        const t = ml;
        return (ml = e), t;
      }
      function sf(e, t, n) {
        const r = ps(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & H.Optional
          ? null
          : void 0 !== t
          ? t
          : void hs(Te(e));
      }
      const xe = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        zo = {},
        yl = "__NG_DI_FLAG__",
        ms = "ngTempTokenPath",
        H3 = /\n/gm,
        af = "__source";
      let Go;
      function zr(e) {
        const t = Go;
        return (Go = e), t;
      }
      function B3(e, t = H.Default) {
        if (void 0 === Go) throw new S(-203, !1);
        return null === Go
          ? sf(e, void 0, t)
          : Go.get(e, t & H.Optional ? null : void 0, t);
      }
      function O(e, t = H.Default) {
        return (
          (function j3() {
            return ml;
          })() || B3
        )($(e), t);
      }
      function fe(e, t = H.Default) {
        return O(e, ys(t));
      }
      function ys(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function vl(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = $(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new S(900, !1);
            let o,
              i = H.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = U3(a);
              "number" == typeof l
                ? -1 === l
                  ? (o = a.token)
                  : (i |= l)
                : (o = a);
            }
            t.push(O(o, i));
          } else t.push(O(r));
        }
        return t;
      }
      function qo(e, t) {
        return (e[yl] = t), (e.prototype[yl] = t), e;
      }
      function U3(e) {
        return e[yl];
      }
      function rr(e) {
        return { toString: e }.toString();
      }
      var on = (() => (
          ((on = on || {})[(on.OnPush = 0)] = "OnPush"),
          (on[(on.Default = 1)] = "Default"),
          on
        ))(),
        _n = (() => {
          return (
            ((e = _n || (_n = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            _n
          );
          var e;
        })();
      const jn = {},
        ve = [],
        vs = Ie({ ɵcmp: Ie }),
        Dl = Ie({ ɵdir: Ie }),
        Cl = Ie({ ɵpipe: Ie }),
        uf = Ie({ ɵmod: Ie }),
        $n = Ie({ ɵfac: Ie }),
        Wo = Ie({ __NG_ELEMENT_ID__: Ie });
      let q3 = 0;
      function Zt(e) {
        return rr(() => {
          const n = !0 === e.standalone,
            r = {},
            o = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === on.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              standalone: n,
              dependencies: (n && e.dependencies) || null,
              getStandaloneInjector: null,
              selectors: e.selectors || ve,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || _n.Emulated,
              id: "c" + q3++,
              styles: e.styles || ve,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
              findHostDirectiveDefs: null,
              hostDirectives: null,
            },
            i = e.dependencies,
            s = e.features;
          return (
            (o.inputs = ff(e.inputs, r)),
            (o.outputs = ff(e.outputs)),
            s && s.forEach((a) => a(o)),
            (o.directiveDefs = i
              ? () => ("function" == typeof i ? i() : i).map(cf).filter(df)
              : null),
            (o.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Ct).filter(df)
              : null),
            o
          );
        });
      }
      function cf(e) {
        return _e(e) || lt(e);
      }
      function df(e) {
        return null !== e;
      }
      function vr(e) {
        return rr(() => ({
          type: e.type,
          bootstrap: e.bootstrap || ve,
          declarations: e.declarations || ve,
          imports: e.imports || ve,
          exports: e.exports || ve,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function ff(e, t) {
        if (null == e) return jn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      const Dt = Zt;
      function Tt(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function _e(e) {
        return e[vs] || null;
      }
      function lt(e) {
        return e[Dl] || null;
      }
      function Ct(e) {
        return e[Cl] || null;
      }
      function jt(e, t) {
        const n = e[uf] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${Te(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function $t(e) {
        return Array.isArray(e) && "object" == typeof e[1];
      }
      function an(e) {
        return Array.isArray(e) && !0 === e[1];
      }
      function bl(e) {
        return 0 != (4 & e.flags);
      }
      function Ko(e) {
        return e.componentOffset > -1;
      }
      function bs(e) {
        return 1 == (1 & e.flags);
      }
      function ln(e) {
        return null !== e.template;
      }
      function Q3(e) {
        return 0 != (256 & e[2]);
      }
      function Cr(e, t) {
        return e.hasOwnProperty($n) ? e[$n] : null;
      }
      class J3 {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function wr() {
        return vf;
      }
      function vf(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = e5), X3;
      }
      function X3() {
        const e = Cf(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === jn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function e5(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Cf(e) ||
            (function t5(e, t) {
              return (e[Df] = t);
            })(e, { previous: jn, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          l = a[o];
        (s[o] = new J3(l && l.currentValue, t, a === jn)), (e[r] = t);
      }
      wr.ngInherit = !0;
      const Df = "__ngSimpleChanges__";
      function Cf(e) {
        return e[Df] || null;
      }
      function rt(e) {
        for (; Array.isArray(e); ) e = e[0];
        return e;
      }
      function Ht(e, t) {
        return rt(t[e.index]);
      }
      function bf(e, t) {
        return e.data[t];
      }
      function Vt(e, t) {
        const n = t[e];
        return $t(n) ? n : n[0];
      }
      function Ss(e) {
        return 64 == (64 & e[2]);
      }
      function or(e, t) {
        return null == t ? null : e[t];
      }
      function Ef(e) {
        e[18] = 0;
      }
      function Sl(e, t) {
        e[5] += t;
        let n = e,
          r = e[3];
        for (
          ;
          null !== r && ((1 === t && 1 === n[5]) || (-1 === t && 0 === n[5]));

        )
          (r[5] += t), (n = r), (r = r[3]);
      }
      const Y = { lFrame: kf(null), bindingsEnabled: !0 };
      function If() {
        return Y.bindingsEnabled;
      }
      function D() {
        return Y.lFrame.lView;
      }
      function he() {
        return Y.lFrame.tView;
      }
      function Jo(e) {
        return (Y.lFrame.contextLView = e), e[8];
      }
      function Xo(e) {
        return (Y.lFrame.contextLView = null), e;
      }
      function ot() {
        let e = Mf();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Mf() {
        return Y.lFrame.currentTNode;
      }
      function En(e, t) {
        const n = Y.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Il() {
        return Y.lFrame.isParent;
      }
      function Ml() {
        Y.lFrame.isParent = !1;
      }
      function _t() {
        const e = Y.lFrame;
        let t = e.bindingRootIndex;
        return (
          -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t
        );
      }
      function Kr() {
        return Y.lFrame.bindingIndex++;
      }
      function p5(e, t) {
        const n = Y.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Tl(t);
      }
      function Tl(e) {
        Y.lFrame.currentDirectiveIndex = e;
      }
      function Al(e) {
        Y.lFrame.currentQueryIndex = e;
      }
      function m5(e) {
        const t = e[1];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[6] : null;
      }
      function Pf(e, t, n) {
        if (n & H.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & H.Host ||
              ((o = m5(i)), null === o || ((i = i[15]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (Y.lFrame = Nf());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function Rl(e) {
        const t = Nf(),
          n = e[1];
        (Y.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Nf() {
        const e = Y.lFrame,
          t = null === e ? null : e.child;
        return null === t ? kf(e) : t;
      }
      function kf(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Of() {
        const e = Y.lFrame;
        return (
          (Y.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Ff = Of;
      function Pl() {
        const e = Of();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function bt() {
        return Y.lFrame.selectedIndex;
      }
      function _r(e) {
        Y.lFrame.selectedIndex = e;
      }
      function V() {
        Y.lFrame.currentNamespace = "svg";
      }
      function pe() {
        !(function C5() {
          Y.lFrame.currentNamespace = null;
        })();
      }
      function Is(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks || (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(n, a)),
            l && (e.viewHooks || (e.viewHooks = [])).push(-n, l),
            u &&
              ((e.viewHooks || (e.viewHooks = [])).push(n, u),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(n, u)),
            null != c && (e.destroyHooks || (e.destroyHooks = [])).push(n, c);
        }
      }
      function Ms(e, t, n) {
        Lf(e, t, 3, n);
      }
      function Ts(e, t, n, r) {
        (3 & e[2]) === n && Lf(e, t, n, r);
      }
      function Nl(e, t) {
        let n = e[2];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[2] = n));
      }
      function Lf(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & e[18] : 0; l < s; l++)
          if ("number" == typeof t[l + 1]) {
            if (((a = t[l]), null != r && a >= r)) break;
          } else
            t[l] < 0 && (e[18] += 65536),
              (a < i || -1 == i) &&
                (b5(e, n, t, l), (e[18] = (4294901760 & e[18]) + l + 2)),
              l++;
      }
      function b5(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === t) {
            e[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class ti {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Ol(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            $f(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function jf(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function $f(e) {
        return 64 === e.charCodeAt(0);
      }
      function ni(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Hf(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Hf(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function Vf(e) {
        return -1 !== e;
      }
      function xs(e) {
        return 32767 & e;
      }
      function As(e, t) {
        let n = (function M5(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Fl = !0;
      function Rs(e) {
        const t = Fl;
        return (Fl = e), t;
      }
      let T5 = 0;
      const Sn = {};
      function Ps(e, t) {
        const n = zf(e, t);
        if (-1 !== n) return n;
        const r = t[1];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Ll(r.data, e),
          Ll(t, null),
          Ll(r.blueprint, null));
        const o = jl(e, t),
          i = e.injectorIndex;
        if (Vf(o)) {
          const s = xs(o),
            a = As(o, t),
            l = a[1].data;
          for (let u = 0; u < 8; u++) t[i + u] = a[s + u] | l[s + u];
        }
        return (t[i + 8] = o), i;
      }
      function Ll(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function zf(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function jl(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = Jf(o)), null === r)) return -1;
          if ((n++, (o = o[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function $l(e, t, n) {
        !(function x5(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Wo) && (r = n[Wo]),
            null == r && (r = n[Wo] = T5++);
          const o = 255 & r;
          t.data[e + (o >> 5)] |= 1 << o;
        })(e, t, n);
      }
      function Gf(e, t, n) {
        if (n & H.Optional || void 0 !== e) return e;
        hs();
      }
      function qf(e, t, n, r) {
        if (
          (n & H.Optional && void 0 === r && (r = null),
          !(n & (H.Self | H.Host)))
        ) {
          const o = e[9],
            i = Wt(void 0);
          try {
            return o ? o.get(t, r, n & H.Optional) : sf(t, r, n & H.Optional);
          } finally {
            Wt(i);
          }
        }
        return Gf(r, 0, n);
      }
      function Wf(e, t, n, r = H.Default, o) {
        if (null !== e) {
          if (1024 & t[2]) {
            const s = (function k5(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[2] && !(256 & s[2]);

              ) {
                const a = Zf(i, s, n, r | H.Self, Sn);
                if (a !== Sn) return a;
                let l = i.parent;
                if (!l) {
                  const u = s[21];
                  if (u) {
                    const c = u.get(n, Sn, r);
                    if (c !== Sn) return c;
                  }
                  (l = Jf(s)), (s = s[15]);
                }
                i = l;
              }
              return o;
            })(e, t, n, r, Sn);
            if (s !== Sn) return s;
          }
          const i = Zf(e, t, n, r, Sn);
          if (i !== Sn) return i;
        }
        return qf(t, n, r, o);
      }
      function Zf(e, t, n, r, o) {
        const i = (function P5(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Wo) ? e[Wo] : void 0;
          return "number" == typeof t ? (t >= 0 ? 255 & t : N5) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Pf(t, e, r)) return r & H.Host ? Gf(o, 0, r) : qf(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & H.Optional) return s;
            hs();
          } finally {
            Ff();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = zf(e, t),
            l = -1,
            u = r & H.Host ? t[16][6] : null;
          for (
            (-1 === a || r & H.SkipSelf) &&
            ((l = -1 === a ? jl(e, t) : t[a + 8]),
            -1 !== l && Yf(r, !1)
              ? ((s = t[1]), (a = xs(l)), (t = As(l, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[1];
            if (Qf(i, a, c.data)) {
              const d = R5(a, t, n, s, r, u);
              if (d !== Sn) return d;
            }
            (l = t[a + 8]),
              -1 !== l && Yf(r, t[1].data[a + 8] === u) && Qf(i, a, t)
                ? ((s = c), (a = xs(l)), (t = As(l, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function R5(e, t, n, r, o, i) {
        const s = t[1],
          a = s.data[e + 8],
          c = (function Ns(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              l = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const g = s[h];
              if ((h < l && n === g) || (h >= l && g.type === n)) return h;
            }
            if (o) {
              const h = s[l];
              if (h && ln(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Ko(a) && Fl : r != s && 0 != (3 & a.type),
            o & H.Host && i === a
          );
        return null !== c ? br(t, s, c, a) : Sn;
      }
      function br(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function E5(e) {
            return e instanceof ti;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function x3(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new S(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function Ce(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : Q(e);
              })(i[n])
            );
          const a = Rs(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? Wt(s.injectImpl) : null;
          Pf(e, r, H.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function _5(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = vf(t);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== l && Wt(l), Rs(a), (s.resolving = !1), Ff();
          }
        }
        return o;
      }
      function Qf(e, t, n) {
        return !!(n[t + (e >> 5)] & (1 << e));
      }
      function Yf(e, t) {
        return !(e & H.Self || (e & H.Host && t));
      }
      class Xr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Wf(this._tNode, this._lView, t, ys(r), n);
        }
      }
      function N5() {
        return new Xr(ot(), D());
      }
      function Hl(e) {
        return hl(e)
          ? () => {
              const t = Hl($(e));
              return t && t();
            }
          : Cr(e);
      }
      function Jf(e) {
        const t = e[1],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[6] : null;
      }
      const to = "__parameters__";
      function ro(e, t, n) {
        return rr(() => {
          const r = (function Vl(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(to)
                ? l[to]
                : Object.defineProperty(l, to, { value: [] })[to];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class G {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = z({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function Er(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Er(n, t) : t(n)));
      }
      function eh(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function Os(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function ii(e, t) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(t);
        return n;
      }
      const si = qo(ro("Optional"), 8),
        ai = qo(ro("SkipSelf"), 4);
      var xt = (() => (
        ((xt = xt || {})[(xt.Important = 1)] = "Important"),
        (xt[(xt.DashCase = 2)] = "DashCase"),
        xt
      ))();
      const Ql = new Map();
      let s4 = 0;
      const Kl = "__ngContext__";
      function dt(e, t) {
        $t(t)
          ? ((e[Kl] = t[20]),
            (function l4(e) {
              Ql.set(e[20], e);
            })(t))
          : (e[Kl] = t);
      }
      function Xl(e, t) {
        return undefined(e, t);
      }
      function di(e) {
        const t = e[3];
        return an(t) ? t[3] : t;
      }
      function eu(e) {
        return wh(e[13]);
      }
      function tu(e) {
        return wh(e[4]);
      }
      function wh(e) {
        for (; null !== e && !an(e); ) e = e[4];
        return e;
      }
      function so(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          an(r) ? (i = r) : $t(r) && ((s = !0), (r = r[0]));
          const a = rt(r);
          0 === e && null !== n
            ? null == o
              ? Mh(t, n, a)
              : Sr(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Sr(t, n, a, o || null, !0)
            : 2 === e
            ? (function lu(e, t, n) {
                const r = $s(e, t);
                r &&
                  (function T4(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function R4(e, t, n, r, o) {
                const i = n[7];
                i !== rt(n) && so(t, e, r, i, o);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  fi(l[1], l, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function ru(e, t, n) {
        return e.createElement(t, n);
      }
      function bh(e, t) {
        const n = e[9],
          r = n.indexOf(t),
          o = t[3];
        512 & t[2] && ((t[2] &= -513), Sl(o, -1)), n.splice(r, 1);
      }
      function ou(e, t) {
        if (e.length <= 10) return;
        const n = 10 + t,
          r = e[n];
        if (r) {
          const o = r[17];
          null !== o && o !== e && bh(o, r), t > 0 && (e[n - 1][4] = r[4]);
          const i = Os(e, 10 + t);
          !(function C4(e, t) {
            fi(e, t, t[11], 2, null, null), (t[0] = null), (t[6] = null);
          })(r[1], r);
          const s = i[19];
          null !== s && s.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -65);
        }
        return r;
      }
      function Eh(e, t) {
        if (!(128 & t[2])) {
          const n = t[11];
          n.destroyNode && fi(e, t, n, 3, null, null),
            (function b4(e) {
              let t = e[13];
              if (!t) return iu(e[1], e);
              for (; t; ) {
                let n = null;
                if ($t(t)) n = t[13];
                else {
                  const r = t[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[4] && t !== e; )
                    $t(t) && iu(t[1], t), (t = t[3]);
                  null === t && (t = e), $t(t) && iu(t[1], t), (n = t && t[4]);
                }
                t = n;
              }
            })(t);
        }
      }
      function iu(e, t) {
        if (!(128 & t[2])) {
          (t[2] &= -65),
            (t[2] |= 128),
            (function M4(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ti)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          l = i[s + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(o);
                      } finally {
                      }
                  }
                }
            })(e, t),
            (function I4(e, t) {
              const n = e.cleanup,
                r = t[7];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[7] = null;
              }
            })(e, t),
            1 === t[1].type && t[11].destroy();
          const n = t[17];
          if (null !== n && an(t[3])) {
            n !== t[3] && bh(n, t);
            const r = t[19];
            null !== r && r.detachView(e);
          }
          !(function u4(e) {
            Ql.delete(e[20]);
          })(t);
        }
      }
      function Sh(e, t, n) {
        return (function Ih(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[0];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === _n.None || i === _n.Emulated) return null;
            }
            return Ht(r, n);
          }
        })(e, t.parent, n);
      }
      function Sr(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Mh(e, t, n) {
        e.appendChild(t, n);
      }
      function Th(e, t, n, r, o) {
        null !== r ? Sr(e, t, n, r, o) : Mh(e, t, n);
      }
      function $s(e, t) {
        return e.parentNode(t);
      }
      function xh(e, t, n) {
        return Rh(e, t, n);
      }
      let du,
        Rh = function Ah(e, t, n) {
          return 40 & e.type ? Ht(e, n) : null;
        };
      function Hs(e, t, n, r) {
        const o = Sh(e, r, t),
          i = t[11],
          a = xh(r.parent || t[6], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) Th(i, o, n[l], a, !1);
          else Th(i, o, n, a, !1);
      }
      function Vs(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Ht(t, e);
          if (4 & n) return au(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Vs(e, r);
            {
              const o = e[t.index];
              return an(o) ? au(-1, o) : rt(o);
            }
          }
          if (32 & n) return Xl(t, e)() || rt(e[t.index]);
          {
            const r = Nh(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Vs(di(e[16]), r)
              : Vs(e, t.next);
          }
        }
        return null;
      }
      function Nh(e, t) {
        return null !== t ? e[16][6].projection[t.projection] : null;
      }
      function au(e, t) {
        const n = 10 + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[1].firstChild;
          if (null !== o) return Vs(r, o);
        }
        return t[7];
      }
      function uu(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === t && (a && dt(rt(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & l) uu(e, t, n.child, r, o, i, !1), so(t, e, o, a, i);
            else if (32 & l) {
              const u = Xl(n, r);
              let c;
              for (; (c = u()); ) so(t, e, o, c, i);
              so(t, e, o, a, i);
            } else 16 & l ? kh(e, t, r, n, o, i) : so(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function fi(e, t, n, r, o, i) {
        uu(n, r, e.firstChild, t, o, i, !1);
      }
      function kh(e, t, n, r, o, i) {
        const s = n[16],
          l = s[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) so(t, e, o, l[u], i);
        else uu(e, t, l, s[3], o, i, !0);
      }
      function Oh(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Fh(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && Ol(e, t, r),
          null !== o && Oh(e, t, o),
          null !== i &&
            (function N4(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      class Vh {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${ef})`;
        }
      }
      const W4 =
        /^(?:(?:https?|mailto|data|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
      var Ge = (() => (
        ((Ge = Ge || {})[(Ge.NONE = 0)] = "NONE"),
        (Ge[(Ge.HTML = 1)] = "HTML"),
        (Ge[(Ge.STYLE = 2)] = "STYLE"),
        (Ge[(Ge.SCRIPT = 3)] = "SCRIPT"),
        (Ge[(Ge.URL = 4)] = "URL"),
        (Ge[(Ge.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        Ge
      ))();
      function Mr(e) {
        const t = (function gi() {
          const e = D();
          return e && e[12];
        })();
        return t
          ? t.sanitize(Ge.URL, e) || ""
          : (function hi(e, t) {
              const n = (function U4(e) {
                return (e instanceof Vh && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(`Required a safe ${t}, got a ${n} (see ${ef})`);
              }
              return n === t;
            })(e, "URL")
          ? (function ir(e) {
              return e instanceof Vh
                ? e.changingThisBreaksApplicationSecurity
                : e;
            })(e)
          : (function hu(e) {
              return (e = String(e)).match(W4) ? e : "unsafe:" + e;
            })(Q(e));
      }
      const Gs = new G("ENVIRONMENT_INITIALIZER"),
        Yh = new G("INJECTOR", -1),
        Kh = new G("INJECTOR_DEF_TYPES");
      class Jh {
        get(t, n = zo) {
          if (n === zo) {
            const r = new Error(`NullInjectorError: No provider for ${Te(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function s6(...e) {
        return { ɵproviders: Xh(0, e), ɵfromNgModule: !0 };
      }
      function Xh(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          Er(t, (i) => {
            const s = i;
            yu(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && e1(o, n),
          n
        );
      }
      function e1(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          vu(o, (i) => {
            t.push(i);
          });
        }
      }
      function yu(e, t, n, r) {
        if (!(e = $(e))) return !1;
        let o = null,
          i = nf(e);
        const s = !i && _e(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const l = e.ngModule;
          if (((i = nf(l)), !i)) return !1;
          o = l;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) yu(u, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let u;
              r.add(o);
              try {
                Er(i.imports, (c) => {
                  yu(c, t, n, r) && (u || (u = []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && e1(u, t);
            }
            if (!a) {
              const u = Cr(o) || (() => new o());
              t.push(
                { provide: o, useFactory: u, deps: ve },
                { provide: Kh, useValue: o, multi: !0 },
                { provide: Gs, useValue: () => O(o), multi: !0 }
              );
            }
            const l = i.providers;
            null == l ||
              a ||
              vu(l, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function vu(e, t) {
        for (let n of e)
          pl(n) && (n = n.ɵproviders), Array.isArray(n) ? vu(n, t) : t(n);
      }
      const a6 = Ie({ provide: String, useValue: Ie });
      function Du(e) {
        return null !== e && "object" == typeof e && a6 in e;
      }
      function Tr(e) {
        return "function" == typeof e;
      }
      const Cu = new G("Set Injector scope."),
        qs = {},
        u6 = {};
      let wu;
      function Ws() {
        return void 0 === wu && (wu = new Jh()), wu;
      }
      class zn {}
      class r1 extends zn {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            bu(t, (s) => this.processProvider(s)),
            this.records.set(Yh, ao(void 0, this)),
            o.has("environment") && this.records.set(zn, ao(void 0, this));
          const i = this.records.get(Cu);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Kh.multi, ve, H.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = zr(this),
            r = Wt(void 0);
          try {
            return t();
          } finally {
            zr(n), Wt(r);
          }
        }
        get(t, n = zo, r = H.Default) {
          this.assertNotDestroyed(), (r = ys(r));
          const o = zr(this),
            i = Wt(void 0);
          try {
            if (!(r & H.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const l =
                  (function p6(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof G)
                    );
                  })(t) && ps(t);
                (a = l && this.injectableDefInScope(l) ? ao(_u(t), qs) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & H.Self ? Ws() : this.parent).get(
              t,
              (n = r & H.Optional && n === zo ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[ms] = s[ms] || []).unshift(Te(t)), o)) throw s;
              return (function z3(e, t, n, r) {
                const o = e[ms];
                throw (
                  (t[af] && o.unshift(t[af]),
                  (e.message = (function G3(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = Te(t);
                    if (Array.isArray(t)) o = t.map(Te).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : Te(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      H3,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[ms] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Wt(i), zr(o);
          }
        }
        resolveInjectorInitializers() {
          const t = zr(this),
            n = Wt(void 0);
          try {
            const r = this.get(Gs.multi, ve, H.Self);
            for (const o of r) o();
          } finally {
            zr(t), Wt(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(Te(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new S(205, !1);
        }
        processProvider(t) {
          let n = Tr((t = $(t))) ? t : $(t && t.provide);
          const r = (function d6(e) {
            return Du(e)
              ? ao(void 0, e.useValue)
              : ao(
                  (function o1(e, t, n) {
                    let r;
                    if (Tr(e)) {
                      const o = $(e);
                      return Cr(o) || _u(o);
                    }
                    if (Du(e)) r = () => $(e.useValue);
                    else if (
                      (function n1(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...vl(e.deps || []));
                    else if (
                      (function t1(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => O($(e.useExisting));
                    else {
                      const o = $(e && (e.useClass || e.provide));
                      if (
                        !(function f6(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Cr(o) || _u(o);
                      r = () => new o(...vl(e.deps));
                    }
                    return r;
                  })(e),
                  qs
                );
          })(t);
          if (Tr(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = ao(void 0, qs, !0)),
              (o.factory = () => vl(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === qs && ((n.value = u6), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function h6(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = $(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function _u(e) {
        const t = ps(e),
          n = null !== t ? t.factory : Cr(e);
        if (null !== n) return n;
        if (e instanceof G) throw new S(204, !1);
        if (e instanceof Function)
          return (function c6(e) {
            const t = e.length;
            if (t > 0) throw (ii(t, "?"), new S(204, !1));
            const n = (function O3(e) {
              const t = e && (e[gs] || e[rf]);
              if (t) {
                const n = (function F3(e) {
                  if (e.hasOwnProperty("name")) return e.name;
                  const t = ("" + e).match(/^function\s*([^\s(]+)/);
                  return null === t ? "" : t[1];
                })(e);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  t
                );
              }
              return null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new S(204, !1);
      }
      function ao(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function bu(e, t) {
        for (const n of e)
          Array.isArray(n) ? bu(n, t) : n && pl(n) ? bu(n.ɵproviders, t) : t(n);
      }
      class g6 {}
      class i1 {}
      class y6 {
        resolveComponentFactory(t) {
          throw (function m6(e) {
            const t = Error(
              `No component factory found for ${Te(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let mi = (() => {
        class e {}
        return (e.NULL = new y6()), e;
      })();
      function v6() {
        return lo(ot(), D());
      }
      function lo(e, t) {
        return new sr(Ht(e, t));
      }
      let sr = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = v6), e;
      })();
      class a1 {}
      let Zs = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function C6() {
                const e = D(),
                  n = Vt(ot().index, e);
                return ($t(n) ? n : e)[11];
              })()),
            e
          );
        })(),
        w6 = (() => {
          class e {}
          return (
            (e.ɵprov = z({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            e
          );
        })();
      class Qs {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const _6 = new Qs("15.1.1"),
        Eu = {};
      function Iu(e) {
        return e.ngOriginalError;
      }
      class uo {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Iu(t);
          for (; n && Iu(n); ) n = Iu(n);
          return n || null;
        }
      }
      function Gn(e) {
        return e instanceof Function ? e() : e;
      }
      function u1(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const c1 = "ng-template";
      function N6(e, t, n) {
        let r = 0;
        for (; r < e.length; ) {
          let o = e[r++];
          if (n && "class" === o) {
            if (((o = e[r]), -1 !== u1(o.toLowerCase(), t, 0))) return !0;
          } else if (1 === o) {
            for (; r < e.length && "string" == typeof (o = e[r++]); )
              if (o.toLowerCase() === t) return !0;
            return !1;
          }
        }
        return !1;
      }
      function d1(e) {
        return 4 === e.type && e.value !== c1;
      }
      function k6(e, t, n) {
        return t === (4 !== e.type || n ? e.value : c1);
      }
      function O6(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function j6(e) {
            for (let t = 0; t < e.length; t++) if (jf(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const l = t[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !k6(e, l, n)) || ("" === l && 1 === t.length))
                ) {
                  if (un(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!N6(e.attrs, u, n)) {
                    if (un(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = F6(8 & r ? "class" : l, o, d1(e), n);
                if (-1 === d) {
                  if (un(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== u1(h, u, 0)) || (2 & r && u !== f)) {
                    if (un(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !un(r) && !un(l)) return !1;
            if (s && un(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return un(r) || s;
      }
      function un(e) {
        return 0 == (1 & e);
      }
      function F6(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function $6(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function f1(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (O6(e, t[r], n)) return !0;
        return !1;
      }
      function H6(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const r = t[n];
          if (e.length === r.length) {
            for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function h1(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function V6(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !un(s) && ((t += h1(i, o)), (o = "")),
              (r = s),
              (i = i || !un(r));
          n++;
        }
        return "" !== o && (t += h1(i, o)), t;
      }
      const K = {};
      function A(e) {
        p1(he(), D(), bt() + e, !1);
      }
      function p1(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[2])) {
            const i = e.preOrderCheckHooks;
            null !== i && Ms(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && Ts(t, i, 0, n);
          }
        _r(n);
      }
      function v1(e, t = null, n = null, r) {
        const o = D1(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function D1(e, t = null, n = null, r, o = new Set()) {
        const i = [n || ve, s6(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : Te(e))),
          new r1(i, t || Ws(), r || null, o)
        );
      }
      let In = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return v1({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return v1({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = zo),
          (e.NULL = new Jh()),
          (e.ɵprov = z({ token: e, providedIn: "any", factory: () => O(Yh) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function P(e, t = H.Default) {
        const n = D();
        return null === n ? O(e, t) : Wf(ot(), n, $(e), t);
      }
      function M1(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Al(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Ks(e, t, n, r, o, i, s, a, l, u, c) {
        const d = t.blueprint.slice();
        return (
          (d[0] = o),
          (d[2] = 76 | r),
          (null !== c || (e && 1024 & e[2])) && (d[2] |= 1024),
          Ef(d),
          (d[3] = d[15] = e),
          (d[8] = n),
          (d[10] = s || (e && e[10])),
          (d[11] = a || (e && e[11])),
          (d[12] = l || (e && e[12]) || null),
          (d[9] = u || (e && e[9]) || null),
          (d[6] = i),
          (d[20] = (function a4() {
            return s4++;
          })()),
          (d[21] = c),
          (d[16] = 2 == t.type ? e[16] : d),
          d
        );
      }
      function ho(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function Ru(e, t, n, r, o) {
            const i = Mf(),
              s = Il(),
              l = (e.data[t] = (function h8(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== i &&
                (s
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && (i.next = l)),
              l
            );
          })(e, t, n, r, o)),
            (function h5() {
              return Y.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function ei() {
            const e = Y.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return En(i, !0), i;
      }
      function yi(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Pu(e, t, n) {
        Rl(t);
        try {
          const r = e.viewQuery;
          null !== r && Bu(1, r, n);
          const o = e.template;
          null !== o && T1(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && M1(e, t),
            e.staticViewQueries && Bu(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function c8(e, t) {
              for (let n = 0; n < t.length; n++) P8(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[2] &= -5), Pl();
        }
      }
      function Js(e, t, n, r) {
        const o = t[2];
        if (128 != (128 & o)) {
          Rl(t);
          try {
            Ef(t),
              (function xf(e) {
                return (Y.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && T1(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const u = e.preOrderCheckHooks;
              null !== u && Ms(t, u, null);
            } else {
              const u = e.preOrderHooks;
              null !== u && Ts(t, u, 0, null), Nl(t, 0);
            }
            if (
              ((function A8(e) {
                for (let t = eu(e); null !== t; t = tu(t)) {
                  if (!t[2]) continue;
                  const n = t[9];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[2] || Sl(o[3], 1), (o[2] |= 512);
                  }
                }
              })(t),
              (function x8(e) {
                for (let t = eu(e); null !== t; t = tu(t))
                  for (let n = 10; n < t.length; n++) {
                    const r = t[n],
                      o = r[1];
                    Ss(r) && Js(o, r, o.template, r[8]);
                  }
              })(t),
              null !== e.contentQueries && M1(e, t),
              s)
            ) {
              const u = e.contentCheckHooks;
              null !== u && Ms(t, u);
            } else {
              const u = e.contentHooks;
              null !== u && Ts(t, u, 1), Nl(t, 1);
            }
            !(function l8(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) _r(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      p5(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  _r(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function u8(e, t) {
                for (let n = 0; n < t.length; n++) R8(e, t[n]);
              })(t, a);
            const l = e.viewQuery;
            if ((null !== l && Bu(2, l, r), s)) {
              const u = e.viewCheckHooks;
              null !== u && Ms(t, u);
            } else {
              const u = e.viewHooks;
              null !== u && Ts(t, u, 2), Nl(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[2] &= -41),
              512 & t[2] && ((t[2] &= -513), Sl(t[3], -1));
          } finally {
            Pl();
          }
        }
      }
      function T1(e, t, n, r, o) {
        const i = bt(),
          s = 2 & r;
        try {
          _r(-1), s && t.length > 22 && p1(e, t, 22, !1), n(r, o);
        } finally {
          _r(i);
        }
      }
      function Nu(e, t, n) {
        if (bl(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function ku(e, t, n) {
        If() &&
          ((function D8(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            Ko(n) &&
              (function I8(e, t, n) {
                const r = Ht(t, e),
                  o = x1(n),
                  i = e[10],
                  s = Xs(
                    e,
                    Ks(
                      e,
                      o,
                      null,
                      n.onPush ? 32 : 16,
                      r,
                      t,
                      i,
                      i.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || Ps(n, t),
              dt(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const l = e.data[a],
                u = br(t, e, a, n);
              dt(u, t),
                null !== s && M8(0, a - o, u, l, 0, s),
                ln(l) && (Vt(n.index, t)[8] = br(t, e, a, n));
            }
          })(e, t, n, Ht(n, t)),
          64 == (64 & n.flags) && O1(e, t, n));
      }
      function Ou(e, t, n = Ht) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function x1(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Fu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function Fu(e, t, n, r, o, i, s, a, l, u) {
        const c = 22 + r,
          d = c + o,
          f = (function d8(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : K);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[1] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function R1(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? P1(n, t, o, i)
              : r.hasOwnProperty(o) && P1(n, t, r[o], i);
          }
        return n;
      }
      function P1(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function N1(e, t) {
        const n = Vt(t, e);
        16 & n[2] || (n[2] |= 32);
      }
      function Lu(e, t, n, r) {
        let o = !1;
        if (If()) {
          const i = null === r ? null : { "": -1 },
            s = (function w8(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (f1(t, s.selectors, !1))
                    if ((r || (r = []), ln(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          ju(e, t, a.length);
                      } else r.unshift(s), ju(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let a, l;
          null === s ? (a = l = null) : ([a, l] = s),
            null !== a && ((o = !0), k1(e, t, n, a, i, l)),
            i &&
              (function _8(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new S(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, i);
        }
        return (n.mergedAttrs = ni(n.mergedAttrs, n.attrs)), o;
      }
      function k1(e, t, n, r, o, i) {
        for (let u = 0; u < r.length; u++) $l(Ps(n, t), e, r[u].type);
        !(function E8(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          l = yi(e, t, r.length, null);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          (n.mergedAttrs = ni(n.mergedAttrs, c.hostAttrs)),
            S8(e, n, t, l, c),
            b8(l, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks || (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            l++;
        }
        !(function p8(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let l = null,
            u = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              g = f ? f.outputs : null;
            (l = R1(d.inputs, c, l, f ? f.inputs : null)),
              (u = R1(d.outputs, c, u, g));
            const y = null === l || null === s || d1(t) ? null : T8(l, c, s);
            a.push(y);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (t.flags |= 8),
            l.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = l),
            (t.outputs = u);
        })(e, n, i);
      }
      function O1(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function g5() {
            return Y.lFrame.currentDirectiveIndex;
          })();
        try {
          _r(i);
          for (let a = r; a < o; a++) {
            const l = e.data[a],
              u = t[a];
            Tl(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                C8(l, u);
          }
        } finally {
          _r(-1), Tl(s);
        }
      }
      function C8(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function ju(e, t, n) {
        (t.componentOffset = n),
          (e.components || (e.components = [])).push(t.index);
      }
      function b8(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          ln(t) && (n[""] = e);
        }
      }
      function S8(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = Cr(o.type)),
          s = new ti(i, ln(o), P);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function y8(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function v8(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, yi(e, n, o.hostVars, K), o);
      }
      function M8(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let l = 0; l < s.length; ) {
            const u = s[l++],
              c = s[l++],
              d = s[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function T8(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function F1(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function R8(e, t) {
        const n = Vt(t, e);
        if (Ss(n)) {
          const r = n[1];
          48 & n[2] ? Js(r, n, r.template, n[8]) : n[5] > 0 && Hu(n);
        }
      }
      function Hu(e) {
        for (let r = eu(e); null !== r; r = tu(r))
          for (let o = 10; o < r.length; o++) {
            const i = r[o];
            if (Ss(i))
              if (512 & i[2]) {
                const s = i[1];
                Js(s, i, s.template, i[8]);
              } else i[5] > 0 && Hu(i);
          }
        const n = e[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Vt(n[r], e);
            Ss(o) && o[5] > 0 && Hu(o);
          }
      }
      function P8(e, t) {
        const n = Vt(t, e),
          r = n[1];
        (function N8(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          Pu(r, n, n[8]);
      }
      function Xs(e, t) {
        return e[13] ? (e[14][4] = t) : (e[13] = t), (e[14] = t), t;
      }
      function Vu(e) {
        for (; e; ) {
          e[2] |= 32;
          const t = di(e);
          if (Q3(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function ea(e, t, n, r = !0) {
        const o = t[10];
        o.begin && o.begin();
        try {
          Js(e, t, e.template, n);
        } catch (s) {
          throw (r && H1(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function Bu(e, t, n) {
        Al(0), t(e, n);
      }
      function L1(e) {
        return e[7] || (e[7] = []);
      }
      function j1(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function H1(e, t) {
        const n = e[9],
          r = n ? n.get(uo, null) : null;
        r && r.handleError(t);
      }
      function Uu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            l = t[s],
            u = e.data[s];
          null !== u.setInput ? u.setInput(l, o, r, a) : (l[a] = o);
        }
      }
      function qn(e, t, n) {
        const r = (function Es(e, t) {
          return rt(t[e]);
        })(t, e);
        !(function _h(e, t, n) {
          e.setValue(t, n);
        })(e[11], r, n);
      }
      function ta(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = dl(o, a))
              : 2 == i && (r = dl(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function na(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(rt(i)), an(i)))
            for (let a = 10; a < i.length; a++) {
              const l = i[a],
                u = l[1].firstChild;
              null !== u && na(l[1], l, u, r);
            }
          const s = n.type;
          if (8 & s) na(e, t, n.child, r);
          else if (32 & s) {
            const a = Xl(n, t);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = Nh(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = di(t[16]);
              na(l[1], l, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class vi {
        get rootNodes() {
          const t = this._lView,
            n = t[1];
          return na(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[8];
        }
        set context(t) {
          this._lView[8] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (an(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (ou(t, r), Os(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Eh(this._lView[1], this._lView);
        }
        onDestroy(t) {
          !(function A1(e, t, n, r) {
            const o = L1(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && j1(e).push(r, o.length - 1));
          })(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          Vu(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -65;
        }
        reattach() {
          this._lView[2] |= 64;
        }
        detectChanges() {
          ea(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new S(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function _4(e, t) {
              fi(e, t, t[11], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new S(902, !1);
          this._appRef = t;
        }
      }
      class k8 extends vi {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          ea(t[1], t, t[8], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class V1 extends mi {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = _e(t);
          return new Di(n, this.ngModule);
        }
      }
      function B1(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class F8 {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = ys(r);
          const o = this.injector.get(t, Eu, r);
          return o !== Eu || n === Eu ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Di extends i1 {
        get inputs() {
          return B1(this.componentDef.inputs);
        }
        get outputs() {
          return B1(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function B6(e) {
              return e.map(V6).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof zn ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new F8(t, i) : t,
            a = s.get(a1, null);
          if (null === a) throw new S(407, !1);
          const l = s.get(w6, null),
            u = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function f8(e, t, n) {
                  return e.selectRootElement(t, n === _n.ShadowDom);
                })(u, r, this.componentDef.encapsulation)
              : ru(
                  u,
                  c,
                  (function O8(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = Fu(0, null, null, 1, 0, null, null, null, null, null),
            g = Ks(null, h, null, f, null, null, a, u, l, s, null);
          let y, C;
          Rl(g);
          try {
            const w = this.componentDef;
            let M,
              v = null;
            w.findHostDirectiveDefs
              ? ((M = []),
                (v = new Map()),
                w.findHostDirectiveDefs(w, M, v),
                M.push(w))
              : (M = [w]);
            const U = (function j8(e, t) {
                const n = e[1];
                return (e[22] = t), ho(n, 22, 2, "#host", null);
              })(g, d),
              Me = (function $8(e, t, n, r, o, i, s, a) {
                const l = o[1];
                !(function H8(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = ni(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (ta(t, t.mergedAttrs, !0), null !== n && Fh(r, n, t));
                })(r, e, t, s);
                const u = i.createRenderer(t, n),
                  c = Ks(
                    o,
                    x1(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    u,
                    a || null,
                    null,
                    null
                  );
                return (
                  l.firstCreatePass && ju(l, e, r.length - 1),
                  Xs(o, c),
                  (o[e.index] = c)
                );
              })(U, d, w, M, g, a, u);
            (C = bf(h, 22)),
              d &&
                (function B8(e, t, n, r) {
                  if (r) Ol(e, n, ["ng-version", _6.full]);
                  else {
                    const { attrs: o, classes: i } = (function U6(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!un(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Ol(e, n, o),
                      i && i.length > 0 && Oh(e, n, i.join(" "));
                  }
                })(u, w, d, r),
              void 0 !== n &&
                (function U8(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(C, this.ngContentSelectors, n),
              (y = (function V8(e, t, n, r, o, i) {
                const s = ot(),
                  a = o[1],
                  l = Ht(s, o);
                k1(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  dt(br(o, a, s.directiveStart + c, s), o);
                O1(a, o, s), l && dt(l, o);
                const u = br(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[8] = o[8] = u), null !== i)) for (const c of i) c(u, t);
                return Nu(a, s, e), u;
              })(Me, w, M, v, g, [z8])),
              Pu(h, g, null);
          } finally {
            Pl();
          }
          return new L8(this.componentType, y, lo(C, g), g, C);
        }
      }
      class L8 extends g6 {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new k8(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            Uu(i[1], i, o, t, n), N1(i, this._tNode.index);
          }
        }
        get injector() {
          return new Xr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function z8() {
        const e = ot();
        Is(D()[1], e);
      }
      let ra = null;
      function xr() {
        if (!ra) {
          const e = xe.Symbol;
          if (e && e.iterator) ra = e.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < t.length; ++n) {
              const r = t[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (ra = r);
            }
          }
        }
        return ra;
      }
      function oa(e) {
        return (
          !!Gu(e) && (Array.isArray(e) || (!(e instanceof Map) && xr() in e))
        );
      }
      function Gu(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Tn(e, t, n) {
        return (e[t] = n);
      }
      function ft(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function N(e, t, n, r, o, i, s, a) {
        const l = D(),
          u = he(),
          c = e + 22,
          d = u.firstCreatePass
            ? (function oy(e, t, n, r, o, i, s, a, l) {
                const u = t.consts,
                  c = ho(t, e, 4, s || null, or(u, a));
                Lu(t, n, c, or(u, l)), Is(t, c);
                const d = (c.tViews = Fu(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  u
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, t, n, r, o, i, s)
            : u.data[c];
        En(d, !1);
        const f = l[11].createComment("");
        Hs(u, l, f, d),
          dt(f, l),
          Xs(l, (l[c] = F1(f, l, f, d))),
          bs(d) && ku(u, l, d),
          null != s && Ou(l, d, a);
      }
      function _(e, t, n) {
        const r = D();
        return (
          ft(r, Kr(), t) &&
            (function Ut(e, t, n, r, o, i, s, a) {
              const l = Ht(t, n);
              let c,
                u = t.inputs;
              !a && null != u && (c = u[r])
                ? (Uu(e, n, c, r, o), Ko(t) && N1(n, t.index))
                : 3 & t.type &&
                  ((r = (function g8(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(l, r, o));
            })(
              he(),
              (function Oe() {
                const e = Y.lFrame;
                return bf(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[11],
              n,
              !1
            ),
          _
        );
      }
      function Wu(e, t, n, r, o) {
        const s = o ? "class" : "style";
        Uu(e, n, t.inputs[s], s, r);
      }
      function p(e, t, n, r) {
        const o = D(),
          i = he(),
          s = 22 + e,
          a = o[11],
          l = (o[s] = ru(
            a,
            t,
            (function w5() {
              return Y.lFrame.currentNamespace;
            })()
          )),
          u = i.firstCreatePass
            ? (function ay(e, t, n, r, o, i, s) {
                const a = t.consts,
                  u = ho(t, e, 2, o, or(a, i));
                return (
                  Lu(t, n, u, or(a, s)),
                  null !== u.attrs && ta(u, u.attrs, !1),
                  null !== u.mergedAttrs && ta(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, 0, t, n, r)
            : i.data[s];
        return (
          En(u, !0),
          Fh(a, l, u),
          32 != (32 & u.flags) && Hs(i, o, l, u),
          0 ===
            (function a5() {
              return Y.lFrame.elementDepthCount;
            })() && dt(l, o),
          (function l5() {
            Y.lFrame.elementDepthCount++;
          })(),
          bs(u) && (ku(i, o, u), Nu(i, u, o)),
          null !== r && Ou(o, u),
          p
        );
      }
      function m() {
        let e = ot();
        Il() ? Ml() : ((e = e.parent), En(e, !1));
        const t = e;
        !(function u5() {
          Y.lFrame.elementDepthCount--;
        })();
        const n = he();
        return (
          n.firstCreatePass && (Is(n, e), bl(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function S5(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Wu(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function I5(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Wu(n, t, D(), t.stylesWithoutHost, !1),
          m
        );
      }
      function b(e, t, n, r) {
        return p(e, t, n, r), m(), b;
      }
      function wi() {
        return D();
      }
      function sa(e) {
        return !!e && "function" == typeof e.then;
      }
      function op(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      const ip = op;
      function Rt(e, t, n, r) {
        const o = D(),
          i = he(),
          s = ot();
        return (
          (function ap(e, t, n, r, o, i, s) {
            const a = bs(r),
              u = e.firstCreatePass && j1(e),
              c = t[8],
              d = L1(t);
            let f = !0;
            if (3 & r.type || s) {
              const y = Ht(r, t),
                C = s ? s(y) : y,
                w = d.length,
                M = s ? (U) => s(rt(U[r.index])) : r.index;
              let v = null;
              if (
                (!s &&
                  a &&
                  (v = (function uy(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[7],
                            l = o[i + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== v)
              )
                ((v.__ngLastListenerFn__ || v).__ngNextListenerFn__ = i),
                  (v.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = up(r, t, c, i, !1);
                const U = n.listen(C, o, i);
                d.push(i, U), u && u.push(o, M, w, w + 1);
              }
            } else i = up(r, t, c, i, !1);
            const h = r.outputs;
            let g;
            if (f && null !== h && (g = h[o])) {
              const y = g.length;
              if (y)
                for (let C = 0; C < y; C += 2) {
                  const Me = t[g[C]][g[C + 1]].subscribe(i),
                    Ve = d.length;
                  d.push(i, Me), u && u.push(o, r.index, Ve, -(Ve + 1));
                }
            }
          })(i, o, o[11], s, e, t, r),
          Rt
        );
      }
      function lp(e, t, n, r) {
        try {
          return !1 !== n(r);
        } catch (o) {
          return H1(e, o), !1;
        }
      }
      function up(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Vu(e.componentOffset > -1 ? Vt(e.index, t) : t);
          let l = lp(t, 0, r, s),
            u = i.__ngNextListenerFn__;
          for (; u; ) (l = lp(t, 0, u, s) && l), (u = u.__ngNextListenerFn__);
          return o && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l;
        };
      }
      function Et(e = 1) {
        return (function y5(e) {
          return (Y.lFrame.contextLView = (function v5(e, t) {
            for (; e > 0; ) (t = t[15]), e--;
            return t;
          })(e, Y.lFrame.contextLView))[8];
        })(e);
      }
      function cy(e, t) {
        let n = null;
        const r = (function L6(e) {
          const t = e.attrs;
          if (null != t) {
            const n = t.indexOf(5);
            if (!(1 & n)) return t[n + 1];
          }
          return null;
        })(e);
        for (let o = 0; o < t.length; o++) {
          const i = t[o];
          if ("*" !== i) {
            if (null === r ? f1(e, i, !0) : H6(r, i)) return o;
          } else n = o;
        }
        return n;
      }
      function E(e, t = "") {
        const n = D(),
          r = he(),
          o = e + 22,
          i = r.firstCreatePass ? ho(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function nu(e, t) {
            return e.createText(t);
          })(n[11], t));
        Hs(r, n, s, i), En(i, !1);
      }
      function Eo(e) {
        return bi("", e, ""), Eo;
      }
      function bi(e, t, n) {
        const r = D(),
          o = (function go(e, t, n, r) {
            return ft(e, Kr(), n) ? t + Q(n) + r : K;
          })(r, e, t, n);
        return o !== K && qn(r, bt(), o), bi;
      }
      const Io = "en-US";
      let r0 = Io;
      class Mo {}
      class A0 {}
      class R0 extends Mo {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new V1(this));
          const r = jt(t);
          (this._bootstrapComponents = Gn(r.bootstrap)),
            (this._r3Injector = D1(
              t,
              n,
              [
                { provide: Mo, useValue: this },
                { provide: mi, useValue: this.componentFactoryResolver },
              ],
              Te(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class ac extends A0 {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new R0(this.moduleType, t);
        }
      }
      class Jv extends Mo {
        constructor(t, n, r) {
          super(),
            (this.componentFactoryResolver = new V1(this)),
            (this.instance = null);
          const o = new r1(
            [
              ...t,
              { provide: Mo, useValue: this },
              { provide: mi, useValue: this.componentFactoryResolver },
            ],
            n || Ws(),
            r,
            new Set(["environment"])
          );
          (this.injector = o), o.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function ha(e, t, n = null) {
        return new Jv(e, t, n).injector;
      }
      let Xv = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n.id)) {
              const r = Xh(0, n.type),
                o =
                  r.length > 0
                    ? ha([r], this._injector, `Standalone[${n.type.name}]`)
                    : null;
              this.cachedInjectors.set(n.id, o);
            }
            return this.cachedInjectors.get(n.id);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values())
                null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          (e.ɵprov = z({
            token: e,
            providedIn: "environment",
            factory: () => new e(O(zn)),
          })),
          e
        );
      })();
      function P0(e) {
        e.getStandaloneInjector = (t) =>
          t.get(Xv).getOrCreateStandaloneInjector(e);
      }
      function xi(e, t, n, r, o) {
        return (function V0(e, t, n, r, o, i, s) {
          const a = t + n;
          return (function Ar(e, t, n, r) {
            const o = ft(e, t, n);
            return ft(e, t + 1, r) || o;
          })(e, a, o, i)
            ? Tn(e, a + 2, s ? r.call(s, o, i) : r(o, i))
            : Ai(e, a + 2);
        })(D(), _t(), e, t, n, r, o);
      }
      function Ai(e, t) {
        const n = e[t];
        return n === K ? void 0 : n;
      }
      function H0(e, t, n, r, o, i) {
        const s = t + n;
        return ft(e, s, o)
          ? Tn(e, s + 1, i ? r.call(i, o) : r(o))
          : Ai(e, s + 1);
      }
      function oe(e, t) {
        const n = he();
        let r;
        const o = e + 22;
        n.firstCreatePass
          ? ((r = (function m7(e, t) {
              if (t)
                for (let n = t.length - 1; n >= 0; n--) {
                  const r = t[n];
                  if (e === r.name) return r;
                }
            })(t, n.pipeRegistry)),
            (n.data[o] = r),
            r.onDestroy &&
              (n.destroyHooks || (n.destroyHooks = [])).push(o, r.onDestroy))
          : (r = n.data[o]);
        const i = r.factory || (r.factory = Cr(r.type)),
          s = Wt(P);
        try {
          const a = Rs(!1),
            l = i();
          return (
            Rs(a),
            (function iy(e, t, n, r) {
              n >= e.data.length &&
                ((e.data[n] = null), (e.blueprint[n] = null)),
                (t[n] = r);
            })(n, D(), o, l),
            l
          );
        } finally {
          Wt(s);
        }
      }
      function ie(e, t, n) {
        const r = e + 22,
          o = D(),
          i = (function Yr(e, t) {
            return e[t];
          })(o, r);
        return (function Ri(e, t) {
          return e[1].data[t].pure;
        })(o, r)
          ? H0(o, _t(), t, i.transform, n, i)
          : i.transform(n);
      }
      function uc(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const it = class w7 extends Ue {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const l = t;
            (o = l.next?.bind(l)),
              (i = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((i = uc(i)), o && (o = uc(o)), s && (s = uc(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof De && t.add(a), a;
        }
      };
      let Wn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = S7), e;
      })();
      const b7 = Wn,
        E7 = class extends b7 {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tViews,
              o = Ks(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (o[19] = s.createEmbeddedView(r)),
              Pu(r, o, t),
              new vi(o)
            );
          }
        };
      function S7() {
        return (function pa(e, t) {
          return 4 & e.type ? new E7(t, e, lo(e, t)) : null;
        })(ot(), D());
      }
      let fn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = I7), e;
      })();
      function I7() {
        return (function W0(e, t) {
          let n;
          const r = t[e.index];
          if (an(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = rt(r);
            else {
              const i = t[11];
              o = i.createComment("");
              const s = Ht(e, t);
              Sr(
                i,
                $s(i, s),
                o,
                (function x4(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = F1(r, t, o, e)), Xs(t, n);
          }
          return new G0(n, e, t);
        })(ot(), D());
      }
      const M7 = fn,
        G0 = class extends M7 {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return lo(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Xr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = jl(this._hostTNode, this._hostLView);
            if (Vf(t)) {
              const n = As(t, this._hostLView),
                r = xs(t);
              return new Xr(n[1].data[r + 8], n);
            }
            return new Xr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = q0(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function oi(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const l = s ? t : new Di(_e(t)),
              u = r || this.parentInjector;
            if (!i && null == l.ngModule) {
              const f = (s ? u : this.parentInjector).get(zn, null);
              f && (i = f);
            }
            const c = l.create(u, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[1];
            if (
              (function s5(e) {
                return an(e[3]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new G0(d, d[6], d[3]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function E4(e, t, n, r) {
              const o = 10 + r,
                i = n.length;
              r > 0 && (n[o - 1][4] = t),
                r < i - 10
                  ? ((t[4] = n[o]), eh(n, 10 + r, t))
                  : (n.push(t), (t[4] = null)),
                (t[3] = n);
              const s = t[17];
              null !== s &&
                n !== s &&
                (function S4(e, t) {
                  const n = e[9];
                  t[16] !== t[3][3][16] && (e[2] = !0),
                    null === n ? (e[9] = [t]) : n.push(t);
                })(s, t);
              const a = t[19];
              null !== a && a.insertView(e), (t[2] |= 64);
            })(o, r, s, i);
            const a = au(i, s),
              l = r[11],
              u = $s(l, s[7]);
            return (
              null !== u &&
                (function w4(e, t, n, r, o, i) {
                  (r[0] = o), (r[6] = t), fi(e, r, n, 1, o, i);
                })(o, s[6], l, r, u, a),
              t.attachToViewContainerRef(),
              eh(dc(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = q0(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = ou(this._lContainer, n);
            r && (Os(dc(this._lContainer), n), Eh(r[1], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = ou(this._lContainer, n);
            return r && null != Os(dc(this._lContainer), n) ? new vi(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function q0(e) {
        return e[8];
      }
      function dc(e) {
        return e[8] || (e[8] = []);
      }
      function ma(...e) {}
      const ya = new G("Application Initializer");
      let va = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = ma),
              (this.reject = ma),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (sa(i)) n.push(i);
                else if (ip(i)) {
                  const s = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(ya, 8));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ni = new G("AppId", {
        providedIn: "root",
        factory: function Cg() {
          return `${wc()}${wc()}${wc()}`;
        },
      });
      function wc() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const wg = new G("Platform Initializer"),
        _g = new G("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        bg = new G("appBootstrapListener");
      let t9 = (() => {
        class e {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      const Zn = new G("LocaleId", {
        providedIn: "root",
        factory: () =>
          fe(Zn, H.Optional | H.SkipSelf) ||
          (function n9() {
            return (typeof $localize < "u" && $localize.locale) || Io;
          })(),
      });
      class o9 {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Eg = (() => {
        class e {
          compileModuleSync(n) {
            return new ac(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              i = Gn(jt(n).declarations).reduce((s, a) => {
                const l = _e(a);
                return l && s.push(new Di(l)), s;
              }, []);
            return new o9(r, i);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const a9 = (() => Promise.resolve(0))();
      function _c(e) {
        typeof Zone > "u"
          ? a9.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class qe {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new it(!1)),
            (this.onMicrotaskEmpty = new it(!1)),
            (this.onStable = new it(!1)),
            (this.onError = new it(!1)),
            typeof Zone > "u")
          )
            throw new S(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function l9() {
              let e = xe.requestAnimationFrame,
                t = xe.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function d9(e) {
              const t = () => {
                !(function c9(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(xe, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Ec(e),
                                (e.isCheckStableRunning = !0),
                                bc(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Ec(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return Mg(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Tg(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, l) => {
                  try {
                    return Mg(e), n.invoke(o, i, s, a, l);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Tg(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Ec(e),
                          bc(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!qe.isInAngularZone()) throw new S(909, !1);
        }
        static assertNotInAngularZone() {
          if (qe.isInAngularZone()) throw new S(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, u9, ma, ma);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const u9 = {};
      function bc(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ec(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Mg(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Tg(e) {
        e._nesting--, bc(e);
      }
      class f9 {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new it()),
            (this.onMicrotaskEmpty = new it()),
            (this.onStable = new it()),
            (this.onError = new it());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const xg = new G(""),
        Da = new G("");
      let Mc,
        Sc = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Mc ||
                  ((function h9(e) {
                    Mc = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      qe.assertNotInAngularZone(),
                        _c(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                _c(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(qe), O(Ic), O(Da));
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ic = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Mc?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })(),
        lr = null;
      const Ag = new G("AllowMultipleToken"),
        Tc = new G("PlatformDestroyListeners");
      class Rg {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function Ng(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new G(r);
        return (i = []) => {
          let s = xc();
          if (!s || s.injector.get(Ag, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function m9(e) {
                  if (lr && !lr.get(Ag, !1)) throw new S(400, !1);
                  lr = e;
                  const t = e.get(Og);
                  (function Pg(e) {
                    const t = e.get(wg, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function kg(e = [], t) {
                    return In.create({
                      name: t,
                      providers: [
                        { provide: Cu, useValue: "platform" },
                        { provide: Tc, useValue: new Set([() => (lr = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function v9(e) {
            const t = xc();
            if (!t) throw new S(401, !1);
            return t;
          })();
        };
      }
      function xc() {
        return lr?.get(Og) ?? null;
      }
      let Og = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function Lg(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new f9()
                      : ("zone.js" === e ? void 0 : e) || new qe(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Fg(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: qe, useValue: o }];
            return o.run(() => {
              const s = In.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                l = a.injector.get(uo, null);
              if (!l) throw new S(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const u = o.onError.subscribe({
                    next: (c) => {
                      l.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    wa(this._modules, a), u.unsubscribe();
                  });
                }),
                (function jg(e, t, n) {
                  try {
                    const r = n();
                    return sa(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(l, o, () => {
                  const u = a.injector.get(va);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function o0(e) {
                          qt(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (r0 = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(Zn, Io) || Io),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = $g({}, r);
            return (function p9(e, t, n) {
              const r = new ac(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Ca);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new S(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new S(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Tc, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(In));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function $g(e, t) {
        return Array.isArray(t) ? t.reduce($g, e) : { ...e, ...t };
      }
      let Ca = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new Ne((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new Ne((a) => {
                let l;
                this._zone.runOutsideAngular(() => {
                  l = this._zone.onStable.subscribe(() => {
                    qe.assertNotInAngularZone(),
                      _c(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const u = this._zone.onUnstable.subscribe(() => {
                  qe.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  l.unsubscribe(), u.unsubscribe();
                };
              });
            this.isStable = (function I3(...e) {
              const t = Uo(e),
                n = (function D3(e, t) {
                  return "number" == typeof ll(e) ? e.pop() : t;
                })(e, 1 / 0),
                r = e;
              return r.length
                ? 1 === r.length
                  ? Cn(r[0])
                  : Ur(n)(Qe(r, t))
                : wn;
            })(
              i,
              s.pipe(
                (function M3(e = {}) {
                  const {
                    connector: t = () => new Ue(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      l,
                      u = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = l = void 0), (c = d = !1);
                      },
                      g = () => {
                        const y = s;
                        h(), y?.unsubscribe();
                      };
                    return ae((y, C) => {
                      u++, !d && !c && f();
                      const w = (l = l ?? t());
                      C.add(() => {
                        u--, 0 === u && !d && !c && (a = ul(g, o));
                      }),
                        w.subscribe(C),
                        !s &&
                          u > 0 &&
                          ((s = new k({
                            next: (M) => w.next(M),
                            error: (M) => {
                              (d = !0), f(), (a = ul(h, n, M)), w.error(M);
                            },
                            complete: () => {
                              (c = !0), f(), (a = ul(h, r)), w.complete();
                            },
                          })),
                          Cn(y).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof i1;
            if (!this._injector.get(va).done)
              throw (
                (!o &&
                  (function Gr(e) {
                    const t = _e(e) || lt(e) || Ct(e);
                    return null !== t && t.standalone;
                  })(n),
                new S(405, false))
              );
            let s;
            (s = o ? n : this._injector.get(mi).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function g9(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Mo),
              u = s.create(In.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(xg, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  wa(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new S(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            wa(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(bg, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => wa(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new S(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(qe), O(zn), O(uo));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function wa(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      let Ac = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = C9), e;
      })();
      function C9(e) {
        return (function w9(e, t, n) {
          if (Ko(e) && !n) {
            const r = Vt(e.index, t);
            return new vi(r, r);
          }
          return 47 & e.type ? new vi(t[16], t) : null;
        })(ot(), D(), 16 == (16 & e));
      }
      class zg {
        constructor() {}
        supports(t) {
          return oa(t);
        }
        create(t) {
          return new M9(t);
        }
      }
      const I9 = (e, t) => t;
      class M9 {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || I9);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < qg(r, o, i)) ? n : r,
              a = qg(s, o, i),
              l = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const u = a - o,
                c = l - o;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    g = h + f;
                  c <= g && g < u && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - u;
              }
            }
            a !== l && t(s, a, l);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !oa(t))) throw new S(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function ty(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[xr()]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new T9(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Gg()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Gg()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class T9 {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class x9 {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Gg {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new x9()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function qg(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class Wg {
        constructor() {}
        supports(t) {
          return t instanceof Map || Gu(t);
        }
        create() {
          return new A9();
        }
      }
      class A9 {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Gu(t))) throw new S(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const i = o._prev,
              s = o._next;
            return (
              i && (i._next = s),
              s && (s._prev = i),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new R9(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class R9 {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Zg() {
        return new Ea([new zg()]);
      }
      let Ea = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Zg()),
              deps: [[e, new ai(), new si()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new S(901, !1);
          }
        }
        return (e.ɵprov = z({ token: e, providedIn: "root", factory: Zg })), e;
      })();
      function Qg() {
        return new ki([new Wg()]);
      }
      let ki = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Qg()),
              deps: [[e, new ai(), new si()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (r) return r;
            throw new S(901, !1);
          }
        }
        return (e.ɵprov = z({ token: e, providedIn: "root", factory: Qg })), e;
      })();
      const k9 = Ng(null, "core", []);
      let O9 = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(Ca));
            }),
            (e.ɵmod = vr({ type: e })),
            (e.ɵinj = nr({})),
            e
          );
        })(),
        Fc = null;
      function ur() {
        return Fc;
      }
      class j9 {}
      const Pt = new G("DocumentToken");
      let Lc = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({
            token: e,
            factory: function () {
              return (function $9() {
                return O(Yg);
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      const H9 = new G("Location Initialized");
      let Yg = (() => {
        class e extends Lc {
          constructor(n) {
            super(),
              (this._doc = n),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return ur().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = ur().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = ur().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(n) {
            this._location.pathname = n;
          }
          pushState(n, r, o) {
            Kg() ? this._history.pushState(n, r, o) : (this._location.hash = o);
          }
          replaceState(n, r, o) {
            Kg()
              ? this._history.replaceState(n, r, o)
              : (this._location.hash = o);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(Pt));
          }),
          (e.ɵprov = z({
            token: e,
            factory: function () {
              return (function V9() {
                return new Yg(O(Pt));
              })();
            },
            providedIn: "platform",
          })),
          e
        );
      })();
      function Kg() {
        return !!window.history.pushState;
      }
      function jc(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function Jg(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function Yn(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let kr = (() => {
        class e {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({
            token: e,
            factory: function () {
              return fe(e2);
            },
            providedIn: "root",
          })),
          e
        );
      })();
      const Xg = new G("appBaseHref");
      let e2 = (() => {
          class e extends kr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                (this._baseHref =
                  r ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  fe(Pt).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return jc(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Yn(this._platformLocation.search),
                o = this._platformLocation.hash;
              return o && n ? `${r}${o}` : r;
            }
            pushState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Yn(i));
              this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              const s = this.prepareExternalUrl(o + Yn(i));
              this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(Lc), O(Xg, 8));
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        B9 = (() => {
          class e extends kr {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = jc(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Yn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, s);
            }
            replaceState(n, r, o, i) {
              let s = this.prepareExternalUrl(o + Yn(i));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(n = 0) {
              this._platformLocation.historyGo?.(n);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(Lc), O(Xg, 8));
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        $c = (() => {
          class e {
            constructor(n) {
              (this._subject = new it()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = n);
              const r = this._locationStrategy.getBaseHref();
              (this._basePath = (function G9(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(Jg(t2(r)))),
                this._locationStrategy.onPopState((o) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: o.state,
                    type: o.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(n = !1) {
              return this.normalize(this._locationStrategy.path(n));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Yn(r));
            }
            normalize(n) {
              return e.stripTrailingSlash(
                (function z9(e, t) {
                  return e && new RegExp(`^${e}([/;?#]|$)`).test(t)
                    ? t.substring(e.length)
                    : t;
                })(this._basePath, t2(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._locationStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", o = null) {
              this._locationStrategy.pushState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Yn(r)),
                  o
                );
            }
            replaceState(n, r = "", o = null) {
              this._locationStrategy.replaceState(o, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Yn(r)),
                  o
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(n = 0) {
              this._locationStrategy.historyGo?.(n);
            }
            onUrlChange(n) {
              return (
                this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  })),
                () => {
                  const r = this._urlChangeListeners.indexOf(n);
                  this._urlChangeListeners.splice(r, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((o) => o(n, r));
            }
            subscribe(n, r, o) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: o,
              });
            }
          }
          return (
            (e.normalizeQueryParams = Yn),
            (e.joinWithSlash = jc),
            (e.stripTrailingSlash = Jg),
            (e.ɵfac = function (n) {
              return new (n || e)(O(kr));
            }),
            (e.ɵprov = z({
              token: e,
              factory: function () {
                return (function U9() {
                  return new $c(O(kr));
                })();
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function t2(e) {
        return e.replace(/\/index.html$/, "");
      }
      const Qc = /\s+/,
        c2 = [];
      let ka = (() => {
          class e {
            constructor(n, r, o, i) {
              (this._iterableDiffers = n),
                (this._keyValueDiffers = r),
                (this._ngEl = o),
                (this._renderer = i),
                (this.initialClasses = c2),
                (this.stateMap = new Map());
            }
            set klass(n) {
              this.initialClasses = null != n ? n.trim().split(Qc) : c2;
            }
            set ngClass(n) {
              this.rawClass = "string" == typeof n ? n.trim().split(Qc) : n;
            }
            ngDoCheck() {
              for (const r of this.initialClasses) this._updateState(r, !0);
              const n = this.rawClass;
              if (Array.isArray(n) || n instanceof Set)
                for (const r of n) this._updateState(r, !0);
              else if (null != n)
                for (const r of Object.keys(n))
                  this._updateState(r, Boolean(n[r]));
              this._applyStateDiff();
            }
            _updateState(n, r) {
              const o = this.stateMap.get(n);
              void 0 !== o
                ? (o.enabled !== r && ((o.changed = !0), (o.enabled = r)),
                  (o.touched = !0))
                : this.stateMap.set(n, {
                    enabled: r,
                    changed: !0,
                    touched: !0,
                  });
            }
            _applyStateDiff() {
              for (const n of this.stateMap) {
                const r = n[0],
                  o = n[1];
                o.changed
                  ? (this._toggleClass(r, o.enabled), (o.changed = !1))
                  : o.touched ||
                    (o.enabled && this._toggleClass(r, !1),
                    this.stateMap.delete(r)),
                  (o.touched = !1);
              }
            }
            _toggleClass(n, r) {
              (n = n.trim()).length > 0 &&
                n.split(Qc).forEach((o) => {
                  r
                    ? this._renderer.addClass(this._ngEl.nativeElement, o)
                    : this._renderer.removeClass(this._ngEl.nativeElement, o);
                });
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(P(Ea), P(ki), P(sr), P(Zs));
            }),
            (e.ɵdir = Dt({
              type: e,
              selectors: [["", "ngClass", ""]],
              inputs: { klass: ["class", "klass"], ngClass: "ngClass" },
              standalone: !0,
            })),
            e
          );
        })(),
        Jn = (() => {
          class e {
            constructor(n, r) {
              (this._viewContainer = n),
                (this._context = new ND()),
                (this._thenTemplateRef = null),
                (this._elseTemplateRef = null),
                (this._thenViewRef = null),
                (this._elseViewRef = null),
                (this._thenTemplateRef = r);
            }
            set ngIf(n) {
              (this._context.$implicit = this._context.ngIf = n),
                this._updateView();
            }
            set ngIfThen(n) {
              p2("ngIfThen", n),
                (this._thenTemplateRef = n),
                (this._thenViewRef = null),
                this._updateView();
            }
            set ngIfElse(n) {
              p2("ngIfElse", n),
                (this._elseTemplateRef = n),
                (this._elseViewRef = null),
                this._updateView();
            }
            _updateView() {
              this._context.$implicit
                ? this._thenViewRef ||
                  (this._viewContainer.clear(),
                  (this._elseViewRef = null),
                  this._thenTemplateRef &&
                    (this._thenViewRef = this._viewContainer.createEmbeddedView(
                      this._thenTemplateRef,
                      this._context
                    )))
                : this._elseViewRef ||
                  (this._viewContainer.clear(),
                  (this._thenViewRef = null),
                  this._elseTemplateRef &&
                    (this._elseViewRef = this._viewContainer.createEmbeddedView(
                      this._elseTemplateRef,
                      this._context
                    )));
            }
            static ngTemplateContextGuard(n, r) {
              return !0;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(P(fn), P(Wn));
            }),
            (e.ɵdir = Dt({
              type: e,
              selectors: [["", "ngIf", ""]],
              inputs: {
                ngIf: "ngIf",
                ngIfThen: "ngIfThen",
                ngIfElse: "ngIfElse",
              },
              standalone: !0,
            })),
            e
          );
        })();
      class ND {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function p2(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${Te(t)}'.`
          );
      }
      class FD {
        createSubscription(t, n) {
          return t.subscribe({
            next: n,
            error: (r) => {
              throw r;
            },
          });
        }
        dispose(t) {
          t.unsubscribe();
        }
      }
      class LD {
        createSubscription(t, n) {
          return t.then(n, (r) => {
            throw r;
          });
        }
        dispose(t) {}
      }
      const jD = new LD(),
        $D = new FD();
      let Or = (() => {
          class e {
            constructor(n) {
              (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null),
                (this._strategy = null),
                (this._ref = n);
            }
            ngOnDestroy() {
              this._subscription && this._dispose(), (this._ref = null);
            }
            transform(n) {
              return this._obj
                ? n !== this._obj
                  ? (this._dispose(), this.transform(n))
                  : this._latestValue
                : (n && this._subscribe(n), this._latestValue);
            }
            _subscribe(n) {
              (this._obj = n),
                (this._strategy = this._selectStrategy(n)),
                (this._subscription = this._strategy.createSubscription(
                  n,
                  (r) => this._updateLatestValue(n, r)
                ));
            }
            _selectStrategy(n) {
              if (sa(n)) return jD;
              if (op(n)) return $D;
              throw (function gn(e, t) {
                return new S(2100, !1);
              })();
            }
            _dispose() {
              this._strategy.dispose(this._subscription),
                (this._latestValue = null),
                (this._subscription = null),
                (this._obj = null);
            }
            _updateLatestValue(n, r) {
              n === this._obj &&
                ((this._latestValue = r), this._ref.markForCheck());
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(P(Ac, 16));
            }),
            (e.ɵpipe = Tt({
              name: "async",
              type: e,
              pure: !1,
              standalone: !0,
            })),
            e
          );
        })(),
        rC = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = vr({ type: e })),
            (e.ɵinj = nr({})),
            e
          );
        })();
      let aC = (() => {
        class e {}
        return (
          (e.ɵprov = z({
            token: e,
            providedIn: "root",
            factory: () => new lC(O(Pt), window),
          })),
          e
        );
      })();
      class lC {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function uC(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              (e.body.createShadowRoot || e.body.attachShadow)
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const i = o.shadowRoot;
                if (i) {
                  const s =
                    i.getElementById(t) || i.querySelector(`[name="${t}"]`);
                  if (s) return s;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], o - i[1]);
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const t =
              v2(this.window.history) ||
              v2(Object.getPrototypeOf(this.window.history));
            return !(!t || (!t.writable && !t.set));
          } catch {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      function v2(e) {
        return Object.getOwnPropertyDescriptor(e, "scrollRestoration");
      }
      class LC extends j9 {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class nd extends LC {
        static makeCurrent() {
          !(function L9(e) {
            Fc || (Fc = e);
          })(new nd());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function jC() {
            return (
              (ji = ji || document.querySelector("base")),
              ji ? ji.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function $C(e) {
                (Fa = Fa || document.createElement("a")),
                  Fa.setAttribute("href", e);
                const t = Fa.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          ji = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function TD(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Fa,
        ji = null;
      const E2 = new G("TRANSITION_ID"),
        VC = [
          {
            provide: ya,
            useFactory: function HC(e, t, n) {
              return () => {
                n.get(va).donePromise.then(() => {
                  const r = ur(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [E2, Pt, In],
            multi: !0,
          },
        ];
      let UC = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const La = new G("EventManagerPlugins");
      let ja = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => (o.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(La), O(qe));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class S2 {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = ur().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let I2 = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((o) => {
                this._stylesSet.has(o) || (this._stylesSet.add(o), r.add(o));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        $i = (() => {
          class e extends I2 {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, o) {
              n.forEach((i) => {
                const s = this._doc.createElement("style");
                (s.textContent = i), o.push(r.appendChild(s));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(M2), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, o) => {
                this._addStylesToHost(n, o, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(M2));
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(Pt));
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      function M2(e) {
        ur().remove(e);
      }
      const rd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        od = /%COMP%/g;
      function id(e, t) {
        return t.flat(100).map((n) => n.replace(od, e));
      }
      function A2(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let sd = (() => {
        class e {
          constructor(n, r, o) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new ad(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case _n.Emulated: {
                let o = this.rendererByCompId.get(r.id);
                return (
                  o ||
                    ((o = new QC(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, o)),
                  o.applyToHost(n),
                  o
                );
              }
              case _n.ShadowDom:
                return new YC(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const o = id(r.id, r.styles);
                  this.sharedStylesHost.addStyles(o),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(ja), O($i), O(Ni));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class ad {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(rd[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (P2(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (P2(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = rd[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = rd[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (xt.DashCase | xt.Important)
            ? t.style.setProperty(n, r, o & xt.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & xt.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, A2(r))
            : this.eventManager.addEventListener(t, n, A2(r));
        }
      }
      function P2(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class QC extends ad {
        constructor(t, n, r, o) {
          super(t), (this.component = r);
          const i = id(o + "-" + r.id, r.styles);
          n.addStyles(i),
            (this.contentAttr = (function qC(e) {
              return "_ngcontent-%COMP%".replace(od, e);
            })(o + "-" + r.id)),
            (this.hostAttr = (function WC(e) {
              return "_nghost-%COMP%".replace(od, e);
            })(o + "-" + r.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class YC extends ad {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = id(o.id, o.styles);
          for (let s = 0; s < i.length; s++) {
            const a = document.createElement("style");
            (a.textContent = i[s]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let KC = (() => {
        class e extends S2 {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(Pt));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const N2 = ["alt", "control", "meta", "shift"],
        JC = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        XC = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let ew = (() => {
        class e extends S2 {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => ur().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              N2.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const l = {};
            return (l.domEventName = o), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let o = JC[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                N2.forEach((s) => {
                  s !== o && (0, XC[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(Pt));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const ow = Ng(k9, "browser", [
          { provide: _g, useValue: "browser" },
          {
            provide: wg,
            useValue: function tw() {
              nd.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Pt,
            useFactory: function rw() {
              return (
                (function L4(e) {
                  du = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        F2 = new G(""),
        L2 = [
          {
            provide: Da,
            useClass: class BC {
              addToWindow(t) {
                (xe.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (xe.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (xe.getAllAngularRootElements = () => t.getAllRootElements()),
                  xe.frameworkStabilizers || (xe.frameworkStabilizers = []),
                  xe.frameworkStabilizers.push((r) => {
                    const o = xe.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), i--, 0 == i && r(s);
                    };
                    o.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? ur().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: xg, useClass: Sc, deps: [qe, Ic, Da] },
          { provide: Sc, useClass: Sc, deps: [qe, Ic, Da] },
        ],
        j2 = [
          { provide: Cu, useValue: "root" },
          {
            provide: uo,
            useFactory: function nw() {
              return new uo();
            },
            deps: [],
          },
          { provide: La, useClass: KC, multi: !0, deps: [Pt, qe, _g] },
          { provide: La, useClass: ew, multi: !0, deps: [Pt] },
          { provide: sd, useClass: sd, deps: [ja, $i, Ni] },
          { provide: a1, useExisting: sd },
          { provide: I2, useExisting: $i },
          { provide: $i, useClass: $i, deps: [Pt] },
          { provide: ja, useClass: ja, deps: [La, qe] },
          { provide: class cC {}, useClass: UC, deps: [] },
          [],
        ];
      let iw = (() => {
          class e {
            constructor(n) {}
            static withServerTransition(n) {
              return {
                ngModule: e,
                providers: [
                  { provide: Ni, useValue: n.appId },
                  { provide: E2, useExisting: Ni },
                  VC,
                ],
              };
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(F2, 12));
            }),
            (e.ɵmod = vr({ type: e })),
            (e.ɵinj = nr({ providers: [...j2, ...L2], imports: [rC, O9] })),
            e
          );
        })(),
        $2 = (() => {
          class e {
            constructor(n) {
              this._doc = n;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(n) {
              this._doc.title = n || "";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O(Pt));
            }),
            (e.ɵprov = z({
              token: e,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function aw() {
                        return new $2(O(Pt));
                      })()),
                  r
                );
              },
              providedIn: "root",
            })),
            e
          );
        })();
      function L(...e) {
        return Qe(e, Uo(e));
      }
      typeof window < "u" && window;
      class en extends Ue {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const $a = j(
          (e) =>
            function () {
              e(this),
                (this.name = "EmptyError"),
                (this.message = "no elements in sequence");
            }
        ),
        { isArray: gw } = Array,
        { getPrototypeOf: mw, prototype: yw, keys: vw } = Object;
      const { isArray: ww } = Array;
      function B2(...e) {
        const t = Uo(e),
          n = (function v3(e) {
            return R(ll(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function Dw(e) {
            if (1 === e.length) {
              const t = e[0];
              if (gw(t)) return { args: t, keys: null };
              if (
                (function Cw(e) {
                  return e && "object" == typeof e && mw(e) === yw;
                })(t)
              ) {
                const n = vw(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return Qe([], t);
        const i = new Ne(
          (function Sw(e, t, n = at) {
            return (r) => {
              U2(
                t,
                () => {
                  const { length: o } = e,
                    i = new Array(o);
                  let s = o,
                    a = o;
                  for (let l = 0; l < o; l++)
                    U2(
                      t,
                      () => {
                        const u = Qe(e[l], t);
                        let c = !1;
                        u.subscribe(
                          me(
                            r,
                            (d) => {
                              (i[l] = d),
                                c || ((c = !0), a--),
                                a || r.next(n(i.slice()));
                            },
                            () => {
                              --s || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (s) =>
                  (function Ew(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, s)
              : at
          )
        );
        return n
          ? i.pipe(
              (function bw(e) {
                return Z((t) =>
                  (function _w(e, t) {
                    return ww(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : i;
      }
      function U2(e, t, n) {
        e ? Ln(n, e, t) : t();
      }
      function cd(...e) {
        return (function Iw() {
          return Ur(1);
        })()(Qe(e, Uo(e)));
      }
      function z2(e) {
        return new Ne((t) => {
          Cn(e()).subscribe(t);
        });
      }
      function Hi(e, t) {
        const n = R(e) ? e : () => e,
          r = (o) => o.error(n());
        return new Ne(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function dd() {
        return ae((e, t) => {
          let n = null;
          e._refCount++;
          const r = me(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              i = n;
            (n = null),
              o && (!i || o === i) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class G2 extends Ne {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            ze(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new De();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                me(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = De.EMPTY));
          }
          return t;
        }
        refCount() {
          return dd()(this);
        }
      }
      function Rn(e, t) {
        return ae((n, r) => {
          let o = null,
            i = 0,
            s = !1;
          const a = () => s && !o && r.complete();
          n.subscribe(
            me(
              r,
              (l) => {
                o?.unsubscribe();
                let u = 0;
                const c = i++;
                Cn(e(l, c)).subscribe(
                  (o = me(
                    r,
                    (d) => r.next(t ? t(l, d, c, u++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (s = !0), a();
              }
            )
          );
        });
      }
      function Vi(e) {
        return e <= 0
          ? () => wn
          : ae((t, n) => {
              let r = 0;
              t.subscribe(
                me(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function dr(e, t) {
        return ae((n, r) => {
          let o = 0;
          n.subscribe(me(r, (i) => e.call(t, i, o++) && r.next(i)));
        });
      }
      function Ha(e) {
        return ae((t, n) => {
          let r = !1;
          t.subscribe(
            me(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function q2(e = Tw) {
        return ae((t, n) => {
          let r = !1;
          t.subscribe(
            me(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function Tw() {
        return new $a();
      }
      function fr(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? dr((o, i) => e(o, i, r)) : at,
            Vi(1),
            n ? Ha(t) : q2(() => new $a())
          );
      }
      function Fr(e, t) {
        return R(t) ? nt(e, t, 1) : nt(e, 1);
      }
      function ht(e, t, n) {
        const r = R(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? ae((o, i) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              o.subscribe(
                me(
                  i,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      i.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      i.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      i.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : at;
      }
      function hr(e) {
        return ae((t, n) => {
          let i,
            r = null,
            o = !1;
          (r = t.subscribe(
            me(n, void 0, void 0, (s) => {
              (i = Cn(e(s, hr(e)(t)))),
                r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), i.subscribe(n));
        });
      }
      function xw(e, t, n, r, o) {
        return (i, s) => {
          let a = n,
            l = t,
            u = 0;
          i.subscribe(
            me(
              s,
              (c) => {
                const d = u++;
                (l = a ? e(l, c, d) : ((a = !0), c)), r && s.next(l);
              },
              o &&
                (() => {
                  a && s.next(l), s.complete();
                })
            )
          );
        };
      }
      function W2(e, t) {
        return ae(xw(e, t, arguments.length >= 2, !0));
      }
      function fd(e) {
        return e <= 0
          ? () => wn
          : ae((t, n) => {
              let r = [];
              t.subscribe(
                me(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function Z2(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? dr((o, i) => e(o, i, r)) : at,
            fd(1),
            n ? Ha(t) : q2(() => new $a())
          );
      }
      function hd(e) {
        return ae((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const se = "primary",
        Bi = Symbol("RouteTitle");
      class Pw {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Ao(e) {
        return new Pw(e);
      }
      function Nw(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let i = 0; i < r.length; i++) {
          const s = r[i],
            a = e[i];
          if (s.startsWith(":")) o[s.substring(1)] = a;
          else if (s !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Pn(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let i = 0; i < n.length; i++)
          if (((o = n[i]), !Q2(e[o], t[o]))) return !1;
        return !0;
      }
      function Q2(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, i) => r[i] === o);
        }
        return e === t;
      }
      function Y2(e) {
        return Array.prototype.concat.apply([], e);
      }
      function K2(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function st(e, t) {
        for (const n in e) e.hasOwnProperty(n) && t(e[n], n);
      }
      function pr(e) {
        return ip(e) ? e : sa(e) ? Qe(Promise.resolve(e)) : L(e);
      }
      const Va = !1,
        Ow = {
          exact: function em(e, t, n) {
            if (
              !jr(e.segments, t.segments) ||
              !Ba(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !em(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: tm,
        },
        J2 = {
          exact: function Fw(e, t) {
            return Pn(e, t);
          },
          subset: function Lw(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Q2(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function X2(e, t, n) {
        return (
          Ow[n.paths](e.root, t.root, n.matrixParams) &&
          J2[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function tm(e, t, n) {
        return nm(e, t, t.segments, n);
      }
      function nm(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!jr(o, n) || t.hasChildren() || !Ba(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!jr(e.segments, n) || !Ba(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !tm(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            i = n.slice(e.segments.length);
          return (
            !!(jr(e.segments, o) && Ba(e.segments, o, r) && e.children[se]) &&
            nm(e.children[se], t, i, r)
          );
        }
      }
      function Ba(e, t, n) {
        return t.every((r, o) => J2[n](e[o].parameters, r.parameters));
      }
      class Lr {
        constructor(t = new le([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ao(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Hw.serialize(this);
        }
      }
      class le {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            st(n, (r, o) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Ua(this);
        }
      }
      class Ui {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Ao(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return im(this);
        }
      }
      function jr(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let zi = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({
            token: e,
            factory: function () {
              return new pd();
            },
            providedIn: "root",
          })),
          e
        );
      })();
      class pd {
        parse(t) {
          const n = new Qw(t);
          return new Lr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${Gi(t.root, !0)}`,
            r = (function Uw(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${za(n)}=${za(o)}`).join("&")
                    : `${za(n)}=${za(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function Vw(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const Hw = new pd();
      function Ua(e) {
        return e.segments.map((t) => im(t)).join("/");
      }
      function Gi(e, t) {
        if (!e.hasChildren()) return Ua(e);
        if (t) {
          const n = e.children[se] ? Gi(e.children[se], !1) : "",
            r = [];
          return (
            st(e.children, (o, i) => {
              i !== se && r.push(`${i}:${Gi(o, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function $w(e, t) {
            let n = [];
            return (
              st(e.children, (r, o) => {
                o === se && (n = n.concat(t(r, o)));
              }),
              st(e.children, (r, o) => {
                o !== se && (n = n.concat(t(r, o)));
              }),
              n
            );
          })(e, (r, o) =>
            o === se ? [Gi(e.children[se], !1)] : [`${o}:${Gi(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[se]
            ? `${Ua(e)}/${n[0]}`
            : `${Ua(e)}/(${n.join("//")})`;
        }
      }
      function rm(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function za(e) {
        return rm(e).replace(/%3B/gi, ";");
      }
      function gd(e) {
        return rm(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Ga(e) {
        return decodeURIComponent(e);
      }
      function om(e) {
        return Ga(e.replace(/\+/g, "%20"));
      }
      function im(e) {
        return `${gd(e.path)}${(function Bw(e) {
          return Object.keys(e)
            .map((t) => `;${gd(t)}=${gd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const zw = /^[^\/()?;=#]+/;
      function qa(e) {
        const t = e.match(zw);
        return t ? t[0] : "";
      }
      const Gw = /^[^=?&#]+/,
        Ww = /^[^&#]+/;
      class Qw {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new le([], {})
              : new le([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) &&
              (r[se] = new le(t, n)),
            r
          );
        }
        parseSegment() {
          const t = qa(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new S(4009, Va);
          return this.capture(t), new Ui(Ga(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = qa(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = qa(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[Ga(n)] = Ga(r);
        }
        parseQueryParam(t) {
          const n = (function qw(e) {
            const t = e.match(Gw);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = (function Zw(e) {
              const t = e.match(Ww);
              return t ? t[0] : "";
            })(this.remaining);
            s && ((r = s), this.capture(r));
          }
          const o = om(n),
            i = om(r);
          if (t.hasOwnProperty(o)) {
            let s = t[o];
            Array.isArray(s) || ((s = [s]), (t[o] = s)), s.push(i);
          } else t[o] = i;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = qa(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new S(4010, Va);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.slice(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : t && (i = se);
            const s = this.parseChildren();
            (n[i] = 1 === Object.keys(s).length ? s[se] : new le([], s)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new S(4011, Va);
        }
      }
      function md(e) {
        return e.segments.length > 0 ? new le([], { [se]: e }) : e;
      }
      function Wa(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const i = Wa(e.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (t[r] = i);
        }
        return (function Yw(e) {
          if (1 === e.numberOfChildren && e.children[se]) {
            const t = e.children[se];
            return new le(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new le(e.segments, t));
      }
      function $r(e) {
        return e instanceof Lr;
      }
      function Xw(e, t, n, r, o) {
        if (0 === n.length) return Ro(t.root, t.root, t.root, r, o);
        const i = (function lm(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new am(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, i, s) => {
            if ("object" == typeof i && null != i) {
              if (i.outlets) {
                const a = {};
                return (
                  st(i.outlets, (l, u) => {
                    a[u] = "string" == typeof l ? l.split("/") : l;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (i.segmentPath) return [...o, i.segmentPath];
            }
            return "string" != typeof i
              ? [...o, i]
              : 0 === s
              ? (i.split("/").forEach((a, l) => {
                  (0 == l && "." === a) ||
                    (0 == l && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, i];
          }, []);
          return new am(n, t, r);
        })(n);
        return i.toRoot()
          ? Ro(t.root, t.root, new le([], {}), r, o)
          : (function s(l) {
              const u = (function t_(e, t, n, r) {
                  if (e.isAbsolute) return new Po(t.root, !0, 0);
                  if (-1 === r) return new Po(n, n === t.root, 0);
                  return (function um(e, t, n) {
                    let r = e,
                      o = t,
                      i = n;
                    for (; i > o; ) {
                      if (((i -= o), (r = r.parent), !r)) throw new S(4005, !1);
                      o = r.segments.length;
                    }
                    return new Po(r, !1, o - i);
                  })(n, r + (qi(e.commands[0]) ? 0 : 1), e.numberOfDoubleDots);
                })(i, t, e.snapshot?._urlSegment, l),
                c = u.processChildren
                  ? Zi(u.segmentGroup, u.index, i.commands)
                  : vd(u.segmentGroup, u.index, i.commands);
              return Ro(t.root, u.segmentGroup, c, r, o);
            })(e.snapshot?._lastPathIndex);
      }
      function qi(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function Wi(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function Ro(e, t, n, r, o) {
        let s,
          i = {};
        r &&
          st(r, (l, u) => {
            i[u] = Array.isArray(l) ? l.map((c) => `${c}`) : `${l}`;
          }),
          (s = e === t ? n : sm(e, t, n));
        const a = md(Wa(s));
        return new Lr(a, i, o);
      }
      function sm(e, t, n) {
        const r = {};
        return (
          st(e.children, (o, i) => {
            r[i] = o === t ? n : sm(o, t, n);
          }),
          new le(e.segments, r)
        );
      }
      class am {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && qi(r[0]))
          )
            throw new S(4003, !1);
          const o = r.find(Wi);
          if (o && o !== K2(r)) throw new S(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class Po {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function vd(e, t, n) {
        if (
          (e || (e = new le([], {})),
          0 === e.segments.length && e.hasChildren())
        )
          return Zi(e, t, n);
        const r = (function r_(e, t, n) {
            let r = 0,
              o = t;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return i;
              const s = e.segments[o],
                a = n[r];
              if (Wi(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!dm(l, u, s)) return i;
                r += 2;
              } else {
                if (!dm(l, {}, s)) return i;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const i = new le(e.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[se] = new le(
              e.segments.slice(r.pathIndex),
              e.children
            )),
            Zi(i, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new le(e.segments, {})
          : r.match && !e.hasChildren()
          ? Dd(e, t, n)
          : r.match
          ? Zi(e, 0, o)
          : Dd(e, t, n);
      }
      function Zi(e, t, n) {
        if (0 === n.length) return new le(e.segments, {});
        {
          const r = (function n_(e) {
              return Wi(e[0]) ? e[0].outlets : { [se]: e };
            })(n),
            o = {};
          return (
            st(r, (i, s) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = vd(e.children[s], t, i));
            }),
            st(e.children, (i, s) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new le(e.segments, o)
          );
        }
      }
      function Dd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (Wi(i)) {
            const l = o_(i.outlets);
            return new le(r, l);
          }
          if (0 === o && qi(n[0])) {
            r.push(new Ui(e.segments[t].path, cm(n[0]))), o++;
            continue;
          }
          const s = Wi(i) ? i.outlets[se] : `${i}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          s && a && qi(a)
            ? (r.push(new Ui(s, cm(a))), (o += 2))
            : (r.push(new Ui(s, {})), o++);
        }
        return new le(r, {});
      }
      function o_(e) {
        const t = {};
        return (
          st(e, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (t[r] = Dd(new le([], {}), 0, n));
          }),
          t
        );
      }
      function cm(e) {
        const t = {};
        return st(e, (n, r) => (t[r] = `${n}`)), t;
      }
      function dm(e, t, n) {
        return e == n.path && Pn(t, n.parameters);
      }
      const Qi = "imperative";
      class Nn {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Cd extends Nn {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Hr extends Nn {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Za extends Nn {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class fm extends Nn {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class hm extends Nn {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class i_ extends Nn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class s_ extends Nn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class a_ extends Nn {
        constructor(t, n, r, o, i) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = i),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class l_ extends Nn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class u_ extends Nn {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class c_ {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class d_ {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class f_ {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class h_ {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class p_ {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class g_ {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class pm {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let y_ = (() => {
          class e {
            createUrlTree(n, r, o, i, s, a) {
              return Xw(n || r.root, o, i, s, a);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        v_ = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({
              token: e,
              factory: function (t) {
                return y_.ɵfac(t);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class gm {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = wd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = wd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = _d(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return _d(t, this._root).map((n) => n.value);
        }
      }
      function wd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = wd(e, n);
          if (r) return r;
        }
        return null;
      }
      function _d(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = _d(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class Xn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function No(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class mm extends gm {
        constructor(t, n) {
          super(t), (this.snapshot = n), bd(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function ym(e, t) {
        const n = (function D_(e, t) {
            const s = new Qa([], {}, {}, "", {}, se, t, null, e.root, -1, {});
            return new Dm("", new Xn(s, []));
          })(e, t),
          r = new en([new Ui("", {})]),
          o = new en({}),
          i = new en({}),
          s = new en({}),
          a = new en(""),
          l = new ko(r, o, s, a, i, se, t, n.root);
        return (l.snapshot = n.root), new mm(new Xn(l, []), n);
      }
      class ko {
        constructor(t, n, r, o, i, s, a, l) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.title = this.data?.pipe(Z((u) => u[Bi])) ?? L(void 0)),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(Z((t) => Ao(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(Z((t) => Ao(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function vm(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              i = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function C_(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Qa {
        get title() {
          return this.data?.[Bi];
        }
        constructor(t, n, r, o, i, s, a, l, u, c, d) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = i),
            (this.outlet = s),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = Ao(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ao(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Dm extends gm {
        constructor(t, n) {
          super(n), (this.url = t), bd(this, n);
        }
        toString() {
          return Cm(this._root);
        }
      }
      function bd(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => bd(e, n));
      }
      function Cm(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Cm).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Ed(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Pn(t.queryParams, n.queryParams) ||
              e.queryParams.next(n.queryParams),
            t.fragment !== n.fragment && e.fragment.next(n.fragment),
            Pn(t.params, n.params) || e.params.next(n.params),
            (function kw(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Pn(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.url.next(n.url),
            Pn(t.data, n.data) || e.data.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot), e.data.next(e._futureSnapshot.data);
      }
      function Sd(e, t) {
        const n =
          Pn(e.params, t.params) &&
          (function jw(e, t) {
            return (
              jr(e, t) && e.every((n, r) => Pn(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Sd(e.parent, t.parent))
        );
      }
      function Yi(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function __(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Yi(e, r, o);
              return Yi(e, r);
            });
          })(e, t, n);
          return new Xn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const i = e.retrieve(t.value);
            if (null !== i) {
              const s = i.route;
              return (
                (s.value._futureSnapshot = t.value),
                (s.children = t.children.map((a) => Yi(e, a))),
                s
              );
            }
          }
          const r = (function b_(e) {
              return new ko(
                new en(e.url),
                new en(e.params),
                new en(e.queryParams),
                new en(e.fragment),
                new en(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((i) => Yi(e, i));
          return new Xn(r, o);
        }
      }
      const Id = "ngNavigationCancelingError";
      function wm(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = $r(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = _m(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function _m(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[Id] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function bm(e) {
        return Em(e) && $r(e.url);
      }
      function Em(e) {
        return e && e[Id];
      }
      class E_ {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.injector = null),
            (this.children = new Ki()),
            (this.attachRef = null);
        }
      }
      let Ki = (() => {
        class e {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(n, r) {
            const o = this.getOrCreateContext(n);
            (o.outlet = r), this.contexts.set(n, o);
          }
          onChildOutletDestroyed(n) {
            const r = this.getContext(n);
            r && ((r.outlet = null), (r.attachRef = null));
          }
          onOutletDeactivated() {
            const n = this.contexts;
            return (this.contexts = new Map()), n;
          }
          onOutletReAttached(n) {
            this.contexts = n;
          }
          getOrCreateContext(n) {
            let r = this.getContext(n);
            return r || ((r = new E_()), this.contexts.set(n, r)), r;
          }
          getContext(n) {
            return this.contexts.get(n) || null;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Ya = !1;
      let Sm = (() => {
        class e {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = se),
              (this.activateEvents = new it()),
              (this.deactivateEvents = new it()),
              (this.attachEvents = new it()),
              (this.detachEvents = new it()),
              (this.parentContexts = fe(Ki)),
              (this.location = fe(fn)),
              (this.changeDetector = fe(Ac)),
              (this.environmentInjector = fe(zn));
          }
          ngOnChanges(n) {
            if (n.name) {
              const { firstChange: r, previousValue: o } = n.name;
              if (r) return;
              this.isTrackedInParentContexts(o) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(o)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name);
          }
          isTrackedInParentContexts(n) {
            return this.parentContexts.getContext(n)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const n = this.parentContexts.getContext(this.name);
            n?.route &&
              (n.attachRef
                ? this.attach(n.attachRef, n.route)
                : this.activateWith(n.route, n.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new S(4012, Ya);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new S(4012, Ya);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new S(4012, Ya);
            this.location.detach();
            const n = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(n.instance),
              n
            );
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView),
              this.attachEvents.emit(n.instance);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated) throw new S(4013, Ya);
            this._activatedRoute = n;
            const o = this.location,
              s = n.snapshot.component,
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new S_(n, a, o.injector);
            if (
              r &&
              (function I_(e) {
                return !!e.resolveComponentFactory;
              })(r)
            ) {
              const u = r.resolveComponentFactory(s);
              this.activated = o.createComponent(u, o.length, l);
            } else
              this.activated = o.createComponent(s, {
                index: o.length,
                injector: l,
                environmentInjector: r ?? this.environmentInjector,
              });
            this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵdir = Dt({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [wr],
          })),
          e
        );
      })();
      class S_ {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === ko
            ? this.route
            : t === Ki
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      let Md = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = Zt({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [P0],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && b(0, "router-outlet");
            },
            dependencies: [Sm],
            encapsulation: 2,
          })),
          e
        );
      })();
      function Im(e, t) {
        return (
          e.providers &&
            !e._injector &&
            (e._injector = ha(e.providers, t, `Route: ${e.path}`)),
          e._injector ?? t
        );
      }
      function xd(e) {
        const t = e.children && e.children.map(xd),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== se &&
            (n.component = Md),
          n
        );
      }
      function tn(e) {
        return e.outlet || se;
      }
      function Mm(e, t) {
        const n = e.filter((r) => tn(r) === t);
        return n.push(...e.filter((r) => tn(r) !== t)), n;
      }
      function Ji(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class R_ {
        constructor(t, n, r, o) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Ed(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = No(n);
          t.children.forEach((i) => {
            const s = i.value.outlet;
            this.deactivateRoutes(i, o[s], r), delete o[s];
          }),
            st(o, (i, s) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if (o === i)
            if (o.component) {
              const s = r.getContext(o.outlet);
              s && this.deactivateChildRoutes(t, n, s.children);
            } else this.deactivateChildRoutes(t, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = No(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: s,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            i = No(t);
          for (const s of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[s], o);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = No(n);
          t.children.forEach((i) => {
            this.activateRoutes(i, o[i.value.outlet], r),
              this.forwardEvent(new g_(i.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new h_(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            i = n ? n.value : null;
          if ((Ed(o), o === i))
            if (o.component) {
              const s = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, s.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const s = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                s.children.onOutletReAttached(a.contexts),
                (s.attachRef = a.componentRef),
                (s.route = a.route.value),
                s.outlet && s.outlet.attach(a.componentRef, a.route.value),
                Ed(a.route.value),
                this.activateChildRoutes(t, null, s.children);
            } else {
              const a = Ji(o.snapshot),
                l = a?.get(mi) ?? null;
              (s.attachRef = null),
                (s.route = o),
                (s.resolver = l),
                (s.injector = a),
                s.outlet && s.outlet.activateWith(o, s.injector),
                this.activateChildRoutes(t, null, s.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class Tm {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Ka {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function P_(e, t, n) {
        const r = e._root;
        return Xi(r, t ? t._root : null, n, [r.value]);
      }
      function Oo(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function k3(e) {
              return null !== ps(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Xi(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = No(t);
        return (
          e.children.forEach((s) => {
            (function k_(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = e.value,
                s = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (s && i.routeConfig === s.routeConfig) {
                const l = (function O_(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !jr(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !jr(e.url, t.url) || !Pn(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Sd(e, t) || !Pn(e.queryParams, t.queryParams);
                    default:
                      return !Sd(e, t);
                  }
                })(s, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? o.canActivateChecks.push(new Tm(r))
                  : ((i.data = s.data), (i._resolvedData = s._resolvedData)),
                  Xi(e, t, i.component ? (a ? a.children : null) : n, r, o),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new Ka(a.outlet.component, s));
              } else
                s && es(t, a, o),
                  o.canActivateChecks.push(new Tm(r)),
                  Xi(e, null, i.component ? (a ? a.children : null) : n, r, o);
            })(s, i[s.value.outlet], n, r.concat([s.value]), o),
              delete i[s.value.outlet];
          }),
          st(i, (s, a) => es(s, n.getContext(a), o)),
          o
        );
      }
      function es(e, t, n) {
        const r = No(e),
          o = e.value;
        st(r, (i, s) => {
          es(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new Ka(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function ts(e) {
        return "function" == typeof e;
      }
      function Ad(e) {
        return e instanceof $a || "EmptyError" === e?.name;
      }
      const Ja = Symbol("INITIAL_VALUE");
      function Fo() {
        return Rn((e) =>
          B2(
            e.map((t) =>
              t.pipe(
                Vi(1),
                (function Mw(...e) {
                  const t = Uo(e);
                  return ae((n, r) => {
                    (t ? cd(e, n, t) : cd(e, n)).subscribe(r);
                  });
                })(Ja)
              )
            )
          ).pipe(
            Z((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === Ja) return Ja;
                  if (!1 === n || n instanceof Lr) return n;
                }
              return !0;
            }),
            dr((t) => t !== Ja),
            Vi(1)
          )
        );
      }
      function xm(e) {
        return (function On(...e) {
          return vn(e);
        })(
          ht((t) => {
            if ($r(t)) throw wm(0, t);
          }),
          Z((t) => !0 === t)
        );
      }
      const Rd = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function Am(e, t, n, r, o) {
        const i = Pd(e, t, n);
        return i.matched
          ? (function J_(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? L(
                    o.map((s) => {
                      const a = Oo(s, e);
                      return pr(
                        (function V_(e) {
                          return e && ts(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(Fo(), xm())
                : L(!0);
            })((r = Im(t, r)), t, n).pipe(Z((s) => (!0 === s ? i : { ...Rd })))
          : L(i);
      }
      function Pd(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...Rd }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || Nw)(n, e, t);
        if (!o) return { ...Rd };
        const i = {};
        st(o.posParams, (a, l) => {
          i[l] = a.path;
        });
        const s =
          o.consumed.length > 0
            ? { ...i, ...o.consumed[o.consumed.length - 1].parameters }
            : i;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: s,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function Xa(e, t, n, r) {
        if (
          n.length > 0 &&
          (function tb(e, t, n) {
            return n.some((r) => el(e, t, r) && tn(r) !== se);
          })(e, n, r)
        ) {
          const i = new le(
            t,
            (function eb(e, t, n, r) {
              const o = {};
              (o[se] = r),
                (r._sourceSegment = e),
                (r._segmentIndexShift = t.length);
              for (const i of n)
                if ("" === i.path && tn(i) !== se) {
                  const s = new le([], {});
                  (s._sourceSegment = e),
                    (s._segmentIndexShift = t.length),
                    (o[tn(i)] = s);
                }
              return o;
            })(e, t, r, new le(n, e.children))
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function nb(e, t, n) {
            return n.some((r) => el(e, t, r));
          })(e, n, r)
        ) {
          const i = new le(
            e.segments,
            (function X_(e, t, n, r, o) {
              const i = {};
              for (const s of r)
                if (el(e, n, s) && !o[tn(s)]) {
                  const a = new le([], {});
                  (a._sourceSegment = e),
                    (a._segmentIndexShift = t.length),
                    (i[tn(s)] = a);
                }
              return { ...o, ...i };
            })(e, t, n, r, e.children)
          );
          return (
            (i._sourceSegment = e),
            (i._segmentIndexShift = t.length),
            { segmentGroup: i, slicedSegments: n }
          );
        }
        const o = new le(e.segments, e.children);
        return (
          (o._sourceSegment = e),
          (o._segmentIndexShift = t.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function el(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function Rm(e, t, n, r) {
        return (
          !!(tn(e) === r || (r !== se && el(t, n, e))) &&
          ("**" === e.path || Pd(t, e, n).matched)
        );
      }
      function Pm(e, t, n) {
        return 0 === t.length && !e.children[n];
      }
      const tl = !1;
      class nl {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class Nm {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function ns(e) {
        return Hi(new nl(e));
      }
      function km(e) {
        return Hi(new Nm(e));
      }
      class sb {
        constructor(t, n, r, o, i) {
          (this.injector = t),
            (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = o),
            (this.config = i),
            (this.allowRedirects = !0);
        }
        apply() {
          const t = Xa(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new le(t.segments, t.children);
          return this.expandSegmentGroup(this.injector, this.config, n, se)
            .pipe(
              Z((i) =>
                this.createUrlTree(
                  Wa(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              hr((i) => {
                if (i instanceof Nm)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof nl ? this.noMatchError(i) : i;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(this.injector, this.config, t.root, se)
            .pipe(
              Z((o) => this.createUrlTree(Wa(o), t.queryParams, t.fragment))
            )
            .pipe(
              hr((o) => {
                throw o instanceof nl ? this.noMatchError(o) : o;
              })
            );
        }
        noMatchError(t) {
          return new S(4002, tl);
        }
        createUrlTree(t, n, r) {
          const o = md(t);
          return new Lr(o, n, r);
        }
        expandSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(t, n, r).pipe(Z((i) => new le([], i)))
            : this.expandSegment(t, r, n, r.segments, o, !0);
        }
        expandChildren(t, n, r) {
          const o = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? o.unshift(i) : o.push(i);
          return Qe(o).pipe(
            Fr((i) => {
              const s = r.children[i],
                a = Mm(n, i);
              return this.expandSegmentGroup(t, a, s, i).pipe(
                Z((l) => ({ segment: l, outlet: i }))
              );
            }),
            W2((i, s) => ((i[s.outlet] = s.segment), i), {}),
            Z2()
          );
        }
        expandSegment(t, n, r, o, i, s) {
          return Qe(r).pipe(
            Fr((a) =>
              this.expandSegmentAgainstRoute(t, n, r, a, o, i, s).pipe(
                hr((u) => {
                  if (u instanceof nl) return L(null);
                  throw u;
                })
              )
            ),
            fr((a) => !!a),
            hr((a, l) => {
              if (Ad(a)) return Pm(n, o, i) ? L(new le([], {})) : ns(n);
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(t, n, r, o, i, s, a) {
          return Rm(o, n, i, s)
            ? void 0 === o.redirectTo
              ? this.matchSegmentAgainstRoute(t, n, o, i, s)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s)
              : ns(n)
            : ns(n);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, s)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                i,
                s
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? km(i)
            : this.lineralizeSegments(r, i).pipe(
                nt((s) => {
                  const a = new le(s, {});
                  return this.expandSegment(t, a, n, s, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, i, s) {
          const {
            matched: a,
            consumedSegments: l,
            remainingSegments: u,
            positionalParamSegments: c,
          } = Pd(n, o, i);
          if (!a) return ns(n);
          const d = this.applyRedirectCommands(l, o.redirectTo, c);
          return o.redirectTo.startsWith("/")
            ? km(d)
            : this.lineralizeSegments(o, d).pipe(
                nt((f) => this.expandSegment(t, n, r, f.concat(u), s, !1))
              );
        }
        matchSegmentAgainstRoute(t, n, r, o, i) {
          return "**" === r.path
            ? ((t = Im(r, t)),
              r.loadChildren
                ? (r._loadedRoutes
                    ? L({
                        routes: r._loadedRoutes,
                        injector: r._loadedInjector,
                      })
                    : this.configLoader.loadChildren(t, r)
                  ).pipe(
                    Z(
                      (a) => (
                        (r._loadedRoutes = a.routes),
                        (r._loadedInjector = a.injector),
                        new le(o, {})
                      )
                    )
                  )
                : L(new le(o, {})))
            : Am(n, r, o, t).pipe(
                Rn(
                  ({ matched: s, consumedSegments: a, remainingSegments: l }) =>
                    s
                      ? this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                          nt((c) => {
                            const d = c.injector ?? t,
                              f = c.routes,
                              { segmentGroup: h, slicedSegments: g } = Xa(
                                n,
                                a,
                                l,
                                f
                              ),
                              y = new le(h.segments, h.children);
                            if (0 === g.length && y.hasChildren())
                              return this.expandChildren(d, f, y).pipe(
                                Z((v) => new le(a, v))
                              );
                            if (0 === f.length && 0 === g.length)
                              return L(new le(a, {}));
                            const C = tn(r) === i;
                            return this.expandSegment(
                              d,
                              y,
                              f,
                              g,
                              C ? se : i,
                              !0
                            ).pipe(
                              Z((M) => new le(a.concat(M.segments), M.children))
                            );
                          })
                        )
                      : ns(n)
                )
              );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? L({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? L({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function K_(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? L(!0)
                    : L(
                        o.map((s) => {
                          const a = Oo(s, e);
                          return pr(
                            (function L_(e) {
                              return e && ts(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(Fo(), xm());
                })(t, n, r).pipe(
                  nt((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          ht((i) => {
                            (n._loadedRoutes = i.routes),
                              (n._loadedInjector = i.injector);
                          })
                        )
                      : (function ob(e) {
                          return Hi(_m(tl, 3));
                        })()
                  )
                )
            : L({ routes: [], injector: t });
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return L(r);
            if (o.numberOfChildren > 1 || !o.children[se])
              return Hi(new S(4e3, tl));
            o = o.children[se];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const i = this.createSegmentGroup(t, n.root, r, o);
          return new Lr(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            st(t, (o, i) => {
              if ("string" == typeof o && o.startsWith(":")) {
                const a = o.substring(1);
                r[i] = n[a];
              } else r[i] = o;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const i = this.createSegments(t, n.segments, r, o);
          let s = {};
          return (
            st(n.children, (a, l) => {
              s[l] = this.createSegmentGroup(t, a, r, o);
            }),
            new le(i, s)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(t, i, o)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new S(4001, tl);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      class lb {}
      class db {
        constructor(t, n, r, o, i, s, a) {
          (this.injector = t),
            (this.rootComponentType = n),
            (this.config = r),
            (this.urlTree = o),
            (this.url = i),
            (this.paramsInheritanceStrategy = s),
            (this.urlSerializer = a);
        }
        recognize() {
          const t = Xa(
            this.urlTree.root,
            [],
            [],
            this.config.filter((n) => void 0 === n.redirectTo)
          ).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            se
          ).pipe(
            Z((n) => {
              if (null === n) return null;
              const r = new Qa(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  se,
                  this.rootComponentType,
                  null,
                  this.urlTree.root,
                  -1,
                  {}
                ),
                o = new Xn(r, n),
                i = new Dm(this.url, o);
              return this.inheritParamsAndData(i._root), i;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = vm(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o);
        }
        processChildren(t, n, r) {
          return Qe(Object.keys(r.children)).pipe(
            Fr((o) => {
              const i = r.children[o],
                s = Mm(n, o);
              return this.processSegmentGroup(t, s, i, o);
            }),
            W2((o, i) => (o && i ? (o.push(...i), o) : null)),
            (function Aw(e, t = !1) {
              return ae((n, r) => {
                let o = 0;
                n.subscribe(
                  me(r, (i) => {
                    const s = e(i, o++);
                    (s || t) && r.next(i), !s && r.complete();
                  })
                );
              });
            })((o) => null !== o),
            Ha(null),
            Z2(),
            Z((o) => {
              if (null === o) return null;
              const i = Fm(o);
              return (
                (function fb(e) {
                  e.sort((t, n) =>
                    t.value.outlet === se
                      ? -1
                      : n.value.outlet === se
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                i
              );
            })
          );
        }
        processSegment(t, n, r, o, i) {
          return Qe(n).pipe(
            Fr((s) =>
              this.processSegmentAgainstRoute(s._injector ?? t, s, r, o, i)
            ),
            fr((s) => !!s),
            hr((s) => {
              if (Ad(s)) return Pm(r, o, i) ? L([]) : L(null);
              throw s;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, i) {
          if (n.redirectTo || !Rm(n, r, o, i)) return L(null);
          let s;
          if ("**" === n.path) {
            const a = o.length > 0 ? K2(o).parameters : {},
              l = jm(r) + o.length;
            s = L({
              snapshot: new Qa(
                o,
                a,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                $m(n),
                tn(n),
                n.component ?? n._loadedComponent ?? null,
                n,
                Lm(r),
                l,
                Hm(n)
              ),
              consumedSegments: [],
              remainingSegments: [],
            });
          } else
            s = Am(r, n, o, t).pipe(
              Z(
                ({
                  matched: a,
                  consumedSegments: l,
                  remainingSegments: u,
                  parameters: c,
                }) => {
                  if (!a) return null;
                  const d = jm(r) + l.length;
                  return {
                    snapshot: new Qa(
                      l,
                      c,
                      Object.freeze({ ...this.urlTree.queryParams }),
                      this.urlTree.fragment,
                      $m(n),
                      tn(n),
                      n.component ?? n._loadedComponent ?? null,
                      n,
                      Lm(r),
                      d,
                      Hm(n)
                    ),
                    consumedSegments: l,
                    remainingSegments: u,
                  };
                }
              )
            );
          return s.pipe(
            Rn((a) => {
              if (null === a) return L(null);
              const {
                snapshot: l,
                consumedSegments: u,
                remainingSegments: c,
              } = a;
              t = n._injector ?? t;
              const d = n._loadedInjector ?? t,
                f = (function hb(e) {
                  return e.children
                    ? e.children
                    : e.loadChildren
                    ? e._loadedRoutes
                    : [];
                })(n),
                { segmentGroup: h, slicedSegments: g } = Xa(
                  r,
                  u,
                  c,
                  f.filter((C) => void 0 === C.redirectTo)
                );
              if (0 === g.length && h.hasChildren())
                return this.processChildren(d, f, h).pipe(
                  Z((C) => (null === C ? null : [new Xn(l, C)]))
                );
              if (0 === f.length && 0 === g.length) return L([new Xn(l, [])]);
              const y = tn(n) === i;
              return this.processSegment(d, f, h, g, y ? se : i).pipe(
                Z((C) => (null === C ? null : [new Xn(l, C)]))
              );
            })
          );
        }
      }
      function pb(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path && void 0 === t.redirectTo;
      }
      function Fm(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!pb(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = Fm(r.children);
          t.push(new Xn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function Lm(e) {
        let t = e;
        for (; t._sourceSegment; ) t = t._sourceSegment;
        return t;
      }
      function jm(e) {
        let t = e,
          n = t._segmentIndexShift ?? 0;
        for (; t._sourceSegment; )
          (t = t._sourceSegment), (n += t._segmentIndexShift ?? 0);
        return n - 1;
      }
      function $m(e) {
        return e.data || {};
      }
      function Hm(e) {
        return e.resolve || {};
      }
      function Vm(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function Nd(e) {
        return Rn((t) => {
          const n = e(t);
          return n ? Qe(n).pipe(Z(() => t)) : L(t);
        });
      }
      const Lo = new G("ROUTES");
      let kd = (() => {
        class e {
          constructor(n, r) {
            (this.injector = n),
              (this.compiler = r),
              (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap());
          }
          loadComponent(n) {
            if (this.componentLoaders.get(n))
              return this.componentLoaders.get(n);
            if (n._loadedComponent) return L(n._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(n);
            const r = pr(n.loadComponent()).pipe(
                Z(Um),
                ht((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(n),
                    (n._loadedComponent = i);
                }),
                hd(() => {
                  this.componentLoaders.delete(n);
                })
              ),
              o = new G2(r, () => new Ue()).pipe(dd());
            return this.componentLoaders.set(n, o), o;
          }
          loadChildren(n, r) {
            if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
            if (r._loadedRoutes)
              return L({
                routes: r._loadedRoutes,
                injector: r._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(r);
            const i = this.loadModuleFactoryOrRoutes(r.loadChildren).pipe(
                Z((a) => {
                  this.onLoadEndListener && this.onLoadEndListener(r);
                  let l,
                    u,
                    c = !1;
                  Array.isArray(a)
                    ? (u = a)
                    : ((l = a.create(n).injector),
                      (u = Y2(l.get(Lo, [], H.Self | H.Optional))));
                  return { routes: u.map(xd), injector: l };
                }),
                hd(() => {
                  this.childrenLoaders.delete(r);
                })
              ),
              s = new G2(i, () => new Ue()).pipe(dd());
            return this.childrenLoaders.set(r, s), s;
          }
          loadModuleFactoryOrRoutes(n) {
            return pr(n()).pipe(
              Z(Um),
              nt((o) =>
                o instanceof A0 || Array.isArray(o)
                  ? L(o)
                  : Qe(this.compiler.compileModuleAsync(o))
              )
            );
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(In), O(Eg));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function Um(e) {
        return (function bb(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let ol = (() => {
        class e {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Ue()),
              (this.configLoader = fe(kd)),
              (this.environmentInjector = fe(zn)),
              (this.urlSerializer = fe(zi)),
              (this.rootContexts = fe(Ki)),
              (this.navigationId = 0),
              (this.afterPreactivation = () => L(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (o) =>
                this.events.next(new d_(o))),
              (this.configLoader.onLoadStartListener = (o) =>
                this.events.next(new c_(o)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(n) {
            const r = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...n, id: r });
          }
          setupNavigations(n) {
            return (
              (this.transitions = new en({
                id: 0,
                targetPageId: 0,
                currentUrlTree: n.currentUrlTree,
                currentRawUrl: n.currentUrlTree,
                extractedUrl: n.urlHandlingStrategy.extract(n.currentUrlTree),
                urlAfterRedirects: n.urlHandlingStrategy.extract(
                  n.currentUrlTree
                ),
                rawUrl: n.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Qi,
                restoredState: null,
                currentSnapshot: n.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: n.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                dr((r) => 0 !== r.id),
                Z((r) => ({
                  ...r,
                  extractedUrl: n.urlHandlingStrategy.extract(r.rawUrl),
                })),
                Rn((r) => {
                  let o = !1,
                    i = !1;
                  return L(r).pipe(
                    ht((s) => {
                      this.currentNavigation = {
                        id: s.id,
                        initialUrl: s.rawUrl,
                        extractedUrl: s.extractedUrl,
                        trigger: s.source,
                        extras: s.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Rn((s) => {
                      const a = n.browserUrlTree.toString(),
                        l =
                          !n.navigated ||
                          s.extractedUrl.toString() !== a ||
                          a !== n.currentUrlTree.toString();
                      if (
                        !l &&
                        "reload" !==
                          (s.extras.onSameUrlNavigation ??
                            n.onSameUrlNavigation)
                      ) {
                        const c = "";
                        return (
                          this.events.next(
                            new fm(s.id, n.serializeUrl(r.rawUrl), c, 0)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          wn
                        );
                      }
                      if (n.urlHandlingStrategy.shouldProcessUrl(s.rawUrl))
                        return (
                          zm(s.source) && (n.browserUrlTree = s.extractedUrl),
                          L(s).pipe(
                            Rn((c) => {
                              const d = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Cd(
                                    c.id,
                                    this.urlSerializer.serialize(
                                      c.extractedUrl
                                    ),
                                    c.source,
                                    c.restoredState
                                  )
                                ),
                                d !== this.transitions?.getValue()
                                  ? wn
                                  : Promise.resolve(c)
                              );
                            }),
                            (function ab(e, t, n, r) {
                              return Rn((o) =>
                                (function ib(e, t, n, r, o) {
                                  return new sb(e, t, n, r, o).apply();
                                })(e, t, n, o.extractedUrl, r).pipe(
                                  Z((i) => ({ ...o, urlAfterRedirects: i }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.urlSerializer,
                              n.config
                            ),
                            ht((c) => {
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: c.urlAfterRedirects,
                              }),
                                (r.urlAfterRedirects = c.urlAfterRedirects);
                            }),
                            (function mb(e, t, n, r, o) {
                              return nt((i) =>
                                (function cb(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  i,
                                  s = "emptyOnly"
                                ) {
                                  return new db(e, t, n, r, o, s, i)
                                    .recognize()
                                    .pipe(
                                      Rn((a) =>
                                        null === a
                                          ? (function ub(e) {
                                              return new Ne((t) => t.error(e));
                                            })(new lb())
                                          : L(a)
                                      )
                                    );
                                })(
                                  e,
                                  t,
                                  n,
                                  i.urlAfterRedirects,
                                  r.serialize(i.urlAfterRedirects),
                                  r,
                                  o
                                ).pipe(Z((s) => ({ ...i, targetSnapshot: s })))
                              );
                            })(
                              this.environmentInjector,
                              this.rootComponentType,
                              n.config,
                              this.urlSerializer,
                              n.paramsInheritanceStrategy
                            ),
                            ht((c) => {
                              if (
                                ((r.targetSnapshot = c.targetSnapshot),
                                "eager" === n.urlUpdateStrategy)
                              ) {
                                if (!c.extras.skipLocationChange) {
                                  const f = n.urlHandlingStrategy.merge(
                                    c.urlAfterRedirects,
                                    c.rawUrl
                                  );
                                  n.setBrowserUrl(f, c);
                                }
                                n.browserUrlTree = c.urlAfterRedirects;
                              }
                              const d = new i_(
                                c.id,
                                this.urlSerializer.serialize(c.extractedUrl),
                                this.urlSerializer.serialize(
                                  c.urlAfterRedirects
                                ),
                                c.targetSnapshot
                              );
                              this.events.next(d);
                            })
                          )
                        );
                      if (
                        l &&
                        n.urlHandlingStrategy.shouldProcessUrl(n.rawUrlTree)
                      ) {
                        const {
                            id: c,
                            extractedUrl: d,
                            source: f,
                            restoredState: h,
                            extras: g,
                          } = s,
                          y = new Cd(c, this.urlSerializer.serialize(d), f, h);
                        this.events.next(y);
                        const C = ym(d, this.rootComponentType).snapshot;
                        return L(
                          (r = {
                            ...s,
                            targetSnapshot: C,
                            urlAfterRedirects: d,
                            extras: {
                              ...g,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const c = "";
                        return (
                          this.events.next(
                            new fm(s.id, n.serializeUrl(r.extractedUrl), c, 1)
                          ),
                          (n.rawUrlTree = s.rawUrl),
                          s.resolve(null),
                          wn
                        );
                      }
                    }),
                    ht((s) => {
                      const a = new s_(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot
                      );
                      this.events.next(a);
                    }),
                    Z(
                      (s) =>
                        (r = {
                          ...s,
                          guards: P_(
                            s.targetSnapshot,
                            s.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function U_(e, t) {
                      return nt((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: i,
                            canDeactivateChecks: s,
                          },
                        } = n;
                        return 0 === s.length && 0 === i.length
                          ? L({ ...n, guardsResult: !0 })
                          : (function z_(e, t, n, r) {
                              return Qe(e).pipe(
                                nt((o) =>
                                  (function Y_(e, t, n, r, o) {
                                    const i =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return i && 0 !== i.length
                                      ? L(
                                          i.map((a) => {
                                            const l = Ji(t) ?? o,
                                              u = Oo(a, l);
                                            return pr(
                                              (function H_(e) {
                                                return e && ts(e.canDeactivate);
                                              })(u)
                                                ? u.canDeactivate(e, t, n, r)
                                                : l.runInContext(() =>
                                                    u(e, t, n, r)
                                                  )
                                            ).pipe(fr());
                                          })
                                        ).pipe(Fo())
                                      : L(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                fr((o) => !0 !== o, !0)
                              );
                            })(s, r, o, e).pipe(
                              nt((a) =>
                                a &&
                                (function F_(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function G_(e, t, n, r) {
                                      return Qe(t).pipe(
                                        Fr((o) =>
                                          cd(
                                            (function W_(e, t) {
                                              return (
                                                null !== e && t && t(new f_(e)),
                                                L(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function q_(e, t) {
                                              return (
                                                null !== e && t && t(new p_(e)),
                                                L(!0)
                                              );
                                            })(o.route, r),
                                            (function Q_(e, t, n) {
                                              const r = t[t.length - 1],
                                                i = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((s) =>
                                                    (function N_(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(s)
                                                  )
                                                  .filter((s) => null !== s)
                                                  .map((s) =>
                                                    z2(() =>
                                                      L(
                                                        s.guards.map((l) => {
                                                          const u =
                                                              Ji(s.node) ?? n,
                                                            c = Oo(l, u);
                                                          return pr(
                                                            (function $_(e) {
                                                              return (
                                                                e &&
                                                                ts(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(c)
                                                              ? c.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : u.runInContext(
                                                                  () => c(r, e)
                                                                )
                                                          ).pipe(fr());
                                                        })
                                                      ).pipe(Fo())
                                                    )
                                                  );
                                              return L(i).pipe(Fo());
                                            })(e, o.path, n),
                                            (function Z_(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return L(!0);
                                              const o = r.map((i) =>
                                                z2(() => {
                                                  const s = Ji(t) ?? n,
                                                    a = Oo(i, s);
                                                  return pr(
                                                    (function j_(e) {
                                                      return (
                                                        e && ts(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : s.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(fr());
                                                })
                                              );
                                              return L(o).pipe(Fo());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        fr((o) => !0 !== o, !0)
                                      );
                                    })(r, i, e, t)
                                  : L(a)
                              ),
                              Z((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (s) => this.events.next(s)),
                    ht((s) => {
                      if (
                        ((r.guardsResult = s.guardsResult), $r(s.guardsResult))
                      )
                        throw wm(0, s.guardsResult);
                      const a = new a_(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        this.urlSerializer.serialize(s.urlAfterRedirects),
                        s.targetSnapshot,
                        !!s.guardsResult
                      );
                      this.events.next(a);
                    }),
                    dr(
                      (s) =>
                        !!s.guardsResult ||
                        (n.restoreHistory(s),
                        this.cancelNavigationTransition(s, "", 3),
                        !1)
                    ),
                    Nd((s) => {
                      if (s.guards.canActivateChecks.length)
                        return L(s).pipe(
                          ht((a) => {
                            const l = new l_(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          }),
                          Rn((a) => {
                            let l = !1;
                            return L(a).pipe(
                              (function yb(e, t) {
                                return nt((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return L(n);
                                  let i = 0;
                                  return Qe(o).pipe(
                                    Fr((s) =>
                                      (function vb(e, t, n, r) {
                                        const o = e.routeConfig,
                                          i = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !Vm(o) &&
                                            (i[Bi] = o.title),
                                          (function Db(e, t, n, r) {
                                            const o = (function Cb(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return L({});
                                            const i = {};
                                            return Qe(o).pipe(
                                              nt((s) =>
                                                (function wb(e, t, n, r) {
                                                  const o = Ji(t) ?? r,
                                                    i = Oo(e, o);
                                                  return pr(
                                                    i.resolve
                                                      ? i.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          i(t, n)
                                                        )
                                                  );
                                                })(e[s], t, n, r).pipe(
                                                  fr(),
                                                  ht((a) => {
                                                    i[s] = a;
                                                  })
                                                )
                                              ),
                                              fd(1),
                                              (function Rw(e) {
                                                return Z(() => e);
                                              })(i),
                                              hr((s) => (Ad(s) ? wn : Hi(s)))
                                            );
                                          })(i, e, t, r).pipe(
                                            Z(
                                              (s) => (
                                                (e._resolvedData = s),
                                                (e.data = vm(e, n).resolve),
                                                o &&
                                                  Vm(o) &&
                                                  (e.data[Bi] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(s.route, r, e, t)
                                    ),
                                    ht(() => i++),
                                    fd(1),
                                    nt((s) => (i === o.length ? L(n) : wn))
                                  );
                                });
                              })(
                                n.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              ht({
                                next: () => (l = !0),
                                complete: () => {
                                  l ||
                                    (n.restoreHistory(a),
                                    this.cancelNavigationTransition(a, "", 2));
                                },
                              })
                            );
                          }),
                          ht((a) => {
                            const l = new u_(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(a.urlAfterRedirects),
                              a.targetSnapshot
                            );
                            this.events.next(l);
                          })
                        );
                    }),
                    Nd((s) => {
                      const a = (l) => {
                        const u = [];
                        l.routeConfig?.loadComponent &&
                          !l.routeConfig._loadedComponent &&
                          u.push(
                            this.configLoader.loadComponent(l.routeConfig).pipe(
                              ht((c) => {
                                l.component = c;
                              }),
                              Z(() => {})
                            )
                          );
                        for (const c of l.children) u.push(...a(c));
                        return u;
                      };
                      return B2(a(s.targetSnapshot.root)).pipe(Ha(), Vi(1));
                    }),
                    Nd(() => this.afterPreactivation()),
                    Z((s) => {
                      const a = (function w_(e, t, n) {
                        const r = Yi(e, t._root, n ? n._root : void 0);
                        return new mm(r, t);
                      })(
                        n.routeReuseStrategy,
                        s.targetSnapshot,
                        s.currentRouterState
                      );
                      return (r = { ...s, targetRouterState: a });
                    }),
                    ht((s) => {
                      (n.currentUrlTree = s.urlAfterRedirects),
                        (n.rawUrlTree = n.urlHandlingStrategy.merge(
                          s.urlAfterRedirects,
                          s.rawUrl
                        )),
                        (n.routerState = s.targetRouterState),
                        "deferred" === n.urlUpdateStrategy &&
                          (s.extras.skipLocationChange ||
                            n.setBrowserUrl(n.rawUrlTree, s),
                          (n.browserUrlTree = s.urlAfterRedirects));
                    }),
                    ((e, t, n) =>
                      Z(
                        (r) => (
                          new R_(
                            t,
                            r.targetRouterState,
                            r.currentRouterState,
                            n
                          ).activate(e),
                          r
                        )
                      ))(this.rootContexts, n.routeReuseStrategy, (s) =>
                      this.events.next(s)
                    ),
                    ht({
                      next: (s) => {
                        (o = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (n.navigated = !0),
                          this.events.next(
                            new Hr(
                              s.id,
                              this.urlSerializer.serialize(s.extractedUrl),
                              this.urlSerializer.serialize(n.currentUrlTree)
                            )
                          ),
                          n.titleStrategy?.updateTitle(
                            s.targetRouterState.snapshot
                          ),
                          s.resolve(!0);
                      },
                      complete: () => {
                        o = !0;
                      },
                    }),
                    hd(() => {
                      o || i || this.cancelNavigationTransition(r, "", 1),
                        this.currentNavigation?.id === r.id &&
                          (this.currentNavigation = null);
                    }),
                    hr((s) => {
                      if (((i = !0), Em(s))) {
                        bm(s) || ((n.navigated = !0), n.restoreHistory(r, !0));
                        const a = new Za(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s.message,
                          s.cancellationCode
                        );
                        if ((this.events.next(a), bm(s))) {
                          const l = n.urlHandlingStrategy.merge(
                              s.url,
                              n.rawUrlTree
                            ),
                            u = {
                              skipLocationChange: r.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === n.urlUpdateStrategy || zm(r.source),
                            };
                          n.scheduleNavigation(l, Qi, null, u, {
                            resolve: r.resolve,
                            reject: r.reject,
                            promise: r.promise,
                          });
                        } else r.resolve(!1);
                      } else {
                        n.restoreHistory(r, !0);
                        const a = new hm(
                          r.id,
                          this.urlSerializer.serialize(r.extractedUrl),
                          s,
                          r.targetSnapshot ?? void 0
                        );
                        this.events.next(a);
                        try {
                          r.resolve(n.errorHandler(s));
                        } catch (l) {
                          r.reject(l);
                        }
                      }
                      return wn;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(n, r, o) {
            const i = new Za(
              n.id,
              this.urlSerializer.serialize(n.extractedUrl),
              r,
              o
            );
            this.events.next(i), n.resolve(!1);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function zm(e) {
        return e !== Qi;
      }
      let Gm = (() => {
          class e {
            buildTitle(n) {
              let r,
                o = n.root;
              for (; void 0 !== o; )
                (r = this.getResolvedTitleForRoute(o) ?? r),
                  (o = o.children.find((i) => i.outlet === se));
              return r;
            }
            getResolvedTitleForRoute(n) {
              return n.data[Bi];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({
              token: e,
              factory: function () {
                return fe(Eb);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        Eb = (() => {
          class e extends Gm {
            constructor(n) {
              super(), (this.title = n);
            }
            updateTitle(n) {
              const r = this.buildTitle(n);
              void 0 !== r && this.title.setTitle(r);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(O($2));
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })(),
        Sb = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({
              token: e,
              factory: function () {
                return fe(Mb);
              },
              providedIn: "root",
            })),
            e
          );
        })();
      class Ib {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let Mb = (() => {
        class e extends Ib {}
        return (
          (e.ɵfac = (function () {
            let t;
            return function (r) {
              return (
                t ||
                (t = (function Kf(e) {
                  return rr(() => {
                    const t = e.prototype.constructor,
                      n = t[$n] || Hl(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const i = o[$n] || Hl(o);
                      if (i && i !== n) return i;
                      o = Object.getPrototypeOf(o);
                    }
                    return (i) => new i();
                  });
                })(e))
              )(r || e);
            };
          })()),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const il = new G("", { providedIn: "root", factory: () => ({}) });
      let xb = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({
              token: e,
              factory: function () {
                return fe(Ab);
              },
              providedIn: "root",
            })),
            e
          );
        })(),
        Ab = (() => {
          class e {
            shouldProcessUrl(n) {
              return !0;
            }
            extract(n) {
              return n;
            }
            merge(n, r) {
              return n;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
            e
          );
        })();
      function Rb(e) {
        throw e;
      }
      function Pb(e, t, n) {
        return t.parse("/");
      }
      const Nb = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        kb = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let zt = (() => {
        class e {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = fe(t9)),
              (this.isNgZoneEnabled = !1),
              (this.options = fe(il, { optional: !0 }) || {}),
              (this.errorHandler = this.options.errorHandler || Rb),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || Pb),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = fe(xb)),
              (this.routeReuseStrategy = fe(Sb)),
              (this.urlCreationStrategy = fe(v_)),
              (this.titleStrategy = fe(Gm)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = Y2(fe(Lo, { optional: !0 }) ?? [])),
              (this.navigationTransitions = fe(ol)),
              (this.urlSerializer = fe(zi)),
              (this.location = fe($c)),
              (this.isNgZoneEnabled =
                fe(qe) instanceof qe && qe.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new Lr()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = ym(this.currentUrlTree, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (n) => {
                  (this.lastSuccessfulId = n.id),
                    (this.currentPageId = n.targetPageId);
                },
                (n) => {
                  this.console.warn(`Unhandled Navigation Error: ${n}`);
                }
              );
          }
          resetRootComponentType(n) {
            (this.routerState.root.component = n),
              (this.navigationTransitions.rootComponentType = n);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const n = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Qi, n);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = "popstate" === n.type ? "popstate" : "hashchange";
                "popstate" === r &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(n.url, r, n.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(n, r, o) {
            const i = { replaceUrl: !0 },
              s = o?.navigationId ? o : null;
            if (o) {
              const l = { ...o };
              delete l.navigationId,
                delete l.ɵrouterPageId,
                0 !== Object.keys(l).length && (i.state = l);
            }
            const a = this.parseUrl(n);
            this.scheduleNavigation(a, r, s, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          resetConfig(n) {
            (this.config = n.map(xd)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: o,
                queryParams: i,
                fragment: s,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = l ? this.currentUrlTree.fragment : s;
            let c = null;
            switch (a) {
              case "merge":
                c = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                c = this.currentUrlTree.queryParams;
                break;
              default:
                c = i || null;
            }
            return (
              null !== c && (c = this.removeEmptyProps(c)),
              this.urlCreationStrategy.createUrlTree(
                o,
                this.routerState,
                this.currentUrlTree,
                n,
                c,
                u ?? null
              )
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const o = $r(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
            return this.scheduleNavigation(i, Qi, null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function Ob(e) {
                for (let t = 0; t < e.length; t++) {
                  if (null == e[t]) throw new S(4008, !1);
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (o) {
              r = this.malformedUriErrorHandler(o, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let o;
            if (((o = !0 === r ? { ...Nb } : !1 === r ? { ...kb } : r), $r(n)))
              return X2(this.currentUrlTree, n, o);
            const i = this.parseUrl(n);
            return X2(this.currentUrlTree, i, o);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, o) => {
              const i = n[o];
              return null != i && (r[o] = i), r;
            }, {});
          }
          scheduleNavigation(n, r, o, i, s) {
            if (this.disposed) return Promise.resolve(!1);
            let a, l, u, c;
            return (
              s
                ? ((a = s.resolve), (l = s.reject), (u = s.promise))
                : (u = new Promise((d, f) => {
                    (a = d), (l = f);
                  })),
              (c =
                "computed" === this.canceledNavigationResolution
                  ? o && o.ɵrouterPageId
                    ? o.ɵrouterPageId
                    : i.replaceUrl || i.skipLocationChange
                    ? this.browserPageId ?? 0
                    : (this.browserPageId ?? 0) + 1
                  : 0),
              this.navigationTransitions.handleNavigationRequest({
                targetPageId: c,
                source: r,
                restoredState: o,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: n,
                extras: i,
                resolve: a,
                reject: l,
                promise: u,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              u.catch((d) => Promise.reject(d))
            );
          }
          setBrowserUrl(n, r) {
            const o = this.urlSerializer.serialize(n),
              i = {
                ...r.extras.state,
                ...this.generateNgRouterState(r.id, r.targetPageId),
              };
            this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl
              ? this.location.replaceState(o, "", i)
              : this.location.go(o, "", i);
          }
          restoreHistory(n, r = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  this.getCurrentNavigation()?.finalUrl) ||
              0 === o
                ? this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      class Wm {}
      let jb = (() => {
        class e {
          constructor(n, r, o, i, s) {
            (this.router = n),
              (this.injector = o),
              (this.preloadingStrategy = i),
              (this.loader = s);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                dr((n) => n instanceof Hr),
                Fr(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(n, r) {
            const o = [];
            for (const i of r) {
              i.providers &&
                !i._injector &&
                (i._injector = ha(i.providers, n, `Route: ${i.path}`));
              const s = i._injector ?? n,
                a = i._loadedInjector ?? s;
              (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
              (i.loadComponent && !i._loadedComponent)
                ? o.push(this.preloadConfig(s, i))
                : (i.children || i._loadedRoutes) &&
                  o.push(this.processRoutes(a, i.children ?? i._loadedRoutes));
            }
            return Qe(o).pipe(Ur());
          }
          preloadConfig(n, r) {
            return this.preloadingStrategy.preload(r, () => {
              let o;
              o =
                r.loadChildren && void 0 === r.canLoad
                  ? this.loader.loadChildren(n, r)
                  : L(null);
              const i = o.pipe(
                nt((s) =>
                  null === s
                    ? L(void 0)
                    : ((r._loadedRoutes = s.routes),
                      (r._loadedInjector = s.injector),
                      this.processRoutes(s.injector ?? n, s.routes))
                )
              );
              return r.loadComponent && !r._loadedComponent
                ? Qe([i, this.loader.loadComponent(r)]).pipe(Ur())
                : i;
            });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(zt), O(Eg), O(zn), O(Wm), O(kd));
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Fd = new G("");
      let Zm = (() => {
        class e {
          constructor(n, r, o, i, s = {}) {
            (this.urlSerializer = n),
              (this.transitions = r),
              (this.viewportScroller = o),
              (this.zone = i),
              (this.options = s),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (s.scrollPositionRestoration =
                s.scrollPositionRestoration || "disabled"),
              (s.anchorScrolling = s.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof Cd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = n.navigationTrigger),
                  (this.restoredId = n.restoredState
                    ? n.restoredState.navigationId
                    : 0))
                : n instanceof Hr &&
                  ((this.lastId = n.id),
                  this.scheduleScrollEvent(
                    n,
                    this.urlSerializer.parse(n.urlAfterRedirects).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((n) => {
              n instanceof pm &&
                (n.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(n.position)
                  : n.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(n.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(n, r) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new pm(
                      n,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      r
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          (e.ɵfac = function (n) {
            !(function I1() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = z({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      function Vr(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function Ym() {
        const e = fe(In);
        return (t) => {
          const n = e.get(Ca);
          if (t !== n.components[0]) return;
          const r = e.get(zt),
            o = e.get(Km);
          1 === e.get(jd) && r.initialNavigation(),
            e.get(Jm, null, H.Optional)?.setUpPreloading(),
            e.get(Fd, null, H.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.unsubscribe());
        };
      }
      const Km = new G("", { factory: () => new Ue() }),
        jd = new G("", { providedIn: "root", factory: () => 1 });
      const Jm = new G("");
      function Ub(e) {
        return Vr(0, [
          { provide: Jm, useExisting: jb },
          { provide: Wm, useExisting: e },
        ]);
      }
      const Xm = new G("ROUTER_FORROOT_GUARD"),
        zb = [
          $c,
          { provide: zi, useClass: pd },
          zt,
          Ki,
          {
            provide: ko,
            useFactory: function Qm(e) {
              return e.routerState.root;
            },
            deps: [zt],
          },
          kd,
          [],
        ];
      function Gb() {
        return new Rg("Router", zt);
      }
      let e3 = (() => {
        class e {
          constructor(n) {}
          static forRoot(n, r) {
            return {
              ngModule: e,
              providers: [
                zb,
                [],
                { provide: Lo, multi: !0, useValue: n },
                {
                  provide: Xm,
                  useFactory: Qb,
                  deps: [[zt, new si(), new ai()]],
                },
                { provide: il, useValue: r || {} },
                r?.useHash
                  ? { provide: kr, useClass: B9 }
                  : { provide: kr, useClass: e2 },
                {
                  provide: Fd,
                  useFactory: () => {
                    const e = fe(aC),
                      t = fe(qe),
                      n = fe(il),
                      r = fe(ol),
                      o = fe(zi);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new Zm(o, r, e, t, n)
                    );
                  },
                },
                r?.preloadingStrategy
                  ? Ub(r.preloadingStrategy).ɵproviders
                  : [],
                { provide: Rg, multi: !0, useFactory: Gb },
                r?.initialNavigation ? Yb(r) : [],
                [
                  { provide: t3, useFactory: Ym },
                  { provide: bg, multi: !0, useExisting: t3 },
                ],
              ],
            };
          }
          static forChild(n) {
            return {
              ngModule: e,
              providers: [{ provide: Lo, multi: !0, useValue: n }],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(O(Xm, 8));
          }),
          (e.ɵmod = vr({ type: e })),
          (e.ɵinj = nr({ imports: [Md] })),
          e
        );
      })();
      function Qb(e) {
        return "guarded";
      }
      function Yb(e) {
        return [
          "disabled" === e.initialNavigation
            ? Vr(3, [
                {
                  provide: ya,
                  multi: !0,
                  useFactory: () => {
                    const t = fe(zt);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: jd, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? Vr(2, [
                { provide: jd, useValue: 0 },
                {
                  provide: ya,
                  multi: !0,
                  deps: [In],
                  useFactory: (t) => {
                    const n = t.get(H9, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((o) => {
                            const i = t.get(zt),
                              s = t.get(Km);
                            (function r(o) {
                              t.get(zt)
                                .events.pipe(
                                  dr(
                                    (s) =>
                                      s instanceof Hr ||
                                      s instanceof Za ||
                                      s instanceof hm
                                  ),
                                  Z(
                                    (s) =>
                                      s instanceof Hr ||
                                      (s instanceof Za &&
                                        (0 === s.code || 1 === s.code) &&
                                        null)
                                  ),
                                  dr((s) => null !== s),
                                  Vi(1)
                                )
                                .subscribe(() => {
                                  o();
                                });
                            })(() => {
                              o(!0);
                            }),
                              (t.get(ol).afterPreactivation = () => (
                                o(!0), s.closed ? L(void 0) : s
                              )),
                              i.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const t3 = new G("");
      class $o {}
      ($o.ɵfac = function (t) {
        return new (t || $o)();
      }),
        ($o.ɵmod = vr({ type: $o })),
        ($o.ɵinj = nr({ imports: [e3.forRoot([]), e3] }));
      var n3 = ue(123);
      class nn {
        constructor() {
          (this.language = new en(!0)),
            (this.language$ = this.language.asObservable()),
            (this.c = 0);
        }
        change() {
          0 == this.c
            ? (this.language.next(!1), (this.c = 1))
            : (this.language.next(!0), (this.c = 0));
        }
      }
      function Xb(e, t) {
        1 & e &&
          (p(0, "span"),
          V(),
          p(1, "svg", 41),
          b(2, "path", 42)(3, "path", 43)(4, "path", 44),
          m(),
          pe(),
          p(5, "div", 45)(6, "p"),
          E(7, "ESP"),
          m(),
          V(),
          p(8, "svg", 46),
          b(9, "path", 47),
          m()()());
      }
      function eE(e, t) {
        1 & e &&
          (p(0, "div"),
          V(),
          p(1, "svg", 48)(2, "g"),
          b(3, "rect", 49)(4, "rect", 50)(5, "rect", 51)(6, "polygon", 52)(
            7,
            "path",
            53
          )(8, "rect", 54),
          m(),
          b(9, "path", 55)(10, "path", 56)(11, "path", 57)(12, "path", 58)(
            13,
            "path",
            59
          )(14, "path", 60)(15, "path", 61)(16, "path", 62)(17, "path", 63),
          p(18, "g"),
          b(19, "path", 64)(20, "path", 65)(21, "path", 66),
          m(),
          b(22, "path", 67)(23, "path", 68)(24, "path", 69)(25, "path", 70)(
            26,
            "path",
            71
          )(27, "path", 72)(28, "path", 73)(29, "path", 74)(30, "path", 75)(
            31,
            "path",
            76
          ),
          p(32, "g"),
          b(33, "path", 77)(34, "path", 78),
          m(),
          b(35, "path", 79),
          p(36, "g"),
          b(37, "polygon", 80)(38, "polygon", 81)(39, "polygon", 82)(
            40,
            "polygon",
            83
          )(41, "polygon", 84)(42, "path", 85)(43, "path", 86)(44, "path", 87)(
            45,
            "path",
            88
          )(46, "polygon", 89)(47, "polygon", 90)(48, "polygon", 91)(
            49,
            "polygon",
            92
          )(50, "polygon", 93)(51, "polygon", 94)(52, "polygon", 95)(
            53,
            "polygon",
            96
          )(54, "polygon", 97)(55, "polygon", 98)(56, "polygon", 99)(
            57,
            "polygon",
            100
          )(58, "polygon", 101),
          m()(),
          pe(),
          p(59, "div", 45)(60, "p"),
          E(61, "ENG"),
          m(),
          V(),
          p(62, "svg", 46),
          b(63, "path", 47),
          m()()());
      }
      function tE(e, t) {
        1 & e &&
          (p(0, "span", 102),
          V(),
          p(1, "svg", 41),
          b(2, "path", 42)(3, "path", 43)(4, "path", 44),
          m(),
          pe(),
          p(5, "div", 45)(6, "p", 103),
          E(7, "ESPA\xd1OL"),
          m(),
          p(8, "p", 104),
          E(9, "ESP"),
          m(),
          V(),
          p(10, "svg", 105),
          b(11, "path", 47),
          m()()());
      }
      function nE(e, t) {
        1 & e &&
          (p(0, "div", 106),
          V(),
          p(1, "svg", 48)(2, "g"),
          b(3, "rect", 49)(4, "rect", 50)(5, "rect", 51)(6, "polygon", 52)(
            7,
            "path",
            53
          )(8, "rect", 54),
          m(),
          b(9, "path", 55)(10, "path", 56)(11, "path", 57)(12, "path", 58)(
            13,
            "path",
            59
          )(14, "path", 60)(15, "path", 61)(16, "path", 62)(17, "path", 63),
          p(18, "g"),
          b(19, "path", 64)(20, "path", 65)(21, "path", 66),
          m(),
          b(22, "path", 67)(23, "path", 68)(24, "path", 69)(25, "path", 70)(
            26,
            "path",
            71
          )(27, "path", 72)(28, "path", 73)(29, "path", 74)(30, "path", 75)(
            31,
            "path",
            76
          ),
          p(32, "g"),
          b(33, "path", 77)(34, "path", 78),
          m(),
          b(35, "path", 79),
          p(36, "g"),
          b(37, "polygon", 80)(38, "polygon", 81)(39, "polygon", 82)(
            40,
            "polygon",
            83
          )(41, "polygon", 84)(42, "path", 85)(43, "path", 86)(44, "path", 87)(
            45,
            "path",
            88
          )(46, "polygon", 89)(47, "polygon", 90)(48, "polygon", 91)(
            49,
            "polygon",
            92
          )(50, "polygon", 93)(51, "polygon", 94)(52, "polygon", 95)(
            53,
            "polygon",
            96
          )(54, "polygon", 97)(55, "polygon", 98)(56, "polygon", 99)(
            57,
            "polygon",
            100
          )(58, "polygon", 101),
          m()(),
          pe(),
          p(59, "div", 45)(60, "p", 103),
          E(61, "ENGLISH"),
          m(),
          p(62, "p", 104),
          E(63, "ENG"),
          m(),
          V(),
          p(64, "svg", 105),
          b(65, "path", 47),
          m()()());
      }
      (nn.ɵfac = function (t) {
        return new (t || nn)();
      }),
        (nn.ɵprov = z({ token: nn, factory: nn.ɵfac, providedIn: "root" }));
      class os {
        constructor(t) {
          (this.idiom = t),
            (this.toggleMode = new it()),
            (this.esp = !0),
            (this.eng = !1),
            (this.toggleIdiom = new it()),
            (this.aboutMe = "Acerca de mi"),
            (this.projects = "Proyectos"),
            (this.tools = "Herramientas"),
            (this.contact = "Cont\xe1ctame");
        }
        toggleDarkMode() {
          this.toggleMode.emit();
        }
        toogleLanguage() {
          (this.esp = !this.esp),
            (this.eng = !this.eng),
            this.toggleIdiom.emit(),
            this.textFile(),
            this.idiom.change();
        }
        textFile() {
          this.esp
            ? ((this.aboutMe = "Acerca de mi"),
              (this.projects = "Proyectos"),
              (this.tools = "Herramientas"),
              (this.contact = "Cont\xe1ctame"))
            : ((this.aboutMe = "About me"),
              (this.projects = "Projects"),
              (this.tools = "Tools"),
              (this.contact = "Contact me"));
        }
      }
      function rE(e, t) {
        1 & e &&
          (p(0, "div"),
          V(),
          p(1, "svg", 3)(2, "g"),
          b(3, "path", 4)(4, "path", 5)(5, "path", 6)(6, "path", 7),
          m()()());
      }
      function oE(e, t) {
        if (
          (1 & e &&
            (p(0, "div"),
            V(),
            p(1, "svg", 8)(2, "g", 9),
            b(3, "path", 10),
            m()()()),
          2 & e)
        ) {
          const n = Et();
          A(1), _("ngClass", n.sizesIcon);
        }
      }
      (os.ɵfac = function (t) {
        return new (t || os)(P(nn));
      }),
        (os.ɵcmp = Zt({
          type: os,
          selectors: [["app-navbar"]],
          outputs: { toggleMode: "toggleMode", toggleIdiom: "toggleIdiom" },
          decls: 52,
          vars: 8,
          consts: [
            [
              1,
              "md:hidden",
              "w-full",
              "h-20",
              "grid",
              "grid-cols-6",
              "content-center",
              "place-items-center",
              "bg-whites",
              "shadow-inner",
              "fixed",
              "left-0",
              "bottom-0",
              "z-50",
              "dark:bg-Gray4",
            ],
            ["href", "#aboutMe"],
            [
              "xmlns",
              "http://www.w3.org/2000/svg",
              "height",
              "45",
              "width",
              "45",
            ],
            [
              "d",
              "M11.1 35.25q3.15-2 6.225-3.025Q20.4 31.2 24 31.2q3.6 0 6.7 1.025t6.25 3.025q2.2-2.7 3.125-5.45Q41 27.05 41 24q0-7.25-4.875-12.125T24 7q-7.25 0-12.125 4.875T7 24q0 3.05.95 5.8t3.15 5.45ZM24 25.5q-2.9 0-4.875-1.975T17.15 18.65q0-2.9 1.975-4.875T24 11.8q2.9 0 4.875 1.975t1.975 4.875q0 2.9-1.975 4.875T24 25.5ZM24 44q-4.2 0-7.85-1.575-3.65-1.575-6.35-4.3Q7.1 35.4 5.55 31.75 4 28.1 4 23.95q0-4.1 1.575-7.75 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24.05 4q4.1 0 7.75 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Z",
              1,
              "fill-current",
              "text-Gray2",
              "dark:text-Gray1",
            ],
            ["href", "#Proyects"],
            [
              "d",
              "M7 42q-1.2 0-2.1-.9Q4 40.2 4 39V15q0-1.2.9-2.1.9-.9 2.1-.9h9V7q0-1.2.9-2.1.9-.9 2.1-.9h10q1.2 0 2.1.9.9.9.9 2.1v5h9q1.2 0 2.1.9.9.9.9 2.1v24q0 1.2-.9 2.1-.9.9-2.1.9Zm12-30h10V7H19Z",
              1,
              "fill-current",
              "text-Gray2",
              "dark:text-Gray1",
            ],
            [3, "click"],
            [
              "width",
              "44",
              "height",
              "44",
              "fill",
              "#000000",
              "viewBox",
              "0 0 24 24",
              "xmlns",
              "http://www.w3.org/2000/svg",
            ],
            ["id", "SVGRepo_bgCarrier", "stroke-width", "0"],
            [
              "id",
              "SVGRepo_tracerCarrier",
              "stroke-linecap",
              "round",
              "stroke-linejoin",
              "round",
            ],
            ["id", "SVGRepo_iconCarrier"],
            [
              "d",
              "M19.878,16.941A9.528,9.528,0,0,1,11.569,22,9.811,9.811,0,0,1,2,11.984,9.854,9.854,0,0,1,10.923,2a1.034,1.034,0,0,1,.912.458,1,1,0,0,1,.036,1.019,8.278,8.278,0,0,0-.72,1.785,1,1,0,1,1-1.929-.528c.037-.135.077-.269.119-.4A7.989,7.989,0,0,0,4,11.984,7.811,7.811,0,0,0,11.569,20a7.4,7.4,0,0,0,5.568-2.6,9.352,9.352,0,0,1-5.335-2.7,1,1,0,0,1,1.416-1.412,7.23,7.23,0,0,0,5.622,2.177,1.053,1.053,0,0,1,.957.453A1,1,0,0,1,19.878,16.941ZM20.5,13v-.5H21a1,1,0,0,0,0-2h-.5V10a1,1,0,0,0-2,0v.5H18a1,1,0,0,0,0,2h.5V13a1,1,0,0,0,2,0Zm-4-11a1,1,0,0,0-1,1v.5H15a1,1,0,0,0,0,2h.5V6a1,1,0,0,0,2,0V5.5H18a1,1,0,0,0,0-2h-.5V3A1,1,0,0,0,16.5,2Zm-6,10a1,1,0,0,0,1-1v-.5H12a1,1,0,0,0,0-2h-.5V8a1,1,0,0,0-2,0v.5H9a1,1,0,0,0,0,2h.5V11A1,1,0,0,0,10.5,12Z",
              1,
              "fill-current",
              "text-black",
              "dark:text-tertiaryBlue",
            ],
            ["href", "#tools"],
            [
              "d",
              "M38.2 44q-.3 0-.55-.1-.25-.1-.5-.35l-12.1-12.1q-.25-.25-.35-.5-.1-.25-.1-.55 0-.3.1-.55.1-.25.35-.5l4.25-4.25q.25-.25.5-.35.25-.1.55-.1.3 0 .55.1.25.1.5.35l12.1 12.1q.25.25.35.5.1.25.1.55 0 .3-.1.55-.1.25-.35.5l-4.25 4.25q-.25.25-.5.35-.25.1-.55.1ZM9.75 44q-.3 0-.575-.1-.275-.1-.525-.35l-4.2-4.2q-.25-.25-.35-.525-.1-.275-.1-.575 0-.3.1-.55.1-.25.35-.5L15.7 25.95h4.25l1.9-1.9-8.75-8.75h-2.85L4 9.05 8.95 4.1l6.25 6.25v2.85l8.75 8.75 6.5-6.5-3.35-3.35 2.8-2.8h-5.65l-.9-.9 6.4-6.4.9.9v5.65l2.8-2.8 8.45 8.45q.75.75 1.175 1.725.425.975.425 2.075 0 1-.325 1.925T42.25 21.6L38 17.35l-2.8 2.8-2.6-2.6L22.05 28.1v4.2L10.8 43.55q-.25.25-.5.35-.25.1-.55.1Z",
              1,
              "fill-current",
              "text-Gray2",
              "dark:text-Gray1",
            ],
            ["href", "#footer"],
            [
              "xmlns",
              "http://www.w3.org/2000/svg",
              "width",
              "45px",
              "height",
              "45px",
              "viewBox",
              "0 0 24 24",
              "fill",
              "none",
              1,
              "stroke-Gray2",
              "dark:stroke-Gray1",
            ],
            [
              "opacity",
              "0.1",
              "d",
              "M3 6.5C3 14.5081 9.49187 21 17.5 21C18.166 21 18.8216 20.9551 19.4637 20.8682C20.3747 20.7448 21 19.9292 21 19.01V16.4415C21 15.5807 20.4491 14.8164 19.6325 14.5442L16.4841 13.4947C15.6836 13.2279 14.8252 13.699 14.6206 14.5177C14.3475 15.6102 12.987 15.987 12.1907 15.1907L8.80926 11.8093C8.01301 11.013 8.38984 9.65254 9.48229 9.37943C10.301 9.17476 10.7721 8.31644 10.5053 7.51586L9.45585 4.36754C9.18362 3.55086 8.41934 3 7.55848 3H4.99004C4.0708 3 3.25518 3.62533 3.13185 4.53627C3.0449 5.17845 3 5.83398 3 6.5Z",
              1,
              "fill-current",
              "text-Gray2",
              "dark:text-Gray1",
            ],
            [
              "d",
              "M3 6.5C3 14.5081 9.49187 21 17.5 21C18.166 21 18.8216 20.9551 19.4637 20.8682C20.3747 20.7448 21 19.9292 21 19.01V16.4415C21 15.5807 20.4491 14.8164 19.6325 14.5442L16.4841 13.4947C15.6836 13.2279 14.8252 13.699 14.6206 14.5177C14.3475 15.6102 12.987 15.987 12.1907 15.1907L8.80926 11.8093C8.01301 11.013 8.38984 9.65254 9.48229 9.37943C10.301 9.17476 10.7721 8.31644 10.5053 7.51586L9.45585 4.36754C9.18362 3.55086 8.41934 3 7.55848 3H4.99004C4.0708 3 3.25518 3.62533 3.13185 4.53627C3.0449 5.17845 3 5.83398 3 6.5Z",
              1,
              "fill-current",
              "text-Gray2",
              "dark:text-Gray1",
            ],
            [
              "d",
              "M21 3L15.5 8.5",
              "stroke-width",
              "2",
              "stroke-linecap",
              "round",
              "stroke-linejoin",
              "round",
              1,
              "fill-current",
              "text-Gray2",
              "dark:text-Gray1",
            ],
            [
              "d",
              "M15 5V8.5V8.5C15 8.77614 15.2239 9 15.5 9V9H19",
              1,
              "fill-current",
              "text-Gray2",
              "dark:text-Gray1",
            ],
            [
              1,
              "font-bold",
              "text-blacks",
              "text-sm",
              "flex",
              "flex-row",
              "justify-center",
              "text-center",
              "dark:text-whites",
              3,
              "click",
            ],
            [4, "ngIf"],
            [
              1,
              "hidden",
              "md:flex",
              "w-full",
              "h-20",
              "items-center",
              "justify-between",
              "p-4",
              "shadow-md",
              "drop-shadow-md",
              "dark:bg-Gray4",
              "dark:text-whites",
            ],
            [1, "text-lg", "font-black"],
            [
              "src",
              "./assets/logoN.png",
              1,
              "hidden",
              "dark:flex",
              "lg:dark:hidden",
              "h-12",
            ],
            ["src", "./assets/logoN.png", 1, "hidden", "lg:dark:flex", "h-16"],
            [
              "src",
              "./assets/logoL.png",
              1,
              "dark:hidden",
              "lg:hidden",
              "h-12",
            ],
            [
              "src",
              "./assets/logoL.png",
              1,
              "dark:hidden",
              "md:hidden",
              "lg:flex",
              "h-16",
            ],
            [
              1,
              "flex",
              "items-center",
              "justify-center",
              "space-x-7",
              "text-base",
              "font-bold",
              "lg:text-lg",
            ],
            [
              "href",
              "#aboutMe",
              1,
              "box-border",
              "effect_nav",
              "p-2",
              "rounded-lg",
            ],
            [
              "href",
              "#Proyects",
              1,
              "box-border",
              "effect_nav",
              "p-2",
              "rounded-lg",
            ],
            [
              "href",
              "#tools",
              1,
              "box-border",
              "effect_nav",
              "p-2",
              "rounded-lg",
            ],
            [
              "href",
              "#footer",
              1,
              "box-border",
              "effect_nav",
              "p-2",
              "rounded-lg",
            ],
            [1, "flex", "space-x-2"],
            [1, "flex", "items-center"],
            [1, "effect_nav", "p-2", "rounded-lg", 3, "click"],
            [
              "width",
              "28",
              "height",
              "28",
              "fill",
              "#000000",
              "viewBox",
              "0 0 24 24",
              "xmlns",
              "http://www.w3.org/2000/svg",
            ],
            [
              "d",
              "M19.878,16.941A9.528,9.528,0,0,1,11.569,22,9.811,9.811,0,0,1,2,11.984,9.854,9.854,0,0,1,10.923,2a1.034,1.034,0,0,1,.912.458,1,1,0,0,1,.036,1.019,8.278,8.278,0,0,0-.72,1.785,1,1,0,1,1-1.929-.528c.037-.135.077-.269.119-.4A7.989,7.989,0,0,0,4,11.984,7.811,7.811,0,0,0,11.569,20a7.4,7.4,0,0,0,5.568-2.6,9.352,9.352,0,0,1-5.335-2.7,1,1,0,0,1,1.416-1.412,7.23,7.23,0,0,0,5.622,2.177,1.053,1.053,0,0,1,.957.453A1,1,0,0,1,19.878,16.941ZM20.5,13v-.5H21a1,1,0,0,0,0-2h-.5V10a1,1,0,0,0-2,0v.5H18a1,1,0,0,0,0,2h.5V13a1,1,0,0,0,2,0Zm-4-11a1,1,0,0,0-1,1v.5H15a1,1,0,0,0,0,2h.5V6a1,1,0,0,0,2,0V5.5H18a1,1,0,0,0,0-2h-.5V3A1,1,0,0,0,16.5,2Zm-6,10a1,1,0,0,0,1-1v-.5H12a1,1,0,0,0,0-2h-.5V8a1,1,0,0,0-2,0v.5H9a1,1,0,0,0,0,2h.5V11A1,1,0,0,0,10.5,12Z",
              1,
              "fill-current",
              "text-Gray1",
              "dark:text-tertiaryBlue",
            ],
            [
              1,
              "effect_nav",
              "p-2",
              "rounded-lg",
              "text-base",
              "font-bold",
              3,
              "click",
            ],
            ["class", "flex space-x-2 items-center", 4, "ngIf"],
            ["class", "flex space-x-4 items-center", 4, "ngIf"],
            [
              "width",
              "32px",
              "height",
              "32px",
              "viewBox",
              "0 0 64 64",
              "xmlns",
              "http://www.w3.org/2000/svg",
              0,
              "xmlns",
              "xlink",
              "http://www.w3.org/1999/xlink",
              "aria-hidden",
              "true",
              "role",
              "img",
              "preserveAspectRatio",
              "xMidYMid meet",
              1,
              "iconify",
              "iconify--emojione",
            ],
            [
              "d",
              "M62 32H2c0 5.5 1.5 10.6 4 15h52c2.6-4.4 4-9.5 4-15",
              "fill",
              "#2a5f9e",
            ],
            [
              "d",
              "M32 2C15.5 2 2 15.4 2 32h60C62 15.4 48.6 2 32 2z",
              "fill",
              "#ffe62e",
            ],
            [
              "d",
              "M32 62c11.1 0 20.8-6 26-15H6c5.3 9 14.9 15 26 15",
              "fill",
              "#ed4c5c",
            ],
            [1, "flex"],
            [
              "xmlns",
              "http://www.w3.org/2000/svg",
              "fill",
              "#000000",
              "width",
              "14px",
              "height",
              "14px",
              "viewBox",
              "0 0 22 22",
              "id",
              "memory-menu-down-fill",
              1,
              "fill-current",
              "text-blacks",
              "dark:text-whites",
            ],
            [
              "d",
              "M17 9V8H5V9H6V10H7V11H8V12H9V13H10V14H12V13H13V12H14V11H15V10H16V9",
            ],
            [
              "version",
              "1.1",
              "id",
              "Capa_1",
              "xmlns",
              "http://www.w3.org/2000/svg",
              0,
              "xmlns",
              "xlink",
              "http://www.w3.org/1999/xlink",
              "viewBox",
              "0 0 473.677 473.677",
              0,
              "xml",
              "space",
              "preserve",
              1,
              "w-8",
              "h-8",
            ],
            [
              "x",
              "1.068",
              "y",
              "258.99",
              "width",
              "471.56",
              "height",
              "0.007",
              2,
              "fill",
              "#c42126",
            ],
            [
              "x",
              "25.629",
              "y",
              "129.7",
              "width",
              "422.42",
              "height",
              "0.007",
              2,
              "fill",
              "#c42126",
            ],
            [
              "x",
              "8.831",
              "y",
              "172.79",
              "width",
              "456",
              "height",
              "0.007",
              2,
              "fill",
              "#c42126",
            ],
            [
              "points",
              "101.793,431.36 371.888,431.36 371.902,431.345 101.778,431.345 \t",
              2,
              "fill",
              "#c42126",
            ],
            [
              "d",
              "M236.837,0c-4.652,0-9.267,0.168-13.848,0.43h27.699C246.103,0.168,241.489,0,236.837,0z",
              2,
              "fill",
              "#c42126",
            ],
            [
              "x",
              "0.978",
              "y",
              "215.89",
              "width",
              "471.71",
              "height",
              "0.007",
              2,
              "fill",
              "#c42126",
            ],
            [
              "d",
              "M306.838,86.609H419.93c-13.433-16.353-29.045-30.829-46.341-43.084h-84.922\n\tC295.694,55.888,301.737,70.476,306.838,86.609z",
              2,
              "fill",
              "#e7e7e7",
            ],
            [
              "d",
              "M288.667,43.525h84.922C338.482,18.646,296.333,3.066,250.688,0.43h-7.292\n\tC264.88,3.134,274.748,19.034,288.667,43.525z",
              2,
              "fill",
              "#dc3027",
            ],
            [
              "d",
              "M464.846,172.794c-4.211-15.018-9.858-29.427-16.798-43.084H317.94\n\tc2.636,13.833,4.716,28.282,6.256,43.084H464.846z",
              2,
              "fill",
              "#e7e7e7",
            ],
            [
              "d",
              "M310.622,129.703h137.422c-7.831-15.403-17.239-29.857-28.114-43.091H299.886\n\tC304.119,100.011,307.713,114.465,310.622,129.703z",
              2,
              "fill",
              "#dc3027",
            ],
            [
              "d",
              "M329.178,258.98h143.431c0.681-7.288,1.066-14.674,1.066-22.138c0-7.064-0.37-14.038-0.976-20.949\n\tH329.212C329.679,230.223,329.671,244.658,329.178,258.98z",
              2,
              "fill",
              "#e7e7e7",
            ],
            [
              "d",
              "M472.703,215.886c-1.298-14.798-3.964-29.195-7.857-43.084H318.154\n\tc1.473,14.109,2.446,28.544,2.921,43.084H472.703z",
              2,
              "fill",
              "#dc3027",
            ],
            [
              "d",
              "M315.465,345.166h131.962c7.038-13.642,12.774-28.062,17.075-43.091H321.845\n\tC320.274,316.899,318.142,331.345,315.465,345.166z",
              2,
              "fill",
              "#e7e7e7",
            ],
            [
              "d",
              "M464.506,302.072c3.975-13.885,6.735-28.282,8.107-43.084H324.709\n\tc-0.505,14.551-1.507,28.982-3.01,43.084L464.506,302.072L464.506,302.072z",
              2,
              "fill",
              "#dc3027",
            ],
            [
              "d",
              "M371.902,431.345c17.546-12.206,33.379-26.697,47.025-43.084H307.806\n\tc-5.194,16.2-11.361,30.765-18.515,43.084L371.902,431.345L371.902,431.345z",
              2,
              "fill",
              "#e7e7e7",
            ],
            [
              "d",
              "M303.625,388.258h115.302c11.002-13.219,20.553-27.673,28.499-43.091h-132.93\n\t\tC311.546,360.416,307.915,374.877,303.625,388.258z",
              2,
              "fill",
              "#dc3027",
            ],
            [
              "d",
              "M228.254,473.509c-0.479-0.015-0.957-0.037-1.436-0.052\n\t\tC227.297,473.471,227.776,473.494,228.254,473.509z",
              2,
              "fill",
              "#dc3027",
            ],
            [
              "d",
              "M236.837,473.677c50.211,0,96.735-15.673,135.051-42.317h-85.715\n\t\tC270.96,457.57,260.923,473.677,236.837,473.677z",
              2,
              "fill",
              "#dc3027",
            ],
            [
              "d",
              "M236.837,473.677c-2.876,0-5.733-0.067-8.582-0.168C231.134,473.606,233.994,473.677,236.837,473.677\n\tz",
              2,
              "fill",
              "#c42126",
            ],
            [
              "d",
              "M296.509,43.525H100.092C82.793,55.78,67.184,70.255,53.747,86.609h260.929\n\tC309.575,70.476,303.536,55.888,296.509,43.525z",
              2,
              "fill",
              "#f3f4f5",
            ],
            [
              "d",
              "M100.092,43.525h196.417C282.587,19.034,264.88,3.134,243.396,0.43h-20.407\n\tC177.344,3.066,135.195,18.646,100.092,43.525z",
              2,
              "fill",
              "#e73625",
            ],
            [
              "d",
              "M8.835,172.794h322.83c-1.541-14.805-3.62-29.251-6.256-43.084H25.633\n\tC18.692,143.368,13.046,157.776,8.835,172.794z",
              2,
              "fill",
              "#f3f4f5",
            ],
            [
              "d",
              "M53.747,86.609C42.88,99.843,33.464,114.296,25.637,129.7h299.772\n\tc-2.906-15.235-6.499-29.688-10.733-43.091C314.676,86.609,53.747,86.609,53.747,86.609z",
              2,
              "fill",
              "#e73625",
            ],
            [
              "d",
              "M0.002,236.842c0,7.464,0.389,14.85,1.066,22.138h333.491c0.494-14.323,0.501-28.754,0.034-43.084\n\tH0.978C0.372,222.804,0.002,229.778,0.002,236.842z",
              2,
              "fill",
              "#f3f4f5",
            ],
            [
              "d",
              "M0.978,215.886h333.611c-0.475-14.543-1.451-28.974-2.921-43.084H8.831\n\tC4.938,186.694,2.272,201.088,0.978,215.886z",
              2,
              "fill",
              "#e73625",
            ],
            [
              "d",
              "M331.549,302.072H9.175c4.301,15.033,10.041,29.449,17.075,43.091h298.919\n\tC327.847,331.345,329.974,316.899,331.549,302.072z",
              2,
              "fill",
              "#f3f4f5",
            ],
            [
              "d",
              "M9.175,302.072h322.374c1.5-14.102,2.505-28.537,3.01-43.084H1.068\n\tC2.44,273.793,5.204,288.187,9.175,302.072z",
              2,
              "fill",
              "#e73625",
            ],
            [
              "d",
              "M101.778,431.345h194.009c7.154-12.322,13.324-26.884,18.515-43.084H54.753\n\tC68.399,404.648,84.228,419.139,101.778,431.345z",
              2,
              "fill",
              "#f3f4f5",
            ],
            [
              "d",
              "M26.254,345.166c7.947,15.418,17.497,29.872,28.499,43.091h259.549\n\t\tc4.286-13.38,7.917-27.841,10.867-43.091H26.254z",
              2,
              "fill",
              "#e73625",
            ],
            [
              "d",
              "M226.818,473.456c0.479,0.015,0.957,0.037,1.436,0.052c2.85,0.101,5.707,0.168,8.582,0.168\n\t\tc24.087,0,43.727-16.106,58.943-42.317H101.793C137.54,456.221,180.448,471.523,226.818,473.456z",
              2,
              "fill",
              "#e73625",
            ],
            [
              "d",
              "M231.941,0.123C110.574,2.592,11.654,96.301,1.008,215.5h230.937V0.123H231.941z",
              2,
              "fill",
              "#283991",
            ],
            [
              "points",
              "47.39,134.187 50.998,145.297 62.688,145.297 53.231,152.167 56.843,163.285 47.39,156.411 \n\t\t37.94,163.285 41.545,152.167 32.091,145.297 43.781,145.297 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "47.39,173.438 50.998,184.555 62.688,184.555 53.231,191.425 56.843,202.543 47.39,195.669 \n\t\t37.94,202.543 41.545,191.425 32.091,184.555 43.781,184.555 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "86.648,75.296 90.257,86.41 101.943,86.41 92.489,93.284 96.098,104.394 86.648,97.528 \n\t\t77.194,104.394 80.803,93.284 71.345,86.41 83.035,86.41 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "86.648,114.554 90.257,125.668 101.943,125.668 92.489,132.534 96.098,143.652 \n\t\t86.648,136.786 77.194,143.652 80.803,132.534 71.345,125.668 83.035,125.668 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "86.648,153.812 90.257,164.93 101.943,164.93 92.489,171.792 96.098,182.91 86.648,176.037 \n\t\t77.194,182.91 80.803,171.792 71.345,164.93 83.035,164.93 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "d",
              "M17.585,182.91l-3.612-11.118l9.454-6.866H11.744l-0.262-0.811\n\t\tc-1.283,3.968-2.442,7.984-3.511,12.045l0.165-0.123L17.585,182.91z",
              2,
              "fill",
              "#efefef",
            ],
            [
              "d",
              "M37.94,124.027l9.45-6.873l9.454,6.873l-3.612-11.118l9.454-6.873h-11.69l-3.609-11.11l-3.609,11.11\n\t\tH39.47c-0.8,1.212-1.574,2.431-2.352,3.661l4.428,3.212L37.94,124.027z",
              2,
              "fill",
              "#efefef",
            ],
            [
              "d",
              "M86.648,58.27l9.45,6.866l-3.609-11.11l9.45-6.873h-6.75c-5.733,4.286-11.264,8.822-16.578,13.608\n\t\tl-1.425,4.375L86.648,58.27z",
              2,
              "fill",
              "#efefef",
            ],
            [
              "d",
              "M116.452,45.511l9.454-6.873l9.45,6.873l-3.609-11.118l9.45-6.866h-11.686l-0.49-1.496\n\t\tc-3.96,2.023-7.879,4.128-11.709,6.368l2.745,1.993L116.452,45.511z",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "125.906,55.671 129.515,66.778 141.201,66.778 131.747,73.651 135.356,84.769 \n\t\t125.906,77.895 116.452,84.769 120.061,73.651 110.604,66.778 122.293,66.778 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "125.906,94.929 129.515,106.036 141.201,106.036 131.747,112.909 135.356,124.027 \n\t\t125.906,117.153 116.452,124.027 120.061,112.909 110.604,106.036 122.293,106.036 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "125.906,134.187 129.515,145.297 141.201,145.297 131.747,152.167 135.356,163.285 \n\t\t125.906,156.411 116.452,163.285 120.061,152.167 110.604,145.297 122.293,145.297 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "125.906,173.438 129.515,184.555 141.201,184.555 131.747,191.425 135.356,202.543 \n\t\t125.906,195.669 116.452,202.543 120.061,191.425 110.604,184.555 122.293,184.555 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "165.164,36.038 168.773,47.152 180.459,47.152 171.009,54.026 174.614,65.136 \n\t\t165.164,58.27 155.707,65.136 159.319,54.026 149.862,47.152 161.551,47.152 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "165.164,75.296 168.773,86.41 180.459,86.41 171.009,93.284 174.614,104.394 \n\t\t165.164,97.528 155.707,104.394 159.319,93.284 149.862,86.41 161.551,86.41 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "165.164,114.554 168.773,125.668 180.459,125.668 171.009,132.534 174.614,143.652 \n\t\t165.164,136.786 155.707,143.652 159.319,132.534 149.862,125.668 161.551,125.668 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "165.164,153.812 168.773,164.93 180.459,164.93 171.009,171.792 174.614,182.91 \n\t\t165.164,176.037 155.707,182.91 159.319,171.792 149.862,164.93 161.551,164.93 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "204.422,16.413 208.031,27.527 219.717,27.527 210.263,34.393 213.872,45.511 \n\t\t204.422,38.637 194.965,45.511 198.577,34.393 189.12,27.527 200.806,27.527 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "204.422,55.671 208.031,66.778 219.717,66.778 210.263,73.651 213.872,84.769 \n\t\t204.422,77.895 194.965,84.769 198.577,73.651 189.12,66.778 200.806,66.778 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "204.422,94.929 208.031,106.036 219.717,106.036 210.263,112.909 213.872,124.027 \n\t\t204.422,117.153 194.965,124.027 198.577,112.909 189.12,106.036 200.806,106.036 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "204.422,134.187 208.031,145.297 219.717,145.297 210.263,152.167 213.872,163.285 \n\t\t204.422,156.411 194.965,163.285 198.577,152.167 189.12,145.297 200.806,145.297 \t",
              2,
              "fill",
              "#efefef",
            ],
            [
              "points",
              "204.422,173.438 208.031,184.555 219.717,184.555 210.263,191.425 213.872,202.543 \n\t\t204.422,195.669 194.965,202.543 198.577,191.425 189.12,184.555 200.806,184.555 \t",
              2,
              "fill",
              "#efefef",
            ],
            [1, "flex", "space-x-2", "items-center"],
            [1, "hidden", "lg:flex"],
            [1, "lg:hidden"],
            [
              "xmlns",
              "http://www.w3.org/2000/svg",
              "fill",
              "#000000",
              "width",
              "18px",
              "height",
              "18px",
              "viewBox",
              "0 0 22 22",
              "id",
              "memory-menu-down-fill",
              1,
              "fill-current",
              "text-blacks",
              "dark:text-whites",
            ],
            [1, "flex", "space-x-4", "items-center"],
          ],
          template: function (t, n) {
            1 & t &&
              (p(0, "nav", 0)(1, "a", 1),
              V(),
              p(2, "svg", 2),
              b(3, "path", 3),
              m()(),
              pe(),
              p(4, "a", 4),
              V(),
              p(5, "svg", 2),
              b(6, "path", 5),
              m()(),
              pe(),
              p(7, "button", 6),
              Rt("click", function () {
                return n.toggleDarkMode();
              }),
              V(),
              p(8, "svg", 7),
              b(9, "g", 8)(10, "g", 9),
              p(11, "g", 10),
              b(12, "path", 11),
              m()()(),
              pe(),
              p(13, "a", 12),
              V(),
              p(14, "svg", 2),
              b(15, "path", 13),
              m()(),
              pe(),
              p(16, "a", 14),
              V(),
              p(17, "svg", 15),
              b(18, "path", 16)(19, "path", 17)(20, "path", 18)(21, "path", 19),
              m()(),
              pe(),
              p(22, "button", 20),
              Rt("click", function () {
                return n.toogleLanguage();
              }),
              N(23, Xb, 10, 0, "span", 21),
              N(24, eE, 64, 0, "div", 21),
              m()(),
              p(25, "header")(26, "nav", 22)(27, "div", 23),
              b(28, "img", 24)(29, "img", 25)(30, "img", 26)(31, "img", 27),
              m(),
              p(32, "div", 28)(33, "a", 29),
              E(34),
              m(),
              p(35, "a", 30),
              E(36),
              m(),
              p(37, "a", 31),
              E(38),
              m(),
              p(39, "a", 32),
              E(40),
              m()(),
              p(41, "div", 33)(42, "div", 34)(43, "button", 35),
              Rt("click", function () {
                return n.toggleDarkMode();
              }),
              V(),
              p(44, "svg", 36),
              b(45, "g", 8)(46, "g", 9),
              p(47, "g", 10),
              b(48, "path", 37),
              m()()()(),
              pe(),
              p(49, "button", 38),
              Rt("click", function () {
                return n.toogleLanguage();
              }),
              N(50, tE, 12, 0, "span", 39),
              N(51, nE, 66, 0, "div", 40),
              m()()()()),
              2 & t &&
                (A(23),
                _("ngIf", n.esp),
                A(1),
                _("ngIf", n.eng),
                A(10),
                Eo(n.aboutMe),
                A(2),
                Eo(n.projects),
                A(2),
                Eo(n.tools),
                A(2),
                Eo(n.contact),
                A(10),
                _("ngIf", n.esp),
                A(1),
                _("ngIf", n.eng));
          },
          dependencies: [Jn],
        }));
      class Ho {
        constructor() {
          (this.size = ""), (this.sizeIcon = "");
        }
        get sizes() {
          return { "lg:w-56 lg:h-16 lg:text-xl": "large" === this.size };
        }
        get sizesIcon() {
          return { "lg:w-12 lg:h-12": "large" === this.sizeIcon };
        }
      }
      function sE(e, t) {
        1 & e && (p(0, "p", 13), E(1, " Frontend Developer Jr "), m());
      }
      function aE(e, t) {
        1 & e && (p(0, "p", 13), E(1, " Desarollador Frontend Jr "), m());
      }
      function lE(e, t) {
        1 & e &&
          (p(0, "p", 14),
          E(
            1,
            " |Angular| |React/Next.js| |CSS/SASS, Tailwind| |TypeScript| Microservices |Node.js| |Java/Spring Boot| |MySQL| "
          ),
          m());
      }
      function uE(e, t) {
        1 & e &&
          (p(0, "p", 14),
          E(
            1,
            " |Angular| |React/Next.js| |CSS/SASS, Tailwind| |TypeScript| Micro servicios |Node.js| |Java/Spring Boot| |MySQL| "
          ),
          m());
      }
      function cE(e, t) {
        1 & e &&
          (p(0, "p", 15),
          E(
            1,
            " Telecommunications Engineer with more than 1 year of experience in front-end development, responsive layout, microservices, use of GIT versioning, integration with APIs and REST Webservices and mobile development under Scrum methodologies. "
          ),
          m());
      }
      function dE(e, t) {
        1 & e &&
          (p(0, "p", 15),
          E(
            1,
            " Ingeniero en Telecomunicaciones con mas de 1 a\xf1o de experiencia en desarrollo front-end, maquetaci\xf3n responsive, micro servicios, uso de versiona miento GIT, integracion con APIs y Webservices REST y desarrollo m\xf3vil bajo metodologias Scrum. "
          ),
          m());
      }
      function fE(e, t) {
        1 & e && (V(), pe(), p(0, "app-btn", 16), E(1, " Resume "), m()),
          2 & e &&
            _("icons", "resume")("size", "large")("sizeIcon", "large")(
              "urlPage",
              "./assets/Mateo Gonzalez Amortegui CV.pdf"
            );
      }
      function hE(e, t) {
        1 & e && (V(), pe(), p(0, "app-btn", 16), E(1, " Hoja de vida "), m()),
          2 & e &&
            _("icons", "resume")("size", "large")("sizeIcon", "large")(
              "urlPage",
              "./assets/Mateo Gonzalez Amortegui HV.pdf"
            );
      }
      (Ho.ɵfac = function (t) {
        return new (t || Ho)();
      }),
        (Ho.ɵcmp = Zt({
          type: Ho,
          selectors: [["app-btn"]],
          inputs: {
            icons: "icons",
            size: "size",
            sizeIcon: "sizeIcon",
            urlPage: "urlPage",
          },
          ngContentSelectors: ["*"],
          decls: 5,
          vars: 4,
          consts: [
            [
              1,
              "h-12",
              "cursor-pointer",
              "flex",
              "justify-evenly",
              "items-center",
              "rounded-xl",
              "p-4",
              "w-44",
              "space-x-2",
              "bg-gradient-to-r",
              "from-cyan-500",
              "to-blue-500",
              "hover:bg-gradient-to-bl",
              "focus:ring-4",
              "focus:outline-none",
              "focus:ring-cyan-300",
              "dark:bg-gradient-to-br",
              "dark:from-purple-600",
              "dark:to-blue-500",
              "dark:hover:bg-gradient-to-bl",
              "dark:focus:ring-4",
              "dark:focus:outline-none",
              "dark:focus:ring-blue-800",
              "effect_button",
              3,
              "href",
              "ngClass",
            ],
            [1, "font-bold", "text-whites", "lg:font-extrabold"],
            [4, "ngIf"],
            [
              "version",
              "1.1",
              "id",
              "_x32_",
              "xmlns",
              "http://www.w3.org/2000/svg",
              0,
              "xmlns",
              "xlink",
              "http://www.w3.org/1999/xlink",
              "width",
              "20px",
              "height",
              "20px",
              "viewBox",
              "0 0 512 512",
              0,
              "xml",
              "space",
              "preserve",
            ],
            [
              "d",
              "M127.083,247.824l50.031-76.906c0,0-74.734-29.688-109.547-3.078C32.755,194.465,0.005,268.184,0.005,268.184\n          l37.109,21.516C37.114,289.699,84.083,198.684,127.083,247.824z",
              1,
              "st0",
              "fill-current",
              "text-whites",
            ],
            [
              "d",
              "M264.177,384.918l76.906-50.031c0,0,29.688,74.734,3.078,109.547\n          c-26.625,34.797-100.344,67.563-100.344,67.563l-21.5-37.109C222.317,474.887,313.333,427.918,264.177,384.918z",
              1,
              "st0",
              "fill-current",
              "text-whites",
            ],
            [
              "d",
              "M206.692,362.887l-13.203-13.188c-24,62.375-80.375,49.188-80.375,49.188s-13.188-56.375,49.188-80.375\n          l-13.188-13.188c-34.797-6-79.188,35.984-86.391,76.766c-7.188,40.781-8.391,75.563-8.391,75.563s34.781-1.188,75.578-8.391\n          S212.692,397.684,206.692,362.887z",
              1,
              "st0",
              "fill-current",
              "text-whites",
            ],
            [
              "d",
              "M505.224,6.777C450.786-18.738,312.927,28.98,236.255,130.668c-58.422,77.453-89.688,129.641-89.688,129.641\n          l46.406,46.406l12.313,12.313l46.391,46.391c0,0,52.219-31.25,129.672-89.656C483.005,199.074,530.739,61.215,505.224,6.777z\n          M274.63,237.371c-12.813-12.813-12.813-33.594,0-46.406s33.578-12.813,46.406,0.016c12.813,12.813,12.813,33.578,0,46.391\n          C308.208,250.184,287.442,250.184,274.63,237.371z M351.552,160.465c-16.563-16.578-16.563-43.422,0-59.984\n          c16.547-16.563,43.406-16.563,59.969,0s16.563,43.406,0,59.984C394.958,177.012,368.099,177.012,351.552,160.465z",
              1,
              "st0",
              "fill-current",
              "text-whites",
            ],
            [
              "fill",
              "#000000",
              "viewBox",
              "0 0 846.66 846.66",
              "version",
              "1.1",
              0,
              "xml",
              "space",
              "preserve",
              "xmlns",
              "http://www.w3.org/2000/svg",
              0,
              "xmlns",
              "xlink",
              "http://www.w3.org/1999/xlink",
              "width",
              "30px",
              "height",
              "30px",
              2,
              "shape-rendering",
              "geometricPrecision",
              "text-rendering",
              "geometricPrecision",
              "image-rendering",
              "optimizeQuality",
              "fill-rule",
              "evenodd",
              "clip-rule",
              "evenodd",
              3,
              "ngClass",
            ],
            ["id", "Layer_x0020_1"],
            [
              "d",
              "M30.88 111.05l784.9 0c11.4,0 20.64,9.24 20.64,20.64l0 583.28c0,11.4 -9.24,20.64 -20.64,20.64l-784.9 0c-11.4,0 -20.64,-9.24 -20.64,-20.64l0 -583.28c0,-11.4 9.24,-20.64 20.64,-20.64zm146.05 288.17c0,27.16 -41.29,27.16 -41.29,0 0,-32.49 15.12,-63.05 40.68,-82.92 -1.61,-2.27 -3.11,-4.62 -4.48,-7.04 -6.45,-11.45 -10.12,-24.63 -10.12,-38.63 0,-43.57 35.32,-78.89 78.89,-78.89 43.56,0 78.89,35.32 78.89,78.89 0,16.39 -5.09,32.34 -14.61,45.67 25.57,19.87 40.69,50.43 40.69,82.92 0,27.16 -41.29,27.16 -41.29,0 0,-23.44 -12.59,-44.7 -33.14,-55.92 -9.59,4.06 -20.13,6.22 -30.54,6.22 -10.41,0 -20.96,-2.16 -30.55,-6.22 -20.54,11.22 -33.13,32.48 -33.13,55.92zm-55.14 91.99l237.63 0c11.4,0 20.65,9.25 20.65,20.65l0 122.41c0,11.4 -9.25,20.65 -20.65,20.65l-237.63 0c-11.4,0 -20.64,-9.25 -20.64,-20.65l0 -122.41c0,-11.4 9.24,-20.65 20.64,-20.65zm216.99 41.29l-196.34 0 0 81.13 196.34 0 0 -81.13zm-98.17 -299.47c-20.77,0 -37.6,16.83 -37.6,37.6 0,21.09 16.9,37.6 37.6,37.6 20.72,0 37.6,-16.69 37.6,-37.6 0,-20.77 -16.84,-37.6 -37.6,-37.6zm183.62 29.12c-27.15,0 -27.15,-41.29 0,-41.29l300.64 0c27.15,0 27.15,41.29 0,41.29l-300.64 0zm46.81 363.65c-27.16,0 -27.16,-41.3 0,-41.3l253.83 0c27.15,0 27.15,41.3 0,41.3l-253.83 0zm-46.81 -272.74c-27.15,0 -27.15,-41.29 0,-41.29l300.64 0c27.15,0 27.15,41.29 0,41.29l-300.64 0zm46.81 90.91c-27.16,0 -27.16,-41.29 0,-41.29l253.83 0c27.15,0 27.15,41.29 0,41.29l-253.83 0zm0 90.92c-27.16,0 -27.16,-41.3 0,-41.3l253.83 0c27.15,0 27.15,41.3 0,41.3l-253.83 0zm324.09 -382.55l-743.6 0 0 541.98 743.6 0 0 -541.98z",
              1,
              "fil0",
              "fill-current",
              "text-whites",
              "w-",
            ],
          ],
          template: function (t, n) {
            1 & t &&
              ((function cp(e) {
                const t = D()[16][6];
                if (!t.projection) {
                  const r = (t.projection = ii(e ? e.length : 1, null)),
                    o = r.slice();
                  let i = t.child;
                  for (; null !== i; ) {
                    const s = e ? cy(i, e) : 0;
                    null !== s &&
                      (o[s] ? (o[s].projectionNext = i) : (r[s] = i),
                      (o[s] = i)),
                      (i = i.next);
                  }
                }
              })(),
              p(0, "a", 0)(1, "div", 1),
              (function dp(e, t = 0, n) {
                const r = D(),
                  o = he(),
                  i = ho(o, 22 + e, 16, null, n || null);
                null === i.projection && (i.projection = t),
                  Ml(),
                  32 != (32 & i.flags) &&
                    (function A4(e, t, n) {
                      kh(
                        t[11],
                        0,
                        t,
                        n,
                        Sh(e, n, t),
                        xh(n.parent || t[6], n, t)
                      );
                    })(o, r, i);
              })(2),
              m(),
              N(3, rE, 7, 0, "div", 2),
              N(4, oE, 4, 1, "div", 2),
              m()),
              2 & t &&
                (_("href", n.urlPage, Mr)("ngClass", n.sizes),
                A(3),
                _("ngIf", "rocket" === n.icons),
                A(1),
                _("ngIf", "resume" === n.icons));
          },
          dependencies: [ka, Jn],
          encapsulation: 2,
        }));
      class is {
        constructor(t) {
          (this.idiom = t), (this.language$ = this.idiom.language$);
        }
      }
      function pE(e, t) {
        if ((1 & e && (p(0, "div"), b(1, "img", 19), m()), 2 & e)) {
          const n = Et();
          A(1), _("src", n.img1, Mr);
        }
      }
      function gE(e, t) {
        if ((1 & e && (p(0, "div"), b(1, "img", 19), m()), 2 & e)) {
          const n = Et();
          A(1), _("src", n.img2, Mr);
        }
      }
      function mE(e, t) {
        if ((1 & e && (p(0, "div"), b(1, "img", 19), m()), 2 & e)) {
          const n = Et();
          A(1), _("src", n.img3, Mr);
        }
      }
      function yE(e, t) {
        1 & e &&
          (p(0, "span"),
          V(),
          p(1, "svg", 20),
          b(2, "path", 21)(3, "path", 22)(4, "path", 23),
          m()());
      }
      function vE(e, t) {
        1 & e &&
          (p(0, "span"),
          V(),
          p(1, "svg", 24)(2, "title"),
          E(3, "file_type_tailwind"),
          m(),
          b(4, "path", 25),
          m()());
      }
      function DE(e, t) {
        1 & e &&
          (p(0, "span"),
          V(),
          p(1, "svg", 26),
          b(2, "rect", 27)(3, "path", 28),
          m()());
      }
      function CE(e, t) {
        1 & e &&
          (p(0, "span"),
          V(),
          p(1, "svg", 20),
          b(2, "path", 29)(3, "path", 30)(4, "path", 31),
          m()());
      }
      function wE(e, t) {
        1 & e &&
          (p(0, "span"),
          V(),
          p(1, "svg", 20),
          b(2, "path", 32)(3, "path", 33)(4, "path", 34),
          m()());
      }
      function _E(e, t) {
        1 & e &&
          (p(0, "span"),
          V(),
          p(1, "svg", 35)(2, "g"),
          b(3, "path", 36),
          m()()());
      }
      function bE(e, t) {
        1 & e &&
          (p(0, "span"),
          V(),
          p(1, "svg", 24)(2, "title"),
          E(3, "file_type_sass"),
          m(),
          b(4, "path", 37),
          m()());
      }
      function EE(e, t) {
        1 & e &&
          (p(0, "span"),
          V(),
          p(1, "svg", 38),
          b(2, "rect", 39)(3, "path", 40),
          m()());
      }
      function SE(e, t) {
        if (
          (1 & e && (V(), pe(), p(0, "app-btn", 41), E(1, "Watch page!"), m()),
          2 & e)
        ) {
          const n = Et();
          _("icons", "rocket")("urlPage", n.urlPageGithub);
        }
      }
      function IE(e, t) {
        if (
          (1 & e && (V(), pe(), p(0, "app-btn", 41), E(1, "Ver pagina!"), m()),
          2 & e)
        ) {
          const n = Et();
          _("icons", "rocket")("urlPage", n.urlPageGithub);
        }
      }
      (is.ɵfac = function (t) {
        return new (t || is)(P(nn));
      }),
        (is.ɵcmp = Zt({
          type: is,
          selectors: [["app-hero"]],
          decls: 28,
          vars: 24,
          consts: [
            [
              "id",
              "aboutMe",
              1,
              "w-fill",
              "h-48",
              "drop-shadow-md",
              "bg-hero",
              "bg-cover",
              "flex",
              "rounded-b-md",
              "md:h-[31rem]",
              "md:items-center",
              "md:rounded-none",
              "lg:h-[44rem]",
            ],
            [
              "data-aos",
              "fade-down",
              "data-aos-easing",
              "linear",
              "data-aos-duration",
              "1500",
              1,
              "w-11/12",
              "grid",
              "grid-cols-1",
              "place-items-center",
              "absolute",
              "top-16",
              "left-0",
              "right-0",
              "my-0",
              "mx-auto",
              "space-y-3",
              "md:static",
              "md:grid-cols-2",
              "lg:grid-cols-1",
            ],
            [
              1,
              "w-48",
              "h-48",
              "rounded-full",
              "drop-shadow-md",
              "bg-photo",
              "bg-cover",
              "lg:h-72",
              "lg:w-72",
            ],
            [1, "text-center", "space-y-3"],
            [
              1,
              "text-blacks",
              "font-bold",
              "text-2xl",
              "drop-shadow-lg",
              "md:text-whites",
              "md:font-extrabold",
              "md:drop-shadow-xl",
              "md:text-3xl",
              "lg:font-black",
              "dark:text-Blues",
            ],
            [
              "class",
              "text-Gray2 text-lg font-medium drop-shadow-md md:text-Gray1 md:text-xl md:font-semibold md:drop-shadow-lg lg:text-2xl lg:font-extrabold",
              4,
              "ngIf",
            ],
            [
              "class",
              "text-Gray4 text-sm font-normal drop-shadow-sm md:text-Gray1 md:text-base md:font-medium lg:text-lg lg:font-semibold dark:text-Blues",
              4,
              "ngIf",
            ],
            [
              "class",
              "text-blacks text-base font-light text-justify md:text-whites md:font-medium lg:drop-shadow-xl lg:text-xl lg:font-extrabold",
              4,
              "ngIf",
            ],
            [
              1,
              "flex",
              "justify-evenly",
              "pt-4",
              "space-x-4",
              "md:pt-2",
              "drop-shadow-md",
            ],
            [
              "href",
              "https://github.com/MateoGonzalezAmortegui",
              1,
              "effect_button",
            ],
            [
              "fill",
              "#000000",
              "width",
              "48px",
              "height",
              "48px",
              "viewBox",
              "0 0 32 32",
              "version",
              "1.1",
              "xmlns",
              "http://www.w3.org/2000/svg",
              1,
              "lg:w-20",
              "lg:h-20",
            ],
            [
              "d",
              "M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z",
              1,
              "fill-current",
              "md:text-whites",
            ],
            [3, "icons", "size", "sizeIcon", "urlPage", 4, "ngIf"],
            [
              1,
              "text-Gray2",
              "text-lg",
              "font-medium",
              "drop-shadow-md",
              "md:text-Gray1",
              "md:text-xl",
              "md:font-semibold",
              "md:drop-shadow-lg",
              "lg:text-2xl",
              "lg:font-extrabold",
            ],
            [
              1,
              "text-Gray4",
              "text-sm",
              "font-normal",
              "drop-shadow-sm",
              "md:text-Gray1",
              "md:text-base",
              "md:font-medium",
              "lg:text-lg",
              "lg:font-semibold",
              "dark:text-Blues",
            ],
            [
              1,
              "text-blacks",
              "text-base",
              "font-light",
              "text-justify",
              "md:text-whites",
              "md:font-medium",
              "lg:drop-shadow-xl",
              "lg:text-xl",
              "lg:font-extrabold",
            ],
            [3, "icons", "size", "sizeIcon", "urlPage"],
          ],
          template: function (t, n) {
            1 & t &&
              (p(0, "section", 0)(1, "article", 1),
              b(2, "div", 2),
              p(3, "div", 3)(4, "h1", 4),
              E(5, " Mateo Gonzalez Amortegui "),
              m(),
              N(6, sE, 2, 0, "p", 5),
              oe(7, "async"),
              N(8, aE, 2, 0, "p", 5),
              oe(9, "async"),
              N(10, lE, 2, 0, "p", 6),
              oe(11, "async"),
              N(12, uE, 2, 0, "p", 6),
              oe(13, "async"),
              N(14, cE, 2, 0, "p", 7),
              oe(15, "async"),
              N(16, dE, 2, 0, "p", 7),
              oe(17, "async"),
              p(18, "div", 8)(19, "a", 9),
              V(),
              p(20, "svg", 10)(21, "title"),
              E(22, "github"),
              m(),
              b(23, "path", 11),
              m()(),
              N(24, fE, 2, 4, "app-btn", 12),
              oe(25, "async"),
              N(26, hE, 2, 4, "app-btn", 12),
              oe(27, "async"),
              m()()()()),
              2 & t &&
                (A(6),
                _("ngIf", !ie(7, 8, n.language$)),
                A(2),
                _("ngIf", ie(9, 10, n.language$)),
                A(2),
                _("ngIf", !ie(11, 12, n.language$)),
                A(2),
                _("ngIf", ie(13, 14, n.language$)),
                A(2),
                _("ngIf", !ie(15, 16, n.language$)),
                A(2),
                _("ngIf", ie(17, 18, n.language$)),
                A(8),
                _("ngIf", !ie(25, 20, n.language$)),
                A(2),
                _("ngIf", ie(27, 22, n.language$)));
          },
          dependencies: [Jn, Ho, Or],
        }));
      class ss {
        constructor(t) {
          (this.idiom = t),
            (this.page = 1),
            (this.language$ = this.idiom.language$);
        }
        backPage() {
          (this.page -= 1), this.page <= 0 && (this.page = 1);
        }
        nextPage() {
          (this.page += 1), this.page >= 3 && (this.page = 3);
        }
      }
      function ME(e, t) {
        1 & e && (p(0, "p", 10), E(1, " MY PROJECTS "), m());
      }
      function TE(e, t) {
        1 & e && (p(0, "p", 10), E(1, " MIS PROYECTOS "), m());
      }
      function xE(e, t) {
        1 & e && b(0, "app-cards", 11),
          2 & e &&
            _(
              "img1",
              "./assets/images/angularStore/Captura de pantalla_20230206_053158.png"
            )(
              "img2",
              "./assets/images/angularStore/Captura de pantalla_20230206_053239.png"
            )(
              "img3",
              "./assets/images/angularStore/Captura de pantalla_20230206_053225.png"
            )("tittle", "Angular Store")(
              "description",
              "Was create for a ECommerce page interactive with all information about the products, category\xb4s, product detail and with interaction in all website !! Was implementing so that was: Responsive design"
            )("toolsHtml", !0)("toolsScss", !0)("toolsTypejs", !0)(
              "toolsAngular",
              !0
            )(
              "github",
              "https://github.com/MateoGonzalezAmortegui/Angular-Store"
            )(
              "urlPageGithub",
              "https://63af13f06fc0c508ae1f5f60--idyllic-profiterole-21cd83.netlify.app/home"
            );
      }
      function AE(e, t) {
        1 & e && b(0, "app-cards", 11),
          2 & e &&
            _(
              "img1",
              "./assets/images/angularStore/Captura de pantalla_20230206_053158.png"
            )(
              "img2",
              "./assets/images/angularStore/Captura de pantalla_20230206_053239.png"
            )(
              "img3",
              "./assets/images/angularStore/Captura de pantalla_20230206_053225.png"
            )("tittle", "Angular Store")(
              "description",
              "\xa1Fue creado para una p\xe1gina de comercio electr\xf3nico interactivo con toda la informaci\xf3n acerca de los productos, categor\xedas, detalles del producto y con la interacci\xf3n en todo el sitio web! Estaba implementando por lo que fue: Dise\xf1o responsivo"
            )("toolsHtml", !0)("toolsScss", !0)("toolsTypejs", !0)(
              "toolsAngular",
              !0
            )(
              "github",
              "https://github.com/MateoGonzalezAmortegui/Angular-Store"
            )(
              "urlPageGithub",
              "https://63af13f06fc0c508ae1f5f60--idyllic-profiterole-21cd83.netlify.app/home"
            );
      }
      function RE(e, t) {
        1 & e && b(0, "app-cards", 12),
          2 & e &&
            _(
              "img1",
              "./assets/images/portfolio/Captura de pantalla_20230219_034005.png"
            )(
              "img2",
              "./assets/images/portfolio/Captura de pantalla_20230219_034025.png"
            )(
              "img3",
              "./assets/images/portfolio/Captura de pantalla_20230219_034114.png"
            )("tittle", "Portfolio")(
              "description",
              "Was create for show my skills, projects and for show a little bit about me It\xb4s a page with interaction in all website !! Was implementing so that was: Responsive design and Dark Mode, Language translation "
            )("toolsHtml", !0)("toolsTailwind", !0)("toolsTypejs", !0)(
              "toolsAngular",
              !0
            )("github", "https://github.com/MateoGonzalezAmortegui/portfolio")(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/portfolio/"
            );
      }
      function PE(e, t) {
        1 & e && b(0, "app-cards", 12),
          2 & e &&
            _(
              "img1",
              "./assets/images/portfolio/Captura de pantalla_20230219_034005.png"
            )(
              "img2",
              "./assets/images/portfolio/Captura de pantalla_20230219_034025.png"
            )(
              "img3",
              "./assets/images/portfolio/Captura de pantalla_20230219_034114.png"
            )("tittle", "Portafolio")(
              "description",
              "\xa1\xa1\xa1Fue creado para mostrar mis habilidades, proyectos y para mostrar un poco acerca de m\xed Es una p\xe1gina con la interacci\xf3n en todo el sitio web !!! Estaba implementando por lo que fue: Dise\xf1o responsivo y modo oscuro, traducci\xf3n de idiomas "
            )("toolsHtml", !0)("toolsTailwind", !0)("toolsTypejs", !0)(
              "toolsAngular",
              !0
            )("github", "https://github.com/MateoGonzalezAmortegui/portfolio")(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/portfolio/"
            );
      }
      function NE(e, t) {
        1 & e && b(0, "app-cards", 13),
          2 & e &&
            _(
              "img1",
              "./assets/images/travelPage/Captura de pantalla_20230203_083221.png"
            )(
              "img2",
              "./assets/images/travelPage/Captura de pantalla_20230203_090754.png"
            )(
              "img3",
              "./assets/images/travelPage/Captura de pantalla_20230203_091946.png"
            )("tittle", "Travel Page")(
              "description",
              "Was create for be a web page interactive with all information about the countries or place for visit!! Was implementing so that was: Responsive design and Dark Mode"
            )("toolsHtml", !0)("toolsTailwind", !0)("toolsJs", !0)(
              "github",
              "https://github.com/MateoGonzalezAmortegui/Travel-page"
            )(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/Travel-page/index.html"
            );
      }
      function kE(e, t) {
        1 & e && b(0, "app-cards", 13),
          2 & e &&
            _(
              "img1",
              "./assets/images/travelPage/Captura de pantalla_20230203_083221.png"
            )(
              "img2",
              "./assets/images/travelPage/Captura de pantalla_20230203_090754.png"
            )(
              "img3",
              "./assets/images/travelPage/Captura de pantalla_20230203_091946.png"
            )("tittle", "Travel Page")(
              "description",
              "\xa1\xa1\xa1Fue crear para ser una p\xe1gina web interactiva con toda la informaci\xf3n sobre los pa\xedses o lugar para visitar!!! Estaba implementando para que era: Dise\xf1o responsivo y modo oscuro"
            )("toolsHtml", !0)("toolsTailwind", !0)("toolsJs", !0)(
              "github",
              "https://github.com/MateoGonzalezAmortegui/Travel-page"
            )(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/Travel-page/index.html"
            );
      }
      function OE(e, t) {
        1 & e && b(0, "app-cards", 14),
          2 & e &&
            _(
              "img1",
              "./assets/images/Todo/Captura de pantalla_20230206_015320.png"
            )(
              "img2",
              "./assets/images/Todo/Captura de pantalla_20230206_015310.png"
            )(
              "img3",
              "./assets/images/Todo/Captura de pantalla_20230206_015229.png"
            )("tittle", "To-Do App")(
              "description",
              "Was create for to-do list page interactive with all information about the tasks for do, completed tasks and edit of tasks with interaction in all website !! Was implementing so that was: Responsive design"
            )("toolsHtml", !0)("toolsCss", !0)("toolsJs", !0)("toolsReact", !0)(
              "github",
              "https://github.com/MateoGonzalezAmortegui/ToDo-ReactApp"
            )(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/ToDo-ReactApp/"
            );
      }
      function FE(e, t) {
        1 & e && b(0, "app-cards", 14),
          2 & e &&
            _(
              "img1",
              "./assets/images/Todo/Captura de pantalla_20230206_015320.png"
            )(
              "img2",
              "./assets/images/Todo/Captura de pantalla_20230206_015310.png"
            )(
              "img3",
              "./assets/images/Todo/Captura de pantalla_20230206_015229.png"
            )("tittle", "Lista de To-Do App")(
              "description",
              "Se cre\xf3 una p\xe1gina de lista de tareas interactiva con toda la informaci\xf3n sobre las tareas por hacer, tareas completadas y edici\xf3n de tareas con interacci\xf3n en todo el sitio web. Estaba implementando por lo que fue: Dise\xf1o responsivo"
            )("toolsHtml", !0)("toolsCss", !0)("toolsJs", !0)("toolsReact", !0)(
              "github",
              "https://github.com/MateoGonzalezAmortegui/ToDo-ReactApp"
            )(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/ToDo-ReactApp/"
            );
      }
      function LE(e, t) {
        1 & e && b(0, "app-cards", 15),
          2 & e &&
            _(
              "img1",
              "./assets/images/LandingPage/Captura de pantalla_20230206_041542.png"
            )(
              "img2",
              "./assets/images/LandingPage/Captura de pantalla_20230206_041536.png"
            )(
              "img3",
              "./assets/images/LandingPage/Captura de pantalla_20230206_041520.png"
            )("tittle", "Landing Page")(
              "description",
              "This project was a Challenge of Frontend Mentor in which was try to develop a landing page according to size of the screen and have a interaction on web page!! Was implementing so that was: Responsive design and Dark Mode"
            )("toolsHtml", !0)("toolsScss", !0)("toolsJs", !0)(
              "github",
              "https://github.com/MateoGonzalezAmortegui/Landing-Page"
            )(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/Landing-Page/"
            );
      }
      function jE(e, t) {
        1 & e && b(0, "app-cards", 15),
          2 & e &&
            _(
              "img1",
              "./assets/images/LandingPage/Captura de pantalla_20230206_041542.png"
            )(
              "img2",
              "./assets/images/LandingPage/Captura de pantalla_20230206_041536.png"
            )(
              "img3",
              "./assets/images/LandingPage/Captura de pantalla_20230206_041520.png"
            )("tittle", "Landing Page")(
              "description",
              "\xa1\xa1\xa1Este proyecto fue un Reto de Frontend Mentor en el cual se trato de desarrollar una pagina de aterrizaje de acuerdo al tama\xf1o de la pantalla y tener una interaccion en la pagina web!!! Fue la aplicaci\xf3n de lo que era: Responsive design y Dark Mode"
            )("toolsHtml", !0)("toolsScss", !0)("toolsJs", !0)(
              "github",
              "https://github.com/MateoGonzalezAmortegui/Landing-Page"
            )(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/Landing-Page/"
            );
      }
      function $E(e, t) {
        1 & e && b(0, "app-cards", 16),
          2 & e &&
            _(
              "img1",
              "./assets/images/Myblog/Captura de pantalla_20230206_042420.png"
            )(
              "img2",
              "./assets/images/Myblog/Captura de pantalla_20230206_042330.png"
            )(
              "img3",
              "./assets/images/Myblog/Captura de pantalla_20230206_042226.png"
            )("tittle", "My Blog")(
              "description",
              "Was create for be a web page with all information was as a blog real about me and my projects that I\xb4ve done!! Was implementing so that was: Responsive design"
            )("toolsHtml", !0)("toolsScss", !0)(
              "github",
              "https://github.com/MateoGonzalezAmortegui/My-blog"
            )(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/My-blog/index.html"
            );
      }
      function HE(e, t) {
        1 & e && b(0, "app-cards", 16),
          2 & e &&
            _(
              "img1",
              "./assets/images/Myblog/Captura de pantalla_20230206_042420.png"
            )(
              "img2",
              "./assets/images/Myblog/Captura de pantalla_20230206_042330.png"
            )(
              "img3",
              "./assets/images/Myblog/Captura de pantalla_20230206_042226.png"
            )("tittle", "Mi Blog")(
              "description",
              "\xa1\xa1\xa1Fue crear para ser una p\xe1gina web con toda la informaci\xf3n era como un blog real sobre m\xed y mis proyectos que he hecho!!! Fue implementar para que fuera: Dise\xf1o responsivo"
            )("toolsHtml", !0)("toolsScss", !0)(
              "github",
              "https://github.com/MateoGonzalezAmortegui/My-blog"
            )(
              "urlPageGithub",
              "https://mateogonzalezamortegui.github.io/My-blog/index.html"
            );
      }
      (ss.ɵfac = function (t) {
        return new (t || ss)(P(nn));
      }),
        (ss.ɵcmp = Zt({
          type: ss,
          selectors: [["app-cards"]],
          inputs: {
            img1: "img1",
            img2: "img2",
            img3: "img3",
            tittle: "tittle",
            description: "description",
            toolsHtml: "toolsHtml",
            toolsCss: "toolsCss",
            toolsTailwind: "toolsTailwind",
            toolsJs: "toolsJs",
            toolsReact: "toolsReact",
            toolsAngular: "toolsAngular",
            toolsScss: "toolsScss",
            toolsTypejs: "toolsTypejs",
            github: "github",
            urlPageGithub: "urlPageGithub",
          },
          decls: 41,
          vars: 20,
          consts: [
            [
              "data-aos",
              "flip-left",
              "data-aos-easing",
              "ease-out-cubic",
              "data-aos-duration",
              "2500",
              1,
              "card",
              "efect_card",
            ],
            [1, "relative"],
            [4, "ngIf"],
            [
              1,
              "absolute",
              "top-0",
              "left-0",
              "z-30",
              "flex",
              "items-center",
              "justify-center",
              "h-full",
              "px-4",
              "cursor-pointer",
              "group",
              "focus:outline-none",
              3,
              "click",
            ],
            [
              1,
              "inline-flex",
              "items-center",
              "justify-center",
              "w-10",
              "h-10",
              "rounded-full",
              "bg-cyan-500/60",
              "dark:bg-purples/60",
              "group-hover:bg-gray-800/60",
              "group-focus:ring-4",
              "group-focus:ring-white",
              "dark:group-focus:ring-gray-800/70",
              "group-focus:outline-none",
            ],
            [
              "aria-hidden",
              "true",
              "fill",
              "none",
              "stroke",
              "currentColor",
              "viewBox",
              "0 0 24 24",
              "xmlns",
              "http://www.w3.org/2000/svg",
              1,
              "w-6",
              "h-6",
              "text-white",
              "dark:text-gray-800",
            ],
            [
              "stroke-linecap",
              "round",
              "stroke-linejoin",
              "round",
              "stroke-width",
              "2",
              "d",
              "M15 19l-7-7 7-7",
              1,
              "fill-current",
              "text-whites",
            ],
            [1, "sr-only"],
            [
              1,
              "absolute",
              "top-0",
              "right-0",
              "z-30",
              "flex",
              "items-center",
              "justify-center",
              "h-full",
              "px-4",
              "cursor-pointer",
              "group",
              "focus:outline-none",
              3,
              "click",
            ],
            [
              "stroke-linecap",
              "round",
              "stroke-linejoin",
              "round",
              "stroke-width",
              "2",
              "d",
              "M9 5l7 7-7 7",
              1,
              "fill-current",
              "text-whites",
            ],
            [1, "p-4", "rounded-t-lg"],
            [
              1,
              "text-xl",
              "font-bold",
              "text-Blues",
              "pb-2",
              "drop-shadow-md",
              "dark:text-whites",
            ],
            [
              1,
              "pb-2",
              "font-normal",
              "text-Gray3",
              "border-b",
              "border-cyan-400",
              "dark:border-gray-500",
              "dark:text-gray-400",
              "dark:text-whites",
            ],
            [
              1,
              "flex",
              "justify-evenly",
              "px-2",
              "mt-2",
              "pb-2",
              "border-b",
              "border-blue-400",
              "dark:border-gray-500",
              "drop-shadow-md",
            ],
            [1, "pb-4", "flex", "justify-evenly", "mt-4", "drop-shadow-md"],
            [1, "effect_button", 3, "href"],
            [
              "fill",
              "#000000",
              "width",
              "48px",
              "height",
              "48px",
              "viewBox",
              "0 0 32 32",
              "version",
              "1.1",
              "xmlns",
              "http://www.w3.org/2000/svg",
            ],
            [
              "d",
              "M16 1.375c-8.282 0-14.996 6.714-14.996 14.996 0 6.585 4.245 12.18 10.148 14.195l0.106 0.031c0.75 0.141 1.025-0.322 1.025-0.721 0-0.356-0.012-1.3-0.019-2.549-4.171 0.905-5.051-2.012-5.051-2.012-0.288-0.925-0.878-1.685-1.653-2.184l-0.016-0.009c-1.358-0.93 0.105-0.911 0.105-0.911 0.987 0.139 1.814 0.718 2.289 1.53l0.008 0.015c0.554 0.995 1.6 1.657 2.801 1.657 0.576 0 1.116-0.152 1.582-0.419l-0.016 0.008c0.072-0.791 0.421-1.489 0.949-2.005l0.001-0.001c-3.33-0.375-6.831-1.665-6.831-7.41-0-0.027-0.001-0.058-0.001-0.089 0-1.521 0.587-2.905 1.547-3.938l-0.003 0.004c-0.203-0.542-0.321-1.168-0.321-1.821 0-0.777 0.166-1.516 0.465-2.182l-0.014 0.034s1.256-0.402 4.124 1.537c1.124-0.321 2.415-0.506 3.749-0.506s2.625 0.185 3.849 0.53l-0.1-0.024c2.849-1.939 4.105-1.537 4.105-1.537 0.285 0.642 0.451 1.39 0.451 2.177 0 0.642-0.11 1.258-0.313 1.83l0.012-0.038c0.953 1.032 1.538 2.416 1.538 3.937 0 0.031-0 0.061-0.001 0.091l0-0.005c0 5.761-3.505 7.029-6.842 7.398 0.632 0.647 1.022 1.532 1.022 2.509 0 0.093-0.004 0.186-0.011 0.278l0.001-0.012c0 2.007-0.019 3.619-0.019 4.106 0 0.394 0.262 0.862 1.031 0.712 6.028-2.029 10.292-7.629 10.292-14.226 0-8.272-6.706-14.977-14.977-14.977-0.006 0-0.013 0-0.019 0h0.001z",
              1,
              "fill-current",
              "dark:text-whites",
            ],
            [3, "icons", "urlPage", 4, "ngIf"],
            [
              "data-aos",
              "fade-left",
              "data-aos-offset",
              "500",
              "data-aos-duration",
              "2000",
              1,
              "w-full",
              "h-96",
              "object-cover",
              3,
              "src",
            ],
            [
              "width",
              "48px",
              "height",
              "48px",
              "viewBox",
              "0 0 32 32",
              "fill",
              "none",
              "xmlns",
              "http://www.w3.org/2000/svg",
            ],
            ["d", "M6 28L4 3H28L26 28L16 31L6 28Z", "fill", "#E44D26"],
            ["d", "M26 5H16V29.5L24 27L26 5Z", "fill", "#F16529"],
            [
              "d",
              "M9.5 17.5L8.5 8H24L23.5 11H11.5L12 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5H9.5Z",
              "fill",
              "white",
            ],
            [
              "width",
              "48px",
              "height",
              "48px",
              "viewBox",
              "0 0 32 32",
              "xmlns",
              "http://www.w3.org/2000/svg",
            ],
            [
              "d",
              "M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z",
              2,
              "fill",
              "#44a8b3",
            ],
            [
              "xmlns",
              "http://www.w3.org/2000/svg",
              "aria-label",
              "JavaScript",
              "role",
              "img",
              "viewBox",
              "0 0 512 512",
              "width",
              "48px",
              "height",
              "48px",
            ],
            ["width", "512", "height", "512", "rx", "15%", "fill", "#f7df1e"],
            [
              "d",
              "M324 370c10 17 24 29 47 29c20 0 33-10 33 -24c0-16 -13 -22 -35 -32l-12-5c-35-15 -58 -33 -58 -72c0-36 27 -64 70 -64c31 0 53 11 68 39l-37 24c-8-15 -17 -21 -31 -21c-14 0-23 9 -23 21c0 14 9 20 30 29l12 5c41 18 64 35 64 76c0 43-34 67 -80 67c-45 0-74 -21 -88 -49zm-170 4c8 13 14 25 31 25c16 0 26-6 26 -30V203h48v164c0 50-29 72 -72 72c-39 0-61 -20 -72 -44z",
            ],
            ["d", "M6 28L4 3H28L26 28L16 31L6 28Z", "fill", "#1172B8"],
            ["d", "M26 5H16V29.5L24 27L26 5Z", "fill", "#33AADD"],
            [
              "d",
              "M19.5 17.5H9.5L9 14L17 11.5H9L8.5 8.5H24L23.5 12L17 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5Z",
              "fill",
              "white",
            ],
            ["d", "M16 2L3 7L5 24L16 30L27 24L29 7L16 2Z", "fill", "#DD0031"],
            ["d", "M16 2V30L27 24L29 7L16 2Z", "fill", "#C3002F"],
            [
              "d",
              "M15.9998 5.09375L7.87305 23.3638H10.9031L12.5368 19.2757H19.4348L21.0685 23.3638H24.0986L15.9998 5.09375ZM18.3736 16.7557H13.626L15.9998 11.0298L18.3736 16.7557Z",
              "fill",
              "white",
            ],
            [
              "width",
              "48px",
              "height",
              "48px",
              "viewBox",
              "0 -14 256 256",
              "version",
              "1.1",
              "xmlns",
              "http://www.w3.org/2000/svg",
              0,
              "xmlns",
              "xlink",
              "http://www.w3.org/1999/xlink",
              "preserveAspectRatio",
              "xMidYMid",
            ],
            [
              "d",
              "M210.483381,73.8236374 C207.827698,72.9095503 205.075867,72.0446761 202.24247,71.2267368 C202.708172,69.3261098 203.135596,67.4500894 203.515631,65.6059664 C209.753843,35.3248922 205.675082,10.9302478 191.747328,2.89849283 C178.392359,-4.80289661 156.551327,3.22703567 134.492936,22.4237776 C132.371761,24.2697233 130.244662,26.2241201 128.118477,28.2723861 C126.701777,26.917204 125.287358,25.6075897 123.876584,24.3549348 C100.758745,3.82852863 77.5866802,-4.82157937 63.6725966,3.23341515 C50.3303869,10.9571328 46.3792156,33.8904224 51.9945178,62.5880206 C52.5367729,65.3599011 53.1706189,68.1905639 53.8873982,71.068617 C50.6078941,71.9995641 47.4418534,72.9920277 44.4125156,74.0478303 C17.3093297,83.497195 0,98.3066828 0,113.667995 C0,129.533287 18.5815786,145.446423 46.8116526,155.095373 C49.0394553,155.856809 51.3511025,156.576778 53.7333796,157.260293 C52.9600965,160.37302 52.2875179,163.423318 51.7229345,166.398431 C46.3687351,194.597975 50.5500231,216.989464 63.8566899,224.664425 C77.6012619,232.590464 100.66852,224.443422 123.130185,204.809231 C124.905501,203.257196 126.687196,201.611293 128.472081,199.886102 C130.785552,202.113904 133.095375,204.222319 135.392897,206.199955 C157.14963,224.922338 178.637969,232.482469 191.932332,224.786092 C205.663234,216.837268 210.125675,192.78347 204.332202,163.5181 C203.88974,161.283006 203.374826,158.99961 202.796573,156.675661 C204.416503,156.196743 206.006814,155.702335 207.557482,155.188332 C236.905331,145.46465 256,129.745175 256,113.667995 C256,98.2510906 238.132466,83.3418093 210.483381,73.8236374 L210.483381,73.8236374 Z M204.118035,144.807565 C202.718197,145.270987 201.281904,145.718918 199.818271,146.153177 C196.578411,135.896354 192.205739,124.989735 186.854729,113.72131 C191.961041,102.721277 196.164656,91.9540963 199.313837,81.7638014 C201.93261,82.5215915 204.474374,83.3208483 206.923636,84.1643056 C230.613348,92.3195488 245.063763,104.377206 245.063763,113.667995 C245.063763,123.564379 229.457753,136.411268 204.118035,144.807565 L204.118035,144.807565 Z M193.603754,165.642007 C196.165567,178.582766 196.531475,190.282717 194.834536,199.429057 C193.309843,207.64764 190.243595,213.12715 186.452366,215.321689 C178.384612,219.991462 161.131788,213.921395 142.525146,197.909832 C140.392124,196.074366 138.243609,194.114502 136.088259,192.040261 C143.301619,184.151133 150.510878,174.979732 157.54698,164.793993 C169.922699,163.695814 181.614905,161.900447 192.218042,159.449363 C192.740247,161.555956 193.204126,163.621993 193.603754,165.642007 L193.603754,165.642007 Z M87.2761866,214.514686 C79.3938934,217.298414 73.1160375,217.378157 69.3211631,215.189998 C61.2461189,210.532528 57.8891498,192.554265 62.4682434,168.438039 C62.9927272,165.676183 63.6170041,162.839142 64.3365173,159.939216 C74.8234575,162.258154 86.4299951,163.926841 98.8353334,164.932519 C105.918826,174.899534 113.336329,184.06091 120.811247,192.08264 C119.178102,193.65928 117.551336,195.16028 115.933685,196.574699 C106.001303,205.256705 96.0479605,211.41654 87.2761866,214.514686 L87.2761866,214.514686 Z M50.3486141,144.746959 C37.8658105,140.48046 27.5570398,134.935332 20.4908634,128.884403 C14.1414664,123.446815 10.9357817,118.048415 10.9357817,113.667995 C10.9357817,104.34622 24.8334611,92.4562517 48.0123604,84.3748281 C50.8247961,83.3942121 53.7689223,82.4701001 56.8242337,81.6020363 C60.0276398,92.0224477 64.229889,102.917218 69.3011135,113.93411 C64.1642716,125.11459 59.9023288,136.182975 56.6674809,146.725506 C54.489347,146.099407 52.3791089,145.440499 50.3486141,144.746959 L50.3486141,144.746959 Z M62.7270678,60.4878073 C57.9160346,35.9004118 61.1112387,17.3525532 69.1516515,12.6982729 C77.7160924,7.74005624 96.6544653,14.8094222 116.614922,32.5329619 C117.890816,33.6657739 119.171723,34.8514442 120.456275,36.0781256 C113.018267,44.0647686 105.66866,53.1573386 98.6480514,63.0655695 C86.6081646,64.1815215 75.0831931,65.9741531 64.4868907,68.3746571 C63.8206914,65.6948233 63.2305903,63.0619242 62.7270678,60.4878073 L62.7270678,60.4878073 Z M173.153901,87.7550367 C170.620796,83.3796304 168.020249,79.1076627 165.369124,74.9523483 C173.537126,75.9849113 181.362914,77.3555864 188.712066,79.0329319 C186.505679,86.1041206 183.755673,93.4974728 180.518546,101.076741 C178.196419,96.6680702 175.740322,92.2229454 173.153901,87.7550367 L173.153901,87.7550367 Z M128.122121,43.8938899 C133.166461,49.3588189 138.218091,55.4603279 143.186789,62.0803968 C138.179814,61.8439007 133.110868,61.720868 128.000001,61.720868 C122.937434,61.720868 117.905854,61.8411667 112.929865,62.0735617 C117.903575,55.515009 122.99895,49.4217021 128.122121,43.8938899 L128.122121,43.8938899 Z M82.8018984,87.830679 C80.2715265,92.2183886 77.8609975,96.6393627 75.5753239,101.068539 C72.3906004,93.5156998 69.6661103,86.0886276 67.440586,78.9171899 C74.7446255,77.2826781 82.5335049,75.9461789 90.6495601,74.9332099 C87.9610684,79.1268011 85.3391054,83.4302106 82.8018984,87.8297677 L82.8018984,87.830679 L82.8018984,87.830679 Z M90.8833221,153.182899 C82.4979621,152.247395 74.5919739,150.979704 67.289757,149.390303 C69.5508242,142.09082 72.3354636,134.505173 75.5876271,126.789657 C77.8792246,131.215644 80.2993228,135.638441 82.8451877,140.03572 L82.8456433,140.03572 C85.4388987,144.515476 88.1255676,148.90364 90.8833221,153.182899 L90.8833221,153.182899 Z M128.424691,184.213105 C123.24137,178.620587 118.071264,172.434323 113.021912,165.780078 C117.923624,165.972373 122.921029,166.0708 128.000001,166.0708 C133.217953,166.0708 138.376211,165.953235 143.45336,165.727219 C138.468257,172.501308 133.434855,178.697141 128.424691,184.213105 L128.424691,184.213105 Z M180.622896,126.396409 C184.044571,134.195313 186.929004,141.741317 189.219234,148.9164 C181.796719,150.609693 173.782736,151.973534 165.339049,152.986959 C167.996555,148.775595 170.619884,144.430263 173.197646,139.960532 C175.805484,135.438399 178.28163,130.90943 180.622896,126.396409 L180.622896,126.396409 Z M163.724586,134.496971 C159.722835,141.435557 155.614455,148.059271 151.443648,154.311611 C143.847063,154.854776 135.998946,155.134562 128.000001,155.134562 C120.033408,155.134562 112.284171,154.887129 104.822013,154.402745 C100.48306,148.068386 96.285368,141.425078 92.3091341,134.556664 L92.3100455,134.556664 C88.3442923,127.706935 84.6943232,120.799333 81.3870228,113.930466 C84.6934118,107.045648 88.3338117,100.130301 92.276781,93.292874 L92.2758697,93.294241 C96.2293193,86.4385872 100.390102,79.8276317 104.688954,73.5329157 C112.302398,72.9573964 120.109505,72.6571055 127.999545,72.6571055 L128.000001,72.6571055 C135.925583,72.6571055 143.742714,72.9596746 151.353879,73.5402067 C155.587114,79.7888993 159.719645,86.3784378 163.688588,93.2350031 C167.702644,100.168578 171.389978,107.037901 174.724618,113.77508 C171.400003,120.627999 167.720871,127.566587 163.724586,134.496971 L163.724586,134.496971 Z M186.284677,12.3729198 C194.857321,17.3165548 198.191049,37.2542268 192.804953,63.3986692 C192.461372,65.0669011 192.074504,66.7661189 191.654369,68.4881206 C181.03346,66.0374921 169.500286,64.2138746 157.425315,63.0810626 C150.391035,53.0639249 143.101577,43.9572289 135.784778,36.073113 C137.751934,34.1806885 139.716356,32.3762092 141.672575,30.673346 C160.572216,14.2257007 178.236518,7.73185406 186.284677,12.3729198 L186.284677,12.3729198 Z M128.000001,90.8080696 C140.624975,90.8080696 150.859926,101.042565 150.859926,113.667995 C150.859926,126.292969 140.624975,136.527922 128.000001,136.527922 C115.375026,136.527922 105.140075,126.292969 105.140075,113.667995 C105.140075,101.042565 115.375026,90.8080696 128.000001,90.8080696 L128.000001,90.8080696 Z",
              "fill",
              "#00D8FF",
            ],
            [
              "d",
              "M26.11,17.572a5.8,5.8,0,0,0-2.537.588,5.345,5.345,0,0,1-.568-1.314,3.53,3.53,0,0,1-.051-1.1,9.811,9.811,0,0,1,.332-1.192c-.005-.051-.061-.292-.624-.3s-1.048.107-1.1.256a6.171,6.171,0,0,0-.235.834,19.686,19.686,0,0,1-1.713,3.294,3.186,3.186,0,0,1-.44-2.066,9.811,9.811,0,0,1,.332-1.192c-.005-.051-.061-.292-.624-.3s-1.048.107-1.1.256-.118.5-.235.834-1.483,3.386-1.841,4.173c-.184.4-.343.726-.455.946h0a.233.233,0,0,1-.02.041c-.1.189-.153.292-.153.292v.005c-.077.138-.159.266-.2.266a1.711,1.711,0,0,1,.01-.869c.2-1.059.69-2.705.685-2.762,0-.031.092-.317-.317-.465a.508.508,0,0,0-.578.1c-.036,0-.061.087-.061.087s.445-1.851-.849-1.851a3.855,3.855,0,0,0-2.475,1.683c-.348.189-1.089.593-1.882,1.028-.3.169-.614.338-.905.5-.02-.02-.041-.046-.061-.066C6.87,17.6,3.975,16.416,4.1,14.171c.046-.818.327-2.966,5.559-5.575,4.306-2.122,7.733-1.534,8.326-.23.849,1.862-1.836,5.319-6.285,5.82a3.351,3.351,0,0,1-2.813-.711c-.235-.256-.271-.271-.358-.22-.143.077-.051.307,0,.44a2.626,2.626,0,0,0,1.606,1.263,8.55,8.55,0,0,0,5.217-.517c2.7-1.043,4.8-3.943,4.184-6.372-.619-2.465-4.71-3.278-8.582-1.9A19.5,19.5,0,0,0,4.359,9.952c-2.133,1.995-2.47,3.728-2.332,4.455.5,2.578,4.051,4.255,5.472,5.5-.072.041-.138.077-.194.107-.711.353-3.421,1.77-4.1,3.268-.767,1.7.123,2.915.711,3.079a4.374,4.374,0,0,0,4.71-1.908A4.725,4.725,0,0,0,9.049,20.1a.107.107,0,0,0-.02-.031l.557-.327c.363-.215.721-.414,1.028-.578a6.74,6.74,0,0,0-.363,1.862,3.886,3.886,0,0,0,.834,2.7.921.921,0,0,0,.675.22c.6,0,.875-.5,1.176-1.094.368-.726.7-1.57.7-1.57s-.414,2.281.711,2.281c.409,0,.823-.532,1.008-.8v.005s.01-.015.031-.051l.066-.107v-.01c.164-.286.532-.936,1.079-2.015.706-1.391,1.386-3.13,1.386-3.13a8.888,8.888,0,0,0,.271,1.13,10.643,10.643,0,0,0,.583,1.309c-.164.23-.266.358-.266.358l.005.005c-.133.174-.276.363-.435.547a16.3,16.3,0,0,0-1.314,1.647.447.447,0,0,0,.123.6,1.116,1.116,0,0,0,.685.113,3.147,3.147,0,0,0,1.028-.235,3.45,3.45,0,0,0,.885-.465,1.98,1.98,0,0,0,.849-1.744,3.521,3.521,0,0,0-.322-1.233c.051-.072.1-.143.148-.215a23.428,23.428,0,0,0,1.534-2.649,8.888,8.888,0,0,0,.271,1.13,7.57,7.57,0,0,0,.5,1.125A4.861,4.861,0,0,0,20.965,20.8c-.322.931-.072,1.35.4,1.447a1.425,1.425,0,0,0,.747-.153,3.4,3.4,0,0,0,.946-.486,2.126,2.126,0,0,0,1.043-1.729,3.268,3.268,0,0,0-.235-1.023,5.356,5.356,0,0,1,2.716-.312c2.434.286,2.915,1.805,2.823,2.445a1.618,1.618,0,0,1-.772,1.094c-.169.107-.225.143-.21.22.02.113.1.107.245.087A1.9,1.9,0,0,0,30,20.7c.077-1.5-1.355-3.145-3.887-3.13ZM7.33,23.9c-.808.88-1.933,1.212-2.419.931-.522-.3-.317-1.6.675-2.532a12.884,12.884,0,0,1,1.9-1.417c.118-.072.292-.174.5-.3l.056-.031h0l.123-.077A3.493,3.493,0,0,1,7.33,23.9Zm5.881-4c-.281.685-.869,2.44-1.227,2.342-.307-.082-.5-1.412-.061-2.726a6.193,6.193,0,0,1,.956-1.754c.44-.491.926-.655,1.043-.455a9.062,9.062,0,0,1-.711,2.593Zm4.853,2.322c-.118.061-.23.1-.281.072-.036-.02.051-.1.051-.1s.609-.655.849-.951c.138-.174.3-.378.476-.609V20.7c0,.782-.757,1.309-1.094,1.524Zm3.744-.854c-.087-.061-.072-.266.22-.905a3.408,3.408,0,0,1,.834-1.074,1.448,1.448,0,0,1,.082.471,1.547,1.547,0,0,1-1.135,1.509Z",
              2,
              "fill",
              "#cd6799",
            ],
            [
              "xmlns",
              "http://www.w3.org/2000/svg",
              "aria-label",
              "TypeScript",
              "role",
              "img",
              "viewBox",
              "0 0 512 512",
              "width",
              "48px",
              "height",
              "48px",
            ],
            ["width", "512", "height", "512", "rx", "15%", "fill", "#3178c6"],
            [
              "fill",
              "#ffffff",
              "d",
              "m233 284h64v-41H118v41h64v183h51zm84 173c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4c11-2.3 20-6.1 28-11c8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9c-5.2-2.6-9.7-5.2-13-7.8c-3.7-2.7-6.5-5.5-8.5-8.4c-2-3-3-6.3-3-10c0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6c4.2 0 8.6.31 13 .94c4.6.63 9.3 1.6 14 2.9c4.7 1.3 9.3 2.9 14 4.9c4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21c-4.7 8.4-7 18-7 30c0 15 4.3 28 13 38c8.6 11 22 19 39 27c6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5c2.5 3.4 3.8 7.4 3.8 12c0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2s-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7c-11 0-22-1.9-32-5.7c-11-3.8-21-9.5-28.1-15.44z",
            ],
            [3, "icons", "urlPage"],
          ],
          template: function (t, n) {
            1 & t &&
              (p(0, "article", 0)(1, "div", 1),
              N(2, pE, 2, 1, "div", 2),
              N(3, gE, 2, 1, "div", 2),
              N(4, mE, 2, 1, "div", 2),
              p(5, "button", 3),
              Rt("click", function () {
                return n.backPage();
              }),
              p(6, "span", 4),
              V(),
              p(7, "svg", 5),
              b(8, "path", 6),
              m(),
              pe(),
              p(9, "span", 7),
              E(10, "Previous"),
              m()()(),
              p(11, "button", 8),
              Rt("click", function () {
                return n.nextPage();
              }),
              p(12, "span", 4),
              V(),
              p(13, "svg", 5),
              b(14, "path", 9),
              m(),
              pe(),
              p(15, "span", 7),
              E(16, "Next"),
              m()()()(),
              p(17, "div", 10)(18, "p", 11),
              E(19),
              m(),
              p(20, "p", 12),
              E(21),
              m(),
              p(22, "div", 13),
              N(23, yE, 5, 0, "span", 2),
              N(24, vE, 5, 0, "span", 2),
              N(25, DE, 4, 0, "span", 2),
              N(26, CE, 5, 0, "span", 2),
              N(27, wE, 5, 0, "span", 2),
              N(28, _E, 4, 0, "span", 2),
              N(29, bE, 5, 0, "span", 2),
              N(30, EE, 4, 0, "span", 2),
              m(),
              p(31, "div", 14)(32, "a", 15),
              V(),
              p(33, "svg", 16)(34, "title"),
              E(35, "github"),
              m(),
              b(36, "path", 17),
              m()(),
              N(37, SE, 2, 2, "app-btn", 18),
              oe(38, "async"),
              N(39, IE, 2, 2, "app-btn", 18),
              oe(40, "async"),
              m()()()),
              2 & t &&
                (A(2),
                _("ngIf", 1 == n.page),
                A(1),
                _("ngIf", 2 == n.page),
                A(1),
                _("ngIf", 3 == n.page),
                A(15),
                bi(" ", n.tittle, " "),
                A(2),
                bi(" ", n.description, " "),
                A(2),
                _("ngIf", !0 === n.toolsHtml),
                A(1),
                _("ngIf", !0 === n.toolsTailwind),
                A(1),
                _("ngIf", !0 === n.toolsJs),
                A(1),
                _("ngIf", !0 === n.toolsCss),
                A(1),
                _("ngIf", !0 === n.toolsAngular),
                A(1),
                _("ngIf", !0 === n.toolsReact),
                A(1),
                _("ngIf", !0 === n.toolsScss),
                A(1),
                _("ngIf", !0 === n.toolsTypejs),
                A(2),
                _("href", n.github, Mr),
                A(5),
                _("ngIf", !ie(38, 16, n.language$)),
                A(2),
                _("ngIf", ie(40, 18, n.language$)));
          },
          dependencies: [Jn, Ho, Or],
          encapsulation: 2,
        }));
      class as {
        constructor(t) {
          (this.idiom = t), (this.language$ = this.idiom.language$);
        }
      }
      function VE(e, t) {
        1 & e && (p(0, "p", 20), E(1, " CONTACT ME "), m());
      }
      function BE(e, t) {
        1 & e && (p(0, "p", 20), E(1, " CONTACTAME "), m());
      }
      (as.ɵfac = function (t) {
        return new (t || as)(P(nn));
      }),
        (as.ɵcmp = Zt({
          type: as,
          selectors: [["app-projects"]],
          decls: 31,
          vars: 42,
          consts: [
            ["id", "Proyects", 1, "w-full", "dark:bg-Gray4", "pb-12"],
            [1, "w-11/12", "mx-auto"],
            [
              "class",
              "text-3xl text-black font-semibold drop-shadow-md pt-8 dark:text-whites",
              "data-aos",
              "fade-right",
              "data-aos-offset",
              "250",
              "data-aos-easing",
              "ease-in-sine",
              4,
              "ngIf",
            ],
            [
              1,
              "mt-12",
              "grid",
              "grid-cols-1",
              "gap-9",
              "w-full",
              "place-items-center",
              "md:grid-cols-2",
              "xl:grid-cols-3",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsScss",
              "toolsTypejs",
              "toolsAngular",
              "github",
              "urlPageGithub",
              4,
              "ngIf",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsTailwind",
              "toolsTypejs",
              "toolsAngular",
              "github",
              "urlPageGithub",
              4,
              "ngIf",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsTailwind",
              "toolsJs",
              "github",
              "urlPageGithub",
              4,
              "ngIf",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsCss",
              "toolsJs",
              "toolsReact",
              "github",
              "urlPageGithub",
              4,
              "ngIf",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsScss",
              "toolsJs",
              "github",
              "urlPageGithub",
              4,
              "ngIf",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsScss",
              "github",
              "urlPageGithub",
              4,
              "ngIf",
            ],
            [
              "data-aos",
              "fade-right",
              "data-aos-offset",
              "250",
              "data-aos-easing",
              "ease-in-sine",
              1,
              "text-3xl",
              "text-black",
              "font-semibold",
              "drop-shadow-md",
              "pt-8",
              "dark:text-whites",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsScss",
              "toolsTypejs",
              "toolsAngular",
              "github",
              "urlPageGithub",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsTailwind",
              "toolsTypejs",
              "toolsAngular",
              "github",
              "urlPageGithub",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsTailwind",
              "toolsJs",
              "github",
              "urlPageGithub",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsCss",
              "toolsJs",
              "toolsReact",
              "github",
              "urlPageGithub",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsScss",
              "toolsJs",
              "github",
              "urlPageGithub",
            ],
            [
              3,
              "img1",
              "img2",
              "img3",
              "tittle",
              "description",
              "toolsHtml",
              "toolsScss",
              "github",
              "urlPageGithub",
            ],
          ],
          template: function (t, n) {
            1 & t &&
              (p(0, "section", 0)(1, "div", 1),
              N(2, ME, 2, 0, "p", 2),
              oe(3, "async"),
              N(4, TE, 2, 0, "p", 2),
              oe(5, "async"),
              p(6, "div", 3),
              N(7, xE, 1, 11, "app-cards", 4),
              oe(8, "async"),
              N(9, AE, 1, 11, "app-cards", 4),
              oe(10, "async"),
              N(11, RE, 1, 11, "app-cards", 5),
              oe(12, "async"),
              N(13, PE, 1, 11, "app-cards", 5),
              oe(14, "async"),
              N(15, NE, 1, 10, "app-cards", 6),
              oe(16, "async"),
              N(17, kE, 1, 10, "app-cards", 6),
              oe(18, "async"),
              N(19, OE, 1, 11, "app-cards", 7),
              oe(20, "async"),
              N(21, FE, 1, 11, "app-cards", 7),
              oe(22, "async"),
              N(23, LE, 1, 10, "app-cards", 8),
              oe(24, "async"),
              N(25, jE, 1, 10, "app-cards", 8),
              oe(26, "async"),
              N(27, $E, 1, 9, "app-cards", 9),
              oe(28, "async"),
              N(29, HE, 1, 9, "app-cards", 9),
              oe(30, "async"),
              m()()()),
              2 & t &&
                (A(2),
                _("ngIf", !ie(3, 14, n.language$)),
                A(2),
                _("ngIf", ie(5, 16, n.language$)),
                A(3),
                _("ngIf", !ie(8, 18, n.language$)),
                A(2),
                _("ngIf", ie(10, 20, n.language$)),
                A(2),
                _("ngIf", !ie(12, 22, n.language$)),
                A(2),
                _("ngIf", ie(14, 24, n.language$)),
                A(2),
                _("ngIf", !ie(16, 26, n.language$)),
                A(2),
                _("ngIf", ie(18, 28, n.language$)),
                A(2),
                _("ngIf", !ie(20, 30, n.language$)),
                A(2),
                _("ngIf", ie(22, 32, n.language$)),
                A(2),
                _("ngIf", !ie(24, 34, n.language$)),
                A(2),
                _("ngIf", ie(26, 36, n.language$)),
                A(2),
                _("ngIf", !ie(28, 38, n.language$)),
                A(2),
                _("ngIf", ie(30, 40, n.language$)));
          },
          dependencies: [Jn, ss, Or],
        }));
      class ls {
        constructor(t) {
          (this.idiom = t), (this.language$ = this.idiom.language$);
        }
      }
      function UE(e, t) {
        1 & e && (p(0, "p", 51), E(1, " TOOLS "), m());
      }
      function zE(e, t) {
        1 & e && (p(0, "p", 51), E(1, " HERRAMIENTAS "), m());
      }
      (ls.ɵfac = function (t) {
        return new (t || ls)(P(nn));
      }),
        (ls.ɵcmp = Zt({
          type: ls,
          selectors: [["app-contactme"]],
          decls: 32,
          vars: 6,
          consts: [
            [
              "id",
              "footer",
              1,
              "w-11/12",
              "my-0",
              "mx-auto",
              "mt-8",
              "mb-8",
              "md:mb-12",
            ],
            [
              "data-aos",
              "fade-zoom-in",
              "data-aos-easing",
              "ease-in-back",
              "data-aos-delay",
              "300",
              "data-aos-offset",
              "0",
              "class",
              "text-3xl font-blacks font-semibold drop-shadow-md dark:text-Blues",
              4,
              "ngIf",
            ],
            [
              "data-aos",
              "fade-up",
              "data-aos-duration",
              "3000",
              1,
              "grid",
              "grid-rows-2",
              "font-semibold",
              "mt-8",
              "gap-4",
              "place-items-center",
              "md:grid-rows-1",
              "md:grid-cols-2",
            ],
            [1, "space-y-8"],
            [1, "flex", "items-center", "justify-center"],
            [
              "width",
              "40px",
              "height",
              "40px",
              "viewBox",
              "0 0 36 36",
              "xmlns",
              "http://www.w3.org/2000/svg",
              0,
              "xmlns",
              "xlink",
              "http://www.w3.org/1999/xlink",
              "aria-hidden",
              "true",
              "role",
              "img",
              "preserveAspectRatio",
              "xMidYMid meet",
              1,
              "iconify",
              "iconify--twemoji",
            ],
            [
              "fill",
              "#FBD116",
              "d",
              "M32 5H4a4 4 0 0 0-4 4v9h36V9a4 4 0 0 0-4-4z",
            ],
            ["fill", "#22408C", "d", "M0 18h36v7H0z"],
            [
              "fill",
              "#CE2028",
              "d",
              "M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-2H0v2z",
            ],
            [
              "width",
              "40px",
              "height",
              "40px",
              "viewBox",
              "0 0 24 24",
              "fill",
              "none",
              "xmlns",
              "http://www.w3.org/2000/svg",
            ],
            [
              "opacity",
              "0.15",
              "d",
              "M20.9994 16.4767V19.1864C21.0036 20.2223 20.0722 21.0873 19.0264 20.9929C10 21 3 13.935 3.00706 4.96919C2.91287 3.92895 3.77358 3.00106 4.80811 3.00009H7.52325C7.96247 2.99577 8.38828 3.151 8.72131 3.43684C9.66813 4.24949 10.2771 7.00777 10.0428 8.10428C9.85987 8.96036 8.9969 9.55929 8.41019 10.1448C9.69858 12.4062 11.5746 14.2785 13.8405 15.5644C14.4272 14.9788 15.0273 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.8579 15.6021 21.0104 16.0337 20.9994 16.4767Z",
              "fill",
              "#000000",
              1,
              "fill-current",
              "dark:text-purples",
              "text-Gray2",
            ],
            [
              "d",
              "M14.5 6.5C15.2372 6.64382 15.9689 6.96892 16.5 7.5C17.0311 8.03108 17.3562 8.76284 17.5 9.5M15 3C16.5315 3.17014 17.9097 3.91107 19 5C20.0903 6.08893 20.8279 7.46869 21 9M20.9994 16.4767V19.1864C21.0036 20.2223 20.0722 21.0873 19.0264 20.9929C10 21 3 13.935 3.00706 4.96919C2.91287 3.92895 3.77358 3.00106 4.80811 3.00009H7.52325C7.96247 2.99577 8.38828 3.151 8.72131 3.43684C9.66813 4.24949 10.2771 7.00777 10.0428 8.10428C9.85987 8.96036 8.9969 9.55929 8.41019 10.1448C9.69858 12.4062 11.5746 14.2785 13.8405 15.5644C14.4272 14.9788 15.0273 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.8579 15.6021 21.0104 16.0337 20.9994 16.4767Z",
              "stroke",
              "#000000",
              "stroke-width",
              "1.5",
              "stroke-linecap",
              "round",
              "stroke-linejoin",
              "round",
              1,
              "fill-current",
              "dark:text-purples",
              "text-Gray2",
            ],
            [1, "grid", "place-items-center", "space-y-4"],
            [
              "d",
              "M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7",
              "stroke",
              "#000000",
              "stroke-width",
              "2",
              "stroke-linecap",
              "round",
              "stroke-linejoin",
              "round",
              1,
              "fill-current",
              "dark:text-purples",
              "text-Gray2",
            ],
            [
              "x",
              "3",
              "y",
              "5",
              "width",
              "18",
              "height",
              "14",
              "rx",
              "2",
              "stroke",
              "#000000",
              "stroke-width",
              "2",
              "stroke-linecap",
              "round",
            ],
            [
              "href",
              "https://www.linkedin.com/in/mateo-gonzalez-amortegui/",
              1,
              "flex",
              "items-center",
              "justify-center",
              "space-x-4",
            ],
            [
              "width",
              "40px",
              "height",
              "40px",
              "viewBox",
              "0 0 16 16",
              "xmlns",
              "http://www.w3.org/2000/svg",
              "fill",
              "none",
            ],
            [
              "fill",
              "#0A66C2",
              "d",
              "M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z",
            ],
            [
              1,
              "w-full",
              "h-12",
              "bg-blacks",
              "flex",
              "items-center",
              "justify-center",
              "space-x-2",
              "text-whites",
              "text-sm",
              "font-semibold",
              "mb-20",
              "md:mb-0",
            ],
            ["src", "./assets/logo.png", 1, "h-8"],
            [
              "data-aos",
              "fade-zoom-in",
              "data-aos-easing",
              "ease-in-back",
              "data-aos-delay",
              "300",
              "data-aos-offset",
              "0",
              1,
              "text-3xl",
              "font-blacks",
              "font-semibold",
              "drop-shadow-md",
              "dark:text-Blues",
            ],
          ],
          template: function (t, n) {
            1 & t &&
              (p(0, "section", 0),
              N(1, VE, 2, 0, "p", 1),
              oe(2, "async"),
              N(3, BE, 2, 0, "p", 1),
              oe(4, "async"),
              p(5, "article", 2)(6, "div", 3)(7, "div", 4),
              V(),
              p(8, "svg", 5),
              b(9, "path", 6)(10, "path", 7)(11, "path", 8),
              m(),
              E(12, " BOG|COL "),
              m(),
              pe(),
              p(13, "div", 4),
              V(),
              p(14, "svg", 9),
              b(15, "path", 10)(16, "path", 11),
              m(),
              E(17, " (+57) 3227972209 "),
              m()(),
              pe(),
              p(18, "div", 3)(19, "div", 12),
              V(),
              p(20, "svg", 9),
              b(21, "path", 13)(22, "rect", 14),
              m(),
              E(23, " mateogonza.2000@hotmail.com "),
              m(),
              pe(),
              p(24, "a", 15),
              V(),
              p(25, "svg", 16),
              b(26, "path", 17),
              m(),
              E(27, " Linkedin "),
              m()()()(),
              pe(),
              p(28, "div", 18),
              b(29, "img", 19),
              p(30, "p"),
              E(31, "Mateo Gonzalez 2023"),
              m()()),
              2 & t &&
                (A(1),
                _("ngIf", !ie(2, 2, n.language$)),
                A(2),
                _("ngIf", ie(4, 4, n.language$)));
          },
          dependencies: [Jn, Or],
        }));
      class us {
        constructor(t) {
          (this.idiom = t), (this.language$ = this.idiom.language$);
        }
      }
      function GE(e, t) {
        1 & e && (p(0, "p", 10), E(1, " WORK EXPERIENCE "), m());
      }
      function qE(e, t) {
        1 & e && (p(0, "p", 10), E(1, " EXPERIENCIA LABORAL "), m());
      }
      (us.ɵfac = function (t) {
        return new (t || us)(P(nn));
      }),
        (us.ɵcmp = Zt({
          type: us,
          selectors: [["app-tools"]],
          decls: 120,
          vars: 6,
          consts: [
            ["id", "tools", 1, "w-full", "bg-Gray3"],
            [
              "data-aos",
              "zoom-in-right",
              "data-aos-duration",
              "2000",
              1,
              "w-11/12",
              "my-0",
              "mx-auto",
            ],
            [
              "class",
              "text-3xl font-semibold drop-shadow-md py-8 text-Blues",
              4,
              "ngIf",
            ],
            [
              "data-aos",
              "fade-down-right",
              "data-aos-duration",
              "3000",
              1,
              "w-11/12",
              "my-0",
              "mx-auto",
              "pb-12",
              "grid",
              "gap-7",
              "lg:grid-cols-2",
            ],
            [
              1,
              "w-full",
              "pb-11",
              "border-stone-400",
              "rounded-lg",
              "efect_card",
              "lg:px-11",
            ],
            [
              1,
              "text-xl",
              "font-semibold",
              "drop-shadow-md",
              "py-8",
              "text-whites",
              "text-center",
            ],
            [1, "w-full", "grid", "grid-cols-2", "gap-12", "md:grid-cols-3"],
            [1, "w-full", "flex", "flex-col", "items-center", "drop-shadow-md"],
            [
              "width",
              "100px",
              "height",
              "100px",
              "viewBox",
              "0 0 32 32",
              "fill",
              "none",
              "xmlns",
              "http://www.w3.org/2000/svg",
            ],
            ["d", "M6 28L4 3H28L26 28L16 31L6 28Z", "fill", "#E44D26"],
            ["d", "M26 5H16V29.5L24 27L26 5Z", "fill", "#F16529"],
            [
              "d",
              "M9.5 17.5L8.5 8H24L23.5 11H11.5L12 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5H9.5Z",
              "fill",
              "white",
            ],
            [1, "text-whites", "font-normal"],
            ["d", "M6 28L4 3H28L26 28L16 31L6 28Z", "fill", "#1172B8"],
            ["d", "M26 5H16V29.5L24 27L26 5Z", "fill", "#33AADD"],
            [
              "d",
              "M19.5 17.5H9.5L9 14L17 11.5H9L8.5 8.5H24L23.5 12L17 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5Z",
              "fill",
              "white",
            ],
            [
              "width",
              "100px",
              "height",
              "100px",
              "viewBox",
              "0 0 32 32",
              "xmlns",
              "http://www.w3.org/2000/svg",
            ],
            [
              "d",
              "M26.11,17.572a5.8,5.8,0,0,0-2.537.588,5.345,5.345,0,0,1-.568-1.314,3.53,3.53,0,0,1-.051-1.1,9.811,9.811,0,0,1,.332-1.192c-.005-.051-.061-.292-.624-.3s-1.048.107-1.1.256a6.171,6.171,0,0,0-.235.834,19.686,19.686,0,0,1-1.713,3.294,3.186,3.186,0,0,1-.44-2.066,9.811,9.811,0,0,1,.332-1.192c-.005-.051-.061-.292-.624-.3s-1.048.107-1.1.256-.118.5-.235.834-1.483,3.386-1.841,4.173c-.184.4-.343.726-.455.946h0a.233.233,0,0,1-.02.041c-.1.189-.153.292-.153.292v.005c-.077.138-.159.266-.2.266a1.711,1.711,0,0,1,.01-.869c.2-1.059.69-2.705.685-2.762,0-.031.092-.317-.317-.465a.508.508,0,0,0-.578.1c-.036,0-.061.087-.061.087s.445-1.851-.849-1.851a3.855,3.855,0,0,0-2.475,1.683c-.348.189-1.089.593-1.882,1.028-.3.169-.614.338-.905.5-.02-.02-.041-.046-.061-.066C6.87,17.6,3.975,16.416,4.1,14.171c.046-.818.327-2.966,5.559-5.575,4.306-2.122,7.733-1.534,8.326-.23.849,1.862-1.836,5.319-6.285,5.82a3.351,3.351,0,0,1-2.813-.711c-.235-.256-.271-.271-.358-.22-.143.077-.051.307,0,.44a2.626,2.626,0,0,0,1.606,1.263,8.55,8.55,0,0,0,5.217-.517c2.7-1.043,4.8-3.943,4.184-6.372-.619-2.465-4.71-3.278-8.582-1.9A19.5,19.5,0,0,0,4.359,9.952c-2.133,1.995-2.47,3.728-2.332,4.455.5,2.578,4.051,4.255,5.472,5.5-.072.041-.138.077-.194.107-.711.353-3.421,1.77-4.1,3.268-.767,1.7.123,2.915.711,3.079a4.374,4.374,0,0,0,4.71-1.908A4.725,4.725,0,0,0,9.049,20.1a.107.107,0,0,0-.02-.031l.557-.327c.363-.215.721-.414,1.028-.578a6.74,6.74,0,0,0-.363,1.862,3.886,3.886,0,0,0,.834,2.7.921.921,0,0,0,.675.22c.6,0,.875-.5,1.176-1.094.368-.726.7-1.57.7-1.57s-.414,2.281.711,2.281c.409,0,.823-.532,1.008-.8v.005s.01-.015.031-.051l.066-.107v-.01c.164-.286.532-.936,1.079-2.015.706-1.391,1.386-3.13,1.386-3.13a8.888,8.888,0,0,0,.271,1.13,10.643,10.643,0,0,0,.583,1.309c-.164.23-.266.358-.266.358l.005.005c-.133.174-.276.363-.435.547a16.3,16.3,0,0,0-1.314,1.647.447.447,0,0,0,.123.6,1.116,1.116,0,0,0,.685.113,3.147,3.147,0,0,0,1.028-.235,3.45,3.45,0,0,0,.885-.465,1.98,1.98,0,0,0,.849-1.744,3.521,3.521,0,0,0-.322-1.233c.051-.072.1-.143.148-.215a23.428,23.428,0,0,0,1.534-2.649,8.888,8.888,0,0,0,.271,1.13,7.57,7.57,0,0,0,.5,1.125A4.861,4.861,0,0,0,20.965,20.8c-.322.931-.072,1.35.4,1.447a1.425,1.425,0,0,0,.747-.153,3.4,3.4,0,0,0,.946-.486,2.126,2.126,0,0,0,1.043-1.729,3.268,3.268,0,0,0-.235-1.023,5.356,5.356,0,0,1,2.716-.312c2.434.286,2.915,1.805,2.823,2.445a1.618,1.618,0,0,1-.772,1.094c-.169.107-.225.143-.21.22.02.113.1.107.245.087A1.9,1.9,0,0,0,30,20.7c.077-1.5-1.355-3.145-3.887-3.13ZM7.33,23.9c-.808.88-1.933,1.212-2.419.931-.522-.3-.317-1.6.675-2.532a12.884,12.884,0,0,1,1.9-1.417c.118-.072.292-.174.5-.3l.056-.031h0l.123-.077A3.493,3.493,0,0,1,7.33,23.9Zm5.881-4c-.281.685-.869,2.44-1.227,2.342-.307-.082-.5-1.412-.061-2.726a6.193,6.193,0,0,1,.956-1.754c.44-.491.926-.655,1.043-.455a9.062,9.062,0,0,1-.711,2.593Zm4.853,2.322c-.118.061-.23.1-.281.072-.036-.02.051-.1.051-.1s.609-.655.849-.951c.138-.174.3-.378.476-.609V20.7c0,.782-.757,1.309-1.094,1.524Zm3.744-.854c-.087-.061-.072-.266.22-.905a3.408,3.408,0,0,1,.834-1.074,1.448,1.448,0,0,1,.082.471,1.547,1.547,0,0,1-1.135,1.509Z",
              2,
              "fill",
              "#cd6799",
            ],
            [
              "d",
              "M9,13.7q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q11.1,10.9,9,13.7ZM2,22.1q1.4-5.6,7-5.6c5.6,0,6.3,4.2,9.1,4.9q2.8.7,4.9-2.1-1.4,5.6-7,5.6c-5.6,0-6.3-4.2-9.1-4.9Q4.1,19.3,2,22.1Z",
              2,
              "fill",
              "#44a8b3",
            ],
            [
              "xmlns",
              "http://www.w3.org/2000/svg",
              "aria-label",
              "JavaScript",
              "role",
              "img",
              "viewBox",
              "0 0 512 512",
              "width",
              "100px",
              "height",
              "100px",
            ],
            ["width", "512", "height", "512", "rx", "15%", "fill", "#f7df1e"],
            [
              "d",
              "M324 370c10 17 24 29 47 29c20 0 33-10 33 -24c0-16 -13 -22 -35 -32l-12-5c-35-15 -58 -33 -58 -72c0-36 27 -64 70 -64c31 0 53 11 68 39l-37 24c-8-15 -17 -21 -31 -21c-14 0-23 9 -23 21c0 14 9 20 30 29l12 5c41 18 64 35 64 76c0 43-34 67 -80 67c-45 0-74 -21 -88 -49zm-170 4c8 13 14 25 31 25c16 0 26-6 26 -30V203h48v164c0 50-29 72 -72 72c-39 0-61 -20 -72 -44z",
            ],
            [
              "xmlns",
              "http://www.w3.org/2000/svg",
              "aria-label",
              "TypeScript",
              "role",
              "img",
              "viewBox",
              "0 0 512 512",
              "width",
              "100px",
              "height",
              "100px",
            ],
            ["width", "512", "height", "512", "rx", "15%", "fill", "#3178c6"],
            [
              "fill",
              "#ffffff",
              "d",
              "m233 284h64v-41H118v41h64v183h51zm84 173c8.1 4.2 18 7.3 29 9.4s23 3.1 35 3.1c12 0 23-1.1 34-3.4c11-2.3 20-6.1 28-11c8.1-5.3 15-12 19-21s7.1-19 7.1-32c0-9.1-1.4-17-4.1-24s-6.6-13-12-18c-5.1-5.3-11-10-18-14s-15-8.2-24-12c-6.6-2.7-12-5.3-18-7.9c-5.2-2.6-9.7-5.2-13-7.8c-3.7-2.7-6.5-5.5-8.5-8.4c-2-3-3-6.3-3-10c0-3.4.89-6.5 2.7-9.3s4.3-5.1 7.5-7.1c3.2-2 7.2-3.5 12-4.6c4.7-1.1 9.9-1.6 16-1.6c4.2 0 8.6.31 13 .94c4.6.63 9.3 1.6 14 2.9c4.7 1.3 9.3 2.9 14 4.9c4.4 2 8.5 4.3 12 6.9v-47c-7.6-2.9-16-5.1-25-6.5s-19-2.1-31-2.1c-12 0-23 1.3-34 3.8s-20 6.5-28 12c-8.1 5.4-14 12-19 21c-4.7 8.4-7 18-7 30c0 15 4.3 28 13 38c8.6 11 22 19 39 27c6.9 2.8 13 5.6 19 8.3s11 5.5 15 8.4c4.3 2.9 7.7 6.1 10 9.5c2.5 3.4 3.8 7.4 3.8 12c0 3.2-.78 6.2-2.3 9s-3.9 5.2-7.1 7.2s-7.1 3.6-12 4.8c-4.7 1.1-10 1.7-17 1.7c-11 0-22-1.9-32-5.7c-11-3.8-21-9.5-28.1-15.44z",
            ],
            ["d", "M16 2L3 7L5 24L16 30L27 24L29 7L16 2Z", "fill", "#DD0031"],
            ["d", "M16 2V30L27 24L29 7L16 2Z", "fill", "#C3002F"],
            [
              "d",
              "M15.9998 5.09375L7.87305 23.3638H10.9031L12.5368 19.2757H19.4348L21.0685 23.3638H24.0986L15.9998 5.09375ZM18.3736 16.7557H13.626L15.9998 11.0298L18.3736 16.7557Z",
              "fill",
              "white",
            ],
            [
              "width",
              "100px",
              "height",
              "100px",
              "viewBox",
              "0 -14 256 256",
              "version",
              "1.1",
              "xmlns",
              "http://www.w3.org/2000/svg",
              0,
              "xmlns",
              "xlink",
              "http://www.w3.org/1999/xlink",
              "preserveAspectRatio",
              "xMidYMid",
            ],
            [
              "d",
              "M210.483381,73.8236374 C207.827698,72.9095503 205.075867,72.0446761 202.24247,71.2267368 C202.708172,69.3261098 203.135596,67.4500894 203.515631,65.6059664 C209.753843,35.3248922 205.675082,10.9302478 191.747328,2.89849283 C178.392359,-4.80289661 156.551327,3.22703567 134.492936,22.4237776 C132.371761,24.2697233 130.244662,26.2241201 128.118477,28.2723861 C126.701777,26.917204 125.287358,25.6075897 123.876584,24.3549348 C100.758745,3.82852863 77.5866802,-4.82157937 63.6725966,3.23341515 C50.3303869,10.9571328 46.3792156,33.8904224 51.9945178,62.5880206 C52.5367729,65.3599011 53.1706189,68.1905639 53.8873982,71.068617 C50.6078941,71.9995641 47.4418534,72.9920277 44.4125156,74.0478303 C17.3093297,83.497195 0,98.3066828 0,113.667995 C0,129.533287 18.5815786,145.446423 46.8116526,155.095373 C49.0394553,155.856809 51.3511025,156.576778 53.7333796,157.260293 C52.9600965,160.37302 52.2875179,163.423318 51.7229345,166.398431 C46.3687351,194.597975 50.5500231,216.989464 63.8566899,224.664425 C77.6012619,232.590464 100.66852,224.443422 123.130185,204.809231 C124.905501,203.257196 126.687196,201.611293 128.472081,199.886102 C130.785552,202.113904 133.095375,204.222319 135.392897,206.199955 C157.14963,224.922338 178.637969,232.482469 191.932332,224.786092 C205.663234,216.837268 210.125675,192.78347 204.332202,163.5181 C203.88974,161.283006 203.374826,158.99961 202.796573,156.675661 C204.416503,156.196743 206.006814,155.702335 207.557482,155.188332 C236.905331,145.46465 256,129.745175 256,113.667995 C256,98.2510906 238.132466,83.3418093 210.483381,73.8236374 L210.483381,73.8236374 Z M204.118035,144.807565 C202.718197,145.270987 201.281904,145.718918 199.818271,146.153177 C196.578411,135.896354 192.205739,124.989735 186.854729,113.72131 C191.961041,102.721277 196.164656,91.9540963 199.313837,81.7638014 C201.93261,82.5215915 204.474374,83.3208483 206.923636,84.1643056 C230.613348,92.3195488 245.063763,104.377206 245.063763,113.667995 C245.063763,123.564379 229.457753,136.411268 204.118035,144.807565 L204.118035,144.807565 Z M193.603754,165.642007 C196.165567,178.582766 196.531475,190.282717 194.834536,199.429057 C193.309843,207.64764 190.243595,213.12715 186.452366,215.321689 C178.384612,219.991462 161.131788,213.921395 142.525146,197.909832 C140.392124,196.074366 138.243609,194.114502 136.088259,192.040261 C143.301619,184.151133 150.510878,174.979732 157.54698,164.793993 C169.922699,163.695814 181.614905,161.900447 192.218042,159.449363 C192.740247,161.555956 193.204126,163.621993 193.603754,165.642007 L193.603754,165.642007 Z M87.2761866,214.514686 C79.3938934,217.298414 73.1160375,217.378157 69.3211631,215.189998 C61.2461189,210.532528 57.8891498,192.554265 62.4682434,168.438039 C62.9927272,165.676183 63.6170041,162.839142 64.3365173,159.939216 C74.8234575,162.258154 86.4299951,163.926841 98.8353334,164.932519 C105.918826,174.899534 113.336329,184.06091 120.811247,192.08264 C119.178102,193.65928 117.551336,195.16028 115.933685,196.574699 C106.001303,205.256705 96.0479605,211.41654 87.2761866,214.514686 L87.2761866,214.514686 Z M50.3486141,144.746959 C37.8658105,140.48046 27.5570398,134.935332 20.4908634,128.884403 C14.1414664,123.446815 10.9357817,118.048415 10.9357817,113.667995 C10.9357817,104.34622 24.8334611,92.4562517 48.0123604,84.3748281 C50.8247961,83.3942121 53.7689223,82.4701001 56.8242337,81.6020363 C60.0276398,92.0224477 64.229889,102.917218 69.3011135,113.93411 C64.1642716,125.11459 59.9023288,136.182975 56.6674809,146.725506 C54.489347,146.099407 52.3791089,145.440499 50.3486141,144.746959 L50.3486141,144.746959 Z M62.7270678,60.4878073 C57.9160346,35.9004118 61.1112387,17.3525532 69.1516515,12.6982729 C77.7160924,7.74005624 96.6544653,14.8094222 116.614922,32.5329619 C117.890816,33.6657739 119.171723,34.8514442 120.456275,36.0781256 C113.018267,44.0647686 105.66866,53.1573386 98.6480514,63.0655695 C86.6081646,64.1815215 75.0831931,65.9741531 64.4868907,68.3746571 C63.8206914,65.6948233 63.2305903,63.0619242 62.7270678,60.4878073 L62.7270678,60.4878073 Z M173.153901,87.7550367 C170.620796,83.3796304 168.020249,79.1076627 165.369124,74.9523483 C173.537126,75.9849113 181.362914,77.3555864 188.712066,79.0329319 C186.505679,86.1041206 183.755673,93.4974728 180.518546,101.076741 C178.196419,96.6680702 175.740322,92.2229454 173.153901,87.7550367 L173.153901,87.7550367 Z M128.122121,43.8938899 C133.166461,49.3588189 138.218091,55.4603279 143.186789,62.0803968 C138.179814,61.8439007 133.110868,61.720868 128.000001,61.720868 C122.937434,61.720868 117.905854,61.8411667 112.929865,62.0735617 C117.903575,55.515009 122.99895,49.4217021 128.122121,43.8938899 L128.122121,43.8938899 Z M82.8018984,87.830679 C80.2715265,92.2183886 77.8609975,96.6393627 75.5753239,101.068539 C72.3906004,93.5156998 69.6661103,86.0886276 67.440586,78.9171899 C74.7446255,77.2826781 82.5335049,75.9461789 90.6495601,74.9332099 C87.9610684,79.1268011 85.3391054,83.4302106 82.8018984,87.8297677 L82.8018984,87.830679 L82.8018984,87.830679 Z M90.8833221,153.182899 C82.4979621,152.247395 74.5919739,150.979704 67.289757,149.390303 C69.5508242,142.09082 72.3354636,134.505173 75.5876271,126.789657 C77.8792246,131.215644 80.2993228,135.638441 82.8451877,140.03572 L82.8456433,140.03572 C85.4388987,144.515476 88.1255676,148.90364 90.8833221,153.182899 L90.8833221,153.182899 Z M128.424691,184.213105 C123.24137,178.620587 118.071264,172.434323 113.021912,165.780078 C117.923624,165.972373 122.921029,166.0708 128.000001,166.0708 C133.217953,166.0708 138.376211,165.953235 143.45336,165.727219 C138.468257,172.501308 133.434855,178.697141 128.424691,184.213105 L128.424691,184.213105 Z M180.622896,126.396409 C184.044571,134.195313 186.929004,141.741317 189.219234,148.9164 C181.796719,150.609693 173.782736,151.973534 165.339049,152.986959 C167.996555,148.775595 170.619884,144.430263 173.197646,139.960532 C175.805484,135.438399 178.28163,130.90943 180.622896,126.396409 L180.622896,126.396409 Z M163.724586,134.496971 C159.722835,141.435557 155.614455,148.059271 151.443648,154.311611 C143.847063,154.854776 135.998946,155.134562 128.000001,155.134562 C120.033408,155.134562 112.284171,154.887129 104.822013,154.402745 C100.48306,148.068386 96.285368,141.425078 92.3091341,134.556664 L92.3100455,134.556664 C88.3442923,127.706935 84.6943232,120.799333 81.3870228,113.930466 C84.6934118,107.045648 88.3338117,100.130301 92.276781,93.292874 L92.2758697,93.294241 C96.2293193,86.4385872 100.390102,79.8276317 104.688954,73.5329157 C112.302398,72.9573964 120.109505,72.6571055 127.999545,72.6571055 L128.000001,72.6571055 C135.925583,72.6571055 143.742714,72.9596746 151.353879,73.5402067 C155.587114,79.7888993 159.719645,86.3784378 163.688588,93.2350031 C167.702644,100.168578 171.389978,107.037901 174.724618,113.77508 C171.400003,120.627999 167.720871,127.566587 163.724586,134.496971 L163.724586,134.496971 Z M186.284677,12.3729198 C194.857321,17.3165548 198.191049,37.2542268 192.804953,63.3986692 C192.461372,65.0669011 192.074504,66.7661189 191.654369,68.4881206 C181.03346,66.0374921 169.500286,64.2138746 157.425315,63.0810626 C150.391035,53.0639249 143.101577,43.9572289 135.784778,36.073113 C137.751934,34.1806885 139.716356,32.3762092 141.672575,30.673346 C160.572216,14.2257007 178.236518,7.73185406 186.284677,12.3729198 L186.284677,12.3729198 Z M128.000001,90.8080696 C140.624975,90.8080696 150.859926,101.042565 150.859926,113.667995 C150.859926,126.292969 140.624975,136.527922 128.000001,136.527922 C115.375026,136.527922 105.140075,126.292969 105.140075,113.667995 C105.140075,101.042565 115.375026,90.8080696 128.000001,90.8080696 L128.000001,90.8080696 Z",
              "fill",
              "#00D8FF",
            ],
            [
              1,
              "w-full",
              "border-stone-400",
              "rounded-lg",
              "efect_card",
              "lg:px-11",
            ],
            [
              "d",
              "M16.0497 8.44062C22.6378 3.32607 19.2566 0 19.2566 0C19.7598 5.28738 13.813 6.53583 12.2189 10.1692C11.1312 12.6485 12.9638 14.8193 16.0475 17.5554C15.7749 16.9494 15.3544 16.3606 14.9288 15.7645C13.4769 13.7313 11.9645 11.6132 16.0497 8.44062Z",
              "fill",
              "#E76F00",
            ],
            [
              "d",
              "M17.1015 18.677C17.1015 18.677 19.0835 17.0779 17.5139 15.3008C12.1931 9.27186 23.3333 6.53583 23.3333 6.53583C16.5317 9.8125 17.5471 11.7574 19.2567 14.1202C21.0871 16.6538 17.1015 18.677 17.1015 18.677Z",
              "fill",
              "#E76F00",
            ],
            [
              "d",
              "M22.937 23.4456C29.0423 20.3258 26.2195 17.3278 24.2492 17.7317C23.7662 17.8305 23.5509 17.9162 23.5509 17.9162C23.5509 17.9162 23.7302 17.64 24.0726 17.5204C27.9705 16.1729 30.9682 21.4949 22.8143 23.6028C22.8143 23.6029 22.9088 23.5198 22.937 23.4456Z",
              "fill",
              "#5382A1",
            ],
            [
              "d",
              "M10.233 19.4969C6.41312 18.9953 12.3275 17.6139 12.3275 17.6139C12.3275 17.6139 10.0307 17.4616 7.20592 18.8043C3.86577 20.3932 15.4681 21.1158 21.474 19.5625C22.0984 19.1432 22.9614 18.7798 22.9614 18.7798C22.9614 18.7798 20.5037 19.2114 18.0561 19.4145C15.0612 19.6612 11.8459 19.7093 10.233 19.4969Z",
              "fill",
              "#5382A1",
            ],
            [
              "d",
              "M11.6864 22.4758C9.55624 22.2592 10.951 21.2439 10.951 21.2439C5.43898 23.0429 14.0178 25.083 21.7199 22.8682C20.9012 22.5844 20.3806 22.0653 20.3806 22.0653C16.6163 22.7781 14.441 22.7553 11.6864 22.4758Z",
              "fill",
              "#5382A1",
            ],
            [
              "d",
              "M12.6145 25.6991C10.486 25.4585 11.7295 24.7474 11.7295 24.7474C6.72594 26.1222 14.7729 28.9625 21.1433 26.2777C20.0999 25.8787 19.3528 25.4181 19.3528 25.4181C16.5111 25.9469 15.1931 25.9884 12.6145 25.6991Z",
              "fill",
              "#5382A1",
            ],
            [
              "d",
              "M25.9387 27.3388C25.9387 27.3388 26.8589 28.0844 24.9252 28.6612C21.2481 29.7566 9.62093 30.0874 6.39094 28.7049C5.22984 28.2082 7.40723 27.5189 8.09215 27.3742C8.80646 27.2219 9.21466 27.2503 9.21466 27.2503C7.9234 26.3558 0.868489 29.0067 5.63111 29.7659C18.6195 31.8372 29.3077 28.8331 25.9387 27.3388Z",
              "fill",
              "#5382A1",
            ],
            [
              "d",
              "M28 28.9679C27.7869 31.6947 18.7877 32.2683 12.9274 31.8994C9.10432 31.6583 8.33812 31.0558 8.32691 31.047C11.9859 31.6402 18.1549 31.7482 23.1568 30.8225C27.5903 30.0016 28 28.9679 28 28.9679Z",
              "fill",
              "#5382A1",
            ],
            [
              "width",
              "100px",
              "height",
              "100px",
              "viewBox",
              "0 0 256 256",
              "version",
              "1.1",
              "xmlns",
              "http://www.w3.org/2000/svg",
              0,
              "xmlns",
              "xlink",
              "http://www.w3.org/1999/xlink",
              "preserveAspectRatio",
              "xMidYMid",
            ],
            [
              "d",
              "M38.9437824,35.879008 C89.5234256,-13.1200214 170.398168,-11.8028432 219.397197,39.0402357 C224.929346,31.6640377 229.671187,23.4975328 233.095851,15.0675923 C249.165425,64.0666217 258.912543,105.162582 255.224444,137.038295 C253.380395,163.90873 242.842969,189.725423 225.456217,210.273403 C180.145286,264.014274 99.53398,270.863601 45.7931091,225.55267 L45.7931091,225.55267 L44.765,224.638 L44.7103323,224.601984 C44.5420247,224.484832 44.376007,224.362668 44.2124952,224.235492 C43.7219599,223.853965 43.2765312,223.438607 42.8762093,222.995252 L42.732,222.831 L41.0512675,221.3377 C39.4121124,219.93271 37.7729573,218.52772 36.3188215,216.93771 L35.7825547,216.332423 C-13.2164747,165.752779 -11.6358609,84.8780374 38.9437824,35.879008 Z M57.9111486,207.375611 C53.169307,203.687512 46.3199803,204.214383 42.6318814,208.956225 C39.3888978,213.125775 39.4048731,218.924805 42.6798072,222.771269 L42.732,222.831 L44.765,224.638 L44.9644841,224.773953 C49.5691585,227.80174 55.7644273,227.175885 59.2982065,222.896387 L59.4917624,222.654878 C63.1798614,217.913037 62.3895545,211.06371 57.9111486,207.375611 Z M231.778672,28.2393744 C218.60689,55.9001168 185.940871,76.9749681 157.753257,83.5608592 C131.146257,89.8833146 107.963921,84.6146018 83.4644059,94.0982849 C27.6160498,115.436572 28.6697923,181.822354 59.2283268,196.838185 L59.2283268,196.838185 L61.0723763,197.891928 C61.0723763,197.891928 83.1456487,193.50309 104.973663,187.707242 L106.843514,187.207079 C115.561826,184.857554 124.138869,182.296538 131.146257,179.714869 C167.500376,166.279651 207.542593,133.08676 220.714375,94.6251562 C213.865049,134.667374 179.35498,173.392413 144.84491,191.042601 C126.404416,200.526284 112.178891,202.633769 81.883792,213.171195 C78.195693,214.488373 75.297901,215.805551 75.297901,215.805551 C75.6675607,215.754564 76.0372203,215.70481 76.4060145,215.65629 L77.1421925,215.560893 L77.1421925,215.560893 L77.8745239,215.468787 C84.5652297,214.639554 90.5771682,214.224938 90.5771682,214.224938 C133.517178,212.117452 200.956702,226.342977 232.305544,184.45671 C264.444692,141.780136 246.531068,72.7599979 231.778672,28.2393744 Z",
              "fill",
              "#6DB33F",
            ],
            [
              "d",
              "M57.9111486,207.375611 C62.3895545,211.06371 63.1798614,217.913037 59.4917624,222.654878 C55.8036635,227.39672 48.9543368,227.923591 44.2124952,224.235492 C39.4706537,220.547393 38.9437824,213.698066 42.6318814,208.956225 C46.3199803,204.214383 53.169307,203.687512 57.9111486,207.375611 Z M231.778672,28.2393744 C246.531068,72.7599979 264.444692,141.780136 232.305544,184.45671 C200.956702,226.342977 133.517178,212.117452 90.5771682,214.224938 C90.5771682,214.224938 84.5652297,214.639554 77.8745239,215.468787 L77.1421925,215.560893 C76.5300999,215.63902 75.9140004,215.720572 75.297901,215.805551 C75.297901,215.805551 78.195693,214.488373 81.883792,213.171195 C112.178891,202.633769 126.404416,200.526284 144.84491,191.042601 C179.35498,173.392413 213.865049,134.667374 220.714375,94.6251562 C207.542593,133.08676 167.500376,166.279651 131.146257,179.714869 C106.119871,188.935116 61.0723763,197.891928 61.0723763,197.891928 L59.2283268,196.838185 C28.6697923,181.822354 27.6160498,115.436572 83.4644059,94.0982849 C107.963921,84.6146018 131.146257,89.8833146 157.753257,83.5608592 C185.940871,76.9749681 218.60689,55.9001168 231.778672,28.2393744 Z",
              "fill",
              "#FFFFFF",
            ],
            [
              "d",
              "M8.785,6.865a3.055,3.055,0,0,0-.785.1V7h.038a6.461,6.461,0,0,0,.612.785c.154.306.288.611.441.917.019-.019.038-.039.038-.039a1.074,1.074,0,0,0,.4-.957,4.314,4.314,0,0,1-.23-.4c-.115-.191-.364-.287-.517-.44",
              2,
              "fill",
              "#5d87a1",
              "fill-rule",
              "evenodd",
            ],
            [
              "d",
              "M27.78,23.553a8.849,8.849,0,0,0-3.712.536c-.287.115-.745.115-.785.478.154.153.172.4.307.613a4.467,4.467,0,0,0,.995,1.167c.4.306.8.611,1.225.879.745.461,1.588.728,2.314,1.187.422.268.842.612,1.264.9.21.153.343.4.611.5v-.058a3.844,3.844,0,0,0-.291-.613c-.191-.19-.383-.363-.575-.554a9.118,9.118,0,0,0-1.99-1.932c-.613-.422-1.953-1-2.2-1.7l-.039-.039a7.69,7.69,0,0,0,1.321-.308c.65-.172,1.243-.133,1.912-.3.307-.077.862-.268.862-.268v-.3c-.342-.34-.587-.795-.947-1.116a25.338,25.338,0,0,0-3.122-2.328c-.587-.379-1.344-.623-1.969-.946-.226-.114-.6-.17-.737-.36a7.594,7.594,0,0,1-.776-1.457c-.548-1.04-1.079-2.193-1.551-3.293a20.236,20.236,0,0,0-.965-2.157A19.078,19.078,0,0,0,11.609,5a9.07,9.07,0,0,0-2.421-.776c-.474-.02-.946-.057-1.419-.075A7.55,7.55,0,0,1,6.9,3.485C5.818,2.8,3.038,1.328,2.242,3.277,1.732,4.508,3,5.718,3.435,6.343A8.866,8.866,0,0,1,4.4,7.762c.133.322.171.663.3,1A22.556,22.556,0,0,0,5.687,11.3a8.946,8.946,0,0,0,.7,1.172c.153.209.417.3.474.645a5.421,5.421,0,0,0-.436,1.419,8.336,8.336,0,0,0,.549,6.358c.3.473,1.022,1.514,1.987,1.116.851-.34.662-1.419.908-2.364.056-.229.019-.379.132-.53V19.3s.483,1.061.723,1.6a10.813,10.813,0,0,0,2.4,2.59A3.514,3.514,0,0,1,14,24.657V25h.427A1.054,1.054,0,0,0,14,24.212a9.4,9.4,0,0,1-.959-1.16,24.992,24.992,0,0,1-2.064-3.519c-.3-.6-.553-1.258-.793-1.857-.11-.231-.11-.58-.295-.7a7.266,7.266,0,0,0-.884,1.313,11.419,11.419,0,0,0-.517,2.921c-.073.02-.037,0-.073.038-.589-.155-.792-.792-1.014-1.332a8.756,8.756,0,0,1-.166-5.164c.128-.405.683-1.681.461-2.068-.111-.369-.48-.58-.682-.871a7.767,7.767,0,0,1-.663-1.237C5.912,9.5,5.69,8.3,5.212,7.216a10.4,10.4,0,0,0-.921-1.489A9.586,9.586,0,0,1,3.276,4.22c-.092-.213-.221-.561-.074-.793a.3.3,0,0,1,.259-.252c.238-.212.921.058,1.16.174a9.2,9.2,0,0,1,1.824.967c.258.194.866.685.866.685h.18c.612.133,1.3.037,1.876.21a12.247,12.247,0,0,1,2.755,1.32,16.981,16.981,0,0,1,5.969,6.545c.23.439.327.842.537,1.3.4.94.9,1.9,1.3,2.814a12.578,12.578,0,0,0,1.36,2.564c.286.4,1.435.612,1.952.822a13.7,13.7,0,0,1,1.32.535c.651.4,1.3.861,1.913,1.3.305.23,1.262.708,1.32,1.091",
              2,
              "fill",
              "#00758f",
              "fill-rule",
              "evenodd",
            ],
            [
              "d",
              "M29.386,6.7c-.433.014-.3.139-1.231.369a18.911,18.911,0,0,0-3.114.588c-3.035,1.273-3.644,5.624-6.4,7.182-2.063,1.165-4.143,1.258-6.014,1.844a11,11,0,0,0-3.688,2.136c-.865.745-.887,1.4-1.791,2.336-.966,1-3.841.017-5.143,1.547.42.424.6.543,1.431.433-.171.325-1.18.6-.983,1.075.208.5,2.648.843,4.866-.5,1.033-.624,1.856-1.523,3.465-1.737a26.674,26.674,0,0,1,6.89.526,10.738,10.738,0,0,1-1.65,2.623c-.178.192.357.213.968.1a9.644,9.644,0,0,0,2.72-.973c1.019-.593,1.173-2.114,2.423-2.443a2.8,2.8,0,0,0,3.766.467c-1.031-.292-1.316-2.487-.968-3.455.33-.916.656-2.381.988-3.591.357-1.3.488-2.939.92-3.6a8.517,8.517,0,0,1,1.99-1.9A2.792,2.792,0,0,0,30,7.336c-.006-.414-.22-.645-.614-.632Z",
              2,
              "fill",
              "#002b64",
            ],
            [
              "d",
              "M2.9,24.122a6.216,6.216,0,0,0,3.809-.55,34.319,34.319,0,0,1,3.4-1.842c1.872-.6,3.924,0,5.925.121a8.616,8.616,0,0,0,1.449-.022c.745-.458.73-2.172,1.455-2.329a8.263,8.263,0,0,1-2.038,5.24,5.835,5.835,0,0,0,4.351-3.319,12.259,12.259,0,0,0,.7-1.63c.311.239.135.965.291,1.358,1.5-.834,2.353-2.736,2.921-4.66.656-2.227.925-4.481,1.349-5.14A5.608,5.608,0,0,1,28.142,9.9,2.625,2.625,0,0,0,29.507,8.05c-.7-.065-.866-.228-.97-.582a2.1,2.1,0,0,1-1.042.252c-.317.01-.666,0-1.092.039-3.523.362-3.971,4.245-6.229,6.447a5.3,5.3,0,0,1-.53.45,11.107,11.107,0,0,1-2.653,1.352c-1.444.552-2.817.591-4.172,1.067A12.5,12.5,0,0,0,10,18.49c-.2.14-.4.283-.574.428a5.62,5.62,0,0,0-1.1,1.275,8.473,8.473,0,0,1-1.079,1.389c-.749.735-3.546.214-4.531.9a.8.8,0,0,0-.256.276c.537.244.9.094,1.514.163.081.587-1.275.935-1.075,1.205Z",
              2,
              "fill",
              "#c49a6c",
            ],
            [
              "d",
              "M25.231,9.216a.832.832,0,0,0,1.358-.776C25.814,8.375,25.365,8.638,25.231,9.216Z",
              2,
              "fill",
              "#002b64",
            ],
            [
              "d",
              "M28.708,8.209a2.594,2.594,0,0,0-.387,1.345c0,.122-.092.2-.094.017a2.649,2.649,0,0,1,.385-1.385C28.7,8.026,28.757,8.092,28.708,8.209Z",
              2,
              "fill",
              "#002b64",
            ],
            [
              "d",
              "M28.574,8.1a3.2,3.2,0,0,0-.6,1.455c-.012.121-.11.2-.095.009a3.263,3.263,0,0,1,.6-1.495C28.585,7.921,28.634,7.992,28.574,8.1Z",
              2,
              "fill",
              "#002b64",
            ],
            [
              "d",
              "M28.453,7.965a3.785,3.785,0,0,0-.88,1.531c-.022.119-.126.186-.1,0a3.928,3.928,0,0,1,.885-1.57C28.479,7.784,28.521,7.859,28.453,7.965Z",
              2,
              "fill",
              "#002b64",
            ],
            [
              "d",
              "M28.344,7.81A5.223,5.223,0,0,0,27.223,9.45c-.039.115-.151.167-.095-.012A5.193,5.193,0,0,1,28.26,7.76c.135-.126.167-.045.084.051Z",
              2,
              "fill",
              "#002b64",
            ],
            [
              1,
              "text-3xl",
              "font-semibold",
              "drop-shadow-md",
              "py-8",
              "text-Blues",
            ],
          ],
          template: function (t, n) {
            1 & t &&
              (p(0, "section", 0)(1, "div", 1),
              N(2, UE, 2, 0, "p", 2),
              oe(3, "async"),
              N(4, zE, 2, 0, "p", 2),
              oe(5, "async"),
              m(),
              p(6, "div", 3)(7, "article", 4)(8, "p", 5),
              E(9, " FRONTEND "),
              m(),
              p(10, "div", 6)(11, "div", 7)(12, "span"),
              V(),
              p(13, "svg", 8),
              b(14, "path", 9)(15, "path", 10)(16, "path", 11),
              m()(),
              pe(),
              p(17, "p", 12),
              E(18, "HTML"),
              m()(),
              p(19, "div", 7)(20, "span"),
              V(),
              p(21, "svg", 8),
              b(22, "path", 13)(23, "path", 14)(24, "path", 15),
              m()(),
              pe(),
              p(25, "p", 12),
              E(26, "CSS"),
              m()(),
              p(27, "div", 7)(28, "span"),
              V(),
              p(29, "svg", 16)(30, "title"),
              E(31, "file_type_sass"),
              m(),
              b(32, "path", 17),
              m()(),
              pe(),
              p(33, "p", 12),
              E(34, "SASS"),
              m()(),
              p(35, "div", 7)(36, "span"),
              V(),
              p(37, "svg", 16)(38, "title"),
              E(39, "file_type_tailwind"),
              m(),
              b(40, "path", 18),
              m()(),
              pe(),
              p(41, "p", 12),
              E(42, "Tailwind"),
              m()(),
              p(43, "div", 7)(44, "span"),
              V(),
              p(45, "svg", 19),
              b(46, "rect", 20)(47, "path", 21),
              m()(),
              pe(),
              p(48, "p", 12),
              E(49, "JavaScript"),
              m()(),
              p(50, "div", 7)(51, "span"),
              V(),
              p(52, "svg", 22),
              b(53, "rect", 23)(54, "path", 24),
              m()(),
              pe(),
              p(55, "p", 12),
              E(56, "TypeScript"),
              m()(),
              p(57, "div", 7)(58, "span"),
              V(),
              p(59, "svg", 8),
              b(60, "path", 25)(61, "path", 26)(62, "path", 27),
              m()(),
              pe(),
              p(63, "p", 12),
              E(64, "Angular"),
              m()(),
              p(65, "div", 7)(66, "span"),
              V(),
              p(67, "svg", 28)(68, "g"),
              b(69, "path", 29),
              m()()(),
              pe(),
              p(70, "p", 12),
              E(71, "React"),
              m()()()(),
              p(72, "article", 30)(73, "p", 5),
              E(74, " BACKEND "),
              m(),
              p(75, "div", 6)(76, "div", 7)(77, "span"),
              V(),
              p(78, "svg", 8),
              b(79, "path", 31)(80, "path", 32)(81, "path", 33)(82, "path", 34)(
                83,
                "path",
                35
              )(84, "path", 36)(85, "path", 37)(86, "path", 38),
              m()(),
              pe(),
              p(87, "p", 12),
              E(88, "JAVA"),
              m()(),
              p(89, "div", 7)(90, "span"),
              V(),
              p(91, "svg", 39)(92, "g"),
              b(93, "path", 40)(94, "path", 41),
              m()()(),
              pe(),
              p(95, "p", 12),
              E(96, "SPRING"),
              m()(),
              p(97, "div", 7)(98, "span"),
              V(),
              p(99, "svg", 16)(100, "title"),
              E(101, "file_type_mysql"),
              m(),
              b(102, "path", 42)(103, "path", 43),
              m()(),
              pe(),
              p(104, "p", 12),
              E(105, "MYSQL"),
              m()(),
              p(106, "div", 7)(107, "span"),
              V(),
              p(108, "svg", 16)(109, "title"),
              E(110, "file_type_mariadb"),
              m(),
              b(111, "path", 44)(112, "path", 45)(113, "path", 46)(
                114,
                "path",
                47
              )(115, "path", 48)(116, "path", 49)(117, "path", 50),
              m()(),
              pe(),
              p(118, "p", 12),
              E(119, "MARIADB"),
              m()()()()()()),
              2 & t &&
                (A(2),
                _("ngIf", !ie(3, 2, n.language$)),
                A(2),
                _("ngIf", ie(5, 4, n.language$)));
          },
          dependencies: [Jn, Or],
        }));
      const sl = function (e, t) {
        return { exp: e, exp_hover: t };
      };
      function WE(e, t) {
        if (1 & e) {
          const n = wi();
          p(0, "button", 11),
            Rt("click", function () {
              return Jo(n), Xo(Et().toogleExp());
            }),
            E(1, " Bancamia Bank "),
            m();
        }
        if (2 & e) {
          const n = Et();
          _("ngClass", xi(1, sl, n.select1, !n.select1));
        }
      }
      function ZE(e, t) {
        if (1 & e) {
          const n = wi();
          p(0, "button", 11),
            Rt("click", function () {
              return Jo(n), Xo(Et().toogleExp());
            }),
            E(1, " Banco Bancamia "),
            m();
        }
        if (2 & e) {
          const n = Et();
          _("ngClass", xi(1, sl, n.select1, !n.select1));
        }
      }
      function QE(e, t) {
        if (1 & e) {
          const n = wi();
          p(0, "button", 12),
            Rt("click", function () {
              return Jo(n), Xo(Et().toogleExp2());
            }),
            E(1, " Distrital University "),
            m();
        }
        if (2 & e) {
          const n = Et();
          _("ngClass", xi(1, sl, n.select2, !n.select2));
        }
      }
      function YE(e, t) {
        if (1 & e) {
          const n = wi();
          p(0, "button", 12),
            Rt("click", function () {
              return Jo(n), Xo(Et().toogleExp2());
            }),
            E(1, " Universidad Distrital "),
            m();
        }
        if (2 & e) {
          const n = Et();
          _("ngClass", xi(1, sl, n.select2, !n.select2));
        }
      }
      function KE(e, t) {
        1 & e &&
          (p(0, "div", 13)(1, "h3", 14),
          E(2, " \u27a4 Semillero JR "),
          m(),
          p(3, "p"),
          E(
            4,
            " \u2705 Desarrollo e implementaci\xf3n de Microservicios, frontend y desarrollo mobile bajo metodolog\xedas Scrum. "
          ),
          m(),
          p(5, "p"),
          E(
            6,
            " \u{1f4dd}1. Mantenimiento y depuraci\xf3n de diferentes proyectos para mejorar el rendimiento y tener un c\xf3digo limpio. "
          ),
          m(),
          p(7, "p"),
          E(
            8,
            " \u{1f4dd}2. Desarrollo de implementaciones o servicios para clientes de la red. "
          ),
          m()());
      }
      function JE(e, t) {
        1 & e &&
          (p(0, "div", 13)(1, "h3", 14),
          E(2, " \u27a4 Developer JR "),
          m(),
          p(3, "p"),
          E(
            4,
            " \u2705Development and implementation of Microservices, web pages and development mobile under Scrum methodologies. "
          ),
          m(),
          p(5, "p"),
          E(
            6,
            " \u{1f4dd}1. Maintenance and debugging of different projects to improve performance and have clean code. "
          ),
          m(),
          p(7, "p"),
          E(
            8,
            " \u{1f4dd}2. Development of implementations or services for network customers. "
          ),
          m()());
      }
      function XE(e, t) {
        1 & e &&
          (p(0, "div", 13)(1, "h3", 14),
          E(2, " \u27a4 Asistente monitor - Curso Digitales II "),
          m(),
          p(3, "p"),
          E(
            4,
            "\u2705 Acompa\xf1amiento del proceso educativo de los estudiantes."
          ),
          m(),
          p(5, "p"),
          E(
            6,
            " \u{1f4dd}1. Realizar tutor\xedas y asesor\xedas para la realizaci\xf3n de los laboratorios de programaci\xf3n y desarrollo de software correspondientes al curso con lenguajes Python, Java, JavaScript, HTML, CSS. "
          ),
          m()());
      }
      function eS(e, t) {
        1 & e &&
          (p(0, "div", 13)(1, "h3", 14),
          E(2, " \u27a4 Assistant instructor - Digital II course "),
          m(),
          p(3, "p"),
          E(4, "\u2705 Accompanying the educational process of the students."),
          m(),
          p(5, "p"),
          E(
            6,
            " \u{1f4dd}1. Perform tutoring and counseling for the realization of programming and software development laboratories corresponding to the course with Python, Java, JavaScript, HTML, CSS languages. "
          ),
          m()());
      }
      class cs {
        constructor(t) {
          (this.idiom = t),
            (this.select1 = !0),
            (this.select2 = !1),
            (this.language$ = this.idiom.language$);
        }
        toogleExp() {
          (this.select1 = !0), (this.select2 = !1);
        }
        toogleExp2() {
          (this.select2 = !0), (this.select1 = !1);
        }
      }
      (cs.ɵfac = function (t) {
        return new (t || cs)(P(nn));
      }),
        (cs.ɵcmp = Zt({
          type: cs,
          selectors: [["app-exp-work"]],
          decls: 26,
          vars: 30,
          consts: [
            [1, "w-full", "h-[35rem]", "md:h-0", "md:w-0", "sm:h-[28rem]"],
            [1, "w-11/12", "my-0", "mx-auto", "mb-12", "md:mt-8"],
            [
              "data-aos",
              "fade-up-right",
              "class",
              "text-3xl font-blacks font-semibold drop-shadow-md dark:text-Blues",
              4,
              "ngIf",
            ],
            [
              "data-aos",
              "fade-right",
              "data-aos-offset",
              "300",
              "data-aos-easing",
              "ease-in-sine",
              1,
              "mt-9",
            ],
            [1, "lg:grid", "lg:grid-cols-5"],
            [
              1,
              "flex",
              "space-x-4",
              "border-b-2",
              "pb-2",
              "font-semibold",
              "lg:grid",
              "lg:grid-rows-4",
              "lg:gap-4",
              "lg:border-0",
            ],
            [
              "class",
              "text-center p-2 rounded-md row-start-2 lg:w-10/12 lg:my-0 lg:mx-auto",
              3,
              "ngClass",
              "click",
              4,
              "ngIf",
            ],
            [
              "class",
              "text-center p-2 rounded-md row-start-3 lg:w-10/12 lg:my-0 lg:mx-auto",
              3,
              "ngClass",
              "click",
              4,
              "ngIf",
            ],
            [
              1,
              "p-6",
              "border-x-2",
              "border-b-2",
              "rounded-md",
              "shadow-md",
              "dark:shadow-purple-500",
              "shadow-cyan-500",
              "lg:col-start-2",
              "lg:col-span-4",
              "lg:w-10/12",
              "lg:my-0",
              "lg:mx-auto",
              "lg:p-12",
            ],
            ["class", "space-y-6", 4, "ngIf"],
            [
              "data-aos",
              "fade-up-right",
              1,
              "text-3xl",
              "font-blacks",
              "font-semibold",
              "drop-shadow-md",
              "dark:text-Blues",
            ],
            [
              1,
              "text-center",
              "p-2",
              "rounded-md",
              "row-start-2",
              "lg:w-10/12",
              "lg:my-0",
              "lg:mx-auto",
              3,
              "ngClass",
              "click",
            ],
            [
              1,
              "text-center",
              "p-2",
              "rounded-md",
              "row-start-3",
              "lg:w-10/12",
              "lg:my-0",
              "lg:mx-auto",
              3,
              "ngClass",
              "click",
            ],
            [1, "space-y-6"],
            [1, "font-bold", "text-lg", "text-Blues", "dark:text-purples"],
          ],
          template: function (t, n) {
            1 & t &&
              (b(0, "div", 0),
              p(1, "section", 1),
              N(2, GE, 2, 0, "p", 2),
              oe(3, "async"),
              N(4, qE, 2, 0, "p", 2),
              oe(5, "async"),
              p(6, "article", 3)(7, "div", 4)(8, "div", 5),
              N(9, WE, 2, 4, "button", 6),
              oe(10, "async"),
              N(11, ZE, 2, 4, "button", 6),
              oe(12, "async"),
              N(13, QE, 2, 4, "button", 7),
              oe(14, "async"),
              N(15, YE, 2, 4, "button", 7),
              oe(16, "async"),
              m(),
              p(17, "div", 8),
              N(18, KE, 9, 0, "div", 9),
              oe(19, "async"),
              N(20, JE, 9, 0, "div", 9),
              oe(21, "async"),
              N(22, XE, 7, 0, "div", 9),
              oe(23, "async"),
              N(24, eS, 7, 0, "div", 9),
              oe(25, "async"),
              m()()()()),
              2 & t &&
                (A(2),
                _("ngIf", !ie(3, 10, n.language$)),
                A(2),
                _("ngIf", ie(5, 12, n.language$)),
                A(5),
                _("ngIf", !ie(10, 14, n.language$)),
                A(2),
                _("ngIf", ie(12, 16, n.language$)),
                A(2),
                _("ngIf", !ie(14, 18, n.language$)),
                A(2),
                _("ngIf", ie(16, 20, n.language$)),
                A(3),
                _("ngIf", ie(19, 22, n.select1 && n.language$)),
                A(2),
                _("ngIf", n.select1 && !ie(21, 24, n.language$)),
                A(2),
                _("ngIf", ie(23, 26, n.select2 && n.language$)),
                A(2),
                _("ngIf", n.select2 && !ie(25, 28, n.language$)));
          },
          dependencies: [ka, Jn, Or],
          encapsulation: 2,
        }));
      const tS = function (e) {
        return { dark: e };
      };
      class ds {
        constructor() {
          (this.title = "portfolio"), (this.darkMode = !0), (this.esp = !0);
        }
        toggleDarkMode() {
          this.darkMode = !this.darkMode;
        }
        ngOnInit() {
          n3.init(), window.addEventListener("load", n3.refresh);
        }
        toggleLanguage() {
          this.esp = !this.esp;
        }
      }
      (ds.ɵfac = function (t) {
        return new (t || ds)();
      }),
        (ds.ɵcmp = Zt({
          type: ds,
          selectors: [["app-root"]],
          decls: 9,
          vars: 3,
          consts: [
            [1, "font-Montserrat", 3, "ngClass"],
            [3, "toggleMode", "toggleIdiom"],
          ],
          template: function (t, n) {
            1 & t &&
              (p(0, "body", 0)(1, "app-navbar", 1),
              Rt("toggleMode", function () {
                return n.toggleDarkMode();
              })("toggleIdiom", function () {
                return n.toggleLanguage();
              }),
              m(),
              p(2, "main"),
              b(3, "app-hero")(4, "app-exp-work")(5, "app-projects")(
                6,
                "app-tools"
              ),
              m(),
              p(7, "footer"),
              b(8, "app-contactme"),
              m()()),
              2 & t &&
                _(
                  "ngClass",
                  (function $0(e, t, n, r) {
                    return H0(D(), _t(), e, t, n, r);
                  })(1, tS, n.darkMode)
                );
          },
          dependencies: [ka, os, is, as, ls, us, cs],
          encapsulation: 2,
        }));
      class Vo {}
      (Vo.ɵfac = function (t) {
        return new (t || Vo)();
      }),
        (Vo.ɵmod = vr({ type: Vo, bootstrap: [ds] })),
        (Vo.ɵinj = nr({ imports: [iw, $o] })),
        ow()
          .bootstrapModule(Vo)
          .catch((e) => console.error(e));
    },
    123: function (Bo) {
      Bo.exports = (function (Be) {
        function ue(j) {
          if (R[j]) return R[j].exports;
          var ce = (R[j] = { exports: {}, id: j, loaded: !1 });
          return (
            Be[j].call(ce.exports, ce, ce.exports, ue),
            (ce.loaded = !0),
            ce.exports
          );
        }
        var R = {};
        return (ue.m = Be), (ue.c = R), (ue.p = "dist/"), ue(0);
      })([
        function (Be, ue, R) {
          "use strict";
          function j(q) {
            return q && q.__esModule ? q : { default: q };
          }
          var ce =
              Object.assign ||
              function (q) {
                for (var et = 1; et < arguments.length; et++) {
                  var yt = arguments[et];
                  for (var at in yt)
                    Object.prototype.hasOwnProperty.call(yt, at) &&
                      (q[at] = yt[at]);
                }
                return q;
              },
            De = (j(R(1)), R(6)),
            W = j(De),
            J = j(R(7)),
            re = j(R(8)),
            tt = j(R(9)),
            er = j(R(10)),
            kn = j(R(11)),
            rn = j(R(14)),
            gt = [],
            mn = !1,
            Re = {
              offset: 120,
              delay: 0,
              easing: "ease",
              duration: 400,
              disable: !1,
              once: !1,
              startEvent: "DOMContentLoaded",
              throttleDelay: 99,
              debounceDelay: 50,
              disableMutationObserver: !1,
            },
            mt = function () {
              if (
                (arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0] &&
                  (mn = !0),
                mn)
              )
                return (
                  (gt = (0, kn.default)(gt, Re)),
                  (0, er.default)(gt, Re.once),
                  gt
                );
            },
            yn = function () {
              (gt = (0, rn.default)()), mt();
            };
          Be.exports = {
            init: function (q) {
              (Re = ce(Re, q)), (gt = (0, rn.default)());
              var et = document.all && !window.atob;
              return (function (q) {
                return (
                  !0 === q ||
                  ("mobile" === q && tt.default.mobile()) ||
                  ("phone" === q && tt.default.phone()) ||
                  ("tablet" === q && tt.default.tablet()) ||
                  ("function" == typeof q && !0 === q())
                );
              })(Re.disable) || et
                ? void gt.forEach(function (q, et) {
                    q.node.removeAttribute("data-aos"),
                      q.node.removeAttribute("data-aos-easing"),
                      q.node.removeAttribute("data-aos-duration"),
                      q.node.removeAttribute("data-aos-delay");
                  })
                : (Re.disableMutationObserver ||
                    re.default.isSupported() ||
                    (console.info(
                      '\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '
                    ),
                    (Re.disableMutationObserver = !0)),
                  document
                    .querySelector("body")
                    .setAttribute("data-aos-easing", Re.easing),
                  document
                    .querySelector("body")
                    .setAttribute("data-aos-duration", Re.duration),
                  document
                    .querySelector("body")
                    .setAttribute("data-aos-delay", Re.delay),
                  "DOMContentLoaded" === Re.startEvent &&
                  ["complete", "interactive"].indexOf(document.readyState) > -1
                    ? mt(!0)
                    : "load" === Re.startEvent
                    ? window.addEventListener(Re.startEvent, function () {
                        mt(!0);
                      })
                    : document.addEventListener(Re.startEvent, function () {
                        mt(!0);
                      }),
                  window.addEventListener(
                    "resize",
                    (0, J.default)(mt, Re.debounceDelay, !0)
                  ),
                  window.addEventListener(
                    "orientationchange",
                    (0, J.default)(mt, Re.debounceDelay, !0)
                  ),
                  window.addEventListener(
                    "scroll",
                    (0, W.default)(function () {
                      (0, er.default)(gt, Re.once);
                    }, Re.throttleDelay)
                  ),
                  Re.disableMutationObserver ||
                    re.default.ready("[data-aos]", yn),
                  gt);
            },
            refresh: mt,
            refreshHard: yn,
          };
        },
        function (Be, ue) {},
        ,
        ,
        ,
        ,
        function (Be, ue) {
          (function (R) {
            "use strict";
            function j(T, ge, q) {
              function et(ye) {
                var vt = Mt,
                  Fn = Ue;
                return (Mt = Ue = void 0), (Dn = ye), (ze = T.apply(Fn, vt));
              }
              function yt(ye) {
                return (Dn = ye), (ae = setTimeout(vn, ge)), Z ? et(ye) : ze;
              }
              function On(ye) {
                var vt = ye - me;
                return (
                  void 0 === me || vt >= ge || vt < 0 || (Ft && ye - Dn >= Ot)
                );
              }
              function vn() {
                var ye = k();
                return On(ye)
                  ? Ne(ye)
                  : void (ae = setTimeout(
                      vn,
                      (function at(ye) {
                        var al = ge - (ye - me);
                        return Ft ? yn(al, Ot - (ye - Dn)) : al;
                      })(ye)
                    ));
              }
              function Ne(ye) {
                return (
                  (ae = void 0), ke && Mt ? et(ye) : ((Mt = Ue = void 0), ze)
                );
              }
              function Gt() {
                var ye = k(),
                  vt = On(ye);
                if (((Mt = arguments), (Ue = this), (me = ye), vt)) {
                  if (void 0 === ae) return yt(me);
                  if (Ft) return (ae = setTimeout(vn, ge)), et(me);
                }
                return void 0 === ae && (ae = setTimeout(vn, ge)), ze;
              }
              var Mt,
                Ue,
                Ot,
                ze,
                ae,
                me,
                Dn = 0,
                Z = !1,
                Ft = !1,
                ke = !0;
              if ("function" != typeof T) throw new TypeError(ne);
              return (
                (ge = be(ge) || 0),
                Se(q) &&
                  ((Z = !!q.leading),
                  (Ot = (Ft = "maxWait" in q)
                    ? mt(be(q.maxWait) || 0, ge)
                    : Ot),
                  (ke = "trailing" in q ? !!q.trailing : ke)),
                (Gt.cancel = function Br() {
                  void 0 !== ae && clearTimeout(ae),
                    (Dn = 0),
                    (Mt = me = Ue = ae = void 0);
                }),
                (Gt.flush = function mr() {
                  return void 0 === ae ? ze : Ne(k());
                }),
                Gt
              );
            }
            function Se(T) {
              var ge = typeof T > "u" ? "undefined" : J(T);
              return !!T && ("object" == ge || "function" == ge);
            }
            function W(T) {
              return (
                "symbol" == (typeof T > "u" ? "undefined" : J(T)) ||
                ((function De(T) {
                  return (
                    !!T && "object" == (typeof T > "u" ? "undefined" : J(T))
                  );
                })(T) &&
                  Re.call(T) == Ee)
              );
            }
            function be(T) {
              if ("number" == typeof T) return T;
              if (W(T)) return re;
              if (Se(T)) {
                var ge = "function" == typeof T.valueOf ? T.valueOf() : T;
                T = Se(ge) ? ge + "" : ge;
              }
              if ("string" != typeof T) return 0 === T ? T : +T;
              T = T.replace(tt, "");
              var q = er.test(T);
              return q || gr.test(T)
                ? kn(T.slice(2), q ? 2 : 8)
                : pt.test(T)
                ? re
                : +T;
            }
            var J =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (T) {
                      return typeof T;
                    }
                  : function (T) {
                      return T &&
                        "function" == typeof Symbol &&
                        T.constructor === Symbol &&
                        T !== Symbol.prototype
                        ? "symbol"
                        : typeof T;
                    },
              ne = "Expected a function",
              re = NaN,
              Ee = "[object Symbol]",
              tt = /^\s+|\s+$/g,
              pt = /^[-+]0x[0-9a-f]+$/i,
              er = /^0b[01]+$/i,
              gr = /^0o[0-7]+$/i,
              kn = parseInt,
              kt =
                "object" == (typeof R > "u" ? "undefined" : J(R)) &&
                R &&
                R.Object === Object &&
                R,
              rn =
                "object" == (typeof self > "u" ? "undefined" : J(self)) &&
                self &&
                self.Object === Object &&
                self,
              gt = kt || rn || Function("return this")(),
              Re = Object.prototype.toString,
              mt = Math.max,
              yn = Math.min,
              k = function () {
                return gt.Date.now();
              };
            Be.exports = function ce(T, ge, q) {
              var et = !0,
                yt = !0;
              if ("function" != typeof T) throw new TypeError(ne);
              return (
                Se(q) &&
                  ((et = "leading" in q ? !!q.leading : et),
                  (yt = "trailing" in q ? !!q.trailing : yt)),
                j(T, ge, { leading: et, maxWait: ge, trailing: yt })
              );
            };
          }.call(
            ue,
            (function () {
              return this;
            })()
          ));
        },
        function (Be, ue) {
          (function (R) {
            "use strict";
            function ce(k) {
              var T = typeof k > "u" ? "undefined" : be(k);
              return !!k && ("object" == T || "function" == T);
            }
            function De(k) {
              return (
                "symbol" == (typeof k > "u" ? "undefined" : be(k)) ||
                ((function Se(k) {
                  return (
                    !!k && "object" == (typeof k > "u" ? "undefined" : be(k))
                  );
                })(k) &&
                  mn.call(k) == re)
              );
            }
            function W(k) {
              if ("number" == typeof k) return k;
              if (De(k)) return ne;
              if (ce(k)) {
                var T = "function" == typeof k.valueOf ? k.valueOf() : k;
                k = ce(T) ? T + "" : T;
              }
              if ("string" != typeof k) return 0 === k ? k : +k;
              k = k.replace(Ee, "");
              var ge = pt.test(k);
              return ge || er.test(k)
                ? gr(k.slice(2), ge ? 2 : 8)
                : tt.test(k)
                ? ne
                : +k;
            }
            var be =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (k) {
                      return typeof k;
                    }
                  : function (k) {
                      return k &&
                        "function" == typeof Symbol &&
                        k.constructor === Symbol &&
                        k !== Symbol.prototype
                        ? "symbol"
                        : typeof k;
                    },
              J = "Expected a function",
              ne = NaN,
              re = "[object Symbol]",
              Ee = /^\s+|\s+$/g,
              tt = /^[-+]0x[0-9a-f]+$/i,
              pt = /^0b[01]+$/i,
              er = /^0o[0-7]+$/i,
              gr = parseInt,
              kn =
                "object" == (typeof R > "u" ? "undefined" : be(R)) &&
                R &&
                R.Object === Object &&
                R,
              kt =
                "object" == (typeof self > "u" ? "undefined" : be(self)) &&
                self &&
                self.Object === Object &&
                self,
              rn = kn || kt || Function("return this")(),
              mn = Object.prototype.toString,
              Re = Math.max,
              mt = Math.min,
              yn = function () {
                return rn.Date.now();
              };
            Be.exports = function j(k, T, ge) {
              function q(ke) {
                var ye = Gt,
                  vt = Mt;
                return (Gt = Mt = void 0), (me = ke), (Ot = k.apply(vt, ye));
              }
              function et(ke) {
                return (me = ke), (ze = setTimeout(On, T)), Dn ? q(ke) : Ot;
              }
              function at(ke) {
                var ye = ke - ae;
                return (
                  void 0 === ae || ye >= T || ye < 0 || (Z && ke - me >= Ue)
                );
              }
              function On() {
                var ke = yn();
                return at(ke)
                  ? vn(ke)
                  : void (ze = setTimeout(
                      On,
                      (function yt(ke) {
                        var Fn = T - (ke - ae);
                        return Z ? mt(Fn, Ue - (ke - me)) : Fn;
                      })(ke)
                    ));
              }
              function vn(ke) {
                return (
                  (ze = void 0), Ft && Gt ? q(ke) : ((Gt = Mt = void 0), Ot)
                );
              }
              function mr() {
                var ke = yn(),
                  ye = at(ke);
                if (((Gt = arguments), (Mt = this), (ae = ke), ye)) {
                  if (void 0 === ze) return et(ae);
                  if (Z) return (ze = setTimeout(On, T)), q(ae);
                }
                return void 0 === ze && (ze = setTimeout(On, T)), Ot;
              }
              var Gt,
                Mt,
                Ue,
                Ot,
                ze,
                ae,
                me = 0,
                Dn = !1,
                Z = !1,
                Ft = !0;
              if ("function" != typeof k) throw new TypeError(J);
              return (
                (T = W(T) || 0),
                ce(ge) &&
                  ((Dn = !!ge.leading),
                  (Ue = (Z = "maxWait" in ge) ? Re(W(ge.maxWait) || 0, T) : Ue),
                  (Ft = "trailing" in ge ? !!ge.trailing : Ft)),
                (mr.cancel = function Ne() {
                  void 0 !== ze && clearTimeout(ze),
                    (me = 0),
                    (Gt = ae = Mt = ze = void 0);
                }),
                (mr.flush = function Br() {
                  return void 0 === ze ? Ot : vn(yn());
                }),
                mr
              );
            };
          }.call(
            ue,
            (function () {
              return this;
            })()
          ));
        },
        function (Be, ue) {
          "use strict";
          function R(be) {
            var J = void 0,
              ne = void 0;
            for (J = 0; J < be.length; J += 1)
              if (
                ((ne = be[J]).dataset && ne.dataset.aos) ||
                (ne.children && R(ne.children))
              )
                return !0;
            return !1;
          }
          function j() {
            return (
              window.MutationObserver ||
              window.WebKitMutationObserver ||
              window.MozMutationObserver
            );
          }
          function De(be) {
            be &&
              be.forEach(function (J) {
                var ne = Array.prototype.slice.call(J.addedNodes),
                  re = Array.prototype.slice.call(J.removedNodes);
                if (R(ne.concat(re))) return W();
              });
          }
          Object.defineProperty(ue, "__esModule", { value: !0 });
          var W = function () {};
          ue.default = {
            isSupported: function ce() {
              return !!j();
            },
            ready: function Se(be, J) {
              var ne = window.document,
                Ee = new (j())(De);
              (W = J),
                Ee.observe(ne.documentElement, {
                  childList: !0,
                  subtree: !0,
                  removedNodes: !0,
                });
            },
          };
        },
        function (Be, ue) {
          "use strict";
          function j() {
            return (
              navigator.userAgent || navigator.vendor || window.opera || ""
            );
          }
          Object.defineProperty(ue, "__esModule", { value: !0 });
          var ce = (function () {
              function ne(re, Ee) {
                for (var tt = 0; tt < Ee.length; tt++) {
                  var pt = Ee[tt];
                  (pt.enumerable = pt.enumerable || !1),
                    (pt.configurable = !0),
                    "value" in pt && (pt.writable = !0),
                    Object.defineProperty(re, pt.key, pt);
                }
              }
              return function (re, Ee, tt) {
                return Ee && ne(re.prototype, Ee), tt && ne(re, tt), re;
              };
            })(),
            Se =
              /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            De =
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            W =
              /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
            be =
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            J = (function () {
              function ne() {
                !(function R(ne, re) {
                  if (!(ne instanceof re))
                    throw new TypeError("Cannot call a class as a function");
                })(this, ne);
              }
              return (
                ce(ne, [
                  {
                    key: "phone",
                    value: function () {
                      var re = j();
                      return !(!Se.test(re) && !De.test(re.substr(0, 4)));
                    },
                  },
                  {
                    key: "mobile",
                    value: function () {
                      var re = j();
                      return !(!W.test(re) && !be.test(re.substr(0, 4)));
                    },
                  },
                  {
                    key: "tablet",
                    value: function () {
                      return this.mobile() && !this.phone();
                    },
                  },
                ]),
                ne
              );
            })();
          ue.default = new J();
        },
        function (Be, ue) {
          "use strict";
          Object.defineProperty(ue, "__esModule", { value: !0 });
          ue.default = function (ce, Se) {
            var De = window.pageYOffset,
              W = window.innerHeight;
            ce.forEach(function (be, J) {
              !(function (ce, Se, De) {
                var W = ce.node.getAttribute("data-aos-once");
                Se > ce.position
                  ? ce.node.classList.add("aos-animate")
                  : typeof W < "u" &&
                    ("false" === W || (!De && "true" !== W)) &&
                    ce.node.classList.remove("aos-animate");
              })(be, W + De, Se);
            });
          };
        },
        function (Be, ue, R) {
          "use strict";
          Object.defineProperty(ue, "__esModule", { value: !0 });
          var Se = (function j(W) {
            return W && W.__esModule ? W : { default: W };
          })(R(12));
          ue.default = function (W, be) {
            return (
              W.forEach(function (J, ne) {
                J.node.classList.add("aos-init"),
                  (J.position = (0, Se.default)(J.node, be.offset));
              }),
              W
            );
          };
        },
        function (Be, ue, R) {
          "use strict";
          Object.defineProperty(ue, "__esModule", { value: !0 });
          var Se = (function j(W) {
            return W && W.__esModule ? W : { default: W };
          })(R(13));
          ue.default = function (W, be) {
            var J = 0,
              ne = 0,
              re = window.innerHeight,
              Ee = {
                offset: W.getAttribute("data-aos-offset"),
                anchor: W.getAttribute("data-aos-anchor"),
                anchorPlacement: W.getAttribute("data-aos-anchor-placement"),
              };
            switch (
              (Ee.offset && !isNaN(Ee.offset) && (ne = parseInt(Ee.offset)),
              Ee.anchor &&
                document.querySelectorAll(Ee.anchor) &&
                (W = document.querySelectorAll(Ee.anchor)[0]),
              (J = (0, Se.default)(W).top),
              Ee.anchorPlacement)
            ) {
              case "top-bottom":
                break;
              case "center-bottom":
                J += W.offsetHeight / 2;
                break;
              case "bottom-bottom":
                J += W.offsetHeight;
                break;
              case "top-center":
                J += re / 2;
                break;
              case "bottom-center":
                J += re / 2 + W.offsetHeight;
                break;
              case "center-center":
                J += re / 2 + W.offsetHeight / 2;
                break;
              case "top-top":
                J += re;
                break;
              case "bottom-top":
                J += W.offsetHeight + re;
                break;
              case "center-top":
                J += W.offsetHeight / 2 + re;
            }
            return (
              Ee.anchorPlacement || Ee.offset || isNaN(be) || (ne = be), J + ne
            );
          };
        },
        function (Be, ue) {
          "use strict";
          Object.defineProperty(ue, "__esModule", { value: !0 }),
            (ue.default = function (j) {
              for (
                var ce = 0, Se = 0;
                j && !isNaN(j.offsetLeft) && !isNaN(j.offsetTop);

              )
                (ce += j.offsetLeft - ("BODY" != j.tagName ? j.scrollLeft : 0)),
                  (Se += j.offsetTop - ("BODY" != j.tagName ? j.scrollTop : 0)),
                  (j = j.offsetParent);
              return { top: Se, left: ce };
            });
        },
        function (Be, ue) {
          "use strict";
          Object.defineProperty(ue, "__esModule", { value: !0 }),
            (ue.default = function (j) {
              return (
                (j = j || document.querySelectorAll("[data-aos]")),
                Array.prototype.map.call(j, function (ce) {
                  return { node: ce };
                })
              );
            });
        },
      ]);
    },
  },
  (Bo) => {
    Bo((Bo.s = 545));
  },
]);
