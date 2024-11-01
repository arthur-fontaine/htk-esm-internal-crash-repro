var __shared__;
const e = module,
  t = {
    Array: global.Array,
    Buffer: global.Buffer,
    Error: global.Error,
    EvalError: global.EvalError,
    Function: global.Function,
    JSON: global.JSON,
    Object: global.Object,
    Promise: global.Promise,
    RangeError: global.RangeError,
    ReferenceError: global.ReferenceError,
    Reflect: global.Reflect,
    SyntaxError: global.SyntaxError,
    TypeError: global.TypeError,
    URIError: global.URIError,
    eval: global.eval,
  },
  r = global.console;
module.exports = (function (e) {
  var t = {};
  function r(i) {
    if (t[i]) return t[i].exports;
    var n = (t[i] = { i: i, l: !1, exports: {} });
    return e[i].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
  }
  return (
    (r.d = function (e, t, r) {
      Reflect.defineProperty(e, t, {
        configurable: !0,
        enumerable: !0,
        get: r,
      });
    }),
    (r.n = function (e) {
      return (
        (e.a = e),
        function () {
          return e;
        }
      );
    }),
    r((r.s = 47))
  );
})([
  function (e, t, r) {
    var i = r(7),
      n = r(6),
      s = n.MAX_LENGTH,
      a = n.MAX_SAFE_INTEGER,
      o = r(3),
      u = o.re,
      l = o.t,
      c = r(8),
      p = r(12),
      h = p.compareIdentifiers;
    class f {
      constructor(e, t) {
        if (((t = c(t)), e instanceof f)) {
          if (
            e.loose === !!t.loose &&
            e.includePrerelease === !!t.includePrerelease
          )
            return e;
          e = e.version;
        } else if ("string" != typeof e)
          throw new TypeError("Invalid Version: " + e);
        if (e.length > s)
          throw new TypeError(`version is longer than ${s} characters`);
        i("SemVer", e, t),
          (this.options = t),
          (this.loose = !!t.loose),
          (this.includePrerelease = !!t.includePrerelease);
        var r = e.trim().match(t.loose ? u[l.LOOSE] : u[l.FULL]);
        if (!r) throw new TypeError("Invalid Version: " + e);
        if (
          ((this.raw = e),
          (this.major = +r[1]),
          (this.minor = +r[2]),
          (this.patch = +r[3]),
          this.major > a || this.major < 0)
        )
          throw new TypeError("Invalid major version");
        if (this.minor > a || this.minor < 0)
          throw new TypeError("Invalid minor version");
        if (this.patch > a || this.patch < 0)
          throw new TypeError("Invalid patch version");
        (this.prerelease = r[4]
          ? r[4].split(".").map(function (e) {
              if (/^[0-9]+$/.test(e)) {
                var t = +e;
                if (t >= 0 && t < a) return t;
              }
              return e;
            })
          : []),
          (this.build = r[5] ? r[5].split(".") : []),
          this.format();
      }
      format() {
        return (
          (this.version = `${this.major}.${this.minor}.${this.patch}`),
          this.prerelease.length &&
            (this.version += "-" + this.prerelease.join(".")),
          this.version
        );
      }
      toString() {
        return this.version;
      }
      compare(e) {
        if (
          (i("SemVer.compare", this.version, this.options, e),
          !(e instanceof f))
        ) {
          if ("string" == typeof e && e === this.version) return 0;
          e = new f(e, this.options);
        }
        return e.version === this.version
          ? 0
          : this.compareMain(e) || this.comparePre(e);
      }
      compareMain(e) {
        return (
          e instanceof f || (e = new f(e, this.options)),
          h(this.major, e.major) ||
            h(this.minor, e.minor) ||
            h(this.patch, e.patch)
        );
      }
      comparePre(e) {
        if (
          (e instanceof f || (e = new f(e, this.options)),
          this.prerelease.length && !e.prerelease.length)
        )
          return -1;
        if (!this.prerelease.length && e.prerelease.length) return 1;
        if (!this.prerelease.length && !e.prerelease.length) return 0;
        var t = 0;
        do {
          var r = this.prerelease[t],
            n = e.prerelease[t];
          if ((i("prerelease compare", t, r, n), void 0 === r && void 0 === n))
            return 0;
          if (void 0 === n) return 1;
          if (void 0 === r) return -1;
          if (r !== n) return h(r, n);
        } while (++t);
      }
      compareBuild(e) {
        e instanceof f || (e = new f(e, this.options));
        var t = 0;
        do {
          var r = this.build[t],
            n = e.build[t];
          if ((i("prerelease compare", t, r, n), void 0 === r && void 0 === n))
            return 0;
          if (void 0 === n) return 1;
          if (void 0 === r) return -1;
          if (r !== n) return h(r, n);
        } while (++t);
      }
      inc(e, t) {
        switch (e) {
          case "premajor":
            (this.prerelease.length = 0),
              (this.patch = 0),
              (this.minor = 0),
              this.major++,
              this.inc("pre", t);
            break;
          case "preminor":
            (this.prerelease.length = 0),
              (this.patch = 0),
              this.minor++,
              this.inc("pre", t);
            break;
          case "prepatch":
            (this.prerelease.length = 0),
              this.inc("patch", t),
              this.inc("pre", t);
            break;
          case "prerelease":
            0 === this.prerelease.length && this.inc("patch", t),
              this.inc("pre", t);
            break;
          case "major":
            (0 === this.minor &&
              0 === this.patch &&
              0 !== this.prerelease.length) ||
              this.major++,
              (this.minor = 0),
              (this.patch = 0),
              (this.prerelease = []);
            break;
          case "minor":
            (0 === this.patch && 0 !== this.prerelease.length) || this.minor++,
              (this.patch = 0),
              (this.prerelease = []);
            break;
          case "patch":
            0 === this.prerelease.length && this.patch++,
              (this.prerelease = []);
            break;
          case "pre":
            if (0 === this.prerelease.length) this.prerelease = [0];
            else {
              for (var r = this.prerelease.length; --r >= 0; )
                "number" == typeof this.prerelease[r] &&
                  (this.prerelease[r]++, (r = -2));
              -1 === r && this.prerelease.push(0);
            }
            t &&
              (this.prerelease[0] === t
                ? isNaN(this.prerelease[1]) && (this.prerelease = [t, 0])
                : (this.prerelease = [t, 0]));
            break;
          default:
            throw Error("invalid increment argument: " + e);
        }
        return this.format(), (this.raw = this.version), this;
      }
    }
    e.exports = f;
  },
  function (e, t, r) {
    var i = r(0);
    e.exports = function (e, t, r) {
      return new i(e, r).compare(new i(t, r));
    };
  },
  function (e, t, r) {
    class i {
      constructor(e, t) {
        var r = this;
        if (((t = a(t)), e instanceof i))
          return e.loose === !!t.loose &&
            e.includePrerelease === !!t.includePrerelease
            ? e
            : new i(e.raw, t);
        if (e instanceof o)
          return (this.raw = e.value), (this.set = [[e]]), this.format(), this;
        if (
          ((this.options = t),
          (this.loose = !!t.loose),
          (this.includePrerelease = !!t.includePrerelease),
          (this.raw = e),
          (this.set = e
            .split(/\s*\|\|\s*/)
            .map(function (e) {
              return r.parseRange(e.trim());
            })
            .filter(function (e) {
              return e.length;
            })),
          !this.set.length)
        )
          throw new TypeError("Invalid SemVer Range: " + e);
        if (this.set.length > 1) {
          var n = this.set[0];
          if (
            ((this.set = this.set.filter(function (e) {
              return !v(e[0]);
            })),
            0 === this.set.length)
          )
            this.set = [n];
          else if (this.set.length > 1)
            for (
              var s = 0, u = this.set, l = null == u ? 0 : u.length;
              s < l;
              s++
            ) {
              var c = u[s];
              if (1 === c.length && g(c[0])) {
                this.set = [c];
                break;
              }
            }
        }
        this.format();
      }
      format() {
        return (
          (this.range = this.set
            .map(function (e) {
              return e.join(" ").trim();
            })
            .join("||")
            .trim()),
          this.range
        );
      }
      toString() {
        return this.range;
      }
      parseRange(e) {
        var t = this;
        e = e.trim();
        var r = Object.keys(this.options).join(","),
          i = `parseRange:${r}:${e}`,
          n = s.get(i);
        if (n) return n;
        var a = this.options.loose,
          l = a ? p[h.HYPHENRANGELOOSE] : p[h.HYPHENRANGE];
        (e = e.replace(l, _(this.options.includePrerelease))),
          u("hyphen replace", e),
          (e = e.replace(p[h.COMPARATORTRIM], f)),
          u("comparator trim", e, p[h.COMPARATORTRIM]),
          (e = e.replace(p[h.TILDETRIM], d)),
          (e = e.replace(p[h.CARETTRIM], m)),
          (e = e.split(/\s+/).join(" "));
        for (
          var c = a ? p[h.COMPARATORLOOSE] : p[h.COMPARATOR],
            g = e
              .split(" ")
              .map(function (e) {
                return x(e, t.options);
              })
              .join(" ")
              .split(/\s+/)
              .map(function (e) {
                return N(e, t.options);
              })
              .filter(
                this.options.loose
                  ? function (e) {
                      return !!e.match(c);
                    }
                  : function () {
                      return !0;
                    },
              )
              .map(function (e) {
                return new o(e, t.options);
              }),
            y = new Map(),
            b = 0,
            E = null == g ? 0 : g.length;
          b < E;
          b++
        ) {
          var w = g[b];
          if (v(w)) return [w];
          y.set(w.value, w);
        }
        y.size > 1 && y.has("") && y.delete("");
        var R = [...y.values()];
        return s.set(i, R), R;
      }
      intersects(e, t) {
        if (!(e instanceof i)) throw new TypeError("a Range is required");
        return this.set.some(function (r) {
          return (
            y(r, t) &&
            e.set.some(function (e) {
              return (
                y(e, t) &&
                r.every(function (r) {
                  return e.every(function (e) {
                    return r.intersects(e, t);
                  });
                })
              );
            })
          );
        });
      }
      test(e) {
        if (!e) return !1;
        if ("string" == typeof e)
          try {
            e = new l(e, this.options);
          } catch (e) {
            return !1;
          }
        for (var t = 0; t < this.set.length; t++)
          if (k(this.set[t], e, this.options)) return !0;
        return !1;
      }
    }
    e.exports = i;
    var n = r(34),
      s = new n({ max: 1e3 }),
      a = r(8),
      o = r(10),
      u = r(7),
      l = r(0),
      c = r(3),
      p = c.re,
      h = c.t,
      f = c.comparatorTrimReplace,
      d = c.tildeTrimReplace,
      m = c.caretTrimReplace,
      v = function (e) {
        return "<0.0.0-0" === e.value;
      },
      g = function (e) {
        return "" === e.value;
      },
      y = function (e, t) {
        "use strict";
        for (var r = !0, i = e.slice(), n = i.pop(); r && i.length; )
          (r = i.every(function (e) {
            return n.intersects(e, t);
          })),
            (n = i.pop());
        return r;
      },
      x = function (e, t) {
        "use strict";
        return (
          u("comp", e, t),
          (e = R(e, t)),
          u("caret", e),
          (e = E(e, t)),
          u("tildes", e),
          (e = I(e, t)),
          u("xrange", e),
          (e = A(e, t)),
          u("stars", e),
          e
        );
      },
      b = function (e) {
        return !e || "x" === e.toLowerCase() || "*" === e;
      },
      E = function (e, t) {
        return e
          .trim()
          .split(/\s+/)
          .map(function (e) {
            "use strict";
            return w(e, t);
          })
          .join(" ");
      },
      w = function (e, t) {
        "use strict";
        var r = t.loose ? p[h.TILDELOOSE] : p[h.TILDE];
        return e.replace(r, function (t, r, i, n, s) {
          var a;
          return (
            u("tilde", e, t, r, i, n, s),
            b(r)
              ? (a = "")
              : b(i)
                ? (a = `>=${r}.0.0 <${+r + 1}.0.0-0`)
                : b(n)
                  ? (a = `>=${r}.${i}.0 <${r}.${+i + 1}.0-0`)
                  : s
                    ? (u("replaceTilde pr", s),
                      (a = `>=${r}.${i}.${n}-${s} <${r}.${+i + 1}.0-0`))
                    : (a = `>=${r}.${i}.${n} <${r}.${+i + 1}.0-0`),
            u("tilde return", a),
            a
          );
        });
      },
      R = function (e, t) {
        return e
          .trim()
          .split(/\s+/)
          .map(function (e) {
            "use strict";
            return S(e, t);
          })
          .join(" ");
      },
      S = function (e, t) {
        "use strict";
        u("caret", e, t);
        var r = t.loose ? p[h.CARETLOOSE] : p[h.CARET],
          i = t.includePrerelease ? "-0" : "";
        return e.replace(r, function (t, r, n, s, a) {
          var o;
          return (
            u("caret", e, t, r, n, s, a),
            b(r)
              ? (o = "")
              : b(n)
                ? (o = `>=${r}.0.0${i} <${+r + 1}.0.0-0`)
                : b(s)
                  ? (o =
                      "0" === r
                        ? `>=${r}.${n}.0${i} <${r}.${+n + 1}.0-0`
                        : `>=${r}.${n}.0${i} <${+r + 1}.0.0-0`)
                  : a
                    ? (u("replaceCaret pr", a),
                      (o =
                        "0" === r
                          ? "0" === n
                            ? `>=${r}.${n}.${s}-${a} <${r}.${n}.${+s + 1}-0`
                            : `>=${r}.${n}.${s}-${a} <${r}.${+n + 1}.0-0`
                          : `>=${r}.${n}.${s}-${a} <${+r + 1}.0.0-0`))
                    : (u("no pr"),
                      (o =
                        "0" === r
                          ? "0" === n
                            ? `>=${r}.${n}.${s}${i} <${r}.${n}.${+s + 1}-0`
                            : `>=${r}.${n}.${s}${i} <${r}.${+n + 1}.0-0`
                          : `>=${r}.${n}.${s} <${+r + 1}.0.0-0`)),
            u("caret return", o),
            o
          );
        });
      },
      I = function (e, t) {
        "use strict";
        return (
          u("replaceXRanges", e, t),
          e
            .split(/\s+/)
            .map(function (e) {
              return P(e, t);
            })
            .join(" ")
        );
      },
      P = function (e, t) {
        "use strict";
        e = e.trim();
        var r = t.loose ? p[h.XRANGELOOSE] : p[h.XRANGE];
        return e.replace(r, function (r, i, n, s, a, o) {
          u("xRange", e, r, i, n, s, a, o);
          var l = b(n),
            c = l || b(s),
            p = c || b(a),
            h = p;
          return (
            "=" === i && h && (i = ""),
            (o = t.includePrerelease ? "-0" : ""),
            l
              ? (r = ">" === i || "<" === i ? "<0.0.0-0" : "*")
              : i && h
                ? (c && (s = 0),
                  (a = 0),
                  ">" === i
                    ? ((i = ">="),
                      c
                        ? ((n = +n + 1), (s = 0), (a = 0))
                        : ((s = +s + 1), (a = 0)))
                    : "<=" === i &&
                      ((i = "<"), c ? (n = +n + 1) : (s = +s + 1)),
                  "<" === i && (o = "-0"),
                  (r = `${i + n}.${s}.${a}${o}`))
                : c
                  ? (r = `>=${n}.0.0${o} <${+n + 1}.0.0-0`)
                  : p && (r = `>=${n}.${s}.0${o} <${n}.${+s + 1}.0-0`),
            u("xRange return", r),
            r
          );
        });
      },
      A = function (e, t) {
        "use strict";
        return u("replaceStars", e, t), e.trim().replace(p[h.STAR], "");
      },
      N = function (e, t) {
        "use strict";
        return (
          u("replaceGTE0", e, t),
          e.trim().replace(p[t.includePrerelease ? h.GTE0PRE : h.GTE0], "")
        );
      },
      _ = function (e) {
        return function (t, r, i, n, s, a, o, u, l, c, p, h, f) {
          "use strict";
          return (
            (r = b(i)
              ? ""
              : b(n)
                ? `>=${i}.0.0${e ? "-0" : ""}`
                : b(s)
                  ? `>=${i}.${n}.0${e ? "-0" : ""}`
                  : a
                    ? ">=" + r
                    : `>=${r}${e ? "-0" : ""}`),
            (u = b(l)
              ? ""
              : b(c)
                ? `<${+l + 1}.0.0-0`
                : b(p)
                  ? `<${l}.${+c + 1}.0-0`
                  : h
                    ? `<=${l}.${c}.${p}-${h}`
                    : e
                      ? `<${l}.${c}.${+p + 1}-0`
                      : "<=" + u),
            `${r} ${u}`.trim()
          );
        };
      },
      k = function (e, t, r) {
        "use strict";
        for (var i = 0; i < e.length; i++) if (!e[i].test(t)) return !1;
        if (t.prerelease.length && !r.includePrerelease) {
          for (var n = 0; n < e.length; n++)
            if (
              (u(e[n].semver),
              e[n].semver !== o.ANY && e[n].semver.prerelease.length > 0)
            ) {
              var s = e[n].semver;
              if (
                s.major === t.major &&
                s.minor === t.minor &&
                s.patch === t.patch
              )
                return !0;
            }
          return !1;
        }
        return !0;
      };
  },
  function (e, t, r) {
    var i = r(6),
      n = i.MAX_SAFE_COMPONENT_LENGTH,
      s = r(7);
    t = e.exports = {};
    var a = (t.re = []),
      o = (t.src = []),
      u = (t.t = {}),
      l = 0,
      c = function (e, t, r) {
        "use strict";
        var i = l++;
        s(i, t), (u[e] = i), (o[i] = t), (a[i] = RegExp(t, r ? "g" : void 0));
      };
    c("NUMERICIDENTIFIER", "0|[1-9]\\d*"),
      c("NUMERICIDENTIFIERLOOSE", "[0-9]+"),
      c("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*"),
      c(
        "MAINVERSION",
        `(${o[u.NUMERICIDENTIFIER]})\\.(${o[u.NUMERICIDENTIFIER]})\\.(${o[u.NUMERICIDENTIFIER]})`,
      ),
      c(
        "MAINVERSIONLOOSE",
        `(${o[u.NUMERICIDENTIFIERLOOSE]})\\.(${o[u.NUMERICIDENTIFIERLOOSE]})\\.(${o[u.NUMERICIDENTIFIERLOOSE]})`,
      ),
      c(
        "PRERELEASEIDENTIFIER",
        `(?:${o[u.NUMERICIDENTIFIER]}|${o[u.NONNUMERICIDENTIFIER]})`,
      ),
      c(
        "PRERELEASEIDENTIFIERLOOSE",
        `(?:${o[u.NUMERICIDENTIFIERLOOSE]}|${o[u.NONNUMERICIDENTIFIER]})`,
      ),
      c(
        "PRERELEASE",
        `(?:-(${o[u.PRERELEASEIDENTIFIER]}(?:\\.${o[u.PRERELEASEIDENTIFIER]})*))`,
      ),
      c(
        "PRERELEASELOOSE",
        `(?:-?(${o[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${o[u.PRERELEASEIDENTIFIERLOOSE]})*))`,
      ),
      c("BUILDIDENTIFIER", "[0-9A-Za-z-]+"),
      c(
        "BUILD",
        `(?:\\+(${o[u.BUILDIDENTIFIER]}(?:\\.${o[u.BUILDIDENTIFIER]})*))`,
      ),
      c("FULLPLAIN", `v?${o[u.MAINVERSION]}${o[u.PRERELEASE]}?${o[u.BUILD]}?`),
      c("FULL", `^${o[u.FULLPLAIN]}$`),
      c(
        "LOOSEPLAIN",
        `[v=\\s]*${o[u.MAINVERSIONLOOSE]}${o[u.PRERELEASELOOSE]}?${o[u.BUILD]}?`,
      ),
      c("LOOSE", `^${o[u.LOOSEPLAIN]}$`),
      c("GTLT", "((?:<|>)?=?)"),
      c("XRANGEIDENTIFIERLOOSE", o[u.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*"),
      c("XRANGEIDENTIFIER", o[u.NUMERICIDENTIFIER] + "|x|X|\\*"),
      c(
        "XRANGEPLAIN",
        `[v=\\s]*(${o[u.XRANGEIDENTIFIER]})(?:\\.(${o[u.XRANGEIDENTIFIER]})(?:\\.(${o[u.XRANGEIDENTIFIER]})(?:${o[u.PRERELEASE]})?${o[u.BUILD]}?)?)?`,
      ),
      c(
        "XRANGEPLAINLOOSE",
        `[v=\\s]*(${o[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${o[u.XRANGEIDENTIFIERLOOSE]})(?:${o[u.PRERELEASELOOSE]})?${o[u.BUILD]}?)?)?`,
      ),
      c("XRANGE", `^${o[u.GTLT]}\\s*${o[u.XRANGEPLAIN]}$`),
      c("XRANGELOOSE", `^${o[u.GTLT]}\\s*${o[u.XRANGEPLAINLOOSE]}$`),
      c(
        "COERCE",
        `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?(?:$|[^\\d])`,
      ),
      c("COERCERTL", o[u.COERCE], !0),
      c("LONETILDE", "(?:~>?)"),
      c("TILDETRIM", `(\\s*)${o[u.LONETILDE]}\\s+`, !0),
      (t.tildeTrimReplace = "$1~"),
      c("TILDE", `^${o[u.LONETILDE]}${o[u.XRANGEPLAIN]}$`),
      c("TILDELOOSE", `^${o[u.LONETILDE]}${o[u.XRANGEPLAINLOOSE]}$`),
      c("LONECARET", "(?:\\^)"),
      c("CARETTRIM", `(\\s*)${o[u.LONECARET]}\\s+`, !0),
      (t.caretTrimReplace = "$1^"),
      c("CARET", `^${o[u.LONECARET]}${o[u.XRANGEPLAIN]}$`),
      c("CARETLOOSE", `^${o[u.LONECARET]}${o[u.XRANGEPLAINLOOSE]}$`),
      c("COMPARATORLOOSE", `^${o[u.GTLT]}\\s*(${o[u.LOOSEPLAIN]})$|^$`),
      c("COMPARATOR", `^${o[u.GTLT]}\\s*(${o[u.FULLPLAIN]})$|^$`),
      c(
        "COMPARATORTRIM",
        `(\\s*)${o[u.GTLT]}\\s*(${o[u.LOOSEPLAIN]}|${o[u.XRANGEPLAIN]})`,
        !0,
      ),
      (t.comparatorTrimReplace = "$1$2$3"),
      c(
        "HYPHENRANGE",
        `^\\s*(${o[u.XRANGEPLAIN]})\\s+-\\s+(${o[u.XRANGEPLAIN]})\\s*$`,
      ),
      c(
        "HYPHENRANGELOOSE",
        `^\\s*(${o[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${o[u.XRANGEPLAINLOOSE]})\\s*$`,
      ),
      c("STAR", "(<|>)?=?\\s*\\*"),
      c("GTE0", "^\\s*>=\\s*0.0.0\\s*$"),
      c("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$");
  },
  function (e, t, r) {
    var i = r(6),
      n = i.MAX_LENGTH,
      s = r(3),
      a = s.re,
      o = s.t,
      u = r(0),
      l = r(8);
    e.exports = function (e, t) {
      "use strict";
      if (((t = l(t)), e instanceof u)) return e;
      if ("string" != typeof e) return null;
      if (e.length > n) return null;
      var r = t.loose ? a[o.LOOSE] : a[o.FULL];
      if (!r.test(e)) return null;
      try {
        return new u(e, t);
      } catch (e) {
        return null;
      }
    };
  },
  function (e, t, r) {
    var i = r(3);
    e.exports = {
      re: i.re,
      src: i.src,
      tokens: i.t,
      SEMVER_SPEC_VERSION: r(6).SEMVER_SPEC_VERSION,
      SemVer: r(0),
      compareIdentifiers: r(12).compareIdentifiers,
      rcompareIdentifiers: r(12).rcompareIdentifiers,
      parse: r(4),
      valid: r(21),
      clean: r(22),
      inc: r(23),
      diff: r(24),
      major: r(25),
      minor: r(26),
      patch: r(27),
      prerelease: r(28),
      compare: r(1),
      rcompare: r(29),
      compareLoose: r(30),
      compareBuild: r(14),
      sort: r(31),
      rsort: r(32),
      gt: r(9),
      lt: r(15),
      eq: r(13),
      neq: r(19),
      gte: r(16),
      lte: r(17),
      cmp: r(20),
      coerce: r(33),
      Comparator: r(10),
      Range: r(2),
      satisfies: r(11),
      toComparators: r(37),
      maxSatisfying: r(38),
      minSatisfying: r(39),
      minVersion: r(40),
      validRange: r(41),
      outside: r(18),
      gtr: r(42),
      ltr: r(43),
      intersects: r(44),
      simplifyRange: r(45),
      subset: r(46),
    };
  },
  function (e, t) {
    var r = Number.MAX_SAFE_INTEGER || 9007199254740991;
    e.exports = {
      SEMVER_SPEC_VERSION: "2.0.0",
      MAX_LENGTH: 256,
      MAX_SAFE_INTEGER: r,
      MAX_SAFE_COMPONENT_LENGTH: 16,
    };
  },
  function (e, t) {
    var r = ("object" == typeof process && process, function () {});
    e.exports = r;
  },
  function (e, t) {
    var r = ["includePrerelease", "loose", "rtl"];
    e.exports = function (e) {
      return e
        ? "object" != typeof e
          ? { loose: !0 }
          : r
              .filter(function (t) {
                return e[t];
              })
              .reduce(function (e, t) {
                "use strict";
                return (e[t] = !0), e;
              }, {})
        : {};
    };
  },
  function (e, t, r) {
    var i = r(1);
    e.exports = function (e, t, r) {
      return i(e, t, r) > 0;
    };
  },
  function (e, t, r) {
    var i = Symbol("SemVer ANY");
    class n {
      static get ANY() {
        return i;
      }
      constructor(e, t) {
        if (((t = s(t)), e instanceof n)) {
          if (e.loose === !!t.loose) return e;
          e = e.value;
        }
        c("comparator", e, t),
          (this.options = t),
          (this.loose = !!t.loose),
          this.parse(e),
          (this.value =
            this.semver === i ? "" : this.operator + this.semver.version),
          c("comp", this);
      }
      parse(e) {
        var t = this.options.loose ? o[u.COMPARATORLOOSE] : o[u.COMPARATOR],
          r = e.match(t);
        if (!r) throw new TypeError("Invalid comparator: " + e);
        (this.operator = void 0 !== r[1] ? r[1] : ""),
          "=" === this.operator && (this.operator = ""),
          (this.semver = r[2] ? new p(r[2], this.options.loose) : i);
      }
      toString() {
        return this.value;
      }
      test(e) {
        if (
          (c("Comparator.test", e, this.options.loose),
          this.semver === i || e === i)
        )
          return !0;
        if ("string" == typeof e)
          try {
            e = new p(e, this.options);
          } catch (e) {
            return !1;
          }
        return l(e, this.operator, this.semver, this.options);
      }
      intersects(e, t) {
        if (!(e instanceof n)) throw new TypeError("a Comparator is required");
        if (
          ((t && "object" == typeof t) ||
            (t = { loose: !!t, includePrerelease: !1 }),
          "" === this.operator)
        )
          return "" === this.value || new h(e.value, t).test(this.value);
        if ("" === e.operator)
          return "" === e.value || new h(this.value, t).test(e.semver);
        var r = !(
            (">=" !== this.operator && ">" !== this.operator) ||
            (">=" !== e.operator && ">" !== e.operator)
          ),
          i = !(
            ("<=" !== this.operator && "<" !== this.operator) ||
            ("<=" !== e.operator && "<" !== e.operator)
          ),
          s = this.semver.version === e.semver.version,
          a = !(
            (">=" !== this.operator && "<=" !== this.operator) ||
            (">=" !== e.operator && "<=" !== e.operator)
          ),
          o =
            l(this.semver, "<", e.semver, t) &&
            (">=" === this.operator || ">" === this.operator) &&
            ("<=" === e.operator || "<" === e.operator),
          u =
            l(this.semver, ">", e.semver, t) &&
            ("<=" === this.operator || "<" === this.operator) &&
            (">=" === e.operator || ">" === e.operator);
        return r || i || (s && a) || o || u;
      }
    }
    e.exports = n;
    var s = r(8),
      a = r(3),
      o = a.re,
      u = a.t,
      l = r(20),
      c = r(7),
      p = r(0),
      h = r(2);
  },
  function (e, t, r) {
    var i = r(2);
    e.exports = function (e, t, r) {
      "use strict";
      try {
        t = new i(t, r);
      } catch (e) {
        return !1;
      }
      return t.test(e);
    };
  },
  function (e, t) {
    var r = /^[0-9]+$/,
      i = function (e, t) {
        "use strict";
        var i = r.test(e),
          n = r.test(t);
        return (
          i && n && ((e = +e), (t = +t)),
          e === t ? 0 : i && !n ? -1 : n && !i ? 1 : e < t ? -1 : 1
        );
      };
    e.exports = {
      compareIdentifiers: i,
      rcompareIdentifiers: function (e, t) {
        return i(t, e);
      },
    };
  },
  function (e, t, r) {
    var i = r(1);
    e.exports = function (e, t, r) {
      return 0 === i(e, t, r);
    };
  },
  function (e, t, r) {
    var i = r(0);
    e.exports = function (e, t, r) {
      "use strict";
      var n = new i(e, r),
        s = new i(t, r);
      return n.compare(s) || n.compareBuild(s);
    };
  },
  function (e, t, r) {
    var i = r(1);
    e.exports = function (e, t, r) {
      return i(e, t, r) < 0;
    };
  },
  function (e, t, r) {
    var i = r(1);
    e.exports = function (e, t, r) {
      return i(e, t, r) >= 0;
    };
  },
  function (e, t, r) {
    var i = r(1);
    e.exports = function (e, t, r) {
      return i(e, t, r) <= 0;
    };
  },
  function (e, t, r) {
    var i = r(0),
      n = r(10),
      s = n.ANY,
      a = r(2),
      o = r(11),
      u = r(9),
      l = r(15),
      c = r(17),
      p = r(16);
    e.exports = function (e, t, r, h) {
      "use strict";
      var f, d, m, v, g;
      switch (((e = new i(e, h)), (t = new a(t, h)), r)) {
        case ">":
          (f = u), (d = c), (m = l), (v = ">"), (g = ">=");
          break;
        case "<":
          (f = l), (d = p), (m = u), (v = "<"), (g = "<=");
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (o(e, t, h)) return !1;
      for (
        var y = function (r) {
            var i = t.set[r],
              a = null,
              o = null;
            return (
              i.forEach(function (e) {
                e.semver === s && (e = new n(">=0.0.0")),
                  (a = a || e),
                  (o = o || e),
                  f(e.semver, a.semver, h)
                    ? (a = e)
                    : m(e.semver, o.semver, h) && (o = e);
              }),
              a.operator === v || a.operator === g
                ? { v: !1 }
                : (o.operator && o.operator !== v) || !d(e, o.semver)
                  ? o.operator === g && m(e, o.semver)
                    ? { v: !1 }
                    : void 0
                  : { v: !1 }
            );
          },
          x = 0;
        x < t.set.length;
        ++x
      ) {
        var b = y(x);
        if ("object" == typeof b) return b.v;
      }
      return !0;
    };
  },
  function (e, t, r) {
    var i = r(1);
    e.exports = function (e, t, r) {
      return 0 !== i(e, t, r);
    };
  },
  function (e, t, r) {
    var i = r(13),
      n = r(19),
      s = r(9),
      a = r(16),
      o = r(15),
      u = r(17);
    e.exports = function (e, t, r, l) {
      "use strict";
      switch (t) {
        case "===":
          return (
            "object" == typeof e && (e = e.version),
            "object" == typeof r && (r = r.version),
            e === r
          );
        case "!==":
          return (
            "object" == typeof e && (e = e.version),
            "object" == typeof r && (r = r.version),
            e !== r
          );
        case "":
        case "=":
        case "==":
          return i(e, r, l);
        case "!=":
          return n(e, r, l);
        case ">":
          return s(e, r, l);
        case ">=":
          return a(e, r, l);
        case "<":
          return o(e, r, l);
        case "<=":
          return u(e, r, l);
        default:
          throw new TypeError("Invalid operator: " + t);
      }
    };
  },
  function (e, t, r) {
    var i = r(4);
    e.exports = function (e, t) {
      "use strict";
      var r = i(e, t);
      return r ? r.version : null;
    };
  },
  function (e, t, r) {
    var i = r(4);
    e.exports = function (e, t) {
      "use strict";
      var r = i(e.trim().replace(/^[=v]+/, ""), t);
      return r ? r.version : null;
    };
  },
  function (e, t, r) {
    var i = r(0);
    e.exports = function (e, t, r, n) {
      "use strict";
      "string" == typeof r && ((n = r), (r = void 0));
      try {
        return new i(e, r).inc(t, n).version;
      } catch (e) {
        return null;
      }
    };
  },
  function (e, t, r) {
    var i = r(4),
      n = r(13);
    e.exports = function (e, t) {
      "use strict";
      if (n(e, t)) return null;
      var r = i(e),
        s = i(t),
        a = r.prerelease.length || s.prerelease.length,
        o = a ? "pre" : "",
        u = a ? "prerelease" : "";
      for (var l in r)
        if (("major" === l || "minor" === l || "patch" === l) && r[l] !== s[l])
          return o + l;
      return u;
    };
  },
  function (e, t, r) {
    var i = r(0);
    e.exports = function (e, t) {
      return new i(e, t).major;
    };
  },
  function (e, t, r) {
    var i = r(0);
    e.exports = function (e, t) {
      return new i(e, t).minor;
    };
  },
  function (e, t, r) {
    var i = r(0);
    e.exports = function (e, t) {
      return new i(e, t).patch;
    };
  },
  function (e, t, r) {
    var i = r(4);
    e.exports = function (e, t) {
      "use strict";
      var r = i(e, t);
      return r && r.prerelease.length ? r.prerelease : null;
    };
  },
  function (e, t, r) {
    var i = r(1);
    e.exports = function (e, t, r) {
      return i(t, e, r);
    };
  },
  function (e, t, r) {
    var i = r(1);
    e.exports = function (e, t) {
      return i(e, t, !0);
    };
  },
  function (e, t, r) {
    var i = r(14);
    e.exports = function (e, t) {
      return e.sort(function (e, r) {
        return i(e, r, t);
      });
    };
  },
  function (e, t, r) {
    var i = r(14);
    e.exports = function (e, t) {
      return e.sort(function (e, r) {
        return i(r, e, t);
      });
    };
  },
  function (e, t, r) {
    var i = r(0),
      n = r(4),
      s = r(3),
      a = s.re,
      o = s.t;
    e.exports = function (e, t) {
      "use strict";
      if (e instanceof i) return e;
      if (("number" == typeof e && (e += ""), "string" != typeof e))
        return null;
      t = t || {};
      var r = null;
      if (t.rtl) {
        for (
          var s;
          (s = a[o.COERCERTL].exec(e)) &&
          (!r || r.index + r[0].length !== e.length);

        )
          (r && s.index + s[0].length === r.index + r[0].length) || (r = s),
            (a[o.COERCERTL].lastIndex = s.index + s[1].length + s[2].length);
        a[o.COERCERTL].lastIndex = -1;
      } else r = e.match(a[o.COERCE]);
      return null === r ? null : n(`${r[2]}.${r[3] || "0"}.${r[4] || "0"}`, t);
    };
  },
  function (e, t, r) {
    var i = r(35),
      n = Symbol("max"),
      s = Symbol("length"),
      a = Symbol("lengthCalculator"),
      o = Symbol("allowStale"),
      u = Symbol("maxAge"),
      l = Symbol("dispose"),
      c = Symbol("noDisposeOnSet"),
      p = Symbol("lruList"),
      h = Symbol("cache"),
      f = Symbol("updateAgeOnGet"),
      d = function () {
        return 1;
      },
      m = function (e, t, r) {
        var i = e[h].get(t);
        if (i) {
          var n = i.value;
          if (v(e, n)) {
            if ((y(e, i), !e[o])) return;
          } else r && (e[f] && (i.value.now = Date.now()), e[p].unshiftNode(i));
          return n.value;
        }
      },
      v = function (e, t) {
        if (!t || (!t.maxAge && !e[u])) return !1;
        var r = Date.now() - t.now;
        return t.maxAge ? r > t.maxAge : e[u] && r > e[u];
      },
      g = function (e) {
        if (e[s] > e[n])
          for (var t = e[p].tail; e[s] > e[n] && null !== t; ) {
            var r = t.prev;
            y(e, t), (t = r);
          }
      },
      y = function (e, t) {
        if (t) {
          var r = t.value;
          e[l] && e[l](r.key, r.value),
            (e[s] -= r.length),
            e[h].delete(r.key),
            e[p].removeNode(t);
        }
      };
    class x {
      constructor(e, t, r, i, n) {
        (this.key = e),
          (this.value = t),
          (this.length = r),
          (this.now = i),
          (this.maxAge = n || 0);
      }
    }
    var b = function (e, t, r, i) {
      var n = r.value;
      v(e, n) && (y(e, r), e[o] || (n = void 0)),
        n && t.call(i, n.value, n.key, e);
    };
    e.exports = class {
      constructor(e) {
        if (
          ("number" == typeof e && (e = { max: e }),
          e || (e = {}),
          e.max && ("number" != typeof e.max || e.max < 0))
        )
          throw new TypeError("max must be a non-negative number");
        this[n] = e.max || 1 / 0;
        var t = e.length || d;
        if (
          ((this[a] = "function" != typeof t ? d : t),
          (this[o] = e.stale || !1),
          e.maxAge && "number" != typeof e.maxAge)
        )
          throw new TypeError("maxAge must be a number");
        (this[u] = e.maxAge || 0),
          (this[l] = e.dispose),
          (this[c] = e.noDisposeOnSet || !1),
          (this[f] = e.updateAgeOnGet || !1),
          this.reset();
      }
      set max(e) {
        if ("number" != typeof e || e < 0)
          throw new TypeError("max must be a non-negative number");
        (this[n] = e || 1 / 0), g(this);
      }
      get max() {
        return this[n];
      }
      set allowStale(e) {
        this[o] = !!e;
      }
      get allowStale() {
        return this[o];
      }
      set maxAge(e) {
        if ("number" != typeof e)
          throw new TypeError("maxAge must be a non-negative number");
        (this[u] = e), g(this);
      }
      get maxAge() {
        return this[u];
      }
      set lengthCalculator(e) {
        var t = this;
        "function" != typeof e && (e = d),
          e !== this[a] &&
            ((this[a] = e),
            (this[s] = 0),
            this[p].forEach(function (e) {
              (e.length = t[a](e.value, e.key)), (t[s] += e.length);
            })),
          g(this);
      }
      get lengthCalculator() {
        return this[a];
      }
      get length() {
        return this[s];
      }
      get itemCount() {
        return this[p].length;
      }
      rforEach(e, t) {
        t = t || this;
        for (var r = this[p].tail; null !== r; ) {
          var i = r.prev;
          b(this, e, r, t), (r = i);
        }
      }
      forEach(e, t) {
        t = t || this;
        for (var r = this[p].head; null !== r; ) {
          var i = r.next;
          b(this, e, r, t), (r = i);
        }
      }
      keys() {
        return this[p].toArray().map(function (e) {
          return e.key;
        });
      }
      values() {
        return this[p].toArray().map(function (e) {
          return e.value;
        });
      }
      reset() {
        var e = this;
        this[l] &&
          this[p] &&
          this[p].length &&
          this[p].forEach(function (t) {
            return e[l](t.key, t.value);
          }),
          (this[h] = new Map()),
          (this[p] = new i()),
          (this[s] = 0);
      }
      dump() {
        var e = this;
        return this[p]
          .map(function (t) {
            return (
              !v(e, t) && { k: t.key, v: t.value, e: t.now + (t.maxAge || 0) }
            );
          })
          .toArray()
          .filter(function (e) {
            return e;
          });
      }
      dumpLru() {
        return this[p];
      }
      set(e, t, r) {
        if (((r = r || this[u]), r && "number" != typeof r))
          throw new TypeError("maxAge must be a number");
        var i = r ? Date.now() : 0,
          o = this[a](t, e);
        if (this[h].has(e)) {
          if (o > this[n]) return y(this, this[h].get(e)), !1;
          var f = this[h].get(e),
            d = f.value;
          return (
            this[l] && (this[c] || this[l](e, d.value)),
            (d.now = i),
            (d.maxAge = r),
            (d.value = t),
            (this[s] += o - d.length),
            (d.length = o),
            this.get(e),
            g(this),
            !0
          );
        }
        var m = new x(e, t, o, i, r);
        return m.length > this[n]
          ? (this[l] && this[l](e, t), !1)
          : ((this[s] += m.length),
            this[p].unshift(m),
            this[h].set(e, this[p].head),
            g(this),
            !0);
      }
      has(e) {
        if (!this[h].has(e)) return !1;
        var t = this[h].get(e).value;
        return !v(this, t);
      }
      get(e) {
        return m(this, e, !0);
      }
      peek(e) {
        return m(this, e, !1);
      }
      pop() {
        var e = this[p].tail;
        return e ? (y(this, e), e.value) : null;
      }
      del(e) {
        y(this, this[h].get(e));
      }
      load(e) {
        this.reset();
        for (var t = Date.now(), r = e.length - 1; r >= 0; r--) {
          var i = e[r],
            n = i.e || 0;
          if (0 === n) this.set(i.k, i.v);
          else {
            var s = n - t;
            s > 0 && this.set(i.k, i.v, s);
          }
        }
      }
      prune() {
        var e = this;
        this[h].forEach(function (t, r) {
          return m(e, r, !1);
        });
      }
    };
  },
  function (e, t, r) {
    function i(e) {
      var t = this;
      if (
        (t instanceof i || (t = new i()),
        (t.tail = null),
        (t.head = null),
        (t.length = 0),
        e && "function" == typeof e.forEach)
      )
        e.forEach(function (e) {
          t.push(e);
        });
      else if (arguments.length > 0)
        for (var r = 0, n = arguments.length; r < n; r++) t.push(arguments[r]);
      return t;
    }
    function n(e, t) {
      (e.tail = new a(t, e.tail, null, e)),
        e.head || (e.head = e.tail),
        e.length++;
    }
    function s(e, t) {
      (e.head = new a(t, null, e.head, e)),
        e.tail || (e.tail = e.head),
        e.length++;
    }
    function a(e, t, r, i) {
      if (!(this instanceof a)) return new a(e, t, r, i);
      (this.list = i),
        (this.value = e),
        t ? ((t.next = this), (this.prev = t)) : (this.prev = null),
        r ? ((r.prev = this), (this.next = r)) : (this.next = null);
    }
    (e.exports = i),
      (i.Node = a),
      (i.create = i),
      (i.prototype.removeNode = function (e) {
        if (e.list !== this)
          throw Error("removing node which does not belong to this list");
        var t = e.next,
          r = e.prev;
        return (
          t && (t.prev = r),
          r && (r.next = t),
          e === this.head && (this.head = t),
          e === this.tail && (this.tail = r),
          e.list.length--,
          (e.next = null),
          (e.prev = null),
          (e.list = null),
          t
        );
      }),
      (i.prototype.unshiftNode = function (e) {
        if (e !== this.head) {
          e.list && e.list.removeNode(e);
          var t = this.head;
          (e.list = this),
            (e.next = t),
            t && (t.prev = e),
            (this.head = e),
            this.tail || (this.tail = e),
            this.length++;
        }
      }),
      (i.prototype.pushNode = function (e) {
        if (e !== this.tail) {
          e.list && e.list.removeNode(e);
          var t = this.tail;
          (e.list = this),
            (e.prev = t),
            t && (t.next = e),
            (this.tail = e),
            this.head || (this.head = e),
            this.length++;
        }
      }),
      (i.prototype.push = function () {
        for (var e = 0, t = arguments.length; e < t; e++) n(this, arguments[e]);
        return this.length;
      }),
      (i.prototype.unshift = function () {
        for (var e = 0, t = arguments.length; e < t; e++) s(this, arguments[e]);
        return this.length;
      }),
      (i.prototype.pop = function () {
        if (this.tail) {
          var e = this.tail.value;
          return (
            (this.tail = this.tail.prev),
            this.tail ? (this.tail.next = null) : (this.head = null),
            this.length--,
            e
          );
        }
      }),
      (i.prototype.shift = function () {
        if (this.head) {
          var e = this.head.value;
          return (
            (this.head = this.head.next),
            this.head ? (this.head.prev = null) : (this.tail = null),
            this.length--,
            e
          );
        }
      }),
      (i.prototype.forEach = function (e, t) {
        t = t || this;
        for (var r = this.head, i = 0; null !== r; i++)
          e.call(t, r.value, i, this), (r = r.next);
      }),
      (i.prototype.forEachReverse = function (e, t) {
        t = t || this;
        for (var r = this.tail, i = this.length - 1; null !== r; i--)
          e.call(t, r.value, i, this), (r = r.prev);
      }),
      (i.prototype.get = function (e) {
        for (var t = 0, r = this.head; null !== r && t < e; t++) r = r.next;
        if (t === e && null !== r) return r.value;
      }),
      (i.prototype.getReverse = function (e) {
        for (var t = 0, r = this.tail; null !== r && t < e; t++) r = r.prev;
        if (t === e && null !== r) return r.value;
      }),
      (i.prototype.map = function (e, t) {
        t = t || this;
        for (var r = new i(), n = this.head; null !== n; )
          r.push(e.call(t, n.value, this)), (n = n.next);
        return r;
      }),
      (i.prototype.mapReverse = function (e, t) {
        t = t || this;
        for (var r = new i(), n = this.tail; null !== n; )
          r.push(e.call(t, n.value, this)), (n = n.prev);
        return r;
      }),
      (i.prototype.reduce = function (e, t) {
        var r,
          i = this.head;
        if (arguments.length > 1) r = t;
        else {
          if (!this.head)
            throw new TypeError("Reduce of empty list with no initial value");
          (i = this.head.next), (r = this.head.value);
        }
        for (var n = 0; null !== i; n++) (r = e(r, i.value, n)), (i = i.next);
        return r;
      }),
      (i.prototype.reduceReverse = function (e, t) {
        var r,
          i = this.tail;
        if (arguments.length > 1) r = t;
        else {
          if (!this.tail)
            throw new TypeError("Reduce of empty list with no initial value");
          (i = this.tail.prev), (r = this.tail.value);
        }
        for (var n = this.length - 1; null !== i; n--)
          (r = e(r, i.value, n)), (i = i.prev);
        return r;
      }),
      (i.prototype.toArray = function () {
        for (var e = Array(this.length), t = 0, r = this.head; null !== r; t++)
          (e[t] = r.value), (r = r.next);
        return e;
      }),
      (i.prototype.toArrayReverse = function () {
        for (var e = Array(this.length), t = 0, r = this.tail; null !== r; t++)
          (e[t] = r.value), (r = r.prev);
        return e;
      }),
      (i.prototype.slice = function (e, t) {
        (t = t || this.length),
          t < 0 && (t += this.length),
          (e = e || 0),
          e < 0 && (e += this.length);
        var r = new i();
        if (t < e || t < 0) return r;
        e < 0 && (e = 0), t > this.length && (t = this.length);
        for (var n = 0, s = this.head; null !== s && n < e; n++) s = s.next;
        for (; null !== s && n < t; n++, s = s.next) r.push(s.value);
        return r;
      }),
      (i.prototype.sliceReverse = function (e, t) {
        (t = t || this.length),
          t < 0 && (t += this.length),
          (e = e || 0),
          e < 0 && (e += this.length);
        var r = new i();
        if (t < e || t < 0) return r;
        e < 0 && (e = 0), t > this.length && (t = this.length);
        for (var n = this.length, s = this.tail; null !== s && n > t; n--)
          s = s.prev;
        for (; null !== s && n > e; n--, s = s.prev) r.push(s.value);
        return r;
      }),
      (i.prototype.splice = function (e, t, ...r) {
        e > this.length && (e = this.length - 1),
          e < 0 && (e = this.length + e);
        for (var i = 0, n = this.head; null !== n && i < e; i++) n = n.next;
        var s,
          o,
          u,
          l = [];
        for (i = 0; n && i < t; i++) l.push(n.value), (n = this.removeNode(n));
        for (
          null === n && (n = this.tail),
            n !== this.head && n !== this.tail && (n = n.prev),
            i = 0;
          i < r.length;
          i++
        )
          this,
            (s = n),
            (o = r[i]),
            void 0,
            (u =
              s === this.head
                ? new a(o, null, s, this)
                : new a(o, s, s.next, this)),
            null === u.next && (this.tail = u),
            null === u.prev && (this.head = u),
            this.length++,
            (n = u);
        return l;
      }),
      (i.prototype.reverse = function () {
        for (var e = this.head, t = this.tail, r = e; null !== r; r = r.prev) {
          var i = r.prev;
          (r.prev = r.next), (r.next = i);
        }
        return (this.head = t), (this.tail = e), this;
      });
    try {
      r(36)(i);
    } catch (e) {}
  },
  function (e, t, r) {
    e.exports = function (e) {
      e.prototype[Symbol.iterator] = function* () {
        for (var e = this.head; e; e = e.next) yield e.value;
      };
    };
  },
  function (e, t, r) {
    var i = r(2);
    e.exports = function (e, t) {
      return new i(e, t).set.map(function (e) {
        return e
          .map(function (e) {
            return e.value;
          })
          .join(" ")
          .trim()
          .split(" ");
      });
    };
  },
  function (e, t, r) {
    var i = r(0),
      n = r(2);
    e.exports = function (e, t, r) {
      "use strict";
      var s = null,
        a = null,
        o = null;
      try {
        o = new n(t, r);
      } catch (e) {
        return null;
      }
      return (
        e.forEach(function (e) {
          o.test(e) &&
            ((s && -1 !== a.compare(e)) || ((s = e), (a = new i(s, r))));
        }),
        s
      );
    };
  },
  function (e, t, r) {
    var i = r(0),
      n = r(2);
    e.exports = function (e, t, r) {
      "use strict";
      var s = null,
        a = null,
        o = null;
      try {
        o = new n(t, r);
      } catch (e) {
        return null;
      }
      return (
        e.forEach(function (e) {
          o.test(e) &&
            ((s && 1 !== a.compare(e)) || ((s = e), (a = new i(s, r))));
        }),
        s
      );
    };
  },
  function (e, t, r) {
    var i = r(0),
      n = r(2),
      s = r(9);
    e.exports = function (e, t) {
      "use strict";
      e = new n(e, t);
      var r = new i("0.0.0");
      if (e.test(r)) return r;
      if (((r = new i("0.0.0-0")), e.test(r))) return r;
      r = null;
      for (
        var a = function (t) {
            var n = e.set[t],
              a = null;
            n.forEach(function (e) {
              var t = new i(e.semver.version);
              switch (e.operator) {
                case ">":
                  0 === t.prerelease.length ? t.patch++ : t.prerelease.push(0),
                    (t.raw = t.format());
                case "":
                case ">=":
                  (a && !s(t, a)) || (a = t);
                  break;
                case "<":
                case "<=":
                  break;
                default:
                  throw Error("Unexpected operation: " + e.operator);
              }
            }),
              !a || (r && !s(r, a)) || (r = a);
          },
          o = 0;
        o < e.set.length;
        ++o
      )
        a(o);
      return r && e.test(r) ? r : null;
    };
  },
  function (e, t, r) {
    var i = r(2);
    e.exports = function (e, t) {
      "use strict";
      try {
        return new i(e, t).range || "*";
      } catch (e) {
        return null;
      }
    };
  },
  function (e, t, r) {
    var i = r(18);
    e.exports = function (e, t, r) {
      return i(e, t, ">", r);
    };
  },
  function (e, t, r) {
    var i = r(18);
    e.exports = function (e, t, r) {
      return i(e, t, "<", r);
    };
  },
  function (e, t, r) {
    var i = r(2);
    e.exports = function (e, t, r) {
      "use strict";
      return (e = new i(e, r)), (t = new i(t, r)), e.intersects(t);
    };
  },
  function (e, t, r) {
    var i = r(11),
      n = r(1);
    e.exports = function (e, t, r) {
      "use strict";
      for (
        var s = [],
          a = null,
          o = null,
          u = e.sort(function (e, t) {
            return n(e, t, r);
          }),
          l = 0,
          c = null == u ? 0 : u.length;
        l < c;
        l++
      ) {
        var p = u[l],
          h = i(p, t, r);
        h
          ? ((o = p), a || (a = p))
          : (o && s.push([a, o]), (o = null), (a = null));
      }
      a && s.push([a, null]);
      for (var f = [], d = 0, m = null == s ? 0 : s.length; d < m; d++) {
        var v = s[d],
          g = v[0],
          y = v[1];
        f.push(
          g === y
            ? g
            : y || g !== u[0]
              ? y
                ? g === u[0]
                  ? "<=" + y
                  : `${g} - ${y}`
                : ">=" + g
              : "*",
        );
      }
      var x = f.join(" || "),
        b = "string" == typeof t.raw ? t.raw : t + "";
      return x.length < b.length ? x : t;
    };
  },
  function (e, t, r) {
    var i = r(2),
      n = r(10),
      s = n.ANY,
      a = r(11),
      o = r(1),
      u = function (e, t, r) {
        "use strict";
        if (e === t) return !0;
        if (1 === e.length && e[0].semver === s) {
          if (1 === t.length && t[0].semver === s) return !0;
          e = r.includePrerelease ? [new n(">=0.0.0-0")] : [new n(">=0.0.0")];
        }
        if (1 === t.length && t[0].semver === s) {
          if (r.includePrerelease) return !0;
          t = [new n(">=0.0.0")];
        }
        for (
          var i,
            u,
            p,
            h,
            f,
            d,
            m,
            v = new Set(),
            g = 0,
            y = e,
            x = null == y ? 0 : y.length;
          g < x;
          g++
        ) {
          var b = y[g];
          ">" === b.operator || ">=" === b.operator
            ? (i = l(i, b, r))
            : "<" === b.operator || "<=" === b.operator
              ? (u = c(u, b, r))
              : v.add(b.semver);
        }
        if (v.size > 1) return null;
        if (i && u) {
          if (((p = o(i.semver, u.semver, r)), p > 0)) return null;
          if (0 === p && (">=" !== i.operator || "<=" !== u.operator))
            return null;
        }
        for (var E = 0, w = null == v ? 0 : v.length; E < w; E++) {
          var R = v[E];
          if (i && !a(R, i + "", r)) return null;
          if (u && !a(R, u + "", r)) return null;
          for (var S = 0, I = t, P = null == I ? 0 : I.length; S < P; S++) {
            var A = I[S];
            if (!a(R, A + "", r)) return !1;
          }
          return !0;
        }
        var N =
            !(!u || r.includePrerelease || !u.semver.prerelease.length) &&
            u.semver,
          _ =
            !(!i || r.includePrerelease || !i.semver.prerelease.length) &&
            i.semver;
        N &&
          1 === N.prerelease.length &&
          "<" === u.operator &&
          0 === N.prerelease[0] &&
          (N = !1);
        for (var k = 0, C = t, O = null == C ? 0 : C.length; k < O; k++) {
          var T = C[k];
          if (
            ((m = m || ">" === T.operator || ">=" === T.operator),
            (d = d || "<" === T.operator || "<=" === T.operator),
            i)
          )
            if (
              (_ &&
                T.semver.prerelease &&
                T.semver.prerelease.length &&
                T.semver.major === _.major &&
                T.semver.minor === _.minor &&
                T.semver.patch === _.patch &&
                (_ = !1),
              ">" === T.operator || ">=" === T.operator)
            ) {
              if (((h = l(i, T, r)), h === T && h !== i)) return !1;
            } else if (">=" === i.operator && !a(i.semver, T + "", r))
              return !1;
          if (u)
            if (
              (N &&
                T.semver.prerelease &&
                T.semver.prerelease.length &&
                T.semver.major === N.major &&
                T.semver.minor === N.minor &&
                T.semver.patch === N.patch &&
                (N = !1),
              "<" === T.operator || "<=" === T.operator)
            ) {
              if (((f = c(u, T, r)), f === T && f !== u)) return !1;
            } else if ("<=" === u.operator && !a(u.semver, T + "", r))
              return !1;
          if (!T.operator && (u || i) && 0 !== p) return !1;
        }
        return !(
          (i && d && !u && 0 !== p) ||
          (u && m && !i && 0 !== p) ||
          _ ||
          N
        );
      },
      l = function (e, t, r) {
        "use strict";
        if (!e) return t;
        var i = o(e.semver, t.semver, r);
        return i > 0
          ? e
          : i < 0 || (">" === t.operator && ">=" === e.operator)
            ? t
            : e;
      },
      c = function (e, t, r) {
        "use strict";
        if (!e) return t;
        var i = o(e.semver, t.semver, r);
        return i < 0
          ? e
          : i > 0 || ("<" === t.operator && "<=" === e.operator)
            ? t
            : e;
      };
    e.exports = function (e, t, r = {}) {
      if (e === t) return !0;
      (e = new i(e, r)), (t = new i(t, r));
      var n = !1;
      e: for (var s = 0, a = e.set, o = null == a ? 0 : a.length; s < o; s++) {
        for (
          var l = a[s], c = 0, p = t.set, h = null == p ? 0 : p.length;
          c < h;
          c++
        ) {
          var f = p[c],
            d = u(l, f, r);
          if (((n = n || null !== d), d)) continue e;
        }
        if (n) return !1;
      }
      return !0;
    };
  },
  function (i, n, s) {
    var a = function (e) {
        "use strict";
        return e + "\u200d";
      },
      o = Object.prototype.__defineGetter__,
      u = function (e, t, r) {
        "use strict";
        return o.call(e, t, r), e;
      },
      l = Object.prototype.__defineSetter__,
      c = function (e, t, r) {
        "use strict";
        return l.call(e, t, r), e;
      },
      p = { configurable: !0, enumerable: !0, value: void 0, writable: !0 },
      h = [],
      f = function (e, t, r) {
        "use strict";
        return (
          u(e, t, function () {
            return (this[t] = void 0), (this[t] = Reflect.apply(r, this, h));
          }),
          c(e, t, function (e) {
            (p.value = e), Reflect.defineProperty(this, t, p);
          }),
          e
        );
      },
      d = ["index.js", "esm.js", "esm/loader.js"],
      m = {
        PACKAGE_DIRNAME: null,
        PACKAGE_FILENAMES: null,
        PACKAGE_PREFIX: a("esm"),
        PACKAGE_RANGE: "3.3.0",
        PACKAGE_VERSION: "3.3.0",
        STACK_TRACE_LIMIT: 30,
      },
      v = e,
      g = v.filename,
      y = v.parent,
      x = null != y && y.filename;
    f(m, "PACKAGE_DIRNAME", function () {
      "use strict";
      var e = __shared__.module.safePath;
      return e.dirname(g);
    }),
      f(m, "PACKAGE_FILENAMES", function () {
        "use strict";
        for (
          var e = __shared__.module.safePath,
            t = e.sep,
            r = this.PACKAGE_DIRNAME,
            i = d.length;
          i--;

        )
          d[i] = r + t + d[i];
        return d;
      }),
      f(m, "PACKAGE_PARENT_NAME", function () {
        "use strict";
        var e = __shared__.module.safePath,
          t = e.sep,
          r = "string" == typeof x ? x.lastIndexOf(t + "node_modules" + t) : -1;
        if (-1 === r) return "";
        var i = r + 14,
          n = x.indexOf(t, i);
        return -1 === n ? "" : x.slice(i, n);
      });
    var b = m,
      E = b.PACKAGE_PREFIX,
      w = b.PACKAGE_VERSION,
      R = Symbol.for(E + "@" + w + ":shared"),
      S = (function () {
        "use strict";
        if (void 0 !== __shared__)
          return (__shared__.reloaded = !1), __shared__;
        try {
          return (
            (__shared__ = require(R)), (__shared__.reloaded = !0), __shared__
          );
        } catch (e) {}
        return (
          (e = Function.prototype.toString),
          (r = new Proxy(class {}, { [E]: 1 })),
          (i = {
            wasm: "object" == typeof WebAssembly && null !== WebAssembly,
          }),
          (n = {
            _compile: Symbol.for(E + ":module._compile"),
            entry: Symbol.for(E + ":entry"),
            mjs: Symbol.for(E + ':Module._extensions[".mjs"]'),
            namespace: Symbol.for(E + ":namespace"),
            package: Symbol.for(E + ":package"),
            proxy: Symbol.for(E + ":proxy"),
            realGetProxyDetails: Symbol.for(E + ":realGetProxyDetails"),
            realRequire: Symbol.for(E + ":realRequire"),
            runtime: Symbol.for(E + ":runtime"),
            shared: R,
            wrapper: Symbol.for(E + ":wrapper"),
          }),
          (s = {}),
          (o = {
            bridged: new Map(),
            customInspectKey: void 0,
            defaultInspectOptions: void 0,
            entry: { cache: new WeakMap() },
            external: t,
            inited: !1,
            loader: new Map(),
            memoize: {
              builtinEntries: new Map(),
              builtinModules: new Map(),
              fsRealpath: new Map(),
              moduleESMResolveFilename: new Map(),
              moduleInternalFindPath: new Map(),
              moduleInternalReadPackage: new Map(),
              moduleStaticResolveFilename: new Map(),
              shimFunctionPrototypeToString: new WeakMap(),
              shimProcessBindingUtilGetProxyDetails: new Map(),
              shimPuppeteerExecutionContextPrototypeEvaluateHandle:
                new WeakMap(),
              utilGetProxyDetails: new WeakMap(),
              utilMaskFunction: new WeakMap(),
              utilMaxSatisfying: new Map(),
              utilParseURL: new Map(),
              utilProxyExports: new WeakMap(),
              utilSatisfies: new Map(),
              utilUnwrapOwnProxy: new WeakMap(),
              utilUnwrapProxy: new WeakMap(),
            },
            module: {},
            moduleState: {
              instantiating: !1,
              parsing: !1,
              requireDepth: 0,
              statFast: null,
              statSync: null,
            },
            package: { dir: new Map(), root: new Map() },
            pendingScripts: new Map(),
            pendingWrites: new Map(),
            realpathNativeSync: void 0,
            reloaded: !1,
            safeGlobal: __global__,
            support: i,
            symbol: n,
            unsafeGlobal: global,
            utilBinding: s,
          }),
          f(o, "circularErrorMessage", function () {
            try {
              var e = {};
              (e.a = e), JSON.stringify(e);
            } catch (e) {
              var t = e.message;
              return t;
            }
          }),
          f(o, "defaultGlobal", function () {
            var e = o.module.safeVM;
            return new e.Script("this").runInThisContext();
          }),
          f(o, "originalConsole", function () {
            var e = o.module,
              t = e.safeInspector,
              r = e.safeVM,
              i = e.utilGet,
              n = i(t, "console");
            return "function" == typeof n
              ? n
              : new r.Script("console").runInNewContext();
          }),
          f(o, "proxyNativeSourceText", function () {
            try {
              return e.call(r);
            } catch (e) {}
            return "";
          }),
          f(o, "runtimeName", function () {
            var e = o.module.safeCrypto;
            return a(
              "_" +
                e
                  .createHash("md5")
                  .update("" + Date.now())
                  .digest("hex")
                  .slice(0, 3),
            );
          }),
          f(o, "unsafeContext", function () {
            var e = o.module,
              t = e.safeVM,
              r = e.utilPrepareContext;
            return r(t.createContext(o.unsafeGlobal));
          }),
          f(i, "await", function () {
            var e = o.module.safeVM;
            try {
              return new e.Script("async()=>await 1").runInThisContext(), !0;
            } catch (e) {}
            return !1;
          }),
          f(i, "consoleOptions", function () {
            var e = o.module,
              t = e.safeProcess,
              r = e.utilSatisfies;
            return r(t.version, ">=10");
          }),
          f(i, "createCachedData", function () {
            var e = o.module.safeVM;
            return "function" == typeof e.Script.prototype.createCachedData;
          }),
          f(i, "inspectProxies", function () {
            var e = o.module.safeUtil,
              t = e.inspect(r, { depth: 1, showProxy: !0 });
            return -1 !== t.indexOf("Proxy [") && -1 !== t.indexOf(E);
          }),
          f(i, "lookupShadowed", function () {
            var e = { __proto__: { get a() {}, set a(e) {} }, a: 1 };
            return (
              void 0 === e.__lookupGetter__("a") &&
              void 0 === e.__lookupSetter__("a")
            );
          }),
          f(i, "nativeProxyReceiver", function () {
            var e = o.module,
              t = e.SafeBuffer,
              r = e.utilGet,
              i = e.utilToString;
            try {
              var n = new Proxy(t.alloc(0), {
                get: function (e, t) {
                  return e[t];
                },
              });
              return "string" == typeof ("" + n);
            } catch (e) {
              return !/Illegal/.test(i(r(e, "message")));
            }
          }),
          f(i, "realpathNative", function () {
            var e = o.module,
              t = e.safeProcess,
              r = e.utilSatisfies;
            return r(t.version, ">=9.2");
          }),
          f(i, "replShowProxy", function () {
            var e = o.module,
              t = e.safeProcess,
              r = e.utilSatisfies;
            return r(t.version, ">=10");
          }),
          f(i, "vmCompileFunction", function () {
            var e = o.module,
              t = e.safeProcess,
              r = e.utilSatisfies;
            return r(t.version, ">=10.10");
          }),
          f(s, "errorDecoratedSymbol", function () {
            var e = o.module,
              t = e.binding,
              r = e.safeProcess,
              i = e.utilSatisfies;
            return i(r.version, "<7")
              ? "node:decorated"
              : t.util.decorated_private_symbol;
          }),
          f(s, "hiddenKeyType", function () {
            return typeof s.errorDecoratedSymbol;
          }),
          (__shared__ = o)
        );
        var e, r, i, n, s, o;
      })(),
      I = S.inited
        ? S.module.utilUnapply
        : (S.module.utilUnapply = (function () {
            "use strict";
            return function (e) {
              return function (t, ...r) {
                return Reflect.apply(e, t, r);
              };
            };
          })()),
      P = S.inited
        ? S.module.GenericFunction
        : (S.module.GenericFunction = (function () {
            "use strict";
            return { bind: I(Function.prototype.bind) };
          })()),
      A = S.inited
        ? S.module.realRequire
        : (S.module.realRequire = (function () {
            "use strict";
            try {
              var e = require(S.symbol.realRequire);
              if ("function" == typeof e) return e;
            } catch (e) {}
            return require;
          })()),
      N = S.inited
        ? S.module.realProcess
        : (S.module.realProcess = A("process")),
      _ = S.inited
        ? S.module.utilIsObjectLike
        : (S.module.utilIsObjectLike = (function () {
            "use strict";
            return function (e) {
              var t = typeof e;
              return "function" === t || ("object" === t && null !== e);
            };
          })()),
      k = S.inited
        ? S.module.utilSetProperty
        : (S.module.utilSetProperty = (function () {
            "use strict";
            var e = {
              configurable: !0,
              enumerable: !0,
              value: void 0,
              writable: !0,
            };
            return function (t, r, i) {
              return !!_(t) && ((e.value = i), Reflect.defineProperty(t, r, e));
            };
          })()),
      C = S.inited
        ? S.module.utilSilent
        : (S.module.utilSilent = (function () {
            "use strict";
            return function (e) {
              var t = Reflect.getOwnPropertyDescriptor(N, "noDeprecation");
              k(N, "noDeprecation", !0);
              try {
                return e();
              } finally {
                void 0 === t
                  ? Reflect.deleteProperty(N, "noDeprecation")
                  : Reflect.defineProperty(N, "noDeprecation", t);
              }
            };
          })()),
      O = (S.module.utilGetSilent = (function () {
            "use strict";
            return function (e, t) {
              var r = C(function () {
                try {
                  return e[t];
                } catch (e) {}
              });
              return "function" != typeof r
                ? r
                : function (...e) {
                    var t = this;
                    return Reflect.apply(r, t, e);
                  };
            };
          })()),
      T = S.inited
        ? S.module.utilKeys
        : (S.module.utilKeys = (function () {
            "use strict";
            return function (e) {
              return _(e) ? Object.keys(e) : [];
            };
          })()),
      L = S.inited
        ? S.module.utilHas
        : (S.module.utilHas = (function () {
            "use strict";
            var e = Object.prototype.hasOwnProperty;
            return function (t, r) {
              return null != t && e.call(t, r);
            };
          })()),
      M = S.inited
        ? S.module.utilNoop
        : (S.module.utilNoop = (function () {
            "use strict";
            return function () {};
          })()),
      D = S.inited
        ? S.module.utilGetPrototypeOf
        : (S.module.utilGetPrototypeOf = (function () {
            "use strict";
            return function (e) {
              return _(e) ? Reflect.getPrototypeOf(e) : null;
            };
          })()),
      F = S.inited
        ? S.module.utilOwnKeys
        : (S.module.utilOwnKeys = (function () {
            "use strict";
            return function (e) {
              return _(e) ? Reflect.ownKeys(e) : [];
            };
          })()),
      j = S.inited
        ? S.module.utilAllKeys
        : (S.module.utilAllKeys = (function () {
            "use strict";
            return function (e) {
              for (var t = new Set(F(e)), r = e; null !== (r = D(r)); )
                for (
                  var i = F(r), n = 0, s = null == i ? 0 : i.length;
                  n < s;
                  n++
                ) {
                  var a = i[n];
                  t.add(a);
                }
              return [...t];
            };
          })()),
      V = S.inited
        ? S.module.utilIsObject
        : (S.module.utilIsObject = (function () {
            "use strict";
            return function (e) {
              return "object" == typeof e && null !== e;
            };
          })()),
      G = S.inited
        ? S.module.utilIsDataPropertyDescriptor
        : (S.module.utilIsDataPropertyDescriptor = (function () {
            "use strict";
            return function (e) {
              return (
                V(e) &&
                !0 === e.configurable &&
                !0 === e.enumerable &&
                !0 === e.writable &&
                L(e, "value")
              );
            };
          })()),
      $ = S.inited
        ? S.module.utilSafeCopyProperty
        : (S.module.utilSafeCopyProperty = (function () {
            "use strict";
            return function (e, t, r) {
              if (!_(e) || !_(t)) return e;
              var i = Reflect.getOwnPropertyDescriptor(t, r);
              if (void 0 !== i) {
                if (L(i, "value")) {
                  var n = i.value;
                  Array.isArray(n) && (i.value = Array.from(n));
                }
                G(i)
                  ? (e[r] = i.value)
                  : ((i.configurable = !0),
                    L(i, "writable") && (i.writable = !0),
                    Reflect.defineProperty(e, r, i));
              }
              return e;
            };
          })()),
      B = S.inited
        ? S.module.utilSafeAssignPropertiesIn
        : (S.module.utilSafeAssignPropertiesIn = (function () {
            "use strict";
            return function (e) {
              for (var t = arguments.length, r = 0; ++r < t; )
                for (
                  var i = arguments[r],
                    n = j(i),
                    s = 0,
                    a = null == n ? 0 : n.length;
                  s < a;
                  s++
                ) {
                  var o = n[s];
                  $(e, i, o);
                }
              return e;
            };
          })()),
      U = S.inited
        ? S.module.utilSetPrototypeOf
        : (S.module.utilSetPrototypeOf = (function () {
            "use strict";
            return function (e, t) {
              return _(e) && Reflect.setPrototypeOf(e, _(t) ? t : null);
            };
          })()),
      q = S.inited
        ? S.module.utilSafe
        : (S.module.utilSafe = (function () {
            "use strict";
            return function (e) {
              if ("function" != typeof e)
                return Array.isArray(e) ? Array.from(e) : V(e) ? B({}, e) : e;
              for (
                var t = e,
                  r = function (...e) {
                    var r = Reflect.construct(t, e);
                    return U(r, o), r;
                  },
                  i = j(t),
                  n = 0,
                  s = null == i ? 0 : i.length;
                n < s;
                n++
              ) {
                var a = i[n];
                "prototype" !== a && $(r, t, a);
              }
              var o = r.prototype;
              return U(o, null), B(o, t.prototype), r;
            };
          })()),
      W = S.inited
        ? S.module.safeProcess
        : (S.module.safeProcess = (function () {
            "use strict";
            var e = q(N),
              t = Reflect.getOwnPropertyDescriptor(e, "binding");
            f(e, "binding", function () {
              if (void 0 === t) return M;
              Reflect.defineProperty(e, "binding", t);
              var r = O(e, "binding"),
                i = "function" == typeof r ? P.bind(r, N) : M;
              return k(e, "binding", i), i;
            });
            var r = e.config,
              i = { variables: { v8_enable_inspector: 0 } };
            return (
              _(r) &&
                L(r, "variables") &&
                _(r.variables) &&
                L(r.variables, "v8_enable_inspector") &&
                r.variables.v8_enable_inspector &&
                (i.variables.v8_enable_inspector = 1),
              k(e, "argv", q(e.argv)),
              k(e, "config", i),
              k(e, "dlopen", P.bind(e.dlopen, N)),
              k(e, "emitWarning", P.bind(e.emitWarning, N)),
              k(e, "env", q(e.env)),
              k(e, "execArgv", q(e.execArgv)),
              k(e, "getMaxListeners", P.bind(N.getMaxListeners, N)),
              k(e, "once", P.bind(N.once, N)),
              k(e, "setMaxListeners", P.bind(N.setMaxListeners, N)),
              k(e, "versions", q(e.versions)),
              e
            );
          })()),
      z = W.argv,
      H = W.config,
      K = W.cwd,
      X = W.dlopen,
      J = W.emitWarning,
      Y = W.env,
      Q = W.execArgv,
      Z = W.getMaxListeners,
      ee = W.once,
      te = W.platform,
      re = W.setMaxListeners,
      ie = W.stdin,
      ne = W.type,
      se = W.versions,
      ae = W,
      oe = S.inited
        ? S.module.binding
        : (S.module.binding = (function () {
            "use strict";
            for (
              var e = ["fs", "inspector", "natives", "util"],
                t = new Map([
                  ["fs", ["internalModuleStat", "realpath"]],
                  ["inspector", ["consoleCall"]],
                  ["natives", void 0],
                  [
                    "util",
                    [
                      "decorated_private_symbol",
                      "getProxyDetails",
                      "safeGetenv",
                      "setHiddenValue",
                    ],
                  ],
                ]),
                r = {},
                i = function (e) {
                  f(r, e, function () {
                    var r = {},
                      i = ae.binding(e);
                    if (!_(i)) return r;
                    var n = t.get(e);
                    void 0 === n && (n = T(i));
                    for (
                      var s = function (e) {
                          f(r, e, function () {
                            if ("consoleCall" === e)
                              return C(function () {
                                return i[e];
                              });
                            var t = O(i, e);
                            return "function" == typeof t ? P.bind(t, i) : t;
                          });
                        },
                        a = 0,
                        o = n,
                        u = null == o ? 0 : o.length;
                      a < u;
                      a++
                    ) {
                      var l = o[a];
                      s(l);
                    }
                    return r;
                  });
                },
                n = 0,
                s = null == e ? 0 : e.length;
              n < s;
              n++
            ) {
              var a = e[n];
              i(a);
            }
            return r;
          })()),
      ue = S.inited
        ? S.module.utilToExternalFunction
        : (S.module.utilToExternalFunction = (function () {
            "use strict";
            var e = S.external.Function,
              t = D(e),
              r = D(e.prototype);
            return function (e) {
              return U(e, t), L(e, "prototype") && U(e.prototype, r), e;
            };
          })()),
      le = S.inited
        ? S.module.OwnProxy
        : (S.module.OwnProxy = (function () {
            "use strict";
            var e = {
                value: ue(function () {
                  return "{}";
                }),
              },
              t = { value: 1 };
            class r {
              constructor(i, n) {
                var s = { __proto__: n },
                  a = new Proxy(i, s);
                for (var o in (U(n, null), n)) ue(n[o]);
                Reflect.defineProperty(s, S.customInspectKey, e),
                  Reflect.defineProperty(s, S.symbol.proxy, t),
                  r.instances.set(a, [i, s]);
                var u = {},
                  l = new Proxy(a, u);
                return r.instances.set(l, [a, u]), l;
              }
            }
            return (r.instances = new WeakMap()), U(r.prototype, null), r;
          })()),
      ce = S.inited
        ? S.module.safeRequire
        : (S.module.safeRequire = (function () {
            "use strict";
            var e = A.resolve;
            function t(e) {
              try {
                return A(e);
              } catch (e) {}
            }
            return (
              (t.resolve = function (t) {
                try {
                  return Reflect.apply(e, A, [t]);
                } catch (e) {}
                return "";
              }),
              t
            );
          })()),
      pe = S.inited
        ? S.module.realGetProxyDetails
        : (S.module.realGetProxyDetails = (function () {
            "use strict";
            var e,
              t = ce(S.symbol.realGetProxyDetails);
            return (
              "function" == typeof t ||
                (t = function (t) {
                  if (
                    (void 0 === e &&
                      (e = "function" == typeof oe.util.getProxyDetails),
                    e && _(t))
                  )
                    try {
                      return oe.util.getProxyDetails(t);
                    } catch (e) {}
                }),
              t
            );
          })()),
      he = S.inited
        ? S.module.utilGetProxyDetails
        : (S.module.utilGetProxyDetails = (function () {
            "use strict";
            return function (e) {
              var t = S.memoize.utilGetProxyDetails,
                r = t.get(e);
              if (void 0 !== r) return r.details;
              if (_(e)) {
                var i = le.instances.get(e) || pe(e);
                return t.set(e, { details: i }), i;
              }
            };
          })()),
      fe = S.inited
        ? S.module.utilUnwrapProxy
        : (S.module.utilUnwrapProxy = (function () {
            "use strict";
            return function (e) {
              if (!_(e)) return e;
              var t,
                r = S.memoize.utilUnwrapProxy,
                i = r.get(e);
              if (void 0 !== i) return i;
              for (var n = e; void 0 !== (t = he(n)); ) n = t[0];
              return r.set(e, n), n;
            };
          })()),
      de = S.inited ? S.module.realPath : (S.module.realPath = fe(A("path"))),
      me = S.inited ? S.module.safePath : (S.module.safePath = q(de)),
      ve = me.basename,
      ge = me.delimiter,
      ye = me.dirname,
      xe = me.extname,
      be = me.isAbsolute,
      Ee = me.normalize,
      we = me.resolve,
      Re = me.sep,
      Se = me.toNamespacedPath,
      Ie = me,
      Pe = {},
      Ae = {},
      Ne = S.inited
        ? S.module.utilAlwaysTrue
        : (S.module.utilAlwaysTrue = (function () {
            "use strict";
            return function () {
              return !0;
            };
          })()),
      _e = S.inited
        ? S.module.FastPath
        : (S.module.FastPath = (function () {
            "use strict";
            class e {
              constructor(e) {
                this.stack = [e];
              }
              call(e, t, r) {
                var i = this.stack,
                  n = i[i.length - 1];
                i.push(r, n[r]);
                var s = e[t](this);
                return (i.length -= 2), s;
              }
              each(e, t) {
                for (
                  var r = this.stack, i = r[r.length - 1], n = i.length, s = -1;
                  ++s < n;

                )
                  r.push(s, i[s]), e[t](this), (r.length -= 2);
              }
              getNode(e, t) {
                var r = this.stack,
                  i = r.length;
                for (
                  "function" != typeof t && (t = Ne),
                    void 0 !== e && (i = e < 0 ? i + e : e);
                  i-- > 0;

                ) {
                  var n = r[i--];
                  if (V(n) && !Array.isArray(n) && t(n)) return n;
                }
                return null;
              }
              getParentNode(e) {
                return this.getNode(-2, e);
              }
              getValue() {
                var e = this.stack;
                return e[e.length - 1];
              }
            }
            return U(e.prototype, null), e;
          })()),
      ke = S.inited
        ? S.module.MagicString
        : (S.module.MagicString = (function () {
            "use strict";
            class e {
              constructor(e, t, r) {
                (this.content = r),
                  (this.end = t),
                  (this.intro = ""),
                  (this.original = r),
                  (this.outro = ""),
                  (this.next = null),
                  (this.start = e);
              }
              appendLeft(e) {
                this.outro += e;
              }
              appendRight(e) {
                this.intro += e;
              }
              contains(e) {
                return this.start < e && e < this.end;
              }
              edit(e) {
                (this.content = e), (this.intro = ""), (this.outro = "");
              }
              prependLeft(e) {
                this.outro = e + this.outro;
              }
              prependRight(e) {
                this.intro = e + this.intro;
              }
              split(t) {
                var r = t - this.start,
                  i = this.original.slice(0, r),
                  n = this.original.slice(r),
                  s = new e(t, this.end, n);
                return (
                  (s.outro = this.outro),
                  (s.next = this.next),
                  (this.original = i),
                  (this.end = t),
                  (this.content = i),
                  (this.outro = ""),
                  (this.next = s),
                  s
                );
              }
              toString() {
                return this.intro + this.content + this.outro;
              }
            }
            U(e.prototype, null);
            class t {
              constructor(t) {
                var r = new e(0, t.length, t);
                (this.original = t),
                  (this.intro = ""),
                  (this.outro = ""),
                  (this.firstChunk = r),
                  (this.lastSearchedChunk = r),
                  (this.byStart = new Map()),
                  this.byStart.set(0, r),
                  (this.byEnd = new Map()),
                  this.byEnd.set(t.length, r);
              }
              appendLeft(e, t) {
                this._split(e);
                var r = this.byEnd.get(e);
                return void 0 === r ? (this.intro += t) : r.appendLeft(t), this;
              }
              appendRight(e, t) {
                this._split(e);
                var r = this.byStart.get(e);
                return (
                  void 0 === r ? (this.outro += t) : r.appendRight(t), this
                );
              }
              overwrite(e, t, r) {
                this._split(e), this._split(t);
                var i = this.byStart.get(e),
                  n = this.byEnd.get(t);
                if (e === t) return r ? this.appendLeft(e, r) : this;
                if ((i.edit(r), i === n)) return this;
                for (var s = i.next; s !== n; ) s.edit(""), (s = s.next);
                return s.edit(""), this;
              }
              prependLeft(e, t) {
                this._split(e);
                var r = this.byEnd.get(e);
                return (
                  void 0 === r
                    ? (this.intro = t + this.intro)
                    : r.prependLeft(t),
                  this
                );
              }
              prependRight(e, t) {
                this._split(e);
                var r = this.byStart.get(e);
                return (
                  void 0 === r
                    ? (this.outro = t + this.outro)
                    : r.prependRight(t),
                  this
                );
              }
              _split(e) {
                if (!this.byStart.has(e) && !this.byEnd.has(e))
                  for (var t = this.lastSearchedChunk, r = e > t.end; t; ) {
                    if (t.contains(e)) return void this._splitChunk(t, e);
                    t = r ? this.byStart.get(t.end) : this.byEnd.get(t.start);
                  }
              }
              _splitChunk(e, t) {
                var r = e.split(t);
                this.byEnd.set(t, e),
                  this.byStart.set(t, r),
                  this.byEnd.set(r.end, r),
                  (this.lastSearchedChunk = e);
              }
              toString() {
                for (var e = this.intro, t = this.firstChunk; t; )
                  (e += "" + t), (t = t.next);
                return e + this.outro;
              }
            }
            return U(t.prototype, null), t;
          })());
    class Ce {
      constructor(e, t = {}) {
        (this.label = e),
          (this.keyword = t.keyword),
          (this.beforeExpr = !!t.beforeExpr),
          (this.startsExpr = !!t.startsExpr),
          (this.isLoop = !!t.isLoop),
          (this.isAssign = !!t.isAssign),
          (this.prefix = !!t.prefix),
          (this.postfix = !!t.postfix),
          (this.binop = t.binop || null),
          (this.updateContext = null);
      }
    }
    function Oe(e, t) {
      "use strict";
      return new Ce(e, { beforeExpr: !0, binop: t });
    }
    var Te = { beforeExpr: !0 },
      Le = { startsExpr: !0 },
      Me = {};
    function De(e, t = {}) {
      return (t.keyword = e), (Me[e] = new Ce(e, t));
    }
    var Fe = {
        num: new Ce("num", Le),
        regexp: new Ce("regexp", Le),
        string: new Ce("string", Le),
        name: new Ce("name", Le),
        privateId: new Ce("privateId", Le),
        eof: new Ce("eof"),
        bracketL: new Ce("[", { beforeExpr: !0, startsExpr: !0 }),
        bracketR: new Ce("]"),
        braceL: new Ce("{", { beforeExpr: !0, startsExpr: !0 }),
        braceR: new Ce("}"),
        parenL: new Ce("(", { beforeExpr: !0, startsExpr: !0 }),
        parenR: new Ce(")"),
        comma: new Ce(",", Te),
        semi: new Ce(";", Te),
        colon: new Ce(":", Te),
        dot: new Ce("."),
        question: new Ce("?", Te),
        questionDot: new Ce("?."),
        arrow: new Ce("=>", Te),
        template: new Ce("template"),
        invalidTemplate: new Ce("invalidTemplate"),
        ellipsis: new Ce("...", Te),
        backQuote: new Ce("`", Le),
        dollarBraceL: new Ce("${", { beforeExpr: !0, startsExpr: !0 }),
        eq: new Ce("=", { beforeExpr: !0, isAssign: !0 }),
        assign: new Ce("_=", { beforeExpr: !0, isAssign: !0 }),
        incDec: new Ce("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
        prefix: new Ce("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
        logicalOR: Oe("||", 1),
        logicalAND: Oe("&&", 2),
        bitwiseOR: Oe("|", 3),
        bitwiseXOR: Oe("^", 4),
        bitwiseAND: Oe("&", 5),
        equality: Oe("==/!=/===/!==", 6),
        relational: Oe("</>/<=/>=", 7),
        bitShift: Oe("<</>>/>>>", 8),
        plusMin: new Ce("+/-", {
          beforeExpr: !0,
          binop: 9,
          prefix: !0,
          startsExpr: !0,
        }),
        modulo: Oe("%", 10),
        star: Oe("*", 10),
        slash: Oe("/", 10),
        starstar: new Ce("**", { beforeExpr: !0 }),
        coalesce: Oe("??", 1),
        _break: De("break"),
        _case: De("case", Te),
        _catch: De("catch"),
        _continue: De("continue"),
        _debugger: De("debugger"),
        _default: De("default", Te),
        _do: De("do", { isLoop: !0, beforeExpr: !0 }),
        _else: De("else", Te),
        _finally: De("finally"),
        _for: De("for", { isLoop: !0 }),
        _function: De("function", Le),
        _if: De("if"),
        _return: De("return", Te),
        _switch: De("switch"),
        _throw: De("throw", Te),
        _try: De("try"),
        _var: De("var"),
        _const: De("const"),
        _while: De("while", { isLoop: !0 }),
        _with: De("with"),
        _new: De("new", { beforeExpr: !0, startsExpr: !0 }),
        _this: De("this", Le),
        _super: De("super", Le),
        _class: De("class", Le),
        _extends: De("extends", Te),
        _export: De("export"),
        _import: De("import", Le),
        _null: De("null", Le),
        _true: De("true", Le),
        _false: De("false", Le),
        _in: De("in", { beforeExpr: !0, binop: 7 }),
        _instanceof: De("instanceof", { beforeExpr: !0, binop: 7 }),
        _typeof: De("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
        _void: De("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
        _delete: De("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
      },
      je = {
        3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
        5: "class enum extends super const export import",
        6: "enum",
        strict:
          "implements interface let package private protected public static yield",
        strictBind: "eval arguments",
      },
      Ve =
        "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",
      Ge = {
        5: Ve,
        "5module": Ve + " export import",
        6: Ve + " const class extends export import super",
      },
      $e = /^in(stanceof)?$/,
      Be =
        "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u08a0-\u08b4\u08b6-\u08c7\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9ffc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7bf\ua7c2-\ua7ca\ua7f5-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",
      Ue =
        "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08d3-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf\u1ac0\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1df9\u1dfb-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f",
      qe = RegExp("[" + Be + "]"),
      We = RegExp("[" + Be + Ue + "]");
    Be = Ue = null;
    var ze = [
        0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4,
        48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35,
        5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1,
        4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1,
        65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21,
        11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28,
        11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3,
        0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0,
        2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0,
        19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42,
        3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0,
        3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11,
        39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29,
        113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0,
        80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30,
        114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12,
        65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395,
        2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3,
        2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4,
        6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2,
        30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8,
        0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0,
        2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0,
        3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421,
        42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938,
      ],
      He = [
        509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166,
        1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10,
        54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83,
        11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3,
        6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83,
        16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3,
        3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10,
        10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2,
        6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6,
        26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9,
        7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2,
        14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6,
        110, 6, 6, 9, 4759, 9, 787719, 239,
      ];
    function Ke(e, t) {
      "use strict";
      for (var r = 65536, i = 0; i < t.length; i += 2) {
        if (((r += t[i]), r > e)) return !1;
        if (((r += t[i + 1]), r >= e)) return !0;
      }
    }
    function Xe(e, t) {
      "use strict";
      return e < 65
        ? 36 === e
        : e < 91 ||
            (e < 97
              ? 95 === e
              : e < 123 ||
                (e <= 65535
                  ? e >= 170 && qe.test(String.fromCharCode(e))
                  : !1 !== t && Ke(e, ze)));
    }
    function Je(e, t) {
      "use strict";
      return e < 48
        ? 36 === e
        : e < 58 ||
            (!(e < 65) &&
              (e < 91 ||
                (e < 97
                  ? 95 === e
                  : e < 123 ||
                    (e <= 65535
                      ? e >= 170 && We.test(String.fromCharCode(e))
                      : !1 !== t && (Ke(e, ze) || Ke(e, He))))));
    }
    var Ye = /\r\n?|\n|\u2028|\u2029/,
      Qe = RegExp(Ye.source, "g");
    function Ze(e, t) {
      "use strict";
      return 10 === e || 13 === e || (!t && (8232 === e || 8233 === e));
    }
    var et = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
      tt = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
      rt = Object.prototype,
      it = rt.hasOwnProperty,
      nt = rt.toString;
    function st(e, t) {
      "use strict";
      return it.call(e, t);
    }
    var at =
      Array.isArray ||
      function (e) {
        return "[object Array]" === nt.call(e);
      };
    function ot(e) {
      "use strict";
      return RegExp("^(?:" + e.replace(/ /g, "|") + ")$");
    }
    class ut {
      constructor(e, t) {
        (this.line = e), (this.column = t);
      }
      offset(e) {
        return new ut(this.line, this.column + e);
      }
    }
    class lt {
      constructor(e, t, r) {
        (this.start = t),
          (this.end = r),
          null !== e.sourceFile && (this.source = e.sourceFile);
      }
    }
    function ct(e, t) {
      "use strict";
      for (var r = 1, i = 0; ; ) {
        Qe.lastIndex = i;
        var n = Qe.exec(e);
        if (!(n && n.index < t)) return new ut(r, t - i);
        ++r, (i = n.index + n[0].length);
      }
    }
    var pt = {
        ecmaVersion: null,
        sourceType: "script",
        onInsertedSemicolon: null,
        onTrailingComma: null,
        allowReserved: null,
        allowReturnOutsideFunction: !1,
        allowImportExportEverywhere: !1,
        allowAwaitOutsideFunction: !1,
        allowHashBang: !1,
        locations: !1,
        onToken: null,
        onComment: null,
        ranges: !1,
        program: null,
        sourceFile: null,
        directSourceFile: null,
        preserveParens: !1,
      },
      ht = !1;
    function ft(e, t) {
      "use strict";
      return 2 | (e ? 4 : 0) | (t ? 8 : 0);
    }
    class dt {
      constructor(e, t, i) {
        (this.options = e =
          (function (e) {
            var t = {};
            for (var i in pt) t[i] = e && st(e, i) ? e[i] : pt[i];
            if (
              ("latest" === t.ecmaVersion
                ? (t.ecmaVersion = 1e8)
                : null == t.ecmaVersion
                  ? (!ht && "object" == typeof r && function () {} && (ht = !0),
                    (t.ecmaVersion = 11))
                  : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
              null == t.allowReserved && (t.allowReserved = t.ecmaVersion < 5),
              at(t.onToken))
            ) {
              var n = t.onToken;
              t.onToken = function (e) {
                return n.push(e);
              };
            }
            return (
              at(t.onComment) &&
                (t.onComment = (function (e, t) {
                  return function (r, i, n, s, a, o) {
                    var u = {
                      type: r ? "Block" : "Line",
                      value: i,
                      start: n,
                      end: s,
                    };
                    e.locations && (u.loc = new lt(this, a, o)),
                      e.ranges && (u.range = [n, s]),
                      t.push(u);
                  };
                })(t, t.onComment)),
              t
            );
          })(e)),
          (this.sourceFile = e.sourceFile),
          (this.keywords = ot(
            Ge[
              e.ecmaVersion >= 6 ? 6 : "module" === e.sourceType ? "5module" : 5
            ],
          ));
        var n = "";
        !0 !== e.allowReserved &&
          ((n = je[e.ecmaVersion >= 6 ? 6 : 5 === e.ecmaVersion ? 5 : 3]),
          "module" === e.sourceType && (n += " await")),
          (this.reservedWords = ot(n));
        var s = (n ? n + " " : "") + je.strict;
        (this.reservedWordsStrict = ot(s)),
          (this.reservedWordsStrictBind = ot(s + " " + je.strictBind)),
          (this.input = t + ""),
          (this.containsEsc = !1),
          i
            ? ((this.pos = i),
              (this.lineStart = this.input.lastIndexOf("\n", i - 1) + 1),
              (this.curLine = this.input
                .slice(0, this.lineStart)
                .split(Ye).length))
            : ((this.pos = this.lineStart = 0), (this.curLine = 1)),
          (this.type = Fe.eof),
          (this.value = null),
          (this.start = this.end = this.pos),
          (this.startLoc = this.endLoc = this.curPosition()),
          (this.lastTokEndLoc = this.lastTokStartLoc = null),
          (this.lastTokStart = this.lastTokEnd = this.pos),
          (this.context = this.initialContext()),
          (this.exprAllowed = !0),
          (this.inModule = "module" === e.sourceType),
          (this.strict = this.inModule || this.strictDirective(this.pos)),
          (this.potentialArrowAt = -1),
          (this.potentialArrowInForAwait = !1),
          (this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
          (this.labels = []),
          (this.undefinedExports = Object.create(null)),
          0 === this.pos &&
            e.allowHashBang &&
            "#!" === this.input.slice(0, 2) &&
            this.skipLineComment(2),
          (this.scopeStack = []),
          this.enterScope(1),
          (this.regexpState = null),
          (this.privateNameStack = []);
      }
      parse() {
        var e = this.options.program || this.startNode();
        return this.nextToken(), this.parseTopLevel(e);
      }
      get inFunction() {
        return (2 & this.currentVarScope().flags) > 0;
      }
      get inGenerator() {
        return (
          (8 & this.currentVarScope().flags) > 0 &&
          !this.currentVarScope().inClassFieldInit
        );
      }
      get inAsync() {
        return (
          (4 & this.currentVarScope().flags) > 0 &&
          !this.currentVarScope().inClassFieldInit
        );
      }
      get allowSuper() {
        var e = this.currentThisScope(),
          t = e.flags,
          r = e.inClassFieldInit;
        return (64 & t) > 0 || r;
      }
      get allowDirectSuper() {
        return (128 & this.currentThisScope().flags) > 0;
      }
      get treatFunctionsAsVar() {
        return this.treatFunctionsAsVarInScope(this.currentScope());
      }
      get inNonArrowFunction() {
        var e = this.currentThisScope(),
          t = e.flags,
          r = e.inClassFieldInit;
        return (2 & t) > 0 || r;
      }
      static extend(...e) {
        for (var t = this, r = 0; r < e.length; r++) t = e[r](t);
        return t;
      }
      static parse(e, t) {
        return new this(t, e).parse();
      }
      static parseExpressionAt(e, t, r) {
        var i = new this(r, e, t);
        return i.nextToken(), i.parseExpression();
      }
      static tokenizer(e, t) {
        return new this(t, e);
      }
    }
    var mt = dt.prototype,
      vt = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
    function gt() {
      "use strict";
      this.shorthandAssign =
        this.trailingComma =
        this.parenthesizedAssign =
        this.parenthesizedBind =
        this.doubleProto =
          -1;
    }
    (mt.strictDirective = function (e) {
      "use strict";
      for (;;) {
        (tt.lastIndex = e), (e += tt.exec(this.input)[0].length);
        var t = vt.exec(this.input.slice(e));
        if (!t) return !1;
        if ("use strict" === (t[1] || t[2])) {
          tt.lastIndex = e + t[0].length;
          var r = tt.exec(this.input),
            i = r.index + r[0].length,
            n = this.input.charAt(i);
          return (
            ";" === n ||
            "}" === n ||
            (Ye.test(r[0]) &&
              !(
                /[(`.[+\-/*%<>=,?^&]/.test(n) ||
                ("!" === n && "=" === this.input.charAt(i + 1))
              ))
          );
        }
        (e += t[0].length),
          (tt.lastIndex = e),
          (e += tt.exec(this.input)[0].length),
          ";" === this.input[e] && e++;
      }
    }),
      (mt.eat = function (e) {
        "use strict";
        return this.type === e && (this.next(), !0);
      }),
      (mt.isContextual = function (e) {
        "use strict";
        return this.type === Fe.name && this.value === e && !this.containsEsc;
      }),
      (mt.eatContextual = function (e) {
        "use strict";
        return !!this.isContextual(e) && (this.next(), !0);
      }),
      (mt.expectContextual = function (e) {
        "use strict";
        this.eatContextual(e) || this.unexpected();
      }),
      (mt.canInsertSemicolon = function () {
        "use strict";
        return (
          this.type === Fe.eof ||
          this.type === Fe.braceR ||
          Ye.test(this.input.slice(this.lastTokEnd, this.start))
        );
      }),
      (mt.insertSemicolon = function () {
        "use strict";
        if (this.canInsertSemicolon())
          return (
            this.options.onInsertedSemicolon &&
              this.options.onInsertedSemicolon(
                this.lastTokEnd,
                this.lastTokEndLoc,
              ),
            !0
          );
      }),
      (mt.semicolon = function () {
        "use strict";
        this.eat(Fe.semi) || this.insertSemicolon() || this.unexpected();
      }),
      (mt.afterTrailingComma = function (e, t) {
        "use strict";
        if (this.type === e)
          return (
            this.options.onTrailingComma &&
              this.options.onTrailingComma(
                this.lastTokStart,
                this.lastTokStartLoc,
              ),
            t || this.next(),
            !0
          );
      }),
      (mt.expect = function (e) {
        "use strict";
        this.eat(e) || this.unexpected();
      }),
      (mt.unexpected = function (e) {
        "use strict";
        this.raise(null != e ? e : this.start, "Unexpected token");
      }),
      (mt.checkPatternErrors = function (e, t) {
        "use strict";
        if (e) {
          e.trailingComma > -1 &&
            this.raiseRecoverable(
              e.trailingComma,
              "Comma is not permitted after the rest element",
            );
          var r = t ? e.parenthesizedAssign : e.parenthesizedBind;
          r > -1 && this.raiseRecoverable(r, "Parenthesized pattern");
        }
      }),
      (mt.checkExpressionErrors = function (e, t) {
        "use strict";
        if (!e) return !1;
        var r = e.shorthandAssign,
          i = e.doubleProto;
        if (!t) return r >= 0 || i >= 0;
        r >= 0 &&
          this.raise(
            r,
            "Shorthand property assignments are valid only in destructuring patterns",
          ),
          i >= 0 &&
            this.raiseRecoverable(i, "Redefinition of __proto__ property");
      }),
      (mt.checkYieldAwaitInDefaultParams = function () {
        "use strict";
        this.yieldPos &&
          (!this.awaitPos || this.yieldPos < this.awaitPos) &&
          this.raise(
            this.yieldPos,
            "Yield expression cannot be a default value",
          ),
          this.awaitPos &&
            this.raise(
              this.awaitPos,
              "Await expression cannot be a default value",
            );
      }),
      (mt.isSimpleAssignTarget = function (e) {
        "use strict";
        return "ParenthesizedExpression" === e.type
          ? this.isSimpleAssignTarget(e.expression)
          : "Identifier" === e.type || "MemberExpression" === e.type;
      });
    var yt = dt.prototype;
    (yt.checkPropClash = function (e, t, r) {
      "use strict";
      if (
        !(
          (this.options.ecmaVersion >= 9 && "SpreadElement" === e.type) ||
          (this.options.ecmaVersion >= 6 &&
            (e.computed || e.method || e.shorthand))
        )
      ) {
        var i,
          n = e.key;
        switch (n.type) {
          case "Identifier":
            i = n.name;
            break;
          case "Literal":
            i = n.value + "";
            break;
          default:
            return;
        }
        var s = e.kind;
        if (this.options.ecmaVersion >= 6)
          "__proto__" === i &&
            "init" === s &&
            (t.proto &&
              (r
                ? r.doubleProto < 0 && (r.doubleProto = n.start)
                : this.raiseRecoverable(
                    n.start,
                    "Redefinition of __proto__ property",
                  )),
            (t.proto = !0));
        else {
          i = "$" + i;
          var a,
            o = t[i];
          o
            ? ((a =
                "init" === s
                  ? (this.strict && o.init) || o.get || o.set
                  : o.init || o[s]),
              a && this.raiseRecoverable(n.start, "Redefinition of property"))
            : (o = t[i] = { init: !1, get: !1, set: !1 }),
            (o[s] = !0);
        }
      }
    }),
      (yt.parseExpression = function (e, t) {
        "use strict";
        var r = this.start,
          i = this.startLoc,
          n = this.parseMaybeAssign(e, t);
        if (this.type === Fe.comma) {
          var s = this.startNodeAt(r, i);
          for (s.expressions = [n]; this.eat(Fe.comma); )
            s.expressions.push(this.parseMaybeAssign(e, t));
          return this.finishNode(s, "SequenceExpression");
        }
        return n;
      }),
      (yt.parseMaybeAssign = function (e, t, r) {
        "use strict";
        if (this.isContextual("yield")) {
          if (this.inGenerator) return this.parseYield(e);
          this.exprAllowed = !1;
        }
        var i = !1,
          n = -1,
          s = -1;
        t
          ? ((n = t.parenthesizedAssign),
            (s = t.trailingComma),
            (t.parenthesizedAssign = t.trailingComma = -1))
          : ((t = new gt()), (i = !0));
        var a = this.start,
          o = this.startLoc;
        (this.type !== Fe.parenL && this.type !== Fe.name) ||
          ((this.potentialArrowAt = this.start),
          (this.potentialArrowInForAwait = "await" === e));
        var u = this.parseMaybeConditional(e, t);
        if ((r && (u = r.call(this, u, a, o)), this.type.isAssign)) {
          var l = this.startNodeAt(a, o);
          return (
            (l.operator = this.value),
            this.type === Fe.eq && (u = this.toAssignable(u, !1, t)),
            i || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1),
            t.shorthandAssign >= u.start && (t.shorthandAssign = -1),
            this.type === Fe.eq
              ? this.checkLValPattern(u)
              : this.checkLValSimple(u),
            (l.left = u),
            this.next(),
            (l.right = this.parseMaybeAssign(e)),
            this.finishNode(l, "AssignmentExpression")
          );
        }
        return (
          i && this.checkExpressionErrors(t, !0),
          n > -1 && (t.parenthesizedAssign = n),
          s > -1 && (t.trailingComma = s),
          u
        );
      }),
      (yt.parseMaybeConditional = function (e, t) {
        "use strict";
        var r = this.start,
          i = this.startLoc,
          n = this.parseExprOps(e, t);
        if (this.checkExpressionErrors(t)) return n;
        if (this.eat(Fe.question)) {
          var s = this.startNodeAt(r, i);
          return (
            (s.test = n),
            (s.consequent = this.parseMaybeAssign()),
            this.expect(Fe.colon),
            (s.alternate = this.parseMaybeAssign(e)),
            this.finishNode(s, "ConditionalExpression")
          );
        }
        return n;
      }),
      (yt.parseExprOps = function (e, t) {
        "use strict";
        var r = this.start,
          i = this.startLoc,
          n = this.parseMaybeUnary(t, !1);
        return this.checkExpressionErrors(t) ||
          (n.start === r && "ArrowFunctionExpression" === n.type)
          ? n
          : this.parseExprOp(n, r, i, -1, e);
      }),
      (yt.parseExprOp = function (e, t, r, i, n) {
        "use strict";
        var s = this.type.binop;
        if (null != s && (!n || this.type !== Fe._in) && s > i) {
          var a = this.type === Fe.logicalOR || this.type === Fe.logicalAND,
            o = this.type === Fe.coalesce;
          o && (s = Fe.logicalAND.binop);
          var u = this.value;
          this.next();
          var l = this.start,
            c = this.startLoc,
            p = this.parseExprOp(this.parseMaybeUnary(null, !1), l, c, s, n),
            h = this.buildBinary(t, r, e, p, u, a || o);
          return (
            ((a && this.type === Fe.coalesce) ||
              (o &&
                (this.type === Fe.logicalOR || this.type === Fe.logicalAND))) &&
              this.raiseRecoverable(
                this.start,
                "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses",
              ),
            this.parseExprOp(h, t, r, i, n)
          );
        }
        return e;
      }),
      (yt.buildBinary = function (e, t, r, i, n, s) {
        "use strict";
        var a = this.startNodeAt(e, t);
        return (
          (a.left = r),
          (a.operator = n),
          (a.right = i),
          this.finishNode(a, s ? "LogicalExpression" : "BinaryExpression")
        );
      }),
      (yt.parseMaybeUnary = function (e, t, r) {
        "use strict";
        var i,
          n = this.start,
          s = this.startLoc;
        if (
          this.isContextual("await") &&
          (this.inAsync ||
            (!this.inFunction && this.options.allowAwaitOutsideFunction))
        )
          (i = this.parseAwait()), (t = !0);
        else if (this.type.prefix) {
          var a = this.startNode(),
            o = this.type === Fe.incDec;
          (a.operator = this.value),
            (a.prefix = !0),
            this.next(),
            (a.argument = this.parseMaybeUnary(null, !0, o)),
            this.checkExpressionErrors(e, !0),
            o
              ? this.checkLValSimple(a.argument)
              : this.strict &&
                  "delete" === a.operator &&
                  "Identifier" === a.argument.type
                ? this.raiseRecoverable(
                    a.start,
                    "Deleting local variable in strict mode",
                  )
                : "delete" === a.operator &&
                    (function e(t) {
                      return (
                        ("MemberExpression" === t.type &&
                          "PrivateIdentifier" === t.property.type) ||
                        ("ChainExpression" === t.type && e(t.expression))
                      );
                    })(a.argument)
                  ? this.raiseRecoverable(
                      a.start,
                      "Private fields can not be deleted",
                    )
                  : (t = !0),
            (i = this.finishNode(
              a,
              o ? "UpdateExpression" : "UnaryExpression",
            ));
        } else {
          if (
            ((i = this.parseExprSubscripts(e)), this.checkExpressionErrors(e))
          )
            return i;
          for (; this.type.postfix && !this.canInsertSemicolon(); ) {
            var u = this.startNodeAt(n, s);
            (u.operator = this.value),
              (u.prefix = !1),
              (u.argument = i),
              this.checkLValSimple(i),
              this.next(),
              (i = this.finishNode(u, "UpdateExpression"));
          }
        }
        return r || !this.eat(Fe.starstar)
          ? i
          : t
            ? void this.unexpected(this.lastTokStart)
            : this.buildBinary(
                n,
                s,
                i,
                this.parseMaybeUnary(null, !1),
                "**",
                !1,
              );
      }),
      (yt.parseExprSubscripts = function (e) {
        "use strict";
        var t = this.start,
          r = this.startLoc,
          i = this.parseExprAtom(e);
        if (
          "ArrowFunctionExpression" === i.type &&
          ")" !== this.input.slice(this.lastTokStart, this.lastTokEnd)
        )
          return i;
        var n = this.parseSubscripts(i, t, r);
        return (
          e &&
            "MemberExpression" === n.type &&
            (e.parenthesizedAssign >= n.start && (e.parenthesizedAssign = -1),
            e.parenthesizedBind >= n.start && (e.parenthesizedBind = -1),
            e.trailingComma >= n.start && (e.trailingComma = -1)),
          n
        );
      }),
      (yt.parseSubscripts = function (e, t, r, i) {
        "use strict";
        for (
          var n =
              this.options.ecmaVersion >= 8 &&
              "Identifier" === e.type &&
              "async" === e.name &&
              this.lastTokEnd === e.end &&
              !this.canInsertSemicolon() &&
              e.end - e.start == 5 &&
              this.potentialArrowAt === e.start,
            s = !1;
          ;

        ) {
          var a = this.parseSubscript(e, t, r, i, n, s);
          if (
            (a.optional && (s = !0),
            a === e || "ArrowFunctionExpression" === a.type)
          ) {
            if (s) {
              var o = this.startNodeAt(t, r);
              (o.expression = a), (a = this.finishNode(o, "ChainExpression"));
            }
            return a;
          }
          e = a;
        }
      }),
      (yt.parseSubscript = function (e, t, r, i, n, s) {
        "use strict";
        var a = this.options.ecmaVersion >= 11,
          o = a && this.eat(Fe.questionDot);
        i &&
          o &&
          this.raise(
            this.lastTokStart,
            "Optional chaining cannot appear in the callee of new expressions",
          );
        var u = this.eat(Fe.bracketL);
        if (
          u ||
          (o && this.type !== Fe.parenL && this.type !== Fe.backQuote) ||
          this.eat(Fe.dot)
        ) {
          var l = this.startNodeAt(t, r);
          (l.object = e),
            u
              ? ((l.property = this.parseExpression()),
                this.expect(Fe.bracketR))
              : (l.property =
                  this.type === Fe.privateId && "Super" !== e.type
                    ? this.parsePrivateIdent()
                    : this.parseIdent("never" !== this.options.allowReserved)),
            (l.computed = !!u),
            a && (l.optional = o),
            (e = this.finishNode(l, "MemberExpression"));
        } else if (!i && this.eat(Fe.parenL)) {
          var c = new gt(),
            p = this.yieldPos,
            h = this.awaitPos,
            f = this.awaitIdentPos;
          (this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0);
          var d = this.parseExprList(
            Fe.parenR,
            this.options.ecmaVersion >= 8,
            !1,
            c,
          );
          if (n && !o && !this.canInsertSemicolon() && this.eat(Fe.arrow))
            return (
              this.checkPatternErrors(c, !1),
              this.checkYieldAwaitInDefaultParams(),
              this.awaitIdentPos > 0 &&
                this.raise(
                  this.awaitIdentPos,
                  "Cannot use 'await' as identifier inside an async function",
                ),
              (this.yieldPos = p),
              (this.awaitPos = h),
              (this.awaitIdentPos = f),
              this.parseArrowExpression(this.startNodeAt(t, r), d, !0)
            );
          this.checkExpressionErrors(c, !0),
            (this.yieldPos = p || this.yieldPos),
            (this.awaitPos = h || this.awaitPos),
            (this.awaitIdentPos = f || this.awaitIdentPos);
          var m = this.startNodeAt(t, r);
          (m.callee = e),
            (m.arguments = d),
            a && (m.optional = o),
            (e = this.finishNode(m, "CallExpression"));
        } else if (this.type === Fe.backQuote) {
          (o || s) &&
            this.raise(
              this.start,
              "Optional chaining cannot appear in the tag of tagged template expressions",
            );
          var v = this.startNodeAt(t, r);
          (v.tag = e),
            (v.quasi = this.parseTemplate({ isTagged: !0 })),
            (e = this.finishNode(v, "TaggedTemplateExpression"));
        }
        return e;
      }),
      (yt.parseExprAtom = function (e) {
        "use strict";
        this.type === Fe.slash && this.readRegexp();
        var t,
          r = this.potentialArrowAt === this.start;
        switch (this.type) {
          case Fe._super:
            return (
              this.allowSuper ||
                this.raise(this.start, "'super' keyword outside a method"),
              (t = this.startNode()),
              this.next(),
              this.type !== Fe.parenL ||
                this.allowDirectSuper ||
                this.raise(
                  t.start,
                  "super() call outside constructor of a subclass",
                ),
              this.type !== Fe.dot &&
                this.type !== Fe.bracketL &&
                this.type !== Fe.parenL &&
                this.unexpected(),
              this.finishNode(t, "Super")
            );
          case Fe._this:
            return (
              (t = this.startNode()),
              this.next(),
              this.finishNode(t, "ThisExpression")
            );
          case Fe.name:
            var i = this.start,
              n = this.startLoc,
              s = this.containsEsc,
              a = this.parseIdent(!1);
            if (
              this.options.ecmaVersion >= 8 &&
              !s &&
              "async" === a.name &&
              !this.canInsertSemicolon() &&
              this.eat(Fe._function)
            )
              return this.parseFunction(this.startNodeAt(i, n), 0, !1, !0);
            if (r && !this.canInsertSemicolon()) {
              if (this.eat(Fe.arrow))
                return this.parseArrowExpression(
                  this.startNodeAt(i, n),
                  [a],
                  !1,
                );
              if (
                this.options.ecmaVersion >= 8 &&
                "async" === a.name &&
                this.type === Fe.name &&
                !s &&
                (!this.potentialArrowInForAwait ||
                  "of" !== this.value ||
                  this.containsEsc)
              )
                return (
                  (a = this.parseIdent(!1)),
                  (!this.canInsertSemicolon() && this.eat(Fe.arrow)) ||
                    this.unexpected(),
                  this.parseArrowExpression(this.startNodeAt(i, n), [a], !0)
                );
            }
            return a;
          case Fe.regexp:
            var o = this.value;
            return (
              (t = this.parseLiteral(o.value)),
              (t.regex = { pattern: o.pattern, flags: o.flags }),
              t
            );
          case Fe.num:
          case Fe.string:
            return this.parseLiteral(this.value);
          case Fe._null:
          case Fe._true:
          case Fe._false:
            return (
              (t = this.startNode()),
              (t.value =
                this.type === Fe._null ? null : this.type === Fe._true),
              (t.raw = this.type.keyword),
              this.next(),
              this.finishNode(t, "Literal")
            );
          case Fe.parenL:
            var u = this.start,
              l = this.parseParenAndDistinguishExpression(r);
            return (
              e &&
                (e.parenthesizedAssign < 0 &&
                  !this.isSimpleAssignTarget(l) &&
                  (e.parenthesizedAssign = u),
                e.parenthesizedBind < 0 && (e.parenthesizedBind = u)),
              l
            );
          case Fe.bracketL:
            return (
              (t = this.startNode()),
              this.next(),
              (t.elements = this.parseExprList(Fe.bracketR, !0, !0, e)),
              this.finishNode(t, "ArrayExpression")
            );
          case Fe.braceL:
            return this.parseObj(!1, e);
          case Fe._function:
            return (
              (t = this.startNode()), this.next(), this.parseFunction(t, 0)
            );
          case Fe._class:
            return this.parseClass(this.startNode(), !1);
          case Fe._new:
            return this.parseNew();
          case Fe.backQuote:
            return this.parseTemplate();
          case Fe._import:
            return this.options.ecmaVersion >= 11
              ? this.parseExprImport()
              : this.unexpected();
          default:
            this.unexpected();
        }
      }),
      (yt.parseExprImport = function () {
        "use strict";
        var e = this.startNode();
        this.containsEsc &&
          this.raiseRecoverable(
            this.start,
            "Escape sequence in keyword import",
          );
        var t = this.parseIdent(!0);
        switch (this.type) {
          case Fe.parenL:
            return this.parseDynamicImport(e);
          case Fe.dot:
            return (e.meta = t), this.parseImportMeta(e);
          default:
            this.unexpected();
        }
      }),
      (yt.parseDynamicImport = function (e) {
        "use strict";
        if (
          (this.next(),
          (e.source = this.parseMaybeAssign()),
          !this.eat(Fe.parenR))
        ) {
          var t = this.start;
          this.eat(Fe.comma) && this.eat(Fe.parenR)
            ? this.raiseRecoverable(
                t,
                "Trailing comma is not allowed in import()",
              )
            : this.unexpected(t);
        }
        return this.finishNode(e, "ImportExpression");
      }),
      (yt.parseImportMeta = function (e) {
        "use strict";
        this.next();
        var t = this.containsEsc;
        return (
          (e.property = this.parseIdent(!0)),
          "meta" !== e.property.name &&
            this.raiseRecoverable(
              e.property.start,
              "The only valid meta property for import is 'import.meta'",
            ),
          t &&
            this.raiseRecoverable(
              e.start,
              "'import.meta' must not contain escaped characters",
            ),
          "module" === this.options.sourceType ||
            this.options.allowImportExportEverywhere ||
            this.raiseRecoverable(
              e.start,
              "Cannot use 'import.meta' outside a module",
            ),
          this.finishNode(e, "MetaProperty")
        );
      }),
      (yt.parseLiteral = function (e) {
        "use strict";
        var t = this.startNode();
        return (
          (t.value = e),
          (t.raw = this.input.slice(this.start, this.end)),
          110 === t.raw.charCodeAt(t.raw.length - 1) &&
            (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")),
          this.next(),
          this.finishNode(t, "Literal")
        );
      }),
      (yt.parseParenExpression = function () {
        "use strict";
        this.expect(Fe.parenL);
        var e = this.parseExpression();
        return this.expect(Fe.parenR), e;
      }),
      (yt.parseParenAndDistinguishExpression = function (e) {
        "use strict";
        var t,
          r = this.start,
          i = this.startLoc,
          n = this.options.ecmaVersion >= 8;
        if (this.options.ecmaVersion >= 6) {
          this.next();
          var s,
            a = this.start,
            o = this.startLoc,
            u = [],
            l = !0,
            c = !1,
            p = new gt(),
            h = this.yieldPos,
            f = this.awaitPos;
          for (
            this.yieldPos = 0, this.awaitPos = 0;
            this.type !== Fe.parenR;

          ) {
            if (
              (l ? (l = !1) : this.expect(Fe.comma),
              n && this.afterTrailingComma(Fe.parenR, !0))
            ) {
              c = !0;
              break;
            }
            if (this.type === Fe.ellipsis) {
              (s = this.start),
                u.push(this.parseParenItem(this.parseRestBinding())),
                this.type === Fe.comma &&
                  this.raise(
                    this.start,
                    "Comma is not permitted after the rest element",
                  );
              break;
            }
            u.push(this.parseMaybeAssign(!1, p, this.parseParenItem));
          }
          var d = this.start,
            m = this.startLoc;
          if (
            (this.expect(Fe.parenR),
            e && !this.canInsertSemicolon() && this.eat(Fe.arrow))
          )
            return (
              this.checkPatternErrors(p, !1),
              this.checkYieldAwaitInDefaultParams(),
              (this.yieldPos = h),
              (this.awaitPos = f),
              this.parseParenArrowList(r, i, u)
            );
          (u.length && !c) || this.unexpected(this.lastTokStart),
            s && this.unexpected(s),
            this.checkExpressionErrors(p, !0),
            (this.yieldPos = h || this.yieldPos),
            (this.awaitPos = f || this.awaitPos),
            u.length > 1
              ? ((t = this.startNodeAt(a, o)),
                (t.expressions = u),
                this.finishNodeAt(t, "SequenceExpression", d, m))
              : (t = u[0]);
        } else t = this.parseParenExpression();
        if (this.options.preserveParens) {
          var v = this.startNodeAt(r, i);
          return (
            (v.expression = t), this.finishNode(v, "ParenthesizedExpression")
          );
        }
        return t;
      }),
      (yt.parseParenItem = function (e) {
        "use strict";
        return e;
      }),
      (yt.parseParenArrowList = function (e, t, r) {
        "use strict";
        return this.parseArrowExpression(this.startNodeAt(e, t), r);
      });
    var xt = [];
    (yt.parseNew = function () {
      "use strict";
      this.containsEsc &&
        this.raiseRecoverable(this.start, "Escape sequence in keyword new");
      var e = this.startNode(),
        t = this.parseIdent(!0);
      if (this.options.ecmaVersion >= 6 && this.eat(Fe.dot)) {
        e.meta = t;
        var r = this.containsEsc;
        return (
          (e.property = this.parseIdent(!0)),
          "target" !== e.property.name &&
            this.raiseRecoverable(
              e.property.start,
              "The only valid meta property for new is 'new.target'",
            ),
          r &&
            this.raiseRecoverable(
              e.start,
              "'new.target' must not contain escaped characters",
            ),
          this.inNonArrowFunction ||
            this.raiseRecoverable(
              e.start,
              "'new.target' can only be used in functions",
            ),
          this.finishNode(e, "MetaProperty")
        );
      }
      var i = this.start,
        n = this.startLoc,
        s = this.type === Fe._import;
      return (
        (e.callee = this.parseSubscripts(this.parseExprAtom(), i, n, !0)),
        s &&
          "ImportExpression" === e.callee.type &&
          this.raise(i, "Cannot use new with import()"),
        (e.arguments = this.eat(Fe.parenL)
          ? this.parseExprList(Fe.parenR, this.options.ecmaVersion >= 8, !1)
          : xt),
        this.finishNode(e, "NewExpression")
      );
    }),
      (yt.parseTemplateElement = function ({ isTagged: e }) {
        var t = this.startNode();
        return (
          this.type === Fe.invalidTemplate
            ? (e ||
                this.raiseRecoverable(
                  this.start,
                  "Bad escape sequence in untagged template literal",
                ),
              (t.value = { raw: this.value, cooked: null }))
            : (t.value = {
                raw: this.input
                  .slice(this.start, this.end)
                  .replace(/\r\n?/g, "\n"),
                cooked: this.value,
              }),
          this.next(),
          (t.tail = this.type === Fe.backQuote),
          this.finishNode(t, "TemplateElement")
        );
      }),
      (yt.parseTemplate = function ({ isTagged: e = !1 } = {}) {
        var t = this.startNode();
        this.next(), (t.expressions = []);
        var r = this.parseTemplateElement({ isTagged: e });
        for (t.quasis = [r]; !r.tail; )
          this.type === Fe.eof &&
            this.raise(this.pos, "Unterminated template literal"),
            this.expect(Fe.dollarBraceL),
            t.expressions.push(this.parseExpression()),
            this.expect(Fe.braceR),
            t.quasis.push((r = this.parseTemplateElement({ isTagged: e })));
        return this.next(), this.finishNode(t, "TemplateLiteral");
      }),
      (yt.isAsyncProp = function (e) {
        "use strict";
        return (
          !e.computed &&
          "Identifier" === e.key.type &&
          "async" === e.key.name &&
          (this.type === Fe.name ||
            this.type === Fe.num ||
            this.type === Fe.string ||
            this.type === Fe.bracketL ||
            this.type.keyword ||
            (this.options.ecmaVersion >= 9 && this.type === Fe.star)) &&
          !Ye.test(this.input.slice(this.lastTokEnd, this.start))
        );
      }),
      (yt.parseObj = function (e, t) {
        "use strict";
        var r = this.startNode(),
          i = !0,
          n = {};
        for (r.properties = [], this.next(); !this.eat(Fe.braceR); ) {
          if (i) i = !1;
          else if (
            (this.expect(Fe.comma),
            this.options.ecmaVersion >= 5 && this.afterTrailingComma(Fe.braceR))
          )
            break;
          var s = this.parseProperty(e, t);
          e || this.checkPropClash(s, n, t), r.properties.push(s);
        }
        return this.finishNode(r, e ? "ObjectPattern" : "ObjectExpression");
      }),
      (yt.parseProperty = function (e, t) {
        "use strict";
        var r,
          i,
          n,
          s,
          a = this.startNode();
        if (this.options.ecmaVersion >= 9 && this.eat(Fe.ellipsis))
          return e
            ? ((a.argument = this.parseIdent(!1)),
              this.type === Fe.comma &&
                this.raise(
                  this.start,
                  "Comma is not permitted after the rest element",
                ),
              this.finishNode(a, "RestElement"))
            : (this.type === Fe.parenL &&
                t &&
                (t.parenthesizedAssign < 0 &&
                  (t.parenthesizedAssign = this.start),
                t.parenthesizedBind < 0 && (t.parenthesizedBind = this.start)),
              (a.argument = this.parseMaybeAssign(!1, t)),
              this.type === Fe.comma &&
                t &&
                t.trailingComma < 0 &&
                (t.trailingComma = this.start),
              this.finishNode(a, "SpreadElement"));
        this.options.ecmaVersion >= 6 &&
          ((a.method = !1),
          (a.shorthand = !1),
          (e || t) && ((n = this.start), (s = this.startLoc)),
          e || (r = this.eat(Fe.star)));
        var o = this.containsEsc;
        return (
          this.parsePropertyName(a),
          !e && !o && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(a)
            ? ((i = !0),
              (r = this.options.ecmaVersion >= 9 && this.eat(Fe.star)),
              this.parsePropertyName(a, t))
            : (i = !1),
          this.parsePropertyValue(a, e, r, i, n, s, t, o),
          this.finishNode(a, "Property")
        );
      }),
      (yt.parsePropertyValue = function (e, t, r, i, n, s, a, o) {
        "use strict";
        if (
          ((r || i) && this.type === Fe.colon && this.unexpected(),
          this.eat(Fe.colon))
        )
          (e.value = t
            ? this.parseMaybeDefault(this.start, this.startLoc)
            : this.parseMaybeAssign(!1, a)),
            (e.kind = "init");
        else if (this.options.ecmaVersion >= 6 && this.type === Fe.parenL)
          t && this.unexpected(),
            (e.kind = "init"),
            (e.method = !0),
            (e.value = this.parseMethod(r, i));
        else if (
          t ||
          o ||
          !(this.options.ecmaVersion >= 5) ||
          e.computed ||
          "Identifier" !== e.key.type ||
          ("get" !== e.key.name && "set" !== e.key.name) ||
          this.type === Fe.comma ||
          this.type === Fe.braceR ||
          this.type === Fe.eq
        )
          this.options.ecmaVersion >= 6 &&
          !e.computed &&
          "Identifier" === e.key.type
            ? ((r || i) && this.unexpected(),
              this.checkUnreserved(e.key),
              "await" !== e.key.name ||
                this.awaitIdentPos ||
                (this.awaitIdentPos = n),
              (e.kind = "init"),
              t
                ? (e.value = this.parseMaybeDefault(n, s, this.copyNode(e.key)))
                : this.type === Fe.eq && a
                  ? (a.shorthandAssign < 0 && (a.shorthandAssign = this.start),
                    (e.value = this.parseMaybeDefault(
                      n,
                      s,
                      this.copyNode(e.key),
                    )))
                  : (e.value = this.copyNode(e.key)),
              (e.shorthand = !0))
            : this.unexpected();
        else {
          (r || i) && this.unexpected(),
            (e.kind = e.key.name),
            this.parsePropertyName(e),
            (e.value = this.parseMethod(!1));
          var u = "get" === e.kind ? 0 : 1;
          if (e.value.params.length !== u) {
            var l = e.value.start;
            this.raiseRecoverable(
              l,
              "get" === e.kind
                ? "getter should have no params"
                : "setter should have exactly one param",
            );
          } else
            "set" === e.kind &&
              "RestElement" === e.value.params[0].type &&
              this.raiseRecoverable(
                e.value.params[0].start,
                "Setter cannot use rest params",
              );
        }
      }),
      (yt.parsePropertyName = function (e) {
        "use strict";
        if (this.options.ecmaVersion >= 6) {
          if (this.eat(Fe.bracketL))
            return (
              (e.computed = !0),
              (e.key = this.parseMaybeAssign()),
              this.expect(Fe.bracketR),
              e.key
            );
          e.computed = !1;
        }
        return (e.key =
          this.type === Fe.num || this.type === Fe.string
            ? this.parseExprAtom()
            : this.parseIdent("never" !== this.options.allowReserved));
      }),
      (yt.initFunction = function (e) {
        "use strict";
        (e.id = null),
          this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
          this.options.ecmaVersion >= 8 && (e.async = !1);
      }),
      (yt.parseMethod = function (e, t, r) {
        "use strict";
        var i = this.startNode(),
          n = this.yieldPos,
          s = this.awaitPos,
          a = this.awaitIdentPos;
        return (
          this.initFunction(i),
          this.options.ecmaVersion >= 6 && (i.generator = e),
          this.options.ecmaVersion >= 8 && (i.async = !!t),
          (this.yieldPos = 0),
          (this.awaitPos = 0),
          (this.awaitIdentPos = 0),
          this.enterScope(64 | ft(t, i.generator) | (r ? 128 : 0)),
          this.expect(Fe.parenL),
          (i.params = this.parseBindingList(
            Fe.parenR,
            !1,
            this.options.ecmaVersion >= 8,
          )),
          this.checkYieldAwaitInDefaultParams(),
          this.parseFunctionBody(i, !1, !0),
          (this.yieldPos = n),
          (this.awaitPos = s),
          (this.awaitIdentPos = a),
          this.finishNode(i, "FunctionExpression")
        );
      }),
      (yt.parseArrowExpression = function (e, t, r) {
        "use strict";
        var i = this.yieldPos,
          n = this.awaitPos,
          s = this.awaitIdentPos;
        return (
          this.enterScope(16 | ft(r, !1)),
          this.initFunction(e),
          this.options.ecmaVersion >= 8 && (e.async = !!r),
          (this.yieldPos = 0),
          (this.awaitPos = 0),
          (this.awaitIdentPos = 0),
          (e.params = this.toAssignableList(t, !0)),
          this.parseFunctionBody(e, !0, !1),
          (this.yieldPos = i),
          (this.awaitPos = n),
          (this.awaitIdentPos = s),
          this.finishNode(e, "ArrowFunctionExpression")
        );
      }),
      (yt.parseFunctionBody = function (e, t, r) {
        "use strict";
        var i = t && this.type !== Fe.braceL,
          n = this.strict,
          s = !1;
        if (i)
          (e.body = this.parseMaybeAssign()),
            (e.expression = !0),
            this.checkParams(e, !1);
        else {
          var a =
            this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
          (n && !a) ||
            ((s = this.strictDirective(this.end)),
            s &&
              a &&
              this.raiseRecoverable(
                e.start,
                "Illegal 'use strict' directive in function with non-simple parameter list",
              ));
          var o = this.labels;
          (this.labels = []),
            s && (this.strict = !0),
            this.checkParams(
              e,
              !n && !s && !t && !r && this.isSimpleParamList(e.params),
            ),
            this.strict && e.id && this.checkLValSimple(e.id, 5),
            (e.body = this.parseBlock(!1, void 0, s && !n)),
            (e.expression = !1),
            this.adaptDirectivePrologue(e.body.body),
            (this.labels = o);
        }
        this.exitScope();
      }),
      (yt.isSimpleParamList = function (e) {
        "use strict";
        for (var t = 0, r = null == e ? 0 : e.length; t < r; t++) {
          var i = e[t];
          if ("Identifier" !== i.type) return !1;
        }
        return !0;
      }),
      (yt.checkParams = function (e, t) {
        "use strict";
        for (
          var r = Object.create(null),
            i = 0,
            n = e.params,
            s = null == n ? 0 : n.length;
          i < s;
          i++
        ) {
          var a = n[i];
          this.checkLValInnerPattern(a, 1, t ? null : r);
        }
      }),
      (yt.parseExprList = function (e, t, r, i) {
        "use strict";
        for (var n = [], s = !0; !this.eat(e); ) {
          if (s) s = !1;
          else if ((this.expect(Fe.comma), t && this.afterTrailingComma(e)))
            break;
          var a = void 0;
          r && this.type === Fe.comma
            ? (a = null)
            : this.type === Fe.ellipsis
              ? ((a = this.parseSpread(i)),
                i &&
                  this.type === Fe.comma &&
                  i.trailingComma < 0 &&
                  (i.trailingComma = this.start))
              : (a = this.parseMaybeAssign(!1, i)),
            n.push(a);
        }
        return n;
      }),
      (yt.checkUnreserved = function ({ start: e, end: t, name: r }) {
        if (
          (this.inGenerator &&
            "yield" === r &&
            this.raiseRecoverable(
              e,
              "Cannot use 'yield' as identifier inside a generator",
            ),
          this.inAsync &&
            "await" === r &&
            this.raiseRecoverable(
              e,
              "Cannot use 'await' as identifier inside an async function",
            ),
          this.currentThisScope().inClassFieldInit &&
            "arguments" === r &&
            this.raiseRecoverable(
              e,
              "Cannot use 'arguments' in class field initializer",
            ),
          this.keywords.test(r) && this.raise(e, `Unexpected keyword '${r}'`),
          !(
            this.options.ecmaVersion < 6 &&
            -1 !== this.input.slice(e, t).indexOf("\\")
          ))
        ) {
          var i = this.strict ? this.reservedWordsStrict : this.reservedWords;
          i.test(r) &&
            (this.inAsync ||
              "await" !== r ||
              this.raiseRecoverable(
                e,
                "Cannot use keyword 'await' outside an async function",
              ),
            this.raiseRecoverable(e, `The keyword '${r}' is reserved`));
        }
      }),
      (yt.parseIdent = function (e, t) {
        "use strict";
        var r = this.startNode();
        return (
          this.type === Fe.name
            ? (r.name = this.value)
            : this.type.keyword
              ? ((r.name = this.type.keyword),
                ("class" !== r.name && "function" !== r.name) ||
                  (this.lastTokEnd === this.lastTokStart + 1 &&
                    46 === this.input.charCodeAt(this.lastTokStart)) ||
                  this.context.pop())
              : this.unexpected(),
          this.next(!!e),
          this.finishNode(r, "Identifier"),
          e ||
            (this.checkUnreserved(r),
            "await" !== r.name ||
              this.awaitIdentPos ||
              (this.awaitIdentPos = r.start)),
          r
        );
      }),
      (yt.parsePrivateIdent = function () {
        "use strict";
        var e = this.startNode();
        return (
          this.type === Fe.privateId
            ? (e.name = this.value)
            : this.unexpected(),
          this.next(),
          this.finishNode(e, "PrivateIdentifier"),
          0 === this.privateNameStack.length
            ? this.raise(
                e.start,
                `Private field '#${e.name}' must be declared in an enclosing class`,
              )
            : this.privateNameStack[this.privateNameStack.length - 1].used.push(
                e,
              ),
          e
        );
      }),
      (yt.parseYield = function (e) {
        "use strict";
        this.yieldPos || (this.yieldPos = this.start);
        var t = this.startNode();
        return (
          this.next(),
          this.type === Fe.semi ||
          this.canInsertSemicolon() ||
          (this.type !== Fe.star && !this.type.startsExpr)
            ? ((t.delegate = !1), (t.argument = null))
            : ((t.delegate = this.eat(Fe.star)),
              (t.argument = this.parseMaybeAssign(e))),
          this.finishNode(t, "YieldExpression")
        );
      }),
      (yt.parseAwait = function () {
        "use strict";
        this.awaitPos || (this.awaitPos = this.start);
        var e = this.startNode();
        return (
          this.next(),
          (e.argument = this.parseMaybeUnary(null, !0)),
          this.finishNode(e, "AwaitExpression")
        );
      });
    var bt = dt.prototype;
    (bt.raise = function (e, t) {
      "use strict";
      var r = ct(this.input, e);
      t += " (" + r.line + ":" + r.column + ")";
      var i = new SyntaxError(t);
      throw ((i.pos = e), (i.loc = r), (i.raisedAt = this.pos), i);
    }),
      (bt.raiseRecoverable = bt.raise),
      (bt.curPosition = function () {
        "use strict";
        if (this.options.locations)
          return new ut(this.curLine, this.pos - this.lineStart);
      });
    var Et = dt.prototype;
    (Et.toAssignable = function (e, t, r) {
      "use strict";
      if (this.options.ecmaVersion >= 6 && e)
        switch (e.type) {
          case "Identifier":
            this.inAsync &&
              "await" === e.name &&
              this.raise(
                e.start,
                "Cannot use 'await' as identifier inside an async function",
              );
            break;
          case "ObjectPattern":
          case "ArrayPattern":
          case "AssignmentPattern":
          case "RestElement":
            break;
          case "ObjectExpression":
            (e.type = "ObjectPattern"), r && this.checkPatternErrors(r, !0);
            for (
              var i = 0, n = e.properties, s = null == n ? 0 : n.length;
              i < s;
              i++
            ) {
              var a = n[i];
              this.toAssignable(a, t),
                "RestElement" !== a.type ||
                  ("ArrayPattern" !== a.argument.type &&
                    "ObjectPattern" !== a.argument.type) ||
                  this.raise(a.argument.start, "Unexpected token");
            }
            break;
          case "Property":
            "init" !== e.kind &&
              this.raise(
                e.key.start,
                "Object pattern can't contain getter or setter",
              ),
              this.toAssignable(e.value, t);
            break;
          case "ArrayExpression":
            (e.type = "ArrayPattern"),
              r && this.checkPatternErrors(r, !0),
              this.toAssignableList(e.elements, t);
            break;
          case "SpreadElement":
            (e.type = "RestElement"),
              this.toAssignable(e.argument, t),
              "AssignmentPattern" === e.argument.type &&
                this.raise(
                  e.argument.start,
                  "Rest elements cannot have a default value",
                );
            break;
          case "AssignmentExpression":
            "=" !== e.operator &&
              this.raise(
                e.left.end,
                "Only '=' operator can be used for specifying default value.",
              ),
              (e.type = "AssignmentPattern"),
              delete e.operator,
              this.toAssignable(e.left, t);
            break;
          case "ParenthesizedExpression":
            this.toAssignable(e.expression, t, r);
            break;
          case "ChainExpression":
            this.raiseRecoverable(
              e.start,
              "Optional chaining cannot appear in left-hand side",
            );
            break;
          case "MemberExpression":
            if (!t) break;
          default:
            this.raise(e.start, "Assigning to rvalue");
        }
      else r && this.checkPatternErrors(r, !0);
      return e;
    }),
      (Et.toAssignableList = function (e, t) {
        "use strict";
        for (var r = e.length, i = 0; i < r; i++) {
          var n = e[i];
          n && this.toAssignable(n, t);
        }
        if (r) {
          var s = e[r - 1];
          6 === this.options.ecmaVersion &&
            t &&
            s &&
            "RestElement" === s.type &&
            "Identifier" !== s.argument.type &&
            this.unexpected(s.argument.start);
        }
        return e;
      }),
      (Et.parseSpread = function (e) {
        "use strict";
        var t = this.startNode();
        return (
          this.next(),
          (t.argument = this.parseMaybeAssign(!1, e)),
          this.finishNode(t, "SpreadElement")
        );
      }),
      (Et.parseRestBinding = function () {
        "use strict";
        var e = this.startNode();
        return (
          this.next(),
          6 === this.options.ecmaVersion &&
            this.type !== Fe.name &&
            this.unexpected(),
          (e.argument = this.parseBindingAtom()),
          this.finishNode(e, "RestElement")
        );
      }),
      (Et.parseBindingAtom = function () {
        "use strict";
        if (this.options.ecmaVersion >= 6)
          switch (this.type) {
            case Fe.bracketL:
              var e = this.startNode();
              return (
                this.next(),
                (e.elements = this.parseBindingList(Fe.bracketR, !0, !0)),
                this.finishNode(e, "ArrayPattern")
              );
            case Fe.braceL:
              return this.parseObj(!0);
          }
        return this.parseIdent();
      }),
      (Et.parseBindingList = function (e, t, r) {
        "use strict";
        for (var i = [], n = !0; !this.eat(e); )
          if (
            (n ? (n = !1) : this.expect(Fe.comma), t && this.type === Fe.comma)
          )
            i.push(null);
          else {
            if (r && this.afterTrailingComma(e)) break;
            if (this.type === Fe.ellipsis) {
              var s = this.parseRestBinding();
              this.parseBindingListItem(s),
                i.push(s),
                this.type === Fe.comma &&
                  this.raise(
                    this.start,
                    "Comma is not permitted after the rest element",
                  ),
                this.expect(e);
              break;
            }
            var a = this.parseMaybeDefault(this.start, this.startLoc);
            this.parseBindingListItem(a), i.push(a);
          }
        return i;
      }),
      (Et.parseBindingListItem = function (e) {
        "use strict";
        return e;
      }),
      (Et.parseMaybeDefault = function (e, t, r) {
        "use strict";
        if (
          ((r = r || this.parseBindingAtom()),
          this.options.ecmaVersion < 6 || !this.eat(Fe.eq))
        )
          return r;
        var i = this.startNodeAt(e, t);
        return (
          (i.left = r),
          (i.right = this.parseMaybeAssign()),
          this.finishNode(i, "AssignmentPattern")
        );
      }),
      (Et.checkLValSimple = function (e, t = 0, r) {
        var i = 0 !== t;
        switch (e.type) {
          case "Identifier":
            this.strict &&
              this.reservedWordsStrictBind.test(e.name) &&
              this.raiseRecoverable(
                e.start,
                (i ? "Binding " : "Assigning to ") + e.name + " in strict mode",
              ),
              i &&
                (2 === t &&
                  "let" === e.name &&
                  this.raiseRecoverable(
                    e.start,
                    "let is disallowed as a lexically bound name",
                  ),
                r &&
                  (st(r, e.name) &&
                    this.raiseRecoverable(e.start, "Argument name clash"),
                  (r[e.name] = !0)),
                5 !== t && this.declareName(e.name, t, e.start));
            break;
          case "ChainExpression":
            this.raiseRecoverable(
              e.start,
              "Optional chaining cannot appear in left-hand side",
            );
            break;
          case "MemberExpression":
            i && this.raiseRecoverable(e.start, "Binding member expression");
            break;
          case "ParenthesizedExpression":
            return (
              i &&
                this.raiseRecoverable(
                  e.start,
                  "Binding parenthesized expression",
                ),
              this.checkLValSimple(e.expression, t, r)
            );
          default:
            this.raise(e.start, (i ? "Binding" : "Assigning to") + " rvalue");
        }
      }),
      (Et.checkLValPattern = function (e, t = 0, r) {
        switch (e.type) {
          case "ObjectPattern":
            for (
              var i = 0, n = e.properties, s = null == n ? 0 : n.length;
              i < s;
              i++
            ) {
              var a = n[i];
              this.checkLValInnerPattern(a, t, r);
            }
            break;
          case "ArrayPattern":
            for (
              var o = 0, u = e.elements, l = null == u ? 0 : u.length;
              o < l;
              o++
            ) {
              var c = u[o];
              c && this.checkLValInnerPattern(c, t, r);
            }
            break;
          default:
            this.checkLValSimple(e, t, r);
        }
      }),
      (Et.checkLValInnerPattern = function (e, t = 0, r) {
        switch (e.type) {
          case "Property":
            this.checkLValInnerPattern(e.value, t, r);
            break;
          case "AssignmentPattern":
            this.checkLValPattern(e.left, t, r);
            break;
          case "RestElement":
            this.checkLValPattern(e.argument, t, r);
            break;
          default:
            this.checkLValPattern(e, t, r);
        }
      });
    class wt {
      constructor(e, t, r) {
        (this.type = ""),
          (this.start = t),
          (this.end = 0),
          e.options.locations && (this.loc = new lt(e, r)),
          e.options.directSourceFile &&
            (this.sourceFile = e.options.directSourceFile),
          e.options.ranges && (this.range = [t, 0]);
      }
    }
    var Rt = dt.prototype;
    function St(e, t, r, i) {
      "use strict";
      return (
        (e.type = t),
        (e.end = r),
        this.options.locations && (e.loc.end = i),
        this.options.ranges && (e.range[1] = r),
        e
      );
    }
    (Rt.startNode = function () {
      "use strict";
      return new wt(this, this.start, this.startLoc);
    }),
      (Rt.startNodeAt = function (e, t) {
        "use strict";
        return new wt(this, e, t);
      }),
      (Rt.finishNode = function (e, t) {
        "use strict";
        return St.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
      }),
      (Rt.finishNodeAt = function (e, t, r, i) {
        "use strict";
        return St.call(this, e, t, r, i);
      }),
      (Rt.copyNode = function (e) {
        "use strict";
        var t = new wt(this, e.start, this.startLoc);
        for (var r in e) t[r] = e[r];
        return t;
      });
    var It = dt.prototype;
    class Pt {
      constructor(e) {
        (this.flags = e),
          (this.var = []),
          (this.lexical = []),
          (this.functions = []),
          (this.inClassFieldInit = !1);
      }
    }
    (It.enterScope = function (e) {
      "use strict";
      this.scopeStack.push(new Pt(e));
    }),
      (It.exitScope = function () {
        "use strict";
        this.scopeStack.pop();
      }),
      (It.treatFunctionsAsVarInScope = function (e) {
        "use strict";
        return 2 & e.flags || (!this.inModule && 1 & e.flags);
      }),
      (It.declareName = function (e, t, r) {
        "use strict";
        var i = !1;
        if (2 === t) {
          var n = this.currentScope();
          (i =
            n.lexical.indexOf(e) > -1 ||
            n.functions.indexOf(e) > -1 ||
            n.var.indexOf(e) > -1),
            n.lexical.push(e),
            this.inModule && 1 & n.flags && delete this.undefinedExports[e];
        } else if (4 === t) {
          var s = this.currentScope();
          s.lexical.push(e);
        } else if (3 === t) {
          var a = this.currentScope();
          (i = this.treatFunctionsAsVar
            ? a.lexical.indexOf(e) > -1
            : a.lexical.indexOf(e) > -1 || a.var.indexOf(e) > -1),
            a.functions.push(e);
        } else
          for (var o = this.scopeStack.length - 1; o >= 0; --o) {
            var u = this.scopeStack[o];
            if (
              (u.lexical.indexOf(e) > -1 &&
                !(32 & u.flags && u.lexical[0] === e)) ||
              (!this.treatFunctionsAsVarInScope(u) &&
                u.functions.indexOf(e) > -1)
            ) {
              i = !0;
              break;
            }
            if (
              (u.var.push(e),
              this.inModule && 1 & u.flags && delete this.undefinedExports[e],
              3 & u.flags)
            )
              break;
          }
        i &&
          this.raiseRecoverable(
            r,
            `Identifier '${e}' has already been declared`,
          );
      }),
      (It.checkLocalExport = function (e) {
        "use strict";
        -1 === this.scopeStack[0].lexical.indexOf(e.name) &&
          -1 === this.scopeStack[0].var.indexOf(e.name) &&
          (this.undefinedExports[e.name] = e);
      }),
      (It.currentScope = function () {
        "use strict";
        return this.scopeStack[this.scopeStack.length - 1];
      }),
      (It.currentVarScope = function () {
        "use strict";
        for (var e = this.scopeStack.length - 1; ; e--) {
          var t = this.scopeStack[e];
          if (3 & t.flags) return t;
        }
      }),
      (It.currentThisScope = function () {
        "use strict";
        for (var e = this.scopeStack.length - 1; ; e--) {
          var t = this.scopeStack[e];
          if (3 & t.flags && !(16 & t.flags)) return t;
        }
      });
    var At = dt.prototype;
    At.parseTopLevel = function (e) {
      "use strict";
      var t = Object.create(null);
      for (e.body || (e.body = []); this.type !== Fe.eof; ) {
        var r = this.parseStatement(null, !0, t);
        e.body.push(r);
      }
      if (this.inModule)
        for (
          var i = 0,
            n = Object.keys(this.undefinedExports),
            s = null == n ? 0 : n.length;
          i < s;
          i++
        ) {
          var a = n[i];
          this.raiseRecoverable(
            this.undefinedExports[a].start,
            `Export '${a}' is not defined`,
          );
        }
      return (
        this.adaptDirectivePrologue(e.body),
        this.next(),
        (e.sourceType = this.options.sourceType),
        this.finishNode(e, "Program")
      );
    };
    var Nt = { kind: "loop" },
      _t = { kind: "switch" };
    (At.isLet = function (e) {
      "use strict";
      if (this.options.ecmaVersion < 6 || !this.isContextual("let")) return !1;
      tt.lastIndex = this.pos;
      var t = tt.exec(this.input),
        r = this.pos + t[0].length,
        i = this.input.charCodeAt(r);
      if (91 === i) return !0;
      if (e) return !1;
      if (123 === i) return !0;
      if (Xe(i, !0)) {
        for (var n = r + 1; Je(this.input.charCodeAt(n), !0); ) ++n;
        var s = this.input.slice(r, n);
        if (!$e.test(s)) return !0;
      }
      return !1;
    }),
      (At.isAsyncFunction = function () {
        "use strict";
        if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
          return !1;
        tt.lastIndex = this.pos;
        var e = tt.exec(this.input),
          t = this.pos + e[0].length;
        return !(
          Ye.test(this.input.slice(this.pos, t)) ||
          "function" !== this.input.slice(t, t + 8) ||
          (t + 8 !== this.input.length && Je(this.input.charAt(t + 8)))
        );
      }),
      (At.parseStatement = function (e, t, r) {
        "use strict";
        var i,
          n = this.type,
          s = this.startNode();
        switch ((this.isLet(e) && ((n = Fe._var), (i = "let")), n)) {
          case Fe._break:
          case Fe._continue:
            return this.parseBreakContinueStatement(s, n.keyword);
          case Fe._debugger:
            return this.parseDebuggerStatement(s);
          case Fe._do:
            return this.parseDoStatement(s);
          case Fe._for:
            return this.parseForStatement(s);
          case Fe._function:
            return (
              e &&
                (this.strict || ("if" !== e && "label" !== e)) &&
                this.options.ecmaVersion >= 6 &&
                this.unexpected(),
              this.parseFunctionStatement(s, !1, !e)
            );
          case Fe._class:
            return e && this.unexpected(), this.parseClass(s, !0);
          case Fe._if:
            return this.parseIfStatement(s);
          case Fe._return:
            return this.parseReturnStatement(s);
          case Fe._switch:
            return this.parseSwitchStatement(s);
          case Fe._throw:
            return this.parseThrowStatement(s);
          case Fe._try:
            return this.parseTryStatement(s);
          case Fe._const:
          case Fe._var:
            return (
              (i = i || this.value),
              e && "var" !== i && this.unexpected(),
              this.parseVarStatement(s, i)
            );
          case Fe._while:
            return this.parseWhileStatement(s);
          case Fe._with:
            return this.parseWithStatement(s);
          case Fe.braceL:
            return this.parseBlock(!0, s);
          case Fe.semi:
            return this.parseEmptyStatement(s);
          case Fe._export:
          case Fe._import:
            if (this.options.ecmaVersion > 10 && n === Fe._import) {
              tt.lastIndex = this.pos;
              var a = tt.exec(this.input),
                o = this.pos + a[0].length,
                u = this.input.charCodeAt(o);
              if (40 === u || 46 === u)
                return this.parseExpressionStatement(s, this.parseExpression());
            }
            return (
              this.options.allowImportExportEverywhere ||
                (t ||
                  this.raise(
                    this.start,
                    "'import' and 'export' may only appear at the top level",
                  ),
                this.inModule ||
                  this.raise(
                    this.start,
                    "'import' and 'export' may appear only with 'sourceType: module'",
                  )),
              n === Fe._import ? this.parseImport(s) : this.parseExport(s, r)
            );
          default:
            if (this.isAsyncFunction())
              return (
                e && this.unexpected(),
                this.next(),
                this.parseFunctionStatement(s, !0, !e)
              );
            var l = this.value,
              c = this.parseExpression();
            return n === Fe.name &&
              "Identifier" === c.type &&
              this.eat(Fe.colon)
              ? this.parseLabeledStatement(s, l, c, e)
              : this.parseExpressionStatement(s, c);
        }
      }),
      (At.parseBreakContinueStatement = function (e, t) {
        "use strict";
        var r = "break" === t;
        this.next(),
          this.eat(Fe.semi) || this.insertSemicolon()
            ? (e.label = null)
            : this.type !== Fe.name
              ? this.unexpected()
              : ((e.label = this.parseIdent()), this.semicolon());
        for (var i = 0; i < this.labels.length; ++i) {
          var n = this.labels[i];
          if (null == e.label || n.name === e.label.name) {
            if (null != n.kind && (r || "loop" === n.kind)) break;
            if (e.label && r) break;
          }
        }
        return (
          i === this.labels.length && this.raise(e.start, "Unsyntactic " + t),
          this.finishNode(e, r ? "BreakStatement" : "ContinueStatement")
        );
      }),
      (At.parseDebuggerStatement = function (e) {
        "use strict";
        return (
          this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement")
        );
      }),
      (At.parseDoStatement = function (e) {
        "use strict";
        return (
          this.next(),
          this.labels.push(Nt),
          (e.body = this.parseStatement("do")),
          this.labels.pop(),
          this.expect(Fe._while),
          (e.test = this.parseParenExpression()),
          this.options.ecmaVersion >= 6 ? this.eat(Fe.semi) : this.semicolon(),
          this.finishNode(e, "DoWhileStatement")
        );
      }),
      (At.parseForStatement = function (e) {
        "use strict";
        this.next();
        var t =
          this.options.ecmaVersion >= 9 &&
          (this.inAsync ||
            (!this.inFunction && this.options.allowAwaitOutsideFunction)) &&
          this.eatContextual("await")
            ? this.lastTokStart
            : -1;
        if (
          (this.labels.push(Nt),
          this.enterScope(0),
          this.expect(Fe.parenL),
          this.type === Fe.semi)
        )
          return t > -1 && this.unexpected(t), this.parseFor(e, null);
        var r = this.isLet();
        if (this.type === Fe._var || this.type === Fe._const || r) {
          var i = this.startNode(),
            n = r ? "let" : this.value;
          return (
            this.next(),
            this.parseVar(i, !0, n),
            this.finishNode(i, "VariableDeclaration"),
            (this.type === Fe._in ||
              (this.options.ecmaVersion >= 6 && this.isContextual("of"))) &&
            1 === i.declarations.length
              ? (this.options.ecmaVersion >= 9 &&
                  (this.type === Fe._in
                    ? t > -1 && this.unexpected(t)
                    : (e.await = t > -1)),
                this.parseForIn(e, i))
              : (t > -1 && this.unexpected(t), this.parseFor(e, i))
          );
        }
        var s = new gt(),
          a = this.parseExpression(!(t > -1) || "await", s);
        return this.type === Fe._in ||
          (this.options.ecmaVersion >= 6 && this.isContextual("of"))
          ? (this.options.ecmaVersion >= 9 &&
              (this.type === Fe._in
                ? t > -1 && this.unexpected(t)
                : (e.await = t > -1)),
            this.toAssignable(a, !1, s),
            this.checkLValPattern(a),
            this.parseForIn(e, a))
          : (this.checkExpressionErrors(s, !0),
            t > -1 && this.unexpected(t),
            this.parseFor(e, a));
      }),
      (At.parseFunctionStatement = function (e, t, r) {
        "use strict";
        return this.next(), this.parseFunction(e, Ct | (r ? 0 : Ot), !1, t);
      }),
      (At.parseIfStatement = function (e) {
        "use strict";
        return (
          this.next(),
          (e.test = this.parseParenExpression()),
          (e.consequent = this.parseStatement("if")),
          (e.alternate = this.eat(Fe._else) ? this.parseStatement("if") : null),
          this.finishNode(e, "IfStatement")
        );
      }),
      (At.parseReturnStatement = function (e) {
        "use strict";
        return (
          this.inFunction ||
            this.options.allowReturnOutsideFunction ||
            this.raise(this.start, "'return' outside of function"),
          this.next(),
          this.eat(Fe.semi) || this.insertSemicolon()
            ? (e.argument = null)
            : ((e.argument = this.parseExpression()), this.semicolon()),
          this.finishNode(e, "ReturnStatement")
        );
      }),
      (At.parseSwitchStatement = function (e) {
        "use strict";
        var t;
        this.next(),
          (e.discriminant = this.parseParenExpression()),
          (e.cases = []),
          this.expect(Fe.braceL),
          this.labels.push(_t),
          this.enterScope(0);
        for (var r = !1; this.type !== Fe.braceR; )
          if (this.type === Fe._case || this.type === Fe._default) {
            var i = this.type === Fe._case;
            t && this.finishNode(t, "SwitchCase"),
              e.cases.push((t = this.startNode())),
              (t.consequent = []),
              this.next(),
              i
                ? (t.test = this.parseExpression())
                : (r &&
                    this.raiseRecoverable(
                      this.lastTokStart,
                      "Multiple default clauses",
                    ),
                  (r = !0),
                  (t.test = null)),
              this.expect(Fe.colon);
          } else
            t || this.unexpected(),
              t.consequent.push(this.parseStatement(null));
        return (
          this.exitScope(),
          t && this.finishNode(t, "SwitchCase"),
          this.next(),
          this.labels.pop(),
          this.finishNode(e, "SwitchStatement")
        );
      }),
      (At.parseThrowStatement = function (e) {
        "use strict";
        return (
          this.next(),
          Ye.test(this.input.slice(this.lastTokEnd, this.start)) &&
            this.raise(this.lastTokEnd, "Illegal newline after throw"),
          (e.argument = this.parseExpression()),
          this.semicolon(),
          this.finishNode(e, "ThrowStatement")
        );
      });
    var kt = [];
    (At.parseTryStatement = function (e) {
      "use strict";
      if (
        (this.next(),
        (e.block = this.parseBlock()),
        (e.handler = null),
        this.type === Fe._catch)
      ) {
        var t = this.startNode();
        if ((this.next(), this.eat(Fe.parenL))) {
          t.param = this.parseBindingAtom();
          var r = "Identifier" === t.param.type;
          this.enterScope(r ? 32 : 0),
            this.checkLValPattern(t.param, r ? 4 : 2),
            this.expect(Fe.parenR);
        } else
          this.options.ecmaVersion < 10 && this.unexpected(),
            (t.param = null),
            this.enterScope(0);
        (t.body = this.parseBlock(!1)),
          this.exitScope(),
          (e.handler = this.finishNode(t, "CatchClause"));
      }
      return (
        (e.finalizer = this.eat(Fe._finally) ? this.parseBlock() : null),
        e.handler ||
          e.finalizer ||
          this.raise(e.start, "Missing catch or finally clause"),
        this.finishNode(e, "TryStatement")
      );
    }),
      (At.parseVarStatement = function (e, t) {
        "use strict";
        return (
          this.next(),
          this.parseVar(e, !1, t),
          this.semicolon(),
          this.finishNode(e, "VariableDeclaration")
        );
      }),
      (At.parseWhileStatement = function (e) {
        "use strict";
        return (
          this.next(),
          (e.test = this.parseParenExpression()),
          this.labels.push(Nt),
          (e.body = this.parseStatement("while")),
          this.labels.pop(),
          this.finishNode(e, "WhileStatement")
        );
      }),
      (At.parseWithStatement = function (e) {
        "use strict";
        return (
          this.strict && this.raise(this.start, "'with' in strict mode"),
          this.next(),
          (e.object = this.parseParenExpression()),
          (e.body = this.parseStatement("with")),
          this.finishNode(e, "WithStatement")
        );
      }),
      (At.parseEmptyStatement = function (e) {
        "use strict";
        return this.next(), this.finishNode(e, "EmptyStatement");
      }),
      (At.parseLabeledStatement = function (e, t, r, i) {
        "use strict";
        for (
          var n = 0, s = this.labels, a = null == s ? 0 : s.length;
          n < a;
          n++
        ) {
          var o = s[n];
          o.name === t &&
            this.raise(r.start, "Label '" + t + "' is already declared");
        }
        for (
          var u = this.type.isLoop
              ? "loop"
              : this.type === Fe._switch
                ? "switch"
                : null,
            l = this.labels.length - 1;
          l >= 0;
          l--
        ) {
          var c = this.labels[l];
          if (c.statementStart !== e.start) break;
          (c.statementStart = this.start), (c.kind = u);
        }
        return (
          this.labels.push({ name: t, kind: u, statementStart: this.start }),
          (e.body = this.parseStatement(
            i ? (-1 === i.indexOf("label") ? i + "label" : i) : "label",
          )),
          this.labels.pop(),
          (e.label = r),
          this.finishNode(e, "LabeledStatement")
        );
      }),
      (At.parseExpressionStatement = function (e, t) {
        "use strict";
        return (
          (e.expression = t),
          this.semicolon(),
          this.finishNode(e, "ExpressionStatement")
        );
      }),
      (At.parseBlock = function (e = !0, t = this.startNode(), r) {
        for (
          t.body = [], this.expect(Fe.braceL), e && this.enterScope(0);
          this.type !== Fe.braceR;

        ) {
          var i = this.parseStatement(null);
          t.body.push(i);
        }
        return (
          r && (this.strict = !1),
          this.next(),
          e && this.exitScope(),
          this.finishNode(t, "BlockStatement")
        );
      }),
      (At.parseFor = function (e, t) {
        "use strict";
        return (
          (e.init = t),
          this.expect(Fe.semi),
          (e.test = this.type === Fe.semi ? null : this.parseExpression()),
          this.expect(Fe.semi),
          (e.update = this.type === Fe.parenR ? null : this.parseExpression()),
          this.expect(Fe.parenR),
          (e.body = this.parseStatement("for")),
          this.exitScope(),
          this.labels.pop(),
          this.finishNode(e, "ForStatement")
        );
      }),
      (At.parseForIn = function (e, t) {
        "use strict";
        var r = this.type === Fe._in;
        return (
          this.next(),
          "VariableDeclaration" === t.type &&
            null != t.declarations[0].init &&
            (!r ||
              this.options.ecmaVersion < 8 ||
              this.strict ||
              "var" !== t.kind ||
              "Identifier" !== t.declarations[0].id.type) &&
            this.raise(
              t.start,
              (r ? "for-in" : "for-of") +
                " loop variable declaration may not have an initializer",
            ),
          (e.left = t),
          (e.right = r ? this.parseExpression() : this.parseMaybeAssign()),
          this.expect(Fe.parenR),
          (e.body = this.parseStatement("for")),
          this.exitScope(),
          this.labels.pop(),
          this.finishNode(e, r ? "ForInStatement" : "ForOfStatement")
        );
      }),
      (At.parseVar = function (e, t, r) {
        "use strict";
        for (e.declarations = [], e.kind = r; ; ) {
          var i = this.startNode();
          if (
            (this.parseVarId(i, r),
            this.eat(Fe.eq)
              ? (i.init = this.parseMaybeAssign(t))
              : "const" !== r ||
                  this.type === Fe._in ||
                  (this.options.ecmaVersion >= 6 && this.isContextual("of"))
                ? "Identifier" === i.id.type ||
                  (t && (this.type === Fe._in || this.isContextual("of")))
                  ? (i.init = null)
                  : this.raise(
                      this.lastTokEnd,
                      "Complex binding patterns require an initialization value",
                    )
                : this.unexpected(),
            e.declarations.push(this.finishNode(i, "VariableDeclarator")),
            !this.eat(Fe.comma))
          )
            break;
        }
        return e;
      }),
      (At.parseVarId = function (e, t) {
        "use strict";
        (e.id = this.parseBindingAtom()),
          this.checkLValPattern(e.id, "var" === t ? 1 : 2, !1);
      });
    var Ct = 1,
      Ot = 2;
    function Tt(e, t) {
      "use strict";
      var r = t.key.name,
        i = e[r],
        n = "true";
      return (
        "MethodDefinition" !== t.type ||
          ("get" !== t.kind && "set" !== t.kind) ||
          (n = (t.static ? "s" : "i") + t.kind),
        ("iget" === i && "iset" === n) ||
        ("iset" === i && "iget" === n) ||
        ("sget" === i && "sset" === n) ||
        ("sset" === i && "sget" === n)
          ? ((e[r] = "true"), !1)
          : !!i || ((e[r] = n), !1)
      );
    }
    function Lt(e, t) {
      "use strict";
      var r = e.computed,
        i = e.key;
      return (
        !r &&
        (("Identifier" === i.type && i.name === t) ||
          ("Literal" === i.type && i.value === t))
      );
    }
    (At.parseFunction = function (e, t, r, i) {
      "use strict";
      this.initFunction(e),
        (this.options.ecmaVersion >= 9 ||
          (this.options.ecmaVersion >= 6 && !i)) &&
          (this.type === Fe.star && t & Ot && this.unexpected(),
          (e.generator = this.eat(Fe.star))),
        this.options.ecmaVersion >= 8 && (e.async = !!i),
        t & Ct &&
          ((e.id = 4 & t && this.type !== Fe.name ? null : this.parseIdent()),
          !e.id ||
            t & Ot ||
            this.checkLValSimple(
              e.id,
              this.strict || e.generator || e.async
                ? this.treatFunctionsAsVar
                  ? 1
                  : 2
                : 3,
            ));
      var n = this.yieldPos,
        s = this.awaitPos,
        a = this.awaitIdentPos;
      return (
        (this.yieldPos = 0),
        (this.awaitPos = 0),
        (this.awaitIdentPos = 0),
        this.enterScope(ft(e.async, e.generator)),
        t & Ct || (e.id = this.type === Fe.name ? this.parseIdent() : null),
        this.parseFunctionParams(e),
        this.parseFunctionBody(e, r, !1),
        (this.yieldPos = n),
        (this.awaitPos = s),
        (this.awaitIdentPos = a),
        this.finishNode(
          e,
          t & Ct ? "FunctionDeclaration" : "FunctionExpression",
        )
      );
    }),
      (At.parseFunctionParams = function (e) {
        "use strict";
        this.expect(Fe.parenL),
          (e.params = this.parseBindingList(
            Fe.parenR,
            !1,
            this.options.ecmaVersion >= 8,
          )),
          this.checkYieldAwaitInDefaultParams();
      }),
      (At.parseClass = function (e, t) {
        "use strict";
        this.next();
        var r = this.strict;
        (this.strict = !0), this.parseClassId(e, t), this.parseClassSuper(e);
        var i = this.enterClassBody(),
          n = this.startNode(),
          s = !1;
        for (n.body = [], this.expect(Fe.braceL); this.type !== Fe.braceR; ) {
          var a = this.parseClassElement(null !== e.superClass);
          a &&
            (n.body.push(a),
            "MethodDefinition" === a.type && "constructor" === a.kind
              ? (s &&
                  this.raise(
                    a.start,
                    "Duplicate constructor in the same class",
                  ),
                (s = !0))
              : "PrivateIdentifier" === a.key.type &&
                Tt(i, a) &&
                this.raiseRecoverable(
                  a.key.start,
                  `Identifier '#${a.key.name}' has already been declared`,
                ));
        }
        return (
          (this.strict = r),
          this.next(),
          (e.body = this.finishNode(n, "ClassBody")),
          this.exitClassBody(),
          this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression")
        );
      }),
      (At.parseClassElement = function (e) {
        "use strict";
        if (this.eat(Fe.semi)) return null;
        var t = this.options.ecmaVersion,
          r = this.startNode(),
          i = "",
          n = !1,
          s = !1,
          a = "method";
        if (
          ((r.static = !1),
          this.eatContextual("static") &&
            (this.isClassElementNameStart() || this.type === Fe.star
              ? (r.static = !0)
              : (i = "static")),
          !i &&
            t >= 8 &&
            this.eatContextual("async") &&
            ((!this.isClassElementNameStart() && this.type !== Fe.star) ||
            this.canInsertSemicolon()
              ? (i = "async")
              : (s = !0)),
          !i && (t >= 9 || !s) && this.eat(Fe.star) && (n = !0),
          !i && !s && !n)
        ) {
          var o = this.value;
          (this.eatContextual("get") || this.eatContextual("set")) &&
            (this.isClassElementNameStart() ? (a = o) : (i = o));
        }
        if (
          (i
            ? ((r.computed = !1),
              (r.key = this.startNodeAt(
                this.lastTokStart,
                this.lastTokStartLoc,
              )),
              (r.key.name = i),
              this.finishNode(r.key, "Identifier"))
            : this.parseClassElementName(r),
          t < 13 || this.type === Fe.parenL || "method" !== a || n || s)
        ) {
          var u = !r.static && Lt(r, "constructor"),
            l = u && e;
          u &&
            "method" !== a &&
            this.raise(r.key.start, "Constructor can't have get/set modifier"),
            (r.kind = u ? "constructor" : a),
            this.parseClassMethod(r, n, s, l);
        } else this.parseClassField(r);
        return r;
      }),
      (At.isClassElementNameStart = function () {
        "use strict";
        return (
          this.type === Fe.name ||
          this.type === Fe.privateId ||
          this.type === Fe.num ||
          this.type === Fe.string ||
          this.type === Fe.bracketL ||
          this.type.keyword
        );
      }),
      (At.parseClassElementName = function (e) {
        "use strict";
        this.type === Fe.privateId
          ? ("constructor" === this.value &&
              this.raise(
                this.start,
                "Classes can't have an element named '#constructor'",
              ),
            (e.computed = !1),
            (e.key = this.parsePrivateIdent()))
          : this.parsePropertyName(e);
      }),
      (At.parseClassMethod = function (e, t, r, i) {
        "use strict";
        var n = e.key;
        "constructor" === e.kind
          ? (t && this.raise(n.start, "Constructor can't be a generator"),
            r && this.raise(n.start, "Constructor can't be an async method"))
          : e.static &&
            Lt(e, "prototype") &&
            this.raise(
              n.start,
              "Classes may not have a static property named prototype",
            );
        var s = (e.value = this.parseMethod(t, r, i));
        return (
          "get" === e.kind &&
            0 !== s.params.length &&
            this.raiseRecoverable(s.start, "getter should have no params"),
          "set" === e.kind &&
            1 !== s.params.length &&
            this.raiseRecoverable(
              s.start,
              "setter should have exactly one param",
            ),
          "set" === e.kind &&
            "RestElement" === s.params[0].type &&
            this.raiseRecoverable(
              s.params[0].start,
              "Setter cannot use rest params",
            ),
          this.finishNode(e, "MethodDefinition")
        );
      }),
      (At.parseClassField = function (e) {
        "use strict";
        if (
          (Lt(e, "constructor")
            ? this.raise(
                e.key.start,
                "Classes can't have a field named 'constructor'",
              )
            : e.static &&
              Lt(e, "prototype") &&
              this.raise(
                e.key.start,
                "Classes can't have a static field named 'prototype'",
              ),
          this.eat(Fe.eq))
        ) {
          var t = this.currentThisScope(),
            r = t.inClassFieldInit;
          (t.inClassFieldInit = !0),
            (e.value = this.parseMaybeAssign()),
            (t.inClassFieldInit = r);
        } else e.value = null;
        return this.semicolon(), this.finishNode(e, "PropertyDefinition");
      }),
      (At.parseClassId = function (e, t) {
        "use strict";
        this.type === Fe.name
          ? ((e.id = this.parseIdent()), t && this.checkLValSimple(e.id, 2, !1))
          : (!0 === t && this.unexpected(), (e.id = null));
      }),
      (At.parseClassSuper = function (e) {
        "use strict";
        e.superClass = this.eat(Fe._extends)
          ? this.parseExprSubscripts()
          : null;
      }),
      (At.enterClassBody = function () {
        "use strict";
        var e = { declared: Object.create(null), used: [] };
        return this.privateNameStack.push(e), e.declared;
      }),
      (At.exitClassBody = function () {
        "use strict";
        for (
          var e = this.privateNameStack.pop(),
            t = e.declared,
            r = e.used,
            i = this.privateNameStack.length,
            n = 0 === i ? null : this.privateNameStack[i - 1],
            s = 0;
          s < r.length;
          ++s
        ) {
          var a = r[s];
          st(t, a.name) ||
            (n
              ? n.used.push(a)
              : this.raiseRecoverable(
                  a.start,
                  `Private field '#${a.name}' must be declared in an enclosing class`,
                ));
        }
      }),
      (At.parseExport = function (e, t) {
        "use strict";
        if ((this.next(), this.eat(Fe.star)))
          return (
            this.options.ecmaVersion >= 11 &&
              (this.eatContextual("as")
                ? ((e.exported = this.parseIdent(!0)),
                  this.checkExport(t, e.exported.name, this.lastTokStart))
                : (e.exported = null)),
            this.expectContextual("from"),
            this.type !== Fe.string && this.unexpected(),
            (e.source = this.parseExprAtom()),
            this.semicolon(),
            this.finishNode(e, "ExportAllDeclaration")
          );
        if (this.eat(Fe._default)) {
          var r;
          if (
            (this.checkExport(t, "default", this.lastTokStart),
            this.type === Fe._function || (r = this.isAsyncFunction()))
          ) {
            var i = this.startNode();
            this.next(),
              r && this.next(),
              (e.declaration = this.parseFunction(i, 4 | Ct, !1, r));
          } else if (this.type === Fe._class) {
            var n = this.startNode();
            e.declaration = this.parseClass(n, "nullableID");
          } else (e.declaration = this.parseMaybeAssign()), this.semicolon();
          return this.finishNode(e, "ExportDefaultDeclaration");
        }
        if (this.shouldParseExportStatement())
          (e.declaration = this.parseStatement(null)),
            "VariableDeclaration" === e.declaration.type
              ? this.checkVariableExport(t, e.declaration.declarations)
              : this.checkExport(
                  t,
                  e.declaration.id.name,
                  e.declaration.id.start,
                ),
            (e.specifiers = []),
            (e.source = null);
        else {
          if (
            ((e.declaration = null),
            (e.specifiers = this.parseExportSpecifiers(t)),
            this.eatContextual("from"))
          )
            this.type !== Fe.string && this.unexpected(),
              (e.source = this.parseExprAtom());
          else {
            for (
              var s = 0, a = e.specifiers, o = null == a ? 0 : a.length;
              s < o;
              s++
            ) {
              var u = a[s];
              this.checkUnreserved(u.local), this.checkLocalExport(u.local);
            }
            e.source = null;
          }
          this.semicolon();
        }
        return this.finishNode(e, "ExportNamedDeclaration");
      }),
      (At.checkExport = function (e, t, r) {
        "use strict";
        e &&
          (st(e, t) && this.raiseRecoverable(r, "Duplicate export '" + t + "'"),
          (e[t] = !0));
      }),
      (At.checkPatternExport = function (e, t) {
        "use strict";
        var r = t.type;
        if ("Identifier" === r) this.checkExport(e, t.name, t.start);
        else if ("ObjectPattern" === r)
          for (
            var i = 0, n = t.properties, s = null == n ? 0 : n.length;
            i < s;
            i++
          ) {
            var a = n[i];
            this.checkPatternExport(e, a);
          }
        else if ("ArrayPattern" === r)
          for (
            var o = 0, u = t.elements, l = null == u ? 0 : u.length;
            o < l;
            o++
          ) {
            var c = u[o];
            c && this.checkPatternExport(e, c);
          }
        else
          "Property" === r
            ? this.checkPatternExport(e, t.value)
            : "AssignmentPattern" === r
              ? this.checkPatternExport(e, t.left)
              : "RestElement" === r
                ? this.checkPatternExport(e, t.argument)
                : "ParenthesizedExpression" === r &&
                  this.checkPatternExport(e, t.expression);
      }),
      (At.checkVariableExport = function (e, t) {
        "use strict";
        if (e)
          for (var r = 0, i = null == t ? 0 : t.length; r < i; r++) {
            var n = t[r];
            this.checkPatternExport(e, n.id);
          }
      }),
      (At.shouldParseExportStatement = function () {
        "use strict";
        return (
          "var" === this.type.keyword ||
          "const" === this.type.keyword ||
          "class" === this.type.keyword ||
          "function" === this.type.keyword ||
          this.isLet() ||
          this.isAsyncFunction()
        );
      }),
      (At.parseExportSpecifiers = function (e) {
        "use strict";
        var t = [],
          r = !0;
        for (this.expect(Fe.braceL); !this.eat(Fe.braceR); ) {
          if (r) r = !1;
          else if ((this.expect(Fe.comma), this.afterTrailingComma(Fe.braceR)))
            break;
          var i = this.startNode();
          (i.local = this.parseIdent(!0)),
            (i.exported = this.eatContextual("as")
              ? this.parseIdent(!0)
              : i.local),
            this.checkExport(e, i.exported.name, i.exported.start),
            t.push(this.finishNode(i, "ExportSpecifier"));
        }
        return t;
      }),
      (At.parseImport = function (e) {
        "use strict";
        return (
          this.next(),
          this.type === Fe.string
            ? ((e.specifiers = kt), (e.source = this.parseExprAtom()))
            : ((e.specifiers = this.parseImportSpecifiers()),
              this.expectContextual("from"),
              (e.source =
                this.type === Fe.string
                  ? this.parseExprAtom()
                  : this.unexpected())),
          this.semicolon(),
          this.finishNode(e, "ImportDeclaration")
        );
      }),
      (At.parseImportSpecifiers = function () {
        "use strict";
        var e = [],
          t = !0;
        if (this.type === Fe.name) {
          var r = this.startNode();
          if (
            ((r.local = this.parseIdent()),
            this.checkLValSimple(r.local, 2),
            e.push(this.finishNode(r, "ImportDefaultSpecifier")),
            !this.eat(Fe.comma))
          )
            return e;
        }
        if (this.type === Fe.star) {
          var i = this.startNode();
          return (
            this.next(),
            this.expectContextual("as"),
            (i.local = this.parseIdent()),
            this.checkLValSimple(i.local, 2),
            e.push(this.finishNode(i, "ImportNamespaceSpecifier")),
            e
          );
        }
        for (this.expect(Fe.braceL); !this.eat(Fe.braceR); ) {
          if (t) t = !1;
          else if ((this.expect(Fe.comma), this.afterTrailingComma(Fe.braceR)))
            break;
          var n = this.startNode();
          (n.imported = this.parseIdent(!0)),
            this.eatContextual("as")
              ? (n.local = this.parseIdent())
              : (this.checkUnreserved(n.imported), (n.local = n.imported)),
            this.checkLValSimple(n.local, 2),
            e.push(this.finishNode(n, "ImportSpecifier"));
        }
        return e;
      }),
      (At.adaptDirectivePrologue = function (e) {
        "use strict";
        for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
          e[t].directive = e[t].expression.raw.slice(1, -1);
      }),
      (At.isDirectiveCandidate = function (e) {
        "use strict";
        return (
          "ExpressionStatement" === e.type &&
          "Literal" === e.expression.type &&
          "string" == typeof e.expression.value &&
          ('"' === this.input[e.start] || "'" === this.input[e.start])
        );
      });
    class Mt {
      constructor(e, t, r, i, n) {
        (this.token = e),
          (this.isExpr = !!t),
          (this.preserveSpace = !!r),
          (this.override = i),
          (this.generator = !!n);
      }
    }
    var Dt = {
        b_stat: new Mt("{", !1),
        b_expr: new Mt("{", !0),
        b_tmpl: new Mt("${", !1),
        p_stat: new Mt("(", !1),
        p_expr: new Mt("(", !0),
        q_tmpl: new Mt("`", !0, !0, function (e) {
          return e.tryReadTemplateToken();
        }),
        f_stat: new Mt("function", !1),
        f_expr: new Mt("function", !0),
        f_expr_gen: new Mt("function", !0, !1, null, !0),
        f_gen: new Mt("function", !1, !1, null, !0),
      },
      Ft = dt.prototype;
    (Ft.initialContext = function () {
      "use strict";
      return [Dt.b_stat];
    }),
      (Ft.braceIsBlock = function (e) {
        "use strict";
        var t = this.curContext();
        return (
          t === Dt.f_expr ||
          t === Dt.f_stat ||
          (e !== Fe.colon || (t !== Dt.b_stat && t !== Dt.b_expr)
            ? e === Fe._return || (e === Fe.name && this.exprAllowed)
              ? Ye.test(this.input.slice(this.lastTokEnd, this.start))
              : e === Fe._else ||
                e === Fe.semi ||
                e === Fe.eof ||
                e === Fe.parenR ||
                e === Fe.arrow ||
                (e === Fe.braceL
                  ? t === Dt.b_stat
                  : e !== Fe._var &&
                    e !== Fe._const &&
                    e !== Fe.name &&
                    !this.exprAllowed)
            : !t.isExpr)
        );
      }),
      (Ft.inGeneratorContext = function () {
        "use strict";
        for (var e = this.context.length - 1; e >= 1; e--) {
          var t = this.context[e];
          if ("function" === t.token) return t.generator;
        }
        return !1;
      }),
      (Ft.updateContext = function (e) {
        "use strict";
        var t,
          r = this.type;
        r.keyword && e === Fe.dot
          ? (this.exprAllowed = !1)
          : (t = r.updateContext)
            ? t.call(this, e)
            : (this.exprAllowed = r.beforeExpr);
      }),
      (Fe.parenR.updateContext = Fe.braceR.updateContext =
        function () {
          "use strict";
          if (1 !== this.context.length) {
            var e = this.context.pop();
            e === Dt.b_stat &&
              "function" === this.curContext().token &&
              (e = this.context.pop()),
              (this.exprAllowed = !e.isExpr);
          } else this.exprAllowed = !0;
        }),
      (Fe.braceL.updateContext = function (e) {
        "use strict";
        this.context.push(this.braceIsBlock(e) ? Dt.b_stat : Dt.b_expr),
          (this.exprAllowed = !0);
      }),
      (Fe.dollarBraceL.updateContext = function () {
        "use strict";
        this.context.push(Dt.b_tmpl), (this.exprAllowed = !0);
      }),
      (Fe.parenL.updateContext = function (e) {
        "use strict";
        var t =
          e === Fe._if || e === Fe._for || e === Fe._with || e === Fe._while;
        this.context.push(t ? Dt.p_stat : Dt.p_expr), (this.exprAllowed = !0);
      }),
      (Fe.incDec.updateContext = function () {}),
      (Fe._function.updateContext = Fe._class.updateContext =
        function (e) {
          "use strict";
          !e.beforeExpr ||
          e === Fe._else ||
          (e === Fe.semi && this.curContext() !== Dt.p_stat) ||
          (e === Fe._return &&
            Ye.test(this.input.slice(this.lastTokEnd, this.start))) ||
          ((e === Fe.colon || e === Fe.braceL) &&
            this.curContext() === Dt.b_stat)
            ? this.context.push(Dt.f_stat)
            : this.context.push(Dt.f_expr),
            (this.exprAllowed = !1);
        }),
      (Fe.backQuote.updateContext = function () {
        "use strict";
        this.curContext() === Dt.q_tmpl
          ? this.context.pop()
          : this.context.push(Dt.q_tmpl),
          (this.exprAllowed = !1);
      }),
      (Fe.star.updateContext = function (e) {
        "use strict";
        if (e === Fe._function) {
          var t = this.context.length - 1;
          this.context[t] =
            this.context[t] === Dt.f_expr ? Dt.f_expr_gen : Dt.f_gen;
        }
        this.exprAllowed = !0;
      }),
      (Fe.name.updateContext = function (e) {
        "use strict";
        var t = !1;
        this.options.ecmaVersion >= 6 &&
          e !== Fe.dot &&
          (("of" === this.value && !this.exprAllowed) ||
            ("yield" === this.value && this.inGeneratorContext())) &&
          (t = !0),
          (this.exprAllowed = t);
      });
    class jt {
      reset() {}
    }
    class Vt {
      constructor(e) {
        (this.type = e.type),
          (this.value = e.value),
          (this.start = e.start),
          (this.end = e.end),
          e.options.locations && (this.loc = new lt(e, e.startLoc, e.endLoc)),
          e.options.ranges && (this.range = [e.start, e.end]);
      }
    }
    var Gt = dt.prototype;
    function $t(e) {
      "use strict";
      return "function" != typeof BigInt ? null : BigInt(e.replace(/_/g, ""));
    }
    function Bt(e) {
      "use strict";
      return e <= 65535
        ? String.fromCharCode(e)
        : ((e -= 65536),
          String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)));
    }
    (Gt.next = function (e) {
      "use strict";
      !e &&
        this.type.keyword &&
        this.containsEsc &&
        this.raiseRecoverable(
          this.start,
          "Escape sequence in keyword " + this.type.keyword,
        ),
        this.options.onToken && this.options.onToken(new Vt(this)),
        (this.lastTokEnd = this.end),
        (this.lastTokStart = this.start),
        (this.lastTokEndLoc = this.endLoc),
        (this.lastTokStartLoc = this.startLoc),
        this.nextToken();
    }),
      (Gt.getToken = function () {
        "use strict";
        return this.next(), new Vt(this);
      }),
      "undefined" != typeof Symbol &&
        (Gt[Symbol.iterator] = function () {
          "use strict";
          var e = this;
          return {
            next: function () {
              var t = e.getToken();
              return { done: t.type === Fe.eof, value: t };
            },
          };
        }),
      (Gt.curContext = function () {
        "use strict";
        return this.context[this.context.length - 1];
      }),
      (Gt.nextToken = function () {
        "use strict";
        var e = this.curContext();
        return (
          (e && e.preserveSpace) || this.skipSpace(),
          (this.start = this.pos),
          this.options.locations && (this.startLoc = this.curPosition()),
          this.pos >= this.input.length
            ? this.finishToken(Fe.eof)
            : e.override
              ? e.override(this)
              : void this.readToken(this.fullCharCodeAtPos())
        );
      }),
      (Gt.readToken = function (e) {
        "use strict";
        return Xe(e, this.options.ecmaVersion >= 6) || 92 === e
          ? this.readWord()
          : this.getTokenFromCode(e);
      }),
      (Gt.fullCharCodeAtPos = function () {
        "use strict";
        var e = this.input.charCodeAt(this.pos);
        if (e <= 55295 || e >= 56320) return e;
        var t = this.input.charCodeAt(this.pos + 1);
        return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
      }),
      (Gt.skipBlockComment = function () {
        "use strict";
        var e,
          t = this.options.onComment && this.curPosition(),
          r = this.pos,
          i = this.input.indexOf("*/", (this.pos += 2));
        if (
          (-1 === i && this.raise(this.pos - 2, "Unterminated comment"),
          (this.pos = i + 2),
          this.options.locations)
        )
          for (
            Qe.lastIndex = r;
            (e = Qe.exec(this.input)) && e.index < this.pos;

          )
            ++this.curLine, (this.lineStart = e.index + e[0].length);
        this.options.onComment &&
          this.options.onComment(
            !0,
            this.input.slice(r + 2, i),
            r,
            this.pos,
            t,
            this.curPosition(),
          );
      }),
      (Gt.skipLineComment = function (e) {
        "use strict";
        for (
          var t = this.pos,
            r = this.options.onComment && this.curPosition(),
            i = this.input.charCodeAt((this.pos += e));
          this.pos < this.input.length && !Ze(i);

        )
          i = this.input.charCodeAt(++this.pos);
        this.options.onComment &&
          this.options.onComment(
            !1,
            this.input.slice(t + e, this.pos),
            t,
            this.pos,
            r,
            this.curPosition(),
          );
      }),
      (Gt.skipSpace = function () {
        "use strict";
        e: for (; this.pos < this.input.length; ) {
          var e = this.input.charCodeAt(this.pos);
          switch (e) {
            case 32:
            case 160:
              ++this.pos;
              break;
            case 13:
              10 === this.input.charCodeAt(this.pos + 1) && ++this.pos;
            case 10:
            case 8232:
            case 8233:
              ++this.pos,
                this.options.locations &&
                  (++this.curLine, (this.lineStart = this.pos));
              break;
            case 47:
              switch (this.input.charCodeAt(this.pos + 1)) {
                case 42:
                  this.skipBlockComment();
                  break;
                case 47:
                  this.skipLineComment(2);
                  break;
                default:
                  break e;
              }
              break;
            default:
              if (
                !(
                  (e > 8 && e < 14) ||
                  (e >= 5760 && et.test(String.fromCharCode(e)))
                )
              )
                break e;
              ++this.pos;
          }
        }
      }),
      (Gt.finishToken = function (e, t) {
        "use strict";
        (this.end = this.pos),
          this.options.locations && (this.endLoc = this.curPosition());
        var r = this.type;
        (this.type = e), (this.value = t), this.updateContext(r);
      }),
      (Gt.readToken_dot = function () {
        "use strict";
        var e = this.input.charCodeAt(this.pos + 1);
        if (e >= 48 && e <= 57) return this.readNumber(!0);
        var t = this.input.charCodeAt(this.pos + 2);
        return this.options.ecmaVersion >= 6 && 46 === e && 46 === t
          ? ((this.pos += 3), this.finishToken(Fe.ellipsis))
          : (++this.pos, this.finishToken(Fe.dot));
      }),
      (Gt.readToken_slash = function () {
        "use strict";
        var e = this.input.charCodeAt(this.pos + 1);
        return this.exprAllowed
          ? (++this.pos, this.readRegexp())
          : 61 === e
            ? this.finishOp(Fe.assign, 2)
            : this.finishOp(Fe.slash, 1);
      }),
      (Gt.readToken_mult_modulo_exp = function (e) {
        "use strict";
        var t = this.input.charCodeAt(this.pos + 1),
          r = 1,
          i = 42 === e ? Fe.star : Fe.modulo;
        return (
          this.options.ecmaVersion >= 7 &&
            42 === e &&
            42 === t &&
            (++r, (i = Fe.starstar), (t = this.input.charCodeAt(this.pos + 2))),
          61 === t ? this.finishOp(Fe.assign, r + 1) : this.finishOp(i, r)
        );
      }),
      (Gt.readToken_pipe_amp = function (e) {
        "use strict";
        var t = this.input.charCodeAt(this.pos + 1);
        if (t === e) {
          if (this.options.ecmaVersion >= 12) {
            var r = this.input.charCodeAt(this.pos + 2);
            if (61 === r) return this.finishOp(Fe.assign, 3);
          }
          return this.finishOp(124 === e ? Fe.logicalOR : Fe.logicalAND, 2);
        }
        return 61 === t
          ? this.finishOp(Fe.assign, 2)
          : this.finishOp(124 === e ? Fe.bitwiseOR : Fe.bitwiseAND, 1);
      }),
      (Gt.readToken_caret = function () {
        "use strict";
        var e = this.input.charCodeAt(this.pos + 1);
        return 61 === e
          ? this.finishOp(Fe.assign, 2)
          : this.finishOp(Fe.bitwiseXOR, 1);
      }),
      (Gt.readToken_plus_min = function (e) {
        "use strict";
        var t = this.input.charCodeAt(this.pos + 1);
        return t === e
          ? 45 !== t ||
            this.inModule ||
            62 !== this.input.charCodeAt(this.pos + 2) ||
            (0 !== this.lastTokEnd &&
              !Ye.test(this.input.slice(this.lastTokEnd, this.pos)))
            ? this.finishOp(Fe.incDec, 2)
            : (this.skipLineComment(3), this.skipSpace(), this.nextToken())
          : 61 === t
            ? this.finishOp(Fe.assign, 2)
            : this.finishOp(Fe.plusMin, 1);
      }),
      (Gt.readToken_lt_gt = function (e) {
        "use strict";
        var t = this.input.charCodeAt(this.pos + 1),
          r = 1;
        return t === e
          ? ((r =
              62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2),
            61 === this.input.charCodeAt(this.pos + r)
              ? this.finishOp(Fe.assign, r + 1)
              : this.finishOp(Fe.bitShift, r))
          : 33 !== t ||
              60 !== e ||
              this.inModule ||
              45 !== this.input.charCodeAt(this.pos + 2) ||
              45 !== this.input.charCodeAt(this.pos + 3)
            ? (61 === t && (r = 2), this.finishOp(Fe.relational, r))
            : (this.skipLineComment(4), this.skipSpace(), this.nextToken());
      }),
      (Gt.readToken_eq_excl = function (e) {
        "use strict";
        var t = this.input.charCodeAt(this.pos + 1);
        return 61 === t
          ? this.finishOp(
              Fe.equality,
              61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2,
            )
          : 61 === e && 62 === t && this.options.ecmaVersion >= 6
            ? ((this.pos += 2), this.finishToken(Fe.arrow))
            : this.finishOp(61 === e ? Fe.eq : Fe.prefix, 1);
      }),
      (Gt.readToken_question = function () {
        "use strict";
        var e = this.options.ecmaVersion;
        if (e >= 11) {
          var t = this.input.charCodeAt(this.pos + 1);
          if (46 === t) {
            var r = this.input.charCodeAt(this.pos + 2);
            if (r < 48 || r > 57) return this.finishOp(Fe.questionDot, 2);
          }
          if (63 === t) {
            if (e >= 12) {
              var i = this.input.charCodeAt(this.pos + 2);
              if (61 === i) return this.finishOp(Fe.assign, 3);
            }
            return this.finishOp(Fe.coalesce, 2);
          }
        }
        return this.finishOp(Fe.question, 1);
      }),
      (Gt.readToken_numberSign = function () {
        "use strict";
        var e = this.options.ecmaVersion,
          t = 35;
        if (
          e >= 13 &&
          (++this.pos, (t = this.fullCharCodeAtPos()), Xe(t, !0) || 92 === t)
        )
          return this.finishToken(Fe.privateId, this.readWord1());
        this.raise(this.pos, "Unexpected character '" + Bt(t) + "'");
      }),
      (Gt.getTokenFromCode = function (e) {
        "use strict";
        switch (e) {
          case 46:
            return this.readToken_dot();
          case 40:
            return ++this.pos, this.finishToken(Fe.parenL);
          case 41:
            return ++this.pos, this.finishToken(Fe.parenR);
          case 59:
            return ++this.pos, this.finishToken(Fe.semi);
          case 44:
            return ++this.pos, this.finishToken(Fe.comma);
          case 91:
            return ++this.pos, this.finishToken(Fe.bracketL);
          case 93:
            return ++this.pos, this.finishToken(Fe.bracketR);
          case 123:
            return ++this.pos, this.finishToken(Fe.braceL);
          case 125:
            return ++this.pos, this.finishToken(Fe.braceR);
          case 58:
            return ++this.pos, this.finishToken(Fe.colon);
          case 96:
            if (this.options.ecmaVersion < 6) break;
            return ++this.pos, this.finishToken(Fe.backQuote);
          case 48:
            var t = this.input.charCodeAt(this.pos + 1);
            if (120 === t || 88 === t) return this.readRadixNumber(16);
            if (this.options.ecmaVersion >= 6) {
              if (111 === t || 79 === t) return this.readRadixNumber(8);
              if (98 === t || 66 === t) return this.readRadixNumber(2);
            }
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            return this.readNumber(!1);
          case 34:
          case 39:
            return this.readString(e);
          case 47:
            return this.readToken_slash();
          case 37:
          case 42:
            return this.readToken_mult_modulo_exp(e);
          case 124:
          case 38:
            return this.readToken_pipe_amp(e);
          case 94:
            return this.readToken_caret();
          case 43:
          case 45:
            return this.readToken_plus_min(e);
          case 60:
          case 62:
            return this.readToken_lt_gt(e);
          case 61:
          case 33:
            return this.readToken_eq_excl(e);
          case 63:
            return this.readToken_question();
          case 126:
            return this.finishOp(Fe.prefix, 1);
          case 35:
            return this.readToken_numberSign();
        }
        this.raise(this.pos, "Unexpected character '" + Bt(e) + "'");
      }),
      (Gt.finishOp = function (e, t) {
        "use strict";
        var r = this.input.slice(this.pos, this.pos + t);
        return (this.pos += t), this.finishToken(e, r);
      }),
      (Gt.readRegexp = function () {
        "use strict";
        for (var e, t, r = this.pos; ; ) {
          this.pos >= this.input.length &&
            this.raise(r, "Unterminated regular expression");
          var i = this.input.charAt(this.pos);
          if (
            (Ye.test(i) && this.raise(r, "Unterminated regular expression"), e)
          )
            e = !1;
          else {
            if ("[" === i) t = !0;
            else if ("]" === i && t) t = !1;
            else if ("/" === i && !t) break;
            e = "\\" === i;
          }
          ++this.pos;
        }
        var n = this.input.slice(r, this.pos);
        ++this.pos;
        var s = this.pos,
          a = this.readWord1();
        this.containsEsc && this.unexpected(s);
        var o = this.regexpState || (this.regexpState = new jt(this));
        o.reset(r, n, a),
          this.validateRegExpFlags(o),
          this.validateRegExpPattern(o);
        var u = null;
        try {
          u = RegExp(n, a);
        } catch (e) {}
        return this.finishToken(Fe.regexp, { pattern: n, flags: a, value: u });
      }),
      (Gt.readInt = function (e, t, r) {
        "use strict";
        for (
          var i = this.options.ecmaVersion >= 12 && void 0 === t,
            n = r && 48 === this.input.charCodeAt(this.pos),
            s = this.pos,
            a = 0,
            o = 0,
            u = 0,
            l = null == t ? 1 / 0 : t;
          u < l;
          ++u, ++this.pos
        ) {
          var c = this.input.charCodeAt(this.pos),
            p = void 0;
          if (i && 95 === c)
            n &&
              this.raiseRecoverable(
                this.pos,
                "Numeric separator is not allowed in legacy octal numeric literals",
              ),
              95 === o &&
                this.raiseRecoverable(
                  this.pos,
                  "Numeric separator must be exactly one underscore",
                ),
              0 === u &&
                this.raiseRecoverable(
                  this.pos,
                  "Numeric separator is not allowed at the first of digits",
                ),
              (o = c);
          else {
            if (
              ((p =
                c >= 97
                  ? c - 97 + 10
                  : c >= 65
                    ? c - 65 + 10
                    : c >= 48 && c <= 57
                      ? c - 48
                      : 1 / 0),
              p >= e)
            )
              break;
            (o = c), (a = a * e + p);
          }
        }
        return (
          i &&
            95 === o &&
            this.raiseRecoverable(
              this.pos - 1,
              "Numeric separator is not allowed at the last of digits",
            ),
          this.pos === s || (null != t && this.pos - s !== t) ? null : a
        );
      }),
      (Gt.readRadixNumber = function (e) {
        "use strict";
        var t = this.pos;
        this.pos += 2;
        var r = this.readInt(e);
        return (
          null == r &&
            this.raise(this.start + 2, "Expected number in radix " + e),
          this.options.ecmaVersion >= 11 &&
          110 === this.input.charCodeAt(this.pos)
            ? ((r = $t(this.input.slice(t, this.pos))), ++this.pos)
            : Xe(this.fullCharCodeAtPos()) &&
              this.raise(this.pos, "Identifier directly after number"),
          this.finishToken(Fe.num, r)
        );
      }),
      (Gt.readNumber = function (e) {
        "use strict";
        var t = this.pos;
        e ||
          null !== this.readInt(10, void 0, !0) ||
          this.raise(t, "Invalid number");
        var r = this.pos - t >= 2 && 48 === this.input.charCodeAt(t);
        r && this.strict && this.raise(t, "Invalid number");
        var i = this.input.charCodeAt(this.pos);
        if (!r && !e && this.options.ecmaVersion >= 11 && 110 === i) {
          var n = $t(this.input.slice(t, this.pos));
          return (
            ++this.pos,
            Xe(this.fullCharCodeAtPos()) &&
              this.raise(this.pos, "Identifier directly after number"),
            this.finishToken(Fe.num, n)
          );
        }
        r && /[89]/.test(this.input.slice(t, this.pos)) && (r = !1),
          46 !== i ||
            r ||
            (++this.pos,
            this.readInt(10),
            (i = this.input.charCodeAt(this.pos))),
          (69 !== i && 101 !== i) ||
            r ||
            ((i = this.input.charCodeAt(++this.pos)),
            (43 !== i && 45 !== i) || ++this.pos,
            null === this.readInt(10) && this.raise(t, "Invalid number")),
          Xe(this.fullCharCodeAtPos()) &&
            this.raise(this.pos, "Identifier directly after number");
        var s,
          a,
          o =
            ((s = this.input.slice(t, this.pos)),
            (a = r),
            a ? parseInt(s, 8) : parseFloat(s.replace(/_/g, "")));
        return this.finishToken(Fe.num, o);
      }),
      (Gt.readCodePoint = function () {
        "use strict";
        var e,
          t = this.input.charCodeAt(this.pos);
        if (123 === t) {
          this.options.ecmaVersion < 6 && this.unexpected();
          var r = ++this.pos;
          (e = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos)),
            ++this.pos,
            e > 1114111 &&
              this.invalidStringToken(r, "Code point out of bounds");
        } else e = this.readHexChar(4);
        return e;
      }),
      (Gt.readString = function (e) {
        "use strict";
        for (var t = "", r = ++this.pos; ; ) {
          this.pos >= this.input.length &&
            this.raise(this.start, "Unterminated string constant");
          var i = this.input.charCodeAt(this.pos);
          if (i === e) break;
          92 === i
            ? ((t += this.input.slice(r, this.pos)),
              (t += this.readEscapedChar(!1)),
              (r = this.pos))
            : (Ze(i, this.options.ecmaVersion >= 10) &&
                this.raise(this.start, "Unterminated string constant"),
              ++this.pos);
        }
        return (
          (t += this.input.slice(r, this.pos++)), this.finishToken(Fe.string, t)
        );
      });
    var Ut = {};
    (Gt.tryReadTemplateToken = function () {
      "use strict";
      this.inTemplateElement = !0;
      try {
        this.readTmplToken();
      } catch (e) {
        if (e !== Ut) throw e;
        this.readInvalidTemplateToken();
      }
      this.inTemplateElement = !1;
    }),
      (Gt.invalidStringToken = function (e, t) {
        "use strict";
        if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw Ut;
        this.raise(e, t);
      }),
      (Gt.readTmplToken = function () {
        "use strict";
        for (var e = "", t = this.pos; ; ) {
          this.pos >= this.input.length &&
            this.raise(this.start, "Unterminated template");
          var r = this.input.charCodeAt(this.pos);
          if (
            96 === r ||
            (36 === r && 123 === this.input.charCodeAt(this.pos + 1))
          )
            return this.pos !== this.start ||
              (this.type !== Fe.template && this.type !== Fe.invalidTemplate)
              ? ((e += this.input.slice(t, this.pos)),
                this.finishToken(Fe.template, e))
              : 36 === r
                ? ((this.pos += 2), this.finishToken(Fe.dollarBraceL))
                : (++this.pos, this.finishToken(Fe.backQuote));
          if (92 === r)
            (e += this.input.slice(t, this.pos)),
              (e += this.readEscapedChar(!0)),
              (t = this.pos);
          else if (Ze(r)) {
            switch (((e += this.input.slice(t, this.pos)), ++this.pos, r)) {
              case 13:
                10 === this.input.charCodeAt(this.pos) && ++this.pos;
              case 10:
                e += "\n";
                break;
              default:
                e += String.fromCharCode(r);
            }
            this.options.locations &&
              (++this.curLine, (this.lineStart = this.pos)),
              (t = this.pos);
          } else ++this.pos;
        }
      }),
      (Gt.readInvalidTemplateToken = function () {
        "use strict";
        for (; this.pos < this.input.length; this.pos++)
          switch (this.input[this.pos]) {
            case "\\":
              ++this.pos;
              break;
            case "$":
              if ("{" !== this.input[this.pos + 1]) break;
            case "`":
              return this.finishToken(
                Fe.invalidTemplate,
                this.input.slice(this.start, this.pos),
              );
          }
        this.raise(this.start, "Unterminated template");
      }),
      (Gt.readEscapedChar = function (e) {
        "use strict";
        var t = this.input.charCodeAt(++this.pos);
        switch ((++this.pos, t)) {
          case 110:
            return "\n";
          case 114:
            return "\r";
          case 120:
            return String.fromCharCode(this.readHexChar(2));
          case 117:
            return Bt(this.readCodePoint());
          case 116:
            return "\t";
          case 98:
            return "\b";
          case 118:
            return "\v";
          case 102:
            return "\f";
          case 13:
            10 === this.input.charCodeAt(this.pos) && ++this.pos;
          case 10:
            return (
              this.options.locations &&
                ((this.lineStart = this.pos), ++this.curLine),
              ""
            );
          case 56:
          case 57:
            if (
              (this.strict &&
                this.invalidStringToken(
                  this.pos - 1,
                  "Invalid escape sequence",
                ),
              e)
            ) {
              var r = this.pos - 1;
              return (
                this.invalidStringToken(
                  r,
                  "Invalid escape sequence in template string",
                ),
                null
              );
            }
          default:
            if (t >= 48 && t <= 55) {
              var i = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
                n = parseInt(i, 8);
              return (
                n > 255 && ((i = i.slice(0, -1)), (n = parseInt(i, 8))),
                (this.pos += i.length - 1),
                (t = this.input.charCodeAt(this.pos)),
                ("0" === i && 56 !== t && 57 !== t) ||
                  (!this.strict && !e) ||
                  this.invalidStringToken(
                    this.pos - 1 - i.length,
                    e
                      ? "Octal literal in template string"
                      : "Octal literal in strict mode",
                  ),
                String.fromCharCode(n)
              );
            }
            return Ze(t) ? "" : String.fromCharCode(t);
        }
      }),
      (Gt.readHexChar = function (e) {
        "use strict";
        var t = this.pos,
          r = this.readInt(16, e);
        return (
          null === r &&
            this.invalidStringToken(t, "Bad character escape sequence"),
          r
        );
      }),
      (Gt.readWord1 = function () {
        "use strict";
        this.containsEsc = !1;
        for (
          var e = "", t = !0, r = this.pos, i = this.options.ecmaVersion >= 6;
          this.pos < this.input.length;

        ) {
          var n = this.fullCharCodeAtPos();
          if (Je(n, i)) this.pos += n <= 65535 ? 1 : 2;
          else {
            if (92 !== n) break;
            (this.containsEsc = !0), (e += this.input.slice(r, this.pos));
            var s = this.pos;
            117 !== this.input.charCodeAt(++this.pos) &&
              this.invalidStringToken(
                this.pos,
                "Expecting Unicode escape sequence \\uXXXX",
              ),
              ++this.pos;
            var a = this.readCodePoint();
            (t ? Xe : Je)(a, i) ||
              this.invalidStringToken(s, "Invalid Unicode escape"),
              (e += Bt(a)),
              (r = this.pos);
          }
          t = !1;
        }
        return e + this.input.slice(r, this.pos);
      }),
      (Gt.readWord = function () {
        "use strict";
        var e = this.readWord1(),
          t = Fe.name;
        return this.keywords.test(e) && (t = Me[e]), this.finishToken(t, e);
      });
    for (
      var qt = /^(?:'((?:\\.|[^'])*?)'|"((?:\\.|[^"])*?)"|;)/,
        Wt = {
          Parser: dt,
          createWordsRegExp: ot,
          getLineInfo: ct,
          isIdentifierChar: Je,
          isIdentifierStart: Xe,
          lineBreakRegExp: Ye,
          literalRegExp: qt,
          reservedWords: je,
          skipWhiteSpaceRegExp: tt,
          tokTypes: Fe,
        },
        zt = S.inited
          ? S.module.utilWrap
          : (S.module.utilWrap = (function () {
              "use strict";
              return function (e, t) {
                return function (...r) {
                  return Reflect.apply(t, this, [e, r]);
                };
              };
            })()),
        Ht = S.inited
          ? S.module.acornParserBigInt
          : (S.module.acornParserBigInt = (function () {
              "use strict";
              var e = {
                enable: (e) => (
                  (e.readNumber = zt(e.readNumber, r)),
                  (e.readRadixNumber = zt(e.readRadixNumber, i)),
                  e
                ),
              };
              function t(e, t) {
                var r = e.pos;
                return (
                  "number" == typeof t ? (e.pos += 2) : (t = 10),
                  null !== e.readInt(t) && 110 === e.input.charCodeAt(e.pos)
                    ? (++e.pos, e.finishToken(Fe.num, null))
                    : ((e.pos = r), null)
                );
              }
              function r(e, r) {
                var i = r[0];
                if (!i) {
                  var n = t(this);
                  if (null !== n) return n;
                }
                return Reflect.apply(e, this, r);
              }
              function i(e, r) {
                var i = r[0],
                  n = t(this, i);
                return null === n ? Reflect.apply(e, this, r) : n;
              }
              return e;
            })()),
        Kt = S.inited
          ? S.module.parseBranch
          : (S.module.parseBranch = (function () {
              "use strict";
              var e;
              return function (t) {
                return (
                  (void 0 !== e && e !== t) ||
                    (e = pr.create("", {
                      allowAwaitOutsideFunction: !0,
                      allowReturnOutsideFunction: !0,
                      ecmaVersion: 12,
                    })),
                  (e.awaitIdentPos = t.awaitIdentPos),
                  (e.awaitPos = t.awaitPos),
                  (e.containsEsc = t.containsEsc),
                  (e.curLine = t.curLine),
                  (e.end = t.end),
                  (e.exprAllowed = t.exprAllowed),
                  (e.inModule = t.inModule),
                  (e.input = t.input),
                  (e.inTemplateElement = t.inTemplateElement),
                  (e.lastTokEnd = t.lastTokEnd),
                  (e.lastTokStart = t.lastTokStart),
                  (e.lineStart = t.lineStart),
                  (e.pos = t.pos),
                  (e.potentialArrowAt = t.potentialArrowAt),
                  (e.sourceFile = t.sourceFile),
                  (e.start = t.start),
                  (e.strict = t.strict),
                  (e.type = t.type),
                  (e.value = t.value),
                  (e.yieldPos = t.yieldPos),
                  e
                );
              };
            })()),
        Xt = S.inited
          ? S.module.acornParserClassFields
          : (S.module.acornParserClassFields = (function () {
              "use strict";
              var e = {
                enable: (e) => (
                  (e.getTokenFromCode = zt(e.getTokenFromCode, t)),
                  (e.parseClassElement = zt(e.parseClassElement, r)),
                  e
                ),
              };
              function t(e, t) {
                var r = t[0];
                return 35 !== r
                  ? Reflect.apply(e, this, t)
                  : (++this.pos, this.finishToken(Fe.name, this.readWord1()));
              }
              function r(e, t) {
                var r = this.type;
                if (r !== Fe.bracketL && r !== Fe.name)
                  return Reflect.apply(e, this, t);
                var i = Kt(this),
                  n = this.startNode();
                i.parsePropertyName(n);
                var s = i.type;
                if (s === Fe.parenL) return Reflect.apply(e, this, t);
                if (s !== Fe.braceR && s !== Fe.eq && s !== Fe.semi) {
                  if (
                    this.isContextual("async") ||
                    this.isContextual("get") ||
                    this.isContextual("set")
                  )
                    return Reflect.apply(e, this, t);
                  if (this.isContextual("static")) {
                    if (s !== Fe.bracketL && s !== Fe.name)
                      return Reflect.apply(e, this, t);
                    var a = Kt(i);
                    a.parsePropertyName(n);
                    var o = a.type;
                    if (o === Fe.parenL) return Reflect.apply(e, this, t);
                    if (
                      o !== Fe.braceR &&
                      o !== Fe.eq &&
                      o !== Fe.semi &&
                      (i.isContextual("async") ||
                        i.isContextual("get") ||
                        i.isContextual("set"))
                    )
                      return Reflect.apply(e, this, t);
                  }
                }
                var u = this.startNode();
                return (
                  (u.static =
                    s !== Fe.braceR &&
                    s !== Fe.eq &&
                    this.eatContextual("static")),
                  this.parsePropertyName(u),
                  (u.value = this.eat(Fe.eq) ? this.parseExpression() : null),
                  this.finishNode(u, "FieldDefinition"),
                  this.semicolon(),
                  u
                );
              }
              return e;
            })()),
        Jt = S.inited
          ? S.module.parseErrors
          : (S.module.parseErrors = (function () {
              "use strict";
              function e(e) {
                class t extends e {
                  constructor(e, t, r) {
                    super(r);
                    var i = ct(e.input, t),
                      n = i.column,
                      s = i.line;
                    (this.column = n),
                      (this.inModule = e.inModule),
                      (this.line = s);
                  }
                }
                return (
                  Reflect.defineProperty(t, "name", {
                    configurable: !0,
                    value: e.name,
                  }),
                  t
                );
              }
              return {
                ReferenceError: e(ReferenceError),
                SyntaxError: e(SyntaxError),
              };
            })()),
        Yt = S.inited
          ? S.module.acornParserErrorMessages
          : (S.module.acornParserErrorMessages = (function () {
              "use strict";
              var e = new Set([
                  "await is only valid in async function",
                  "HTML comments are not allowed in modules",
                  "Cannot use 'import.meta' outside a module",
                  "new.target expression is not allowed here",
                  "Illegal return statement",
                  "Keyword must not contain escaped characters",
                  "Invalid or unexpected token",
                  "Unexpected end of input",
                  "Unexpected eval or arguments in strict mode",
                  "Unexpected identifier",
                  "Unexpected reserved word",
                  "Unexpected strict mode reserved word",
                  "Unexpected string",
                  "Unexpected token",
                  "missing ) after argument list",
                  "Unterminated template literal",
                ]),
                t = new Map([
                  ["'return' outside of function", "Illegal return statement"],
                  [
                    "Binding arguments in strict mode",
                    "Unexpected eval or arguments in strict mode",
                  ],
                  ["Binding await in strict mode", "Unexpected reserved word"],
                  [
                    "Cannot use keyword 'await' outside an async function",
                    "await is only valid in async function",
                  ],
                  [
                    "The keyword 'await' is reserved",
                    "Unexpected reserved word",
                  ],
                  [
                    "The keyword 'yield' is reserved",
                    "Unexpected strict mode reserved word",
                  ],
                  [
                    "Unterminated string constant",
                    "Invalid or unexpected token",
                  ],
                  ["Unterminated template", "Unterminated template literal"],
                  [
                    "'new.target' can only be used in functions",
                    "new.target expression is not allowed here",
                  ],
                ]),
                r = {
                  enable: (e) => (
                    (e.parseExprList = i),
                    (e.raise = n),
                    (e.raiseRecoverable = n),
                    (e.unexpected = s),
                    e
                  ),
                };
              function i(e, t, r, i) {
                for (var n = [], s = !0; !this.eat(e); ) {
                  if (s) s = !1;
                  else if (
                    (r || e !== Fe.parenR
                      ? this.expect(Fe.comma)
                      : this.eat(Fe.comma) ||
                        this.raise(this.start, "missing ) after argument list"),
                    t && this.afterTrailingComma(e))
                  )
                    break;
                  var a = void 0;
                  r && this.type === Fe.comma
                    ? (a = null)
                    : this.type === Fe.ellipsis
                      ? ((a = this.parseSpread(i)),
                        i &&
                          this.type === Fe.comma &&
                          -1 === i.trailingComma &&
                          (i.trailingComma = this.start))
                      : (a = this.parseMaybeAssign(!1, i)),
                    n.push(a);
                }
                return n;
              }
              function n(r, i) {
                if (t.has(i)) i = t.get(i);
                else if (
                  "'import' and 'export' may only appear at the top level" ===
                    i ||
                  "'import' and 'export' may appear only with 'sourceType: module'" ===
                    i
                )
                  i = "Unexpected token " + this.type.label;
                else if (i.startsWith("Duplicate export '"))
                  i = i.replace("Duplicate export '", "Duplicate export of '");
                else if (i.startsWith("Escape sequence in keyword "))
                  i = "Keyword must not contain escaped characters";
                else if (!e.has(i) && !i.startsWith("Unexpected token")) return;
                throw new Jt.SyntaxError(this, r, i);
              }
              function s(e) {
                void 0 === e && (e = this.start);
                var t =
                  this.type === Fe.eof
                    ? "Unexpected end of input"
                    : "Invalid or unexpected token";
                this.raise(e, t);
              }
              return r;
            })()),
        Qt = S.inited
          ? S.module.parseLookahead
          : (S.module.parseLookahead = (function () {
              "use strict";
              return function (e) {
                var t = Kt(e);
                return t.next(), t;
              };
            })()),
        Zt = S.inited
          ? S.module.acornParserFirstAwaitOutSideFunction
          : (S.module.acornParserFirstAwaitOutSideFunction = (function () {
              "use strict";
              var e = {
                enable: (e) => (
                  (e.firstAwaitOutsideFunction = null),
                  (e.parseAwait = zt(e.parseAwait, t)),
                  (e.parseForStatement = zt(e.parseForStatement, r)),
                  e
                ),
              };
              function t(e, t) {
                return (
                  this.inAsync ||
                    this.inFunction ||
                    null !== this.firstAwaitOutsideFunction ||
                    (this.firstAwaitOutsideFunction = ct(
                      this.input,
                      this.start,
                    )),
                  Reflect.apply(e, this, t)
                );
              }
              function r(e, t) {
                if (
                  this.inAsync ||
                  this.inFunction ||
                  null !== this.firstAwaitOutsideFunction
                )
                  return Reflect.apply(e, this, t);
                var r = t[0],
                  i = Qt(this),
                  n = i.start,
                  s = Reflect.apply(e, this, t);
                return (
                  r.await &&
                    null === this.firstAwaitOutsideFunction &&
                    (this.firstAwaitOutsideFunction = ct(this.input, n)),
                  s
                );
              }
              return e;
            })()),
        er = S.inited
          ? S.module.acornParserFirstReturnOutSideFunction
          : (S.module.acornParserFirstReturnOutSideFunction = (function () {
              "use strict";
              var e = {
                enable: (e) => (
                  (e.firstReturnOutsideFunction = null),
                  (e.parseReturnStatement = zt(e.parseReturnStatement, t)),
                  e
                ),
              };
              function t(e, t) {
                return (
                  this.inFunction ||
                    null !== this.firstReturnOutsideFunction ||
                    (this.firstReturnOutsideFunction = ct(
                      this.input,
                      this.start,
                    )),
                  Reflect.apply(e, this, t)
                );
              }
              return e;
            })()),
        tr = S.inited
          ? S.module.acornParserFunctionParamsStart
          : (S.module.acornParserFunctionParamsStart = (function () {
              "use strict";
              var e = {
                enable: (e) => (
                  (e.parseFunctionParams = zt(e.parseFunctionParams, t)), e
                ),
              };
              function t(e, t) {
                var r = t[0];
                return (
                  (r.functionParamsStart = this.start),
                  Reflect.apply(e, this, t)
                );
              }
              return e;
            })()),
        rr = S.inited
          ? S.module.acornParserHTMLComment
          : (S.module.acornParserHTMLComment = (function () {
              "use strict";
              var e = Wt.lineBreakRegExp,
                t = {
                  enable: (e) => (
                    (e.readToken_lt_gt = zt(e.readToken_lt_gt, r)),
                    (e.readToken_plus_min = zt(e.readToken_plus_min, i)),
                    e
                  ),
                };
              function r(e, t) {
                if (this.inModule) {
                  var r = t[0],
                    i = this.input,
                    n = this.pos,
                    s = i.charCodeAt(n + 1);
                  60 === r &&
                    33 === s &&
                    45 === i.charCodeAt(n + 2) &&
                    45 === i.charCodeAt(n + 3) &&
                    this.raise(n, "HTML comments are not allowed in modules");
                }
                return Reflect.apply(e, this, t);
              }
              function i(t, r) {
                if (this.inModule) {
                  var i = r[0],
                    n = this.input,
                    s = this.lastTokEnd,
                    a = this.pos,
                    o = n.charCodeAt(a + 1);
                  o !== i ||
                    45 !== o ||
                    62 !== n.charCodeAt(a + 2) ||
                    (0 !== s && !e.test(n.slice(s, a))) ||
                    this.raise(a, "HTML comments are not allowed in modules");
                }
                return Reflect.apply(t, this, r);
              }
              return t;
            })()),
        ir = S.inited
          ? S.module.acornParserImport
          : (S.module.acornParserImport = (function () {
              "use strict";
              var e = {
                enable: (e) => (
                  (Fe._import.startsExpr = !0),
                  (e.checkLVal = zt(e.checkLVal, t)),
                  (e.parseExport = zt(e.parseExport, r)),
                  (e.parseExprAtom = zt(e.parseExprAtom, i)),
                  (e.parseNew = zt(e.parseNew, n)),
                  (e.parseStatement = zt(e.parseStatement, a)),
                  (e.parseSubscript = zt(e.parseSubscript, s)),
                  e
                ),
              };
              function t(e, t) {
                var r = t[0],
                  i = r.type,
                  n = r.start;
                if ("CallExpression" === i && "Import" === r.callee.type)
                  throw new Jt.SyntaxError(
                    this,
                    n,
                    "Invalid left-hand side in assignment",
                  );
                if (
                  "MetaProperty" === i &&
                  "import" === r.meta.name &&
                  "meta" === r.property.name
                )
                  throw new Jt.SyntaxError(
                    this,
                    n,
                    "'import.meta' is not a valid assignment target",
                  );
                return Reflect.apply(e, this, t);
              }
              function r(e, t) {
                if (Qt(this).type !== Fe.star) return Reflect.apply(e, this, t);
                var r = t[0],
                  i = t[1];
                this.next();
                var n = this.start,
                  s = this.startLoc;
                this.next();
                var a = "ExportAllDeclaration";
                if (this.eatContextual("as")) {
                  var o = this.parseIdent(!0);
                  this.checkExport(i, o.name, o.start);
                  var u = this.startNodeAt(n, s);
                  (a = "ExportNamedDeclaration"),
                    (u.exported = o),
                    (r.declaration = null),
                    (r.specifiers = [
                      this.finishNode(u, "ExportNamespaceSpecifier"),
                    ]);
                }
                return (
                  this.expectContextual("from"),
                  this.type !== Fe.string && this.unexpected(),
                  (r.source = this.parseExprAtom()),
                  this.semicolon(),
                  this.finishNode(r, a)
                );
              }
              function i(e, t) {
                if (this.type === Fe._import) {
                  var r = Qt(this),
                    i = r.type;
                  if (i === Fe.dot)
                    return (function (e) {
                      var t = e.startNode(),
                        r = e.parseIdent(!0);
                      (t.meta = r), e.expect(Fe.dot);
                      var i = e.containsEsc,
                        n = e.parseIdent(!0);
                      return (
                        (t.property = n),
                        "meta" !== n.name
                          ? e.raise(n.start, "Unexpected identifier")
                          : i
                            ? e.raise(
                                n.start,
                                "Keyword must not contain escaped characters",
                              )
                            : e.inModule ||
                              e.raise(
                                r.start,
                                "Cannot use 'import.meta' outside a module",
                              ),
                        e.finishNode(t, "MetaProperty")
                      );
                    })(this);
                  if (i === Fe.parenL)
                    return (function (e) {
                      var t = e.startNode();
                      return e.expect(Fe._import), e.finishNode(t, "Import");
                    })(this);
                  this.unexpected();
                }
                var n = Reflect.apply(e, this, t),
                  s = n.type;
                return (
                  (s !== Fe._false && s !== Fe._null && s !== Fe._true) ||
                    (n.raw = ""),
                  n
                );
              }
              function n(e, t) {
                var r = Qt(this);
                return (
                  r.type === Fe._import &&
                    Qt(r).type === Fe.parenL &&
                    this.unexpected(),
                  Reflect.apply(e, this, t)
                );
              }
              function s(e, t) {
                var r = t[0],
                  i = t[1],
                  n = t[2];
                if ("Import" === r.type && this.type === Fe.parenL) {
                  var s = this.startNodeAt(i, n);
                  this.expect(Fe.parenL),
                    (s.arguments = [this.parseMaybeAssign()]),
                    (s.callee = r),
                    this.expect(Fe.parenR),
                    this.finishNode(s, "CallExpression"),
                    (t[0] = s);
                }
                return Reflect.apply(e, this, t);
              }
              function a(e, t) {
                var r = t[1];
                if (this.type === Fe._import) {
                  var i,
                    n = Qt(this),
                    s = n.start,
                    a = n.type;
                  if (a === Fe.dot || a === Fe.parenL) {
                    var o = this.startNode(),
                      u = this.parseMaybeAssign();
                    return this.parseExpressionStatement(o, u);
                  }
                  (this.inModule &&
                    (r || this.options.allowImportExportEverywhere)) ||
                    ((i =
                      a === Fe.name
                        ? "Unexpected identifier"
                        : a === Fe.string
                          ? "Unexpected string"
                          : "Unexpected token " + a.label),
                    this.raise(s, i));
                }
                return Reflect.apply(e, this, t);
              }
              return e;
            })()),
        nr = S.inited
          ? S.module.acornParserNumericSeparator
          : (S.module.acornParserNumericSeparator = (function () {
              "use strict";
              var e = { enable: (e) => ((e.readInt = t), e) };
              function t(e, t) {
                for (
                  var r = this.pos,
                    i = "number" == typeof t,
                    n = i ? t : 1 / 0,
                    s = -1,
                    a = 0;
                  ++s < n;

                ) {
                  var o = this.input.charCodeAt(this.pos);
                  if (95 !== o) {
                    var u = 1 / 0;
                    if (
                      (o >= 97
                        ? (u = o - 97 + 10)
                        : o >= 65
                          ? (u = o - 65 + 10)
                          : o >= 48 && o <= 57 && (u = o - 48),
                      u >= e)
                    )
                      break;
                    ++this.pos, (a = a * e + u);
                  } else ++this.pos;
                }
                var l = this.pos;
                return l === r || (i && l - r !== t) ? null : a;
              }
              return e;
            })()),
        sr = S.inited
          ? S.module.acornParserLiteral
          : (S.module.acornParserLiteral = (function () {
              "use strict";
              var e = {
                enable: (e) => (
                  (e.parseLiteral = t), (e.parseTemplateElement = r), e
                ),
              };
              function t(e) {
                var t = this.startNode();
                return (
                  (t.raw = ""),
                  (t.value = e),
                  this.next(),
                  this.finishNode(t, "Literal")
                );
              }
              function r() {
                var e = this.startNode();
                return (
                  (e.value = { cooked: "", raw: "" }),
                  this.next(),
                  (e.tail = this.type === Fe.backQuote),
                  this.finishNode(e, "TemplateElement")
                );
              }
              return e;
            })()),
        ar = S.inited
          ? S.module.utilAlwaysFalse
          : (S.module.utilAlwaysFalse = (function () {
              "use strict";
              return function () {
                return !1;
              };
            })()),
        or = S.inited
          ? S.module.acornParserTolerance
          : (S.module.acornParserTolerance = (function () {
              "use strict";
              var e = new Map(),
                t = {
                  enable: (e) => (
                    (e.isDirectiveCandidate = ar),
                    (e.strictDirective = ar),
                    (e.isSimpleParamList = Ne),
                    (e.adaptDirectivePrologue = M),
                    (e.checkLocalExport = M),
                    (e.checkParams = M),
                    (e.checkPatternErrors = M),
                    (e.checkPatternExport = M),
                    (e.checkPropClash = M),
                    (e.checkVariableExport = M),
                    (e.checkYieldAwaitInDefaultParams = M),
                    (e.declareName = M),
                    (e.invalidStringToken = M),
                    (e.validateRegExpFlags = M),
                    (e.validateRegExpPattern = M),
                    (e.checkExpressionErrors = r),
                    (e.enterScope = i),
                    e
                  ),
                };
              function r(e) {
                return !!e && -1 !== e.shorthandAssign;
              }
              function i(t) {
                this.scopeStack.push(
                  (function (t) {
                    var r = e.get(t);
                    return (
                      void 0 === r &&
                        ((r = {
                          flags: t,
                          functions: [],
                          lexical: [],
                          var: [],
                        }),
                        e.set(t, r)),
                      r
                    );
                  })(t),
                );
              }
              return t;
            })()),
        ur = S.inited
          ? S.module.parseGetIdentifiersFromPattern
          : (S.module.parseGetIdentifiersFromPattern = (function () {
              "use strict";
              return function (e) {
                for (var t = [], r = [e], i = -1; ++i < r.length; ) {
                  var n = r[i];
                  if (null !== n)
                    switch (n.type) {
                      case "Identifier":
                        t.push(n);
                        break;
                      case "Property":
                      case "ObjectProperty":
                        r.push(n.value);
                        break;
                      case "AssignmentPattern":
                        r.push(n.left);
                        break;
                      case "ObjectPattern":
                        r.push(...n.properties);
                        break;
                      case "ArrayPattern":
                        r.push(...n.elements);
                        break;
                      case "RestElement":
                        r.push(n.argument);
                    }
                }
                return t;
              };
            })()),
        lr = S.inited
          ? S.module.acornParserTopLevel
          : (S.module.acornParserTopLevel = (function () {
              "use strict";
              var e = { enable: (e) => ((e.parseTopLevel = t), e) };
              function t(e) {
                Array.isArray(e.body) || (e.body = []);
                for (
                  var t = e.body,
                    i = {},
                    n = new Set(),
                    s = new Set(),
                    a = new Set(),
                    o = this.inModule,
                    u = {
                      firstAwaitOutsideFunction: null,
                      firstReturnOutsideFunction: null,
                      identifiers: s,
                      importedBindings: a,
                      insertIndex: e.start,
                      insertPrefix: "",
                    },
                    l = !1;
                  this.type !== Fe.eof;

                ) {
                  var c = this.parseStatement(null, !0, i),
                    p = c.expression,
                    h = c.type;
                  l ||
                    ("ExpressionStatement" === h &&
                    "Literal" === p.type &&
                    "string" == typeof p.value
                      ? ((u.insertIndex = c.end), (u.insertPrefix = ";"))
                      : (l = !0));
                  var f = c;
                  if (
                    (("ExportDefaultDeclaration" !== h &&
                      "ExportNamedDeclaration" !== h) ||
                      ((f = c.declaration), null !== f && (h = f.type)),
                    "VariableDeclaration" === h)
                  )
                    for (
                      var d = 0,
                        m = f.declarations,
                        v = null == m ? 0 : m.length;
                      d < v;
                      d++
                    )
                      for (
                        var g = m[d],
                          y = ur(g.id),
                          x = 0,
                          b = null == y ? 0 : y.length;
                        x < b;
                        x++
                      ) {
                        var E = y[x],
                          w = E.name;
                        o && n.has(w) && r(this, E.start, w), s.add(w);
                      }
                  else if ("ClassDeclaration" === h) {
                    var R = f,
                      S = R.id;
                    null !== S && s.add(S.name);
                  } else if ("FunctionDeclaration" === h) {
                    var I = f,
                      P = I.id;
                    if (null !== P) {
                      var A = P.name;
                      o && s.has(A) && r(this, P.start, A), n.add(A), s.add(A);
                    }
                  } else if ("ImportDeclaration" === h)
                    for (
                      var N = 0, _ = f.specifiers, k = null == _ ? 0 : _.length;
                      N < k;
                      N++
                    ) {
                      var C = _[N].local,
                        O = C.name;
                      a.has(O) && r(this, C.start, O), a.add(O), s.add(O);
                    }
                  t.push(c);
                }
                return (
                  this.next(),
                  (u.firstAwaitOutsideFunction =
                    this.firstAwaitOutsideFunction),
                  (u.firstReturnOutsideFunction =
                    this.firstReturnOutsideFunction),
                  (e.top = u),
                  this.finishNode(e, "Program")
                );
              }
              function r(e, t, r) {
                throw new Jt.SyntaxError(
                  e,
                  t,
                  "Identifier '" + r + "' has already been declared",
                );
              }
              return e;
            })()),
        cr = S.inited
          ? S.module.utilDefaults
          : (S.module.utilDefaults = (function () {
              "use strict";
              return function (e) {
                for (var t = arguments.length, r = 0; ++r < t; ) {
                  var i = arguments[r];
                  for (var n in i)
                    !L(i, n) || (void 0 !== e[n] && L(e, n)) || (e[n] = i[n]);
                }
                return e;
              };
            })()),
        pr = S.inited
          ? S.module.Parser
          : (S.module.Parser = (function () {
              "use strict";
              var e = ot(je[6]),
                t = new Map([
                  [2, "module"],
                  [1, "script"],
                ]),
                r = {
                  create: function (t, i) {
                    i = r.createOptions(i);
                    var n = i,
                      s = n.strict,
                      a = new dt(i, t);
                    return (
                      Ht.enable(a),
                      Xt.enable(a),
                      Yt.enable(a),
                      Zt.enable(a),
                      er.enable(a),
                      tr.enable(a),
                      rr.enable(a),
                      ir.enable(a),
                      nr.enable(a),
                      sr.enable(a),
                      or.enable(a),
                      lr.enable(a),
                      void 0 !== s &&
                        ((a.strict = !!s), a.strict || (a.reservedWords = e)),
                      a
                    );
                  },
                  createOptions: function (e) {
                    var i = cr({}, e, r.defaultOptions),
                      n = i.sourceType,
                      s = t.get(n);
                    return void 0 !== s && (n = s), (i.sourceType = n), i;
                  },
                  defaultOptions: {
                    allowAwaitOutsideFunction: !0,
                    allowReturnOutsideFunction: !1,
                    ecmaVersion: 12,
                    sourceType: "module",
                    strict: void 0,
                  },
                  parse(e, t) {
                    var i = r.create(e, t),
                      n = i.parse();
                    return (n.inModule = i.inModule), (n.strict = i.strict), n;
                  },
                };
              return r;
            })()),
        hr = S.inited
          ? S.module.utilAscendingComparator
          : (S.module.utilAscendingComparator = (function () {
              "use strict";
              return function (e, t) {
                return e > t ? 1 : e < t ? -1 : 0;
              };
            })()),
        fr = S.inited
          ? S.module.Visitor
          : (S.module.Visitor = (function () {
              "use strict";
              var e = new Map(),
                t = new Set([
                  "alternate",
                  "argument",
                  "arguments",
                  "block",
                  "body",
                  "callee",
                  "cases",
                  "consequent",
                  "declaration",
                  "declarations",
                  "discriminant",
                  "elements",
                  "expression",
                  "expressions",
                  "finalizer",
                  "handler",
                  "init",
                  "key",
                  "left",
                  "object",
                  "properties",
                  "right",
                  "superClass",
                  "test",
                  "update",
                  "value",
                ]);
              class r {
                visit(e, t) {
                  this.reset(t);
                  var r = this.possibleIndexes;
                  Array.isArray(r) &&
                    0 !== r.length &&
                    ((this.possibleEnd = r.length),
                    (this.possibleStart = 0),
                    this.visitWithoutReset(e));
                }
                visitWithoutReset(e) {
                  var t = e.getValue();
                  if (V(t))
                    if (Array.isArray(t)) e.each(this, "visitWithoutReset");
                    else {
                      var r = "visit" + t.type;
                      "function" == typeof this[r]
                        ? this[r](e)
                        : this.visitChildren(e);
                    }
                }
                visitChildren(r) {
                  var i = r.getValue(),
                    n = i.end,
                    s = i.start,
                    a = this.possibleIndexes,
                    o = this.possibleStart,
                    u = this.possibleEnd,
                    l = o,
                    c = u;
                  if ("number" == typeof s && "number" == typeof n) {
                    for (; l < c && a[l] < s; ) l += 1;
                    for (; l < c && a[c - 1] > n; ) c -= 1;
                  }
                  if (l < c) {
                    (this.possibleStart = l), (this.possibleEnd = c);
                    for (
                      var p = (function (r) {
                          var i = e.get(r);
                          if (void 0 !== i) return i;
                          i = [];
                          for (
                            var n = T(r),
                              s = "Property" !== r.type || !r.computed,
                              a = 0,
                              o = null == n ? 0 : n.length;
                            a < o;
                            a++
                          ) {
                            var u = n[a];
                            (s && "key" === u) ||
                              (t.has(u) && V(r[u]) && i.push(u));
                          }
                          return e.set(r, i), i;
                        })(i),
                        h = 0,
                        f = null == p ? 0 : p.length;
                      h < f;
                      h++
                    ) {
                      var d = p[h];
                      r.call(this, "visitWithoutReset", d);
                    }
                    (this.possibleStart = o), (this.possibleEnd = u);
                  }
                }
              }
              return U(r.prototype, null), r;
            })()),
        dr = S.inited
          ? S.module.parseGetNamesFromPattern
          : (S.module.parseGetNamesFromPattern = (function () {
              "use strict";
              return function (e) {
                for (
                  var t = ur(e), r = [], i = 0, n = null == t ? 0 : t.length;
                  i < n;
                  i++
                ) {
                  var s = t[i].name;
                  r.push(s);
                }
                return r;
              };
            })()),
        mr = S.inited
          ? S.module.parseGetShadowed
          : (S.module.parseGetShadowed = (function () {
              "use strict";
              return function (e, t, r) {
                var i = "arguments" === t,
                  n = null;
                return (
                  e.getParentNode(function (s) {
                    var a = s.type;
                    if ("WithStatement" === a) {
                      var o = e.getValue();
                      return (n = s.object === o ? null : s), null !== n;
                    }
                    var u = r.get(s);
                    void 0 === u && ((u = new Map()), r.set(s, u));
                    var l = u.get(t);
                    if (void 0 !== l) return (n = l), null !== n;
                    var c = "FunctionExpression" === a,
                      p = c || "FunctionDeclaration" === a;
                    if (i && p) return (n = s), u.set(t, n), !0;
                    if ("BlockStatement" === a)
                      for (
                        var h = 0, f = s.body, d = null == f ? 0 : f.length;
                        h < d;
                        h++
                      ) {
                        var m = f[h];
                        if ("VariableDeclaration" === m.type)
                          for (
                            var v = 0,
                              g = m.declarations,
                              y = null == g ? 0 : g.length;
                            v < y;
                            v++
                          )
                            for (
                              var x = g[v],
                                b = dr(x.id),
                                E = 0,
                                w = null == b ? 0 : b.length;
                              E < w;
                              E++
                            ) {
                              var R = b[E];
                              if (R === t) return (n = x), u.set(t, n), !0;
                            }
                      }
                    if ("CatchClause" === a) {
                      var S = s.param;
                      if (null !== S && S.name === t)
                        return (n = S), u.set(t, n), !0;
                    }
                    if (c) {
                      var I = s.id;
                      if (null !== I && I.name === t)
                        return (n = s), u.set(t, n), !0;
                    }
                    if (p || "ArrowFunctionExpression" === a)
                      for (
                        var P = 0, A = s.params, N = null == A ? 0 : A.length;
                        P < N;
                        P++
                      ) {
                        var _ = A[P],
                          k = dr(_),
                          C = k[0];
                        if (C === t) return (n = _), u.set(t, n), !0;
                      }
                    u.set(t, null);
                  }),
                  n
                );
              };
            })()),
        vr = S.inited
          ? S.module.parseIsShadowed
          : (S.module.parseIsShadowed = (function () {
              "use strict";
              return function (e, t, r) {
                return null !== mr(e, t, r);
              };
            })()),
        gr = S.inited
          ? S.module.parseIsOutsideFunction
          : (S.module.parseIsOutsideFunction = (function () {
              "use strict";
              return function (e, t, r) {
                var i = !1;
                return (
                  e.getParentNode(function (e) {
                    var n = e.type,
                      s = r.get(e);
                    void 0 === s && ((s = new Map()), r.set(e, s));
                    var a = s.get(t);
                    return void 0 !== a
                      ? (i = a)
                      : "Program" === n
                        ? ((i = !0), s.set(t, i), !0)
                        : (s.set(t, !1),
                          "ArrowFunctionExpression" === n ||
                            "FunctionDeclaration" === n ||
                            "FunctionExpression" === n ||
                            void 0);
                  }),
                  i
                );
              };
            })()),
        yr = S.inited
          ? S.module.parsePad
          : (S.module.parsePad = (function () {
              "use strict";
              return function (e, t, r, i) {
                for (
                  var n = e.slice(r, i),
                    s = n.split("\n"),
                    a = t.split("\n"),
                    o = a.length - 1,
                    u = s.length,
                    l = o - 1;
                  ++l < u;

                ) {
                  var c = s[l],
                    p = c.charCodeAt(c.length - 1);
                  l > o && (a[l] = ""), 13 === p && (a[l] += "\r");
                }
                return a.join("\n");
              };
            })()),
        xr = S.inited
          ? S.module.parseOverwrite
          : (S.module.parseOverwrite = (function () {
              "use strict";
              return function (e, t, r, i) {
                var n = e.magicString,
                  s = yr(n.original, i, t, r);
                return n.overwrite(t, r, s);
              };
            })()),
        br = S.inited
          ? S.module.visitorAssignment
          : (S.module.visitorAssignment = (function () {
              "use strict";
              var e = new Map(),
                t = new Map();
              function r(r, i, n) {
                var s = r.assignableBindings,
                  a = r.importedBindings,
                  o = r.magicString,
                  u = r.runtimeName,
                  l = i.getValue(),
                  c = l[n],
                  p = dr(c),
                  h = l.end,
                  f = l.start;
                if (r.transformImportBindingAssignments)
                  for (var d = 0, m = null == p ? 0 : p.length; d < m; d++) {
                    var v = p[d];
                    if (a.has(v) && !vr(i, v, t)) {
                      var g = o.original,
                        y = l.right,
                        x =
                          u +
                          ".b(" +
                          JSON.stringify(g.slice(c.start, c.end)) +
                          ',"' +
                          l.operator +
                          '"';
                      void 0 !== y && (x += "," + g.slice(y.start, y.end)),
                        (x += ")"),
                        xr(r, f, h, x);
                      break;
                    }
                  }
                var b = r.transformInsideFunctions,
                  E = r.transformOutsideFunctions;
                if (b || E)
                  for (
                    var w = b && E, R = 0, S = null == p ? 0 : p.length;
                    R < S;
                    R++
                  ) {
                    var I = p[R];
                    if (
                      s.has(I) &&
                      !vr(i, I, t) &&
                      (w || (b && !gr(i, I, e)) || (E && gr(i, I, e)))
                    ) {
                      o.prependLeft(f, u + ".u(").prependRight(h, ")");
                      break;
                    }
                  }
              }
              return new (class extends fr {
                reset(e) {
                  (this.assignableBindings = null),
                    (this.importedBindings = null),
                    (this.magicString = null),
                    (this.possibleIndexes = null),
                    (this.runtimeName = null),
                    (this.transformImportBindingAssignments = !1),
                    (this.transformInsideFunctions = !1),
                    (this.transformOutsideFunctions = !1),
                    void 0 !== e &&
                      ((this.assignableBindings = e.assignableBindings),
                      (this.importedBindings = e.importedBindings),
                      (this.magicString = e.magicString),
                      (this.possibleIndexes = e.possibleIndexes),
                      (this.runtimeName = e.runtimeName),
                      (this.transformImportBindingAssignments =
                        e.transformImportBindingAssignments),
                      (this.transformInsideFunctions =
                        e.transformInsideFunctions),
                      (this.transformOutsideFunctions =
                        e.transformOutsideFunctions));
                }
                visitAssignmentExpression(e) {
                  r(this, e, "left"),
                    e.call(this, "visitWithoutReset", "right");
                }
                visitUpdateExpression(e) {
                  r(this, e, "argument");
                }
              })();
            })()),
        Er = S.inited
          ? S.module.parseIsBindingIdentifier
          : (S.module.parseIsBindingIdentifier = (function () {
              "use strict";
              return function (e, t) {
                if ("Identifier" !== e.type) return !1;
                if (void 0 === t) return !0;
                var r = t.type;
                return "Property" === r
                  ? t.computed || t.shorthand
                  : (("AssignmentExpression" !== r &&
                      "AssignmentPattern" !== r) ||
                      t.left !== e) &&
                      ("UpdateExpression" !== r || t.argument !== e) &&
                      "BreakStatement" !== r &&
                      "ContinueStatement" !== r &&
                      "ImportDefaultSpecifier" !== r &&
                      "ImportNamespaceSpecifier" !== r &&
                      "ImportSpecifier" !== r &&
                      "LabeledStatement" !== r;
              };
            })()),
        wr = S.inited
          ? S.module.visitorEval
          : (S.module.visitorEval = (function () {
              "use strict";
              var e = new Map();
              return new (class extends fr {
                reset(e) {
                  (this.magicString = null),
                    (this.possibleIndexes = null),
                    (this.runtimeName = null),
                    (this.strict = !1),
                    (this.transforms = 0),
                    (this.transformUpdateBindings = !1),
                    void 0 !== e &&
                      ((this.magicString = e.magicString),
                      (this.possibleIndexes = e.possibleIndexes),
                      (this.runtimeName = e.runtimeName),
                      (this.strict = e.strict),
                      (this.transformUpdateBindings =
                        e.transformUpdateBindings));
                }
                visitCallExpression(e) {
                  var t = e.getValue(),
                    r = t.callee;
                  if ("eval" === r.name) {
                    if (0 !== t.arguments.length) {
                      this.transforms |= 8;
                      var i = t.end,
                        n = this.magicString,
                        s = this.runtimeName,
                        a = this.strict
                          ? s + ".c"
                          : "(eval===" + s + ".v?" + s + ".c:" + s + ".k)";
                      n.prependLeft(r.end, "(" + a).prependRight(i, ")"),
                        this.transformUpdateBindings &&
                          n
                            .prependLeft(t.start, s + ".u(")
                            .prependRight(i, ")"),
                        e.call(this, "visitWithoutReset", "arguments");
                    }
                  } else this.visitChildren(e);
                }
                visitIdentifier(t) {
                  var r = t.getValue();
                  if ("eval" === r.name) {
                    var i = t.getParentNode(),
                      n = i.type;
                    if (
                      ("UnaryExpression" !== n || "typeof" !== i.operator) &&
                      Er(r, i) &&
                      !vr(t, "eval", e)
                    ) {
                      this.transforms |= 8;
                      var s = r.end,
                        a = r.start,
                        o = this.runtimeName,
                        u = this.strict
                          ? o + ".e"
                          : "(eval===" + o + ".v?" + o + ".e:eval)";
                      "Property" === n && i.shorthand
                        ? this.magicString.prependLeft(s, ":" + u)
                        : xr(this, a, s, u);
                    }
                  }
                }
              })();
            })()),
        Rr = S.inited
          ? S.module.utilEscapeRegExp
          : (S.module.utilEscapeRegExp = (function () {
              "use strict";
              var e = /[\\^$.*+?()[\]{}|]/g;
              return function (t) {
                return "string" == typeof t ? t.replace(e, "\\$&") : "";
              };
            })()),
        Sr = S.inited
          ? S.module.parseFindIndexes
          : (S.module.parseFindIndexes = (function () {
              "use strict";
              return function (e, t) {
                var r = [],
                  i = t.length;
                if (0 === i) return r;
                for (
                  var n,
                    s = i - 1,
                    a = RegExp(
                      "\\b(?:" +
                        (function () {
                          for (var e = -1, r = ""; ++e < i; )
                            r += Rr(t[e]) + (e === s ? "" : "|");
                          return r;
                        })() +
                        ")\\b",
                      "g",
                    );
                  null !== (n = a.exec(e));

                ) {
                  var o = n,
                    u = o.index;
                  (0 !== u && 46 === e.charCodeAt(u - 1)) || r.push(u);
                }
                return r;
              };
            })()),
        Ir = S.inited
          ? S.module.visitorGlobals
          : (S.module.visitorGlobals = (function () {
              "use strict";
              var e = new Map();
              return new (class extends fr {
                reset(e) {
                  (this.globals = null),
                    (this.magicString = null),
                    (this.possibleIndexes = null),
                    (this.runtimeName = null),
                    (this.transforms = 0),
                    void 0 !== e &&
                      ((this.globals = e.globals),
                      (this.magicString = e.magicString),
                      (this.possibleIndexes = e.possibleIndexes),
                      (this.runtimeName = e.runtimeName));
                }
                visitCallExpression(t) {
                  var r = t.getValue(),
                    i = r.callee;
                  if ("MemberExpression" === i.type) {
                    var n = i.object,
                      s = n.name;
                    if (this.globals.has(s)) {
                      var a = r.arguments;
                      if (0 !== a.length && !vr(t, s, e)) {
                        if ("console" === s) {
                          for (
                            var o = !0, u = 0, l = null == a ? 0 : a.length;
                            u < l;
                            u++
                          ) {
                            var c = a[u].type;
                            if ("Literal" !== c && "TemplateLiteral" !== c) {
                              o = !1;
                              break;
                            }
                          }
                          if (o) return;
                          this.transforms |= 1;
                        } else "Reflect" === s && (this.transforms |= 64);
                        this.magicString.prependLeft(
                          n.start,
                          this.runtimeName + ".g.",
                        ),
                          t.call(this, "visitWithoutReset", "arguments");
                      }
                    } else this.visitChildren(t);
                  } else this.visitChildren(t);
                }
                visitIdentifier(t) {
                  var r = t.getValue(),
                    i = r.name;
                  if (this.globals.has(i)) {
                    var n = t.getParentNode(),
                      s = n.type;
                    if (
                      ("UnaryExpression" !== s || "typeof" !== n.operator) &&
                      Er(r, n) &&
                      !vr(t, i, e)
                    ) {
                      "console" === i
                        ? (this.transforms |= 1)
                        : "Reflect" === i && (this.transforms |= 64);
                      var a = this.runtimeName + ".g.",
                        o = r.start;
                      "Property" === s &&
                        n.shorthand &&
                        ((a = ":" + a + i), (o = r.end)),
                        this.magicString.prependLeft(o, a);
                    }
                  }
                }
              })();
            })()),
        Pr = S.inited
          ? S.module.parseIndexOfPragma
          : (S.module.parseIndexOfPragma = (function () {
              "use strict";
              return function (e, t) {
                for (var r = 0; ; ) {
                  (tt.lastIndex = r), (r += tt.exec(e)[0].length);
                  var i = qt.exec(e.slice(r));
                  if (null === i) return -1;
                  if ((i[1] || i[2]) === t) return r;
                  r += i[0].length;
                }
              };
            })()),
        Ar = S.inited
          ? S.module.parseHasPragma
          : (S.module.parseHasPragma = (function () {
              "use strict";
              return function (e, t) {
                var r = Pr(e, t);
                return (
                  -1 !== r &&
                  (r >= 13 && "use module" === t
                    ? -1 === Pr(e.slice(0, r), "use script")
                    : !(r >= 13 && "use script" === t) ||
                      -1 === Pr(e.slice(0, r), "use module"))
                );
              };
            })()),
        Nr = S.inited
          ? S.module.parsePreserveChild
          : (S.module.parsePreserveChild = (function () {
              "use strict";
              return function (e, t, r) {
                var i = t[r],
                  n = i.start,
                  s = t.start,
                  a = "";
                if (n > e.firstLineBreakPos) {
                  var o = n - s;
                  a = 7 === o ? "       " : " ".repeat(o);
                }
                return xr(e, s, n, a);
              };
            })()),
        _r = S.inited
          ? S.module.parsePreserveLine
          : (S.module.parsePreserveLine = (function () {
              "use strict";
              return function (e, { end: t, start: r }) {
                return xr(e, r, t, "");
              };
            })()),
        kr = S.inited
          ? S.module.utilEscapeQuotes
          : (S.module.utilEscapeQuotes = (function () {
              "use strict";
              var e = new Map([
                [39, /\\?'/g],
                [34, /\\?"/g],
              ]);
              return function (t, r = 34) {
                if ("string" != typeof t) return "";
                var i = String.fromCharCode(r);
                return t.replace(e.get(r), "\\" + i);
              };
            })()),
        Cr = S.inited
          ? S.module.utilToString
          : (S.module.utilToString = (function () {
              "use strict";
              var e = String;
              return function (t) {
                if ("string" == typeof t) return t;
                try {
                  return e(t);
                } catch (e) {}
                return "";
              };
            })()),
        Or = S.inited
          ? S.module.utilUnescapeQuotes
          : (S.module.utilUnescapeQuotes = (function () {
              "use strict";
              var e = new Map([
                [39, /\\'/g],
                [34, /\\"/g],
              ]);
              return function (t, r = 34) {
                if ("string" != typeof t) return "";
                var i = String.fromCharCode(r);
                return t.replace(e.get(r), i);
              };
            })()),
        Tr = S.inited
          ? S.module.utilStripQuotes
          : (S.module.utilStripQuotes = (function () {
              "use strict";
              return function (e, t) {
                if ("string" != typeof e) return "";
                var r = e.charCodeAt(0),
                  i = e.charCodeAt(e.length - 1);
                if (
                  (void 0 === t &&
                    (39 === r && 39 === i
                      ? (t = 39)
                      : 34 === r && 34 === i && (t = 34)),
                  void 0 === t)
                )
                  return e;
                var n = e.slice(1, -1);
                return Or(n, t);
              };
            })()),
        Lr = S.inited
          ? S.module.utilToStringLiteral
          : (S.module.utilToStringLiteral = (function () {
              "use strict";
              var e = /[\u2028\u2029]/g,
                t = new Map([
                  ["\u2028", "\\u2028"],
                  ["\u2029", "\\u2029"],
                ]);
              function r(e) {
                return "\\" + t.get(e);
              }
              return function (t, i = 34) {
                var n = JSON.stringify(t);
                if (
                  ("string" != typeof n && (n = Cr(t)),
                  (n = n.replace(e, r)),
                  34 === i && 34 === n.charCodeAt(0))
                )
                  return n;
                var s = String.fromCharCode(i),
                  a = Tr(n, i);
                return s + kr(a, i) + s;
              };
            })()),
        Mr = S.inited
          ? S.module.visitorImportExport
          : (S.module.visitorImportExport = (function () {
              "use strict";
              function e() {
                return { imports: new Map(), reExports: new Map(), star: !1 };
              }
              function t(e, t, r) {
                e.hoistedExports.push(...r),
                  t.declaration ? Nr(e, t, "declaration") : _r(e, t);
              }
              function r(e, t) {
                _r(e, t);
              }
              return new (class extends fr {
                finalizeHoisting() {
                  var e = this.top,
                    t = e.importedBindings,
                    r = e.insertPrefix;
                  0 !== t.size &&
                    (r +=
                      (this.generateVarDeclarations ? "var " : "let ") +
                      [...t].join(",") +
                      ";"),
                    (r += (function (e, t) {
                      var r = "",
                        i = t.length;
                      if (0 === i) return r;
                      var n = i - 1,
                        s = -1;
                      r += e.runtimeName + ".x([";
                      for (
                        var a = 0, o = null == t ? 0 : t.length;
                        a < o;
                        a++
                      ) {
                        var u = t[a],
                          l = u[0],
                          c = u[1];
                        r +=
                          '["' +
                          l +
                          '",()=>' +
                          c +
                          "]" +
                          (++s === n ? "" : ",");
                      }
                      return (r += "]);"), r;
                    })(this, this.hoistedExports));
                  var i = this.runtimeName;
                  this.importSpecifierMap.forEach(function (e, t) {
                    r += i + ".w(" + Lr(t);
                    var n = "";
                    e.imports.forEach(function (e, t) {
                      var r = (function e(t, r) {
                        return -1 === r.indexOf(t) ? t : e(a(t), r);
                      })("v", e);
                      n +=
                        ("" === n ? "" : ",") +
                        '["' +
                        t +
                        '",' +
                        ("*" === t ? "null" : '["' + e.join('","') + '"]') +
                        ",function(" +
                        r +
                        "){" +
                        e.join("=") +
                        "=" +
                        r +
                        "}]";
                    }),
                      e.reExports.forEach(function (e, t) {
                        for (
                          var r = 0, s = null == e ? 0 : e.length;
                          r < s;
                          r++
                        ) {
                          var a = e[r];
                          n +=
                            ("" === n ? "" : ",") +
                            '["' +
                            a +
                            '",null,' +
                            i +
                            '.f("' +
                            a +
                            '","' +
                            t +
                            '")]';
                        }
                      }),
                      e.star &&
                        (n +=
                          ("" === n ? "" : ",") + '["*",null,' + i + ".n()]"),
                      "" !== n && (r += ",[" + n + "]"),
                      (r += ");");
                  }),
                    this.magicString.prependLeft(e.insertIndex, r),
                    (this.yieldIndex += r.length);
                }
                reset(e) {
                  if (
                    ((this.assignableBindings = null),
                    (this.firstLineBreakPos = -1),
                    (this.generateVarDeclarations = !1),
                    (this.hoistedExports = null),
                    (this.hoistedImportsString = ""),
                    (this.importSpecifierMap = null),
                    (this.magicString = null),
                    (this.possibleIndexes = null),
                    (this.runtimeName = null),
                    (this.sourceType = null),
                    (this.temporalBindings = null),
                    (this.top = null),
                    (this.transforms = 0),
                    (this.yieldIndex = 0),
                    void 0 !== e)
                  ) {
                    var t = e.magicString;
                    (this.assignableBindings = new Set()),
                      (this.firstLineBreakPos = t.original.search(Ye)),
                      (this.generateVarDeclarations =
                        e.generateVarDeclarations),
                      (this.hoistedExports = []),
                      (this.importSpecifierMap = new Map()),
                      (this.magicString = t),
                      (this.possibleIndexes = e.possibleIndexes),
                      (this.runtimeName = e.runtimeName),
                      (this.sourceType = e.sourceType),
                      (this.temporalBindings = new Set()),
                      (this.top = e.top),
                      (this.yieldIndex = e.yieldIndex);
                  }
                }
                visitCallExpression(e) {
                  var t = e.getValue(),
                    r = t.callee;
                  "Import" === r.type
                    ? 0 !== t.arguments.length &&
                      ((this.transforms |= 2),
                      xr(this, r.start, r.end, this.runtimeName + ".i"),
                      e.call(this, "visitWithoutReset", "arguments"))
                    : this.visitChildren(e);
                }
                visitImportDeclaration(t) {
                  if (2 === this.sourceType) {
                    this.transforms |= 16;
                    var i = this.importSpecifierMap,
                      n = this.temporalBindings,
                      s = t.getValue(),
                      a = s.source.value,
                      o = s.specifiers,
                      u = i.get(a);
                    void 0 === u && ((u = e()), i.set(a, u));
                    for (
                      var l = u,
                        c = l.imports,
                        p = 0,
                        h = null == o ? 0 : o.length;
                      p < h;
                      p++
                    ) {
                      var f = o[p],
                        d = f.type,
                        m = "*";
                      "ImportSpecifier" === d
                        ? (m = f.imported.name)
                        : "ImportDefaultSpecifier" === d && (m = "default");
                      var v = c.get(m);
                      void 0 === v && ((v = []), c.set(m, v));
                      var g = f.local.name;
                      v.push(g), "*" !== m && n.add(g);
                    }
                    r(this, s);
                  }
                }
                visitExportAllDeclaration(t) {
                  if (2 === this.sourceType) {
                    this.transforms |= 4;
                    var i = this.importSpecifierMap,
                      n = t.getValue(),
                      s = n.source.value,
                      a = i.get(s);
                    void 0 === a && ((a = e()), i.set(s, a)),
                      (a.star = !0),
                      r(this, n);
                  }
                }
                visitExportDefaultDeclaration(e) {
                  if (2 === this.sourceType) {
                    this.transforms |= 4;
                    var r = e.getValue(),
                      i = r.declaration,
                      n = this.magicString,
                      s = this.runtimeName,
                      a = i.type,
                      o = i.id;
                    void 0 === o && (o = null);
                    var u = null === o ? s + "anonymous" : o.name;
                    if (
                      (null !== o && "ClassDeclaration" === a) ||
                      "FunctionDeclaration" === a
                    )
                      null === o &&
                        n.prependLeft(i.functionParamsStart, " " + u),
                        t(this, r, [["default", u]]);
                    else {
                      var l = s + ".d(",
                        c = ");";
                      null !== o ||
                        ("ArrowFunctionExpression" !== a &&
                          "ClassDeclaration" !== a &&
                          "ClassExpression" !== a &&
                          "FunctionExpression" !== a) ||
                        ((l = "const " + u + "="),
                        (c = ";" + s + ".d(" + u + ");")),
                        "SequenceExpression" === a &&
                          ((l += "("), (c = ")" + c));
                      var p = null === o ? s + ".o" : u;
                      this.hoistedExports.push(["default", p]),
                        xr(this, r.start, i.start, ""),
                        xr(this, i.end, r.end, ""),
                        n.prependLeft(i.start, l).prependRight(i.end, c);
                    }
                    null !== o && this.assignableBindings.add(u),
                      e.call(this, "visitWithoutReset", "declaration");
                  }
                }
                visitExportNamedDeclaration(i) {
                  if (2 === this.sourceType) {
                    this.transforms |= 4;
                    var n = this.assignableBindings,
                      s = this.magicString,
                      a = i.getValue(),
                      o = a.declaration,
                      u = a.source,
                      l = a.specifiers;
                    if (null !== o) {
                      var c = [],
                        p = o.type;
                      if (
                        "ClassDeclaration" === p ||
                        "FunctionDeclaration" === p
                      ) {
                        var h = o.id.name;
                        n.add(h), c.push([h, h]);
                      } else if ("VariableDeclaration" === p)
                        for (
                          var f = (function ({ declaration: e, type: t }) {
                              if ("ExportDefaultDeclaration" === t) {
                                var r = e.type;
                                return (
                                  "FunctionDeclaration" === r ||
                                  "ClassDeclaration" === r
                                );
                              }
                              return (
                                "ExportNamedDeclaration" !== t ||
                                null === e ||
                                "VariableDeclaration" !== e.type ||
                                "const" !== e.kind
                              );
                            })(a),
                            d = 0,
                            m = o.declarations,
                            v = null == m ? 0 : m.length;
                          d < v;
                          d++
                        )
                          for (
                            var g = m[d].id,
                              y = dr(g),
                              x = 0,
                              b = null == y ? 0 : y.length;
                            x < b;
                            x++
                          ) {
                            var E = y[x];
                            f && n.add(E), c.push([E, E]);
                          }
                      t(this, a, c);
                    } else if (null === u) {
                      for (
                        var w = [],
                          R = this.top.identifiers,
                          S = 0,
                          I = null == l ? 0 : l.length;
                        S < I;
                        S++
                      ) {
                        var P = l[S],
                          A = P.exported.name,
                          N = P.local.name;
                        if (!R.has(N))
                          throw new Jt.SyntaxError(
                            { inModule: !0, input: s.original },
                            P.start,
                            "Export '" + N + "' is not defined in module",
                          );
                        n.add(N), w.push([A, N]);
                      }
                      t(this, a, w);
                    } else {
                      var _ = this.importSpecifierMap,
                        k = u.value,
                        C = _.get(k);
                      void 0 === C && ((C = e()), _.set(k, C));
                      for (
                        var O = 0, T = null == l ? 0 : l.length;
                        O < T;
                        O++
                      ) {
                        var L = l[O],
                          M = L.exported.name,
                          D = C,
                          F = D.reExports,
                          j = F.get(M);
                        void 0 === j && ((j = []), F.set(M, j));
                        var V =
                          "ExportNamespaceSpecifier" === L.type
                            ? "*"
                            : L.local.name;
                        j.push(V);
                      }
                      r(this, a);
                    }
                    null !== o &&
                      i.call(this, "visitWithoutReset", "declaration");
                  }
                }
                visitMetaProperty(e) {
                  var t = e.getValue(),
                    r = t.meta;
                  "import" === r.name &&
                    ((this.transforms |= 32),
                    xr(this, r.start, r.end, this.runtimeName + "._"));
                }
              })();
            })()),
        Dr = S.inited
          ? S.module.visitorRequire
          : (S.module.visitorRequire = (function () {
              "use strict";
              var e = new Map();
              return new (class extends fr {
                reset(e) {
                  (this.found = !1),
                    (this.possibleIndexes = null),
                    void 0 !== e && (this.possibleIndexes = e.possibleIndexes);
                }
                visitCallExpression(t) {
                  var r = t.getValue(),
                    i = r.callee;
                  "require" === i.name
                    ? 0 === r.arguments.length ||
                      vr(t, "require", e) ||
                      ((this.found = !0),
                      t.call(this, "visitWithoutReset", "arguments"))
                    : this.visitChildren(t);
                }
              })();
            })()),
        Fr = S.inited
          ? S.module.utilStripShebang
          : (S.module.utilStripShebang = (function () {
              "use strict";
              var e = /^#!.*/;
              return function (t) {
                return "string" != typeof t
                  ? ""
                  : 35 === t.charCodeAt(0)
                    ? t.replace(e, "")
                    : t;
              };
            })()),
        jr = S.inited
          ? S.module.parseMaybeIdentifier
          : (S.module.parseMaybeIdentifier = (function () {
              "use strict";
              return function (e, t) {
                var r = e.getValue(),
                  i = e.getParentNode();
                if (Er(r, i)) {
                  for (var n = -2; "MemberExpression" === i.type; ) {
                    n -= 2;
                    var s = e.getNode(n);
                    if (null === s) break;
                    i = s;
                  }
                  t(r, i);
                }
              };
            })()),
        Vr = S.inited
          ? S.module.visitorTemporal
          : (S.module.visitorTemporal = (function () {
              "use strict";
              var e = new Map();
              return new (class extends fr {
                reset(e) {
                  (this.magicString = null),
                    (this.possibleIndexes = null),
                    (this.runtimeName = null),
                    (this.temporalBindings = null),
                    (this.transforms = 0),
                    void 0 !== e &&
                      ((this.magicString = e.magicString),
                      (this.possibleIndexes = e.possibleIndexes),
                      (this.runtimeName = e.runtimeName),
                      (this.temporalBindings = e.temporalBindings));
                }
                visitIdentifier(t) {
                  var r = this,
                    i = t.getValue(),
                    n = i.name;
                  if (this.temporalBindings.has(n) && !vr(t, n, e)) {
                    var s = this.magicString,
                      a = this.runtimeName;
                    jr(t, function (e, t) {
                      r.transforms |= 128;
                      var i = e.end,
                        o = e.start;
                      if (t.shorthand)
                        s.prependLeft(i, ":" + a + '.a("' + n + '",' + n + ")");
                      else {
                        var u = "",
                          l = "";
                        "NewExpression" === t.type && ((u = "("), (l = ")")),
                          xr(r, o, i, u + a + '.a("' + n + '",' + n + ")" + l);
                      }
                    });
                  }
                }
                visitExportDefaultDeclaration(e) {
                  var t = e.getValue(),
                    r = t.declaration;
                  "FunctionDeclaration" !== r.type &&
                    ((this.transforms |= 128),
                    this.magicString.appendRight(
                      r.end,
                      this.runtimeName + '.j(["default"]);',
                    )),
                    e.call(this, "visitWithoutReset", "declaration");
                }
                visitExportNamedDeclaration(e) {
                  var t = e.getValue(),
                    r = t.declaration,
                    i = t.specifiers,
                    n = new Set();
                  if (null !== r) {
                    var s = r.type;
                    if ("ClassDeclaration" === s) n.add(r.id.name);
                    else if ("VariableDeclaration" === s)
                      for (
                        var a = 0,
                          o = r.declarations,
                          u = null == o ? 0 : o.length;
                        a < u;
                        a++
                      )
                        for (
                          var l = o[a].id,
                            c = dr(l),
                            p = 0,
                            h = null == c ? 0 : c.length;
                          p < h;
                          p++
                        ) {
                          var f = c[p];
                          n.add(f);
                        }
                  } else if (null === t.source)
                    for (var d = 0, m = null == i ? 0 : i.length; d < m; d++) {
                      var v = i[d];
                      n.add(v.exported.name);
                    }
                  else
                    for (var g = 0, y = null == i ? 0 : i.length; g < y; g++) {
                      var x = i[g];
                      n.add(x.exported.name);
                    }
                  if (0 !== n.size) {
                    this.transforms |= 128;
                    var b = r || t,
                      E = b.end;
                    this.magicString.appendRight(
                      E,
                      ";" +
                        this.runtimeName +
                        ".j(" +
                        JSON.stringify([...n]) +
                        ");",
                    );
                  }
                  null !== r &&
                    e.call(this, "visitWithoutReset", "declaration");
                }
              })();
            })()),
        Gr = S.inited
          ? S.module.visitorUndeclared
          : (S.module.visitorUndeclared = (function () {
              "use strict";
              var e = new Map();
              return new (class extends fr {
                reset(e) {
                  (this.magicString = null),
                    (this.possibleIndexes = null),
                    (this.runtimeName = null),
                    (this.transforms = 0),
                    (this.undeclared = null),
                    void 0 !== e &&
                      ((this.magicString = e.magicString),
                      (this.possibleIndexes = e.possibleIndexes),
                      (this.runtimeName = e.runtimeName),
                      (this.undeclared = e.undeclared));
                }
                visitIdentifier(t) {
                  var r = this,
                    i = t.getValue(),
                    n = i.name;
                  if (this.undeclared.has(n) && Er(i, s) && !vr(t, n, e)) {
                    var s = t.getParentNode(),
                      a = this.runtimeName;
                    if ("UnaryExpression" === s.type && "typeof" === s.operator)
                      return (
                        (this.transforms |= 256),
                        void xr(this, i.start, i.end, a + ".g." + n)
                      );
                    jr(t, function (e, t) {
                      r.transforms |= 256;
                      var i = e.end,
                        s = e.start;
                      if (t.shorthand)
                        r.magicString.prependLeft(
                          i,
                          ":" + a + '.t("' + n + '")',
                        );
                      else {
                        var o = "",
                          u = "";
                        "NewExpression" === t.type && ((o = "("), (u = ")")),
                          xr(r, s, i, o + a + '.t("' + n + '")' + u);
                      }
                    });
                  }
                }
              })();
            })()),
        $r = S.inited
          ? S.module.visitorRequireDeclaration
          : (S.module.visitorRequireDeclaration = (function () {
              "use strict";
              var e = new Map();
              return new (class extends fr {
                reset(e) {
                  (this.magicString = null),
                    (this.possibleIndexes = null),
                    (this.runtimeName = null),
                    (this.transforms = 0),
                    void 0 !== e &&
                      ((this.magicString = e.magicString),
                      (this.possibleIndexes = e.possibleIndexes),
                      (this.runtimeName = e.runtimeName));
                }
                visitVariableDeclarator(t) {
                  var r = t.getValue();
                  if ("Identifier" === r.id.type) {
                    var i = r.id,
                      n = r.id.name;
                    "require" !== n ||
                      vr(t, "require", e) ||
                      (xr(
                        this,
                        i.start,
                        i.end,
                        this.runtimeName + "__esm_req__",
                      ),
                      (this.transforms |= 512)),
                      this.visitChildren(t);
                  } else this.visitChildren(t);
                }
                visitIdentifier(t) {
                  var r = t.getValue(),
                    i = r.name;
                  "require" !== i ||
                    vr(t, "require", e) ||
                    (xr(this, r.start, r.end, this.runtimeName + "__esm_req__"),
                    (this.transforms |= 512)),
                    this.visitChildren(t);
                }
              })();
            })()),
        Br = S.inited
          ? S.module.Compiler
          : (S.module.Compiler = (function () {
              "use strict";
              var e = {
                  cjsPaths: !1,
                  cjsVars: !1,
                  generateVarDeclarations: !1,
                  hint: -1,
                  pragmas: !0,
                  runtimeName: "_",
                  sourceType: 1,
                  strict: void 0,
                  topLevelReturn: !1,
                },
                t = {
                  createOptions: function (e) {
                    return cr({}, e, t.defaultOptions);
                  },
                  defaultOptions: e,
                  compile(e, r) {
                    (e = Fr(e)),
                      (r = t.createOptions(r)),
                      br.reset(),
                      wr.reset(),
                      Ir.reset(),
                      Mr.reset(),
                      Dr.reset(),
                      Vr.reset(),
                      Gr.reset(),
                      $r.reset();
                    var i = {
                        circular: 0,
                        code: e,
                        codeWithTDZ: null,
                        filename: null,
                        firstAwaitOutsideFunction: null,
                        firstReturnOutsideFunction: null,
                        mtime: -1,
                        scriptData: null,
                        sourceType: 1,
                        transforms: 0,
                        yieldIndex: 0,
                      },
                      n = r,
                      s = n.hint,
                      a = r,
                      o = a.sourceType;
                    1 === s
                      ? (o = 1)
                      : 2 === s
                        ? (o = 2)
                        : r.pragmas &&
                          (Ar(e, "use module")
                            ? (o = 2)
                            : Ar(e, "use script") && (o = 1));
                    var u = Sr(e, ["export"]),
                      l = Sr(e, ["eval"]),
                      c = Sr(e, ["import"]),
                      p = Sr(e, ["require"]),
                      h =
                        0 !== u.length ||
                        0 !== l.length ||
                        0 !== c.length ||
                        0 !== p.length;
                    if (!h && (1 === o || 3 === o)) return i;
                    var d,
                      m,
                      v = {
                        allowReturnOutsideFunction: r.topLevelReturn || 1 === o,
                        sourceType: 1 === o ? 1 : 2,
                        strict: r.strict,
                      },
                      g = !0;
                    try {
                      (d = pr.parse(e, v)), (g = !1);
                    } catch (e) {
                      m = e;
                    }
                    if (g && 3 === o) {
                      (o = 1),
                        (v.allowReturnOutsideFunction = !0),
                        (v.sourceType = o);
                      try {
                        (d = pr.parse(e, v)), (g = !1);
                      } catch (e) {}
                    }
                    if (g) throw (r.cjsPaths && (m.inModule = !1), m);
                    var y = r,
                      x = y.cjsVars,
                      b = y.runtimeName,
                      E = d,
                      w = E.strict,
                      R = E.top,
                      S = R.identifiers;
                    Reflect.deleteProperty(d, "inModule"),
                      Reflect.deleteProperty(d, "strict"),
                      Reflect.deleteProperty(d, "top");
                    var I = new ke(e),
                      P = new _e(d),
                      A = R.insertIndex;
                    c.push(...u),
                      c.sort(hr),
                      Mr.visit(P, {
                        generateVarDeclarations: r.generateVarDeclarations,
                        magicString: I,
                        possibleIndexes: c,
                        runtimeName: b,
                        sourceType: 1 === o ? 1 : 2,
                        top: R,
                        yieldIndex: A,
                      });
                    var N,
                      _ = Mr.transforms,
                      k = 0 != (2 & _),
                      C = 0 != (4 & _),
                      O = 0 != (16 & _),
                      T = 0 != (32 & _);
                    if ((3 === o && (o = C || T || O ? 2 : 1), k || O)) {
                      var L = new Set(["Reflect", "console"]),
                        M = [];
                      S.has("console")
                        ? L.delete("console")
                        : M.push("console"),
                        S.has("Reflect")
                          ? L.delete("Reflect")
                          : M.push("Reflect"),
                        Ir.visit(P, {
                          globals: L,
                          magicString: I,
                          possibleIndexes: Sr(e, M),
                          runtimeName: b,
                        });
                    }
                    if (
                      (S.has("eval") ||
                        wr.visit(P, {
                          magicString: I,
                          possibleIndexes: l,
                          runtimeName: b,
                          strict: w,
                          transformUpdateBindings: C,
                        }),
                      C || O)
                    ) {
                      var D = Mr.assignableBindings;
                      (N = Sr(e, [...D])),
                        x &&
                          Dr.visit(P, { possibleIndexes: Sr(e, ["require"]) });
                      var F = R.importedBindings,
                        j = !Dr.found && 0 !== F.size,
                        V = N;
                      j && (V.push(...Sr(e, [...F])), V.sort(hr)),
                        br.visit(P, {
                          assignableBindings: D,
                          importedBindings: F,
                          magicString: I,
                          possibleIndexes: V,
                          runtimeName: b,
                          transformImportBindingAssignments: j,
                          transformInsideFunctions: !0,
                        }),
                        Mr.finalizeHoisting();
                    }
                    if (!x && 2 === o) {
                      for (
                        var G = [
                            "__dirname",
                            "__filename",
                            "arguments",
                            "exports",
                            "module",
                            "require",
                          ],
                          $ = new Set(),
                          B = [],
                          U = 0,
                          q = null == G ? 0 : G.length;
                        U < q;
                        U++
                      ) {
                        var W = G[U];
                        S.has(W) || ($.add(W), B.push(W));
                      }
                      Gr.visit(P, {
                        magicString: I,
                        possibleIndexes: Sr(e, B),
                        runtimeName: b,
                        undeclared: $,
                      });
                    }
                    if (
                      (S.has("require") &&
                        2 === o &&
                        $r.visit(P, {
                          magicString: I,
                          possibleIndexes: p,
                          runtimeName: b,
                        }),
                      (i.transforms =
                        wr.transforms |
                        Ir.transforms |
                        _ |
                        Gr.transforms |
                        $r.transforms),
                      0 !== i.transforms &&
                        ((A = Mr.yieldIndex), (i.code = "" + I)),
                      O)
                    ) {
                      var z = Mr.assignableBindings,
                        H = Mr.temporalBindings;
                      f(i, "codeWithTDZ", function () {
                        var t = Sr(e, [...H]);
                        t.push(...u),
                          t.sort(hr),
                          br.visit(P, {
                            assignableBindings: z,
                            magicString: I,
                            possibleIndexes: N,
                            runtimeName: b,
                            transformOutsideFunctions: !0,
                          }),
                          Vr.visit(P, {
                            magicString: I,
                            possibleIndexes: t,
                            runtimeName: b,
                            temporalBindings: H,
                          });
                        var r = Vr.transforms;
                        return (
                          (i.transforms |= r), 0 == (128 & r) ? null : "" + I
                        );
                      }),
                        (i.circular = -1);
                    }
                    return (
                      (i.firstAwaitOutsideFunction =
                        R.firstAwaitOutsideFunction),
                      (i.firstReturnOutsideFunction =
                        R.firstReturnOutsideFunction),
                      (i.sourceType = o),
                      (i.yieldIndex = A),
                      i
                    );
                  },
                };
              return t;
            })()),
        Ur = S.inited
          ? S.module.SafeBuffer
          : (S.module.SafeBuffer = q(S.external.Buffer)),
        qr = S.inited
          ? S.module.GenericBuffer
          : (S.module.GenericBuffer = (function () {
              "use strict";
              return {
                alloc: Ur.alloc,
                concat: Ur.concat,
                slice: I(Ur.prototype.slice),
              };
            })()),
        Wr = S.inited ? S.module.realFs : (S.module.realFs = fe(A("fs"))),
        zr = S.inited
          ? S.module.safeFs
          : (S.module.safeFs = (function () {
              "use strict";
              var e = q(Wr),
                t = e.realpathSync.native;
              return (
                "function" == typeof t && (S.realpathNativeSync = t),
                L(e, "constants") && k(e, "constants", q(e.constants)),
                k(e, "Stats", q(e.Stats)),
                e.Stats.prototype.isFile ||
                  (e.Stats.prototype.isFile = Wr.Stats.prototype.isFile),
                e
              );
            })()),
        Hr = zr.mkdirSync,
        Kr = zr.readdirSync,
        Xr = zr.readFileSync,
        Jr = zr.realpathSync,
        Yr = zr.Stats,
        Qr = zr.statSync,
        Zr = zr.unlinkSync,
        ei = zr.writeFileSync,
        ti = S.inited
          ? S.module.envLastArgMatch
          : (S.module.envLastArgMatch = (function () {
              "use strict";
              return function (e, t, r = 1) {
                for (var i = null == e ? 0 : e.length; i--; ) {
                  var n = t.exec(e[i]);
                  if (null !== n) return Tr(n[r]);
                }
              };
            })()),
        ri = S.inited
          ? S.module.utilGetToStringTag
          : (S.module.utilGetToStringTag = (function () {
              "use strict";
              var e = Object.prototype.toString;
              return function (t) {
                return e.call(t);
              };
            })()),
        ii = S.inited ? S.module.realUtil : (S.module.realUtil = fe(A("util"))),
        ni = S.inited
          ? S.module.safeUtil
          : (S.module.safeUtil = (function () {
              "use strict";
              var e = q(ii),
                t = e.inspect,
                r = t.custom;
              S.customInspectKey = "symbol" == typeof r ? r : "inspect";
              var i = t.defaultOptions;
              return (
                _(i) ||
                  (i = {
                    breakLength: 60,
                    colors: !1,
                    compact: !0,
                    customInspect: !0,
                    depth: 2,
                    maxArrayLength: 100,
                    showHidden: !1,
                    showProxy: !1,
                  }),
                (S.defaultInspectOptions = i),
                L(e, "types") && k(e, "types", q(e.types)),
                e
              );
            })()),
        si = ni.deprecate,
        ai = ni.inspect,
        oi = ni.types,
        ui = ni,
        li = S.inited
          ? S.module.utilIsRegExp
          : (S.module.utilIsRegExp = (function () {
              "use strict";
              return "function" == typeof (oi && oi.isRegExp)
                ? oi.isRegExp
                : function (e) {
                    return V(e) && "[object RegExp]" === ri(e);
                  };
            })()),
        ci = S.inited
          ? S.module.utilToMatcher
          : (S.module.utilToMatcher = (function () {
              "use strict";
              return function (e) {
                return "function" == typeof e
                  ? function (t) {
                      return e(t);
                    }
                  : li(e)
                    ? function (t) {
                        return e.test(t);
                      }
                    : function (t) {
                        return t === e;
                      };
              };
            })()),
        pi = S.inited
          ? S.module.utilMatches
          : (S.module.utilMatches = (function () {
              "use strict";
              return function (e, t) {
                for (var r, i = 0, n = null == e ? 0 : e.length; i < n; i++) {
                  var s = e[i];
                  if ((void 0 === r && (r = ci(t)), r(s))) return !0;
                }
                return !1;
              };
            })()),
        hi = S.inited
          ? S.module.utilParseCommand
          : (S.module.utilParseCommand = (function () {
              "use strict";
              var e =
                /(?:[^ "'\\]|\\.)*(["'])(?:(?!\1)[^\\]|\\.)*\1|(?:[^ "'\\]|\\.)+/g;
              return function (t) {
                var r = [];
                if ("string" == typeof t)
                  for (var i; null !== (i = e.exec(t)); ) r.push(i[0]);
                return r;
              };
            })()),
        fi = S.inited
          ? S.module.envGetFlags
          : (S.module.envGetFlags = (function () {
              "use strict";
              return function () {
                var e = hi(Y.NODE_OPTIONS);
                Array.isArray(Q) && e.push(...Q);
                var t = {};
                return (
                  f(t, "abortOnUncaughtException", function () {
                    return pi(e, "--abort-on-uncaught-exception");
                  }),
                  f(t, "check", function () {
                    return pi(e, /^(?:--check|-c)$/);
                  }),
                  f(t, "esModuleSpecifierResolution", function () {
                    return ti(e, /^--es-module-specifier-resolution=(.+)$/);
                  }),
                  f(t, "eval", function () {
                    return pi(e, /^(?:--eval|-e)$/);
                  }),
                  f(t, "experimentalJSONModules", function () {
                    return pi(e, "--experimental-json-modules");
                  }),
                  f(t, "experimentalPolicy", function () {
                    return pi(e, "--experimental-policy");
                  }),
                  f(t, "experimentalREPLAwait", function () {
                    return pi(e, "--experimental-repl-await");
                  }),
                  f(t, "experimentalWorker", function () {
                    return pi(e, "--experimental-worker");
                  }),
                  f(t, "exposeInternals", function () {
                    return pi(e, /^--expose[-_]internals$/);
                  }),
                  f(t, "inspectBrk", function () {
                    return pi(e, /^--(?:debug|inspect)-brk(?:=.+)?$/);
                  }),
                  f(t, "interactive", function () {
                    return pi(e, /^(?:--interactive|-i)$/);
                  }),
                  f(t, "pendingDeprecation", function () {
                    return pi(e, "--pending-deprecation");
                  }),
                  f(t, "preserveSymlinks", function () {
                    return pi(e, "--preserve-symlinks");
                  }),
                  f(t, "preserveSymlinksMain", function () {
                    return pi(e, "--preserve-symlinks-main");
                  }),
                  f(t, "print", function () {
                    return pi(e, /^(?:--print|-pe?)$/);
                  }),
                  f(t, "type", function () {
                    return ti(e, /^--type=(.+)$/);
                  }),
                  f(t, "inspect", function () {
                    return (
                      t.inspectBrk || pi(e, /^--(?:debug|inspect)(?:=.*)?$/)
                    );
                  }),
                  f(t, "preloadModules", function () {
                    for (
                      var t = /^(?:--require|-r)$/,
                        r = e.length,
                        i = [],
                        n = -1;
                      ++n < r;

                    )
                      t.test(e[n]) && i.push(Tr(e[++n]));
                    return i;
                  }),
                  t
                );
              };
            })()),
        di = S.inited
          ? S.module.pathIsAbsolute
          : (S.module.pathIsAbsolute = (function () {
              "use strict";
              return function (e) {
                if ("string" != typeof e || 0 === e.length) return !1;
                if (47 === e.charCodeAt(0)) {
                  var t = tn.WIN32,
                    r = e.charCodeAt(1);
                  if (!t) return 47 !== r;
                }
                return be(e);
              };
            })()),
        mi = S.inited
          ? S.module.envIsWin32
          : (S.module.envIsWin32 = (function () {
              "use strict";
              return function () {
                return "win32" === te;
              };
            })()),
        vi = S.inited
          ? S.module.pathIsSep
          : (S.module.pathIsSep = (function () {
              "use strict";
              var e = mi();
              return function (t) {
                return "number" == typeof t
                  ? 47 === t || (e && 92 === t)
                  : "/" === t || (e && "\\" === t);
              };
            })()),
        gi = S.inited
          ? S.module.pathIsRelativePath
          : (S.module.pathIsRelativePath = (function () {
              "use strict";
              return function (e) {
                if ("string" != typeof e) return !1;
                var t = e.length;
                if (0 === t) return !1;
                var r = e.charCodeAt(0);
                if (46 !== r) return !1;
                if (1 === t) return !0;
                if (((r = e.charCodeAt(1)), 46 === r)) {
                  if (2 === t) return !0;
                  r = e.charCodeAt(2);
                }
                return vi(r);
              };
            })()),
        yi = S.inited
          ? S.module.utilIsPath
          : (S.module.utilIsPath = (function () {
              "use strict";
              return function (e) {
                return (
                  "string" == typeof e && 0 !== e.length && (gi(e) || di(e))
                );
              };
            })()),
        xi = (function (e, t) {
          return (
            (t = { exports: {} }),
            (function (e, t) {
              const i = [];
              function n() {
                return (
                  i.pop() || { context: 0, elements: null, element_array: null }
                );
              }
              function s(e) {
                i.push(e);
              }
              const a = [];
              function o(e) {
                a.push(e);
              }
              const u = t;
              (u.escape = function (e) {
                let t = "";
                if (!e) return e;
                for (let r = 0; r < e.length; r++) {
                  const i = e[r];
                  ('"' != i && "\\" != i && "`" != i && "'" != i) ||
                    (t += "\\"),
                    (t += i);
                }
                return t;
              }),
                (u.begin = function (e, t) {
                  const i = {
                      name: null,
                      value_type: 0,
                      string: "",
                      contains: null,
                    },
                    u = { line: 1, col: 1 };
                  let l = 0,
                    c = 0,
                    p = !0,
                    h = !1,
                    f = null,
                    d = void 0,
                    m = [],
                    v = 0,
                    g = 0,
                    y = !1,
                    x = !1,
                    b = !1,
                    E = !1,
                    w = !1,
                    R = null,
                    S = !1,
                    I = !1,
                    P = !1,
                    A = !1,
                    N = !1,
                    _ = !1,
                    k = !1,
                    C = 0,
                    O = 0,
                    T = !1;
                  const L = {
                      first: null,
                      last: null,
                      saved: null,
                      push(e) {
                        let t = this.saved;
                        t
                          ? ((this.saved = t.next),
                            (t.node = e),
                            (t.next = null),
                            (t.prior = this.last))
                          : (t = { node: e, next: null, prior: this.last }),
                          this.last || (this.first = t),
                          (this.last = t);
                      },
                      pop() {
                        const e = this.last;
                        return (
                          (this.last = e.prior) || (this.first = null),
                          (e.next = this.saved),
                          (this.saved = e),
                          e.node
                        );
                      },
                    },
                    M = {
                      first: null,
                      last: null,
                      saved: null,
                      push(e) {
                        let t = this.saved;
                        t
                          ? ((this.saved = t.next),
                            (t.node = e),
                            (t.next = null),
                            (t.prior = this.last))
                          : (t = { node: e, next: null, prior: this.last }),
                          this.last ? (this.last.next = t) : (this.first = t),
                          (this.last = t);
                      },
                      shift() {
                        const e = this.first;
                        return e
                          ? ((this.first = e.next),
                            this.first || (this.last = null),
                            (e.next = this.saved),
                            (this.saved = e),
                            e.node)
                          : null;
                      },
                      unshift(e) {
                        const t = this.saved;
                        (this.saved = t.next),
                          (t.node = e),
                          (t.next = this.first),
                          (t.prior = null),
                          this.first || (this.last = t),
                          (this.first = t);
                      },
                    };
                  function D(e) {
                    throw Error(`${e} at ${l} [${u.line}:${u.col}]`);
                  }
                  return {
                    finalError() {
                      if (0 !== g)
                        switch (g) {
                          case 1:
                            return D("Comment began at end of document");
                          case 2:
                            r.log(
                              "Warning: '//' comment without end of line ended document",
                            );
                            break;
                          case 3:
                            return D(
                              "Open comment '/*' is missing close at end of document",
                            );
                          case 4:
                            return D(
                              "Incomplete '/* *' close at end of document",
                            );
                        }
                      S && D("Incomplete string");
                    },
                    value() {
                      this.finalError();
                      const e = f;
                      return (f = void 0), e;
                    },
                    reset() {
                      (c = 0),
                        (p = !0),
                        M.last && (M.last.next = M.save),
                        (M.save = M.first),
                        (M.first = M.last = null),
                        L.last && (L.last.next = L.save),
                        (L.save = M.first),
                        (L.first = L.last = null),
                        (m = null),
                        (d = void 0),
                        (v = 0),
                        (i.value_type = 0),
                        (i.name = null),
                        (i.string = ""),
                        (u.line = 1),
                        (u.col = 1),
                        (h = !1),
                        (g = 0),
                        (T = !1),
                        (S = !1),
                        (P = !1),
                        (A = !1);
                    },
                    write(r) {
                      let i;
                      if (
                        (void 0 !== r && "string" != typeof r && (r += ""), !p)
                      )
                        throw Error(
                          "Parser is in an error state, please reset.",
                        );
                      for (
                        i = this._write(r, !1);
                        i > 0 &&
                        (this.finalError(),
                        "function" == typeof t &&
                          (function e(r, i) {
                            const n = r[i];
                            if (n && "object" == typeof n)
                              for (const t in n)
                                if (
                                  Object.prototype.hasOwnProperty.call(n, t)
                                ) {
                                  const r = e(n, t);
                                  void 0 !== r ? (n[t] = r) : delete n[t];
                                }
                            return t.call(r, i, n);
                          })({ "": f }, ""),
                        e(f),
                        (f = void 0),
                        !(i < 2));
                        i = this._write()
                      );
                      i && this.finalError();
                    },
                    _write(e, t) {
                      let r,
                        D,
                        F = 0;
                      function j(e, t) {
                        throw Error(
                          `${e} '${String.fromCodePoint(t)}' unexpected at ${l} (near '${D.substr(l > 4 ? l - 4 : 0, l > 4 ? 3 : l - 1)}[${String.fromCodePoint(t)}]${D.substr(l, 10)}') [${u.line}:${u.col}]`,
                        );
                      }
                      function V() {
                        (i.value_type = 0), (i.string = "");
                      }
                      function G() {
                        switch (i.value_type) {
                          case 5:
                            m.push((h ? -1 : 1) * Number(i.string));
                            break;
                          case 4:
                            m.push(i.string);
                            break;
                          case 2:
                            m.push(!0);
                            break;
                          case 3:
                            m.push(!1);
                            break;
                          case 8:
                          case 9:
                            m.push(NaN);
                            break;
                          case 10:
                            m.push(-1 / 0);
                            break;
                          case 11:
                            m.push(1 / 0);
                            break;
                          case 1:
                            m.push(null);
                            break;
                          case -1:
                            m.push(void 0);
                            break;
                          case 13:
                            m.push(void 0), delete m[m.length - 1];
                            break;
                          case 6:
                          case 7:
                            m.push(i.contains);
                        }
                      }
                      function $() {
                        switch (i.value_type) {
                          case 5:
                            d[i.name] = (h ? -1 : 1) * Number(i.string);
                            break;
                          case 4:
                            d[i.name] = i.string;
                            break;
                          case 2:
                            d[i.name] = !0;
                            break;
                          case 3:
                            d[i.name] = !1;
                            break;
                          case 8:
                          case 9:
                            d[i.name] = NaN;
                            break;
                          case 10:
                            d[i.name] = -1 / 0;
                            break;
                          case 11:
                            d[i.name] = 1 / 0;
                            break;
                          case 1:
                            d[i.name] = null;
                            break;
                          case -1:
                            d[i.name] = void 0;
                            break;
                          case 6:
                          case 7:
                            d[i.name] = i.contains;
                        }
                      }
                      function B(e) {
                        let t = 0;
                        for (; 0 == t && l < D.length; ) {
                          let r = D.charAt(l);
                          const n = D.codePointAt(l++);
                          if (
                            (n >= 65536 && ((r += D.charAt(l)), l++),
                            u.col++,
                            n == e)
                          )
                            P
                              ? (k
                                  ? j("Incomplete hexidecimal sequence", n)
                                  : N
                                    ? j("Incomplete long unicode sequence", n)
                                    : _ && j("Incomplete unicode sequence", n),
                                A ? ((A = !1), (t = 1)) : (i.string += r),
                                (P = !1))
                              : (t = 1);
                          else if (P) {
                            if (N) {
                              if (125 == n) {
                                (i.string += String.fromCodePoint(C)),
                                  (N = !1),
                                  (_ = !1),
                                  (P = !1);
                                continue;
                              }
                              (C *= 16),
                                n >= 48 && n <= 57
                                  ? (C += n - 48)
                                  : n >= 65 && n <= 70
                                    ? (C += n - 65 + 10)
                                    : n >= 97 && n <= 102
                                      ? (C += n - 97 + 10)
                                      : j(
                                          "(escaped character, parsing hex of \\u)",
                                          n,
                                        );
                              continue;
                            }
                            if (k || _) {
                              if (0 === O && 123 === n) {
                                N = !0;
                                continue;
                              }
                              (C *= 16),
                                n >= 48 && n <= 57
                                  ? (C += n - 48)
                                  : n >= 65 && n <= 70
                                    ? (C += n - 65 + 10)
                                    : n >= 97 && n <= 102
                                      ? (C += n - 97 + 10)
                                      : j(
                                          _
                                            ? "(escaped character, parsing hex of \\u)"
                                            : "(escaped character, parsing hex of \\x)",
                                          n,
                                        ),
                                O++,
                                _
                                  ? 4 == O &&
                                    ((i.string += String.fromCodePoint(C)),
                                    (_ = !1),
                                    (P = !1))
                                  : 2 == O &&
                                    ((i.string += String.fromCodePoint(C)),
                                    (k = !1),
                                    (P = !1));
                              continue;
                            }
                            switch (n) {
                              case 13:
                                (A = !0), (u.col = 1);
                                continue;
                              case 8232:
                              case 8233:
                                u.col = 1;
                              case 10:
                                A ? (A = !1) : (u.col = 1), u.line++;
                                break;
                              case 116:
                                i.string += "\t";
                                break;
                              case 98:
                                i.string += "\b";
                                break;
                              case 48:
                                i.string += "\0";
                                break;
                              case 110:
                                i.string += "\n";
                                break;
                              case 114:
                                i.string += "\r";
                                break;
                              case 102:
                                i.string += "\f";
                                break;
                              case 120:
                                (k = !0), (O = 0), (C = 0);
                                continue;
                              case 117:
                                (_ = !0), (O = 0), (C = 0);
                                continue;
                              default:
                                i.string += r;
                            }
                            P = !1;
                          } else
                            92 === n
                              ? (P = !0)
                              : (A && ((A = !1), u.line++, (u.col = 2)),
                                (i.string += r));
                        }
                        return t;
                      }
                      function U() {
                        let e;
                        for (; (e = l) < D.length; ) {
                          const r = D.charAt(e),
                            n = D.codePointAt(l++);
                          if (
                            (n >= 65536 && j("fault while parsing number;", n),
                            95 != n)
                          )
                            if ((u.col++, n >= 48 && n <= 57))
                              b && (w = !0), (i.string += r);
                            else if (45 == n || 43 == n)
                              0 == i.string.length || (b && !E && !w)
                                ? ((i.string += r), (E = !0))
                                : ((p = !1),
                                  j("fault while parsing number;", n));
                            else if (46 == n)
                              x || y || b
                                ? ((p = !1),
                                  j("fault while parsing number;", n))
                                : ((i.string += r), (x = !0));
                            else if (
                              120 == n ||
                              98 == n ||
                              111 == n ||
                              88 == n ||
                              66 == n ||
                              79 == n
                            )
                              y || "0" != i.string
                                ? ((p = !1),
                                  j("fault while parsing number;", n))
                                : ((y = !0), (i.string += r));
                            else {
                              if (101 != n && 69 != n) {
                                if (
                                  32 == n ||
                                  160 == n ||
                                  13 == n ||
                                  10 == n ||
                                  9 == n ||
                                  65279 == n ||
                                  44 == n ||
                                  125 == n ||
                                  93 == n ||
                                  58 == n
                                )
                                  break;
                                t &&
                                  ((p = !1),
                                  j("fault while parsing number;", n));
                                break;
                              }
                              b
                                ? ((p = !1),
                                  j("fault while parsing number;", n))
                                : ((i.string += r), (b = !0));
                            }
                        }
                        (l = e),
                          t || l != D.length
                            ? ((I = !1), (i.value_type = 5), 0 == v && (T = !0))
                            : (I = !0);
                      }
                      if (!p) return -1;
                      if (e && e.length)
                        (r = (function () {
                          let e = a.pop();
                          return e ? (e.n = 0) : (e = { buf: null, n: 0 }), e;
                        })()),
                          (r.buf = e),
                          M.push(r);
                      else if (I) {
                        if (((I = !1), (i.value_type = 5), 0 != v))
                          throw Error("context stack is not empty at flush");
                        (T = !0), (F = 1);
                      }
                      for (; p && (r = M.shift()); ) {
                        if (((l = r.n), (D = r.buf), S)) {
                          const e = B(R);
                          e > 0 && ((S = !1), (i.value_type = 4));
                        }
                        for (I && U(); !T && p && l < D.length; ) {
                          let e = D.charAt(l);
                          const t = D.codePointAt(l++);
                          if (
                            (t >= 65536 && ((e += D.charAt(l)), l++),
                            u.col++,
                            g)
                          )
                            1 == g
                              ? 42 == t
                                ? (g = 3)
                                : 47 != t
                                  ? j("fault while parsing;", t)
                                  : (g = 2)
                              : 2 == g
                                ? (10 != t && 13 != t) || (g = 0)
                                : 3 == g
                                  ? 42 == t && (g = 4)
                                  : (g = 47 == t ? 0 : 3);
                          else {
                            switch (t) {
                              case 47:
                                g = 1;
                                break;
                              case 123:
                                (29 == c || 30 == c || (3 == v && 0 == c)) &&
                                  j(
                                    "fault while parsing; getting field name unexpected ",
                                    t,
                                  );
                                {
                                  const e = n();
                                  i.value_type = 6;
                                  const t = {};
                                  0 == v && (f = d = t),
                                    (e.context = v),
                                    (e.elements = d),
                                    (e.element_array = m),
                                    (e.name = i.name),
                                    (d = t),
                                    L.push(e),
                                    V(),
                                    (v = 3);
                                }
                                break;
                              case 91:
                                if (
                                  ((3 != v && 29 != c && 30 != c) ||
                                    j(
                                      "Fault while parsing; while getting field name unexpected",
                                      t,
                                    ),
                                  0 == i.value_type || -1 == i.value_type)
                                ) {
                                  const e = n();
                                  i.value_type = 7;
                                  const t = [];
                                  0 == v
                                    ? (f = m = t)
                                    : 4 == v && (d[i.name] = t),
                                    (e.context = v),
                                    (e.elements = d),
                                    (e.element_array = m),
                                    (e.name = i.name),
                                    (m = t),
                                    L.push(e),
                                    V(),
                                    (v = 1);
                                } else
                                  j(
                                    "Unexpected array open after previous value",
                                    t,
                                  );
                                break;
                              case 58:
                                3 == v
                                  ? ((c = 0),
                                    (i.name = i.string),
                                    (i.string = ""),
                                    (v = 4),
                                    (i.value_type = 0))
                                  : j(
                                      1 == v
                                        ? "(in array, got colon out of string):parsing fault;"
                                        : "(outside any object, got colon out of string):parsing fault;",
                                      t,
                                    );
                                break;
                              case 125:
                                if ((31 == c && (c = 0), 3 == v)) {
                                  (i.value_type = 6), (i.contains = d);
                                  const e = L.pop();
                                  (i.name = e.name),
                                    (v = e.context),
                                    (d = e.elements),
                                    (m = e.element_array),
                                    s(e),
                                    0 == v && (T = !0);
                                } else if (4 == v) {
                                  0 != i.value_type
                                    ? $()
                                    : j(
                                        "Fault while parsing field value, close with no value",
                                        t,
                                      ),
                                    (i.value_type = 6),
                                    (i.contains = d);
                                  const e = L.pop();
                                  (i.name = e.name),
                                    (v = e.context),
                                    (d = e.elements),
                                    (m = e.element_array),
                                    s(e),
                                    0 == v && (T = !0);
                                } else j("Fault while parsing; unexpected", t);
                                h = !1;
                                break;
                              case 93:
                                if ((31 == c && (c = 0), 1 == v)) {
                                  0 != i.value_type && G(),
                                    (i.value_type = 7),
                                    (i.contains = m);
                                  {
                                    const e = L.pop();
                                    (i.name = e.name),
                                      (v = e.context),
                                      (d = e.elements),
                                      (m = e.element_array),
                                      s(e);
                                  }
                                  0 == v && (T = !0);
                                } else
                                  j(`bad context ${v}; fault while parsing`, t);
                                h = !1;
                                break;
                              case 44:
                                31 == c && (c = 0),
                                  1 == v
                                    ? (0 == i.value_type && (i.value_type = 13),
                                      G(),
                                      V())
                                    : 4 == v
                                      ? ((v = 3),
                                        0 != i.value_type
                                          ? ($(), V())
                                          : j(
                                              "Unexpected comma after object field name",
                                              t,
                                            ))
                                      : ((p = !1),
                                        j(
                                          "bad context; excessive commas while parsing;",
                                          t,
                                        )),
                                  (h = !1);
                                break;
                              default:
                                if (3 == v)
                                  switch (t) {
                                    case 96:
                                    case 34:
                                    case 39:
                                      if (0 == c) {
                                        0 != i.value_type &&
                                          j(
                                            "String begin after previous value",
                                            t,
                                          );
                                        const e = B(t);
                                        e
                                          ? (i.value_type = 4)
                                          : ((R = t), (S = !0));
                                      } else
                                        j(
                                          "fault while parsing; quote not at start of field name",
                                          t,
                                        );
                                      break;
                                    case 10:
                                      u.line++, (u.col = 1);
                                    case 13:
                                    case 32:
                                    case 160:
                                    case 9:
                                    case 65279:
                                      31 == c ? (c = 0) : 29 == c && (c = 30);
                                      break;
                                    default:
                                      30 == c &&
                                        ((p = !1),
                                        j(
                                          "fault while parsing; character unexpected",
                                          t,
                                        )),
                                        0 == c && (c = 29),
                                        (i.string += e);
                                  }
                                else
                                  switch (t) {
                                    case 96:
                                    case 34:
                                    case 39:
                                      if (0 === i.value_type) {
                                        const e = B(t);
                                        e
                                          ? ((i.value_type = 4), (c = 31))
                                          : ((R = t), (S = !0));
                                      } else j("String unexpected", t);
                                      break;
                                    case 10:
                                      u.line++, (u.col = 1);
                                    case 32:
                                    case 160:
                                    case 9:
                                    case 13:
                                    case 65279:
                                      if (31 == c) {
                                        (c = 0), 0 == v && (T = !0);
                                        break;
                                      }
                                      0 !== c &&
                                        ((p = !1),
                                        j("fault parsing whitespace", t));
                                      break;
                                    case 116:
                                      0 == c
                                        ? (c = 1)
                                        : 27 == c
                                          ? (c = 28)
                                          : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 114:
                                      1 == c
                                        ? (c = 2)
                                        : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 117:
                                      2 == c
                                        ? (c = 3)
                                        : 9 == c
                                          ? (c = 10)
                                          : 0 == c
                                            ? (c = 12)
                                            : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 101:
                                      3 == c
                                        ? ((i.value_type = 2), (c = 31))
                                        : 8 == c
                                          ? ((i.value_type = 3), (c = 31))
                                          : 14 == c
                                            ? (c = 15)
                                            : 18 == c
                                              ? (c = 19)
                                              : ((p = !1),
                                                j("fault parsing", t));
                                      break;
                                    case 110:
                                      0 == c
                                        ? (c = 9)
                                        : 12 == c
                                          ? (c = 13)
                                          : 17 == c
                                            ? (c = 18)
                                            : 22 == c
                                              ? (c = 23)
                                              : 25 == c
                                                ? (c = 26)
                                                : ((p = !1),
                                                  j("fault parsing", t));
                                      break;
                                    case 100:
                                      13 == c
                                        ? (c = 14)
                                        : 19 == c
                                          ? ((i.value_type = -1), (c = 31))
                                          : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 105:
                                      16 == c
                                        ? (c = 17)
                                        : 24 == c
                                          ? (c = 25)
                                          : 26 == c
                                            ? (c = 27)
                                            : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 108:
                                      10 == c
                                        ? (c = 11)
                                        : 11 == c
                                          ? ((i.value_type = 1), (c = 31))
                                          : 6 == c
                                            ? (c = 7)
                                            : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 102:
                                      0 == c
                                        ? (c = 5)
                                        : 15 == c
                                          ? (c = 16)
                                          : 23 == c
                                            ? (c = 24)
                                            : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 97:
                                      5 == c
                                        ? (c = 6)
                                        : 20 == c
                                          ? (c = 21)
                                          : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 115:
                                      7 == c
                                        ? (c = 8)
                                        : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 73:
                                      0 == c
                                        ? (c = 22)
                                        : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 78:
                                      0 == c
                                        ? (c = 20)
                                        : 21 == c
                                          ? ((i.value_type = h ? 8 : 9),
                                            (h = !1),
                                            (c = 31))
                                          : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 121:
                                      28 == c
                                        ? ((i.value_type = h ? 10 : 11),
                                          (h = !1),
                                          (c = 31))
                                        : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 45:
                                      0 == c
                                        ? (h = !h)
                                        : ((p = !1), j("fault parsing", t));
                                      break;
                                    case 43:
                                      0 !== c &&
                                        ((p = !1), j("fault parsing", t));
                                      break;
                                    default:
                                      (t >= 48 && t <= 57) ||
                                      43 == t ||
                                      46 == t ||
                                      45 == t
                                        ? ((y = !1),
                                          (b = !1),
                                          (E = !1),
                                          (w = !1),
                                          (x = !1),
                                          (i.string = e),
                                          (r.n = l),
                                          U())
                                        : ((p = !1), j("fault parsing", t));
                                  }
                            }
                            if (T) {
                              31 == c && (c = 0);
                              break;
                            }
                          }
                        }
                        if (
                          (l == D.length
                            ? (o(r),
                              S || I || 3 == v
                                ? (F = 0)
                                : 0 != v ||
                                  (0 == i.value_type && !f) ||
                                  ((T = !0), (F = 1)))
                            : ((r.n = l), M.unshift(r), (F = 2)),
                          T)
                        )
                          break;
                      }
                      if (T && 0 != i.value_type) {
                        switch (i.value_type) {
                          case 5:
                            f = (h ? -1 : 1) * Number(i.string);
                            break;
                          case 4:
                            f = i.string;
                            break;
                          case 2:
                            f = !0;
                            break;
                          case 3:
                            f = !1;
                            break;
                          case 1:
                            f = null;
                            break;
                          case -1:
                            f = void 0;
                            break;
                          case 9:
                          case 8:
                            f = NaN;
                            break;
                          case 11:
                            f = 1 / 0;
                            break;
                          case 10:
                            f = -1 / 0;
                            break;
                          case 6:
                          case 7:
                            f = i.contains;
                        }
                        (h = !1), (i.string = ""), (i.value_type = 0);
                      }
                      return (T = !1), F;
                    },
                  };
                });
              const l = [Object.freeze(u.begin())];
              let c = 0;
              (u.parse = function (e, t) {
                const r = c++;
                l.length <= r && l.push(Object.freeze(u.begin()));
                const i = l[r];
                if (
                  ("string" != typeof e && (e += ""),
                  i.reset(),
                  i._write(e, !0) > 0)
                ) {
                  const e = i.value();
                  return (
                    "function" == typeof t &&
                      (function e(r, i) {
                        const n = r[i];
                        if (n && "object" == typeof n)
                          for (const t in n)
                            if (Object.prototype.hasOwnProperty.call(n, t)) {
                              const r = e(n, t);
                              void 0 !== r ? (n[t] = r) : delete n[t];
                            }
                        return t.call(r, i, n);
                      })({ "": e }, ""),
                    c--,
                    e
                  );
                }
                i.finalError();
              }),
                (u.stringify = JSON.stringify),
                (u.stringifierActive = null),
                (u.stringifier = function () {
                  const e = {
                    true: !0,
                    false: !1,
                    null: null,
                    NaN: NaN,
                    Infinity: 1 / 0,
                    undefined: void 0,
                  };
                  let t = '"',
                    r = !1;
                  return {
                    stringify(e, t, n, s) {
                      return (function (e, t, n, s, a) {
                        if (void 0 === t) return "undefined";
                        if (null === t) return "null";
                        let o, l, c;
                        const p = typeof s,
                          h = typeof n;
                        (o = ""), (l = "");
                        const f = u.stringifierActive;
                        if (
                          ((u.stringifierActive = e),
                          a || (a = ""),
                          "number" === p)
                        )
                          for (c = 0; c < s; c += 1) l += " ";
                        else "string" === p && (l = s);
                        const d = n;
                        if (
                          n &&
                          "function" !== h &&
                          ("object" !== h || "number" != typeof n.length)
                        )
                          throw Error("JSON6.stringify unknown replacer type.");
                        const m = (function e(t, n) {
                          let s, a, u, c;
                          const p = o;
                          let h,
                            f = n[t];
                          switch (
                            ("string" == typeof f && (f = i(f)),
                            null != f &&
                              "object" == typeof f &&
                              "function" == typeof toJSOX &&
                              ((o += l), (o = p)),
                            "function" == typeof d && (f = d.call(n, t, f)),
                            typeof f)
                          ) {
                            case "string":
                              return f;
                            case "number":
                              return "" + f;
                            case "boolean":
                              return f + "";
                            case "object":
                              if (!f) return "null";
                              if (
                                ((o += l), (h = []), d && "object" == typeof d)
                              )
                                for (c = d.length, s = 0; s < c; s += 1)
                                  "string" == typeof d[s] &&
                                    ((a = d[s]),
                                    (u = e(a, f)),
                                    u && h.push(i(a) + (o ? ": " : ":") + u));
                              else {
                                const t = [];
                                for (a in f)
                                  if (
                                    (!r ||
                                      Object.prototype.propertyIsEnumerable.call(
                                        f,
                                        a,
                                      )) &&
                                    Object.prototype.hasOwnProperty.call(f, a)
                                  ) {
                                    let e;
                                    for (e = 0; e < t.length; e++)
                                      if (t[e] > a) {
                                        t.splice(e, 0, a);
                                        break;
                                      }
                                    e === t.length && t.push(a);
                                  }
                                for (let r = 0; r < t.length; r++)
                                  (a = t[r]),
                                    Object.prototype.hasOwnProperty.call(
                                      f,
                                      a,
                                    ) &&
                                      ((u = e(a, f)),
                                      u && h.push(i(a) + (o ? ": " : ":") + u));
                              }
                              return (
                                (u =
                                  0 === h.length
                                    ? "{}"
                                    : o
                                      ? "{\n" +
                                        o +
                                        h.join(",\n" + o) +
                                        "\n" +
                                        p +
                                        "}"
                                      : "{" + h.join(",") + "}"),
                                (o = p),
                                u
                              );
                          }
                        })(a, { [a]: t });
                        return (u.stringifierActive = f), m;
                      })(this, e, t, n, s);
                    },
                    setQuote(e) {
                      t = e;
                    },
                    get ignoreNonEnumerable() {
                      return r;
                    },
                    set ignoreNonEnumerable(e) {
                      r = e;
                    },
                  };
                  function i(r) {
                    return "number" != typeof r || isNaN(r)
                      ? r.length
                        ? (r in e) ||
                          /([0-9-])/.test(r[0]) ||
                          /((\n|\r|\t)|[ #{}()<>!+\-*/.:,])/.test(r)
                          ? t + u.escape(r) + t
                          : r
                        : t + t
                      : ["'", "" + r, "'"].join();
                  }
                }),
                (u.stringify = function (e, t, r) {
                  const i = u.stringifier();
                  return i.stringify(e, t, r);
                }),
                (u.version = "1.1.1");
            })(0, t.exports),
            t.exports
          );
        })(),
        bi = xi,
        Ei = bi,
        wi = S.inited
          ? S.module.utilQuotifyJSON
          : (S.module.utilQuotifyJSON = (function () {
              "use strict";
              var e = new Set(["false", "true"]),
                t = new Set(['"', "'"]),
                r = /(|[^a-zA-Z])([a-zA-Z]+)([^a-zA-Z]|)/g;
              return function (i) {
                return "string" != typeof i || "" === i
                  ? i
                  : i.replace(r, function (r, i, n, s) {
                      return t.has(i) || e.has(n) || t.has(s)
                        ? r
                        : i + '"' + n + '"' + s;
                    });
              };
            })()),
        Ri = S.inited
          ? S.module.utilParseJSON6
          : (S.module.utilParseJSON6 = (function () {
              "use strict";
              function e(e) {
                if ("string" == typeof e && e.length)
                  try {
                    return Ei.parse(e);
                  } catch (e) {}
                return null;
              }
              return function (t) {
                return e(t) || e(wi(t));
              };
            })()),
        Si = S.inited
          ? S.module.utilStripBOM
          : (S.module.utilStripBOM = (function () {
              "use strict";
              return function (e) {
                return "string" != typeof e
                  ? ""
                  : 65279 === e.charCodeAt(0)
                    ? e.slice(1)
                    : e;
              };
            })()),
        Ii = S.inited
          ? S.module.fsReadFile
          : (S.module.fsReadFile = (function () {
              "use strict";
              return function (e, t) {
                var r = null;
                try {
                  r = Xr(e, t);
                } catch (e) {}
                return r && "utf8" === t ? Si(r) : r;
              };
            })()),
        Pi = S.inited
          ? S.module.envGetOptions
          : (S.module.envGetOptions = (function () {
              "use strict";
              return function () {
                var e = Y && Y.ESM_OPTIONS;
                if ("string" != typeof e) return null;
                var t = e.trim();
                if (
                  (yi(t) &&
                    ((t = Ii(we(t), "utf8")), (t = null === t ? "" : t.trim())),
                  "" === t)
                )
                  return null;
                var r = t.charCodeAt(0);
                return (39 !== r && 123 !== r && 34 !== r) || (t = Ri(t)), t;
              };
            })()),
        Ai = S.inited
          ? S.module.builtinIds
          : (S.module.builtinIds = (function () {
              "use strict";
              var t = e.constructor.builtinModules;
              if (Array.isArray(t) && Object.isFrozen(t)) t = Array.from(t);
              else {
                var r = fi(),
                  i = r.exposeInternals;
                for (var n in ((t = []), oe.natives))
                  i
                    ? "internal/bootstrap_loaders" !== n &&
                      "internal/bootstrap/loaders" !== n &&
                      t.push(n)
                    : n.startsWith("internal/") || t.push(n);
              }
              return t.sort();
            })()),
        Ni = S.inited
          ? S.module.builtinLookup
          : (S.module.builtinLookup = (function () {
              "use strict";
              return new Set(Ai);
            })()),
        _i = S.inited
          ? S.module.envHasInspector
          : (S.module.envHasInspector = (function () {
              "use strict";
              return function () {
                return (
                  1 === H.variables.v8_enable_inspector ||
                  (Ni.has("inspector") && _(ce("inspector")))
                );
              };
            })()),
        ki = S.inited
          ? S.module.envIsBrave
          : (S.module.envIsBrave = (function () {
              "use strict";
              return function () {
                return L(se, "Brave");
              };
            })()),
        Ci = S.inited
          ? S.module.utilIsOwnPath
          : (S.module.utilIsOwnPath = (function () {
              "use strict";
              var e = b.PACKAGE_FILENAMES;
              return function (t) {
                if ("string" == typeof t)
                  for (var r = 0, i = null == e ? 0 : e.length; r < i; r++) {
                    var n = e[r];
                    if (t === n) return !0;
                  }
                return !1;
              };
            })()),
        Oi = S.inited
          ? S.module.envHasLoaderModule
          : (S.module.envHasLoaderModule = (function () {
              "use strict";
              return function (e) {
                return pi(e, function ({ filename: e }) {
                  return Ci(e);
                });
              };
            })()),
        Ti = S.inited
          ? S.module.envIsInternal
          : (S.module.envIsInternal = (function () {
              "use strict";
              return function () {
                return e.id.startsWith("internal/");
              };
            })()),
        Li = e,
        Mi = Li,
        Di = Mi.parent,
        Fi = new Set();
      null != Di && !Fi.has(Di);

    )
      Fi.add(Di), (Li = Di), (Di = Li.parent);
    var ji = Li,
      Vi = S.inited
        ? S.module.envIsPreloaded
        : (S.module.envIsPreloaded = (function () {
            "use strict";
            return function () {
              return (
                !!Ti() || ("internal/preload" === ji.id && Oi(ji.children))
              );
            };
          })()),
      Gi = S.inited
        ? S.module.envIsCheck
        : (S.module.envIsCheck = (function () {
            "use strict";
            return function () {
              var e = z.length;
              return (1 === e || 2 === e) && fi().check && Vi();
            };
          })()),
      $i = S.inited
        ? S.module.envIsCLI
        : (S.module.envIsCLI = (function () {
            "use strict";
            return function () {
              return z.length > 1 && Vi();
            };
          })()),
      Bi = S.inited
        ? S.module.envIsDevelopment
        : (S.module.envIsDevelopment = (function () {
            "use strict";
            return function () {
              return "development" === Y.NODE_ENV;
            };
          })()),
      Ui = S.inited
        ? S.module.envIsElectron
        : (S.module.envIsElectron = (function () {
            "use strict";
            return function () {
              return L(se, "electron") || ki();
            };
          })()),
      qi = S.inited
        ? S.module.envIsElectronRenderer
        : (S.module.envIsElectronRenderer = (function () {
            "use strict";
            return function () {
              return "renderer" === ne && Ui();
            };
          })()),
      Wi = S.inited
        ? S.module.envIsPrint
        : (S.module.envIsPrint = (function () {
            "use strict";
            return function () {
              return 1 === z.length && fi().print && Vi();
            };
          })()),
      zi = S.inited
        ? S.module.envIsEval
        : (S.module.envIsEval = (function () {
            "use strict";
            return function () {
              if (Wi()) return !0;
              if (1 !== z.length || !Vi()) return !1;
              var e = fi();
              return e.eval || (!ie.isTTY && !e.interactive);
            };
          })()),
      Hi = S.inited
        ? S.module.envIsJamine
        : (S.module.envIsJamine = (function () {
            "use strict";
            var e = b.PACKAGE_PARENT_NAME;
            return function () {
              return "jasmine" === e;
            };
          })()),
      Ki = S.inited
        ? S.module.envIsNdb
        : (S.module.envIsNdb = (function () {
            "use strict";
            return function () {
              return L(se, "ndb");
            };
          })()),
      Xi = S.inited
        ? S.module.envIsNyc
        : (S.module.envIsNyc = (function () {
            "use strict";
            return function () {
              return L(Y, "NYC_ROOT_ID");
            };
          })()),
      Ji = S.inited
        ? S.module.envIsREPL
        : (S.module.envIsREPL = (function () {
            "use strict";
            return function () {
              return (
                1 === z.length &&
                (!!Vi() ||
                  ("<repl>" === ji.id &&
                    null === ji.filename &&
                    !1 === ji.loaded &&
                    null == ji.parent &&
                    Oi(ji.children)))
              );
            };
          })()),
      Yi = S.inited
        ? S.module.envIsRunkit
        : (S.module.envIsRunkit = (function () {
            "use strict";
            return function () {
              return L(Y, "RUNKIT_HOST");
            };
          })()),
      Qi = S.inited
        ? S.module.envIsTink
        : (S.module.envIsTink = (function () {
            "use strict";
            var e = b.PACKAGE_PARENT_NAME;
            return function () {
              return "tink" === e;
            };
          })()),
      Zi = S.inited
        ? S.module.envIsYarnPnP
        : (S.module.envIsYarnPnP = (function () {
            "use strict";
            return function () {
              return L(se, "pnp");
            };
          })()),
      en = {};
    f(en, "BRAVE", ki),
      f(en, "CHECK", Gi),
      f(en, "CLI", $i),
      f(en, "DEVELOPMENT", Bi),
      f(en, "ELECTRON", Ui),
      f(en, "ELECTRON_RENDERER", qi),
      f(en, "EVAL", zi),
      f(en, "FLAGS", fi),
      f(en, "HAS_INSPECTOR", _i),
      f(en, "INTERNAL", Ti),
      f(en, "JASMINE", Hi),
      f(en, "NDB", Ki),
      f(en, "NYC", Xi),
      f(en, "OPTIONS", Pi),
      f(en, "PRELOADED", Vi),
      f(en, "PRINT", Wi),
      f(en, "REPL", Ji),
      f(en, "RUNKIT", Yi),
      f(en, "TINK", Qi),
      f(en, "WIN32", mi),
      f(en, "YARN_PNP", Zi);
    var tn = en,
      rn = S.inited
        ? S.module.fsStatSync
        : (S.module.fsStatSync = (function () {
            "use strict";
            var e = tn.ELECTRON,
              t = Yr.prototype;
            return function (r) {
              if ("string" != typeof r) return null;
              var i,
                n = S.moduleState.statSync;
              if (null !== n && ((i = n.get(r)), void 0 !== i)) return i;
              try {
                (i = Qr(r)), !e || i instanceof Yr || U(i, t);
              } catch (e) {
                i = null;
              }
              return null !== n && n.set(r, i), i;
            };
          })()),
      nn = S.inited
        ? S.module.pathToNamespacedPath
        : (S.module.pathToNamespacedPath = (function () {
            "use strict";
            return "function" == typeof Se ? Se : Ie._makeLong;
          })()),
      sn = S.inited
        ? S.module.fsStatFast
        : (S.module.fsStatFast = (function () {
            "use strict";
            var e,
              t = Yr.prototype.isFile;
            return function (r) {
              if ("string" != typeof r) return -1;
              var i,
                n = S.moduleState.statFast;
              return (
                (null !== n && ((i = n.get(r)), void 0 !== i)) ||
                  ((i = (function (r) {
                    if (
                      (void 0 === e &&
                        (e = "function" == typeof oe.fs.internalModuleStat),
                      e)
                    ) {
                      try {
                        return (function (e) {
                          // HERE IS THE BUG
                          var t =
                            "string" == typeof e
                              ? oe.fs.internalModuleStat(nn(e))
                              // ? oe.fs.internalModuleStat(oe.fs, nn(e))
                              : -1;
                          return t < 0 ? -1 : t;
                        })(r);
                      } catch (e) {
                      }
                      e = !1;
                    }
                    return (function (e) {
                      var r = rn(e);
                      return null !== r
                        ? Reflect.apply(t, r, [])
                          ? 0
                          : 1
                        : -1;
                    })(r);
                  })(r)),
                  null !== n && n.set(r, i)),
                i
              );
            };
          })()),
      an = S.inited
        ? S.module.fsExists
        : (S.module.fsExists = (function () {
            "use strict";
            return function (e) {
              return -1 !== sn(e);
            };
          })()),
      on = S.inited
        ? S.module.utilGetCachePathHash
        : (S.module.utilGetCachePathHash = (function () {
            "use strict";
            return function (e) {
              return "string" == typeof e ? e.slice(0, 8) : "";
            };
          })()),
      un = S.inited
        ? S.module.pathIsExtMJS
        : (S.module.pathIsExtMJS = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e) return !1;
              var t = e.length;
              return (
                t > 4 &&
                109 === e.charCodeAt(t - 3) &&
                46 === e.charCodeAt(t - 4) &&
                106 === e.charCodeAt(t - 2) &&
                115 === e.charCodeAt(t - 1)
              );
            };
          })()),
      ln = S.inited
        ? S.module.utilGet
        : (S.module.utilGet = (function () {
            "use strict";
            return function (e, t, r) {
              if (null != e)
                try {
                  return void 0 === r ? e[t] : Reflect.get(e, t, r);
                } catch (e) {}
            };
          })()),
      cn = S.inited
        ? S.module.utilGetEnv
        : (S.module.utilGetEnv = (function () {
            "use strict";
            return function (e) {
              return ln(N.env, e);
            };
          })()),
      pn = S.inited
        ? S.module.utilIsDirectory
        : (S.module.utilIsDirectory = (function () {
            "use strict";
            return function (e) {
              return 1 === sn(e);
            };
          })()),
      hn = S.inited
        ? S.module.fsMkdir
        : (S.module.fsMkdir = (function () {
            "use strict";
            return function (e) {
              if ("string" == typeof e)
                try {
                  return Hr(e), !0;
                } catch (e) {}
              return !1;
            };
          })()),
      fn = S.inited
        ? S.module.fsMkdirp
        : (S.module.fsMkdirp = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e) return !1;
              for (var t = []; !pn(e); ) {
                t.push(e);
                var r = ye(e);
                if (e === r) break;
                e = r;
              }
              for (var i = t.length; i--; ) if (!hn(t[i])) return !1;
              return !0;
            };
          })()),
      dn = S.inited
        ? S.module.utilParseJSON
        : (S.module.utilParseJSON = (function () {
            "use strict";
            return function (e) {
              if ("string" == typeof e && e.length)
                try {
                  return JSON.parse(e);
                } catch (e) {}
              return null;
            };
          })()),
      mn = S.inited
        ? S.module.pathNormalize
        : (S.module.pathNormalize = (function () {
            "use strict";
            var e = mi(),
              t = /\\/g;
            return e
              ? function (e) {
                  return "string" == typeof e ? e.replace(t, "/") : "";
                }
              : function (e) {
                  return "string" == typeof e ? e : "";
                };
          })()),
      vn = S.inited
        ? S.module.pathRelative
        : (S.module.pathRelative = (function () {
            "use strict";
            var e = mi();
            return e
              ? function (e, t) {
                  for (
                    var r = e.length,
                      i = t.length,
                      n = e.toLowerCase(),
                      s = t.toLowerCase(),
                      a = -1;
                    ++a < r && 92 === e.charCodeAt(a);

                  );
                  for (
                    var o = r - a, u = -1;
                    ++u < i && 92 === t.charCodeAt(u);

                  );
                  for (
                    var l = i - u, c = o < l ? o : l, p = -1, h = -1;
                    ++p <= c;

                  ) {
                    if (p === c) {
                      if (l > c) {
                        if (92 === t.charCodeAt(u + p))
                          return t.slice(u + p + 1);
                        if (2 === p) return t.slice(u + p);
                      }
                      o > c &&
                        (92 === e.charCodeAt(a + p)
                          ? (h = p)
                          : 2 === p && (h = 3));
                      break;
                    }
                    var f = n.charCodeAt(a + p),
                      d = s.charCodeAt(u + p);
                    if (f !== d) break;
                    92 === f && (h = p);
                  }
                  if (p !== c && -1 === h) return t;
                  var m = "";
                  for (-1 === h && (h = 0), p = a + h; ++p <= r; )
                    (p !== r && 92 !== e.charCodeAt(p)) ||
                      (m += 0 === m.length ? ".." : "/..");
                  return m.length > 0
                    ? m + mn(t.slice(u + h))
                    : ((u += h), 92 === t.charCodeAt(u) && ++u, mn(t.slice(u)));
                }
              : function (e, t) {
                  for (
                    var r = e.length,
                      i = r - 1,
                      n = 1,
                      s = t.length,
                      a = s - n,
                      o = i < a ? i : a,
                      u = -1,
                      l = -1;
                    ++u <= o;

                  ) {
                    if (u === o) {
                      if (a > o) {
                        if (47 === t.charCodeAt(n + u))
                          return t.slice(n + u + 1);
                        if (0 === u) return t.slice(n + u);
                      } else
                        i > o &&
                          (47 === e.charCodeAt(1 + u)
                            ? (l = u)
                            : 0 === u && (l = 0));
                      break;
                    }
                    var c = e.charCodeAt(1 + u),
                      p = t.charCodeAt(n + u);
                    if (c !== p) break;
                    47 === c && (l = u);
                  }
                  var h = "";
                  for (u = 1 + l; ++u <= r; )
                    (u !== r && 47 !== e.charCodeAt(u)) ||
                      (h += 0 === h.length ? ".." : "/..");
                  return 0 !== h.length
                    ? h + t.slice(n + l)
                    : ((n += l), 47 === t.charCodeAt(n) && ++n, t.slice(n));
                };
          })()),
      gn = S.inited
        ? S.module.fsRemoveFile
        : (S.module.fsRemoveFile = (function () {
            "use strict";
            return function (e) {
              if ("string" == typeof e)
                try {
                  return Zr(e), !0;
                } catch (e) {}
              return !1;
            };
          })()),
      yn = S.inited
        ? S.module.fsWriteFile
        : (S.module.fsWriteFile = (function () {
            "use strict";
            return function (e, t, r) {
              if ("string" == typeof e)
                try {
                  return ei(e, t, r), !0;
                } catch (e) {}
              return !1;
            };
          })()),
      xn = S.inited
        ? S.module.CachingCompiler
        : (S.module.CachingCompiler = (function () {
            "use strict";
            var e = b.PACKAGE_VERSION,
              t = {
                compile: (e, t = {}) =>
                  !t.eval && t.filename && t.cachePath
                    ? (function (e, t) {
                        var i = t.cacheName,
                          n = t.cachePath,
                          s = r(e, t);
                        if (!i || !n || 0 === s.transforms) return s;
                        var a = S.pendingWrites,
                          o = a.get(n);
                        return (
                          void 0 === o && ((o = new Map()), a.set(n, o)),
                          o.set(i, s),
                          s
                        );
                      })(e, t)
                    : r(e, t),
                from(e) {
                  var t = e.package,
                    r = t.cache,
                    i = e.cacheName,
                    s = r.meta.get(i);
                  if (void 0 === s) return null;
                  var a = s.length,
                    o = {
                      circular: 0,
                      code: null,
                      codeWithTDZ: null,
                      filename: null,
                      firstAwaitOutsideFunction: null,
                      firstReturnOutsideFunction: null,
                      mtime: -1,
                      scriptData: null,
                      sourceType: 1,
                      transforms: 0,
                      yieldIndex: -1,
                    };
                  if (a > 2) {
                    var u = s[7];
                    "string" == typeof u && (o.filename = we(t.cachePath, u));
                    var l = s[5];
                    null !== l && (o.firstAwaitOutsideFunction = n(l));
                    var c = s[6];
                    null !== c && (o.firstReturnOutsideFunction = n(c)),
                      (o.mtime = +s[3]),
                      (o.sourceType = +s[4]),
                      (o.transforms = +s[2]);
                  }
                  a > 7 &&
                    2 === o.sourceType &&
                    ((e.type = 3),
                    (o.circular = +s[8]),
                    (o.yieldIndex = +s[9]));
                  var p = s[0],
                    h = s[1];
                  return (
                    -1 !== p &&
                      -1 !== h &&
                      (o.scriptData = qr.slice(r.buffer, p, h)),
                    (e.compileData = o),
                    r.compile.set(i, o),
                    o
                  );
                },
              };
            function r(e, t) {
              var r = Br.compile(
                e,
                (function (e = {}) {
                  var t = e.cjsPaths,
                    r = e.cjsVars,
                    i = e.topLevelReturn;
                  un(e.filename) && ((t = void 0), (r = void 0), (i = void 0));
                  var n = e.runtimeName;
                  return e.eval
                    ? {
                        cjsPaths: t,
                        cjsVars: r,
                        runtimeName: n,
                        topLevelReturn: !0,
                      }
                    : {
                        cjsPaths: t,
                        cjsVars: r,
                        generateVarDeclarations: e.generateVarDeclarations,
                        hint: e.hint,
                        pragmas: e.pragmas,
                        runtimeName: n,
                        sourceType: e.sourceType,
                        strict: e.strict,
                        topLevelReturn: i,
                      };
                })(t),
              );
              return (
                t.eval || ((r.filename = t.filename), (r.mtime = t.mtime)), r
              );
            }
            function i({ column: e, line: t }) {
              return [e, t];
            }
            function n([e, t]) {
              return { column: e, line: t };
            }
            return (
              re(Z() + 1),
              ee(
                "exit",
                ue(function () {
                  re(Math.max(Z() - 1, 0));
                  var t = S.pendingScripts,
                    r = S.pendingWrites,
                    n = S.package.dir;
                  n.forEach(function (e, i) {
                    if ("" !== i) {
                      var s,
                        a = !fn(i),
                        o = e.dirty;
                      o ||
                        a ||
                        ((o = !!dn(cn("ESM_DISABLE_CACHE"))), (e.dirty = o)),
                        (o || a) && (n.delete(i), t.delete(i), r.delete(i)),
                        a ||
                          (o &&
                            ((s = i + Re + ".dirty"),
                            an(s) || yn(s, ""),
                            gn(i + Re + ".data.blob"),
                            gn(i + Re + ".data.json"),
                            e.compile.forEach(function (e, t) {
                              gn(i + Re + t);
                            })));
                    }
                  });
                  var s = new Map(),
                    a = S.support.createCachedData;
                  t.forEach(function (e, t) {
                    var r = n.get(t),
                      i = r.compile,
                      o = r.meta;
                    e.forEach(function (e, r) {
                      var n,
                        u = i.get(r);
                      void 0 === u && (u = null),
                        null !== u &&
                          ((n = u.scriptData), null === n && (n = void 0));
                      var l = !1,
                        c = null;
                      if (
                        (void 0 === n &&
                          (a && "function" == typeof e.createCachedData
                            ? (c = e.createCachedData())
                            : e.cachedDataProduced && (c = e.cachedData)),
                        null !== c && c.length && (l = !0),
                        null !== u)
                      )
                        if (null !== c) u.scriptData = c;
                        else if (void 0 !== n && e.cachedDataRejected) {
                          l = !0;
                          var p = o.get(r);
                          void 0 !== p && ((p[0] = -1), (p[1] = -1)),
                            (c = null),
                            (u.scriptData = null);
                        }
                      if (l && "" !== r) {
                        var h = s.get(t);
                        void 0 === h && ((h = new Map()), s.set(t, h)),
                          h.set(r, c);
                      }
                    });
                  }),
                    s.forEach(function (t, r) {
                      var s = n.get(r),
                        a = s.compile,
                        o = s.meta;
                      t.forEach(function (e, t) {
                        var n = o.get(t);
                        if (void 0 === n) {
                          n = [-1, -1];
                          var s = a.get(t);
                          if ((void 0 === s && (s = null), null !== s)) {
                            var u = s,
                              l = u.filename,
                              c = u.firstAwaitOutsideFunction,
                              p = u.firstReturnOutsideFunction,
                              h = u.mtime,
                              f = u.sourceType,
                              d = u.transforms,
                              m = null === c ? null : i(c),
                              v = null === p ? null : i(p);
                            1 === f
                              ? 0 !== d && n.push(d, h, f, m, v, vn(r, l))
                              : n.push(
                                  d,
                                  h,
                                  f,
                                  m,
                                  v,
                                  vn(r, l),
                                  s.circular,
                                  s.yieldIndex,
                                );
                          }
                          o.set(t, n);
                        }
                      });
                      var u = s.buffer,
                        l = [],
                        c = {},
                        p = 0;
                      o.forEach(function (e, r) {
                        var i = t.get(r);
                        if (void 0 === i) {
                          var n = a.get(r);
                          void 0 === n && (n = null);
                          var s = e[0],
                            o = e[1];
                          (i = null),
                            null !== n
                              ? (i = n.scriptData)
                              : -1 !== s && -1 !== o && (i = qr.slice(u, s, o));
                        }
                        null !== i &&
                          ((e[0] = p), (p += i.length), (e[1] = p), l.push(i)),
                          (c[r] = e);
                      }),
                        yn(r + Re + ".data.blob", qr.concat(l)),
                        yn(
                          r + Re + ".data.json",
                          JSON.stringify({ meta: c, version: e }),
                        );
                    }),
                    r.forEach(function (e, t) {
                      e.forEach(function (e, r) {
                        yn(t + Re + r, e.code) &&
                          (function (e, t) {
                            var r = S.package.dir.get(e),
                              i = r.compile,
                              n = r.meta,
                              s = on(t);
                            i.forEach(function (r, a) {
                              a !== t &&
                                a.startsWith(s) &&
                                (i.delete(a), n.delete(a), gn(e + Re + a));
                            });
                          })(t, r);
                      });
                    });
                }),
              ),
              t
            );
          })()),
      bn = S.inited
        ? S.module.SafeArray
        : (S.module.SafeArray = q(S.external.Array)),
      En = S.inited
        ? S.module.GenericArray
        : (S.module.GenericArray = (function () {
            "use strict";
            var e = Array.prototype,
              t = bn.prototype;
            return {
              concat: I(t.concat),
              from: bn.from,
              indexOf: I(e.indexOf),
              join: I(e.join),
              of: bn.of,
              push: I(e.push),
              unshift: I(e.unshift),
            };
          })()),
      wn = S.inited
        ? S.module.GenericObject
        : (S.module.GenericObject = (function () {
            "use strict";
            var e = S.external.Object;
            return {
              create: (t, r) => (
                null === r && (r = void 0),
                null === t || _(t)
                  ? Object.create(t, r)
                  : void 0 === r
                    ? new e()
                    : Object.defineProperties(new e(), r)
              ),
            };
          })()),
      Rn = S.inited
        ? S.module.RealModule
        : (S.module.RealModule = fe(A("module"))),
      Sn = S.inited ? S.module.SafeModule : (S.module.SafeModule = q(Rn)),
      In = S.inited
        ? S.module.SafeObject
        : (S.module.SafeObject = q(S.external.Object)),
      Pn = S.inited
        ? S.module.utilAssign
        : (S.module.utilAssign = (function () {
            "use strict";
            return function (e) {
              for (var t = arguments.length, r = 0; ++r < t; ) {
                var i = arguments[r];
                for (var n in i) L(i, n) && (e[n] = i[n]);
              }
              return e;
            };
          })()),
      An = S.inited
        ? S.module.utilDecodeURIComponent
        : (S.module.utilDecodeURIComponent = (function () {
            "use strict";
            var e = decodeURIComponent;
            return function (t) {
              return "string" == typeof t ? e(t) : "";
            };
          })()),
      Nn = S.inited
        ? S.module.realPunycode
        : (S.module.realPunycode = (function () {
            "use strict";
            if (Ni.has("punycode")) {
              var e = ce("punycode");
              return _(e) ? fe(e) : void 0;
            }
          })()),
      _n = S.inited ? S.module.safePunycode : (S.module.safePunycode = q(Nn)),
      kn = void 0 === _n ? void 0 : _n.toUnicode,
      Cn = S.inited ? S.module.realURL : (S.module.realURL = fe(A("url"))),
      On = S.inited ? S.module.safeURL : (S.module.safeURL = q(Cn)),
      Tn = On.URL,
      Ln = On.domainToUnicode,
      Mn = On.parse,
      Dn = S.inited
        ? S.module.utilDomainToUnicode
        : (S.module.utilDomainToUnicode = (function () {
            "use strict";
            var e = "function" == typeof Ln ? Ln : kn;
            return function (t) {
              return "string" == typeof t ? e(t) : "";
            };
          })()),
      Fn = S.inited
        ? S.module.pathHasEncodedSep
        : (S.module.pathHasEncodedSep = (function () {
            "use strict";
            var e = tn.WIN32,
              t = /%2f/i,
              r = /%5c|%2f/i;
            return function (i) {
              return "string" == typeof i && (e ? r.test(i) : t.test(i));
            };
          })()),
      jn = S.inited
        ? S.module.utilParseURL
        : (S.module.utilParseURL = (function () {
            "use strict";
            var e = "function" == typeof Tn,
              t = [
                "hash",
                "host",
                "hostname",
                "href",
                "pathname",
                "port",
                "protocol",
                "search",
              ];
            return function (r) {
              var i = S.memoize.utilParseURL,
                n = i.get(r);
              return (
                void 0 !== n ||
                  ("string" == typeof r &&
                    r.length > 1 &&
                    47 === r.charCodeAt(0) &&
                    47 === r.charCodeAt(1) &&
                    (r = "file:" + r),
                  (n = e
                    ? new Tn(r)
                    : (function (e) {
                        for (
                          var r = Mn(e), i = 0, n = null == t ? 0 : t.length;
                          i < n;
                          i++
                        ) {
                          var s = t[i];
                          "string" != typeof r[s] && (r[s] = "");
                        }
                        return r;
                      })(r)),
                  i.set(r, n)),
                n
              );
            };
          })()),
      Vn = S.inited
        ? S.module.utilGetFilePathFromURL
        : (S.module.utilGetFilePathFromURL = (function () {
            "use strict";
            var e = tn.WIN32;
            return function (t) {
              var r = "string" == typeof t ? jn(t) : t,
                i = r.pathname;
              if ("" === i || "file:" !== r.protocol || Fn(i)) return "";
              var n = r.host;
              if (((i = An(i)), "" !== n && "localhost" !== n))
                return e ? "\\\\" + Dn(n) + Ee(i) : "";
              if (!e) return i;
              if (i.length < 3 || 58 !== i.charCodeAt(2)) return "";
              var s = i.charCodeAt(1);
              return ((s >= 65 && s <= 90) || (s >= 97 && s <= 122)) &&
                47 === i.charCodeAt(3)
                ? Ee(i).slice(1)
                : "";
            };
          })()),
      Gn = S.inited
        ? S.module.utilIsFileOrigin
        : (S.module.utilIsFileOrigin = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e) return !1;
              var t = e.length;
              return (
                t > 7 &&
                102 === e.charCodeAt(0) &&
                105 === e.charCodeAt(1) &&
                108 === e.charCodeAt(2) &&
                101 === e.charCodeAt(3) &&
                58 === e.charCodeAt(4) &&
                47 === e.charCodeAt(5) &&
                47 === e.charCodeAt(6)
              );
            };
          })()),
      $n = S.inited
        ? S.module.utilGetModuleDirname
        : (S.module.utilGetModuleDirname = (function () {
            "use strict";
            return function (e) {
              if (V(e)) {
                var t = e.path;
                if ("string" == typeof t) return t;
                var r = e.id;
                if (Ni.has(r)) return "";
                var i = e.filename;
                if (
                  (null === i &&
                    "string" == typeof r &&
                    (i = Gn(r) ? Vn(r) : r),
                  "string" == typeof i)
                )
                  return ye(i);
              }
              return ".";
            };
          })()),
      Bn = S.inited
        ? S.module.pathIsExtNode
        : (S.module.pathIsExtNode = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e) return !1;
              var t = e.length;
              return (
                t > 5 &&
                110 === e.charCodeAt(t - 4) &&
                46 === e.charCodeAt(t - 5) &&
                111 === e.charCodeAt(t - 3) &&
                100 === e.charCodeAt(t - 2) &&
                101 === e.charCodeAt(t - 1)
              );
            };
          })()),
      Un = S.inited
        ? S.module.utilCopyProperty
        : (S.module.utilCopyProperty = (function () {
            "use strict";
            return function (e, t, r) {
              if (!_(e) || !_(t)) return e;
              var i = Reflect.getOwnPropertyDescriptor(t, r);
              return (
                void 0 !== i &&
                  (G(i) ? (e[r] = t[r]) : Reflect.defineProperty(e, r, i)),
                e
              );
            };
          })()),
      qn = S.inited
        ? S.module.utilIsError
        : (S.module.utilIsError = (function () {
            "use strict";
            var e = ui.types;
            if ("function" == typeof (e && e.isNativeError))
              return e.isNativeError;
            var t = oe.util.isNativeError;
            return "function" == typeof t ? t : ui.isError;
          })()),
      Wn = S.inited
        ? S.module.errorCaptureStackTrace
        : (S.module.errorCaptureStackTrace = (function () {
            "use strict";
            var e = Error.captureStackTrace;
            return function (t, r) {
              return qn(t) && ("function" == typeof r ? e(t, r) : e(t)), t;
            };
          })()),
      zn = S.inited
        ? S.module.utilNativeTrap
        : (S.module.utilNativeTrap = (function () {
            "use strict";
            return function (e) {
              return function t(...r) {
                try {
                  return Reflect.apply(e, this, r);
                } catch (e) {
                  throw (Wn(e, t), e);
                }
              };
            };
          })()),
      Hn = S.inited
        ? S.module.utilEmptyArray
        : (S.module.utilEmptyArray = (function () {
            "use strict";
            return [];
          })()),
      Kn = S.inited
        ? S.module.utilEmptyObject
        : (S.module.utilEmptyObject = (function () {
            "use strict";
            return {};
          })()),
      Xn = S.inited
        ? S.module.utilIsOwnProxy
        : (S.module.utilIsOwnProxy = (function () {
            "use strict";
            var e = b.PACKAGE_PREFIX,
              t = RegExp(
                "[\\[\"']" + Rr(e) + ":proxy['\"\\]]\\s*:\\s*1\\s*\\}\\s*.?$",
              ),
              r = {
                breakLength: 1 / 0,
                colors: !1,
                compact: !0,
                customInspect: !1,
                depth: 0,
                maxArrayLength: 0,
                showHidden: !1,
                showProxy: !0,
              },
              i = {
                breakLength: 1 / 0,
                colors: !1,
                compact: !0,
                customInspect: !1,
                depth: 1,
                maxArrayLength: 0,
                showHidden: !0,
                showProxy: !0,
              },
              n = 0;
            return function (e) {
              return (
                le.instances.has(e) ||
                (function (e) {
                  if (!S.support.inspectProxies || !_(e) || 1 != ++n) return !1;
                  var s;
                  try {
                    s = ai(e, r);
                  } finally {
                    n -= 1;
                  }
                  if (!s.startsWith("Proxy [")) return !1;
                  n += 1;
                  try {
                    s = ai(e, i);
                  } finally {
                    n -= 1;
                  }
                  return t.test(s);
                })(e)
              );
            };
          })()),
      Jn = S.inited
        ? S.module.utilUnwrapOwnProxy
        : (S.module.utilUnwrapOwnProxy = (function () {
            "use strict";
            return function (e) {
              if (!_(e)) return e;
              var t = S.memoize.utilUnwrapOwnProxy,
                r = t.get(e);
              if (void 0 !== r) return r;
              for (var i, n = le.instances, s = e; void 0 !== (i = n.get(s)); )
                s = i[0];
              return t.set(e, s), s;
            };
          })()),
      Yn = S.inited
        ? S.module.shimFunctionPrototypeToString
        : (S.module.shimFunctionPrototypeToString = (function () {
            "use strict";
            var e = S.proxyNativeSourceText,
              t = "" === e ? "function () { [native code] }" : e,
              r = {
                enable(r) {
                  var i = Reflect.getOwnPropertyDescriptor(r, "Function").value
                      .prototype,
                    n = S.memoize.shimFunctionPrototypeToString;
                  if (
                    (function (e, t) {
                      var r = t.get(e);
                      if (void 0 !== r) return r;
                      r = !0;
                      try {
                        var i = e.toString;
                        "function" == typeof i &&
                          (r =
                            Reflect.apply(i, new le(i, Kn), Hn) ===
                            Reflect.apply(i, i, Hn));
                      } catch (e) {
                        r = !1;
                      }
                      return t.set(e, r), r;
                    })(i, n)
                  )
                    return r;
                  var s = zn(function (r, i) {
                    "" !== e && Xn(i) && (i = Jn(i));
                    try {
                      return Reflect.apply(r, i, Hn);
                    } catch (e) {
                      if ("function" != typeof i) throw e;
                    }
                    if (Xn(i))
                      try {
                        return Reflect.apply(r, Jn(i), Hn);
                      } catch (e) {}
                    return t;
                  });
                  return (
                    Reflect.defineProperty(i, "toString", {
                      configurable: !0,
                      value: new le(i.toString, { apply: s }),
                      writable: !0,
                    }) && n.set(i, !0),
                    r
                  );
                },
              };
            return r;
          })());
    Yn.enable(S.safeGlobal);
    var Qn = function (e, t) {
        "use strict";
        if ("function" != typeof t) return e;
        var r = S.memoize.utilMaskFunction,
          i = r.get(e);
        if (void 0 !== i) return i.proxy;
        (i = r.get(t)), void 0 !== i && (t = i.source);
        var n = new le(e, {
            get: (e, t, r) =>
              "toString" !== t || L(e, "toString")
                ? (r === n && (r = e), Reflect.get(e, t, r))
                : i.toString,
          }),
          s = L(t, "prototype") ? t.prototype : void 0;
        if (_(s)) {
          var a = L(e, "prototype") ? e.prototype : void 0;
          _(a) ||
            ((a = wn.create()),
            Reflect.defineProperty(e, "prototype", { value: a, writable: !0 })),
            Reflect.defineProperty(a, "constructor", {
              configurable: !0,
              value: n,
              writable: !0,
            }),
            U(a, D(s));
        } else {
          var o = Reflect.getOwnPropertyDescriptor(t, "prototype");
          void 0 === o
            ? Reflect.deleteProperty(e, "prototype")
            : Reflect.defineProperty(e, "prototype", o);
        }
        return (
          Un(e, t, "name"),
          U(e, D(t)),
          (i = {
            proxy: n,
            source: t,
            toString: new le(e.toString, {
              apply: zn(function (t, r, n) {
                return (
                  sc.state.package.default.options.debug ||
                    "function" != typeof r ||
                    Jn(r) !== e ||
                    (r = i.source),
                  Reflect.apply(t, r, n)
                );
              }),
            }),
          }),
          r.set(e, i),
          r.set(n, i),
          n
        );
      },
      Zn = S.inited
        ? S.module.utilIsModuleNamespaceObjectLike
        : (S.module.utilIsModuleNamespaceObjectLike = (function () {
            "use strict";
            return function (e) {
              if (!V(e) || null !== D(e)) return !1;
              var t = Reflect.getOwnPropertyDescriptor(e, Symbol.toStringTag);
              return (
                void 0 !== t &&
                !1 === t.configurable &&
                !1 === t.enumerable &&
                !1 === t.writable &&
                "Module" === t.value
              );
            };
          })()),
      es = S.inited
        ? S.module.utilIsProxyInspectable
        : (S.module.utilIsProxyInspectable = (function () {
            "use strict";
            return function (e) {
              return (
                !!_(e) &&
                ("function" == typeof e ||
                  Array.isArray(e) ||
                  Reflect.has(e, Symbol.toStringTag) ||
                  e === po.process.module.exports ||
                  "[object Object]" === ri(e))
              );
            };
          })()),
      ts = S.inited
        ? S.module.utilIsNativeLikeFunction
        : (S.module.utilIsNativeLikeFunction = (function () {
            "use strict";
            var e = Function.prototype.toString,
              t = RegExp(
                "^" +
                  Rr(e.call(e)).replace(
                    /toString|(function ).*?(?=\\\()/g,
                    "$1.*?",
                  ) +
                  "$",
              );
            return function (r) {
              if ("function" == typeof r)
                try {
                  return t.test(e.call(r));
                } catch (e) {}
              return !1;
            };
          })()),
      rs = S.inited
        ? S.module.utilIsProxy
        : (S.module.utilIsProxy = (function () {
            "use strict";
            if ("function" == typeof (oi && oi.isProxy)) return oi.isProxy;
            var e,
              t = {
                breakLength: 1 / 0,
                colors: !1,
                compact: !0,
                customInspect: !1,
                depth: 0,
                maxArrayLength: 0,
                showHidden: !1,
                showProxy: !0,
              };
            return function (r) {
              return (
                !!le.instances.has(r) ||
                (void 0 === e &&
                  (e = "function" == typeof oe.util.getProxyDetails),
                e
                  ? !!he(r)
                  : S.support.inspectProxies &&
                    _(r) &&
                    ai(r, t).startsWith("Proxy ["))
              );
            };
          })()),
      is = S.inited
        ? S.module.utilIsNativeFunction
        : (S.module.utilIsNativeFunction = (function () {
            "use strict";
            return function (e) {
              if (!ts(e)) return !1;
              var t = e.name;
              return !(
                ("string" == typeof t && t.startsWith("bound ")) ||
                rs(e)
              );
            };
          })()),
      ns = S.inited
        ? S.module.utilIsStackTraceMaskable
        : (S.module.utilIsStackTraceMaskable = (function () {
            "use strict";
            return function (e) {
              if (!qn(e)) return !1;
              var t = Reflect.getOwnPropertyDescriptor(e, "stack");
              return !(
                void 0 !== t &&
                !0 === t.configurable &&
                !1 === t.enumerable &&
                "function" == typeof t.get &&
                "function" == typeof t.set &&
                !is(t.get) &&
                !is(t.set)
              );
            };
          })()),
      ss = S.inited
        ? S.module.utilSetHiddenValue
        : (S.module.utilSetHiddenValue = (function () {
            "use strict";
            var e;
            return function (t, r, i) {
              if (
                (void 0 === e &&
                  (e = "function" == typeof oe.util.setHiddenValue),
                e &&
                  typeof r === S.utilBinding.hiddenKeyType &&
                  null != r &&
                  _(t))
              )
                try {
                  return oe.util.setHiddenValue(t, r, i);
                } catch (e) {}
              return !1;
            };
          })()),
      as = S.inited
        ? S.module.errorDecorateStackTrace
        : (S.module.errorDecorateStackTrace = (function () {
            "use strict";
            return function (e) {
              return qn(e) && ss(e, S.utilBinding.errorDecoratedSymbol, !0), e;
            };
          })()),
      os = S.inited
        ? S.module.utilEncodeURI
        : (S.module.utilEncodeURI = (function () {
            "use strict";
            var e = encodeURI;
            return function (t) {
              return "string" == typeof t ? e(t) : "";
            };
          })()),
      us = S.inited
        ? S.module.utilGetURLFromFilePath
        : (S.module.utilGetURLFromFilePath = (function () {
            "use strict";
            var e = /[?#]/g,
              t = new Map([
                ["#", "%23"],
                ["?", "%3F"],
              ]);
            function r(e) {
              return t.get(e);
            }
            return function (t) {
              var i = "string" == typeof t ? t.length : 0;
              if (0 === i) return "file:///";
              var n = t,
                s = i;
              (t = mn(we(t))),
                (t = os(t).replace(e, r)),
                (i = t.length),
                47 !== t.charCodeAt(i - 1) &&
                  vi(n.charCodeAt(s - 1)) &&
                  (t += "/");
              for (var a = -1; ++a < i && 47 === t.charCodeAt(a); );
              return (
                a > 1 ? (t = "/" + t.slice(a)) : 0 === a && (t = "/" + t),
                "file://" + t
              );
            };
          })()),
      ls = S.inited
        ? S.module.utilGetModuleURL
        : (S.module.utilGetModuleURL = (function () {
            "use strict";
            return function (e) {
              if ("string" == typeof e) return yi(e) ? us(e) : e;
              if (V(e)) {
                var t = e.filename,
                  r = e.id;
                if ("string" == typeof t) return us(t);
                if ("string" == typeof r) return r;
              }
              return "";
            };
          })()),
      cs = S.inited
        ? S.module.utilIsParseError
        : (S.module.utilIsParseError = (function () {
            "use strict";
            return function (e) {
              for (var t in Jt) if (e instanceof Jt[t]) return !0;
              return !1;
            };
          })()),
      ps = S.inited
        ? S.module.utilReplaceWithout
        : (S.module.utilReplaceWithout = (function () {
            "use strict";
            return function (e, t, r) {
              if ("string" != typeof e || "string" != typeof t) return e;
              var i = r(e.replace(t, "\u200dWITHOUT\u200d"));
              return "string" == typeof i
                ? i.replace("\u200dWITHOUT\u200d", function () {
                    return t;
                  })
                : e;
            };
          })()),
      hs = S.inited
        ? S.module.utilUntransformRuntime
        : (S.module.utilUntransformRuntime = (function () {
            "use strict";
            var e = /\w+\u200D\.a\("(.+?)",\1\)/g,
              t = /\w+\u200D\.t\("(.+?)"\)/g,
              r = /\(eval===(\w+\u200D)\.v\?\1\.c:\1\.k\)/g,
              i = /\(eval===(\w+\u200D)\.v\?\1\.e:eval\)/g,
              n = /\w+\u200D\.(\w+)(\.)?/g,
              s = /\w+\u200D\.b\("(.+?)","(.+?)",?/g;
            function a(e, t) {
              return t;
            }
            function o() {
              return "";
            }
            function u() {
              return "eval";
            }
            function l(e, t, r = "") {
              return "e" === t
                ? "eval" + r
                : "_" === t || "i" === t
                  ? "import" + r
                  : "r" === t
                    ? "require" + r
                    : "";
            }
            function c(e, t, r) {
              return "(" + t + r;
            }
            return function (p) {
              return "string" != typeof p
                ? ""
                : p
                    .replace(e, a)
                    .replace(t, a)
                    .replace(r, o)
                    .replace(i, u)
                    .replace(s, c)
                    .replace(n, l);
            };
          })()),
      fs = S.inited
        ? S.module.errorScrubStackTrace
        : (S.module.errorScrubStackTrace = (function () {
            "use strict";
            var e = b.PACKAGE_FILENAMES,
              t = /:1:\d+(?=\)?$)/gm,
              r = /(\n +at .+)+$/;
            return function (i) {
              if ("string" != typeof i) return "";
              var n = r.exec(i);
              if (null === n) return i;
              var s = n.index,
                a = i.slice(0, s),
                o = i
                  .slice(s)
                  .split("\n")
                  .filter(function (t) {
                    for (var r = 0, i = null == e ? 0 : e.length; r < i; r++) {
                      var n = e[r];
                      if (-1 !== t.indexOf(n)) return !1;
                    }
                    return !0;
                  })
                  .join("\n")
                  .replace(t, ":1");
              return a + hs(o);
            };
          })()),
      ds = S.inited
        ? S.module.utilToExternalError
        : (S.module.utilToExternalError = (function () {
            "use strict";
            var e = S.external,
              t = e.Error,
              r = e.EvalError,
              i = e.RangeError,
              n = e.ReferenceError,
              s = e.SyntaxError,
              a = e.TypeError,
              o = e.URIError,
              u = new Map([
                ["Error", t.prototype],
                ["EvalError", r.prototype],
                ["RangeError", i.prototype],
                ["ReferenceError", n.prototype],
                ["SyntaxError", s.prototype],
                ["TypeError", a.prototype],
                ["URIError", o.prototype],
              ]);
            return function (e) {
              if (e instanceof Error) {
                var t = D(e),
                  r = t.name,
                  i = u.get(r);
                void 0 !== i && U(e, i);
              }
              return e;
            };
          })()),
      ms = S.inited
        ? S.module.errorMaskStackTrace
        : (S.module.errorMaskStackTrace = (function () {
            "use strict";
            var e = /^(.+)\n( *\^+)\n(\n)?/m,
              t = /^( *at (?:.+? \()?)(.+?)(?=:\d+)/gm,
              r = /^\s*$/,
              i = /^(.+?):(\d+)(?=\n)/;
            function n(e, t, r) {
              return t + ls(r);
            }
            function s(e, t, r) {
              return ls(t) + ":" + r;
            }
            function a(e) {
              try {
                return Cr(ln(e, "name")) + ": " + Cr(ln(e, "message"));
              } catch (e) {}
              return "";
            }
            return function (o, u = {}) {
              if (!qn(o)) return o;
              var l,
                c,
                p = u.content,
                h = u.filename,
                f = u.inModule,
                d = cs(o);
              d &&
                ((l = o.column),
                (c = o.line),
                void 0 === f && (f = o.inModule),
                Reflect.deleteProperty(o, "column"),
                Reflect.deleteProperty(o, "inModule"),
                Reflect.deleteProperty(o, "line")),
                ds(o);
              var m = ln(o, "stack");
              if ("string" != typeof m) return o;
              var v = a(o);
              return (
                Reflect.defineProperty(o, "stack", {
                  configurable: !0,
                  get: ue(function () {
                    this.stack = "";
                    var o = Cr(ln(this, "message")),
                      u = Cr(ln(this, "name")),
                      g = a(this),
                      y = m.replace(v, function () {
                        return g;
                      });
                    y = d
                      ? (function (e, t, i, n, s, a, o) {
                          var u = [0, 1];
                          if (
                            ("string" == typeof o &&
                              (u.push(o + ":" + n),
                              "string" != typeof a && (a = Ii(o, "utf8"))),
                            "string" == typeof a)
                          ) {
                            var l = a.split("\n"),
                              c = n - 1;
                            if (c < l.length) {
                              var p = "^";
                              i.startsWith("Export '") &&
                                (p = p.repeat(i.indexOf("'", 8) - 8));
                              var h = l[c];
                              r.test(h) || u.push(h, " ".repeat(s) + p, "");
                            }
                          }
                          var f = e.split("\n");
                          return (
                            u.push(t + ": " + i), f.splice(...u), f.join("\n")
                          );
                        })(y, u, o, c, l, p, h)
                      : (function (t, r, n) {
                          var s = i.exec(t);
                          if (null === s)
                            return "string" == typeof n ? n + ":1\n" + t : t;
                          var a,
                            o,
                            u = s[0],
                            l = s[1],
                            c = +s[2],
                            p = l !== n && yi(l);
                          if (!p)
                            if (
                              ("string" != typeof r &&
                                "string" == typeof n &&
                                ".wasm" !== xe(n) &&
                                (r = Ii(n, "utf8")),
                              "string" != typeof r || r.startsWith("\0asm"))
                            )
                              p = !0;
                            else {
                              var h = c - 1;
                              (a = r.split("\n")),
                                (o = h > -1 && h < a.length ? a[h] : "");
                            }
                          var f = !1;
                          if (
                            ((t = t.replace(e, function (e, t, r, i = "") {
                              if (
                                ((f = !0), p && (o = t), "string" != typeof o)
                              )
                                return "";
                              if (1 === c) {
                                var n = O(ec, "wrapper");
                                if (Array.isArray(n)) {
                                  var s = n[0];
                                  if ("string" == typeof s && t.startsWith(s)) {
                                    var a = s.length;
                                    (t = t.slice(a)), (r = r.slice(a));
                                  }
                                }
                              }
                              return t === o
                                ? o + "\n" + r + "\n" + i
                                : o + (o ? "\n\n" : "\n");
                            })),
                            f)
                          )
                            return t;
                          if (o && "string" == typeof o) {
                            var d = u.length;
                            t = t.slice(0, d) + "\n" + o + "\n" + t.slice(d);
                          }
                          return t;
                        })(y, p, h);
                    var x = f
                      ? function (e) {
                          return (function (e) {
                            return e.replace(i, s).replace(t, n);
                          })(fs(e));
                        }
                      : fs;
                    return (this.stack = ps(y, g, x));
                  }),
                  set: ue(function (e) {
                    Reflect.defineProperty(this, "stack", {
                      configurable: !0,
                      value: e,
                      writable: !0,
                    });
                  }),
                }),
                as(o),
                o
              );
            };
          })()),
      vs = function (e) {
        "use strict";
        var t = sc.state.package.default;
        return (null !== t && t.options.debug) || !ns(e) || ms(e), e;
      },
      gs = S.inited
        ? S.module.utilIsModuleNamespaceObject
        : (S.module.utilIsModuleNamespaceObject = (function () {
            "use strict";
            return function (e) {
              return V(e) && Reflect.has(e, S.symbol.namespace) && Xn(e);
            };
          })()),
      ys = S.inited
        ? S.module.utilIsUpdatableDescriptor
        : (S.module.utilIsUpdatableDescriptor = (function () {
            "use strict";
            return function (e) {
              return (
                V(e) &&
                (!0 === e.configurable || !0 === e.writable) &&
                L(e, "value")
              );
            };
          })()),
      xs = S.inited
        ? S.module.utilIsUpdatableGet
        : (S.module.utilIsUpdatableGet = (function () {
            "use strict";
            return function (e, t) {
              var r = Reflect.getOwnPropertyDescriptor(e, t);
              return (
                void 0 === r ||
                !0 === r.configurable ||
                !0 === r.writable ||
                "function" == typeof r.get
              );
            };
          })()),
      bs = S.inited
        ? S.module.utilOwnPropertyNames
        : (S.module.utilOwnPropertyNames = (function () {
            "use strict";
            return function (e) {
              return _(e) ? Object.getOwnPropertyNames(e) : [];
            };
          })()),
      Es = S.inited
        ? S.module.utilToRawModuleNamespaceObject
        : (S.module.utilToRawModuleNamespaceObject = (function () {
            "use strict";
            var e = { value: "Module" };
            return function (t) {
              var r = { __proto__: null };
              return Reflect.defineProperty(r, Symbol.toStringTag, e), Pn(r, t);
            };
          })()),
      ws = {},
      Rs = /\S/;
    function Ss(e, t) {
      "use strict";
      return {
        __proto__: null,
        [S.customInspectKey]: ue(function (r) {
          var i = Pn(wn.create(), t);
          return (i.depth = r), Cs(e, i);
        }),
      };
    }
    function Is(e, t) {
      "use strict";
      try {
        return Reflect.get(e, t);
      } catch (e) {}
      return ws;
    }
    function Ps(...e) {
      try {
        return Reflect.apply(ai, this, e);
      } catch (e) {}
      return "";
    }
    var As = function (...e) {
        var t = e[0],
          r = e[1],
          i = e[2];
        if (!_(t)) return Reflect.apply(ai, this, e);
        t = vs(t);
        var n = wn.create();
        "boolean" == typeof r ? (n.showHidden = !0) : Pn(n, r);
        var s = S.defaultInspectOptions,
          a = L(n, "customInspect") ? n.customInspect : s.customInspect,
          o = L(n, "showProxy") ? n.showProxy : s.showProxy;
        void 0 === i || L(n, "depth") || (n.depth = i), (e[0] = t), (e[1] = n);
        var u = Reflect.apply(Ps, this, e);
        return !es(t) || (-1 === u.indexOf("Proxy [") && !Zn(t))
          ? u
          : ((n.customInspect = a),
            (n.showProxy = o),
            (r = Pn(wn.create(), n)),
            (e[0] = (function e(t, r, i) {
              "use strict";
              if (!es(t)) return t;
              if (void 0 === i) i = new Map();
              else {
                var n = i.get(t);
                if (void 0 !== n) return n;
              }
              var s,
                a,
                o = !1,
                u = new le(t, {
                  get(e, t, i) {
                    i === u && (i = e);
                    var n = S.customInspectKey,
                      l = Reflect.get(e, t, i),
                      c = l;
                    return (
                      l !== Cs || (t !== n && "inspect" !== t)
                        ? o || t !== n
                          ? "toString" === t &&
                            "function" == typeof l &&
                            (c = P.bind(l, e))
                          : (c = ue(function (...t) {
                              o = !0;
                              var i = t[0],
                                n = t[1],
                                c = Pn(wn.create(), n),
                                p = r.showProxy;
                              (c.customInspect = r.customInspect),
                                (c.depth = i),
                                (c.showProxy = p);
                              try {
                                return e === ws
                                  ? c.colors
                                    ? (function (e, t) {
                                        var r = Cs.styles.special;
                                        if (void 0 === r)
                                          return "<uninitialized>";
                                        var i = Cs.colors[r],
                                          n = i[0],
                                          s = i[1];
                                        return (
                                          "\x1b[" +
                                          n +
                                          "m<uninitialized>\x1b[" +
                                          s +
                                          "m"
                                        );
                                      })()
                                    : "<uninitialized>"
                                  : gs(e)
                                    ? (function (e, t) {
                                        for (
                                          var r = bs(e),
                                            i = Es(),
                                            n = 0,
                                            s = null == r ? 0 : r.length;
                                          n < s;
                                          n++
                                        ) {
                                          var a = r[n];
                                          i[a] = Is(e, a);
                                        }
                                        var o = Cs(i, t),
                                          u = o.slice(0, o.search(Rs)),
                                          l = o.slice(
                                            o.indexOf("{"),
                                            o.lastIndexOf("}") + 1,
                                          );
                                        return u + "[Module] " + l;
                                      })(e, c)
                                    : (void 0 === a && (a = Xn(e)),
                                      void 0 === s && (s = rs(e)),
                                      p && s && !a
                                        ? (function (e, t) {
                                            var r = he(e),
                                              i = e;
                                            void 0 !== r &&
                                              (i = new Proxy(
                                                Ss(r[0], t),
                                                Ss(r[1], t),
                                              ));
                                            var n = Pn({}, t);
                                            return (
                                              (n.customInspect = !0), ai(i, n)
                                            );
                                          })(e, c)
                                        : ("function" != typeof l &&
                                            (c.customInspect = !0),
                                          (c.showProxy = !1),
                                          ai(u, c)));
                              } finally {
                                o = !1;
                              }
                            }))
                        : (c = ai),
                      c !== l && xs(e, t) ? c : vs(l)
                    );
                  },
                  getOwnPropertyDescriptor(t, n) {
                    var s = Reflect.getOwnPropertyDescriptor(t, n);
                    if (ys(s)) {
                      var a = s.value;
                      _(a) && (s.value = e(a, r, i));
                    }
                    return s;
                  },
                });
              return i.set(t, u), i.set(u, u), u;
            })(t, r)),
            (n.customInspect = !0),
            (n.showProxy = !1),
            Reflect.apply(ai, this, e));
      },
      Ns = S.inited
        ? S.module.utilProxyWrap
        : (S.module.utilProxyWrap = (function () {
            "use strict";
            return function (e, t) {
              return new le(e, {
                apply: (e, r, i) => Reflect.apply(t, r, [e, i]),
                construct: (e, r, i) => Reflect.construct(t, [e, r], i),
              });
            };
          })()),
      _s = S.inited
        ? S.module.utilToWrapper
        : (S.module.utilToWrapper = (function () {
            "use strict";
            return function (e) {
              return function (t, r) {
                return Reflect.apply(e, this, r);
              };
            };
          })()),
      ks = Ns(ui.inspect, _s(As)),
      Cs = ks;
    function Os(e) {
      "use strict";
      try {
        return JSON.stringify(e);
      } catch (e) {
        if (qn(e)) {
          if (
            "TypeError" === ln(e, "name") &&
            ln(e, "message") === S.circularErrorMessage
          )
            return "[Circular]";
          ds(e);
        }
        throw e;
      }
    }
    var Ts,
      Ls = function (e, ...t) {
        var r = t[0],
          i = t.length,
          n = 0,
          s = "",
          a = "";
        if ("string" == typeof r) {
          if (1 === i) return r;
          for (var o, u, l = r.length, c = l - 1, p = -1, h = 0; ++p < c; )
            if (37 === r.charCodeAt(p)) {
              var f = r.charCodeAt(++p);
              if (n + 1 !== i) {
                var d = void 0;
                switch (f) {
                  case 115:
                    var m = t[++n];
                    "bigint" == typeof m
                      ? (d = m + "n")
                      : V(m)
                        ? (void 0 === u &&
                            (u = Pn({}, e, {
                              breakLength: 120,
                              colors: !1,
                              compact: !0,
                              depth: 0,
                            })),
                          (d = As(m, u)))
                        : (d = m + "");
                    break;
                  case 106:
                    d = Os(t[++n]);
                    break;
                  case 100:
                    var v = t[++n],
                      g = typeof v;
                    d =
                      "bigint" === g
                        ? v + "n"
                        : "symbol" === g
                          ? "NaN"
                          : Number(v) + "";
                    break;
                  case 79:
                    d = As(t[++n], e);
                    break;
                  case 111:
                    void 0 === o &&
                      (o = Pn({}, e, {
                        depth: 4,
                        showHidden: !0,
                        showProxy: !0,
                      })),
                      (d = As(t[++n], o));
                    break;
                  case 105:
                    var y = t[++n],
                      x = typeof y;
                    d =
                      "bigint" === x
                        ? y + "n"
                        : "symbol" === x
                          ? "NaN"
                          : parseInt(y) + "";
                    break;
                  case 102:
                    var b = t[++n];
                    d = "symbol" == typeof b ? "NaN" : parseFloat(b) + "";
                    break;
                  case 37:
                    (a += r.slice(h, p)), (h = p + 1);
                }
                h !== p - 1 && (a += r.slice(h, p - 1)), (a += d), (h = p + 1);
              } else 37 === f && ((a += r.slice(h, p)), (h = p + 1));
            }
          0 !== h && (++n, (s = " "), h < l && (a += r.slice(h)));
        }
        for (; n < i; ) {
          var E = t[n];
          (a += s + ("string" == typeof E ? E : As(E, e))), (s = " "), ++n;
        }
        return a;
      },
      Ms = function (...e) {
        return Ls(Kn, ...e);
      },
      Ds = ui.formatWithOptions,
      Fs = ui.types;
    if (_(Fs)) {
      Ts = wn.create();
      for (
        var js = Ns(Fs.isModuleNamespaceObject, _s(gs)),
          Vs = Ns(Fs.isProxy, function (e, [t]) {
            return e(t) && !Xn(t);
          }),
          Gs = F(Fs),
          $s = 0,
          Bs = null == Gs ? 0 : Gs.length;
        $s < Bs;
        $s++
      ) {
        var Us = Gs[$s];
        "isModuleNamespaceObject" === Us
          ? (Ts.isModuleNamespaceObject = js)
          : "isProxy" === Us
            ? (Ts.isProxy = Vs)
            : Un(Ts, Fs, Us);
      }
    }
    for (
      var qs = wn.create(), Ws = F(ui), zs = 0, Hs = null == Ws ? 0 : Ws.length;
      zs < Hs;
      zs++
    ) {
      var Ks = Ws[zs];
      "format" === Ks
        ? (qs.format = Ns(ui.format, _s(Ms)))
        : "formatWithOptions" === Ks
          ? "function" == typeof Ds && (qs.formatWithOptions = Ns(Ds, _s(Ls)))
          : "inspect" === Ks
            ? (qs.inspect = Cs)
            : "types" === Ks
              ? void 0 !== Ts && (qs.types = Ts)
              : Un(qs, ui, Ks);
    }
    var Xs = qs,
      Js = S.inited
        ? S.module.realConsole
        : (S.module.realConsole = fe(A("console"))),
      Ys = S.inited
        ? S.module.safeConsole
        : (S.module.safeConsole = (function () {
            "use strict";
            var e = q(Js),
              t = e.Console;
            return k(e, "Console", Qn(q(t), t)), e;
          })()),
      Qs = S.inited
        ? S.module.safeGlobalConsole
        : (S.module.safeGlobalConsole = q(r)),
      Zs = tn.ELECTRON_RENDERER,
      ea = tn.FLAGS,
      ta = tn.HAS_INSPECTOR,
      ra = Ys.Console,
      ia = ra.prototype,
      na = F(ia),
      sa = { customInspect: !0 },
      aa = (function (e) {
        "use strict";
        for (
          var t = ga(e.log, da),
            r = new Map([
              ["assert", ga(e.assert, ua)],
              ["debug", t],
              ["dir", ga(e.dir, ha)],
              ["dirxml", t],
              ["info", t],
              ["log", t],
              ["trace", ga(e.trace)],
              ["warn", ga(e.warn)],
            ]),
            i = T(e),
            n = 0,
            s = null == i ? 0 : i.length;
          n < s;
          n++
        ) {
          var a = i[n];
          if (fa(a) && !r.has(a)) {
            var o = e[a];
            "function" == typeof o && r.set(a, ga(o));
          }
        }
        return r;
      })(ia),
      oa = (function (e, t) {
        "use strict";
        for (var r = 0, i = null == e ? 0 : e.length; r < i; r++) {
          var n = e[r];
          if (t.test(Cr(n))) return n;
        }
      })(Object.getOwnPropertySymbols(Ys), /IsConsole/i);
    function ua(e, [t, ...r]) {
      return Reflect.apply(e, this, [t, ...va(r, ma)]);
    }
    function la() {
      "use strict";
      var e = (function (e) {
        try {
          return (function ({ stderr: e, stdout: t }) {
            var r = ba.prototype,
              i = Reflect.construct(
                ba,
                S.support.consoleOptions ? [{ stderr: e, stdout: t }] : [t, e],
              );
            U(i, wn.create());
            for (var n = 0, s = null == na ? 0 : na.length; n < s; n++) {
              var a = na[n];
              fa(a) && !L(i, a) && Un(i, r, a);
            }
            return i;
          })(e);
        } catch (e) {}
        return null;
      })(ae);
      if (null === e) return Js;
      if (ta && ea.inspect)
        for (
          var t = oe.inspector.consoleCall,
            r = S.originalConsole,
            i = "function" == typeof t,
            n = i ? {} : null,
            s = T(r),
            a = 0,
            o = null == s ? 0 : s.length;
          a < o;
          a++
        ) {
          var u = s[a];
          if (fa(u)) {
            var l = r[u];
            if ("function" == typeof l) {
              var c = e[u];
              i && "function" == typeof c && L(e, u)
                ? k(e, u, P.bind(t, void 0, l, c, n))
                : k(e, u, l);
            }
          }
        }
      else if (Zs)
        for (var p = T(Qs), h = 0, f = null == p ? 0 : p.length; h < f; h++) {
          var d = p[h];
          if (fa(d)) {
            var m = Qs[d];
            "function" == typeof m && k(e, d, m);
          }
        }
      for (var v = F(Ys), g = 0, y = null == v ? 0 : v.length; g < y; g++) {
        var x = v[g];
        fa(x) && !L(e, x) && Un(e, Ys, x);
      }
      return (e.Console = ba), e;
    }
    function ca(e) {
      "use strict";
      for (
        var t = T(e), r = new Map(), i = 0, n = null == t ? 0 : t.length;
        i < n;
        i++
      ) {
        var s = t[i],
          a = e[s],
          o = Qs[s];
        "function" != typeof a ||
          "function" != typeof o ||
          (fa(s) && !ts(o)) ||
          r.set(o, a);
      }
      return r;
    }
    function pa(e, t) {
      "use strict";
      return Reflect.apply(e, this, t);
    }
    function ha(e, [t, r]) {
      return Reflect.apply(e, this, [
        {
          [S.customInspectKey](e, i) {
            var n = Pn({}, i, r);
            return (
              (n.customInspect = !!L(r, "customInspect") && r.customInspect),
              (n.depth = e),
              Xs.inspect(t, n)
            );
          },
        },
        sa,
      ]);
    }
    function fa(e) {
      "use strict";
      return "Console" !== e && "constructor" !== e;
    }
    function da(e, t) {
      "use strict";
      return Reflect.apply(e, this, va(t, ma));
    }
    function ma(e) {
      "use strict";
      return V(e)
        ? {
            [S.customInspectKey](t, r) {
              var i = Pn({}, r);
              return (i.depth = t), Xs.inspect(e, i);
            },
          }
        : e;
    }
    function va(e, t) {
      "use strict";
      for (var r = e.length, i = -1; ++i < r; ) e[i] = t(e[i]);
      return e;
    }
    function ga(e, t = pa) {
      var r = {
        method(...r) {
          var i = S.defaultInspectOptions,
            n = i.customInspect;
          k(i, "customInspect", !0);
          try {
            return Reflect.apply(t, this, [e, r]);
          } finally {
            k(i, "customInspect", n);
          }
        },
      };
      return Qn(r.method, e);
    }
    "symbol" != typeof oa && (oa = Symbol("kIsConsole"));
    for (
      var ya,
        xa,
        ba = Qn(function (...e) {
          var t = new.target;
          if (void 0 === t) return Reflect.construct(ba, e);
          this[oa] = !0;
          for (
            var r = ba.prototype, i = T(r), n = 0, s = null == i ? 0 : i.length;
            n < s;
            n++
          ) {
            var a = i[n];
            if (fa(a)) {
              var o = this[a];
              "function" == typeof o && (this[a] = P.bind(o, this));
            }
          }
          for (
            var u = Reflect.construct(ra, e, t),
              l = F(u),
              c = 0,
              p = null == l ? 0 : l.length;
            c < p;
            c++
          ) {
            var h = l[c];
            fa(h) && !L(this, h) && Un(this, u, h);
          }
        }, ra),
        Ea = ba.prototype,
        wa = 0,
        Ra = null == na ? 0 : na.length;
      wa < Ra;
      wa++
    ) {
      var Sa = na[wa];
      if (fa(Sa)) {
        var Ia = aa.get(Sa);
        if (void 0 === Ia) Un(Ea, ia, Sa);
        else {
          var Pa = Reflect.getOwnPropertyDescriptor(ia, Sa);
          Reflect.defineProperty(Ea, Sa, {
            configurable: Pa.configurable,
            enumerable: Pa.enumerable,
            value: Ia,
            writable: !0 === Pa.writable || "function" == typeof Pa.set,
          });
        }
      }
    }
    Reflect.defineProperty(ba, Symbol.hasInstance, {
      value: ue(function (e) {
        return e[oa];
      }),
    });
    for (
      var Aa = new le(r, {
          get(e, t, r) {
            r === Aa && (r = e);
            var i = Reflect.get(e, t, r);
            if (xs(e, t)) {
              void 0 === ya && ((ya = la()), (xa = ca(ya)));
              var n = xa.get(i);
              if (void 0 !== n) return n;
            }
            return i;
          },
          getOwnPropertyDescriptor(e, t) {
            var r = Reflect.getOwnPropertyDescriptor(e, t);
            if (ys(r)) {
              void 0 === ya && ((ya = la()), (xa = ca(ya)));
              var i = xa.get(r.value);
              void 0 !== i && (r.value = i);
            }
            return r;
          },
        }),
        Na = Aa,
        _a = S.inited
          ? S.module.utilAssignProperties
          : (S.module.utilAssignProperties = (function () {
              "use strict";
              return function (e) {
                for (var t = arguments.length, r = 0; ++r < t; )
                  for (
                    var i = arguments[r],
                      n = F(i),
                      s = 0,
                      a = null == n ? 0 : n.length;
                    s < a;
                    s++
                  ) {
                    var o = n[s];
                    Un(e, i, o);
                  }
                return e;
              };
            })()),
        ka = S.inited
          ? S.module.realTimers
          : (S.module.realTimers = fe(A("timers"))),
        Ca = S.inited
          ? S.module.safeTimers
          : (S.module.safeTimers = (function () {
              "use strict";
              var e = tn.ELECTRON,
                t = q(ka);
              if (e) {
                var r = S.unsafeGlobal;
                k(t, "setImmediate", r.setImmediate),
                  k(t, "setInterval", r.setInterval),
                  k(t, "setTimeout", r.setTimeout);
              }
              return t;
            })()),
        Oa = Ca.setImmediate,
        Ta = Ca,
        La = S.inited
          ? S.module.builtinTimers
          : (S.module.builtinTimers = _a(wn.create(), Ta)),
        Ma = S.inited ? S.module.realVM : (S.module.realVM = fe(A("vm"))),
        Da = S.inited
          ? S.module.safeVM
          : (S.module.safeVM = (function () {
              "use strict";
              for (
                var e = q(Ma),
                  t = e.Script,
                  r = q(t),
                  i = r.prototype,
                  n = D(t.prototype),
                  s = j(n),
                  a = 0,
                  o = null == s ? 0 : s.length;
                a < o;
                a++
              ) {
                var u = s[a];
                L(i, u) || Un(i, n, u);
              }
              return U(i, n), k(e, "Script", r), e;
            })()),
        Fa = Da.Script,
        ja = Da,
        Va = S.inited
          ? S.module.builtinVM
          : (S.module.builtinVM = (function () {
              "use strict";
              for (
                var e = wn.create(),
                  t = F(ja),
                  r = 0,
                  i = null == t ? 0 : t.length;
                r < i;
                r++
              ) {
                var n = t[r];
                "Module" !== n && "SourceTextModule" !== n && Un(e, ja, n);
              }
              return e;
            })()),
        Ga = { __proto__: null },
        $a = S.memoize.builtinModules,
        Ba = function (e) {
          f(Ga, e, function () {
            "use strict";
            var t = $a.get(e);
            if (void 0 !== t) return t;
            var r = new ec(e);
            return (
              (r.exports = (function (e) {
                switch (e) {
                  case "console":
                    return Na;
                  case "module":
                    return ec;
                  case "timers":
                    return La;
                  case "util":
                    return Xs;
                  case "vm":
                    return Va;
                }
                return fe(A(e));
              })(e)),
              (r.loaded = !0),
              "console" !== e && "module" !== e && "util" !== e && $a.set(e, r),
              r
            );
          });
        },
        Ua = 0,
        qa = null == Ai ? 0 : Ai.length;
      Ua < qa;
      Ua++
    ) {
      var Wa = Ai[Ua];
      Ba(Wa);
    }
    for (
      var za = Ga,
        Ha = S.inited
          ? S.module.utilInstanceOf
          : (S.module.utilInstanceOf = (function () {
              "use strict";
              return function (e, t) {
                for (var r = t.prototype, i = e; null !== (i = D(i)); )
                  if (i === r) return !0;
                return !1;
              };
            })()),
        Ka = S.inited
          ? S.module.utilGetGetter
          : (S.module.utilGetGetter = (function () {
              "use strict";
              var e = Object.prototype.__lookupGetter__;
              return function (t, r) {
                var i = void 0 === r;
                if (i || !S.support.lookupShadowed) {
                  var n = i ? t : Reflect.getOwnPropertyDescriptor(t, r);
                  if (void 0 !== n) return n.get;
                  if (i) return;
                }
                return e.call(t, r);
              };
            })()),
        Xa = S.inited
          ? S.module.utilGetSetter
          : (S.module.utilGetSetter = (function () {
              "use strict";
              var e = Object.prototype.__lookupSetter__;
              return function (t, r) {
                var i = void 0 === r;
                if (i || !S.support.lookupShadowed) {
                  var n = i ? t : Reflect.getOwnPropertyDescriptor(t, r);
                  if (void 0 !== n) return n.set;
                  if (i) return;
                }
                return e.call(t, r);
              };
            })()),
        Ja = S.inited
          ? S.module.utilIsArrowFunction
          : (S.module.utilIsArrowFunction = (function () {
              "use strict";
              var e = Function.prototype.toString,
                t = /^[^=]*=>/;
              return function (r) {
                if ("function" == typeof r)
                  try {
                    return t.test(e.call(r));
                  } catch (e) {}
                return !1;
              };
            })()),
        Ya = S.inited
          ? S.module.utilIsBoundFunction
          : (S.module.utilIsBoundFunction = (function () {
              "use strict";
              return function (e) {
                if (!ts(e)) return !1;
                var t = e.name;
                return "string" == typeof t && t.startsWith("bound ");
              };
            })()),
        Qa = S.inited
          ? S.module.utilIsClassFunction
          : (S.module.utilIsClassFunction = (function () {
              "use strict";
              var e = Function.prototype.toString,
                t = /^class /;
              return function (r) {
                if ("function" == typeof r)
                  try {
                    return t.test(e.call(r));
                  } catch (e) {}
                return !1;
              };
            })()),
        Za = S.inited
          ? S.module.utilIsClassLikeFunction
          : (S.module.utilIsClassLikeFunction = (function () {
              "use strict";
              return function (e) {
                if ("function" == typeof e) {
                  if (Qa(e)) return !0;
                  var t = e.name;
                  if ("string" == typeof t) {
                    var r = t.charCodeAt(0);
                    return r >= 65 && r <= 90;
                  }
                }
                return !1;
              };
            })()),
        eo = S.inited
          ? S.module.utilIsPlainObject
          : (S.module.utilIsPlainObject = (function () {
              "use strict";
              return function (e) {
                if (!V(e)) return !1;
                for (var t = D(e), r = t, i = null; r; ) (i = r), (r = D(i));
                return t === i;
              };
            })()),
        to = S.inited
          ? S.module.utilIsUpdatableSet
          : (S.module.utilIsUpdatableSet = (function () {
              "use strict";
              return function (e, t) {
                var r = Reflect.getOwnPropertyDescriptor(e, t);
                return (
                  void 0 === r ||
                  !0 === r.configurable ||
                  !0 === r.writable ||
                  "function" == typeof r.set
                );
              };
            })()),
        ro = S.inited
          ? S.module.utilProxyExports
          : (S.module.utilProxyExports = (function () {
              "use strict";
              function e(e, t) {
                if ("function" != typeof e && "string" != typeof t) {
                  var r = ri(e).slice(8, -1);
                  return "Object" === r ? t : r;
                }
                return t;
              }
              return function (t) {
                var r = t.module.exports;
                if (!_(r)) return r;
                var i = S.memoize.utilProxyExports,
                  n = i.get(r);
                if (void 0 !== n) return n.proxy;
                for (
                  var s = ue(function (e, t, r) {
                      r === d && (r = e);
                      var i = void 0 !== Ka(e, t),
                        n = Reflect.get(e, t, r);
                      return i && o(t, n), n;
                    }),
                    a = function (e, r) {
                      if ("function" != typeof r || Ja(r) || Ya(r) || Za(r))
                        return r;
                      var i = n.wrap.get(r);
                      return (
                        void 0 !== i ||
                          ((i = new le(r, {
                            apply: zn(function (r, i, n) {
                              return (
                                (i !== d &&
                                  i !== t.completeMutableNamespace &&
                                  i !== t.completeNamespace) ||
                                  (i = e),
                                Reflect.apply(r, i, n)
                              );
                            }),
                          })),
                          n.wrap.set(r, i),
                          n.unwrap.set(i, r)),
                        i
                      );
                    },
                    o = function (e, r) {
                      var i = t.getters,
                        n = i[e];
                      if (void 0 !== n) {
                        t.addGetter(e, function () {
                          return r;
                        });
                        try {
                          t.updateBindings(e);
                        } finally {
                          i[e] = n;
                        }
                      } else t.updateBindings();
                    },
                    u = {
                      defineProperty(e, r, i) {
                        var a = i.value;
                        if ("function" == typeof a) {
                          var o = n.unwrap.get(a);
                          i.value = void 0 === o ? a : o;
                        }
                        return (
                          In.defineProperty(e, r, i),
                          "function" == typeof i.get &&
                            "function" != typeof u.get &&
                            (u.get = s),
                          L(t.getters, r) &&
                            (t.addGetter(r, function () {
                              return t.exports[r];
                            }),
                            t.updateBindings(r)),
                          !0
                        );
                      },
                      deleteProperty: (e, r) =>
                        !!Reflect.deleteProperty(e, r) &&
                        (L(t.getters, r) &&
                          (t.addGetter(r, function () {
                            return t.exports[r];
                          }),
                          t.updateBindings(r)),
                        !0),
                      set(e, r, i, s) {
                        if (!to(e, r)) return !1;
                        var a =
                          "function" == typeof i ? n.unwrap.get(i) : void 0;
                        void 0 !== a && (i = a), s === d && (s = e);
                        var o = void 0 !== Xa(e, r);
                        return (
                          !!Reflect.set(e, r, i, s) &&
                          (L(t.getters, r)
                            ? (t.addGetter(r, function () {
                                return t.exports[r];
                              }),
                              t.updateBindings(o ? void 0 : r))
                            : o && t.updateBindings(),
                          !0)
                        );
                      },
                    },
                    l = t.builtin,
                    c = l ? null : T(r),
                    p = 0,
                    h = null == c ? 0 : c.length;
                  p < h;
                  p++
                ) {
                  var f = c[p];
                  if (
                    "function" ==
                    typeof Reflect.getOwnPropertyDescriptor(r, f).get
                  ) {
                    u.get = s;
                    break;
                  }
                }
                S.support.nativeProxyReceiver && (l || eo(r))
                  ? l &&
                    V(r) &&
                    !Reflect.has(r, Symbol.toStringTag) &&
                    "[object Object]" !== ri(r) &&
                    (u.get = function (t, r, i) {
                      i === d && (i = t);
                      var n = Reflect.get(t, r, i);
                      if (r === Symbol.toStringTag) {
                        var s = e(t, n);
                        if (s !== n && xs(t, r)) return s;
                      }
                      return n;
                    })
                  : ((u.get = function (t, r, i) {
                      i === d && (i = t);
                      var n = s(t, r, i),
                        o = n;
                      return (
                        r === Symbol.toStringTag && (o = e(t, n)),
                        (o = a(t, o)),
                        o !== n && xs(t, r) ? o : n
                      );
                    }),
                    (u.getOwnPropertyDescriptor = function (e, t) {
                      var r = Reflect.getOwnPropertyDescriptor(e, t);
                      if (ys(r)) {
                        var i = r.value;
                        "function" == typeof i && (r.value = a(e, i));
                      }
                      return r;
                    }));
                var d = new le(r, u);
                return (
                  (n = {
                    proxy: d,
                    unwrap: new WeakMap(),
                    wrap: new WeakMap(),
                  }),
                  i.set(r, n),
                  i.set(d, n),
                  d
                );
              };
            })()),
        io = Function.prototype[Symbol.hasInstance],
        no = { __proto__: null },
        so = S.memoize.builtinEntries,
        ao = function (e) {
          f(no, e, function () {
            "use strict";
            var t = so.get(e);
            if (void 0 !== t) return t;
            var r = (function (e) {
              var t = za[e],
                r = t.exports,
                i = r,
                n = "function" == typeof i;
              if (n && "assert" !== e) {
                var s = i,
                  a = s.prototype,
                  o = Qn(function (e) {
                    return (
                      ((this === r || this === u) && e instanceof s) ||
                      Ha(e, this)
                    );
                  }, io),
                  u = new le(s, {
                    get(e, t, i) {
                      (i !== r && i !== u) || (i = e);
                      var n = Reflect.get(e, t, i),
                        s = n;
                      return (
                        t === Symbol.hasInstance
                          ? (s = o)
                          : n === e
                            ? (s = r)
                            : n === a && (s = l),
                        s !== n && xs(e, t) ? s : n
                      );
                    },
                    getOwnPropertyDescriptor(e, t) {
                      var r = Reflect.getOwnPropertyDescriptor(e, t);
                      return (
                        void 0 !== r && r.value === a && ys(r) && (r.value = l),
                        r
                      );
                    },
                  }),
                  l = new le(a, {
                    get(e, t, i) {
                      i === l && (i = e);
                      var n = Reflect.get(e, t, i);
                      return n === s && xs(e, t) ? r : n;
                    },
                    getOwnPropertyDescriptor(e, t) {
                      var i = Reflect.getOwnPropertyDescriptor(e, t);
                      return (
                        void 0 !== i && i.value === s && ys(i) && (i.value = r),
                        i
                      );
                    },
                  });
                t.exports = u;
              }
              var c = ap.get(t);
              return (
                (c.builtin = !0),
                (r = ro(c)),
                (t.exports = r),
                (c.exports = r),
                n && "module" === e && (i.prototype.constructor = r),
                c.loaded(),
                c
              );
            })(e);
            return (
              "console" !== e && "module" !== e && "util" !== e && so.set(e, r),
              r
            );
          });
        },
        oo = 0,
        uo = null == Ai ? 0 : Ai.length;
      oo < uo;
      oo++
    ) {
      var lo = Ai[oo];
      ao(lo);
    }
    var co,
      po = no,
      ho = S.inited
        ? S.module.builtinReflect
        : (S.module.builtinReflect = (function () {
            "use strict";
            var e = S.external.Reflect,
              t = e.defineProperty,
              r = e.deleteProperty,
              i = e.set;
            function n(e) {
              return Qn(function (...t) {
                var r = t[0];
                try {
                  return Reflect.apply(e, this, t);
                } catch (e) {
                  if (gs(r)) return !1;
                  throw e;
                }
              }, e);
            }
            var s = wn.create();
            return (
              _a(s, e),
              "function" == typeof t && (s.defineProperty = n(t)),
              "function" == typeof r && (s.deleteProperty = n(r)),
              "function" == typeof i && (s.set = n(i)),
              s
            );
          })()),
      fo = S.inited
        ? S.module.builtinGlobal
        : (S.module.builtinGlobal = (function () {
            "use strict";
            var e = {
                Reflect: ho,
                get console() {
                  return po.console.module.exports;
                },
              },
              t = new Map([
                ["Reflect", S.external.Reflect],
                ["console", r],
              ]),
              i = new le(S.unsafeGlobal, {
                get(r, n, s) {
                  s === i && (s = r);
                  var a = Reflect.get(r, n, s);
                  if (t.has(n)) {
                    var o = e[n];
                    if (o !== a && a === t.get(n) && xs(r, n)) return o;
                  }
                  return a;
                },
                getOwnPropertyDescriptor(r, i) {
                  var n = Reflect.getOwnPropertyDescriptor(r, i);
                  return (
                    t.has(i) &&
                      void 0 !== n &&
                      n.value === t.get(i) &&
                      ys(n) &&
                      (n.value = e[i]),
                    n
                  );
                },
              });
            return i;
          })()),
      mo = S.inited
        ? S.module.errorGetBuiltinErrorConstructor
        : (S.module.errorGetBuiltinErrorConstructor = (function () {
            "use strict";
            var e = S.external.Error;
            return function (t) {
              if (t instanceof Error || t === Error.prototype) return Error;
              if (t instanceof e || t === e.prototype) return e;
              for (var r = t; null !== (r = D(r)); ) {
                var i = r.constructor;
                if ("function" == typeof i && "Error" === i.name && is(i))
                  return i;
              }
              return e;
            };
          })()),
      vo = S.inited
        ? S.module.errorConstructError
        : (S.module.errorConstructError =
            ((co = b.STACK_TRACE_LIMIT),
            function (e, t, r = co) {
              var i = mo(e.prototype),
                n = Reflect.getOwnPropertyDescriptor(i, "stackTraceLimit"),
                s = void 0 === n ? void 0 : n.value,
                a = 0 === r || "number" != typeof s || Number.isNaN(s) || s < r;
              a && k(i, "stackTraceLimit", r);
              var o = Reflect.construct(e, t);
              return (
                a &&
                  (void 0 === n
                    ? Reflect.deleteProperty(i, "stackTraceLimit")
                    : Reflect.defineProperty(i, "stackTraceLimit", n)),
                o
              );
            })),
      go = S.inited
        ? S.module.errorGetLocationFromStackTrace
        : (S.module.errorGetLocationFromStackTrace = (function () {
            "use strict";
            var e = /^(.+?):(\d+)(?=\n)/,
              t = /^ *at (?:.+? \()?(.+?):(\d+)(?:\:(\d+))?/gm;
            function r(e) {
              return yi(e) && !Ci(e);
            }
            return function (i) {
              if (!qn(i)) return null;
              var n = ln(i, "stack");
              if ("string" != typeof n) return null;
              var s = Cr(ln(i, "message"));
              n = n.replace(s, "");
              var a = e.exec(n);
              if (null !== a) {
                var o = a,
                  u = o[1],
                  l = o[2];
                if (r(u)) return { column: 0, filename: u, line: l };
              }
              for (t.lastIndex = 0; null !== (a = t.exec(n)); ) {
                var c = a,
                  p = c[1],
                  h = c[2],
                  f = c[3];
                if (r(p)) return { column: f, filename: p, line: h };
              }
              return null;
            };
          })()),
      yo = S.inited
        ? S.module.utilGetModuleName
        : (S.module.utilGetModuleName = (function () {
            "use strict";
            return function (e) {
              if (V(e)) {
                var t = e.filename,
                  r = e.id;
                if ("string" == typeof r)
                  return "." === r && "string" == typeof t ? t : r;
                if ("string" == typeof t) return t;
              }
              return "";
            };
          })()),
      xo = function (e, t = 128) {
        var r = As(e);
        return r.length > t ? r.slice(0, t) + "..." : r;
      },
      bo = S.inited
        ? S.module.errors
        : (S.module.errors = (function () {
            "use strict";
            var e = b.PACKAGE_VERSION,
              t = S.external,
              r = t.Error,
              i = t.ReferenceError,
              n = t.SyntaxError,
              s = t.TypeError,
              a = new Map(),
              o = {
                MAIN_NOT_FOUND: function (e, t) {
                  var i = new r(
                    "Cannot find module " +
                      Lr(e, 39) +
                      '. Please verify that the package.json has a valid "main" entry',
                  );
                  return (
                    (i.code = "MODULE_NOT_FOUND"),
                    (i.path = t),
                    (i.requestPath = e),
                    i
                  );
                },
                MODULE_NOT_FOUND: function (e, t) {
                  var i = (function (e) {
                      for (var t = [], r = new Set(); null != e && !r.has(e); )
                        r.add(e), t.push(yo(e)), (e = e.parent);
                      return t;
                    })(t),
                    n = "Cannot find module " + Lr(e, 39);
                  0 !== i.length &&
                    (n += "\nRequire stack:\n- " + i.join("\n- "));
                  var s = new r(n);
                  return (s.code = "MODULE_NOT_FOUND"), (s.requireStack = i), s;
                },
              };
            function u(e, t, r) {
              (o[e] = (function (e, t) {
                return function (...r) {
                  var i,
                    n = r.length,
                    s = 0 === n ? null : r[n - 1],
                    o = "function" == typeof s ? r.pop() : null,
                    u = a.get(t),
                    l = u(...r);
                  null === o
                    ? (i = vo(e, [l]))
                    : ((i = vo(e, [l], 0)), Wn(i, o));
                  var c = go(i);
                  if (null !== c) {
                    var p = ln(i, "stack");
                    "string" == typeof p &&
                      Reflect.defineProperty(i, "stack", {
                        configurable: !0,
                        value: c.filename + ":" + c.line + "\n" + p,
                        writable: !0,
                      });
                  }
                  return i;
                };
              })(r, e)),
                a.set(e, t);
            }
            function l(e, t, r) {
              (o[e] = (function (e, t) {
                return class extends e {
                  constructor(...e) {
                    var r = a.get(t);
                    super(r(...e));
                    var i = Cr(ln(this, "name"));
                    Reflect.defineProperty(this, "name", {
                      configurable: !0,
                      value: i + " [" + t + "]",
                      writable: !0,
                    }),
                      ln(this, "stack"),
                      Reflect.deleteProperty(this, "name");
                  }
                  get code() {
                    return t;
                  }
                  set code(e) {
                    k(this, "code", e);
                  }
                };
              })(r, e)),
                a.set(e, t);
            }
            function c(e) {
              return "symbol" == typeof e ? Cr(e) : Lr(e, 39);
            }
            return (
              u(
                "ERR_CONST_ASSIGNMENT",
                function () {
                  return "Assignment to constant variable.";
                },
                s,
              ),
              u(
                "ERR_EXPORT_CYCLE",
                function (e, t) {
                  return (
                    "Detected cycle while resolving name '" +
                    t +
                    "' in '" +
                    ls(e) +
                    "'"
                  );
                },
                n,
              ),
              u(
                "ERR_EXPORT_MISSING",
                function (e, t) {
                  return (
                    "The requested module '" +
                    ls(e) +
                    "' does not provide an export named '" +
                    t +
                    "'"
                  );
                },
                n,
              ),
              u(
                "ERR_EXPORT_STAR_CONFLICT",
                function (e, t) {
                  return (
                    "The requested module '" +
                    ls(e) +
                    "' contains conflicting star exports for name '" +
                    t +
                    "'"
                  );
                },
                n,
              ),
              u(
                "ERR_INVALID_ESM_FILE_EXTENSION",
                function (e) {
                  return "Cannot load module from .mjs: " + ls(e);
                },
                r,
              ),
              u(
                "ERR_INVALID_ESM_OPTION",
                function (t, r, i) {
                  return (
                    "The esm@" +
                    e +
                    " option " +
                    (i ? Cr(t) : Lr(t, 39)) +
                    " is invalid. Received " +
                    xo(r)
                  );
                },
                r,
              ),
              u(
                "ERR_NS_ASSIGNMENT",
                function (e, t) {
                  return (
                    "Cannot assign to read only module namespace property " +
                    c(t) +
                    " of " +
                    ls(e)
                  );
                },
                s,
              ),
              u(
                "ERR_NS_DEFINITION",
                function (e, t) {
                  return (
                    "Cannot define module namespace property " +
                    c(t) +
                    " of " +
                    ls(e)
                  );
                },
                s,
              ),
              u(
                "ERR_NS_DELETION",
                function (e, t) {
                  return (
                    "Cannot delete module namespace property " +
                    c(t) +
                    " of " +
                    ls(e)
                  );
                },
                s,
              ),
              u(
                "ERR_NS_EXTENSION",
                function (e, t) {
                  return (
                    "Cannot add module namespace property " +
                    c(t) +
                    " to " +
                    ls(e)
                  );
                },
                s,
              ),
              u(
                "ERR_NS_REDEFINITION",
                function (e, t) {
                  return (
                    "Cannot redefine module namespace property " +
                    c(t) +
                    " of " +
                    ls(e)
                  );
                },
                s,
              ),
              u(
                "ERR_UNDEFINED_IDENTIFIER",
                function (e) {
                  return e + " is not defined";
                },
                i,
              ),
              u(
                "ERR_UNKNOWN_ESM_OPTION",
                function (t) {
                  return "Unknown esm@" + e + " option: " + t;
                },
                r,
              ),
              l(
                "ERR_INVALID_ARG_TYPE",
                function (e, t, r) {
                  var i = "The '" + e + "' argument must be " + t;
                  return (
                    arguments.length > 2 &&
                      (i +=
                        ". Received type " + (null === r ? "null" : typeof r)),
                    i
                  );
                },
                s,
              ),
              l(
                "ERR_INVALID_ARG_VALUE",
                function (e, t, r = "is invalid") {
                  return (
                    "The argument '" + e + "' " + r + ". Received " + xo(t)
                  );
                },
                r,
              ),
              l(
                "ERR_INVALID_PROTOCOL",
                function (e, t) {
                  return (
                    "Protocol '" + e + "' not supported. Expected '" + t + "'"
                  );
                },
                r,
              ),
              l(
                "ERR_MODULE_RESOLUTION_LEGACY",
                function (e, t, r) {
                  return (
                    e +
                    " not found by import in " +
                    t +
                    ". Legacy behavior in require() would have found it at " +
                    r
                  );
                },
                r,
              ),
              l(
                "ERR_REQUIRE_ESM",
                function (e) {
                  return "Must use import to load module: " + ls(e);
                },
                r,
              ),
              l(
                "ERR_UNKNOWN_FILE_EXTENSION",
                function (e) {
                  return "Unknown file extension: " + e;
                },
                r,
              ),
              o
            );
          })()),
      Eo = S.inited
        ? S.module.bundledLookup
        : (S.module.bundledLookup = (function () {
            "use strict";
            var e = tn.BRAVE,
              t = tn.ELECTRON,
              r = new Set();
            return (
              t && r.add("electron"),
              e && r.add("ad-block").add("tracking-protection"),
              r
            );
          })()),
      wo = S.inited
        ? S.module.pathIsExtJS
        : (S.module.pathIsExtJS = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e) return !1;
              var t = e.length;
              return (
                t > 3 &&
                46 === e.charCodeAt(t - 3) &&
                106 === e.charCodeAt(t - 2) &&
                115 === e.charCodeAt(t - 1)
              );
            };
          })()),
      Ro = S.inited
        ? S.module.moduleInternalReadPackage
        : (S.module.moduleInternalReadPackage = (function () {
            "use strict";
            var e = /"main"/;
            return function (t, r) {
              var i = S.memoize.moduleInternalReadPackage,
                n = void 0 === r ? 0 : r.length,
                s = t + "\0";
              n > 0 && (s += 1 === n ? r[0] : r.join());
              var a = i.get(s);
              if (void 0 !== a) return a;
              var o,
                u = t + Re + "package.json",
                l = Ii(u, "utf8");
              if (
                null === l ||
                "" === l ||
                (1 === n && "main" === r[0] && !e.test(l))
              )
                return null;
              try {
                o = JSON.parse(l);
              } catch (e) {
                throw (
                  ((e.message = "Error parsing " + u + ": " + e.message),
                  (e.path = u),
                  ds(e),
                  e)
                );
              }
              return V(o) ? (i.set(s, o), o) : null;
            };
          })()),
      So = S.inited
        ? S.module.fsRealpath
        : (S.module.fsRealpath = (function () {
            "use strict";
            var e,
              t = tn.ELECTRON,
              r = tn.WIN32,
              i = S.realpathNativeSync,
              n = t || r,
              s = !n && "function" == typeof i;
            function a(t) {
              try {
                return Jr(t);
              } catch (r) {
                if (
                  qn(r) &&
                  "ENOENT" === r.code &&
                  (void 0 === e &&
                    (e =
                      !n &&
                      !S.support.realpathNative &&
                      "function" == typeof oe.fs.realpath),
                  e)
                )
                  return (function (e) {
                    if ("string" == typeof e)
                      try {
                        return oe.fs.realpath(nn(e));
                      } catch (e) {}
                    return "";
                  })(t);
              }
              return "";
            }
            return function (e) {
              if ("string" != typeof e) return "";
              var t = S.memoize.fsRealpath,
                r = t.get(e);
              return (
                void 0 !== r ||
                  ((r = s
                    ? (function (e) {
                        try {
                          return i(e);
                        } catch (e) {}
                        return a(e);
                      })(e)
                    : a(e)),
                  "" !== r && t.set(e, r)),
                r
              );
            };
          })()),
      Io = tn.FLAGS,
      Po = tn.TINK,
      Ao = tn.YARN_PNP,
      No = bo.MAIN_NOT_FOUND,
      _o = Yr.prototype.isFile,
      ko = ["main"],
      Co = Po || Ao,
      Oo = !Co && !Io.preserveSymlinks,
      To = !Co && !Io.preserveSymlinksMain;
    function Lo(e, t, r) {
      "use strict";
      for (var i = 0, n = null == t ? 0 : t.length; i < n; i++) {
        var s = t[i],
          a = Do(e + s, r);
        if ("" !== a) return a;
      }
      return "";
    }
    function Mo(e, t, r, i) {
      "use strict";
      if ("string" != typeof t) return "";
      var n = we(e, t),
        s = Do(n, i);
      return (
        "" === s && (s = Lo(n, r, i)),
        "" === s && (s = Lo(n + Re + "index", r, i)),
        s
      );
    }
    function Do(e, t) {
      "use strict";
      var r = -1;
      if (wo(e) || un(e)) {
        var i = rn(e);
        null !== i && (r = Reflect.apply(_o, i, []) ? 0 : 1);
      } else r = sn(e);
      if (r) return "";
      var n = t ? To : Oo;
      return n ? So(e) : e;
    }
    function Fo(e, t, r, i, n) {
      "use strict";
      var s,
        a,
        o,
        u = Ro(t, r);
      if (null === u) return Lo(t + Re + "index", i, n);
      for (var l = 0, c = null == r ? 0 : r.length; l < c; l++)
        if (
          ((s = r[l]),
          (a = u[s]),
          (o = Mo(t, a, i, n)),
          "" !== o && ("main" === s || !un(o)))
        )
          return o;
      var p = t + Re + "package.json";
      if (((o = Lo(t + Re + "index", i, n)), "" === o)) throw new No(e, p);
      return (
        Io.pendingDeprecation &&
          J(
            "Invalid " +
              Lr(s, 39) +
              " field in " +
              Lr(p, 39) +
              " of " +
              xo(a) +
              ". Please either fix or report it to the module author",
            "DeprecationWarning",
            "DEP0128",
          ),
        o
      );
    }
    var jo,
      Vo = function (e, t, r = !1, i, n) {
        var s = t.length,
          a = e + "\0" + (1 === s ? t[0] : En.join(t)) + "\0";
        void 0 !== i && (a += 1 === i.length ? i[0] : i.join()),
          (a += "\0"),
          void 0 !== n && (a += 1 === n.length ? n[0] : n.join()),
          (a += "\0"),
          r && (a += "1");
        var o = S.memoize.moduleInternalFindPath,
          u = o.get(a);
        if (void 0 !== u) return u;
        var l = r ? To : Oo,
          c = di(e);
        if (!c && 0 === s) return "";
        var p = e.length,
          h = 0 !== p;
        if (h) {
          var f = e.charCodeAt(p - 1);
          46 === f &&
            ((f = e.charCodeAt(p - 2)), 46 === f && (f = e.charCodeAt(p - 3))),
            (h = vi(f));
        }
        c && (l ? ((t = [ye(e)]), (e = ve(e))) : (t = [e]));
        for (var d = 0, m = t, v = null == m ? 0 : m.length; d < v; d++) {
          var g = m[d];
          if (c || 1 === sn(g)) {
            var y = g;
            if (!l || ((y = So(g)), "" !== y)) {
              c ? l && (y += Re + e) : (y = we(y, e));
              var x = -1,
                b = null;
              wo(y) || un(y)
                ? ((b = rn(y)),
                  null !== b && (x = Reflect.apply(_o, b, []) ? 0 : 1))
                : (x = sn(y));
              var E = "";
              if (
                (h ||
                  (0 === x && (E = l ? So(y) : y),
                  "" === E &&
                    (void 0 === n && (n = T(ec._extensions)),
                    (E = Lo(y, n, r)))),
                1 === x &&
                  "" === E &&
                  (void 0 === n && (n = T(ec._extensions)),
                  void 0 === i && (i = ko),
                  (E = Fo(e, y, i, n, r))),
                "" !== E)
              )
                return o.set(a, E), E;
            }
          }
        }
        return "";
      },
      Go = {},
      $o = S.inited
        ? S.module.utilValidateString
        : (S.module.utilValidateString = (function () {
            "use strict";
            var e = bo.ERR_INVALID_ARG_TYPE;
            return function (t, r) {
              if ("string" != typeof t) throw new e(r, "string", t);
            };
          })()),
      Bo = tn.ELECTRON,
      Uo = tn.WIN32,
      qo = Array.prototype.map
        .call("node_modules", function (e) {
          return e.charCodeAt(0);
        })
        .reverse(),
      Wo = qo.length,
      zo = Qn(function (e) {
        "use strict";
        if (($o(e, "from"), Bo)) return Sn._nodeModulePaths(e);
        if (((e = we(e)), Uo)) {
          if (
            e.length > 1 &&
            92 === e.charCodeAt(e.length - 1) &&
            58 === e.charCodeAt(e.length - 2)
          )
            return En.of(e + "node_modules");
        } else if ("/" === e) return En.of("/node_modules");
        for (var t = e, r = t.length, i = r, n = 0, s = En.of(); r--; ) {
          var a = e.charCodeAt(r);
          vi(a)
            ? (n !== Wo && En.push(s, e.slice(0, i) + Re + "node_modules"),
              (i = r),
              (n = 0))
            : -1 !== n && (qo[n] === a ? (n += 1) : (n = -1));
        }
        return Uo || En.push(s, "/node_modules"), s;
      }, Rn._nodeModulePaths),
      Ho = zo,
      Ko = tn.RUNKIT,
      Xo = b.PACKAGE_DIRNAME,
      Jo = function (e, t = null, r = !1) {
        var i = null !== t && t.filename;
        if (!gi(e)) {
          var n = null !== t && t.paths,
            s = n ? En.from(n) : En.of();
          return (
            n && !r && En.push(s, ...sc.state.module.globalPaths),
            Ko && (void 0 === jo && (jo = ye(Xo)), s.push(jo)),
            s.length ? s : null
          );
        }
        if ("string" == typeof i) return En.of(ye(i));
        var a = r ? Ho(".") : ec._nodeModulePaths(".");
        return En.unshift(a, "."), a;
      },
      Yo = tn.ELECTRON,
      Qo = tn.FLAGS,
      Zo = tn.YARN_PNP,
      eu = bo.ERR_INVALID_PROTOCOL,
      tu = bo.ERR_MODULE_RESOLUTION_LEGACY,
      ru = bo.ERR_UNKNOWN_FILE_EXTENSION,
      iu = bo.MODULE_NOT_FOUND,
      nu = /^\/\/localhost\b/,
      su = /[?#].*$/,
      au = [".mjs", ".js", ".json", ".node"],
      ou = ["main"],
      uu = new Set(au);
    function lu(e, t, r, i, n, s, a) {
      "use strict";
      var o;
      return (
        i && Array.isArray(i.paths)
          ? (o = (function (e, t, r) {
              for (
                var i = new ec(""), n = [], s = 0, a = null == t ? 0 : t.length;
                s < a;
                s++
              ) {
                var o = t[s];
                i.paths = Ho(o);
                for (
                  var u = Jo(e, i, r), l = 0, c = null == u ? 0 : u.length;
                  l < c;
                  l++
                ) {
                  var p = u[l];
                  -1 === n.indexOf(p) && n.push(p);
                }
              }
              return n;
            })(e, i.paths, a))
          : ((o = Jo(e, t, a)), null === o && (o = [])),
        Vo(e, o, r, n, s)
      );
    }
    function cu(e, t) {
      "use strict";
      if (!sc.state.package.default.options.debug) {
        var r = { filename: null, inModule: !1 };
        if (null !== t) {
          var i = t.type;
          (r.filename = t.filename),
            (r.inModule =
              (!t.package.options.cjs.paths || ".mjs" === t.extname) &&
              1 !== i &&
              2 !== i);
        }
        ms(e, r);
      }
      return e;
    }
    var pu = function (e, t, r = !1, i) {
        if ((e.startsWith("node:") && (e = e.substr(5)), Yo && Eo.has(e)))
          return Sn._resolveFilename(e, t, r, i);
        if (Ni.has(e)) return e;
        if (Zo) return Go._resolveFilename(e, t, r, i);
        var n,
          s,
          a,
          o = di(e),
          u = ap.get(t);
        if (
          (null !== u && u.updateFilename(),
          (n = o ? ye(e) : null === u ? "" : u.dirname),
          !V(i))
        ) {
          (s = S.memoize.moduleESMResolveFilename),
            (a = e + "\0" + n + "\0" + (r ? "1" : ""));
          var l = s.get(a);
          if (void 0 !== l) return l;
        }
        var c = !o && gi(e),
          p = o || c,
          h = Pc.get(n).options,
          f = h.cjs.paths,
          d = h.mainFields;
        null !== u && ".mjs" === u.extname && ((f = !1), (d = ou));
        var m = "";
        if (p || (47 !== e.charCodeAt(0) && -1 === e.indexOf(":"))) {
          if (p) {
            var v = e.replace(su, "");
            if (!Fn(v)) {
              var g,
                y = o ? [""] : [n];
              f ||
                (g = "explicit" === Qo.esModuleSpecifierResolution ? Hn : au),
                (v = An(v)),
                (m = Vo(v, y, r, d, g));
            }
          } else if (!Fn(e)) {
            var x = An(e),
              b = !f,
              E = f ? void 0 : au;
            if (((m = lu(x, t, r, i, d, E, b)), "" === m && Ni.has(x)))
              return void 0 !== s && s.set(a, x), x;
          }
        } else {
          var w = jn(e);
          if (
            ((m = Vn(w)), "" === m && "file:" !== w.protocol && !nu.test(e))
          ) {
            var R = new eu(w.protocol, "file:");
            throw (cu(R, u), R);
          }
          "" !== m && (m = lu(m, t, r, i, Hn, Hn, !0));
        }
        if ("" !== m) {
          if (f || r || wo(m) || un(m) || uu.has(xe(m)))
            return void 0 !== s && s.set(a, m), m;
          var I = new ru(m);
          throw (cu(I, u), I);
        }
        if (
          ((m = (function (e, t, r, i) {
            "use strict";
            try {
              return ec._resolveFilename(e, t, r, i);
            } catch (e) {}
            return "";
          })(e, t, r, i)),
          "" !== m)
        ) {
          if (f) return void 0 !== s && s.set(a, m), m;
          var P = new tu(e, n, m);
          throw (cu(P, u), P);
        }
        var A = new iu(e, t);
        throw (cu(A, u), A);
      },
      hu = function (e, t, r, i) {
        "use strict";
        var n;
        try {
          return pu(e, t, r, i);
        } catch (e) {
          n = e;
        }
        try {
          return ec._resolveFilename(e, t, r, i);
        } catch (e) {}
        throw n;
      },
      fu = function (e, t, r = !1, i, n) {
        var s,
          a = sc.state.module,
          o = S.moduleState.parsing,
          u = i[e];
        void 0 === u && i === a.scratchCache && (u = ec._cache[e]);
        var l = void 0 !== u;
        if (l) {
          var c = null != t && t.children;
          if (
            (Array.isArray(c) && -1 === En.indexOf(c, u) && En.push(c, u),
            (s = ap.get(u)),
            o || u.loaded || 2 !== s.state)
          )
            return s;
        } else {
          if (L(po, e)) return po[e];
          (u = new ec(e, t)),
            (u.filename = Gn(e) ? Vn(e) : e),
            (s = ap.get(u)),
            r && ((u.id = "."), (a.mainModule = u), (N.mainModule = u));
        }
        var p = s,
          h = p.compileData,
          f = s.extname;
        if (
          l ||
          (null !== h && null !== h.code) ||
          ".json" === f ||
          ".wasm" === f
        )
          return n(s), s;
        var d = u,
          m = d._compile,
          v = L(u, "_compile");
        return (
          k(
            u,
            "_compile",
            ue(function (e, t) {
              "use strict";
              v
                ? k(this, "_compile", m)
                : Reflect.deleteProperty(this, "_compile");
              var r = L(this, S.symbol._compile)
                  ? this[S.symbol._compile]
                  : null,
                i = m;
              return (
                "function" == typeof r &&
                  ((i = r), Reflect.deleteProperty(this, S.symbol._compile)),
                Reflect.apply(i, this, [e, t])
              );
            }),
          ),
          n(s),
          s
        );
      },
      du = S.inited
        ? S.module.utilDecodeURI
        : (S.module.utilDecodeURI = (function () {
            "use strict";
            var e = decodeURI;
            return function (t) {
              return "string" == typeof t ? e(t) : "";
            };
          })()),
      mu = S.inited
        ? S.module.utilGetURLQueryFragment
        : (S.module.utilGetURLQueryFragment = (function () {
            "use strict";
            var e = /[?#]/;
            return function (t) {
              var r = "string" == typeof t ? t.search(e) : -1;
              return -1 === r ? "" : du(os(t.slice(r)));
            };
          })()),
      vu = S.inited
        ? S.module.moduleInternalFindCompilerExtension
        : (S.module.moduleInternalFindCompilerExtension = (function () {
            "use strict";
            return function (e, t) {
              var r = t.basename,
                i = t.extname,
                n = t.filename;
              if ("" === i) return i;
              for (
                var s, a = n.length - i.length, o = 0;
                -1 !== (s = r.indexOf(".", o));

              )
                if (((o = s + 1), 0 !== s)) {
                  var u = s === a,
                    l = u ? i : r.slice(s);
                  if (L(e, l)) return l;
                  if (u) break;
                }
              return "";
            };
          })()),
      gu = function (e, t, r = !1, i) {
        var n,
          s = S.moduleState.parsing,
          a = ap.get(t),
          o = null === a ? null : a.package.options.cjs,
          u = null !== a && ".mjs" === a.extname,
          l = null === a ? -1 : a.type;
        n = null !== a && o.paths && !u ? hu(e, t, r) : pu(e, t, r);
        var c = ye(n);
        "." === c && Ni.has(n) && (e = n);
        var p = Pc.from(n),
          h = p.options.cjs,
          f = mu(e),
          d = sc.state.module,
          m = d.moduleCache,
          v = d.scratchCache,
          g = ec._cache,
          y = !h.cache;
        if (((e = "" === f ? n : us(n) + f), un(n) || L(m, e))) g = m;
        else if (s) g = v;
        else if (L(v, e)) {
          var x = v[e];
          y && 1 !== ap.get(x).type && (g = m),
            (g[e] = x),
            Reflect.deleteProperty(v, e);
        }
        var b = !1,
          E = function (e) {
            "use strict";
            var t = 1 === e.type;
            if (
              (t && (y = !1),
              r && y && Reflect.deleteProperty(N, "mainModule"),
              t && null !== a && (u || (1 !== l && 2 !== l && !o.cache)))
            )
              try {
                e.module.parent = void 0;
              } catch (e) {}
          },
          w = fu(e, t, r, g, function (t) {
            "use strict";
            (b = !0),
              (g[e] = t.module),
              null !== a && (a.children[t.name] = t),
              s || E(t),
              "function" == typeof i && i(t),
              (function (e, t, r, i, n) {
                var s,
                  a = !0;
                try {
                  (function (e, t, r) {
                    var i = S.moduleState.parsing;
                    e.updateFilename(t), null === r && (r = e);
                    var n = sc.state.module.extensions,
                      s = e.extname,
                      a = r.extname,
                      o = r.type,
                      u = 1 === o,
                      l = ".mjs" === a,
                      c = 2 === o;
                    (u ||
                      c ||
                      ".js" === s ||
                      ((".cjs" === s || r.package.options.cjs.extensions) &&
                        !l)) &&
                      (n = ec._extensions);
                    var p = vu(n, e);
                    "" === p && (p = ".js");
                    var h = e.module;
                    h.paths ||
                      (h.paths =
                        u ||
                        c ||
                        (e.package.options.cjs.paths && !l && ".mjs" !== s)
                          ? ec._nodeModulePaths(e.dirname)
                          : Ho(e.dirname)),
                      i &&
                      ".cjs" !== p &&
                      ".js" !== p &&
                      ".json" !== p &&
                      ".mjs" !== p &&
                      ".wasm" !== p
                        ? (e.state = 2)
                        : (n[p](h, t), i || h.loaded || (h.loaded = !0));
                  })(e, t, r),
                    (a = !1);
                } catch (e) {
                  throw ((s = e), s);
                } finally {
                  a &&
                    (1 !== e.type
                      ? Reflect.defineProperty(i, n, {
                          configurable: !0,
                          enumerable: !0,
                          get: ue(function () {
                            throw s;
                          }),
                          set: ue(function (e) {
                            k(this, n, e);
                          }),
                        })
                      : Reflect.deleteProperty(i, n));
                }
              })(t, n, a, g, e);
          });
        return (
          s && E(w),
          b || "function" != typeof i || i(w),
          null !== a && (a._lastChild = w),
          w
        );
      },
      yu = S.inited
        ? S.module.moduleEsmValidateDeep
        : (S.module.moduleEsmValidateDeep = (function () {
            "use strict";
            var e = bo.ERR_EXPORT_CYCLE,
              t = bo.ERR_EXPORT_MISSING;
            function r(r, i, n) {
              var s = r.setters[i],
                a = s.findIndex(function ({ owner: e }) {
                  return e === n;
                });
              if (-1 !== a) {
                var o = (function e(t, r, i) {
                  var n = t.name;
                  if (void 0 === i) i = new Set();
                  else if (i.has(n)) return !0;
                  i.add(n);
                  for (
                    var s = 0, a = t.setters[r], o = null == a ? 0 : a.length;
                    s < o;
                    s++
                  ) {
                    var u = a[s];
                    if (3 === u.type && e(u.owner, u.exportedName, i))
                      return !0;
                  }
                  return !1;
                })(r, i)
                  ? e
                  : t;
                throw (s.splice(a, 1), new o(r.module, i));
              }
            }
            function i(e, t) {
              var i = ".mjs" === t.extname,
                n = t.package.options.cjs.namedExports && !i;
              if (-1 !== e._namespaceFinalized) {
                var s = e.type,
                  a = 1 === s,
                  o = 1 === e._loaded,
                  u = ((a || 4 === s) && !n && !e.builtin) || (2 === s && i);
                if (!a || u || o) {
                  var l,
                    c = e._validation,
                    p = e.getters,
                    h = e.setters;
                  for (var f in h) {
                    if (u) {
                      if ("*" === f || "default" === f) continue;
                      r(e, f, t);
                    }
                    var d = c.get(f);
                    if (!0 !== d) {
                      if (
                        (void 0 === l &&
                          (l = o ? e.getExportByName("*", t) : p),
                        L(l, f))
                      ) {
                        var m = p[f],
                          v = m,
                          g = v.owner;
                        if (1 === g.type && 1 !== g._loaded) continue;
                        if (!m.deferred) {
                          c.set(f, !0);
                          continue;
                        }
                        for (var y = new Set(); void 0 !== m && m.deferred; )
                          y.has(m)
                            ? (m = void 0)
                            : (y.add(m), (m = m.owner.getters[m.id]));
                        if (void 0 !== m) {
                          (p[f] = m), c.set(f, !0);
                          continue;
                        }
                      }
                      c.set(f, !1), r(e, f, t);
                    }
                  }
                }
              }
            }
            return function e(t, r) {
              var n = t.children;
              if (void 0 === r) r = new Set();
              else if (r.has(t)) return;
              for (var s in (r.add(t), n)) {
                var a = n[s];
                1 !== a.type && e(a, r), i(a, t);
              }
            };
          })()),
      xu = S.inited
        ? S.module.moduleEsmValidateShallow
        : (S.module.moduleEsmValidateShallow = (function () {
            "use strict";
            var e = bo.ERR_EXPORT_MISSING;
            return function (t, r) {
              var i,
                n = t._validation,
                s = t.setters;
              for (var a in s) {
                var o = n.get(a);
                if (!0 !== o)
                  if (
                    (void 0 === i && (i = t.getExportByName("*", r)), L(i, a))
                  )
                    n.set(a, !0);
                  else {
                    n.set(a, !1);
                    var u = s[a],
                      l = u.findIndex(function ({ owner: e }) {
                        return e === r;
                      });
                    if (-1 !== l) throw (u.splice(l, 1), new e(t.module, a));
                  }
              }
            };
          })()),
      bu = bo.ERR_INVALID_ESM_FILE_EXTENSION;
    function Eu(e, t, r) {
      "use strict";
      var i = r._lastChild;
      if (null !== i && Object.is(i.module.exports, t)) return i;
      var n = (function (e, t, r) {
          try {
            return hu(e, t, void 0);
          } catch (e) {}
          if (yi(e)) {
            var i = t.filename;
            return "string" == typeof i ? we(i, e) : we(e);
          }
          return e;
        })(e, r.module),
        s = new ec(n);
      return (
        (s.exports = t), (s.loaded = !0), yi(n) && (s.filename = n), ap.get(s)
      );
    }
    function wu(e, t, r) {
      "use strict";
      var i,
        n,
        s = S.moduleState;
      s.requireDepth += 1;
      var a = !0;
      try {
        (i = gu(e, t.module, !1, r)), (a = !1);
      } catch (e) {
        n = e;
      }
      if (((s.requireDepth -= 1), !a)) return i;
      if (".mjs" === t.extname || !qn(n)) throw n;
      var o = n,
        u = o.code;
      if ("ERR_INVALID_PROTOCOL" !== u && "MODULE_NOT_FOUND" !== u) throw n;
      return null;
    }
    function Ru(e, t) {
      "use strict";
      t._passthruRequire = !0;
      try {
        return t.module.require(e);
      } finally {
        t._passthruRequire = !1;
      }
    }
    var Su = function (e, t, r, i = !1) {
        var n = S.moduleState,
          s = n.parsing,
          a = null,
          o = !1,
          u = function (e, t, i = t.name) {
            (e.children[i] = t), t.addSetters(r, e);
          },
          l = function () {
            "use strict";
            if (!o) {
              o = !0;
              var r = Ru(e, t);
              if (null === a) (a = Eu(e, r, t)), u(t, a);
              else if (!Object.is(a.module.exports, r)) {
                var i = a,
                  n = i.name;
                (a = Eu(e, r, t)), u(t, a, n);
              }
              a.loaded(), a.updateBindings(null, 3), xu(a, t);
            }
          },
          c = function (e) {
            return u(t, e);
          };
        if (i || s) {
          i && (n.parsing = !0);
          try {
            a = wu(e, t, c);
          } finally {
            i && (n.parsing = !1);
          }
          null !== a &&
            (a.updateBindings(), i && 2 === a.state && 1 !== a.type && yu(a));
        } else a = wu(e, t, c);
        if (s) {
          if (null === a) {
            var p = Ru(e, t);
            (a = Eu(e, p, t)), u(t, a);
          }
          a._finalize = l;
        }
        if (
          ".mjs" === t.extname &&
          null !== a &&
          3 === a.type &&
          ".mjs" !== a.extname
        )
          throw bu(a.module);
        s || l();
      },
      Iu = S.inited
        ? S.module.utilIdentity
        : (S.module.utilIdentity = (function () {
            "use strict";
            return function (e) {
              return e;
            };
          })()),
      Pu = Pe,
      Au = Ae,
      Nu = bo.ERR_CONST_ASSIGNMENT,
      _u = bo.ERR_UNDEFINED_IDENTIFIER,
      ku = S.external,
      Cu = ku.Promise,
      Ou = ku.eval,
      Tu = {
        addDefaultValue(e) {
          this.addExportGetters([
            [
              "default",
              function () {
                return e;
              },
            ],
          ]),
            void 0 === e && this.initBindings(["default"]);
        },
        addExportFromSetter(e, t = e) {
          var r = this,
            i = Lu(3, function (i, n) {
              "use strict";
              var s = r.entry;
              if (1 === s._loaded) return !0;
              1 === n.type && 1 !== n._loaded && (s._namespaceFinalized = -1),
                s.addGetterFrom(n, e, t);
            });
          return (i.exportedName = t), i;
        },
        addExportGetters(e) {
          this.entry.addGetters(e);
        },
        addNamespaceSetter() {
          var e = this;
          return Lu(4, function (t, r) {
            "use strict";
            var i = e.entry;
            if (1 === i._loaded) return !0;
            var n = 1 === r._loaded;
            if (n || 1 !== r.type) {
              var s = r.getters,
                a = i.getters,
                o = i.name,
                u = n ? r.getExportByName("*", i) : r.getters;
              for (var l in u)
                if ("default" !== l) {
                  var c = void 0,
                    p = a[l];
                  if (void 0 === p || ((c = p.owner.name), o !== c)) {
                    var h = s[l].owner.name;
                    (void 0 !== p && c !== h) || i.addGetterFrom(r, l),
                      (c = a[l].owner.name),
                      c !== o &&
                        c !== h &&
                        i.addGetter(
                          l,
                          Lu(2, function () {
                            return Au;
                          }),
                        );
                  }
                }
            } else i._namespaceFinalized = -1;
          });
        },
        assertImportedBinding: function e(t, r) {
          "use strict";
          if (!0 !== this.entry.importedBindings.get(t)) throw new _u(t, e);
          return r;
        },
        assertUndeclared: function e(t) {
          "use strict";
          var r = S.unsafeGlobal;
          if (!L(r, t)) throw new _u(t, e);
          return r[t];
        },
        compileEval(e) {
          if ("string" != typeof e) return e;
          var t = this.entry,
            r = t.package.options.cjs,
            i = ".mjs" === t.extname,
            n = r.vars && !i;
          try {
            return xn.compile(e, {
              cjsVars: n,
              eval: !0,
              runtimeName: t.runtimeName,
            }).code;
          } catch (n) {
            if (!sc.state.package.default.options.debug && ns(n)) {
              var s = t.type;
              ms(n, {
                content: e,
                filename: "eval",
                inModule: (!r.paths || i) && 1 !== s && 2 !== s,
              });
            } else ds(n);
            throw n;
          }
        },
        compileGlobalEval(e) {
          if ("string" != typeof e) return e;
          var t,
            r = this.entry,
            i = r.package.options.cjs,
            n = ".mjs" === r.extname,
            s = r.runtimeName,
            a = i.vars && !n;
          try {
            var o = xn.compile(e, { cjsVars: a, eval: !0, runtimeName: s });
            if (0 === o.transforms) return e;
            t = o.code;
          } catch (t) {
            if (!sc.state.package.default.options.debug && ns(t)) {
              var u = r.type;
              ms(t, {
                content: e,
                filename: "eval",
                inModule: (!i.paths || n) && 1 !== u && 2 !== u,
              });
            } else ds(t);
            throw t;
          }
          var l = S.unsafeGlobal;
          if (L(l, s)) return t;
          var c = this;
          return (
            Reflect.defineProperty(l, s, {
              configurable: !0,
              get: ue(function () {
                "use strict";
                return Reflect.deleteProperty(this, s), c;
              }),
            }),
            (t =
              (Ar(t, "use strict") ? '"use strict";' : "") +
              "let " +
              s +
              "=global." +
              s +
              ";" +
              t),
            t
          );
        },
        dynamicImport(e) {
          var t = this.entry;
          return new Cu(function (r, i) {
            "use strict";
            Oa(function () {
              try {
                var n, s;
                "string" != typeof e && (e += "");
                var a = [
                  [
                    "*",
                    null,
                    Lu(2, function (e, t) {
                      if (1 === t._loaded)
                        return (
                          (n = e),
                          void 0 === s &&
                            (s = Oa(function () {
                              return r(n);
                            })),
                          !0
                        );
                    }),
                  ],
                ];
                Su(e, t, a, !0);
              } catch (e) {
                !sc.state.package.default.options.debug && ns(e)
                  ? ms(e, {
                      inModule:
                        !t.package.options.cjs.paths || ".mjs" === t.extname,
                    })
                  : ds(e),
                  i(e);
              }
            });
          });
        },
        enable(e, t) {
          if (null !== e.runtime) return e.runtime;
          var r = e.module,
            i = r.exports;
          return (
            (e.exports = t),
            f(i, "meta", function () {
              "use strict";
              var t = e.id,
                r = null;
              return (
                Gn(t) ? (r = t) : yi(t) && (r = us(t)),
                { __proto__: null, url: r }
              );
            }),
            (i.addDefaultValue = Tu.addDefaultValue),
            (i.addExportFromSetter = Tu.addExportFromSetter),
            (i.addExportGetters = Tu.addExportGetters),
            (i.addNamespaceSetter = Tu.addNamespaceSetter),
            (i.assertImportedBinding = Tu.assertImportedBinding),
            (i.assertUndeclared = Tu.assertUndeclared),
            (i.compileEval = function (e) {
              return Tu.compileEval.call(i, e);
            }),
            (i.compileGlobalEval = Tu.compileGlobalEval),
            (i.dynamicImport = Tu.dynamicImport),
            (i.entry = e),
            (i.global = fo),
            (i.globalEval = function (e) {
              return Tu.globalEval.call(i, e);
            }),
            (i.import = Tu.import),
            (i.initBindings = Tu.initBindings),
            (i.resumeChildren = Tu.resumeChildren),
            (i.run = Tu.run),
            (i.runResult = void 0),
            (i.throwConstAssignment = Tu.throwConstAssignment),
            (i.updateBindings = Tu.updateBindings),
            (i._ = i),
            (i.a = i.assertImportedBinding),
            (i.b = i.throwConstAssignment),
            (i.c = i.compileEval),
            (i.d = i.addDefaultValue),
            (i.e = i.globalEval),
            (i.f = i.addExportFromSetter),
            (i.g = i.global),
            (i.i = i.dynamicImport),
            (i.j = i.initBindings),
            (i.k = Iu),
            (i.n = i.addNamespaceSetter),
            (i.o = Pu),
            (i.r = i.run),
            (i.s = i.resumeChildren),
            (i.t = i.assertUndeclared),
            (i.u = i.updateBindings),
            (i.v = Ou),
            (i.w = i.import),
            (i.x = i.addExportGetters),
            (e.runtime = i)
          );
        },
        globalEval(e) {
          return Ou(this.compileGlobalEval(e));
        },
        import(e, t) {
          return Su(e, this.entry, t);
        },
        initBindings(e) {
          this.entry.updateBindings(e);
        },
        resumeChildren() {
          this.entry.resumeChildren();
        },
        run(e) {
          var t = this.entry,
            r = 3 === t.type ? Du : Mu;
          return (this.runResult = r(t, e));
        },
        throwConstAssignment: function e() {
          "use strict";
          throw new Nu(e);
        },
        updateBindings(e) {
          return this.entry.updateBindings(null, 2), e;
        },
      };
    function Lu(e, t) {
      "use strict";
      return (t.type = e), t;
    }
    function Mu(e, t) {
      "use strict";
      var r = e.module,
        i = e.exports;
      return (r.exports = i), Reflect.apply(t, i, [i, fp(r)]);
    }
    function Du(e, t) {
      "use strict";
      var r = e.module,
        i = e.exports;
      return (
        (r.exports = i),
        e.package.options.cjs.vars && ".mjs" !== e.extname
          ? Reflect.apply(t, i, [i, fp(r)])
          : Reflect.apply(t, void 0, [])
      );
    }
    var Fu,
      ju = Tu,
      Vu = S.inited
        ? S.module.safeJSON
        : (S.module.safeJSON = q(S.external.JSON)),
      Gu = S.inited
        ? S.module.utilCreateSourceMap
        : (S.module.utilCreateSourceMap = (function () {
            "use strict";
            var e = /\n/g;
            return function (t, r) {
              if (!yi(t)) return "";
              for (var i = 0, n = ""; 0 === i || e.test(r); )
                (n += (i ? ";" : "") + "AA" + (i ? "C" : "A") + "A"), (i += 1);
              return (
                '{"version":3,"sources":[' +
                Lr(us(t)) +
                '],"names":[],"mappings":"' +
                n +
                '"}'
              );
            };
          })()),
      $u = S.inited
        ? S.module.utilCreateInlineSourceMap
        : (S.module.utilCreateInlineSourceMap = (function () {
            "use strict";
            return function (e, t) {
              var r = Gu(e, t);
              return "" === r
                ? r
                : "//# sourceMappingURL=data:application/json;charset=utf-8," +
                    os(r);
            };
          })()),
      Bu = S.inited
        ? S.module.moduleInternalCompileSource
        : (S.module.moduleInternalCompileSource = (function () {
            "use strict";
            function e(e, t) {
              var r = t.async,
                i = 0 !== e.transforms,
                n = e.code;
              if (i) {
                var s = null !== e.firstReturnOutsideFunction,
                  a = t.runtimeName;
                null === e.firstAwaitOutsideFunction && (r = !1),
                  (n =
                    "const " +
                    a +
                    "=exports;" +
                    (s ? "return " : "") +
                    a +
                    ".r((" +
                    (r ? "async " : "") +
                    "function(exports,require){" +
                    n +
                    "\n}))");
              } else
                r && ((i = !0), (n = "(async () => { " + Fr(n) + "\n})();"));
              return i && t.sourceMap && (n += $u(e.filename, n)), n;
            }
            function t(e, t) {
              var r = t.cjsVars,
                i = t.runtimeName,
                n = null !== e.firstReturnOutsideFunction,
                s = "yield;" + i + ".s();",
                a = e.yieldIndex,
                o = t.async;
              null === e.firstAwaitOutsideFunction && (o = !1);
              var u = e.code;
              0 === e.transforms && (u = Fr(u)),
                -1 !== a &&
                  (u =
                    0 === a
                      ? s + u
                      : u.slice(0, a) +
                        (59 === u.charCodeAt(a - 1) ? "" : ";") +
                        s +
                        u.slice(a));
              var l =
                "const " +
                i +
                "=exports;" +
                (r
                  ? ""
                  : "__dirname=__filename=arguments=exports=module=require=void 0;") +
                (n ? "return " : "") +
                i +
                ".r((" +
                (o ? "async " : "") +
                "function *(" +
                (r ? "exports,require" : "") +
                '){"use strict";' +
                u +
                "\n}))";
              return t.sourceMap && (l += $u(e.filename, l)), l;
            }
            return function (r, i = {}) {
              var n = 2 === r.sourceType ? t : e;
              return n(r, i);
            };
          })()),
      Uu = S.inited
        ? S.module.utilGetSourceMappingURL
        : (S.module.utilGetSourceMappingURL = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e) return "";
              var t = e.length;
              if (t < 22) return "";
              for (var r = null, i = t; null === r; ) {
                if (
                  ((i = e.lastIndexOf("sourceMappingURL", i)),
                  -1 === i || i < 4)
                )
                  return "";
                var n = i + 16,
                  s = n + 1;
                if (
                  ((i -= 4),
                  47 === e.charCodeAt(i) && 47 === e.charCodeAt(i + 1))
                ) {
                  var a = e.charCodeAt(i + 2);
                  if (
                    !(
                      (64 !== a && 35 !== a) ||
                      ((a = e.charCodeAt(i + 3)),
                      (32 !== a && 9 !== a) ||
                        (n < t && 61 !== e.charCodeAt(n)))
                    )
                  ) {
                    if (s === t) return "";
                    r = e.slice(s);
                  }
                }
              }
              var o = r.indexOf("\n");
              -1 !== o && (r = r.slice(0, o)), (r = r.trim());
              for (var u = r.length, l = -1; ++l < u; ) {
                var c = r.charCodeAt(l);
                if (39 === c || 34 === c || 32 === c || 9 === c) return "";
              }
              return r;
            };
          })()),
      qu = S.inited
        ? S.module.errorGetStackFrames
        : (S.module.errorGetStackFrames =
            ((Fu = ue(function (e, t) {
              return t;
            })),
            function (e) {
              if (!qn(e)) return [];
              var t = mo(e),
                r = Reflect.getOwnPropertyDescriptor(t, "prepareStackTrace");
              k(t, "prepareStackTrace", Fu);
              var i = e.stack;
              return (
                void 0 === r
                  ? Reflect.deleteProperty(t, "prepareStackTrace")
                  : Reflect.defineProperty(t, "prepareStackTrace", r),
                Array.isArray(i) ? i : []
              );
            })),
      Wu = S.inited
        ? S.module.utilIsIdentifierName
        : (S.module.utilIsIdentifierName = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e || 0 === e.length) return !1;
              var t = 0,
                r = e.codePointAt(t);
              if (!Xe(r, !0)) return !1;
              for (
                var i = r;
                void 0 !== (r = e.codePointAt((t += i > 65535 ? 2 : 1)));

              ) {
                if (!Je(r, !0)) return !1;
                i = r;
              }
              return !0;
            };
          })()),
      zu = S.inited
        ? S.module.utilIsObjectEmpty
        : (S.module.utilIsObjectEmpty = (function () {
            "use strict";
            return function (e) {
              for (var t in e) if (L(e, t)) return !1;
              return !0;
            };
          })()),
      Hu = Pe,
      Ku = tn.DEVELOPMENT,
      Xu = tn.ELECTRON_RENDERER,
      Ju = tn.FLAGS,
      Yu = tn.NDB,
      Qu = { input: "" },
      Zu = /^.*?\bexports\b/;
    function el(e, t, r) {
      "use strict";
      var i = e.compileData,
        n = e.type,
        s = 3 === n,
        a = 4 === n,
        o = ".mjs" === e.extname,
        u = 5 === n,
        l = e.runtime;
      null === l &&
        (s || 0 !== i.transforms
          ? (l = ju.enable(e, wn.create()))
          : ((l = wn.create()), (e.runtime = l)));
      var c,
        p,
        h = e.package,
        f = (function (e) {
          return (
            e.package.options.await && S.support.await && ".mjs" !== e.extname
          );
        })(e),
        d = h.options.cjs,
        m = void 0 === l.runResult,
        v = e.module,
        g = S.moduleState.parsing,
        y = !1;
      if (((e.state = g ? 1 : 3), m)) {
        if (((e.running = !0), a))
          l.runResult = (function* () {
            var i = (function (e, t, r) {
              var i = e.module,
                n = i.exports,
                s = e.state,
                a = !1;
              if ("function" == typeof r) {
                var o = ap.get(e.parent);
                a =
                  null !== o &&
                  o.package.options.cjs.extensions &&
                  ".mjs" !== o.extname;
              }
              var u,
                l,
                c = a ? null : Si(Ii(t, "utf8")),
                p = !0;
              try {
                a ? (r(), (l = i.exports)) : (l = Vu.parse(c)), (p = !1);
              } catch (e) {
                (u = e), a || (u.message = t + ": " + u.message);
              }
              if ((a && ((e.state = s), k(i, "exports", n)), p)) throw u;
              for (
                var h = T(l), f = 0, d = null == h ? 0 : h.length;
                f < d;
                f++
              ) {
                var m = h[f];
                Wu(m) &&
                  e.addGetter(m, function () {
                    return Hu;
                  });
              }
              return (
                e.addGetter("default", function () {
                  return Hu;
                }),
                l
              );
            })(e, t, r);
            yield,
              (function (e, t) {
                (e.exports = t), (e.module.exports = t);
                var r = e.getters,
                  i = function (t) {
                    e.addGetter(t, function () {
                      return e.exports[t];
                    });
                  };
                for (var n in r) i(n);
                e.addGetter("default", function () {
                  return e.exports;
                });
              })(e, i);
          })();
        else if (u)
          l.runResult = (function* () {
            var r = { __proto__: null },
              i = (function (e, t, r) {
                for (
                  var i = new WebAssembly.Module(Ii(t)),
                    n = WebAssembly.Module.exports(i),
                    s = WebAssembly.Module.imports(i),
                    a = 0,
                    o = null == n ? 0 : n.length;
                  a < o;
                  a++
                ) {
                  var u = n[a].name;
                  Wu(u) &&
                    e.addGetter(u, function () {
                      return Hu;
                    });
                }
                for (
                  var l = function (t, i) {
                      Su(t, e, [
                        [
                          i,
                          [i],
                          function (e, i) {
                            r[t] = i.name;
                          },
                        ],
                      ]);
                    },
                    c = 0,
                    p = null == s ? 0 : s.length;
                  c < p;
                  c++
                ) {
                  var h = s[c],
                    f = h.module,
                    d = h.name;
                  l(f, d);
                }
                return i;
              })(e, t, r);
            yield,
              (function (e, t, r) {
                e.resumeChildren();
                var i = e.children;
                for (var n in r) {
                  var s = r[n];
                  r[n] = i[s].module.exports;
                }
                var a = e.module.exports,
                  o = e.getters,
                  u = new WebAssembly.Instance(t, r),
                  l = Pn(wn.create(), u.exports);
                e.exports = l;
                var c = function (t) {
                  var r = function () {
                    return e.exports[t];
                  };
                  L(o, t) && e.addGetter(t, r),
                    Reflect.defineProperty(a, t, {
                      configurable: !0,
                      enumerable: !0,
                      get: ue(r),
                      set: ue(function (e) {
                        k(this, t, e);
                      }),
                    });
                };
                for (var p in l) c(p);
              })(e, i, r);
          })();
        else {
          var x = d.vars && !o,
            b = Bu(i, {
              async: f,
              cjsVars: x,
              runtimeName: e.runtimeName,
              sourceMap: tl(e),
            });
          if (s)
            try {
              e._ranthruCompile
                ? (p = Reflect.apply(wl, v, [b, t]))
                : ((e._ranthruCompile = !0), (p = v._compile(b, t)));
            } catch (e) {
              (y = !0), (c = e);
            }
          else {
            var E = v._compile;
            l.runResult = (function* () {
              return yield, (p = Reflect.apply(E, v, [b, t]));
            })();
          }
        }
        e.running = !1;
      }
      var w = l,
        R = w.runResult;
      if (!y && !g && m) {
        e.running = !0;
        try {
          R.next();
        } catch (e) {
          (y = !0), (c = e);
        }
        e.running = !1;
      }
      var I = i.firstAwaitOutsideFunction,
        P = (!d.paths || o) && 1 !== e.type;
      if (
        (y ||
          e.running ||
          !f ||
          !s ||
          null === I ||
          zu(e.getters) ||
          ((y = !0),
          (c = new Jt.SyntaxError(Qu, "await is only valid in async function")),
          (c.column = I.column),
          (c.inModule = P),
          (c.line = I.line)),
        !y && !e.running)
      ) {
        e.running = !0;
        try {
          p = R.next().value;
        } catch (e) {
          (y = !0), (c = e);
        }
        e.running = !1;
      }
      if (!y)
        return (
          (s || u) &&
            Reflect.defineProperty(v, "loaded", {
              configurable: !0,
              enumerable: !0,
              get: ue(function () {
                return !1;
              }),
              set: ue(function (t) {
                t && (k(this, "loaded", t), e.updateBindings(), e.loaded());
              }),
            }),
          (e.state = g ? 2 : 4),
          p
        );
      if (((e.state = 0), sc.state.package.default.options.debug || !ns(c)))
        throw (ds(c), c);
      var A = Cr(ln(c, "message")),
        N = ln(c, "name");
      s &&
        ("SyntaxError" === N || ("ReferenceError" === N && Zu.test(A))) &&
        (h.cache.dirty = !0);
      var _ = go(c);
      throw (
        (null !== _ && (t = _.filename), ms(c, { filename: t, inModule: P }), c)
      );
    }
    function tl(e) {
      "use strict";
      var t = e.package.options.sourceMap;
      return (
        !1 !== t &&
        (t || Ku || Xu || Yu || Ju.inspect) &&
        "" === Uu(e.compileData.code)
      );
    }
    var rl,
      il,
      nl,
      sl,
      al,
      ol = function (e, t, r, i, n) {
        "use strict";
        var s = t.extname,
          a = t.module,
          o = t.package,
          u = o.options,
          l = u.mode,
          c = -1,
          p = !1,
          h = !1,
          f = 1;
        ".cjs" === s
          ? (c = 1)
          : ".json" === s
            ? ((c = 4), (p = !0))
            : ".mjs" === s
              ? (c = 2)
              : ".wasm" === s && ((c = 5), (h = !0)),
          3 === l ? (f = 2) : 2 === l && (f = 3);
        var d = sc.state.package.default,
          m = o === d,
          v = ".mjs" === t.extname,
          g = t.compileData;
        if (null === g) {
          var y = t.cacheName;
          if (((g = xn.from(t)), null === g || 0 !== g.transforms)) {
            if (p || h)
              (t.type = p ? 4 : 5),
                (g = {
                  circular: 0,
                  code: null,
                  codeWithTDZ: null,
                  filename: null,
                  firstAwaitOutsideFunction: null,
                  firstReturnOutsideFunction: null,
                  mtime: -1,
                  scriptData: null,
                  sourceType: c,
                  transforms: 0,
                  yieldIndex: -1,
                });
            else {
              var x = u.cjs,
                b = x.paths && !v,
                E = x.vars && !v,
                w = null === g ? null : g.scriptData,
                R = x.topLevelReturn && !v;
              (g = (function (e, t, r, i) {
                var n;
                try {
                  return xn.compile(r, i);
                } catch (e) {
                  n = e;
                }
                throw (
                  ((t.state = 0),
                  !sc.state.package.default.options.debug && ns(n)
                    ? (Wn(n, e), ms(n, { content: r, filename: i.filename }))
                    : ds(n),
                  n)
                );
              })(e, t, r, {
                cacheName: y,
                cachePath: o.cachePath,
                cjsPaths: b,
                cjsVars: E,
                filename: i,
                hint: c,
                mtime: t.mtime,
                runtimeName: t.runtimeName,
                sourceType: f,
                topLevelReturn: R,
              })),
                (g.scriptData = w),
                2 === g.sourceType && (t.type = 3),
                m &&
                  1 === t.type &&
                  8 === g.transforms &&
                  ((g.code = r), (g.transforms = 0));
            }
            (t.compileData = g), o.cache.compile.set(y, g);
          }
        }
        null !== g && null === g.code && (g.code = r);
        var I = 3 === t.type,
          P = !1;
        if (!I && !h && "function" == typeof n) {
          var A = ap.get(t.parent),
            N = null !== A && 3 === A.type,
            _ = null === A ? null : A.package;
          N || (!m && _ !== d) || (P = !0);
        }
        if (P) {
          t.type = 1;
          for (
            var k = qu(vo(Error, Hn)), C = 0, O = null == k ? 0 : k.length;
            C < O;
            C++
          ) {
            var T = k[C],
              L = T.getFileName();
            if (di(L) && !Ci(L)) return n(r);
          }
          return el(t, i, n);
        }
        var M = S.moduleState,
          D = !1;
        if (!M.parsing) {
          if (!(I || p || h) || 0 !== t.state) return el(t, i, n);
          (D = !0), (M.parsing = !0), (t.state = 1);
        }
        if (I || p || h)
          try {
            var F = el(t, i, n);
            if (
              (-1 === g.circular &&
                (g.circular = (function e(t, r, i) {
                  if (void 0 === i) i = new Set();
                  else if (i.has(r)) return !1;
                  i.add(r);
                  var n = r.children;
                  for (var s in n) {
                    var a = n[s];
                    if (t === a || e(t, a, i)) return !0;
                  }
                  return !1;
                })(t, t)
                  ? 1
                  : 0),
              1 === g.circular && ((t.circular = !0), I))
            ) {
              (t.runtime = null), (a.exports = wn.create());
              var j = g,
                V = j.codeWithTDZ;
              null !== V && (g.code = V), (F = el(t, i, n));
            }
            if (
              (t.updateBindings(),
              -1 !== t._namespaceFinalized && t.finalizeNamespace(),
              !D)
            )
              return F;
          } finally {
            D && (M.parsing = !1);
          }
        return el(t, i, n);
      },
      ul = S.inited
        ? S.module.realCrypto
        : (S.module.realCrypto = fe(A("crypto"))),
      ll = S.inited
        ? S.module.safeCrypto
        : (S.module.safeCrypto = (function () {
            "use strict";
            var e = q(ul);
            return k(e, "Hash", q(e.Hash)), e;
          })()),
      cl = ll.Hash,
      pl = S.inited
        ? S.module.utilMD5
        : (S.module.utilMD5 = (function () {
            "use strict";
            return function (e) {
              var t = new cl("md5");
              return "string" == typeof e && t.update(e), t.digest("hex");
            };
          })()),
      hl = S.inited
        ? S.module.utilGetCacheName
        : (S.module.utilGetCacheName = (function () {
            "use strict";
            var e = b.PACKAGE_VERSION;
            return function (t, r = {}) {
              var i = r.cachePath,
                n = r.filename,
                s = "d41d8cd98f00b204e9800998ecf8427e";
              "string" == typeof i &&
                "string" == typeof n &&
                (s = pl(vn(i, n)));
              var a = pl(
                e + "\0" + JSON.stringify(r.packageOptions) + "\0" + t,
              );
              return s.slice(0, 8) + a.slice(0, 8) + ".js";
            };
          })()),
      fl = Qn(function (e) {
        "use strict";
        return ec.wrapper[0] + e + ec.wrapper[1];
      }, Rn.wrap),
      dl = fl,
      ml = En.of(
        "(function (exports, require, module, __filename, __dirname) { ",
        "\n});",
      ),
      vl = ml,
      gl = tn.ELECTRON,
      yl = b.PACKAGE_RANGE,
      xl = ["exports", "require", "module", "__filename", "__dirname"],
      bl = Rn.prototype,
      El = Qn(function (e, t) {
        "use strict";
        $o(e, "content"), $o(t, "filename");
        var r = ap.get(this),
          i = r.state,
          n = 0 === i;
        if (
          1 !== r.package.options.mode &&
          ".mjs" !== r.extname &&
          (n || 2 === i)
        ) {
          if (void 0 === rl) {
            var s = sc.state.package.default.options,
              a = Pn({}, s.cjs),
              o = Pn({}, s);
            (o.cache = !1), (o.cjs = a), (rl = new Pc("", yl, o));
          }
          var u;
          r.initialize(),
            (r.cacheName = hl(e)),
            (r.package = rl),
            (r.runtimeName = S.runtimeName);
          try {
            u = ol(El, r, e, t);
          } finally {
            n && (r.state = 0);
          }
          return u;
        }
        if (void 0 === sl && ((sl = gl || !S.support.vmCompileFunction), !sl)) {
          var l = new le(vl, {
            defineProperty: (e, t, r) => (
              (sl = !0), In.defineProperty(e, t, r), !0
            ),
            set: (e, t, r, i) => (
              (sl = !0), i === l && (i = e), Reflect.set(e, t, r, i)
            ),
          });
          Reflect.defineProperty(ec, "wrap", {
            configurable: !0,
            enumerable: !0,
            get: ue(function () {
              return dl;
            }),
            set: ue(function (e) {
              (sl = !0), k(this, "wrap", e);
            }),
          }),
            Reflect.defineProperty(ec, "wrapper", {
              configurable: !0,
              enumerable: !0,
              get: ue(function () {
                return l;
              }),
              set: ue(function (e) {
                (sl = !0), k(this, "wrapper", e);
              }),
            });
        }
        var c,
          p = r.compileData;
        if (null !== p) {
          var h = p.scriptData;
          null !== h && (c = h);
        }
        var f = Fr(e);
        if (sc.state.module.breakFirstLine) {
          if (void 0 === il) {
            var d = N.argv[1];
            il = d ? ec._resolveFilename(d) : "repl";
          }
          t === il &&
            ((sc.state.module.breakFirstLine = !1),
            Reflect.deleteProperty(N, "_breakFirstLine"),
            "" === Uu(f) && (f += $u(t, f)),
            (f = "debugger;" + f));
        }
        var m = this.exports,
          v = S.unsafeGlobal,
          g = [m, fp(this), this, t, ye(t)];
        if (gl) {
          if ((g.push(N, v), void 0 === nl)) {
            var y = ec.wrap;
            nl =
              "function" == typeof y && -1 !== (y("") + "").indexOf("Buffer");
          }
          nl && g.push(S.external.Buffer);
        }
        void 0 === al && ((al = v !== S.defaultGlobal), al && (sl = !0));
        var x,
          b,
          E = 3 === r.type;
        E || sl
          ? ((f = E ? dl(f) : ec.wrap(f)),
            (b = new Ma.Script(f, {
              cachedData: c,
              filename: t,
              produceCachedData: !S.support.createCachedData,
            })),
            (x = al
              ? b.runInContext(S.unsafeContext, { filename: t })
              : b.runInThisContext({ filename: t })))
          : ((b = Ma.compileFunction(f, xl, {
              cachedData: c,
              filename: t,
              produceCachedData: !0,
            })),
            (x = b));
        var w = r.package.cachePath;
        if ("" !== w) {
          var R = S.pendingScripts,
            I = R.get(w);
          void 0 === I && ((I = new Map()), R.set(w, I)), I.set(r.cacheName, b);
        }
        var P = S.moduleState,
          A = 0 === P.requireDepth;
        A && ((P.statFast = new Map()), (P.statSync = new Map()));
        var _ = Reflect.apply(x, m, g);
        return A && ((P.statFast = null), (P.statSync = null)), _;
      }, bl._compile),
      wl = El,
      Rl = Rn.prototype,
      Sl = Qn(function (e) {
        "use strict";
        if (($o(e, "filename"), this.loaded))
          throw new S.external.Error("Module already loaded: " + this.id);
        var t = ap.get(this),
          r = t,
          i = r.id,
          n = sc.state.module.scratchCache;
        if (L(n, i)) {
          var s = ap.get(n[i]);
          t !== s &&
            ((s.exports = this.exports),
            (s.module = this),
            (s.runtime = null),
            (t = s),
            ap.set(this, s),
            Reflect.deleteProperty(n, i));
        }
        (function (e, t) {
          e.updateFilename(t);
          var r = vu(ec._extensions, e);
          "" === r && (r = ".js");
          var i = e.module;
          (i.paths = ec._nodeModulePaths(e.dirname)),
            ec._extensions[r](i, t),
            i.loaded || ((i.loaded = !0), e.loaded());
        })(t, e);
      }, Rl.load),
      Il = Sl,
      Pl = bo.ERR_INVALID_ARG_VALUE,
      Al = Rn.prototype,
      Nl = Qn(function (e) {
        "use strict";
        if (($o(e, "request"), "" === e))
          throw new Pl("request", e, "must be a non-empty string");
        var t = S.moduleState;
        t.requireDepth += 1;
        try {
          var r = un(this.filename) ? ap.get(this) : null;
          return null !== r && r._passthruRequire
            ? ((r._passthruRequire = !1), gu(e, this).module.exports)
            : ec._load(e, this);
        } finally {
          t.requireDepth -= 1;
        }
      }, Al.require),
      _l = Nl,
      kl = S.inited
        ? S.module.utilSafeDefaultProperties
        : (S.module.utilSafeDefaultProperties = (function () {
            "use strict";
            return function (e) {
              for (var t = arguments.length, r = 0; ++r < t; )
                for (
                  var i = arguments[r],
                    n = F(i),
                    s = 0,
                    a = null == n ? 0 : n.length;
                  s < a;
                  s++
                ) {
                  var o = n[s];
                  !L(i, o) || (L(e, o) && void 0 !== ln(e, o)) || $(e, i, o);
                }
              return e;
            };
          })()),
      Cl = Qn(function (e) {
        "use strict";
        $o(e, "filename");
        var t = new ec(e);
        return (t.filename = e), (t.paths = ec._nodeModulePaths(ye(e))), fp(t);
      }, Rn.createRequireFromPath),
      Ol = Cl,
      Tl = Qn(function (e, t, r) {
        "use strict";
        $o(e, "request"), Array.isArray(t) || (t = []);
        var i = Vo(e, t, r);
        return "" !== i && i;
      }, Rn._findPath),
      Ll = Tl,
      Ml = S.inited
        ? S.module.utilSafeGetEnv
        : (S.module.utilSafeGetEnv = (function () {
            "use strict";
            var e;
            return function (t) {
              if (
                (void 0 === e && (e = "function" == typeof oe.util.safeGetenv),
                e)
              )
                try {
                  return oe.util.safeGetenv(Cr(t));
                } catch (e) {}
              return cn(t);
            };
          })()),
      Dl = S.inited
        ? S.module.moduleInternalInitGlobalPaths
        : (S.module.moduleInternalInitGlobalPaths = (function () {
            "use strict";
            return function () {
              var e,
                t,
                r,
                i = "win32" === N.platform;
              i
                ? ((e = cn("USERPROFILE")), (t = cn("HOME")))
                : ((e = Ml("HOME")), (t = Ml("NODE_PATH"))),
                (r =
                  e && "string" == typeof e
                    ? [we(e, ".node_modules"), we(e, ".node_libraries")]
                    : []);
              var n = we(N.execPath, "..", i ? "" : "..");
              if ((r.push(we(n, "lib", "node")), t && "string" == typeof t)) {
                var s = t.split(ge),
                  a = r;
                r = [];
                for (var o = 0, u = null == s ? 0 : s.length; o < u; o++) {
                  var l = s[o];
                  "string" == typeof l && "" !== l && r.push(l);
                }
                r.push(...a);
              }
              return r;
            };
          })()),
      Fl = Qn(function () {
        "use strict";
        var e = Dl();
        (sc.state.module.globalPaths = e), (ec.globalPaths = En.from(e));
      }, Rn._initPaths),
      jl = Fl,
      Vl = bo.ERR_REQUIRE_ESM,
      Gl = Qn(function (e, t, r = !1) {
        $o(e, "request");
        var i = S.moduleState.parsing,
          n = ap.get(t);
        if (null !== n && n._passthruRequire)
          return (n._passthruRequire = !1), gu(e, t, r).module.exports;
        var s = null !== n && 1 === n.package.options.mode,
          a = ec._resolveFilename(e, t, r),
          o = sc.state.module.scratchCache,
          u = ec._cache;
        i ? (u = o) : L(o, a) && ((u[a] = o[a]), Reflect.deleteProperty(o, a));
        var l = !1,
          c = fu(a, t, r, u, function (e) {
            "use strict";
            (l = !0),
              (u[a] = e.module),
              (s || ".mjs" === e.extname) && (e._passthruCompile = !0),
              (function (e, t, r, i) {
                var n = e.module,
                  s = !0;
                try {
                  n.load(i), (s = !1);
                } finally {
                  (e._passthruCompile = !1), s && Reflect.deleteProperty(t, r);
                }
              })(e, u, a, a);
          });
        if (!l && s && 3 === c.type) throw new Vl(a);
        return null !== n && (n._lastChild = c), c.module.exports;
      }, Rn._load),
      $l = Gl,
      Bl = Qn(function (e) {
        "use strict";
        if (Array.isArray(e) && 0 !== e.length) {
          var t = new ec("internal/preload", null);
          try {
            t.paths = ec._nodeModulePaths(K());
          } catch (e) {
            if (!qn(e) || "ENOENT" !== e.code) throw (Ul(e), e);
          }
          try {
            for (var r = 0, i = null == e ? 0 : e.length; r < i; r++) {
              var n = e[r];
              t.require(n);
            }
          } catch (e) {
            throw (Ul(e), e);
          }
        }
      }, Rn._preloadModules);
    function Ul(e) {
      "use strict";
      !sc.state.package.default.options.debug && ns(e) ? ms(e) : ds(e);
    }
    var ql = Bl,
      Wl = Qn(function (e, t, r = !1) {
        if (($o(e, "request"), Ni.has(e))) return r ? null : En.of(e, En.of());
        var i = Jo(e, t);
        return r ? i : En.of(e, i);
      }, Rn._resolveLookupPaths),
      zl = Wl,
      Hl = tn.ELECTRON,
      Kl = bo.MODULE_NOT_FOUND,
      Xl = Qn(function (e, t, r = !1, i) {
        if (
          ($o(e, "request"),
          e.startsWith("node:") && (e = e.substr(5)),
          Hl && Eo.has(e))
        )
          return Sn._resolveFilename(e, t, r, i);
        if (Ni.has(e)) return e;
        var n,
          s,
          a,
          o = di(e),
          u = ap.get(t);
        if (
          (null !== u && u.updateFilename(),
          (n = o ? ye(e) : null === u ? "" : u.dirname),
          !V(i))
        ) {
          (s = S.memoize.moduleStaticResolveFilename),
            (a = e + "\0" + n + "\0" + (r ? "1" : ""));
          var l = s.get(a);
          if (void 0 !== l) return l;
        }
        var c,
          p = !o && gi(e),
          h = o || p;
        c =
          h && ec._findPath === Ll && ec._resolveLookupPaths === zl
            ? [n]
            : void 0 === s && Array.isArray(i.paths)
              ? (function (e, t) {
                  "use strict";
                  for (
                    var r = new ec(""),
                      i = [],
                      n = 0,
                      s = null == t ? 0 : t.length;
                    n < s;
                    n++
                  ) {
                    var a = t[n];
                    r.paths = ec._nodeModulePaths(a);
                    for (
                      var o = ec._resolveLookupPaths(e, r, !0),
                        u = 0,
                        l = null == o ? 0 : o.length;
                      u < l;
                      u++
                    ) {
                      var c = o[u];
                      -1 === i.indexOf(c) && i.push(c);
                    }
                  }
                  return i;
                })(e, i.paths)
              : ec._resolveLookupPaths(e, t, !0);
        var f = ec._findPath(e, c, r);
        if (!1 === f) {
          f = "";
          try {
            f = A.resolve(e, { paths: c });
          } catch (e) {}
        }
        if ("" !== f) return void 0 !== s && s.set(a, f), f;
        var d = new Kl(e, t);
        if (!sc.state.package.default.options.debug) {
          var m = { filename: null, inModule: !1 };
          if (null !== u) {
            var v = u.type;
            (m.filename = u.filename),
              (m.inModule =
                (!u.package.options.cjs.paths || ".mjs" === u.extname) &&
                1 !== v &&
                2 !== v);
          }
          ms(d, m);
        }
        throw d;
      }, Rn._resolveFilename),
      Jl = Xl,
      Yl = tn.ELECTRON,
      Ql = Qn(function (e = "", t) {
        (this.children = En.of()),
          (this.exports = wn.create()),
          (this.filename = null),
          (this.id = e),
          (this.loaded = !1),
          (this.parent = t),
          (this.paths = void 0),
          (this.path = $n(this));
        var r = null == t ? null : t.children;
        Array.isArray(r) && En.push(r, this);
      }, Rn);
    (Ql._cache = require.cache),
      (Ql._extensions = { __proto__: null }),
      (Ql._findPath = Ll),
      (Ql._initPaths = jl),
      (Ql._load = $l),
      (Ql._nodeModulePaths = Ho),
      (Ql._preloadModules = ql),
      (Ql._resolveFilename = Jl),
      (Ql._resolveLookupPaths = zl),
      (Ql.Module = Ql),
      (Ql.builtinModules = Object.freeze(En.from(Ai))),
      (Ql.createRequireFromPath = Ol),
      (Ql.wrap = dl),
      Pn(Ql._extensions, Rn._extensions),
      kl(Ql, Rn),
      _(Ql._cache) || (Ql._cache = { __proto__: null }),
      Ql._cache !== Rn._cache &&
        (Ql._cache = new le(Ql._cache, {
          defineProperty(e, t, r) {
            var i = Rn._cache;
            return (
              Bn(t) && _(i) && Reflect.defineProperty(i, t, r),
              In.defineProperty(e, t, r),
              !0
            );
          },
          deleteProperty(e, t) {
            var r = Rn._cache;
            return (
              Bn(t) && _(r) && Reflect.deleteProperty(r, t),
              Reflect.deleteProperty(e, t)
            );
          },
          set(e, t, r, i) {
            var n = Rn._cache;
            return (
              Bn(t) && _(n) && Reflect.set(n, t, r), Reflect.set(e, t, r, i)
            );
          },
        })),
      (Yl && Array.isArray(Sn.wrapper)) || (Ql.wrapper = vl);
    var Zl = Ql.prototype;
    (Zl._compile = wl),
      (Zl.constructor = Ql),
      (Zl.load = Il),
      (Zl.require = _l),
      Array.isArray(Ql.globalPaths) || Ql._initPaths();
    var ec = Ql,
      tc = {
        __proto__: null,
        ".js": function (e, t) {
          "use strict";
          e._compile(Si(Xr(t, "utf8")), t);
        },
        ".json": function (e, t) {
          "use strict";
          var r,
            i = Xr(t, "utf8");
          try {
            r = Vu.parse(i);
          } catch (e) {
            throw ((e.message = t + ": " + e.message), e);
          }
          e.exports = r;
        },
        ".node": function (e, t) {
          "use strict";
          return X(e, nn(t));
        },
      },
      rc = tc,
      ic = tn.FLAGS;
    class nc {
      static init(e) {
        var t = S.loader,
          r = t.get(e);
        return (
          void 0 === r &&
            ((r = {
              module: {
                breakFirstLine: ic.inspectBrk && !ic.eval,
                extensions: rc,
                globalPaths: Array.from(ec.globalPaths),
                mainModule: N.mainModule,
                moduleCache: { __proto__: null },
                scratchCache: { __proto__: null },
              },
              package: { cache: new Map(), default: null },
            }),
            t.set(e, r)),
          (nc.state = r)
        );
      }
    }
    (nc.state = null),
      f(nc, "state", function () {
        return nc.init(JSON.stringify(Pc.createOptions()));
      }),
      U(nc.prototype, null);
    var sc = nc,
      ac = function (e, t, r) {
        "use strict";
        var i,
          n = S.moduleState;
        (n.parsing = !0), (n.requireDepth += 1);
        try {
          i = gu(e, t, r);
        } finally {
          (n.parsing = !1), (n.requireDepth -= 1);
        }
        try {
          i.updateBindings(),
            2 === i.state && (1 !== i.type && yu(i), (i = gu(e, t, r)));
        } finally {
          n.requireDepth -= 1;
        }
        return i;
      },
      oc = S.inited
        ? S.module.utilIsCacheName
        : (S.module.utilIsCacheName = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e || 19 !== e.length || !wo(e)) return !1;
              for (var t = -1; ++t < 16; ) {
                var r = e.charCodeAt(t);
                if (!((r >= 97 && r <= 122) || (r >= 48 && r <= 57))) return !1;
              }
              return !0;
            };
          })()),
      uc = S.inited
        ? S.module.pathIsExtJSON
        : (S.module.pathIsExtJSON = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e) return !1;
              var t = e.length;
              return (
                t > 5 &&
                106 === e.charCodeAt(t - 4) &&
                46 === e.charCodeAt(t - 5) &&
                115 === e.charCodeAt(t - 3) &&
                111 === e.charCodeAt(t - 2) &&
                110 === e.charCodeAt(t - 1)
              );
            };
          })()),
      lc = S.inited
        ? S.module.utilIsFile
        : (S.module.utilIsFile = (function () {
            "use strict";
            return function (e) {
              return 0 === sn(e);
            };
          })()),
      cc = S.inited
        ? S.module.fsReadJSON
        : (S.module.fsReadJSON = (function () {
            "use strict";
            return function (e) {
              var t = Ii(e, "utf8");
              return null === t ? null : dn(t);
            };
          })()),
      pc = S.inited
        ? S.module.fsReadJSON6
        : (S.module.fsReadJSON6 = (function () {
            "use strict";
            return function (e) {
              var t = Ii(e, "utf8");
              return null === t ? null : Ri(t);
            };
          })()),
      hc = S.inited
        ? S.module.fsReaddir
        : (S.module.fsReaddir = (function () {
            "use strict";
            return function (e) {
              if ("string" == typeof e)
                try {
                  return Kr(e);
                } catch (e) {}
              return null;
            };
          })()),
      fc = s(5),
      dc = tn.OPTIONS,
      mc = b.PACKAGE_RANGE,
      vc = b.PACKAGE_VERSION,
      gc = bo.ERR_INVALID_ESM_OPTION,
      yc = bo.ERR_UNKNOWN_ESM_OPTION,
      xc = [".mjs", ".cjs", ".js", ".json"],
      bc = {
        await: !1,
        cache: !0,
        cjs: {
          cache: !1,
          dedefault: !1,
          esModule: !1,
          extensions: !1,
          mutableNamespace: !1,
          namedExports: !1,
          paths: !1,
          topLevelReturn: !1,
          vars: !1,
        },
        debug: !1,
        force: !1,
        mainFields: ["main"],
        mode: 1,
        sourceMap: void 0,
        wasm: !1,
      },
      Ec = {
        cjs: {
          cache: !0,
          dedefault: !1,
          esModule: !0,
          extensions: !0,
          mutableNamespace: !0,
          namedExports: !0,
          paths: !0,
          topLevelReturn: !1,
          vars: !0,
        },
        mode: 2,
      };
    class wc {
      constructor(e, t, r) {
        r = wc.createOptions(r);
        var i = "";
        "string" == typeof r.cache
          ? (i = we(e, r.cache))
          : !1 !== r.cache &&
            (i = e + Re + "node_modules" + Re + ".cache" + Re + "esm");
        var n = S.package.dir;
        if (!n.has(i)) {
          var s = { buffer: null, compile: null, meta: null },
            a = null,
            o = new Map(),
            u = null;
          if ("" !== i) {
            for (
              var l = hc(i),
                c = !1,
                p = !1,
                h = !1,
                f = 0,
                d = null == l ? 0 : l.length;
              f < d;
              f++
            ) {
              var m = l[f];
              if (oc(m)) o.set(m, null);
              else if (46 === m.charCodeAt(0))
                if (".data.blob" === m) c = !0;
                else if (".data.json" === m) h = !0;
                else if (".dirty" === m) {
                  p = !0;
                  break;
                }
            }
            var v = p,
              g = null;
            if (
              (h &&
                !v &&
                ((g = cc(i + Re + ".data.json")),
                (v =
                  null === g ||
                  !L(g, "version") ||
                  g.version !== vc ||
                  !L(g, "meta") ||
                  !V(g.meta))),
              v &&
                ((c = !1),
                (h = !1),
                (o = new Map()),
                p && gn(i + Re + ".dirty"),
                (function (e) {
                  for (
                    var t = we(e, "../@babel/register"),
                      r = hc(t),
                      i = 0,
                      n = null == r ? 0 : r.length;
                    i < n;
                    i++
                  ) {
                    var s = r[i];
                    uc(s) && gn(t + Re + s);
                  }
                })(i)),
              c && (a = Ii(i + Re + ".data.blob")),
              h)
            ) {
              var y = g.meta,
                x = T(y);
              u = new Map();
              for (var b = 0, E = null == x ? 0 : x.length; b < E; b++) {
                var w = x[b];
                u.set(w, y[w]);
              }
            }
          }
          null === a && (a = qr.alloc(0)),
            null === u && (u = new Map()),
            (s.buffer = a),
            (s.compile = o),
            (s.meta = u),
            n.set(i, s);
        }
        (this.cache = n.get(i)),
          (this.cachePath = i),
          (this.dirPath = e),
          (this.options = r),
          (this.range = t);
      }
      clone() {
        var e = this.options,
          t = e.cjs,
          r = Pn({ __proto__: wc.prototype }, this),
          i = Pn({}, e);
        return (i.cjs = Pn({}, t)), (r.options = i), r;
      }
      static get(e, t) {
        "." === e && (e = K());
        var r = sc.state.package,
          i = r.cache;
        "" !== e ||
          i.has("") ||
          i.set("", new wc("", mc, { cache: !1, cjs: { topLevelReturn: !0 } }));
        var n = (function e(t, r) {
          var i = sc.state.package,
            n = i.cache,
            s = i.default,
            a = null;
          if (
            n.has(t) &&
            ((a = n.get(t)), null !== a || void 0 === r.forceOptions)
          )
            return a;
          if ("node_modules" === ve(t)) return n.set(t, null), null;
          if (
            ((a =
              s && s.options.force
                ? s.clone()
                : (function (t, r) {
                    var i,
                      n = t + Re + ".esmrc",
                      s = lc(n) ? Ii(n, "utf8") : null,
                      a = null !== s;
                    a ? (s = Ri(s)) : (n = Vo(n, Hn, !1, xc));
                    var o = r.forceOptions;
                    if (((r.forceOptions = void 0), "" !== n && !a))
                      if (((a = !0), uc(n))) s = pc(n);
                      else {
                        var u = sc.state.package.cache,
                          l = S.moduleState,
                          c = l.parsing;
                        (i = new wc(t, "*", {
                          cache: wc.createOptions(o).cache,
                        })),
                          (l.parsing = !1),
                          u.set(t, i);
                        try {
                          i.options = wc.createOptions(
                            ac(n, null).module.exports,
                          );
                        } finally {
                          u.set(t, null), (l.parsing = c);
                        }
                      }
                    var p,
                      h = t + Re + "package.json",
                      f = lc(h) ? Ii(h, "utf8") : null;
                    if (void 0 === o && null === f) {
                      if (!a) return null;
                      p = e(ye(t), r);
                    }
                    var d = 0;
                    null === f ||
                      a ||
                      ((f = dn(f)),
                      (d = null === f ? -1 : 1),
                      1 === d && !a && L(f, "esm") && ((a = !0), (s = f.esm)));
                    var m = null;
                    if (void 0 !== o) m = "*";
                    else if (p) m = p.range;
                    else if (
                      (0 === d &&
                        null !== f &&
                        ((f = dn(f)), (d = null === f ? -1 : 1)),
                      1 === d &&
                        (m =
                          Rc(f, "dependencies") || Rc(f, "peerDependencies")),
                      null === m)
                    ) {
                      if (!a && !Rc(f, "devDependencies")) return null;
                      m = "*";
                    }
                    return void 0 !== i
                      ? ((i.range = m), i)
                      : (void 0 === o || a || ((a = !0), (s = o)),
                        (!0 !== s && a) || ((a = !0), (s = dc)),
                        1 !== d &&
                          null === f &&
                          (t = (function (e) {
                            var t = S.package.root,
                              r = t.get(e);
                            return (
                              void 0 === r &&
                                ((r =
                                  (function e(t) {
                                    if (
                                      "node_modules" === ve(t) ||
                                      lc(t + Re + "package.json")
                                    )
                                      return t;
                                    var r = ye(t);
                                    return r === t
                                      ? ""
                                      : "node_modules" === ve(r)
                                        ? t
                                        : e(r);
                                  })(e) || e),
                                t.set(e, r)),
                              r
                            );
                          })(t)),
                        new wc(t, m, s));
                  })(t, r)),
            null === a)
          ) {
            var o = ye(t);
            o !== t && (a = e(o, r));
          }
          return n.set(t, a), a;
        })(e, { __proto__: null, forceOptions: t, type: void 0 });
        return null === n ? r.default : n;
      }
      static from(e, t) {
        var r;
        return (
          (r = "string" == typeof e ? (Ni.has(e) ? "" : ye(e)) : $n(e)),
          wc.get(r, t)
        );
      }
      static set(e, t) {
        sc.state.package.cache.set(e, t);
      }
    }
    function Rc(e, t) {
      "use strict";
      if (L(e, t)) {
        var r = e[t];
        if (L(r, "esm")) return Object(fc.validRange)(r.esm);
      }
      return null;
    }
    function Sc(e) {
      "use strict";
      return "dedefault" === e || "topLevelReturn" === e;
    }
    function Ic(e) {
      "use strict";
      return "boolean" == typeof e || 0 === e || 1 === e;
    }
    (wc.createOptions = function (e) {
      "use strict";
      var t = wc.defaultOptions,
        r = [],
        i = {};
      if ("string" == typeof e) r.push("mode"), (i.mode = e);
      else
        for (var n = T(e), s = 0, a = null == n ? 0 : n.length; s < a; s++) {
          var o = n[s];
          if (L(t, o)) r.push(o), (i[o] = e[o]);
          else {
            if ("sourcemap" !== o || -1 !== n.indexOf("sourceMap"))
              throw new yc(o);
            i.sourceMap = e.sourcemap;
          }
        }
      -1 === r.indexOf("cjs") && (i.cjs = Ec.cjs),
        -1 === r.indexOf("mode") && (i.mode = Ec.mode);
      var u = (function (e) {
        var t = wc.defaultOptions.cjs,
          r = {};
        if (void 0 === e) return Pn(r, t);
        if (!V(e)) {
          for (
            var i = T(t), n = !!e, s = 0, a = null == i ? 0 : i.length;
            s < a;
            s++
          ) {
            var o = i[s];
            r[o] = !Sc(o) && n;
          }
          return r;
        }
        for (
          var u = [], l = T(e), c = 0, p = null == l ? 0 : l.length;
          c < p;
          c++
        ) {
          var h = l[c];
          if (L(t, h)) u.push(h), (r[h] = e[h]);
          else {
            if ("interop" !== h || -1 !== l.indexOf("esModule"))
              throw new yc("cjs[" + Lr(h, 39) + "]");
            r.esModule = e.interop;
          }
        }
        for (var f = !0, d = 0, m = null == u ? 0 : u.length; d < m; d++) {
          var v = u[d],
            g = r[v];
          if (!Ic(g)) throw new gc("cjs[" + Lr(v, 39) + "]", g, !0);
          var y = !!g;
          y && !Sc(v) && (f = !1), (r[v] = y);
        }
        var x = f ? Ec.cjs : t;
        return cr(r, x);
      })(i.cjs);
      cr(i, t), (i.cjs = u);
      var l = i.await;
      if (!Ic(l)) throw new gc("await", l);
      i.await = !!l;
      var c = i.cache;
      if (Ic(c)) i.cache = !!c;
      else if ("string" != typeof c) throw new gc("cache", c);
      var p = i.debug;
      if (!Ic(p)) throw new gc("debug", p);
      i.debug = !!p;
      var h = i.force;
      if (!Ic(h)) throw new gc("force", c);
      i.force = !!h;
      var f = t.mainFields,
        d = i.mainFields;
      Array.isArray(d) || (d = [d]),
        (d =
          d === f
            ? [f[0]]
            : Array.from(d, function (e) {
                if ("string" != typeof e) throw new gc("mainFields", d);
                return e;
              })),
        -1 === d.indexOf("main") && d.push("main"),
        (i.mainFields = d);
      var m = i.mode;
      if (3 === m || "all" === m) i.mode = 3;
      else if (2 === m || "auto" === m) i.mode = 2;
      else {
        if (1 !== m && "strict" !== m) throw new gc("mode", m);
        i.mode = 1;
      }
      var v = i.sourceMap;
      if (Ic(v)) i.sourceMap = !!v;
      else if (void 0 !== v) throw new gc("sourceMap", v);
      var g = i.wasm;
      if (!Ic(g)) throw new gc("wasm", g);
      return (i.wasm = !!g), i;
    }),
      (wc.defaultOptions = bc),
      (wc.state = null),
      U(wc.prototype, null);
    var Pc = wc,
      Ac = S.inited
        ? S.module.utilGetCacheStateHash
        : (S.module.utilGetCacheStateHash = (function () {
            "use strict";
            return function (e) {
              return "string" == typeof e ? e.slice(-11, -3) : "";
            };
          })()),
      Nc = S.inited
        ? S.module.GenericDate
        : (S.module.GenericDate = (function () {
            "use strict";
            return { getTime: I(Date.prototype.getTime) };
          })()),
      _c = S.inited
        ? S.module.fsGetStatTimestamp
        : (S.module.fsGetStatTimestamp = (function () {
            "use strict";
            return function (e, t) {
              if (!V(e)) return -1;
              var r = e[t + "Ms"];
              return "number" == typeof r
                ? Math.round(r + 0.5)
                : Nc.getTime(e[t]);
            };
          })()),
      kc = S.inited
        ? S.module.utilIsCalledFromStrictCode
        : (S.module.utilIsCalledFromStrictCode = function () {
            for (
              var e = qu(vo(Error, Hn)), t = 0, r = null == e ? 0 : e.length;
              t < r;
              t++
            ) {
              var i = e[t],
                n = i.getFileName();
              if (n && !Ci(n) && !i.isNative())
                return void 0 === i.getFunction();
            }
            return !1;
          }),
      Cc = S.inited
        ? S.module.utilIsDescriptorMatch
        : (S.module.utilIsDescriptorMatch = (function () {
            "use strict";
            return function (e, t) {
              if (!V(e)) return !V(t);
              for (var r in t) if (!Object.is(e[r], t[r])) return !1;
              return !0;
            };
          })()),
      Oc = S.inited
        ? S.module.utilIsEnumerable
        : (S.module.utilIsEnumerable = (function () {
            "use strict";
            var e = Object.prototype.propertyIsEnumerable;
            return function (t, r) {
              return null != t && e.call(t, r);
            };
          })()),
      Tc = S.inited
        ? S.module.shimPuppeteerExecutionContextPrototypeEvaluateHandle
        : (S.module.shimPuppeteerExecutionContextPrototypeEvaluateHandle =
            (function () {
              "use strict";
              var e = {
                enable(e) {
                  var t =
                    S.memoize
                      .shimPuppeteerExecutionContextPrototypeEvaluateHandle;
                  if (
                    (function (e, t) {
                      var r = _(e) ? e.ExecutionContext : void 0,
                        i = "function" == typeof r ? r.prototype : void 0,
                        n = _(i) ? i.evaluateHandle : void 0;
                      if ("function" != typeof n) return !0;
                      var s = t.get(i);
                      return void 0 !== s || ((s = Xn(n)), t.set(i, s)), s;
                    })(e, t)
                  )
                    return e;
                  var r = e.ExecutionContext.prototype,
                    i = Ns(r.evaluateHandle, function (e, t) {
                      var r = t[0];
                      if ("function" == typeof r) {
                        var i = new le(r, {
                            get: (e, t, r) =>
                              "toString" !== t || L(e, "toString")
                                ? (r === i && (r = e), Reflect.get(e, t, r))
                                : n,
                          }),
                          n = new le(r.toString, {
                            apply: zn(function (e, t, n) {
                              t === i && (t = r);
                              var s = Reflect.apply(e, t, n);
                              return "string" == typeof s ? hs(s) : s;
                            }),
                          });
                        t[0] = i;
                      }
                      return Reflect.apply(e, this, t);
                    });
                  return (
                    Reflect.defineProperty(r, "evaluateHandle", {
                      configurable: !0,
                      value: i,
                      writable: !0,
                    }) && t.set(r, !0),
                    e
                  );
                },
              };
              return e;
            })()),
      Lc = Pe,
      Mc = Ae,
      Dc = {},
      Fc = bo.ERR_EXPORT_STAR_CONFLICT,
      jc = bo.ERR_NS_ASSIGNMENT,
      Vc = bo.ERR_NS_DEFINITION,
      Gc = bo.ERR_NS_DELETION,
      $c = bo.ERR_NS_EXTENSION,
      Bc = bo.ERR_NS_REDEFINITION,
      Uc = bo.ERR_UNDEFINED_IDENTIFIER,
      qc = Re + "lib" + Re + "ExecutionContext.js",
      Wc = Re + "puppeteer" + Re,
      zc = new Date("1985-10-27T00:00Z").getTime(),
      Hc = { value: !0 };
    class Kc {
      constructor(e) {
        this.initialize(e);
      }
      static get(e) {
        if (!V(e)) return null;
        var t = S.entry.cache,
          r = t.get(e);
        if (void 0 === r) r = new Kc(e);
        else if (1 === r.type && 1 === r._loaded) {
          var i = S.bridged,
            n = r.module.exports,
            s = i.get(n);
          void 0 !== s && ((r = s), i.delete(n));
        }
        return void 0 !== r && Kc.set(e, r), r;
      }
      static has(e) {
        return S.entry.cache.has(e);
      }
      static set(e, t) {
        V(e) && S.entry.cache.set(e, t);
      }
      addGetter(e, t) {
        L(t, "id") || (t.id = e),
          L(t, "owner") || (t.owner = this),
          L(t, "type") || (t.type = 1);
        var r = this.type;
        if (1 !== r && 2 !== r && "default" === e) {
          var i = sp(t);
          "function" == typeof i &&
            i.name === this.runtimeName + "anonymous" &&
            Reflect.defineProperty(i, "name", {
              configurable: !0,
              value: "default",
            });
        }
        return (this.getters[e] = t), this;
      }
      addGetters(e) {
        for (var t = 0, r = null == e ? 0 : e.length; t < r; t++) {
          var i = e[t],
            n = i[0],
            s = i[1];
          this.addGetter(n, s);
        }
        return this;
      }
      addGetterFrom(e, t, r = t) {
        var i = this;
        if ("*" === t)
          return this.addGetter(r, function () {
            return e.getExportByName("*", i);
          });
        var n = e.getters,
          s = n[t];
        return (
          3 !== e.type &&
            ".mjs" === this.extname &&
            ((s = function () {
              return e.partialNamespace[t];
            }),
            (s.owner = e)),
          void 0 === s &&
            ((s = function () {
              return e.getters[t]();
            }),
            (s.deferred = !0),
            (s.id = t),
            (s.owner = e)),
          this.addGetter(r, s)
        );
      }
      addSetter(e, t, r, i) {
        (r.last = Dc),
          (r.localNames = t),
          (r.owner = i),
          L(r, "exportedName") || (r.exportedName = null),
          L(r, "type") || (r.type = 1);
        var n = this.setters;
        L(n, e) || (n[e] = []), n[e].push(r);
        for (
          var s = i.importedBindings, a = 0, o = null == t ? 0 : t.length;
          a < o;
          a++
        ) {
          var u = t[a];
          s.has(u) || s.set(u, !1);
        }
        return this;
      }
      addSetters(e, t) {
        for (var r = 0, i = null == e ? 0 : e.length; r < i; r++) {
          var n = e[r],
            s = n[0],
            a = n[1],
            o = n[2];
          this.addSetter(s, a, o, t);
        }
        return this;
      }
      finalizeNamespace() {
        if (1 === this._namespaceFinalized) return this;
        this._namespaceFinalized = 1;
        for (
          var e = this.getters,
            t = T(e).sort(),
            r = 0,
            i = null == t ? 0 : t.length;
          r < i;
          r++
        ) {
          var n = t[r];
          2 !== e[n].type &&
            ((this._completeMutableNamespace[n] = Dc),
            (this._completeNamespace[n] = Dc));
        }
        Object.seal(this._completeNamespace);
        var s = this.type;
        if (3 === s || 5 === s) return this;
        if (this.builtin) {
          for (
            var a = ["default"],
              o = T(this.exports),
              u = 0,
              l = null == o ? 0 : o.length;
            u < l;
            u++
          ) {
            var c = o[u];
            Wu(c) && a.push(c);
          }
          a.sort(),
            Reflect.deleteProperty(this._partialMutableNamespace, "default"),
            Reflect.deleteProperty(this._partialNamespace, "default");
          for (var p = 0, h = null == a ? 0 : a.length; p < h; p++) {
            var f = a[p];
            (this._partialMutableNamespace[f] = Dc),
              (this._partialNamespace[f] = Dc);
          }
        }
        return Object.seal(this._partialNamespace), this;
      }
      getExportByName(e, t) {
        var r = this.type;
        return 3 === r || 5 === r
          ? (function (e, t, r) {
              if ("*" !== t) {
                var i = e.getters[t];
                return void 0 === i ? Lc : sp(i);
              }
              var n =
                  r.package.options.cjs.mutableNamespace &&
                  ".mjs" !== r.extname,
                s = !n || ".mjs" === e.extname;
              return s ? e.completeNamespace : e.completeMutableNamespace;
            })(this, e, t)
          : (function (e, t, r) {
              var i = ".mjs" === r.extname,
                n = e.type;
              if ("*" !== t) {
                if (1 !== e._loaded) return Lc;
                if (2 === n && i && "default" === t) return e.exports;
                var s = e.getters[t];
                return void 0 === s ? Lc : s();
              }
              var a = r.package.options.cjs,
                o = a.namedExports && !i,
                u = a.mutableNamespace && !i,
                l = !u || ".mjs" === e.extname,
                c = !o && 3 !== n;
              return l
                ? c
                  ? e.partialNamespace
                  : e.completeNamespace
                : c
                  ? e.partialMutableNamespace
                  : e.completeMutableNamespace;
            })(this, e, t);
      }
      initialize(e = this.module) {
        var t = this;
        (this._changed = !1),
          (this._completeMutableNamespace = Es()),
          (this._completeNamespace = Es()),
          (this._finalize = null),
          (this._lastChild = null),
          (this._loaded = 0),
          (this._namespaceFinalized = 0),
          (this._partialMutableNamespace = Es({ default: Dc })),
          (this._partialNamespace = Es({ default: Dc })),
          (this._passthruCompile = !1),
          (this._passthruRequire = !1),
          (this._ranthruCompile = !1),
          (this._validation = new Map([["*", !0]])),
          (this.basename = null),
          (this.builtin = !1),
          (this.children = { __proto__: null }),
          (this.circular = !1),
          (this.dirname = null),
          (this.exports = e.exports),
          (this.extname = null),
          (this.filename = null),
          (this.getters = { __proto__: null }),
          (this.id = e.id),
          (this.importedBindings = new Map()),
          (this.module = e),
          (this.name = null),
          (this.parent = e.parent),
          (this.running = !1),
          (this.runtime = null),
          (this.setters = { __proto__: null }),
          (this.setters["*"] = []),
          (this.state = 0),
          (this.type = 1),
          f(this, "cacheName", function () {
            var e = t.package;
            return hl(t.mtime, {
              cachePath: e.cachePath,
              filename: t.filename,
              packageOptions: e.options,
            });
          }),
          f(this, "compileData", function () {
            var e = xn.from(t);
            if (null !== e && 0 !== e.transforms) {
              var r = Ii(t.package.cachePath + Re + t.cacheName, "utf8");
              null !== r && (e.code = r);
            }
            return e;
          }),
          f(this, "completeMutableNamespace", function () {
            return ep(t, t._completeMutableNamespace);
          }),
          f(this, "completeNamespace", function () {
            return Zc(t, t._completeNamespace);
          }),
          f(this, "mtime", function () {
            var e = t.filename;
            if (yi(e)) {
              var r = rn(e);
              if (null !== r) {
                var i = _c(r, "mtime");
                return i < zc && (i = _c(r, "ctime")), i;
              }
            }
            return -1;
          }),
          f(this, "package", function () {
            return Pc.from(t.module);
          }),
          f(this, "partialMutableNamespace", function () {
            return ep(t, t._partialMutableNamespace);
          }),
          f(this, "partialNamespace", function () {
            return Zc(t, t._partialNamespace);
          }),
          f(this, "runtimeName", function () {
            return a("_" + Ac(t.cacheName).slice(0, 3));
          }),
          this.updateFilename(!0);
      }
      loaded() {
        var e = this;
        if (0 !== this._loaded) return this._loaded;
        var t = this.module;
        if (!t.loaded) return (this._loaded = 0);
        this._loaded = -1;
        var r = this.children;
        for (var i in r) if (!r[i].module.loaded) return (this._loaded = 0);
        var n = this.package.options.cjs,
          s = t.exports;
        if (1 === this.type) {
          n.esModule && null != s && s.__esModule && (this.type = 2);
          for (
            var a = tp(this, s),
              o = function (t) {
                e.addGetter(t, function () {
                  return e.exports[t];
                });
              },
              u = 0,
              l = null == a ? 0 : a.length;
            u < l;
            u++
          ) {
            var c = a[u];
            o(c);
          }
          if (1 === this.type) {
            var p = this.filename;
            "string" == typeof p &&
              69 === p.charCodeAt(p.length + -19) &&
              p.endsWith(qc) &&
              -1 !== p.indexOf(Wc) &&
              Tc.enable(s),
              this.addGetter("default", function () {
                return e.exports;
              }),
              (s = ro(this));
          }
          this.exports = s;
        } else if (4 === this.type)
          (s = ro(this)), (t.exports = s), (this.exports = s);
        else if (".mjs" === this.extname) t.exports = Qc(this, s);
        else {
          var h = tp(this);
          n.dedefault && 1 === h.length && "default" === h[0]
            ? (t.exports = s.default)
            : (n.esModule &&
                !L(this.getters, "__esModule") &&
                Reflect.defineProperty(s, "__esModule", Hc),
              (t.exports = n.mutableNamespace
                ? (function (e, t) {
                    var r = rp(),
                      i = new le(t, r);
                    for (var n in (Xc(r, e, i),
                    Yc(r, e, i),
                    Reflect.deleteProperty(r, "has"),
                    r))
                      ue(r[n]);
                    return i;
                  })(this, s)
                : Qc(this, s)));
        }
        return this.finalizeNamespace(), (this._loaded = 1);
      }
      resumeChildren() {
        var e = this.children;
        for (var t in e) {
          var r = e[t];
          if (!r.running) {
            var i = r.runtime,
              n = null === i ? void 0 : i.runResult,
              s = !0;
            try {
              void 0 !== n &&
                r.state < 3 &&
                ((r.state = 3),
                (r.running = !0),
                n.next(),
                (r.module.loaded = !0),
                (r.running = !1)),
                "function" == typeof r._finalize
                  ? r._finalize()
                  : (r.loaded(), r.updateBindings(null, 3), xu(r, this)),
                (s = !1);
            } finally {
              r.state = s ? 0 : 4;
            }
          }
        }
      }
      updateBindings(e, t = 1, r) {
        var i,
          n = this.circular || 2 === t || 3 === t;
        if (n && void 0 !== r && r.has(this)) return this;
        if (
          ("string" == typeof e && (e = [e]),
          (this._changed = !1),
          (function (e, t) {
            if (3 === e.type)
              if (Array.isArray(t))
                for (var r = 0, i = null == t ? 0 : t.length; r < i; r++) {
                  var n = t[r];
                  ip(e, n);
                }
              else for (var s in e.getters) ip(e, s);
          })(this, e),
          (function (e, t, r, i) {
            if (Array.isArray(t))
              for (var n = 0, s = null == t ? 0 : t.length; n < s; n++) {
                var a = t[n];
                np(e, a, r, i);
              }
            else for (var o in e.setters) np(e, o, r, i);
          })(
            this,
            e,
            function (e) {
              var t = e.owner,
                r = t.importedBindings;
              if (e.last !== Lc)
                for (
                  var s = 0, a = e.localNames, o = null == a ? 0 : a.length;
                  s < o;
                  s++
                ) {
                  var u = a[s];
                  r.set(u, !0);
                }
              n && (void 0 === i && (i = new Set()), i.add(t));
            },
            t,
          ),
          (this._changed = !1),
          void 0 === i)
        )
          return this;
        var s = t;
        return (
          1 !== s && (s = 2),
          void 0 === r && (r = new Set()),
          r.add(this),
          i.forEach(function (e) {
            e.loaded(), e.updateBindings(null, s, r);
          }),
          this
        );
      }
      updateFilename(e, t) {
        var r = this.module;
        if (
          ("boolean" == typeof e && ((t = e), (e = void 0)),
          void 0 !== e && (r.filename = e),
          !t && this.filename === r.filename)
        )
          return this;
        var i = $n(r),
          n = r.filename;
        return (
          (this.dirname = i),
          (this.filename = n),
          (this.name = yo(r)),
          "" === i
            ? ((this.basename = n), (this.extname = ""))
            : "string" != typeof n
              ? ((this.basename = ""), (this.extname = ""))
              : ((this.basename = "." === i ? ve(n) : n.slice(i.length + 1)),
                (this.extname = xe(n))),
          this
        );
      }
    }
    function Xc(e, t, r) {
      "use strict";
      (e.get = function (i, n, s) {
        var a,
          o = t.getters,
          u = o[n],
          l = void 0 !== u,
          c = !1;
        if ("string" == typeof n && L(i, n) && Oc(i, n)) {
          var p = 1 !== t._namespaceFinalized;
          if ((!p && l && ((c = !0), (a = u()), (p = a === Lc)), p))
            throw new Uc(n, e.get);
        }
        return 2 === t.type && "default" === n && i === t._partialNamespace
          ? t.exports
          : l
            ? c
              ? a
              : u()
            : (s === r && (s = i), Reflect.get(i, n, s));
      }),
        (e.getOwnPropertyDescriptor = function (t, r) {
          var i = Reflect.getOwnPropertyDescriptor(t, r);
          return void 0 !== i && (i.value = e.get(t, r)), i;
        }),
        (e.has = function (e, t) {
          return t === S.symbol.namespace || Reflect.has(e, t);
        }),
        (e.preventExtensions = function (e) {
          return 1 === t._namespaceFinalized && Reflect.preventExtensions(e);
        });
    }
    function Jc(e, t) {
      (e.defineProperty = function (e, r, i) {
        if (
          1 === t._namespaceFinalized &&
          L(e, r) &&
          Cc(Reflect.getOwnPropertyDescriptor(e, r), i)
        )
          return Reflect.defineProperty(e, r, i);
        if (!kc()) return !1;
        throw L(e, r) ? new Bc(t.module, r) : new Vc(t.module, r);
      }),
        (e.deleteProperty = function (e, r) {
          if (Reflect.deleteProperty(e, r)) return !0;
          if (!kc()) return !1;
          throw new Gc(t.module, r);
        }),
        (e.set = function (e, r) {
          if (!kc()) return !1;
          if (L(e, r)) throw new jc(t.module, r);
          throw new $c(t.module, r);
        });
    }
    function Yc(e, t, r) {
      "use strict";
      (e.defineProperty = function (e, r, i) {
        return (
          1 === t._namespaceFinalized &&
          (In.defineProperty(t.exports, r, i),
          L(e, r) &&
            (t.addGetter(r, function () {
              return t.exports[r];
            }),
            t.updateBindings(r)),
          Reflect.isExtensible(e) || Reflect.defineProperty(e, r, i))
        );
      }),
        (e.deleteProperty = function (e, r) {
          return (
            !!Reflect.deleteProperty(t.exports, r) &&
            (L(e, r) &&
              (t.addGetter(r, function () {
                return t.exports[r];
              }),
              t.updateBindings(r)),
            Reflect.isExtensible(e))
          );
        });
      var i = e.get;
      "function" == typeof i &&
        (e.get = function (e, r, n) {
          var s = t.exports,
            a = i(e, r, n);
          if (L(s, r)) {
            var o = Reflect.get(s, r, n),
              u = t.type;
            if (
              o !== a &&
              ((1 !== u && 4 !== u) || "default" !== r) &&
              xs(e, r)
            )
              return o;
          }
          return a;
        }),
        (e.getOwnPropertyDescriptor = function (r, i) {
          var n = Reflect.getOwnPropertyDescriptor(r, i);
          if (void 0 === n ? !Reflect.isExtensible(r) : !ys(n)) return n;
          var s = t.exports;
          if (L(s, i)) {
            var a,
              o = Reflect.getOwnPropertyDescriptor(s, i);
            if (L(o, "value")) a = o.value;
            else if ("function" == typeof o.get && ((a = sp(o.get)), a === Lc))
              return n;
            if (void 0 === n)
              return {
                configurable: !0,
                enumerable: o.enumerable,
                value: a,
                writable: !0 === o.writable || "function" == typeof o.set,
              };
            n.value = a;
          } else void 0 !== n && (n.value = e.get(r, i));
          return n;
        }),
        (e.set = function (e, i, n, s) {
          if (!to(e, i)) return !1;
          var a = t.exports;
          return (
            s === r && (s = a),
            !!Reflect.set(a, i, n, s) &&
              (L(e, i) &&
                (t.addGetter(i, function () {
                  return t.exports[i];
                }),
                t.updateBindings(i)),
              !0)
          );
        });
    }
    function Qc(e, t) {
      "use strict";
      var r = rp(),
        i = new le(t, r);
      for (var n in (Xc(r, e, i),
      Jc(r, e),
      Reflect.deleteProperty(r, "has"),
      r))
        ue(r[n]);
      return Object.seal(t), i;
    }
    function Zc(e, t) {
      "use strict";
      var r = rp(),
        i = new le(t, r);
      for (var n in (Xc(r, e, i), Jc(r, e), r)) ue(r[n]);
      return i;
    }
    function ep(e, t) {
      "use strict";
      var r = rp(),
        i = new le(t, r);
      for (var n in (Xc(r, e, i), Yc(r, e, i), r)) ue(r[n]);
      return i;
    }
    function tp(e, t = e.exports) {
      var r,
        i = e.type;
      if (1 === i || 2 === i) {
        var n = "function" == typeof t,
          s = bs(t),
          a = D(t);
        r = [];
        for (var o = 0, u = null == s ? 0 : s.length; o < u; o++) {
          var l = s[o];
          (!Oc(t, l) &&
            ("__esModule" === l ||
              (n && "prototype" === l) ||
              (L(a, l) && !Oc(a, l)))) ||
            r.push(l);
        }
      } else r = T(t);
      for (var c = [], p = 0, h = r, f = null == h ? 0 : h.length; p < f; p++) {
        var d = h[p];
        Wu(d) && c.push(d);
      }
      return c;
    }
    function rp() {
      "use strict";
      return {
        defineProperty: null,
        deleteProperty: null,
        get: null,
        getOwnPropertyDescriptor: null,
        has: null,
        set: null,
      };
    }
    function ip(e, t) {
      "use strict";
      var r = e.getters[t];
      if (void 0 !== r && 2 !== r.type) {
        var i = e.exports,
          n = sp(r);
        (L(i, t) && Object.is(i[t], n)) || ((e._changed = !0), (i[t] = n));
      }
    }
    function np(e, t, r, i) {
      "use strict";
      var n = e.setters[t];
      if (void 0 !== n)
        for (var s = 1 === e._loaded, a = e._changed, o = n.length; o--; ) {
          var u = n[o],
            l = e.getExportByName(t, u.owner);
          if (l === Mc) throw (n.splice(o, 1), new Fc(e.module, t));
          var c = u.type,
            p = 2 !== c && !Object.is(u.last, l),
            h = s && 2 === c,
            f = 3 === c,
            d = a && 4 === c,
            m = 3 === i;
          if (p || h || f || d || m) {
            u.last = l;
            var v = l === Lc ? void 0 : l;
            u(v, e) && n.splice(o, 1), (!p && f) || r(u);
          }
        }
    }
    function sp(e) {
      "use strict";
      try {
        return e();
      } catch (e) {}
      return Lc;
    }
    U(Kc.prototype, null);
    var ap = Kc,
      op = S.inited
        ? S.module.utilIsInstalled
        : (S.module.utilIsInstalled = (function () {
            "use strict";
            var e = tn.WIN32,
              t = e ? /[\\/]node_modules[\\/]/ : /\/node_modules\//;
            return function ({ filename: e }) {
              return "string" == typeof e && t.test(e);
            };
          })()),
      up = S.inited
        ? S.module.utilIsOwnModule
        : (S.module.utilIsOwnModule = (function () {
            "use strict";
            var e = b.PACKAGE_DIRNAME;
            return function ({ filename: t }) {
              return "string" == typeof t && t.startsWith(e);
            };
          })()),
      lp = A.resolve,
      cp = lp && lp.paths,
      pp = S.symbol,
      hp = new Map([
        [pp.entry, ap],
        [pp.realGetProxyDetails, pe],
        [pp.realRequire, A],
        [pp.runtime, ju],
        [pp.shared, S],
      ]),
      fp = function (e, t, r) {
        "use strict";
        var i = up(e),
          n = function (r) {
            r.startsWith("node:") && (r = r.substr(5));
            var n = i
              ? (function (e) {
                  if ("symbol" == typeof e) return hp.get(e);
                })(r)
              : void 0;
            return void 0 === n ? t.call(e, r) : n;
          };
        function s(t, i) {
          return $o(t, "request"), r.call(e, t, i);
        }
        function a(t) {
          return $o(t, "request"), ec._resolveLookupPaths(t, e, !0);
        }
        return (
          "function" != typeof t &&
            (t = function (t) {
              return e.require(t);
            }),
          "function" != typeof r &&
            (r = function (t, r) {
              return ec._resolveFilename(t, e, !1, r);
            }),
          (n.cache = ec._cache),
          (n.extensions = ec._extensions),
          (n.main = N.mainModule),
          (n.resolve = s),
          (s.paths = a),
          op(e) ||
            ((s.paths = Qn(a, cp)), (n.resolve = Qn(s, lp)), (n = Qn(n, A))),
          n
        );
      };
    S.inited ||
      (S.module.utilPrepareContext = (function () {
        "use strict";
        var e = [
            "Array",
            "ArrayBuffer",
            "Atomics",
            "BigInt",
            "BigInt64Array",
            "BigUint64Array",
            "Boolean",
            "DataView",
            "Date",
            "Error",
            "EvalError",
            "Float32Array",
            "Float64Array",
            "Function",
            "Int16Array",
            "Int32Array",
            "Int8Array",
            "Map",
            "Number",
            "Object",
            "Promise",
            "Proxy",
            "RangeError",
            "ReferenceError",
            "Reflect",
            "RegExp",
            "Set",
            "SharedArrayBuffer",
            "String",
            "Symbol",
            "SyntaxError",
            "TypeError",
            "URIError",
            "Uint16Array",
            "Uint32Array",
            "Uint8Array",
            "Uint8ClampedArray",
            "WeakMap",
            "WeakSet",
          ],
          t = [
            "Buffer",
            "URL",
            "URLSearchParams",
            "clearImmediate",
            "clearInterval",
            "clearTimeout",
            "console",
            "global",
            "process",
            "setImmediate",
            "setInterval",
            "setTimeout",
          ];
        function r(e, t) {
          var r = "'" + e + "' is deprecated, use 'global'";
          return {
            configurable: !0,
            get: si(
              function () {
                return t;
              },
              r,
              "DEP0016",
            ),
            set: si(
              function (t) {
                Reflect.defineProperty(this, e, {
                  configurable: !0,
                  value: t,
                  writable: !0,
                });
              },
              r,
              "DEP0016",
            ),
          };
        }
        function i(e) {
          var t = e + ":";
          return (
            (t +=
              "Array" === e
                ? "[].constructor"
                : "BigInt" === e
                  ? "1n.constructor"
                  : "Boolean" === e
                    ? "true.constructor"
                    : "Function" === e
                      ? "(function () {}).constructor"
                      : "Number" === e
                        ? "1..constructor"
                        : "Object" === e
                          ? "({}).constructor"
                          : "RegExp" === e
                            ? "/./.constructor"
                            : "String" === e
                              ? '"".constructor'
                              : "this." + e),
            t
          );
        }
        return function (n) {
          var s = S.defaultGlobal;
          if (n === s) return n;
          for (var a = j(s), o = 0, u = null == a ? 0 : a.length; o < u; o++) {
            var l = a[o],
              c = void 0;
            "global" === l
              ? (c = {
                  configurable: !0,
                  enumerable: !0,
                  value: n,
                  writable: !0,
                })
              : "GLOBAL" === l || "root" === l
                ? (c = r(l, n))
                : L(n, l) || (c = Reflect.getOwnPropertyDescriptor(s, l)),
              void 0 !== c && Reflect.defineProperty(n, l, c);
          }
          for (var p = 0, h = null == t ? 0 : t.length; p < h; p++) {
            var f = t[p],
              d = Reflect.getOwnPropertyDescriptor(n, f);
            void 0 !== d &&
              Reflect.deleteProperty(n, f) &&
              Reflect.defineProperty(n, f, d);
          }
          for (
            var m = new Map(), v = 0, g = null == e ? 0 : e.length;
            v < g;
            v++
          ) {
            var y = e[v];
            L(n, y) &&
              (m.set(y, Reflect.getOwnPropertyDescriptor(n, y)),
              Reflect.deleteProperty(n, y));
          }
          if (0 === m.size) return n;
          var x = new Fa(
            "({" +
              (function () {
                var e,
                  t = m.keys(),
                  r = "";
                do {
                  (e = t.next()), (r += i(e.value) + (e.done ? "" : ","));
                } while (!e.done);
                return r;
              })() +
              "})",
          ).runInContext(n);
          return (
            m.forEach(function (e, t) {
              Reflect.defineProperty(n, t, e);
              var r = n[t],
                i = x[t];
              if (
                r !== i &&
                _(r) &&
                _(i) &&
                ("Error" === t
                  ? (i.prepareStackTrace = function (...e) {
                      return Reflect.apply(r.prepareStackTrace, r, e);
                    })
                  : "Object" === t &&
                    Reflect.defineProperty(r, Symbol.hasInstance, {
                      configurable: !0,
                      value: function (e) {
                        return this === r
                          ? e instanceof i || Ha(e, r)
                          : Ha(e, this);
                      },
                    }),
                "function" == typeof i && (U(i, D(r)), L(i, "prototype")))
              ) {
                var s = i.prototype;
                if (_(s)) {
                  var a = r.prototype;
                  U(s, a),
                    L(a, "constructor") &&
                      Reflect.defineProperty(
                        s,
                        "constructor",
                        Reflect.getOwnPropertyDescriptor(a, "constructor"),
                      );
                }
              }
            }),
            n
          );
        };
      })());
    var dp = S.inited
        ? S.module.utilSatisfies
        : (S.module.utilSatisfies = (function () {
            "use strict";
            var e = { includePrerelease: !0 };
            return function (t, r) {
              if ("string" != typeof t || "string" != typeof r) return !1;
              var i = t + "\0" + r,
                n = S.memoize.utilSatisfies,
                s = n.get(i);
              return (
                void 0 === s &&
                  ((s = Object(fc.satisfies)(t, r, e)), n.set(i, s)),
                s
              );
            };
          })()),
      mp = S.inited
        ? S.module.envHasLoaderValue
        : (S.module.envHasLoaderValue = (function () {
            "use strict";
            return function e(t) {
              if ("string" == typeof t) {
                if (yi(t)) {
                  var r = t;
                  if (("" === xe(r) && (r += Re + "index.js"), Ci(So(r))))
                    return !0;
                } else if (
                  45 !== t.charCodeAt(0) &&
                  Ci(
                    (function (e, t, r) {
                      var i,
                        n = S.entry,
                        s = n.cache,
                        a = sc.state.package,
                        o = a.cache;
                      (n.cache = new WeakMap()), (a.cache = new Map());
                      var u = !0;
                      try {
                        (i = hu(e, t, !1)), (u = !1);
                      } catch (e) {}
                      return (n.cache = s), (a.cache = o), u ? "" : i;
                    })(t, ji),
                  )
                )
                  return !0;
              } else if (_(t))
                for (
                  var i = T(t), n = 0, s = null == i ? 0 : i.length;
                  n < s;
                  n++
                ) {
                  var a = i[n];
                  if (e(t[a])) return !0;
                }
              return !1;
            };
          })()),
      vp = S.inited
        ? S.module.envHasLoaderArg
        : (S.module.envHasLoaderArg = (function () {
            "use strict";
            return function (e) {
              return pi(e, function (e) {
                return 123 === e.charCodeAt(0) ? mp(dn(e)) : mp(e);
              });
            };
          })()),
      gp = S.inited
        ? S.module.envIsSideloaded
        : (S.module.envIsSideloaded = (function () {
            "use strict";
            return function () {
              if (Hi() || Xi()) return !0;
              var e = z.slice(2);
              if (0 === e.length) return !1;
              var t = So(z[1]),
                r = t.lastIndexOf(Re + "node_modules" + Re);
              if (-1 === r || !vp(e)) return !1;
              var i = S.entry,
                n = i.cache,
                s = sc.state.package,
                a = s.cache;
              (i.cache = new WeakMap()), (s.cache = new Map());
              var o = !1;
              return (
                (null === Pc.get(K()) && null === Pc.get(t.slice(0, r + 1))) ||
                  (o = !0),
                (i.cache = n),
                (s.cache = a),
                o
              );
            };
          })()),
      yp = S.inited
        ? S.module.utilMaxSatisfying
        : (S.module.utilMaxSatisfying = (function () {
            "use strict";
            return function (e, t) {
              if (!Array.isArray(e) || "string" != typeof t) return null;
              var r = (1 === e.length ? e[0] : En.join(e)) + "\0" + t,
                i = S.memoize.utilMaxSatisfying,
                n = i.get(r);
              return (
                void 0 === n &&
                  ((n = Object(fc.maxSatisfying)(e, t)), i.set(r, n)),
                n
              );
            };
          })()),
      xp = S.inited
        ? S.module.utilSetSilent
        : (S.module.utilSetSilent = (function () {
            "use strict";
            return function (e, t, r) {
              C(function () {
                try {
                  e[t] = r;
                } catch (e) {}
              });
            };
          })()),
      bp = S.inited
        ? S.module.Wrapper
        : (S.module.Wrapper = (function () {
            "use strict";
            var e = b.PACKAGE_RANGE,
              t = {
                find(e, t, i) {
                  var n = r(e, t);
                  if (null !== n) {
                    var s = yp(n.versions, i);
                    if (null !== s) {
                      var a = n.wrappers.get(s);
                      if (void 0 !== a) return a;
                    }
                  }
                  return null;
                },
                manage(e, r, i) {
                  var n = t.unwrap(e, r),
                    s = Ns(n, function (e, t) {
                      var r = new.target;
                      return void 0 === r
                        ? Reflect.apply(i, this, [s, e, t])
                        : Reflect.construct(i, [s, e, t], r);
                    });
                  Reflect.defineProperty(s, S.symbol.wrapper, {
                    configurable: !0,
                    value: n,
                  }),
                    xp(e, r, s);
                },
                unwrap(e, t) {
                  var r = C(function () {
                      return e[t];
                    }),
                    i = S.symbol.wrapper;
                  return L(r, i) ? r[i] : r;
                },
                wrap(n, s, a) {
                  var o = (function (e, n) {
                    var s = r(e, n);
                    return null === s
                      ? (function (e, r) {
                          var n = (function (e) {
                              var t = i(e);
                              return null === t
                                ? (function (e) {
                                    var t = new Map();
                                    return (
                                      Reflect.defineProperty(
                                        e,
                                        S.symbol.wrapper,
                                        { configurable: !0, value: t },
                                      ),
                                      t
                                    );
                                  })(e)
                                : t;
                            })(e),
                            s = {
                              raw: t.unwrap(e, r),
                              versions: [],
                              wrappers: new Map(),
                            };
                          return n.set(r, s), s;
                        })(e, n)
                      : s;
                  })(n, s);
                  void 0 === o.wrappers.get(e) &&
                    (En.push(o.versions, e), o.wrappers.set(e, ue(a)));
                },
              };
            function r(e, t) {
              var r,
                n = i(e);
              return null !== n && (r = n.get(t)), void 0 === r ? null : r;
            }
            function i(e) {
              var t = S.symbol.wrapper;
              return L(e, t) ? e[t] : null;
            }
            return t;
          })()),
      Ep = S.inited
        ? S.module.utilRelaxRange
        : (S.module.utilRelaxRange = (function () {
            "use strict";
            return function (e) {
              if ("string" != typeof e) return "*";
              var t = e.charCodeAt(0);
              if (94 !== t) {
                if (t >= 48 && t <= 57) return "^" + e;
                if (126 === t || 118 === t || 61 === t) return "^" + e.slice(1);
              }
              return e;
            };
          })()),
      wp = tn.OPTIONS,
      Rp = b.PACKAGE_VERSION,
      Sp = bo.ERR_REQUIRE_ESM,
      Ip = [".js", ".json", ".mjs", ".cjs", ".wasm"],
      Pp = /^.*?\b(?:im|ex)port\b/,
      Ap = Rn._extensions[".js"];
    function Np(e, t) {
      "use strict";
      throw new Sp(t);
    }
    function _p(e, t, r) {
      "use strict";
      var i;
      try {
        return Reflect.apply(e, this, t);
      } catch (e) {
        i = e;
      }
      if (sc.state.package.default.options.debug || !ns(i)) throw (ds(i), i);
      var n = ln(i, "name"),
        s = t[1];
      if ("SyntaxError" === n) {
        var a = Cr(ln(i, "message")),
          o = r.range;
        if (Pp.test(a) && !dp(Rp, o)) {
          var u = "Expected esm@" + o + ". Using esm@" + Rp + ": " + s;
          Reflect.defineProperty(i, "message", {
            configurable: !0,
            value: u,
            writable: !0,
          });
          var l = ln(i, "stack");
          "string" == typeof l &&
            Reflect.defineProperty(i, "stack", {
              configurable: !0,
              value: l.replace(a, function () {
                return u;
              }),
              writable: !0,
            });
        }
        r.cache.dirty = !0;
      }
      var c = go(i);
      throw (null !== c && (s = c.filename), ms(i, { filename: s }), i);
    }
    Reflect.defineProperty(Np, S.symbol.mjs, { value: !0 });
    var kp = function (e, t) {
        "use strict";
        var r = e._extensions,
          i = new Map(),
          n = Pc.from(t);
        null === n && (n = Pc.from(t, wp || !0));
        var s = n.clone(),
          a = s.options;
        (s.range = "*"),
          a.force || 3 !== a.mode || (a.mode = 2),
          (sc.state.package.default = s),
          (ec._extensions = r);
        var o = function (e, t, i) {
          var n = i[1],
            s = Pc.from(n),
            a = bp.find(r, ".js", Ep(s.range));
          return null === a
            ? _p.call(this, t, i, s)
            : Reflect.apply(a, this, [e, t, i]);
        };
        function u(e, t, r) {
          var n = this,
            s = r[0],
            a = r[1],
            o = !ap.has(s),
            u = ap.get(s),
            l = u.extname,
            c = u.package,
            p = function (e) {
              if (((u.state = 3), "string" == typeof e)) {
                var i = s._compile,
                  a = L(s, "_compile");
                k(
                  s,
                  "_compile",
                  ue(function (t, r) {
                    return (
                      a
                        ? k(this, "_compile", i)
                        : Reflect.deleteProperty(this, "_compile"),
                      Reflect.apply(i, this, [e, r])
                    );
                  }),
                );
              }
              var o,
                l = !0;
              try {
                (o = _p.call(n, t, r, c)), (l = !1);
              } finally {
                u.state = l ? 0 : 4;
              }
              return o;
            };
          if (
            (o && U(s, ec.prototype), u._passthruCompile || (o && ".mjs" === l))
          )
            return (u._passthruCompile = !1), p();
          var h = u.compileData;
          if ((null !== h && null !== h.code) || ".json" === l || ".wasm" === l)
            return (u._ranthruCompile = !0), void ol(e, u, null, a, p);
          if (this === sc.state.module.extensions)
            return (u._ranthruCompile = !0), void ol(e, u, Ii(a, "utf8"), a, p);
          var f = s._compile,
            d = o && L(s, "_compile"),
            m = ue(function (t, r) {
              o &&
                (d
                  ? k(this, "_compile", f)
                  : Reflect.deleteProperty(this, "_compile"));
              var i = L(this, S.symbol._compile)
                ? this[S.symbol._compile]
                : null;
              "function" == typeof i
                ? (Reflect.deleteProperty(this, S.symbol._compile),
                  Reflect.apply(i, this, [t, r]))
                : ol(e, u, t, r, p);
            });
          if (
            (o
              ? k(s, "_compile", m)
              : ((u._ranthruCompile = !0),
                Reflect.defineProperty(s, S.symbol._compile, {
                  configurable: !0,
                  value: m,
                })),
            (null === h || 0 === h.transforms) && i.get(t))
          )
            return _p.call(this, t, r, c);
          s._compile(Ii(a, "utf8"), a);
        }
        for (var l = 0, c = null == Ip ? 0 : Ip.length; l < c; l++) {
          var p = Ip[l],
            h = ".mjs" === p;
          h && !L(r, p) && (r[p] = Qn(Np, Ap));
          var f = ".wasm" === p;
          if (!f || S.support.wasm) {
            L(r, p) || (r[p] = Ap);
            var d = bp.unwrap(r, p),
              m = "function" == typeof d && !L(d, S.symbol.mjs);
            if (h && m)
              try {
                d();
              } catch (e) {
                qn(e) && "ERR_REQUIRE_ESM" === e.code && (m = !1);
              }
            bp.manage(r, p, o),
              bp.wrap(r, p, u),
              i.set(d, m),
              (sc.state.module.extensions[p] = r[p]);
          }
        }
      },
      Cp = tn.FLAGS,
      Op = function (e) {
        "use strict";
        var t = ec._cache;
        for (var r in t)
          if (r.endsWith(Re + ".pnp.js")) {
            Reflect.deleteProperty(t, r);
            break;
          }
        for (
          var i = 0, n = Cp.preloadModules, s = null == n ? 0 : n.length;
          i < s;
          i++
        ) {
          var a = n[i];
          if (a.endsWith(Re + ".pnp.js")) {
            ec._preloadModules([a]), (e._resolveFilename = ec._resolveFilename);
            break;
          }
        }
      },
      Tp = b.PACKAGE_RANGE,
      Lp = function (e) {
        "use strict";
        bp.manage(e, "_fatalException", function (t, r, i) {
          var n = bp.find(e, "_fatalException", Tp);
          return null === n
            ? Reflect.apply(r, this, i)
            : Reflect.apply(n, this, [t, r, i]);
        }),
          bp.wrap(e, "_fatalException", function (e, t, r) {
            var i = r[0];
            return (
              !sc.state.package.default.options.debug && ns(i) ? ms(i) : ds(i),
              Reflect.apply(t, this, r)
            );
          }),
          bp.manage(e, "emitWarning", function (t, r, i) {
            var n = bp.find(e, "emitWarning", Tp);
            return null === n
              ? Reflect.apply(r, this, i)
              : Reflect.apply(n, this, [t, r, i]);
          }),
          bp.wrap(e, "emitWarning", function (e, t, r) {
            var i = r[0];
            return (
              "string" == typeof i && (r[0] = fs(i)), Reflect.apply(t, this, r)
            );
          });
      },
      Mp = bo.ERR_INVALID_ARG_VALUE,
      Dp = S.inited
        ? S.module.shimProcessBindingUtilGetProxyDetails
        : (S.module.shimProcessBindingUtilGetProxyDetails = (function () {
            "use strict";
            var e = {
              enable(e) {
                var t,
                  r,
                  i = S.memoize.shimProcessBindingUtilGetProxyDetails;
                if (
                  (C(function () {
                    try {
                      (r = e.process.binding("util")), (t = r.getProxyDetails);
                    } catch (e) {}
                  }),
                  (function (e, t, r) {
                    if (!_(e) || "function" != typeof t) return !0;
                    var i = r.get(e);
                    if (void 0 !== i) return i;
                    i = !0;
                    try {
                      i = void 0 === t(new le(Kn, Kn));
                    } catch (e) {}
                    return r.set(e, i), i;
                  })(r, t, i))
                )
                  return e;
                var n = zn(function (e, ...t) {
                  var i = t[t.length - 1],
                    n = i[0];
                  if (!Xn(n)) return Reflect.apply(e, r, [n]);
                });
                return (
                  k(
                    r,
                    "getProxyDetails",
                    new le(t, { apply: n, construct: n }),
                  ) && i.set(r, !0),
                  e
                );
              },
            };
            return e;
          })()),
      Fp = S.inited ? S.module.realREPL : (S.module.realREPL = fe(A("repl"))),
      jp = S.inited ? S.module.safeREPL : (S.module.safeREPL = q(Fp)),
      Vp = jp.REPLServer,
      Gp = S.inited
        ? S.module.acornAcornParse
        : (S.module.acornAcornParse = (function () {
            "use strict";
            var e = {
              enable(e) {
                e.parse = t;
              },
            };
            function t(e, t) {
              var r,
                i,
                n = !0;
              t = cr({ sourceType: 2, strict: !1 }, t);
              try {
                (r = pr.parse(e, t)), (n = !1);
              } catch (e) {
                i = e;
              }
              if (n) {
                t.sourceType = 1;
                try {
                  (r = pr.parse(e, t)), (n = !1);
                } catch (e) {}
              }
              if (n) throw i;
              return r;
            }
            return e;
          })()),
      $p = S.inited
        ? S.module.acornInternalAcorn
        : (S.module.acornInternalAcorn = (function () {
            "use strict";
            var e = tn.INTERNAL,
              t = {
                enable() {
                  if (e) {
                    var t = ce("internal/deps/acorn/acorn/dist/acorn");
                    _(t) && Gp.enable(t);
                  }
                },
              };
            return t;
          })()),
      Bp = S.inited
        ? S.module.acornWalkDynamicImport
        : (S.module.acornWalkDynamicImport = (function () {
            "use strict";
            var e = { enable: (e) => ((e.base.Import = M), e) };
            return e;
          })()),
      Up = S.inited
        ? S.module.acornInternalWalk
        : (S.module.acornInternalWalk = (function () {
            "use strict";
            var e = tn.INTERNAL,
              t = {
                enable() {
                  if (e) {
                    var t = ce("internal/deps/acorn/acorn-walk/dist/walk");
                    _(t) && Bp.enable(t);
                  }
                },
              };
            return t;
          })()),
      qp = tn.CHECK,
      Wp = tn.EVAL,
      zp = tn.FLAGS,
      Hp = tn.HAS_INSPECTOR,
      Kp = tn.INTERNAL,
      Xp = tn.REPL,
      Jp = bo.ERR_INVALID_ARG_TYPE;
    function Yp(e, t, r) {
      "use strict";
      Reflect.defineProperty(e, t, {
        configurable: !0,
        value: r,
        writable: !0,
      });
    }
    function Qp(e, t, r) {
      "use strict";
      var i;
      try {
        return Reflect.apply(e, this, t);
      } catch (e) {
        i = e;
      }
      throw (
        (!sc.state.package.default.options.debug && ns(i)
          ? ms(i, { content: r })
          : ds(i),
        i)
      );
    }
    var Zp,
      eh = function (e) {
        "use strict";
        var t;
        function r(e) {
          U(e, ec.prototype),
            (t = ap.get(e)),
            (t.addBuiltinModules = (function (e) {
              var t = [
                  "assert",
                  "async_hooks",
                  "buffer",
                  "child_process",
                  "cluster",
                  "crypto",
                  "dgram",
                  "dns",
                  "domain",
                  "events",
                  "fs",
                  "http",
                  "http2",
                  "https",
                  "net",
                  "os",
                  "path",
                  "perf_hooks",
                  "punycode",
                  "querystring",
                  "readline",
                  "repl",
                  "stream",
                  "string_decoder",
                  "tls",
                  "tty",
                  "url",
                  "util",
                  "v8",
                  "vm",
                  "zlib",
                ],
                r = t.length;
              return (
                Hp && t.push("inspector"),
                zp.experimentalWorker && t.push("worker_threads"),
                t.length !== r && t.sort(),
                function (r) {
                  var i = e.require;
                  Yp(r, "console", i("console")),
                    Yp(r, "process", i("process"));
                  for (
                    var n = function (e) {
                        var t = ue(function (t) {
                          Reflect.defineProperty(this, e, {
                            configurable: !0,
                            value: t,
                            writable: !0,
                          });
                        });
                        Reflect.defineProperty(r, e, {
                          configurable: !0,
                          get: ue(function () {
                            this[e] = void 0;
                            var r = i(e);
                            return (
                              Reflect.defineProperty(this, e, {
                                configurable: !0,
                                get: function () {
                                  return r;
                                },
                                set: t,
                              }),
                              r
                            );
                          }),
                          set: t,
                        });
                      },
                      s = 0,
                      a = null == t ? 0 : t.length;
                    s < a;
                    s++
                  ) {
                    var o = t[s];
                    n(o);
                  }
                }
              );
            })(t)),
            (t.package = Pc.get("")),
            (t.require = fp(e)),
            (t.runtime = null),
            (t.runtimeName = S.runtimeName),
            ju.enable(t, wn.create());
        }
        bp.manage(e, "createScript", function (t, r, i) {
          var n = bp.find(e, "createScript", "*");
          return Reflect.apply(n, this, [t, r, i]);
        }),
          bp.wrap(e, "createScript", function (r, i, [n, s]) {
            (s = Pn({}, s)), (s.produceCachedData = !0);
            var a = hl(n),
              o = t.package.cache.compile,
              u = t,
              l = u.runtimeName,
              c = o.get(a);
            if ((void 0 === c && (c = null), (t.state = 1), null === c)) {
              var p = {
                cjsPaths: !0,
                cjsVars: !0,
                generateVarDeclarations: !0,
                pragmas: !1,
                runtimeName: l,
                sourceType: 3,
                strict: !1,
              };
              (c = Qp(xn.compile, [n, p], n)), o.set(a, c);
            } else
              null !== c.scriptData &&
                s.produceCachedData &&
                !L(s, "cachedData") &&
                (s.cachedData = c.scriptData);
            t.state = 2;
            var h =
                '(()=>{var g=Function("return this")(),m=g.module,e=m&&m.exports,n="' +
                l +
                '";if(e&&!g[n]){m.exports=e.entry.exports;require=e.entry.require;e.entry.addBuiltinModules(g);Reflect.defineProperty(g,n,{__proto__:null,value:e})}})();' +
                c.code,
              f = Qp.call(e, i, [h, s], n);
            f.cachedDataProduced && (c.scriptData = f.cachedData);
            var d = function (e, r) {
              t._validation.clear(),
                (t.cacheName = a),
                (t.compileData = c),
                (t.state = 3),
                (t.type = 2 === c.sourceType ? 3 : 1);
              var i = Qp.call(this, e, r, n);
              return (t.state = 4), i;
            };
            return (
              (f.runInContext = zt(f.runInContext, d)),
              (f.runInThisContext = zt(f.runInThisContext, d)),
              f
            );
          }),
          qp
            ? (e.Script = Ns(e.Script, function (t, [i, n]) {
                e.Script = t;
                var s = O(ec, "wrapper");
                if (Array.isArray(s)) {
                  var a = s[0],
                    o = s[1];
                  "string" == typeof a &&
                    "string" == typeof o &&
                    (i = i.slice(a.length, -o.length));
                }
                return r(ji), e.createScript(i, n);
              }))
            : Wp
              ? ((e.runInThisContext = Ns(
                  e.runInThisContext,
                  function (t, [i, n]) {
                    return (
                      (e.runInThisContext = t),
                      r(S.unsafeGlobal.module),
                      e.createScript(i, n).runInThisContext(n)
                    );
                  },
                )),
                (Rn.prototype._compile = ec.prototype._compile))
              : Xp &&
                (function () {
                  var t = Vp.prototype.createContext;
                  if (
                    ("<repl>" === ji.id
                      ? r(ji)
                      : "function" == typeof t &&
                        (Vp.prototype.createContext = Ns(t, function () {
                          (Vp.prototype.createContext = t),
                            Reflect.defineProperty(this, "writer", {
                              configurable: !0,
                              enumerable: !0,
                              get() {},
                              set(e) {
                                var t = Qn(function (e) {
                                  return Cs(e, t.options);
                                }, e);
                                return (
                                  (t.options = e.options),
                                  (t.options.colors = this.useColors),
                                  Reflect.defineProperty(Cs, "replDefaults", {
                                    configurable: !0,
                                    enumerable: !0,
                                    get: () => t.options,
                                    set(e) {
                                      if (!V(e))
                                        throw new Jp("options", "Object", e);
                                      return Pn(t.options, e);
                                    },
                                  }),
                                  k(this, "writer", t),
                                  k(Fp, "writer", t),
                                  t
                                );
                              },
                            });
                          var e = Reflect.apply(t, this, []),
                            i = e.module;
                          return (
                            Reflect.defineProperty(S.unsafeGlobal, "module", {
                              configurable: !0,
                              get: () => i,
                              set(e) {
                                (i = e), r(i);
                              },
                            }),
                            r(i),
                            e
                          );
                        })),
                    (Va.createScript = e.createScript),
                    Kp &&
                      zp.experimentalREPLAwait &&
                      ($p.enable(), Up.enable()),
                    S.support.replShowProxy)
                  )
                    k(ii, "inspect", Cs);
                  else {
                    var i = ii.inspect;
                    u(
                      ii,
                      "inspect",
                      ue(function () {
                        return (this.inspect = Cs), i;
                      }),
                    ),
                      c(
                        ii,
                        "inspect",
                        ue(function (e) {
                          k(this, "inspect", e);
                        }),
                      );
                  }
                })();
      },
      th = tn.CHECK,
      rh = tn.CLI,
      ih = tn.EVAL,
      nh = tn.INTERNAL,
      sh = tn.PRELOADED,
      ah = tn.REPL,
      oh = tn.YARN_PNP,
      uh = bo.ERR_INVALID_ARG_TYPE,
      lh = S.safeGlobal,
      ch = S.unsafeGlobal;
    S.inited && !S.reloaded
      ? (Yn.enable(ch),
        Dp.enable(ch),
        (Zp = function (e, t) {
          "use strict";
          if (!V(e)) throw new uh("module", "object");
          var r, i, n;
          if (void 0 === t) {
            var s = Pc.from(e);
            null !== s && (r = JSON.stringify(s.options));
          } else
            (t = Pc.createOptions(t)),
              (r = JSON.stringify({ name: yo(e), options: t }));
          return (
            void 0 !== r && sc.init(r),
            void 0 !== t && Pc.from(e, t),
            kp(ec, e),
            op(e) || Lp(N),
            oh && Op(Go),
            (i = e),
            (n = fp(
              i,
              function (e) {
                if (($o(e, "request"), "" === e))
                  throw new Mp("request", e, "must be a non-empty string");
                var t = hu(e, i),
                  r = sc.state.package.default,
                  n = ye(t);
                Pc.get(n) === r && Pc.set(n, r.clone());
                var s = ac(e, i),
                  a = s.module.exports;
                return 1 !== s.type && S.bridged.set(a, s), a;
              },
              function (e, t) {
                return hu(e, i, !1, t);
              },
            )),
            (n.main = sc.state.module.mainModule),
            n
          );
        }))
      : ((Zp = S),
        (Zp.inited = !0),
        (Zp.reloaded = !1),
        Yn.enable(lh),
        Dp.enable(lh),
        Yn.enable(ch),
        Dp.enable(ch),
        th
          ? eh(Ma)
          : ih || ah
            ? (kp(ec), Lp(N), eh(Ma))
            : (rh || nh || gp()) &&
              (kp(Rn),
              (function (e) {
                "use strict";
                bp.manage(e, "runMain", function (t, r, i) {
                  var n = N.argv,
                    s = n[1],
                    a = hu(s, null, !0),
                    o = Pc.from(a),
                    u = bp.find(e, "runMain", Ep(o.range));
                  return null === u
                    ? Reflect.apply(r, this, i)
                    : Reflect.apply(u, this, [t, r, i]);
                }),
                  bp.wrap(e, "runMain", function () {
                    var e,
                      t = N.argv,
                      r = t[1],
                      i = hu(r, null, !0),
                      n = sc.state.package.default,
                      s = ye(i);
                    Pc.get(s) === n && Pc.set(s, n.clone());
                    try {
                      ac(r, null, !0);
                    } catch (e) {
                      throw (
                        (!n.options.debug && ns(e)
                          ? ms(e, { filename: i })
                          : ds(e),
                        e)
                      );
                    }
                    (e = O(N, "_tickCallback")),
                      "function" == typeof e && Reflect.apply(e, N, []);
                  }),
                  (ec.runMain = e.runMain);
              })(Rn),
              Lp(N)),
        nh &&
          (function (e) {
            "use strict";
            (e.console = po.console.module.exports),
              (e.process = po.process.module.exports);
          })(ch),
        sh && oh && Op(Go)),
      (n.default = Zp);
  },
]).default;
