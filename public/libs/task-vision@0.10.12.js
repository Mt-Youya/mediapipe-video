var t = "undefined" != typeof self ? self : {}

function e(e) {
    t: {
        for (var n = ["CLOSURE_FLAGS"], r = t, s = 0; s < n.length; s++)
            if (null == (r = r[n[s]])) {
                n = null
                break t
            }
        n = r
    }
    return null != (e = n && n[e]) && e
}

function n() {
    throw Error("Invalid UTF8")
}

function r(t, e) {
    return (e = String.fromCharCode.apply(null, e)), null == t ? e : t + e
}

let s, i
const o = "undefined" != typeof TextDecoder
let a
const h = "undefined" != typeof TextEncoder

function c(t) {
    if (h) t = (a ||= new TextEncoder()).encode(t)
    else {
        let n = 0
        const r = new Uint8Array(3 * t.length)
        for (let s = 0; s < t.length; s++) {
            var e = t.charCodeAt(s)
            if (128 > e) r[n++] = e
            else {
                if (2048 > e) r[n++] = (e >> 6) | 192
                else {
                    if (55296 <= e && 57343 >= e) {
                        if (56319 >= e && s < t.length) {
                            const i = t.charCodeAt(++s)
                            if (56320 <= i && 57343 >= i) {
                                ;(e = 1024 * (e - 55296) + i - 56320 + 65536),
                                    (r[n++] = (e >> 18) | 240),
                                    (r[n++] = ((e >> 12) & 63) | 128),
                                    (r[n++] = ((e >> 6) & 63) | 128),
                                    (r[n++] = (63 & e) | 128)
                                continue
                            }
                            s--
                        }
                        e = 65533
                    }
                    ;(r[n++] = (e >> 12) | 224), (r[n++] = ((e >> 6) & 63) | 128)
                }
                r[n++] = (63 & e) | 128
            }
        }
        t = n === r.length ? r : r.subarray(0, n)
    }
    return t
}

var u,
    l = e(610401301),
    d = e(188588736)
const f = t.navigator

function p(t) {
    return !!l && !!u && u.brands.some(({ brand: e }) => e && -1 != e.indexOf(t))
}

function g(e) {
    var n
    return ((n = t.navigator) && (n = n.userAgent)) || (n = ""), -1 != n.indexOf(e)
}

function m() {
    return !!l && !!u && 0 < u.brands.length
}

function y() {
    return m() ? p("Chromium") : ((g("Chrome") || g("CriOS")) && !(!m() && g("Edge"))) || g("Silk")
}

u = (f && f.userAgentData) || null
var _ = !m() && (g("Trident") || g("MSIE"))
!g("Android") || y(),
    y(),
g("Safari") &&
(y() ||
    (!m() && g("Coast")) ||
    (!m() && g("Opera")) ||
    (!m() && g("Edge")) ||
    (m() ? p("Microsoft Edge") : g("Edg/")) ||
    (m() && p("Opera")))
var v = {},
    E = null

function w(t) {
    var e = t.length,
        n = (3 * e) / 4
    n % 3 ? (n = Math.floor(n)) : -1 != "=.".indexOf(t[e - 1]) && (n = -1 != "=.".indexOf(t[e - 2]) ? n - 2 : n - 1)
    var r = new Uint8Array(n),
        s = 0
    return (
        (function(t, e) {
            function n(e) {
                for (; r < t.length;) {
                    var n = t.charAt(r++),
                        s = E[n]
                    if (null != s) return s
                    if (!/^[\s\xa0]*$/.test(n)) throw Error("Unknown base64 encoding at char: " + n)
                }
                return e
            }

            T()
            for (var r = 0; ;) {
                var s = n(-1),
                    i = n(0),
                    o = n(64),
                    a = n(64)
                if (64 === a && -1 === s) break
                e((s << 2) | (i >> 4)), 64 != o && (e(((i << 4) & 240) | (o >> 2)), 64 != a && e(((o << 6) & 192) | a))
            }
        })(t, function(t) {
            r[s++] = t
        }),
            s !== n ? r.subarray(0, s) : r
    )
}

function T() {
    if (!E) {
        E = {}
        for (
            var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),
                e = ["+/=", "+/", "-_=", "-_.", "-_"],
                n = 0;
            5 > n;
            n++
        ) {
            var r = t.concat(e[n].split(""))
            v[n] = r
            for (var s = 0; s < r.length; s++) {
                var i = r[s]
                void 0 === E[i] && (E[i] = s)
            }
        }
    }
}

var A = "undefined" != typeof Uint8Array,
    b = !_ && "function" == typeof btoa

function k(t) {
    if (!b) {
        var e
        void 0 === e && (e = 0), T(), (e = v[e])
        var n = Array(Math.floor(t.length / 3)),
            r = e[64] || ""
        let h = 0,
            c = 0
        for (; h < t.length - 2; h += 3) {
            var s = t[h],
                i = t[h + 1],
                o = t[h + 2],
                a = e[s >> 2]
            ;(s = e[((3 & s) << 4) | (i >> 4)]),
                (i = e[((15 & i) << 2) | (o >> 6)]),
                (o = e[63 & o]),
                (n[c++] = a + s + i + o)
        }
        switch (((a = 0), (o = r), t.length - h)) {
            case 2:
                o = e[(15 & (a = t[h + 1])) << 2] || r
            case 1:
                ;(t = t[h]), (n[c] = e[t >> 2] + e[((3 & t) << 4) | (a >> 4)] + o + r)
        }
        return n.join("")
    }
    for (e = "", n = 0, r = t.length - 10240; n < r;) e += String.fromCharCode.apply(null, t.subarray(n, (n += 10240)))
    return (e += String.fromCharCode.apply(null, n ? t.subarray(n) : t)), btoa(e)
}

const x = /[-_.]/g,
    S = { "-": "+", _: "/", ".": "=" }

function L(t) {
    return S[t] || ""
}

function F(t) {
    if (!b) return w(t)
    x.test(t) && (t = t.replace(x, L)), (t = atob(t))
    const e = new Uint8Array(t.length)
    for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n)
    return e
}

function R(t) {
    return A && null != t && t instanceof Uint8Array
}

let M

function P() {
    return (M ||= new Uint8Array(0))
}

var O = {}
let C

function I(t) {
    if (t !== O) throw Error("illegal external caller")
}

function D() {
    return (C ||= new U(null, O))
}

function N(t) {
    I(O)
    var e = t.g
    return null == (e = null == e || R(e) ? e : "string" == typeof e ? F(e) : null) ? e : (t.g = e)
}

var U = class {
    constructor(t, e) {
        if ((I(e), (this.g = t), null != t && 0 === t.length))
            throw Error("ByteString should be constructed with non-empty values")
    }

    h() {
        const t = N(this)
        return t ? new Uint8Array(t) : P()
    }
}

function B(t, e) {
    return Error(`Invalid wire type: ${t} (at position ${e})`)
}

function G() {
    return Error("Failed to read varint, encoding is invalid.")
}

function j(t, e) {
    return Error(`Tried to read past the end of the data ${e} > ${t}`)
}

function V(t) {
    if ("string" == typeof t) return { buffer: F(t), N: !1 }
    if (Array.isArray(t)) return { buffer: new Uint8Array(t), N: !1 }
    if (t.constructor === Uint8Array) return { buffer: t, N: !1 }
    if (t.constructor === ArrayBuffer) return { buffer: new Uint8Array(t), N: !1 }
    if (t.constructor === U) return { buffer: N(t) || P(), N: !0 }
    if (t instanceof Uint8Array) return { buffer: new Uint8Array(t.buffer, t.byteOffset, t.byteLength), N: !1 }
    throw Error(
        "Type not convertible to a Uint8Array, expected a Uint8Array, an ArrayBuffer, a base64 encoded string, a ByteString or an Array of numbers",
    )
}

function X() {
    return "function" == typeof BigInt
}

const H = "function" == typeof Uint8Array.prototype.slice
let W,
    z = 0,
    K = 0

function Y(t) {
    const e = 0 > t
    let n = (t = Math.abs(t)) >>> 0
    if (((t = Math.floor((t - n) / 4294967296)), e)) {
        const [e, r] = nt(n, t)
        ;(t = r), (n = e)
    }
    ;(z = n >>> 0), (K = t >>> 0)
}

function $(t) {
    const e = (W ||= new DataView(new ArrayBuffer(8)))
    e.setFloat32(0, +t, !0), (K = 0), (z = e.getUint32(0, !0))
}

function q(t, e) {
    return 4294967296 * e + (t >>> 0)
}

function J(t, e) {
    const n = 2147483648 & e
    return n && ((e = ~e >>> 0), 0 == (t = (1 + ~t) >>> 0) && (e = (e + 1) >>> 0)), (t = q(t, e)), n ? -t : t
}

function Z(t, e) {
    if (((t >>>= 0), 2097151 >= (e >>>= 0))) var n = "" + (4294967296 * e + t)
    else
        X()
            ? (n = "" + ((BigInt(e) << BigInt(32)) | BigInt(t)))
            : ((t =
                (16777215 & t) +
                6777216 * (n = 16777215 & ((t >>> 24) | (e << 8))) +
                6710656 * (e = (e >> 16) & 65535)),
                (n += 8147497 * e),
                (e *= 2),
            1e7 <= t && ((n += Math.floor(t / 1e7)), (t %= 1e7)),
            1e7 <= n && ((e += Math.floor(n / 1e7)), (n %= 1e7)),
                (n = e + Q(n) + Q(t)))
    return n
}

function Q(t) {
    return (t = String(t)), "0000000".slice(t.length) + t
}

function tt() {
    var t = z,
        e = K
    if (2147483648 & e)
        if (X()) t = "" + ((BigInt(0 | e) << BigInt(32)) | BigInt(t >>> 0))
        else {
            const [n, r] = nt(t, e)
            t = "-" + Z(n, r)
        }
    else t = Z(t, e)
    return t
}

function et(t) {
    if (16 > t.length) Y(Number(t))
    else if (X())
        (t = BigInt(t)),
            (z = Number(t & BigInt(4294967295)) >>> 0),
            (K = Number((t >> BigInt(32)) & BigInt(4294967295)))
    else {
        const e = +("-" === t[0])
        K = z = 0
        const n = t.length
        for (let r = e, s = ((n - e) % 6) + e; s <= n; r = s, s += 6) {
            const e = Number(t.slice(r, s))
            ;(K *= 1e6),
                (z = 1e6 * z + e),
            4294967296 <= z && ((K += Math.trunc(z / 4294967296)), (K >>>= 0), (z >>>= 0))
        }
        if (e) {
            const [t, e] = nt(z, K)
            ;(z = t), (K = e)
        }
    }
}

function nt(t, e) {
    return (e = ~e), t ? (t = 1 + ~t) : (e += 1), [t, e]
}

function rt(t, e) {
    let n,
        r = 0,
        s = 0,
        i = 0
    const o = t.h
    let a = t.g
    do {
        ;(n = o[a++]), (r |= (127 & n) << i), (i += 7)
    } while (32 > i && 128 & n)
    for (32 < i && (s |= (127 & n) >> 4), i = 3; 32 > i && 128 & n; i += 7) (n = o[a++]), (s |= (127 & n) << i)
    if ((lt(t, a), 128 > n)) return e(r >>> 0, s >>> 0)
    throw G()
}

function st(t) {
    let e = 0,
        n = t.g
    const r = n + 10,
        s = t.h
    for (; n < r;) {
        const r = s[n++]
        if (((e |= r), 0 == (128 & r))) return lt(t, n), !!(127 & e)
    }
    throw G()
}

function it(t) {
    const e = t.h
    let n = t.g,
        r = e[n++],
        s = 127 & r
    if (
        128 & r &&
        ((r = e[n++]),
            (s |= (127 & r) << 7),
        128 & r &&
        ((r = e[n++]),
            (s |= (127 & r) << 14),
        128 & r &&
        ((r = e[n++]),
            (s |= (127 & r) << 21),
        128 & r &&
        ((r = e[n++]),
            (s |= r << 28),
        128 & r && 128 & e[n++] && 128 & e[n++] && 128 & e[n++] && 128 & e[n++] && 128 & e[n++]))))
    )
        throw G()
    return lt(t, n), s
}

function ot(t) {
    return it(t) >>> 0
}

function at(t) {
    var e = t.h
    const n = t.g,
        r = e[n],
        s = e[n + 1],
        i = e[n + 2]
    return (e = e[n + 3]), lt(t, t.g + 4), ((r << 0) | (s << 8) | (i << 16) | (e << 24)) >>> 0
}

function ht(t) {
    var e = at(t)
    t = 2 * (e >> 31) + 1
    const n = (e >>> 23) & 255
    return (
        (e &= 8388607),
            255 == n
                ? e
                    ? NaN
                    : (1 / 0) * t
                : 0 == n
                    ? t * Math.pow(2, -149) * e
                    : t * Math.pow(2, n - 150) * (e + Math.pow(2, 23))
    )
}

function ct(t) {
    return it(t)
}

function ut(t, e, { ca: n = !1 } = {}) {
    ;(t.ca = n), e && ((e = V(e)), (t.h = e.buffer), (t.m = e.N), (t.j = 0), (t.l = t.h.length), (t.g = t.j))
}

function lt(t, e) {
    if (((t.g = e), e > t.l)) throw j(t.l, e)
}

function dt(t, e) {
    if (0 > e) throw Error(`Tried to read a negative byte length: ${e}`)
    const n = t.g,
        r = n + e
    if (r > t.l) throw j(e, t.l - n)
    return (t.g = r), n
}

function ft(t, e) {
    if (0 == e) return D()
    var n = dt(t, e)
    return (
        t.ca && t.m
            ? (n = t.h.subarray(n, n + e))
            : ((t = t.h), (n = n === (e = n + e) ? P() : H ? t.slice(n, e) : new Uint8Array(t.subarray(n, e)))),
            0 == n.length ? D() : new U(n, O)
    )
}

var pt = []

function gt(t) {
    var e = t.g
    if (e.g == e.l) return !1
    t.l = t.g.g
    var n = ot(t.g)
    if (((e = n >>> 3), !(0 <= (n &= 7) && 5 >= n))) throw B(n, t.l)
    if (1 > e) throw Error(`Invalid field number: ${e} (at position ${t.l})`)
    return (t.m = e), (t.h = n), !0
}

function mt(t) {
    switch (t.h) {
        case 0:
            0 != t.h ? mt(t) : st(t.g)
            break
        case 1:
            lt((t = t.g), t.g + 8)
            break
        case 2:
            if (2 != t.h) mt(t)
            else {
                var e = ot(t.g)
                lt((t = t.g), t.g + e)
            }
            break
        case 5:
            lt((t = t.g), t.g + 4)
            break
        case 3:
            for (e = t.m; ;) {
                if (!gt(t)) throw Error("Unmatched start-group tag: stream EOF")
                if (4 == t.h) {
                    if (t.m != e) throw Error("Unmatched end-group tag")
                    break
                }
                mt(t)
            }
            break
        default:
            throw B(t.h, t.l)
    }
}

function yt(t, e, n) {
    const r = t.g.l,
        s = ot(t.g),
        i = t.g.g + s
    let o = i - r
    if ((0 >= o && ((t.g.l = i), n(e, t, void 0, void 0, void 0), (o = i - t.g.g)), o))
        throw Error(
            `Message parsing ended unexpectedly. Expected to read ${s} bytes, instead read ${
                s - o
            } bytes, either the data ended unexpectedly or the message misreported its own length`,
        )
    return (t.g.g = i), (t.g.l = r), e
}

function _t(t) {
    var e = ot(t.g),
        a = dt((t = t.g), e)
    if (((t = t.h), o)) {
        var h,
            c = t
        ;(h = i) || (h = i = new TextDecoder("utf-8", { fatal: !0 })),
            (e = a + e),
            (c = 0 === a && e === c.length ? c : c.subarray(a, e))
        try {
            var u = h.decode(c)
        } catch (t) {
            if (void 0 === s) {
                try {
                    h.decode(new Uint8Array([128]))
                } catch (t) {
                }
                try {
                    h.decode(new Uint8Array([97])), (s = !0)
                } catch (t) {
                    s = !1
                }
            }
            throw (!s && (i = void 0), t)
        }
    } else {
        ;(e = (u = a) + e), (a = [])
        let s,
            i = null
        for (; u < e;) {
            var l = t[u++]
            128 > l
                ? a.push(l)
                : 224 > l
                    ? u >= e
                        ? n()
                        : ((s = t[u++]), 194 > l || 128 != (192 & s) ? (u--, n()) : a.push(((31 & l) << 6) | (63 & s)))
                    : 240 > l
                        ? u >= e - 1
                            ? n()
                            : ((s = t[u++]),
                                128 != (192 & s) ||
                                (224 === l && 160 > s) ||
                                (237 === l && 160 <= s) ||
                                128 != (192 & (h = t[u++]))
                                    ? (u--, n())
                                    : a.push(((15 & l) << 12) | ((63 & s) << 6) | (63 & h)))
                        : 244 >= l
                            ? u >= e - 2
                                ? n()
                                : ((s = t[u++]),
                                    128 != (192 & s) ||
                                    0 != (s - 144 + (l << 28)) >> 30 ||
                                    128 != (192 & (h = t[u++])) ||
                                    128 != (192 & (c = t[u++]))
                                        ? (u--, n())
                                        : ((l = ((7 & l) << 18) | ((63 & s) << 12) | ((63 & h) << 6) | (63 & c)),
                                            (l -= 65536),
                                            a.push(55296 + ((l >> 10) & 1023), 56320 + (1023 & l))))
                            : n(),
            8192 <= a.length && ((i = r(i, a)), (a.length = 0))
        }
        u = r(i, a)
    }
    return u
}

function vt(t) {
    const e = ot(t.g)
    return ft(t.g, e)
}

function Et(t, e, n) {
    var r = ot(t.g)
    for (r = t.g.g + r; t.g.g < r;) n.push(e(t.g))
}

var wt = []

function Tt(t) {
    return t ? (/^\d+$/.test(t) ? (et(t), new At(z, K)) : null) : (bt ||= new At(0, 0))
}

var At = class {
    constructor(t, e) {
        ;(this.h = t >>> 0), (this.g = e >>> 0)
    }
}
let bt

function kt(t) {
    return t ? (/^-?\d+$/.test(t) ? (et(t), new xt(z, K)) : null) : (St ||= new xt(0, 0))
}

var xt = class {
    constructor(t, e) {
        ;(this.h = t >>> 0), (this.g = e >>> 0)
    }
}
let St

function Lt(t, e, n) {
    for (; 0 < n || 127 < e;) t.g.push((127 & e) | 128), (e = ((e >>> 7) | (n << 25)) >>> 0), (n >>>= 7)
    t.g.push(e)
}

function Ft(t, e) {
    for (; 127 < e;) t.g.push((127 & e) | 128), (e >>>= 7)
    t.g.push(e)
}

function Rt(t, e) {
    if (0 <= e) Ft(t, e)
    else {
        for (let n = 0; 9 > n; n++) t.g.push((127 & e) | 128), (e >>= 7)
        t.g.push(1)
    }
}

function Mt(t, e) {
    t.g.push((e >>> 0) & 255), t.g.push((e >>> 8) & 255), t.g.push((e >>> 16) & 255), t.g.push((e >>> 24) & 255)
}

function Pt(t, e) {
    0 !== e.length && (t.l.push(e), (t.h += e.length))
}

function Ot(t, e, n) {
    Ft(t.g, 8 * e + n)
}

function Ct(t, e) {
    return Ot(t, e, 2), (e = t.g.end()), Pt(t, e), e.push(t.h), e
}

function It(t, e) {
    var n = e.pop()
    for (n = t.h + t.g.length() - n; 127 < n;) e.push((127 & n) | 128), (n >>>= 7), t.h++
    e.push(n), t.h++
}

function Dt(t, e, n) {
    Ot(t, e, 2), Ft(t.g, n.length), Pt(t, t.g.end()), Pt(t, n)
}

function Nt(t, e, n, r) {
    null != n && ((e = Ct(t, e)), r(n, t), It(t, e))
}

class Ut {
    constructor(t, e, n, r) {
        ;(this.g = t), (this.h = e), (this.l = n), (this.pa = r)
    }
}

function Bt(t) {
    return Array.prototype.slice.call(t)
}

function Gt(t) {
    return "function" == typeof Symbol && "symbol" == typeof Symbol() ? Symbol() : t
}

var jt = Gt(),
    Vt = Gt("0di"),
    Xt = jt
        ? (t, e) => {
            t[jt] |= e
        }
        : (t, e) => {
            void 0 !== t.g
                ? (t.g |= e)
                : Object.defineProperties(t, { g: { value: e, configurable: !0, writable: !0, enumerable: !1 } })
        },
    Ht = jt
        ? (t, e) => {
            t[jt] &= ~e
        }
        : (t, e) => {
            void 0 !== t.g && (t.g &= ~e)
        }

function Wt(t, e, n) {
    return n ? t | e : t & ~e
}

var zt = jt ? t => 0 | t[jt] : t => 0 | t.g,
    Kt = jt ? t => t[jt] : t => t.g,
    Yt = jt
        ? (t, e) => ((t[jt] = e), t)
        : (t, e) => (
            void 0 !== t.g
                ? (t.g = e)
                : Object.defineProperties(t, { g: { value: e, configurable: !0, writable: !0, enumerable: !1 } }),
                t
        )

function $t(t) {
    return Xt(t, 34), t
}

function qt(t, e) {
    Yt(e, -14591 & (0 | t))
}

function Jt(t, e) {
    Yt(e, -14557 & (34 | t))
}

function Zt(t) {
    return 0 === (t = (t >> 14) & 1023) ? 536870912 : t
}

var Qt,
    te = {},
    ee = {}

function ne(t) {
    return !(!t || "object" != typeof t || t.Ja !== ee)
}

function re(t) {
    return null !== t && "object" == typeof t && !Array.isArray(t) && t.constructor === Object
}

function se(t, e, n) {
    if (null != t)
        if ("string" == typeof t) t = t ? new U(t, O) : D()
        else if (t.constructor !== U)
            if (R(t)) t = t.length ? new U(n ? t : new Uint8Array(t), O) : D()
            else {
                if (!e) throw Error()
                t = void 0
            }
    return t
}

function ie(t, e, n) {
    if (!Array.isArray(t) || t.length) return !1
    const r = zt(t)
    return !!(1 & r) || (!(!e || !(Array.isArray(e) ? e.includes(n) : e.has(n))) && (Yt(t, 1 | r), !0))
}

const oe = []

function ae(t) {
    if (2 & t) throw Error()
}

Yt(oe, 55), (Qt = Object.freeze(oe))

class he {
    constructor(t, e, n) {
        ;(this.l = 0), (this.g = t), (this.h = e), (this.m = n)
    }

    next() {
        if (this.l < this.g.length) {
            const t = this.g[this.l++]
            return { done: !1, value: this.h ? this.h.call(this.m, t) : t }
        }
        return { done: !0, value: void 0 }
    }

    [Symbol.iterator]() {
        return new he(this.g, this.h, this.m)
    }
}

let ce, ue

function le(t, e) {
    ;(e = ce ? e[ce] : void 0) && (t[ce] = Bt(e))
}

function de(t) {
    return (
        (t = Error(t)).__closure__error__context__984382 || (t.__closure__error__context__984382 = {}),
            (t.__closure__error__context__984382.severity = "warning"),
            t
    )
}

function fe(t) {
    return null == t || "number" == typeof t
        ? t
        : "NaN" === t || "Infinity" === t || "-Infinity" === t
            ? Number(t)
            : void 0
}

function pe(t) {
    return null == t || "boolean" == typeof t ? t : "number" == typeof t ? !!t : void 0
}

Object.freeze(new (class {
})()), Object.freeze(new (class {
})())
const ge = /^-?([1-9][0-9]*|0)(\.[0-9]+)?$/

function me(t) {
    const e = typeof t
    return "number" === e ? Number.isFinite(t) : "string" === e && ge.test(t)
}

function ye(t) {
    if (null == t) return t
    if ("string" == typeof t) {
        if (!t) return
        t = +t
    }
    return "number" == typeof t && Number.isFinite(t) ? 0 | t : void 0
}

function _e(t) {
    if (null == t) return t
    if ("string" == typeof t) {
        if (!t) return
        t = +t
    }
    return "number" == typeof t && Number.isFinite(t) ? t >>> 0 : void 0
}

function ve(t) {
    return "-" !== t[0] && (20 > t.length || (20 === t.length && 184467 > Number(t.substring(0, 6))))
}

function Ee(t) {
    return "-" === t[0]
        ? 20 > t.length || (20 === t.length && -922337 < Number(t.substring(0, 7)))
        : 19 > t.length || (19 === t.length && 922337 > Number(t.substring(0, 6)))
}

function we(t) {
    return (t = Math.trunc(t)), Number.isSafeInteger(t) || (Y(t), (t = J(z, K))), t
}

function Te(t) {
    var e = Math.trunc(Number(t))
    return Number.isSafeInteger(e)
        ? String(e)
        : (-1 !== (e = t.indexOf(".")) && (t = t.substring(0, e)), Ee(t) || (et(t), (t = tt())), t)
}

function Ae(t) {
    return null == t ? t : me(t) ? ("number" == typeof t ? we(t) : Te(t)) : void 0
}

function be(t) {
    if ("string" != typeof t) throw Error()
    return t
}

function ke(t) {
    if (null != t && "string" != typeof t) throw Error()
    return t
}

function xe(t) {
    return null == t || "string" == typeof t ? t : void 0
}

function Se(t, e, n, r) {
    if (null != t && "object" == typeof t && t.X === te) return t
    if (!Array.isArray(t))
        return (
            n
                ? 2 & r
                    ? (t = e[Vt])
                        ? (e = t)
                        : ($t((t = new e()).u), (e = e[Vt] = t))
                    : (e = new e())
                : (e = void 0),
                e
        )
    let s = (n = zt(t))
    return 0 === s && (s |= 32 & r), (s |= 2 & r), s !== n && Yt(t, s), new e(t)
}

function Le(t, e, n) {
    if (e) {
        var r = !!r
        if (!me((e = t))) throw de("int64")
        "string" == typeof e
            ? (r = Te(e))
            : r
                ? ((r = Math.trunc(e)),
                    Number.isSafeInteger(r) ? (r = String(r)) : Ee((e = String(r))) ? (r = e) : (Y(r), (r = tt())))
                : (r = we(e))
    } else r = Ae(t)
    return "string" == typeof (n = null == (t = r) ? (n ? 0 : void 0) : t) && ((r = +n), Number.isSafeInteger(r))
        ? r
        : n
}

let Fe, Re, Me

function Pe(t) {
    switch (typeof t) {
        case "boolean":
            return (Re ||= [0, void 0, !0])
        case "number":
            return 0 < t ? void 0 : 0 === t ? (Me ||= [0, void 0]) : [-t, void 0]
        case "string":
            return [0, t]
        case "object":
            return t
    }
}

function Oe(t, e) {
    return Ce(t, e[0], e[1])
}

function Ce(t, e, n) {
    if ((null == t && (t = Fe), (Fe = void 0), null == t)) {
        var r = 96
        n ? ((t = [n]), (r |= 512)) : (t = []), e && (r = (-16760833 & r) | ((1023 & e) << 14))
    } else {
        if (!Array.isArray(t)) throw Error()
        if (2048 & (r = zt(t))) throw Error()
        if (64 & r) return t
        if (((r |= 64), n && ((r |= 512), n !== t[0]))) throw Error()
        t: {
            const s = (n = t).length
            if (s) {
                const t = s - 1
                if (re(n[t])) {
                    if (1024 <= (e = t - (+!!(512 & (r |= 256)) - 1))) throw Error()
                    r = (-16760833 & r) | ((1023 & e) << 14)
                    break t
                }
            }
            if (e) {
                if (1024 < (e = Math.max(e, s - (+!!(512 & r) - 1)))) throw Error()
                r = (-16760833 & r) | ((1023 & e) << 14)
            }
        }
    }
    return Yt(t, r), t
}

const Ie = {}
let De = (function() {
    try {
        return (
            new (class extends Map {
                constructor() {
                    super()
                }
            })(),
                !1
        )
    } catch {
        return !0
    }
})()

class Ne {
    constructor() {
        this.g = new Map()
    }

    get(t) {
        return this.g.get(t)
    }

    set(t, e) {
        return this.g.set(t, e), (this.size = this.g.size), this
    }

    delete(t) {
        return (t = this.g.delete(t)), (this.size = this.g.size), t
    }

    clear() {
        this.g.clear(), (this.size = this.g.size)
    }

    has(t) {
        return this.g.has(t)
    }

    entries() {
        return this.g.entries()
    }

    keys() {
        return this.g.keys()
    }

    values() {
        return this.g.values()
    }

    forEach(t, e) {
        return this.g.forEach(t, e)
    }

    [Symbol.iterator]() {
        return this.entries()
    }
}

const Ue = De
    ? (Object.setPrototypeOf(Ne.prototype, Map.prototype),
        Object.defineProperties(Ne.prototype, { size: { value: 0, configurable: !0, enumerable: !0, writable: !0 } }),
        Ne)
    : class extends Map {
        constructor() {
            super()
        }
    }

function Be(t) {
    return t
}

function Ge(t) {
    if (2 & t.L) throw Error("Cannot mutate an immutable Map")
}

var je = class extends Ue {
    constructor(t, e, n = Be, r = Be) {
        super()
        let s = zt(t)
        ;(s |= 64), Yt(t, s), (this.L = s), (this.U = e), (this.S = n), (this.Z = this.U ? Ve : r)
        for (let i = 0; i < t.length; i++) {
            const o = t[i],
                a = n(o[0], !1, !0)
            let h = o[1]
            e ? void 0 === h && (h = null) : (h = r(o[1], !1, !0, void 0, void 0, s)), super.set(a, h)
        }
    }

    oa(t = Xe) {
        if (0 !== this.size) return this.Y(t)
    }

    Y(t = Xe) {
        const e = [],
            n = super.entries()
        for (var r; !(r = n.next()).done;) ((r = r.value)[0] = t(r[0])), (r[1] = t(r[1])), e.push(r)
        return e
    }

    clear() {
        Ge(this), super.clear()
    }

    delete(t) {
        return Ge(this), super.delete(this.S(t, !0, !1))
    }

    entries() {
        var t = this.na()
        return new he(t, He, this)
    }

    keys() {
        return this.Ia()
    }

    values() {
        var t = this.na()
        return new he(t, je.prototype.get, this)
    }

    forEach(t, e) {
        super.forEach((n, r) => {
            t.call(e, this.get(r), r, this)
        })
    }

    set(t, e) {
        return (
            Ge(this),
                null == (t = this.S(t, !0, !1))
                    ? this
                    : null == e
                        ? (super.delete(t), this)
                        : super.set(t, this.Z(e, !0, !0, this.U, !1, this.L))
        )
    }

    Oa(t) {
        const e = this.S(t[0], !1, !0)
        ;(t = t[1]), (t = this.U ? (void 0 === t ? null : t) : this.Z(t, !1, !0, void 0, !1, this.L)), super.set(e, t)
    }

    has(t) {
        return super.has(this.S(t, !1, !1))
    }

    get(t) {
        t = this.S(t, !1, !1)
        const e = super.get(t)
        if (void 0 !== e) {
            var n = this.U
            return n ? ((n = this.Z(e, !1, !0, n, this.ta, this.L)) !== e && super.set(t, n), n) : e
        }
    }

    na() {
        return Array.from(super.keys())
    }

    Ia() {
        return super.keys()
    }

    [Symbol.iterator]() {
        return this.entries()
    }
}

function Ve(t, e, n, r, s, i) {
    return (t = Se(t, r, n, i)), s && (t = tn(t)), t
}

function Xe(t) {
    return t
}

function He(t) {
    return [t, this.get(t)]
}

let We

function ze() {
    return (We ||= new je($t([]), void 0, void 0, void 0, Ie))
}

function Ke(t, e, n, r, s) {
    if (null != t) {
        if (Array.isArray(t)) t = ie(t, void 0, 0) ? void 0 : s && 2 & zt(t) ? t : Ye(t, e, n, void 0 !== r, s)
        else if (re(t)) {
            const i = {}
            for (let o in t) i[o] = Ke(t[o], e, n, r, s)
            t = i
        } else t = e(t, r)
        return t
    }
}

function Ye(t, e, n, r, s) {
    const i = r || n ? zt(t) : 0
    r = r ? !!(32 & i) : void 0
    const o = Bt(t)
    for (let t = 0; t < o.length; t++) o[t] = Ke(o[t], e, n, r, s)
    return n && (le(o, t), n(i, o)), o
}

function $e(t) {
    return Ke(t, qe, void 0, void 0, !1)
}

function qe(t) {
    return t.X === te
        ? t.toJSON()
        : t instanceof je
            ? t.oa($e)
            : (function(t) {
                switch (typeof t) {
                    case "number":
                        return isFinite(t) ? t : String(t)
                    case "boolean":
                        return t ? 1 : 0
                    case "object":
                        if (t)
                            if (Array.isArray(t)) {
                                if (ie(t, void 0, 0)) return
                            } else {
                                if (R(t)) return k(t)
                                if (t instanceof U) {
                                    const e = t.g
                                    return null == e ? "" : "string" == typeof e ? e : (t.g = k(e))
                                }
                                if (t instanceof je) return t.oa()
                            }
                }
                return t
            })(t)
}

function Je(t, e, n = Jt) {
    if (null != t) {
        if (A && t instanceof Uint8Array) return e ? t : new Uint8Array(t)
        if (Array.isArray(t)) {
            var r = zt(t)
            return 2 & r
                ? t
                : ((e &&= 0 === r || (!!(32 & r) && !(64 & r || !(16 & r)))),
                    e ? Yt(t, -12293 & (34 | r)) : Ye(t, Je, 4 & r ? Jt : n, !0, !0))
        }
        return (
            t.X === te
                ? ((n = t.u), (t = 2 & (r = Kt(n)) ? t : Ze(t, n, r, !0)))
                : t instanceof je && !(2 & t.L) && ((n = $t(t.Y(Je))), (t = new je(n, t.U, t.S, t.Z))),
                t
        )
    }
}

function Ze(t, e, n, r) {
    return (t = t.constructor), (Fe = e = Qe(e, n, r)), (e = new t(e)), (Fe = void 0), e
}

function Qe(t, e, n) {
    const r = n || 2 & e ? Jt : qt,
        s = !!(32 & e)
    return (
        (t = (function(t, e, n) {
            const r = Bt(t)
            var s = r.length
            const i = 256 & e ? r[s - 1] : void 0
            for (s += i ? -1 : 0, e = 512 & e ? 1 : 0; e < s; e++) r[e] = n(r[e])
            if (i) {
                e = r[e] = {}
                for (const t in i) e[t] = n(i[t])
            }
            return le(r, t), r
        })(t, e, t => Je(t, s, r))),
            Xt(t, 32 | (n ? 2 : 0)),
            t
    )
}

function tn(t) {
    const e = t.u,
        n = Kt(e)
    return 2 & n ? Ze(t, e, n, !1) : t
}

function en(t, e) {
    return nn((t = t.u), Kt(t), e)
}

function nn(t, e, n, r) {
    if (-1 === n) return null
    if (n >= Zt(e)) {
        if (256 & e) return t[t.length - 1][n]
    } else {
        var s = t.length
        if (r && 256 & e && null != (r = t[s - 1][n])) return r
        if ((e = n + (+!!(512 & e) - 1)) < s) return t[e]
    }
}

function rn(t, e, n, r) {
    const s = t.u
    let i = Kt(s)
    return ae(i), sn(s, i, e, n, r), t
}

function sn(t, e, n, r, s) {
    const i = Zt(e)
    if (n >= i || s) {
        let o = e
        if (256 & e) s = t[t.length - 1]
        else {
            if (null == r) return o
                ;
            (s = t[i + (+!!(512 & e) - 1)] = {}), (o |= 256)
        }
        return (s[n] = r), n < i && (t[n + (+!!(512 & e) - 1)] = void 0), o !== e && Yt(t, o), o
    }
    return (t[n + (+!!(512 & e) - 1)] = r), 256 & e && n in (t = t[t.length - 1]) && delete t[n], e
}

function on(t, e, n, r, s) {
    var i = 2 & e
    let o = nn(t, e, n, s)
    Array.isArray(o) || (o = Qt)
    const a = !(2 & r)
    r = !(1 & r)
    const h = !!(32 & e)
    let c = zt(o)
    return (
        0 !== c || !h || i || a ? 1 & c || ((c |= 1), Yt(o, c)) : ((c |= 33), Yt(o, c)),
            i
                ? ((t = !1), 2 & c || ($t(o), (t = !!(4 & c))), (r || t) && Object.freeze(o))
                : ((i = !!(2 & c) || !!(2048 & c)),
                    r && i
                        ? ((o = Bt(o)), (r = 1), h && !a && (r |= 32), Yt(o, r), sn(t, e, n, o, s))
                        : a && 32 & c && !i && Ht(o, 32)),
            o
    )
}

function an(t, e) {
    t = t.u
    let n = Kt(t)
    const r = nn(t, n, e),
        s = fe(r)
    return null != s && s !== r && sn(t, n, e, s), s
}

function hn(t) {
    t = t.u
    let e = Kt(t)
    const n = nn(t, e, 1),
        r = se(n, !0, !!(34 & e))
    return null != r && r !== n && sn(t, e, 1, r), r
}

function cn(t, e, n) {
    t = t.u
    let r = Kt(t)
    const s = 2 & r ? 1 : 2
    let i = un(t, r, e)
    var o = zt(i)
    if (!(4 & o)) {
        ;(4 & o || Object.isFrozen(i)) && ((i = Bt(i)), (o = Sn(o, r, !1)), (r = sn(t, r, e, i)))
        var a = 0
        let s = 0
        for (; a < i.length; a++) {
            const t = n(i[a])
            null != t && (i[s++] = t)
        }
        s < a && (i.length = s),
            (o = Wt((o = ln(o, r, !1)), 20, !0)),
            (o = Wt(o, 4096, !1)),
            (o = Wt(o, 8192, !1)),
            Yt(i, o),
        2 & o && Object.freeze(i)
    }
    return (
        dn(o) || ((n = o), (o = (a = 1 === s) ? Wt(o, 2, !0) : Wt(o, 32, !1)) !== n && Yt(i, o), a && Object.freeze(i)),
        2 === s && dn(o) && ((i = Bt(i)), (o = Sn(o, r, !1)), Yt(i, o), sn(t, r, e, i)),
            i
    )
}

function un(t, e, n) {
    return (t = nn(t, e, n)), Array.isArray(t) ? t : Qt
}

function ln(t, e, n) {
    return 0 === t && (t = Sn(t, e, n)), Wt(t, 1, !0)
}

function dn(t) {
    return (!!(2 & t) && !!(4 & t)) || !!(2048 & t)
}

function fn(t) {
    t = Bt(t)
    for (let e = 0; e < t.length; e++) {
        const n = (t[e] = Bt(t[e]))
        Array.isArray(n[1]) && (n[1] = $t(n[1]))
    }
    return t
}

function pn(t, e, n) {
    {
        const o = t.u
        let a = Kt(o)
        if ((ae(a), null == n)) sn(o, a, e)
        else {
            var r,
                s = (t = zt(n)),
                i = !!(2 & t) || Object.isFrozen(n)
            if (((r = !i) && (r = !1), !(4 & t)))
                for (t = 21, i && ((n = Bt(n)), (s = 0), (t = Sn(t, a, !0))), i = 0; i < n.length; i++) n[i] = be(n[i])
            r && ((n = Bt(n)), (s = 0), (t = Sn(t, a, !0))), t !== s && Yt(n, t), sn(o, a, e, n)
        }
    }
}

function gn(t, e, n, r) {
    t = t.u
    let s = Kt(t)
    ae(s), sn(t, s, e, ("0" === r ? 0 === Number(n) : n === r) ? void 0 : n)
}

function mn(t, e, n, r) {
    const s = Kt(t)
    ae(s), (t = on(t, s, e, 2)), (r = n(r, !!(4 & (e = zt(t))) && !!(4096 & e))), t.push(r)
}

function yn(t) {
    return t
}

function _n(t, e) {
    return vn((t = t.u), Kt(t), di) === e ? e : -1
}

function vn(t, e, n) {
    let r = 0
    for (let s = 0; s < n.length; s++) {
        const i = n[s]
        null != nn(t, e, i) && (0 !== r && (e = sn(t, e, r)), (r = i))
    }
    return r
}

function En(t, e, n, r) {
    let s = Kt(t)
    ae(s)
    const i = nn(t, s, n, r)
    let o
    if (null != i && i.X === te) return (e = tn(i)) !== i && sn(t, s, n, e, r), e.u
    if (Array.isArray(i)) {
        const t = zt(i)
        ;(o = 2 & t ? Qe(i, t, !1) : i), (o = Oe(o, e))
    } else o = Oe(void 0, e)
    return o !== i && sn(t, s, n, o, r), o
}

function wn(t, e, n, r) {
    t = t.u
    let s = Kt(t)
    const i = nn(t, s, n, r)
    return (e = Se(i, e, !1, s)) !== i && null != e && sn(t, s, n, e, r), e
}

function Tn(t, e, n, r = !1) {
    if (null == (e = wn(t, e, n, r))) return e
    t = t.u
    let s = Kt(t)
    if (!(2 & s)) {
        const i = tn(e)
        i !== e && sn(t, s, n, (e = i), r)
    }
    return e
}

function An(t, e, n, r, s, i) {
    var o = !!(2 & e),
        a = o ? 1 : 2
    const h = 1 === a
    ;(a = 2 === a), (s = !!s), (i &&= !o), (o = un(t, e, r))
    var c = zt(o)
    const u = !!(4 & c)
    if (!u) {
        var l = o,
            d = e
        const t = !!(2 & (c = ln(c, e, s)))
        t && (d = Wt(d, 2, !0))
        let r = !t,
            i = !0,
            a = 0,
            h = 0
        for (; a < l.length; a++) {
            const e = Se(l[a], n, !1, d)
            if (e instanceof n) {
                if (!t) {
                    const t = !!(2 & zt(e.u))
                    ;(r &&= !t), (i &&= t)
                }
                l[h++] = e
            }
        }
        h < a && (l.length = h),
            (c = Wt(c, 4, !0)),
            (c = Wt(c, 16, i)),
            (c = Wt(c, 8, r)),
            Yt(l, c),
        t && Object.freeze(l)
    }
    if (((n = !!(8 & c) || (h && !o.length)), i && !n)) {
        for (dn(c) && ((o = Bt(o)), (c = Sn(c, e, s)), (e = sn(t, e, r, o))), i = o, n = c, l = 0; l < i.length; l++)
            (c = i[l]) !== (d = tn(c)) && (i[l] = d)
            ;
        (n = Wt(n, 8, !0)), (n = Wt(n, 16, !i.length)), Yt(i, n), (c = n)
    }
    return (
        dn(c) ||
        ((i = c),
            h ? (c = Wt(c, !o.length || (16 & c && (!u || 32 & c)) ? 2 : 2048, !0)) : s || (c = Wt(c, 32, !1)),
        c !== i && Yt(o, c),
        h && Object.freeze(o)),
        a && dn(c) && ((o = Bt(o)), (c = Sn(c, e, s)), Yt(o, c), sn(t, e, r, o)),
            o
    )
}

function bn(t, e, n) {
    t = t.u
    const r = Kt(t)
    return An(t, r, e, n, !1, !(2 & r))
}

function kn(t, e, n, r, s) {
    return null == r && (r = void 0), rn(t, n, r, s)
}

function xn(t, e, n, r) {
    null == r && (r = void 0), (t = t.u)
    let s = Kt(t)
    ae(s), (n = vn(t, s, n)) && n !== e && null != r && (s = sn(t, s, n)), sn(t, s, e, r)
}

function Sn(t, e, n) {
    return (t = Wt(t, 2, !!(2 & e))), (t = Wt(t, 32, !!(32 & e) && n)), Wt(t, 2048, !1)
}

function Ln(t, e, n, r) {
    t = t.u
    const s = Kt(t)
    ae(s), (e = An(t, s, n, e, !0)), (n = null != r ? r : new n()), e.push(n), 2 & zt(n.u) ? Ht(e, 8) : Ht(e, 16)
}

function Fn(t, e) {
    return ye(en(t, e))
}

function Rn(t, e) {
    return xe(en(t, e))
}

function Mn(t) {
    return t ?? 0
}

function Pn(t, e) {
    return Mn(an(t, e))
}

function On(t, e, n) {
    if (null != n && "boolean" != typeof n)
        throw (
            ((t = typeof n),
                Error(
                    `Expected boolean but got ${"object" != t ? t : n ? (Array.isArray(n) ? "array" : t) : "null"}: ${n}`,
                ))
        )
    rn(t, e, n)
}

function Cn(t, e, n) {
    if (null != n) {
        if ("number" != typeof n) throw de("int32")
        if (!Number.isFinite(n)) throw de("int32")
        n |= 0
    }
    rn(t, e, n)
}

function In(t, e, n) {
    if (null != n && "number" != typeof n)
        throw Error(`Value of float/double field must be a number, found ${typeof n}: ${n}`)
    rn(t, e, n)
}

function Dn(t, e, n) {
    e.g ? e.m(t, e.g, e.h, n, !0) : e.m(t, e.h, n, !0)
}
;(je.prototype.toJSON = void 0), (je.prototype.Ja = ee)
var Nn = class {
    constructor(t, e) {
        this.u = Ce(t, e)
    }

    toJSON() {
        return Un(this, Ye(this.u, qe, void 0, void 0, !1), !0)
    }

    l() {
        var t = mo
        return t.g ? t.l(this, t.g, t.h, !0) : t.l(this, t.h, t.defaultValue, !0)
    }

    clone() {
        const t = this.u
        return Ze(this, t, Kt(t), !1)
    }

    N() {
        return !!(2 & zt(this.u))
    }
}

function Un(t, e, n) {
    var r = d ? void 0 : t.constructor.A
    const s = Kt(n ? t.u : e)
    if (!(t = e.length)) return e
    let i, o
    if (re((n = e[t - 1]))) {
        t: {
            var a = n
            let t = {},
                e = !1
            for (var h in a) {
                let n = a[h]
                if (Array.isArray(n)) {
                    let t = n
                    ;(ie(n, r, +h) || (ne(n) && 0 === n.size)) && (n = null), n != t && (e = !0)
                }
                null != n ? (t[h] = n) : (e = !0)
            }
            if (e) {
                for (var c in t) {
                    a = t
                    break t
                }
                a = null
            }
        }
        a != n && (i = !0), t--
    }
    for (
        h = +!!(512 & s) - 1;
        0 < t && ((n = e[(c = t - 1)]), (c -= h), null == n || ie(n, r, c) || (ne(n) && 0 === n.size));
        t--
    )
        o = !0
    return i || o ? ((e = Array.prototype.slice.call(e, 0, t)), a && e.push(a), e) : e
}

function Bn(t) {
    return Array.isArray(t) ? (t[0] instanceof Ut ? t : [Gr, t]) : [t, void 0]
}

function Gn(t, e) {
    if (Array.isArray(e)) {
        var n = zt(e)
        if (4 & n) return e
        for (var r = 0, s = 0; r < e.length; r++) {
            const n = t(e[r])
            null != n && (e[s++] = n)
        }
        return s < r && (e.length = s), Yt(e, -12289 & (5 | n)), 2 & n && Object.freeze(e), e
    }
}
;(Nn.prototype.X = te),
    (Nn.prototype.toString = function() {
        return Un(this, this.u, !1).toString()
    })
const jn = Symbol()

function Vn(t) {
    let e = t[jn]
    if (!e) {
        const n = qn(t),
            r = hr(t),
            s = r.l
        ;(e = s
            ? (t, e) => s(t, e, r)
            : (t, e) => {
                for (; gt(e) && 4 != e.h;) {
                    var s = e.m,
                        i = r[s]
                    if (!i) {
                        var o = r.ea
                        o && (o = o[s]) && (i = r[s] = Xn(o))
                    }
                    ;(i && i(e, t, s)) ||
                    ((s = (i = e).l),
                        mt(i),
                        i.ia ? (i = void 0) : ((o = i.g.g - s), (i.g.g = s), (i = ft(i.g, o))),
                        (s = t),
                    i && ((ce ||= Symbol()), (o = s[ce]) ? o.push(i) : (s[ce] = [i])))
                }
                n === Wn || n === zn || n.j || (t[(ue ||= Symbol())] = n)
            }),
            (t[jn] = e)
    }
    return e
}

function Xn(t) {
    const e = (t = Bn(t))[0].g
    if ((t = t[1])) {
        const n = Vn(t),
            r = hr(t).T
        return (t, s, i) => e(t, s, i, r, n)
    }
    return e
}

class Hn {
}

let Wn, zn
const Kn = Symbol()

function Yn(t, e, n) {
    const r = n[1]
    let s
    if (r) {
        const n = r[Kn]
        ;(s = n ? n.T : Pe(r[0])), (t[e] = n ?? r)
    }
    s && s === Re ? (t.g || (t.g = new Set())).add(e) : n[0] && (t.h || (t.h = new Set())).add(e)
}

function $n(t, e) {
    return [t.l, !e || 0 < e[0] ? void 0 : e]
}

function qn(t) {
    var e = t[Kn]
    if (e) return e
    if (!(e = Zn(t, (t[Kn] = new Hn()), $n, $n, Yn)).ea && !e.h && !e.g) {
        let n = !0
        for (let t in e) isNaN(t) || (n = !1)
        n
            ? (Pe(t[0]) === Re ? (zn ? (e = zn) : (((e = new Hn()).T = Pe(!0)), (e = zn = e))) : (e = Wn ||= new Hn()),
                (e = t[Kn] = e))
            : (e.j = !0)
    }
    return e
}

function Jn(t, e, n) {
    t[e] = n
}

function Zn(t, e, n, r, s = Jn) {
    e.T = Pe(t[0])
    let i = 0
    var o = t[++i]
    o &&
    o.constructor === Object &&
    ((e.ea = o), "function" == typeof (o = t[++i]) && ((e.l = o), (e.m = t[++i]), (o = t[++i])))
    const a = {}
    for (; Array.isArray(o) && "number" == typeof o[0] && 0 < o[0];) {
        for (var h = 0; h < o.length; h++) a[o[h]] = o
        o = t[++i]
    }
    for (h = 1; void 0 !== o;) {
        let l
        "number" == typeof o && ((h += o), (o = t[++i]))
        var c = void 0
        if ((o instanceof Ut ? (l = o) : ((l = jr), i--), l.pa)) {
            ;(o = t[++i]), (c = t)
            var u = i
            "function" == typeof o && ((o = o()), (c[u] = o)), (c = o)
        }
        for (u = h + 1, "number" == typeof (o = t[++i]) && 0 > o && ((u -= o), (o = t[++i])); h < u; h++) {
            const t = a[h]
            s(e, h, c ? r(l, c, t) : n(l, t))
        }
    }
    return e
}

const Qn = Symbol()

function tr(t) {
    let e = t[Qn]
    if (!e) {
        const n = sr(t)
        ;(e = (t, e) => lr(t, e, n)), (t[Qn] = e)
    }
    return e
}

const er = Symbol()

function nr(t) {
    return t.h
}

function rr(t, e) {
    let n, r
    const s = t.h
    return (t, i, o) => s(t, i, o, (r ||= sr(e).T), (n ||= tr(e)))
}

function sr(t) {
    let e = t[er]
    return e || ((e = Zn(t, (t[er] = {}), nr, rr)), cr(t), e)
}

const ir = Symbol()

function or(t, e) {
    const n = t.g
    return e ? (t, r, s) => n(t, r, s, e) : n
}

function ar(t, e, n) {
    const r = t.g
    let s, i
    return (t, o, a) => r(t, o, a, (i ||= hr(e).T), (s ||= Vn(e)), n)
}

function hr(t) {
    let e = t[ir]
    return e || (qn(t), (e = Zn(t, (t[ir] = {}), or, ar)), cr(t), e)
}

function cr(t) {
    ir in t && Kn in t && er in t && (t.length = 0)
}

function ur(t, e) {
    var n = t[e]
    if (n) return n
    if ((n = t.ea) && (n = n[e])) {
        var r = (n = Bn(n))[0].h
        if ((n = n[1])) {
            const e = tr(n),
                s = sr(n).T
            n = (n = t.m) ? n(s, e) : (t, n, i) => r(t, n, i, s, e)
        } else n = r
        return (t[e] = n)
    }
}

function lr(t, e, n) {
    for (
        var r = Kt(t), s = +!!(512 & r) - 1, i = t.length, o = 512 & r ? 1 : 0, a = i + (256 & r ? -1 : 0);
        o < a;
        o++
    ) {
        const r = t[o]
        if (null == r) continue
        const i = o - s,
            a = ur(n, i)
        a && a(e, r, i)
    }
    if (256 & r) {
        r = t[i - 1]
        for (let t in r) (s = +t), Number.isNaN(s) || (null != (i = r[t]) && (a = ur(n, s)) && a(e, i, s))
    }
    if ((t = ce ? t[ce] : void 0)) for (Pt(e, e.g.end()), n = 0; n < t.length; n++) Pt(e, N(t[n]) || P())
}

function dr(t, e) {
    return new Ut(t, e, !1, !1)
}

function fr(t, e) {
    return new Ut(t, e, !0, !1)
}

function pr(t, e) {
    return new Ut(t, e, !1, !0)
}

function gr(t, e, n) {
    sn(t, Kt(t), e, n)
}

var mr = pr(
    function(t, e, n, r, s) {
        return (
            2 === t.h &&
            ((t = yt(t, Oe([void 0, void 0], r), s)),
                ae((r = Kt(e))),
                (s = nn(e, r, n)) instanceof je
                    ? 0 != (2 & s.L)
                        ? ((s = s.Y()).push(t), sn(e, r, n, s))
                        : s.Oa(t)
                    : Array.isArray(s)
                        ? (2 & zt(s) && sn(e, r, n, (s = fn(s))), s.push(t))
                        : sn(e, r, n, [t]),
                !0)
        )
    },
    function(t, e, n, r, s) {
        if (e instanceof je)
            e.forEach((e, i) => {
                Nt(t, n, Oe([i, e], r), s)
            })
        else if (Array.isArray(e))
            for (let i = 0; i < e.length; i++) {
                const o = e[i]
                Array.isArray(o) && Nt(t, n, Oe(o, r), s)
            }
    },
)

function yr(t, e, n) {
    t: if (null != e) {
        if (me(e)) {
            if ("string" == typeof e) {
                e = Te(e)
                break t
            }
            if ("number" == typeof e) {
                e = we(e)
                break t
            }
        }
        e = void 0
    }
    null != e &&
    ("string" == typeof e && kt(e),
    null != e &&
    (Ot(t, n, 0), "number" == typeof e ? ((t = t.g), Y(e), Lt(t, z, K)) : ((n = kt(e)), Lt(t.g, n.h, n.g))))
}

function _r(t, e, n) {
    null != (e = ye(e)) && null != e && (Ot(t, n, 0), Rt(t.g, e))
}

function vr(t, e, n) {
    null != (e = pe(e)) && (Ot(t, n, 0), t.g.g.push(e ? 1 : 0))
}

function Er(t, e, n) {
    null != (e = xe(e)) && Dt(t, n, c(e))
}

function wr(t, e, n, r, s) {
    Nt(t, n, e instanceof Nn ? e.u : Array.isArray(e) ? Oe(e, r) : void 0, s)
}

function Tr(t, e, n) {
    null != (e = null == e || "string" == typeof e || R(e) || e instanceof U ? e : void 0) && Dt(t, n, V(e).buffer)
}

function Ar(t, e, n) {
    return (5 === t.h || 2 === t.h) && ((e = on(e, Kt(e), n, 2, !1)), 2 == t.h ? Et(t, ht, e) : e.push(ht(t.g)), !0)
}

var br,
    kr = dr(
        function(t, e, n) {
            if (1 !== t.h) return !1
            var r = t.g
            t = at(r)
            const s = at(r)
            r = 2 * (s >> 31) + 1
            const i = (s >>> 20) & 2047
            return (
                (t = 4294967296 * (1048575 & s) + t),
                    gr(
                        e,
                        n,
                        2047 == i
                            ? t
                                ? NaN
                                : (1 / 0) * r
                            : 0 == i
                                ? r * Math.pow(2, -1074) * t
                                : r * Math.pow(2, i - 1075) * (t + 4503599627370496),
                    ),
                    !0
            )
        },
        function(t, e, n) {
            null != (e = fe(e)) &&
            (Ot(t, n, 1),
                (t = t.g),
                (n = W ||= new DataView(new ArrayBuffer(8))).setFloat64(0, +e, !0),
                (z = n.getUint32(0, !0)),
                (K = n.getUint32(4, !0)),
                Mt(t, z),
                Mt(t, K))
        },
    ),
    xr = dr(
        function(t, e, n) {
            return 5 === t.h && (gr(e, n, ht(t.g)), !0)
        },
        function(t, e, n) {
            null != (e = fe(e)) && (Ot(t, n, 5), (t = t.g), $(e), Mt(t, z))
        },
    ),
    Sr = fr(Ar, function(t, e, n) {
        if (null != (e = Gn(fe, e)))
            for (let o = 0; o < e.length; o++) {
                var r = t,
                    s = n,
                    i = e[o]
                null != i && (Ot(r, s, 5), (r = r.g), $(i), Mt(r, z))
            }
    }),
    Lr = fr(Ar, function(t, e, n) {
        if (null != (e = Gn(fe, e)) && e.length) {
            Ot(t, n, 2), Ft(t.g, 4 * e.length)
            for (let r = 0; r < e.length; r++) (n = t.g), $(e[r]), Mt(n, z)
        }
    }),
    Fr = dr(function(t, e, n) {
        return 0 === t.h && (gr(e, n, rt(t.g, J)), !0)
    }, yr),
    Rr = dr(function(t, e, n) {
        return 0 === t.h && (gr(e, n, 0 === (t = rt(t.g, J)) ? void 0 : t), !0)
    }, yr),
    Mr = dr(
        function(t, e, n) {
            return 0 === t.h && (gr(e, n, rt(t.g, q)), !0)
        },
        function(t, e, n) {
            t: if (null != e) {
                if (me(e)) {
                    if ("string" == typeof e) {
                        var r = Math.trunc(Number(e))
                        Number.isSafeInteger(r) && 0 <= r
                            ? (e = String(r))
                            : (-1 !== (r = e.indexOf(".")) && (e = e.substring(0, r)), ve(e) || (et(e), (e = Z(z, K))))
                        break t
                    }
                    if ("number" == typeof e) {
                        e =
                            0 <= (e = Math.trunc(e)) && Number.isSafeInteger(e)
                                ? e
                                : (function(t) {
                                    if (0 > t) {
                                        Y(t)
                                        const e = Z(z, K)
                                        return (t = Number(e)), Number.isSafeInteger(t) ? t : e
                                    }
                                    return ve(String(t)) ? t : (Y(t), q(z, K))
                                })(e)
                        break t
                    }
                }
                e = void 0
            }
            null != e &&
            ("string" == typeof e && Tt(e),
            null != e &&
            (Ot(t, n, 0),
                "number" == typeof e ? ((t = t.g), Y(e), Lt(t, z, K)) : ((n = Tt(e)), Lt(t.g, n.h, n.g))))
        },
    ),
    Pr = dr(function(t, e, n) {
        return 0 === t.h && (gr(e, n, it(t.g)), !0)
    }, _r),
    Or = fr(
        function(t, e, n) {
            return (
                (0 === t.h || 2 === t.h) &&
                ((e = on(e, Kt(e), n, 2, !1)), 2 == t.h ? Et(t, it, e) : e.push(it(t.g)), !0)
            )
        },
        function(t, e, n) {
            if (null != (e = Gn(ye, e)) && e.length) {
                n = Ct(t, n)
                for (let n = 0; n < e.length; n++) Rt(t.g, e[n])
                It(t, n)
            }
        },
    ),
    Cr = dr(function(t, e, n) {
        return 0 === t.h && (gr(e, n, 0 === (t = it(t.g)) ? void 0 : t), !0)
    }, _r),
    Ir = dr(function(t, e, n) {
        return 0 === t.h && (gr(e, n, st(t.g)), !0)
    }, vr),
    Dr = dr(function(t, e, n) {
        return 0 === t.h && (gr(e, n, !1 === (t = st(t.g)) ? void 0 : t), !0)
    }, vr),
    Nr = fr(
        function(t, e, n) {
            return 2 === t.h && (mn(e, n, yn, (t = _t(t))), !0)
        },
        function(t, e, n) {
            if (null != (e = Gn(xe, e)))
                for (let o = 0; o < e.length; o++) {
                    var r = t,
                        s = n,
                        i = e[o]
                    null != i && Dt(r, s, c(i))
                }
        },
    ),
    Ur = dr(function(t, e, n) {
        return 2 === t.h && (gr(e, n, "" === (t = _t(t)) ? void 0 : t), !0)
    }, Er),
    Br = dr(function(t, e, n) {
        return 2 === t.h && (gr(e, n, _t(t)), !0)
    }, Er),
    Gr = pr(function(t, e, n, r, s) {
        return 2 === t.h && (yt(t, En(e, r, n, !0), s), !0)
    }, wr),
    jr = pr(function(t, e, n, r, s) {
        return 2 === t.h && (yt(t, En(e, r, n), s), !0)
    }, wr)
br = new Ut(
    function(t, e, n, r, s) {
        if (2 !== t.h) return !1
        r = Oe(void 0, r)
        let i = Kt(e)
        ae(i)
        let o = on(e, i, n, 3)
        return (
            (i = Kt(e)),
            4 & zt(o) && ((o = Bt(o)), Yt(o, -2079 & (1 | zt(o))), sn(e, i, n, o)),
                o.push(r),
                yt(t, r, s),
                !0
        )
    },
    function(t, e, n, r, s) {
        if (Array.isArray(e)) for (let i = 0; i < e.length; i++) wr(t, e[i], n, r, s)
    },
    !0,
    !0,
)
var Vr = pr(function(t, e, n, r, s, i) {
        if (2 !== t.h) return !1
        let o = Kt(e)
        return ae(o), (i = vn(e, o, i)) && n !== i && sn(e, o, i), yt(t, (e = En(e, r, n)), s), !0
    }, wr),
    Xr = dr(function(t, e, n) {
        return 2 === t.h && (gr(e, n, vt(t)), !0)
    }, Tr),
    Hr = fr(
        function(t, e, n) {
            return (
                (0 === t.h || 2 === t.h) &&
                ((e = on(e, Kt(e), n, 2, !1)), 2 == t.h ? Et(t, ot, e) : e.push(ot(t.g)), !0)
            )
        },
        function(t, e, n) {
            if (null != (e = Gn(_e, e)))
                for (let o = 0; o < e.length; o++) {
                    var r = t,
                        s = n,
                        i = e[o]
                    null != i && (Ot(r, s, 0), Ft(r.g, i))
                }
        },
    ),
    Wr = dr(
        function(t, e, n) {
            return 0 === t.h && (gr(e, n, it(t.g)), !0)
        },
        function(t, e, n) {
            null != (e = ye(e)) && ((e = parseInt(e, 10)), Ot(t, n, 0), Rt(t.g, e))
        },
    ),
    zr = fr(
        function(t, e, n) {
            return (
                (0 === t.h || 2 === t.h) &&
                ((e = on(e, Kt(e), n, 2, !1)), 2 == t.h ? Et(t, ct, e) : e.push(it(t.g)), !0)
            )
        },
        function(t, e, n) {
            if (null != (e = Gn(ye, e)) && e.length) {
                n = Ct(t, n)
                for (let n = 0; n < e.length; n++) Rt(t.g, e[n])
                It(t, n)
            }
        },
    )

class Kr {
    constructor(t, e) {
        ;(this.h = t), (this.g = e), (this.l = Tn), (this.m = kn), (this.defaultValue = void 0)
    }
}

function Yr(t, e) {
    return new Kr(t, e)
}

function $r(t, e) {
    return (n, r) => {
        t: {
            if (wt.length) {
                const t = wt.pop()
                t.o(r), ut(t.g, n, r), (n = t)
            } else
                n = new (class {
                    constructor(t, e) {
                        if (pt.length) {
                            const n = pt.pop()
                            ut(n, t, e), (t = n)
                        } else
                            t = new (class {
                                constructor(t, e) {
                                    ;(this.h = null), (this.m = !1), (this.g = this.l = this.j = 0), ut(this, t, e)
                                }

                                clear() {
                                    ;(this.h = null), (this.m = !1), (this.g = this.l = this.j = 0), (this.ca = !1)
                                }
                            })(t, e)
                            ;
                        (this.g = t), (this.l = this.g.g), (this.h = this.m = -1), this.o(e)
                    }

                    o({ ia: t = !1 } = {}) {
                        this.ia = t
                    }
                })(n, r)
            try {
                const r = new t(),
                    i = r.u
                Vn(e)(i, n)
                var s = r
                break t
            } finally {
                n.g.clear(), (n.m = -1), (n.h = -1), 100 > wt.length && wt.push(n)
            }
            s = void 0
        }
        return s
    }
}

function qr(t) {
    return function() {
        const e = new (class {
            constructor() {
                ;(this.l = []),
                    (this.h = 0),
                    (this.g = new (class {
                        constructor() {
                            this.g = []
                        }

                        length() {
                            return this.g.length
                        }

                        end() {
                            const t = this.g
                            return (this.g = []), t
                        }
                    })())
            }
        })()
        lr(this.u, e, sr(t)), Pt(e, e.g.end())
        const n = new Uint8Array(e.h),
            r = e.l,
            s = r.length
        let i = 0
        for (let t = 0; t < s; t++) {
            const e = r[t]
            n.set(e, i), (i += e.length)
        }
        return (e.l = [n]), n
    }
}

var Jr = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Zr = [
        0,
        Ur,
        dr(
            function(t, e, n) {
                return 2 === t.h && (gr(e, n, (t = vt(t)) === D() ? void 0 : t), !0)
            },
            function(t, e, n) {
                if (null != e) {
                    if (e instanceof Nn) {
                        const r = e.Qa
                        return void (r && ((e = r(e)), null != e && Dt(t, n, V(e).buffer)))
                    }
                    if (Array.isArray(e)) return
                }
                Tr(t, e, n)
            },
        ),
    ],
    Qr = [0, Br],
    ts = [0, Pr, Wr, Ir, -1, Or, Wr, -1],
    es = [0, Ir, -1],
    ns = class extends Nn {
        constructor() {
            super()
        }
    }
ns.A = [6]
var rs = [0, Ir, Br, Ir, Wr, -1, zr, Br, -1, es, Wr],
    ss = [0, Br, -2],
    is = class extends Nn {
        constructor() {
            super()
        }
    },
    os = [0],
    as = [0, Pr, Ir, -3],
    hs = class extends Nn {
        constructor(t) {
            super(t, 2)
        }
    },
    cs = {},
    us = [-2, cs, Ir]
cs[336783863] = [0, Br, Ir, -1, Pr, [0, [1, 2, 3, 4, 5], Vr, os, Vr, rs, Vr, ss, Vr, as, Vr, ts], Qr]
var ls = [0, Ur, Dr],
    ds = [0, Rr, -1, Dr, -3, Rr, Or, Ur, Cr, Rr, -1, Dr, Cr, Dr, -2, Ur],
    fs = [-1, {}],
    ps = [0, Br, 1, fs],
    gs = [0, Br, Nr, fs]

function ms(t, e) {
    gn(t, 2, ke(e), "")
}

function ys(t, e) {
    mn(t.u, 3, be, e)
}

function _s(t, e) {
    mn(t.u, 4, be, e)
}

var vs = class extends Nn {
    constructor(t) {
        super(t, 500)
    }

    o(t) {
        return kn(this, 0, 7, t)
    }
}
vs.A = [3, 4, 5, 6, 8, 13, 17, 1005]
var Es = [-500, Ur, -1, Nr, -3, us, br, Zr, Cr, -1, ps, gs, br, ls, Ur, ds, Cr, Nr, 987, Nr],
    ws = [0, Ur, -1, fs],
    Ts = [-500, Br, -1, [-1, {}], 998, Br],
    As = [-500, Br, Nr, -1, [-2, {}, Ir], 997, Nr, -1],
    bs = [-500, Br, Nr, fs, 998, Nr]

function ks(t, e) {
    Ln(t, 1, vs, e)
}

function xs(t, e) {
    mn(t.u, 10, be, e)
}

function Ss(t, e) {
    mn(t.u, 15, be, e)
}

var Ls = class extends Nn {
    constructor(t) {
        super(t, 500)
    }

    o(t) {
        return kn(this, 0, 1001, t)
    }
}
Ls.A = [1, 6, 7, 9, 10, 15, 16, 17, 14, 1002]
var Fs = [-500, br, Es, 4, br, Ts, br, As, Cr, br, bs, Nr, Cr, ps, gs, br, ws, Nr, -2, ds, Ur, -1, Dr, 979, fs, br, Zr],
    Rs = $r(Ls, Fs)
Ls.prototype.g = qr(Fs)
var Ms = [0, br, [0, Pr, -2]],
    Ps = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Os = [0, Pr, xr, Br, -1],
    Cs = class extends Nn {
        constructor(t) {
            super(t)
        }

        g() {
            return bn(this, Ps, 1)
        }
    }
Cs.A = [1]
var Is = [0, br, Os],
    Ds = $r(Cs, Is),
    Ns = [0, Pr, xr],
    Us = [0, Pr, -1, Ms],
    Bs = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Gs = [0, Pr, -3],
    js = [0, xr, -3],
    Vs = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Xs = [0, xr, -1, Br, xr],
    Hs = class extends Nn {
        constructor(t) {
            super(t)
        }

        h() {
            return Tn(this, Bs, 2)
        }

        g() {
            return bn(this, Vs, 5)
        }
    }
Hs.A = [5]
var Ws = [0, Wr, Gs, js, Us, br, Xs],
    zs = class extends Nn {
        constructor(t) {
            super(t)
        }
    }
zs.A = [1, 2, 3, 8, 9]
var Ks = $r(zs, [0, Nr, Or, Lr, Ws, Br, -1, Fr, br, Ns, Nr, Fr]),
    Ys = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    $s = [0, xr, -4],
    qs = class extends Nn {
        constructor(t) {
            super(t)
        }
    }
qs.A = [1]
var Js = $r(qs, [0, br, $s]),
    Zs = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Qs = [0, xr, -4],
    ti = class extends Nn {
        constructor(t) {
            super(t)
        }
    }
ti.A = [1]
var ei = $r(ti, [0, br, Qs]),
    ni = class extends Nn {
        constructor(t) {
            super(t)
        }
    }
ni.A = [3]
var ri = [0, Pr, -1, Lr, Wr],
    si = class extends Nn {
        constructor() {
            super()
        }
    }
si.prototype.g = qr([0, xr, -4, Fr])
var ii = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    oi = [0, 1, Pr, Br, Is],
    ai = class extends Nn {
        constructor(t) {
            super(t)
        }
    }
ai.A = [1]
var hi = $r(ai, [0, br, oi, Fr]),
    ci = class extends Nn {
        constructor(t) {
            super(t)
        }
    }
ci.A = [1]
var ui = class extends Nn {
        constructor(t) {
            super(t)
        }

        qa() {
            const t = hn(this)
            return null == t ? D() : t
        }
    },
    li = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    di = [1, 2],
    fi = [0, di, Vr, [0, Lr], Vr, [0, Xr], Pr, Br],
    pi = class extends Nn {
        constructor(t) {
            super(t)
        }
    }
pi.A = [1]
var gi = $r(pi, [0, br, fi, Fr]),
    mi = class extends Nn {
        constructor(t) {
            super(t)
        }
    }
mi.A = [4, 5]
var yi = [0, Br, Pr, xr, Nr, -1],
    _i = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    vi = [0, Ir, -1],
    Ei = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    wi = [1, 2, 3, 4, 5],
    Ti = class extends Nn {
        constructor(t) {
            super(t)
        }

        g() {
            return null != hn(this)
        }

        h() {
            return null != Rn(this, 2)
        }
    },
    Ai = [0, Xr, Br, [0, Pr, Fr, -1], [0, Mr, Fr]],
    bi = class extends Nn {
        constructor(t) {
            super(t)
        }

        g() {
            return pe(en(this, 2)) ?? !1
        }
    },
    ki = [0, Ai, Ir, [0, wi, Vr, as, Vr, rs, Vr, ts, Vr, os, Vr, ss], Wr],
    xi = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Si = [0, ki, xr, -1, Pr],
    Li = Yr(502141897, xi)
cs[502141897] = Si
var Fi = [0, Ai]
cs[512499200] = Fi
var Ri = [0, Fi]
cs[515723506] = Ri
var Mi = $r(
        class extends Nn {
            constructor(t) {
                super(t)
            }
        },
        [0, [0, Wr, -1, Sr, Hr], ri],
    ),
    Pi = [0, ki]
cs[508981768] = Pi
var Oi = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Ci = [0, ki, xr, Pi, Ir],
    Ii = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Di = [0, ki, Si, Ci, xr, Ri]
cs[508968149] = Ci
var Ni = Yr(508968150, Ii)
cs[508968150] = Di
var Ui = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Bi = Yr(513916220, Ui)
cs[513916220] = [0, ki, Di, Pr]
var Gi = class extends Nn {
        constructor(t) {
            super(t)
        }

        h() {
            return Tn(this, mi, 2)
        }

        g() {
            rn(this, 2)
        }
    },
    ji = [0, ki, yi]
cs[478825465] = ji
var Vi = [0, ki]
cs[478825422] = Vi
var Xi = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Hi = [0, ki, Vi, ji, -1],
    Wi = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    zi = [0, ki, xr, Pr],
    Ki = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Yi = [0, ki, xr],
    $i = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    qi = [0, ki, zi, Yi, xr],
    Ji = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Zi = [0, ki, qi, Hi]
;(cs[463370452] = Hi), (cs[464864288] = zi), (cs[474472470] = Yi)
var Qi = Yr(462713202, $i)
cs[462713202] = qi
var to = Yr(479097054, Ji)
cs[479097054] = Zi
var eo = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    no = [0, ki],
    ro = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    so = [0, ki, xr, -1, Pr]
cs[514774813] = so
var io = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    oo = [0, ki, xr, Ir]
cs[518928384] = oo
var ao = class extends Nn {
    constructor() {
        super()
    }
}
ao.prototype.g = qr([0, ki, Yi, no, Si, Ci, so, oo])
var ho = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    co = Yr(456383383, ho)
cs[456383383] = [0, ki, yi]
var uo = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    lo = Yr(476348187, uo)
cs[476348187] = [0, ki, vi]
var fo = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    po = [0, Wr, -1],
    go = class extends Nn {
        constructor(t) {
            super(t)
        }
    }
go.A = [3]
var mo = Yr(
    458105876,
    class extends Nn {
        constructor(t) {
            super(t)
        }

        g() {
            var t = this.u
            const e = Kt(t)
            var n = 2 & e
            return (
                (t = (function(t, e, n) {
                    var r = go
                    const s = 2 & e
                    let i = !1
                    if (null == n) {
                        if (s) return ze()
                        n = []
                    } else if (n.constructor === je) {
                        if (0 == (2 & n.L) || s) return n
                        n = n.Y()
                    } else Array.isArray(n) ? (i = !!(2 & zt(n))) : (n = [])
                    if (s) {
                        if (!n.length) return ze()
                        i || ((i = !0), $t(n))
                    } else i && ((i = !1), (n = fn(n)))
                    return (
                        i || (64 & zt(n) ? Ht(n, 32) : 32 & e && Xt(n, 32)),
                            sn(t, e, 2, (r = new je(n, r, Le, void 0)), !1),
                            r
                    )
                })(t, e, nn(t, e, 2))),
                null == t || (!n && go && (t.ta = !0)),
                    (n = t)
            )
        }
    },
)
cs[458105876] = [0, po, mr, [!0, Fr, [0, Br, -1, Nr]]]
var yo = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    _o = Yr(458105758, yo)
cs[458105758] = [0, ki, Br, po]
var vo = class extends Nn {
    constructor(t) {
        super(t)
    }
}
vo.A = [5, 6]
var Eo = Yr(443442058, vo)
cs[443442058] = [0, ki, Br, Pr, xr, Nr, -1]
var wo = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    To = Yr(516587230, wo)

function Ao(t, e) {
    return (
        (e = e ? e.clone() : new mi()),
            void 0 !== t.displayNamesLocale
                ? rn(e, 1, ke(t.displayNamesLocale))
                : void 0 === t.displayNamesLocale && rn(e, 1),
            void 0 !== t.maxResults ? Cn(e, 2, t.maxResults) : "maxResults" in t && rn(e, 2),
            void 0 !== t.scoreThreshold ? In(e, 3, t.scoreThreshold) : "scoreThreshold" in t && rn(e, 3),
            void 0 !== t.categoryAllowlist ? pn(e, 4, t.categoryAllowlist) : "categoryAllowlist" in t && rn(e, 4),
            void 0 !== t.categoryDenylist ? pn(e, 5, t.categoryDenylist) : "categoryDenylist" in t && rn(e, 5),
            e
    )
}

function bo(t, e = -1, n = "") {
    return {
        categories: t.map(t => ({
            index: Mn(Fn(t, 1)) ?? -1,
            score: Pn(t, 2) ?? 0,
            categoryName: Rn(t, 3) ?? "" ?? "",
            displayName: Rn(t, 4) ?? "" ?? "",
        })),
        headIndex: e,
        headName: n,
    }
}

function ko(t) {
    var e = cn(t, 3, fe),
        n = cn(t, 2, ye),
        r = cn(t, 1, xe),
        s = cn(t, 9, xe)
    const i = { categories: [], keypoints: [] }
    for (let t = 0; t < e.length; t++)
        i.categories.push({ score: e[t], index: n[t] ?? -1, categoryName: r[t] ?? "", displayName: s[t] ?? "" })
    if (
        ((e = Tn(t, Hs, 4)?.h()) &&
        (i.boundingBox = {
            originX: Fn(e, 1) ?? 0,
            originY: Fn(e, 2) ?? 0,
            width: Fn(e, 3) ?? 0,
            height: Fn(e, 4) ?? 0,
            angle: 0,
        }),
            Tn(t, Hs, 4)?.g().length)
    )
        for (const e of Tn(t, Hs, 4).g())
            i.keypoints.push({ x: an(e, 1) ?? 0, y: an(e, 2) ?? 0, score: an(e, 4) ?? 0, label: Rn(e, 3) ?? "" })
    return i
}

function xo(t) {
    const e = []
    for (const n of bn(t, Zs, 1))
        e.push({ x: Pn(n, 1) ?? 0, y: Pn(n, 2) ?? 0, z: Pn(n, 3) ?? 0, visibility: Pn(n, 4) ?? 0 })
    return e
}

function So(t) {
    const e = []
    for (const n of bn(t, Ys, 1))
        e.push({ x: Pn(n, 1) ?? 0, y: Pn(n, 2) ?? 0, z: Pn(n, 3) ?? 0, visibility: Pn(n, 4) ?? 0 })
    return e
}

function Lo(t) {
    return Array.from(t, t => (127 < t ? t - 256 : t))
}

function Fo(t, e) {
    if (t.length !== e.length)
        throw Error(
            `Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`,
        )
    let n = 0,
        r = 0,
        s = 0
    for (let i = 0; i < t.length; i++) (n += t[i] * e[i]), (r += t[i] * t[i]), (s += e[i] * e[i])
    if (0 >= r || 0 >= s) throw Error("Cannot compute cosine similarity on embedding with 0 norm.")
    return n / Math.sqrt(r * s)
}

let Ro
cs[516587230] = [0, ki, so, oo, xr]
const Mo = new Uint8Array([
    0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11,
])

async function Po() {
    if (void 0 === Ro)
        try {
            await WebAssembly.instantiate(Mo), (Ro = !0)
        } catch {
            Ro = !1
        }
    return Ro
}

async function Oo(t, e = "") {
    const n = (await Po()) ? "wasm_internal" : "wasm_nosimd_internal"
    return { wasmLoaderPath: `${e}/${t}_${n}.js`, wasmBinaryPath: `${e}/${t}_${n}.wasm` }
}

var Co = class {
}

function Io() {
    const t = navigator.userAgent
    return t.includes("Safari") && !t.includes("Chrome")
}

async function Do(t) {
    if ("function" != typeof importScripts) {
        const e = document.createElement("script")
        return (
            (e.src = t.toString()),
                (e.crossOrigin = "anonymous"),
                new Promise((t, n) => {
                    e.addEventListener(
                        "load",
                        () => {
                            t()
                        },
                        !1,
                    ),
                        e.addEventListener(
                            "error",
                            t => {
                                n(t)
                            },
                            !1,
                        ),
                        document.body.appendChild(e)
                })
        )
    }
    importScripts(t.toString())
}

function No(t) {
    return void 0 !== t.videoWidth
        ? [t.videoWidth, t.videoHeight]
        : void 0 !== t.naturalWidth
            ? [t.naturalWidth, t.naturalHeight]
            : void 0 !== t.displayWidth
                ? [t.displayWidth, t.displayHeight]
                : [t.width, t.height]
}

function Uo(t, e, n) {
    t.m ||
    console.error(
        "No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target",
    ),
        n((e = t.i.stringToNewUTF8(e))),
        t.i._free(e)
}

function Bo(t, e, n) {
    if (!t.i.canvas) throw Error("No OpenGL canvas configured.")
    if (
        (n ? t.i._bindTextureToStream(n) : t.i._bindTextureToCanvas(),
            !(n = t.i.canvas.getContext("webgl2") || t.i.canvas.getContext("webgl")))
    )
        throw Error(
            "Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.",
        )
    t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !0),
        n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, e),
    t.i.gpuOriginForWebTexturesIsBottomLeft && n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, !1)
    const [r, s] = No(e)
    return (
        !t.l ||
        (r === t.i.canvas.width && s === t.i.canvas.height) ||
        ((t.i.canvas.width = r), (t.i.canvas.height = s)),
            [r, s]
    )
}

function Go(t, e, n) {
    t.m ||
    console.error(
        "No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target",
    )
    const r = new Uint32Array(e.length)
    for (let n = 0; n < e.length; n++) r[n] = t.i.stringToNewUTF8(e[n])
    ;
    (e = t.i._malloc(4 * r.length)), t.i.HEAPU32.set(r, e >> 2), n(e)
    for (const e of r) t.i._free(e)
    t.i._free(e)
}

function jo(t, e, n) {
    ;(t.i.simpleListeners = t.i.simpleListeners || {}), (t.i.simpleListeners[e] = n)
}

function Vo(t, e, n) {
    let r = []
    ;(t.i.simpleListeners = t.i.simpleListeners || {}),
        (t.i.simpleListeners[e] = (t, e, s) => {
            e ? (n(r, s), (r = [])) : r.push(t)
        })
}
;(Co.forVisionTasks = function(t) {
    return Oo("vision", t)
}),
    (Co.forTextTasks = function(t) {
        return Oo("text", t)
    }),
    (Co.forGenAiTasks = function(t) {
        return Oo("genai", t)
    }),
    (Co.forAudioTasks = function(t) {
        return Oo("audio", t)
    }),
    (Co.isSimdSupported = function() {
        return Po()
    })

async function Xo(t, e, n, r) {
    return (
        (t = await (async (t, e, n, r, s) => {
            if ((e && (await Do(e)), !self.ModuleFactory)) throw Error("ModuleFactory not set.")
            if (n && (await Do(n), !self.ModuleFactory)) throw Error("ModuleFactory not set.")
            return (
                self.Module &&
                s &&
                (((e = self.Module).locateFile = s.locateFile),
                s.mainScriptUrlOrBlob && (e.mainScriptUrlOrBlob = s.mainScriptUrlOrBlob)),
                    (s = await self.ModuleFactory(self.Module || s)),
                    (self.ModuleFactory = self.Module = void 0),
                    new t(s, r)
            )
        })(t, n.wasmLoaderPath, n.assetLoaderPath, e, {
            locateFile: t =>
                t.endsWith(".wasm")
                    ? n.wasmBinaryPath.toString()
                    : n.assetBinaryPath && t.endsWith(".data")
                        ? n.assetBinaryPath.toString()
                        : t,
        })),
            await t.o(r),
            t
    )
}

function Ho(t, e) {
    const n = Tn(t.baseOptions, Ti, 1) || new Ti()
    "string" == typeof e ? (rn(n, 2, ke(e)), rn(n, 1)) : e instanceof Uint8Array && (rn(n, 1, se(e, !1, !1)), rn(n, 2)),
        kn(t.baseOptions, 0, 1, n)
}

function Wo(t) {
    try {
        const e = t.H.length
        if (1 === e) throw Error(t.H[0].message)
        if (1 < e) throw Error("Encountered multiple errors: " + t.H.map(t => t.message).join(", "))
    } finally {
        t.H = []
    }
}

function zo(t, e) {
    t.C = Math.max(t.C, e)
}

function Ko(t, e) {
    ;(t.B = new vs()),
        ms(t.B, "PassThroughCalculator"),
        ys(t.B, "free_memory"),
        _s(t.B, "free_memory_unused_out"),
        xs(e, "free_memory"),
        ks(e, t.B)
}

function Yo(t, e) {
    ys(t.B, e), _s(t.B, e + "_unused_out")
}

function $o(t) {
    t.g.addBoolToStream(!0, "free_memory", t.C)
}

var qo = class {
    constructor(t) {
        ;(this.g = t), (this.H = []), (this.C = 0), this.g.setAutoRenderToScreen(!1)
    }

    l(t, e = !0) {
        if (e) {
            const e = t.baseOptions || {}
            if (t.baseOptions?.modelAssetBuffer && t.baseOptions?.modelAssetPath)
                throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer")
            if (
                !(
                    Tn(this.baseOptions, Ti, 1)?.g() ||
                    Tn(this.baseOptions, Ti, 1)?.h() ||
                    t.baseOptions?.modelAssetBuffer ||
                    t.baseOptions?.modelAssetPath
                )
            )
                throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set")
            if (
                ((function(t, e) {
                    let n = Tn(t.baseOptions, Ei, 3)
                    if (!n) {
                        var r = (n = new Ei()),
                            s = new is()
                        xn(r, 4, wi, s)
                    }
                    "delegate" in e &&
                    ("GPU" === e.delegate
                        ? ((e = n), (r = new ns()), xn(e, 2, wi, r))
                        : ((e = n), (r = new is()), xn(e, 4, wi, r))),
                        kn(t.baseOptions, 0, 3, n)
                })(this, e),
                    e.modelAssetPath)
            )
                return fetch(e.modelAssetPath.toString())
                    .then(t => {
                        if (t.ok) return t.arrayBuffer()
                        throw Error(`Failed to fetch model: ${e.modelAssetPath} (${t.status})`)
                    })
                    .then(t => {
                        try {
                            this.g.i.FS_unlink("/model.dat")
                        } catch {
                        }
                        this.g.i.FS_createDataFile("/", "model.dat", new Uint8Array(t), !0, !1, !1),
                            Ho(this, "/model.dat"),
                            this.m(),
                            this.K()
                    })
            Ho(this, e.modelAssetBuffer)
        }
        return this.m(), this.K(), Promise.resolve()
    }

    K() {
    }

    fa() {
        let t
        if (
            (this.g.fa(e => {
                t = Rs(e)
            }),
                !t)
        )
            throw Error("Failed to retrieve CalculatorGraphConfig")
        return t
    }

    setGraph(t, e) {
        this.g.attachErrorListener((t, e) => {
            this.H.push(Error(e))
        }),
            this.g.Ma(),
            this.g.setGraph(t, e),
            (this.B = void 0),
            Wo(this)
    }

    finishProcessing() {
        this.g.finishProcessing(), Wo(this)
    }

    close() {
        ;(this.B = void 0), this.g.closeGraph()
    }
}

function Jo(t, e) {
    if (!t) throw Error(`Unable to obtain required WebGL resource: ${e}`)
    return t
}

qo.prototype.close = qo.prototype.close

class Zo {
    constructor(t, e, n, r) {
        ;(this.g = t), (this.h = e), (this.m = n), (this.l = r)
    }

    bind() {
        this.g.bindVertexArray(this.h)
    }

    close() {
        this.g.deleteVertexArray(this.h), this.g.deleteBuffer(this.m), this.g.deleteBuffer(this.l)
    }
}

function Qo(t, e, n) {
    const r = t.g
    if (
        ((n = Jo(r.createShader(n), "Failed to create WebGL shader")),
            r.shaderSource(n, e),
            r.compileShader(n),
            !r.getShaderParameter(n, r.COMPILE_STATUS))
    )
        throw Error(`Could not compile WebGL shader: ${r.getShaderInfoLog(n)}`)
    return r.attachShader(t.h, n), n
}

function ta(t, e) {
    const n = t.g,
        r = Jo(n.createVertexArray(), "Failed to create vertex array")
    n.bindVertexArray(r)
    const s = Jo(n.createBuffer(), "Failed to create buffer")
    n.bindBuffer(n.ARRAY_BUFFER, s),
        n.enableVertexAttribArray(t.P),
        n.vertexAttribPointer(t.P, 2, n.FLOAT, !1, 0, 0),
        n.bufferData(n.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), n.STATIC_DRAW)
    const i = Jo(n.createBuffer(), "Failed to create buffer")
    return (
        n.bindBuffer(n.ARRAY_BUFFER, i),
            n.enableVertexAttribArray(t.O),
            n.vertexAttribPointer(t.O, 2, n.FLOAT, !1, 0, 0),
            n.bufferData(
                n.ARRAY_BUFFER,
                new Float32Array(e ? [0, 1, 0, 0, 1, 0, 1, 1] : [0, 0, 0, 1, 1, 1, 1, 0]),
                n.STATIC_DRAW,
            ),
            n.bindBuffer(n.ARRAY_BUFFER, null),
            n.bindVertexArray(null),
            new Zo(n, r, s, i)
    )
}

function ea(t, e) {
    if (t.g) {
        if (e !== t.g) throw Error("Cannot change GL context once initialized")
    } else t.g = e
}

function na(t, e, n, r) {
    return (
        ea(t, e),
        t.h || (t.m(), t.D()),
            n ? (t.s || (t.s = ta(t, !0)), (n = t.s)) : (t.v || (t.v = ta(t, !1)), (n = t.v)),
            e.useProgram(t.h),
            n.bind(),
            t.l(),
            (t = r()),
            n.g.bindVertexArray(null),
            t
    )
}

function ra(t, e, n) {
    return (
        ea(t, e),
            (t = Jo(e.createTexture(), "Failed to create texture")),
            e.bindTexture(e.TEXTURE_2D, t),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, n ?? e.LINEAR),
            e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, n ?? e.LINEAR),
            e.bindTexture(e.TEXTURE_2D, null),
            t
    )
}

function sa(t, e, n) {
    ea(t, e),
    t.B || (t.B = Jo(e.createFramebuffer(), "Failed to create framebuffe.")),
        e.bindFramebuffer(e.FRAMEBUFFER, t.B),
        e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, n, 0)
}

function ia(t) {
    t.g?.bindFramebuffer(t.g.FRAMEBUFFER, null)
}

var oa = class {
    H() {
        return "\n  precision mediump float;\n  varying vec2 vTex;\n  uniform sampler2D inputTexture;\n  void main() {\n    gl_FragColor = texture2D(inputTexture, vTex);\n  }\n "
    }

    m() {
        const t = this.g
        if (
            ((this.h = Jo(t.createProgram(), "Failed to create WebGL program")),
                (this.ba = Qo(
                    this,
                    "\n  attribute vec2 aVertex;\n  attribute vec2 aTex;\n  varying vec2 vTex;\n  void main(void) {\n    gl_Position = vec4(aVertex, 0.0, 1.0);\n    vTex = aTex;\n  }",
                    t.VERTEX_SHADER,
                )),
                (this.aa = Qo(this, this.H(), t.FRAGMENT_SHADER)),
                t.linkProgram(this.h),
                !t.getProgramParameter(this.h, t.LINK_STATUS))
        )
            throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`)
                ;
        (this.P = t.getAttribLocation(this.h, "aVertex")), (this.O = t.getAttribLocation(this.h, "aTex"))
    }

    D() {
    }

    l() {
    }

    close() {
        if (this.h) {
            const t = this.g
            t.deleteProgram(this.h), t.deleteShader(this.ba), t.deleteShader(this.aa)
        }
        this.B && this.g.deleteFramebuffer(this.B), this.v && this.v.close(), this.s && this.s.close()
    }
}
var aa = class extends oa {
        H() {
            return "\n  precision mediump float;\n  uniform sampler2D backgroundTexture;\n  uniform sampler2D maskTexture;\n  uniform sampler2D colorMappingTexture;\n  varying vec2 vTex;\n  void main() {\n    vec4 backgroundColor = texture2D(backgroundTexture, vTex);\n    float category = texture2D(maskTexture, vTex).r;\n    vec4 categoryColor = texture2D(colorMappingTexture, vec2(category, 0.0));\n    gl_FragColor = mix(backgroundColor, categoryColor, categoryColor.a);\n  }\n "
        }

        D() {
            const t = this.g
            t.activeTexture(t.TEXTURE1),
                (this.C = ra(this, t, t.LINEAR)),
                t.activeTexture(t.TEXTURE2),
                (this.j = ra(this, t, t.NEAREST))
        }

        m() {
            super.m()
            const t = this.g
            ;(this.K = Jo(t.getUniformLocation(this.h, "backgroundTexture"), "Uniform location")),
                (this.V = Jo(t.getUniformLocation(this.h, "colorMappingTexture"), "Uniform location")),
                (this.J = Jo(t.getUniformLocation(this.h, "maskTexture"), "Uniform location"))
        }

        l() {
            super.l()
            const t = this.g
            t.uniform1i(this.J, 0), t.uniform1i(this.K, 1), t.uniform1i(this.V, 2)
        }

        close() {
            this.C && this.g.deleteTexture(this.C), this.j && this.g.deleteTexture(this.j), super.close()
        }
    },
    ha = class extends oa {
        H() {
            return "\n  precision mediump float;\n  uniform sampler2D maskTexture;\n  uniform sampler2D defaultTexture;\n  uniform sampler2D overlayTexture;\n  varying vec2 vTex;\n  void main() {\n    float confidence = texture2D(maskTexture, vTex).r;\n    vec4 defaultColor = texture2D(defaultTexture, vTex);\n    vec4 overlayColor = texture2D(overlayTexture, vTex);\n    // Apply the alpha from the overlay and merge in the default color\n    overlayColor = mix(defaultColor, overlayColor, overlayColor.a);\n    gl_FragColor = mix(defaultColor, overlayColor, confidence);\n  }\n "
        }

        D() {
            const t = this.g
            t.activeTexture(t.TEXTURE1), (this.j = ra(this, t)), t.activeTexture(t.TEXTURE2), (this.C = ra(this, t))
        }

        m() {
            super.m()
            const t = this.g
            ;(this.J = Jo(t.getUniformLocation(this.h, "defaultTexture"), "Uniform location")),
                (this.K = Jo(t.getUniformLocation(this.h, "overlayTexture"), "Uniform location")),
                (this.I = Jo(t.getUniformLocation(this.h, "maskTexture"), "Uniform location"))
        }

        l() {
            super.l()
            const t = this.g
            t.uniform1i(this.I, 0), t.uniform1i(this.J, 1), t.uniform1i(this.K, 2)
        }

        close() {
            this.j && this.g.deleteTexture(this.j), this.C && this.g.deleteTexture(this.C), super.close()
        }
    }

function ca(t, e) {
    switch (e) {
        case 0:
            return t.g.find(t => t instanceof Uint8Array)
        case 1:
            return t.g.find(t => t instanceof Float32Array)
        case 2:
            return t.g.find(t => "undefined" != typeof WebGLTexture && t instanceof WebGLTexture)
        default:
            throw Error(`Type is not supported: ${e}`)
    }
}

function ua(t) {
    var e = ca(t, 1)
    if (!e) {
        if ((e = ca(t, 0))) e = new Float32Array(e).map(t => t / 255)
        else {
            e = new Float32Array(t.width * t.height)
            const r = da(t)
            var n = pa(t)
            if (
                (sa(n, r, la(t)),
                "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod"
                    .split(";")
                    .includes(navigator.platform) ||
                (navigator.userAgent.includes("Mac") && "ontouchend" in self.document))
            ) {
                ;(n = new Float32Array(t.width * t.height * 4)),
                    r.readPixels(0, 0, t.width, t.height, r.RGBA, r.FLOAT, n)
                for (let t = 0, r = 0; t < e.length; ++t, r += 4) e[t] = n[r]
            } else r.readPixels(0, 0, t.width, t.height, r.RED, r.FLOAT, e)
        }
        t.g.push(e)
    }
    return e
}

function la(t) {
    let e = ca(t, 2)
    if (!e) {
        const n = da(t)
        e = ga(t)
        const r = ua(t),
            s = fa(t)
        n.texImage2D(n.TEXTURE_2D, 0, s, t.width, t.height, 0, n.RED, n.FLOAT, r), ma(t)
    }
    return e
}

function da(t) {
    if (!t.canvas)
        throw Error(
            "Conversion to different image formats require that a canvas is passed when initializing the image.",
        )
    return (
        t.h ||
        (t.h = Jo(
            t.canvas.getContext("webgl2"),
            "You cannot use a canvas that is already bound to a different type of rendering context.",
        )),
            t.h
    )
}

function fa(t) {
    if (((t = da(t)), !ya))
        if (
            t.getExtension("EXT_color_buffer_float") &&
            t.getExtension("OES_texture_float_linear") &&
            t.getExtension("EXT_float_blend")
        )
            ya = t.R32F
        else {
            if (!t.getExtension("EXT_color_buffer_half_float"))
                throw Error("GPU does not fully support 4-channel float32 or float16 formats")
            ya = t.R16F
        }
    return ya
}

function pa(t) {
    return t.l || (t.l = new oa()), t.l
}

function ga(t) {
    const e = da(t)
    e.viewport(0, 0, t.width, t.height), e.activeTexture(e.TEXTURE0)
    let n = ca(t, 2)
    return (
        n || ((n = ra(pa(t), e, t.m ? e.LINEAR : e.NEAREST)), t.g.push(n), (t.j = !0)),
            e.bindTexture(e.TEXTURE_2D, n),
            n
    )
}

function ma(t) {
    t.h.bindTexture(t.h.TEXTURE_2D, null)
}

var ya,
    _a = class {
        constructor(t, e, n, r, s, i, o) {
            ;(this.g = t),
                (this.m = e),
                (this.j = n),
                (this.canvas = r),
                (this.l = s),
                (this.width = i),
                (this.height = o),
            this.j &&
            0 === --va &&
            console.error(
                "You seem to be creating MPMask instances without invoking .close(). This leaks resources.",
            )
        }

        Ha() {
            return !!ca(this, 0)
        }

        la() {
            return !!ca(this, 1)
        }

        R() {
            return !!ca(this, 2)
        }

        ka() {
            return (e = ca((t = this), 0)) || ((e = ua(t)), (e = new Uint8Array(e.map(t => 255 * t))), t.g.push(e)), e
            var t, e
        }

        ja() {
            return ua(this)
        }

        M() {
            return la(this)
        }

        clone() {
            const t = []
            for (const e of this.g) {
                let n
                if (e instanceof Uint8Array) n = new Uint8Array(e)
                else if (e instanceof Float32Array) n = new Float32Array(e)
                else {
                    if (!(e instanceof WebGLTexture)) throw Error(`Type is not supported: ${e}`)
                    {
                        const t = da(this),
                            e = pa(this)
                        t.activeTexture(t.TEXTURE1),
                            (n = ra(e, t, this.m ? t.LINEAR : t.NEAREST)),
                            t.bindTexture(t.TEXTURE_2D, n)
                        const r = fa(this)
                        t.texImage2D(t.TEXTURE_2D, 0, r, this.width, this.height, 0, t.RED, t.FLOAT, null),
                            t.bindTexture(t.TEXTURE_2D, null),
                            sa(e, t, n),
                            na(e, t, !1, () => {
                                ga(this),
                                    t.clearColor(0, 0, 0, 0),
                                    t.clear(t.COLOR_BUFFER_BIT),
                                    t.drawArrays(t.TRIANGLE_FAN, 0, 4),
                                    ma(this)
                            }),
                            ia(e),
                            ma(this)
                    }
                }
                t.push(n)
            }
            return new _a(t, this.m, this.R(), this.canvas, this.l, this.width, this.height)
        }

        close() {
            this.j && da(this).deleteTexture(ca(this, 2)), (va = -1)
        }
    }
;(_a.prototype.close = _a.prototype.close),
    (_a.prototype.clone = _a.prototype.clone),
    (_a.prototype.getAsWebGLTexture = _a.prototype.M),
    (_a.prototype.getAsFloat32Array = _a.prototype.ja),
    (_a.prototype.getAsUint8Array = _a.prototype.ka),
    (_a.prototype.hasWebGLTexture = _a.prototype.R),
    (_a.prototype.hasFloat32Array = _a.prototype.la),
    (_a.prototype.hasUint8Array = _a.prototype.Ha)
var va = 250
const Ea = { color: "white", lineWidth: 4, radius: 6 }

function wa(t) {
    return { ...Ea, fillColor: (t = t || {}).color, ...t }
}

function Ta(t, e) {
    return t instanceof Function ? t(e) : t
}

function Aa(t, e, n) {
    return Math.max(Math.min(e, n), Math.min(Math.max(e, n), t))
}

function ba(t) {
    if (!t.l) throw Error("CPU rendering requested but CanvasRenderingContext2D not provided.")
    return t.l
}

function ka(t) {
    if (!t.j) throw Error("GPU rendering requested but WebGL2RenderingContext not provided.")
    return t.j
}

function xa(t, e, n) {
    if (e.R()) n(e.M())
    else {
        const r = e.la() ? e.ja() : e.ka()
        t.m = t.m ?? new oa()
        const s = ka(t)
        n((t = new _a([r], e.m, !1, s.canvas, t.m, e.width, e.height)).M()), t.close()
    }
}

function Sa(t, e, n, r) {
    const s = (function(t) {
            return t.g || (t.g = new aa()), t.g
        })(t),
        i = ka(t),
        o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n
    na(s, i, !0, () => {
        !(function(t, e, n, r) {
            const s = t.g
            if (
                (s.activeTexture(s.TEXTURE0),
                    s.bindTexture(s.TEXTURE_2D, e),
                    s.activeTexture(s.TEXTURE1),
                    s.bindTexture(s.TEXTURE_2D, t.C),
                    s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, s.RGBA, s.UNSIGNED_BYTE, n),
                t.I &&
                (function(t, e) {
                    if (t !== e) return !1
                        ;
                    (t = t.entries()), (e = e.entries())
                    for (const [r, s] of t) {
                        t = r
                        const i = s
                        var n = e.next()
                        if (n.done) return !1
                        const [o, a] = n.value
                        if (((n = a), t !== o || i[0] !== n[0] || i[1] !== n[1] || i[2] !== n[2] || i[3] !== n[3]))
                            return !1
                    }
                    return !!e.next().done
                })(t.I, r))
            )
                s.activeTexture(s.TEXTURE2), s.bindTexture(s.TEXTURE_2D, t.j)
            else {
                t.I = r
                const e = Array(1024).fill(0)
                r.forEach((t, n) => {
                    if (4 !== t.length) throw Error(`Color at index ${n} is not a four-channel value.`)
                        ;
                    (e[4 * n] = t[0]), (e[4 * n + 1] = t[1]), (e[4 * n + 2] = t[2]), (e[4 * n + 3] = t[3])
                }),
                    s.activeTexture(s.TEXTURE2),
                    s.bindTexture(s.TEXTURE_2D, t.j),
                    s.texImage2D(s.TEXTURE_2D, 0, s.RGBA, 256, 1, 0, s.RGBA, s.UNSIGNED_BYTE, new Uint8Array(e))
            }
        })(s, e, o, r),
            i.clearColor(0, 0, 0, 0),
            i.clear(i.COLOR_BUFFER_BIT),
            i.drawArrays(i.TRIANGLE_FAN, 0, 4)
        const t = s.g
        t.activeTexture(t.TEXTURE0),
            t.bindTexture(t.TEXTURE_2D, null),
            t.activeTexture(t.TEXTURE1),
            t.bindTexture(t.TEXTURE_2D, null),
            t.activeTexture(t.TEXTURE2),
            t.bindTexture(t.TEXTURE_2D, null)
    })
}

function La(t, e, n, r) {
    const s = ka(t),
        i = (function(t) {
            return t.h || (t.h = new ha()), t.h
        })(t),
        o = Array.isArray(n) ? new ImageData(new Uint8ClampedArray(n), 1, 1) : n,
        a = Array.isArray(r) ? new ImageData(new Uint8ClampedArray(r), 1, 1) : r
    na(i, s, !0, () => {
        var t = i.g
        t.activeTexture(t.TEXTURE0),
            t.bindTexture(t.TEXTURE_2D, e),
            t.activeTexture(t.TEXTURE1),
            t.bindTexture(t.TEXTURE_2D, i.j),
            t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, o),
            t.activeTexture(t.TEXTURE2),
            t.bindTexture(t.TEXTURE_2D, i.C),
            t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, a),
            s.clearColor(0, 0, 0, 0),
            s.clear(s.COLOR_BUFFER_BIT),
            s.drawArrays(s.TRIANGLE_FAN, 0, 4),
            s.bindTexture(s.TEXTURE_2D, null),
            (t = i.g).activeTexture(t.TEXTURE0),
            t.bindTexture(t.TEXTURE_2D, null),
            t.activeTexture(t.TEXTURE1),
            t.bindTexture(t.TEXTURE_2D, null),
            t.activeTexture(t.TEXTURE2),
            t.bindTexture(t.TEXTURE_2D, null)
    })
}

var Fa = class {
    constructor(t, e) {
        t instanceof CanvasRenderingContext2D || t instanceof OffscreenCanvasRenderingContext2D
            ? ((this.l = t), (this.j = e))
            : (this.j = t)
    }

    Aa(t, e) {
        if (t) {
            var n = ba(this)
            ;(e = wa(e)), n.save()
            var r = n.canvas,
                s = 0
            for (const i of t)
                (n.fillStyle = Ta(e.fillColor, { index: s, from: i })),
                    (n.strokeStyle = Ta(e.color, { index: s, from: i })),
                    (n.lineWidth = Ta(e.lineWidth, { index: s, from: i })),
                    (t = new Path2D()).arc(
                        i.x * r.width,
                        i.y * r.height,
                        Ta(e.radius, { index: s, from: i }),
                        0,
                        2 * Math.PI,
                    ),
                    n.fill(t),
                    n.stroke(t),
                    ++s
            n.restore()
        }
    }

    za(t, e, n) {
        if (t && e) {
            var r = ba(this)
            ;(n = wa(n)), r.save()
            var s = r.canvas,
                i = 0
            for (const o of e) {
                r.beginPath(), (e = t[o.start])
                const a = t[o.end]
                e &&
                a &&
                ((r.strokeStyle = Ta(n.color, { index: i, from: e, to: a })),
                    (r.lineWidth = Ta(n.lineWidth, { index: i, from: e, to: a })),
                    r.moveTo(e.x * s.width, e.y * s.height),
                    r.lineTo(a.x * s.width, a.y * s.height)),
                    ++i,
                    r.stroke()
            }
            r.restore()
        }
    }

    wa(t, e) {
        const n = ba(this)
        ;(e = wa(e)),
            n.save(),
            n.beginPath(),
            (n.lineWidth = Ta(e.lineWidth, {})),
            (n.strokeStyle = Ta(e.color, {})),
            (n.fillStyle = Ta(e.fillColor, {})),
            n.moveTo(t.originX, t.originY),
            n.lineTo(t.originX + t.width, t.originY),
            n.lineTo(t.originX + t.width, t.originY + t.height),
            n.lineTo(t.originX, t.originY + t.height),
            n.lineTo(t.originX, t.originY),
            n.stroke(),
            n.fill(),
            n.restore()
    }

    xa(t, e, n = [0, 0, 0, 255]) {
        this.l
            ? (function(t, e, n, r) {
                const s = ka(t)
                xa(t, e, e => {
                    Sa(t, e, n, r), (e = ba(t)).drawImage(s.canvas, 0, 0, e.canvas.width, e.canvas.height)
                })
            })(this, t, n, e)
            : Sa(this, t.M(), n, e)
    }

    ya(t, e, n) {
        this.l
            ? (function(t, e, n, r) {
                const s = ka(t)
                xa(t, e, e => {
                    La(t, e, n, r), (e = ba(t)).drawImage(s.canvas, 0, 0, e.canvas.width, e.canvas.height)
                })
            })(this, t, e, n)
            : La(this, t.M(), e, n)
    }

    close() {
        this.g?.close(), (this.g = void 0), this.h?.close(), (this.h = void 0), this.m?.close(), (this.m = void 0)
    }
}

function Ra(t, e) {
    switch (e) {
        case 0:
            return t.g.find(t => t instanceof ImageData)
        case 1:
            return t.g.find(t => "undefined" != typeof ImageBitmap && t instanceof ImageBitmap)
        case 2:
            return t.g.find(t => "undefined" != typeof WebGLTexture && t instanceof WebGLTexture)
        default:
            throw Error(`Type is not supported: ${e}`)
    }
}

function Ma(t) {
    var e = Ra(t, 0)
    if (!e) {
        e = Oa(t)
        const n = Ca(t),
            r = new Uint8Array(t.width * t.height * 4)
        sa(n, e, Pa(t)),
            e.readPixels(0, 0, t.width, t.height, e.RGBA, e.UNSIGNED_BYTE, r),
            ia(n),
            (e = new ImageData(new Uint8ClampedArray(r.buffer), t.width, t.height)),
            t.g.push(e)
    }
    return e
}

function Pa(t) {
    let e = Ra(t, 2)
    if (!e) {
        const n = Oa(t)
        e = Ia(t)
        const r = Ra(t, 1) || Ma(t)
        n.texImage2D(n.TEXTURE_2D, 0, n.RGBA, n.RGBA, n.UNSIGNED_BYTE, r), Da(t)
    }
    return e
}

function Oa(t) {
    if (!t.canvas)
        throw Error(
            "Conversion to different image formats require that a canvas is passed when iniitializing the image.",
        )
    return (
        t.h ||
        (t.h = Jo(
            t.canvas.getContext("webgl2"),
            "You cannot use a canvas that is already bound to a different type of rendering context.",
        )),
            t.h
    )
}

function Ca(t) {
    return t.l || (t.l = new oa()), t.l
}

function Ia(t) {
    const e = Oa(t)
    e.viewport(0, 0, t.width, t.height), e.activeTexture(e.TEXTURE0)
    let n = Ra(t, 2)
    return n || ((n = ra(Ca(t), e)), t.g.push(n), (t.m = !0)), e.bindTexture(e.TEXTURE_2D, n), n
}

function Da(t) {
    t.h.bindTexture(t.h.TEXTURE_2D, null)
}

function Na(t) {
    const e = Oa(t)
    return na(Ca(t), e, !0, () =>
        (function(t, e) {
            const n = t.canvas
            if (n.width === t.width && n.height === t.height) return e()
            const r = n.width,
                s = n.height
            return (n.width = t.width), (n.height = t.height), (t = e()), (n.width = r), (n.height = s), t
        })(t, () => {
            if (
                (e.bindFramebuffer(e.FRAMEBUFFER, null),
                    e.clearColor(0, 0, 0, 0),
                    e.clear(e.COLOR_BUFFER_BIT),
                    e.drawArrays(e.TRIANGLE_FAN, 0, 4),
                    !(t.canvas instanceof OffscreenCanvas))
            )
                throw Error(
                    "Conversion to ImageBitmap requires that the MediaPipe Tasks is initialized with an OffscreenCanvas",
                )
            return t.canvas.transferToImageBitmap()
        }),
    )
}
;(Fa.prototype.close = Fa.prototype.close),
    (Fa.prototype.drawConfidenceMask = Fa.prototype.ya),
    (Fa.prototype.drawCategoryMask = Fa.prototype.xa),
    (Fa.prototype.drawBoundingBox = Fa.prototype.wa),
    (Fa.prototype.drawConnectors = Fa.prototype.za),
    (Fa.prototype.drawLandmarks = Fa.prototype.Aa),
    (Fa.lerp = function(t, e, n, r, s) {
        return Aa(r * (1 - (t - e) / (n - e)) + s * (1 - (n - t) / (n - e)), r, s)
    }),
    (Fa.clamp = Aa)
var Ua = class {
        constructor(t, e, n, r, s, i, o) {
            ;(this.g = t),
                (this.j = e),
                (this.m = n),
                (this.canvas = r),
                (this.l = s),
                (this.width = i),
                (this.height = o),
            (this.j || this.m) &&
            0 === --Ba &&
            console.error(
                "You seem to be creating MPImage instances without invoking .close(). This leaks resources.",
            )
        }

        Ga() {
            return !!Ra(this, 0)
        }

        ma() {
            return !!Ra(this, 1)
        }

        R() {
            return !!Ra(this, 2)
        }

        Ea() {
            return Ma(this)
        }

        Da() {
            var t = Ra(this, 1)
            return t || (Pa(this), Ia(this), (t = Na(this)), Da(this), this.g.push(t), (this.j = !0)), t
        }

        M() {
            return Pa(this)
        }

        clone() {
            const t = []
            for (const e of this.g) {
                let n
                if (e instanceof ImageData) n = new ImageData(e.data, this.width, this.height)
                else if (e instanceof WebGLTexture) {
                    const t = Oa(this),
                        e = Ca(this)
                    t.activeTexture(t.TEXTURE1),
                        (n = ra(e, t)),
                        t.bindTexture(t.TEXTURE_2D, n),
                        t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this.width, this.height, 0, t.RGBA, t.UNSIGNED_BYTE, null),
                        t.bindTexture(t.TEXTURE_2D, null),
                        sa(e, t, n),
                        na(e, t, !1, () => {
                            Ia(this),
                                t.clearColor(0, 0, 0, 0),
                                t.clear(t.COLOR_BUFFER_BIT),
                                t.drawArrays(t.TRIANGLE_FAN, 0, 4),
                                Da(this)
                        }),
                        ia(e),
                        Da(this)
                } else {
                    if (!(e instanceof ImageBitmap)) throw Error(`Type is not supported: ${e}`)
                    Pa(this), Ia(this), (n = Na(this)), Da(this)
                }
                t.push(n)
            }
            return new Ua(t, this.ma(), this.R(), this.canvas, this.l, this.width, this.height)
        }

        close() {
            this.j && Ra(this, 1).close(), this.m && Oa(this).deleteTexture(Ra(this, 2)), (Ba = -1)
        }
    }
;(Ua.prototype.close = Ua.prototype.close),
    (Ua.prototype.clone = Ua.prototype.clone),
    (Ua.prototype.getAsWebGLTexture = Ua.prototype.M),
    (Ua.prototype.getAsImageBitmap = Ua.prototype.Da),
    (Ua.prototype.getAsImageData = Ua.prototype.Ea),
    (Ua.prototype.hasWebGLTexture = Ua.prototype.R),
    (Ua.prototype.hasImageBitmap = Ua.prototype.ma),
    (Ua.prototype.hasImageData = Ua.prototype.Ga)
var Ba = 250

function Ga(...t) {
    return t.map(([t, e]) => ({ start: t, end: e }))
}

const ja = (function(t) {
    return class extends t {
        Ma() {
            this.i._registerModelResourcesGraphService()
        }
    }
})(
    ((Va = class {
        constructor(t, e) {
            ;(this.l = !0),
                (this.i = t),
                (this.g = null),
                (this.h = 0),
                (this.m = "function" == typeof this.i._addIntToInputStream),
                void 0 !== e
                    ? (this.i.canvas = e)
                    : "undefined" == typeof OffscreenCanvas || Io()
                        ? (console.warn(
                            "OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas.",
                        ),
                            (this.i.canvas = document.createElement("canvas")))
                        : (this.i.canvas = new OffscreenCanvas(1, 1))
        }

        async initializeGraph(t) {
            const e = await (await fetch(t)).arrayBuffer()
            ;(t = !(t.endsWith(".pbtxt") || t.endsWith(".textproto"))), this.setGraph(new Uint8Array(e), t)
        }

        setGraphFromString(t) {
            this.setGraph(new TextEncoder().encode(t), !1)
        }

        setGraph(t, e) {
            const n = t.length,
                r = this.i._malloc(n)
            this.i.HEAPU8.set(t, r),
                e ? this.i._changeBinaryGraph(n, r) : this.i._changeTextGraph(n, r),
                this.i._free(r)
        }

        configureAudio(t, e, n, r, s) {
            this.i._configureAudio ||
            console.warn(
                "Attempting to use configureAudio without support for input audio. Is build dep \":gl_graph_runner_audio\" missing?",
            ),
                Uo(this, r || "input_audio", r => {
                    Uo(this, (s = s || "audio_header"), s => {
                        this.i._configureAudio(r, s, t, e, n)
                    })
                })
        }

        setAutoResizeCanvas(t) {
            this.l = t
        }

        setAutoRenderToScreen(t) {
            this.i._setAutoRenderToScreen(t)
        }

        setGpuBufferVerticalFlip(t) {
            this.i.gpuOriginForWebTexturesIsBottomLeft = t
        }

        fa(t) {
            jo(this, "__graph_config__", e => {
                t(e)
            }),
                Uo(this, "__graph_config__", t => {
                    this.i._getGraphConfig(t, void 0)
                }),
                delete this.i.simpleListeners.__graph_config__
        }

        attachErrorListener(t) {
            this.i.errorListener = t
        }

        attachEmptyPacketListener(t, e) {
            ;(this.i.emptyPacketListeners = this.i.emptyPacketListeners || {}), (this.i.emptyPacketListeners[t] = e)
        }

        addAudioToStream(t, e, n) {
            this.addAudioToStreamWithShape(t, 0, 0, e, n)
        }

        addAudioToStreamWithShape(t, e, n, r, s) {
            const i = 4 * t.length
            this.h !== i && (this.g && this.i._free(this.g), (this.g = this.i._malloc(i)), (this.h = i)),
                this.i.HEAPF32.set(t, this.g / 4),
                Uo(this, r, t => {
                    this.i._addAudioToInputStream(this.g, e, n, t, s)
                })
        }

        addGpuBufferToStream(t, e, n) {
            Uo(this, e, e => {
                const [r, s] = Bo(this, t, e)
                this.i._addBoundTextureToStream(e, r, s, n)
            })
        }

        addBoolToStream(t, e, n) {
            Uo(this, e, e => {
                this.i._addBoolToInputStream(t, e, n)
            })
        }

        addDoubleToStream(t, e, n) {
            Uo(this, e, e => {
                this.i._addDoubleToInputStream(t, e, n)
            })
        }

        addFloatToStream(t, e, n) {
            Uo(this, e, e => {
                this.i._addFloatToInputStream(t, e, n)
            })
        }

        addIntToStream(t, e, n) {
            Uo(this, e, e => {
                this.i._addIntToInputStream(t, e, n)
            })
        }

        addStringToStream(t, e, n) {
            Uo(this, e, e => {
                Uo(this, t, t => {
                    this.i._addStringToInputStream(t, e, n)
                })
            })
        }

        addStringRecordToStream(t, e, n) {
            Uo(this, e, e => {
                Go(this, Object.keys(t), r => {
                    Go(this, Object.values(t), s => {
                        this.i._addFlatHashMapToInputStream(r, s, Object.keys(t).length, e, n)
                    })
                })
            })
        }

        addProtoToStream(t, e, n, r) {
            Uo(this, n, n => {
                Uo(this, e, e => {
                    const s = this.i._malloc(t.length)
                    this.i.HEAPU8.set(t, s), this.i._addProtoToInputStream(s, t.length, e, n, r), this.i._free(s)
                })
            })
        }

        addEmptyPacketToStream(t, e) {
            Uo(this, t, t => {
                this.i._addEmptyPacketToInputStream(t, e)
            })
        }

        addBoolVectorToStream(t, e, n) {
            Uo(this, e, e => {
                const r = this.i._allocateBoolVector(t.length)
                if (!r) throw Error("Unable to allocate new bool vector on heap.")
                for (const e of t) this.i._addBoolVectorEntry(r, e)
                this.i._addBoolVectorToInputStream(r, e, n)
            })
        }

        addDoubleVectorToStream(t, e, n) {
            Uo(this, e, e => {
                const r = this.i._allocateDoubleVector(t.length)
                if (!r) throw Error("Unable to allocate new double vector on heap.")
                for (const e of t) this.i._addDoubleVectorEntry(r, e)
                this.i._addDoubleVectorToInputStream(r, e, n)
            })
        }

        addFloatVectorToStream(t, e, n) {
            Uo(this, e, e => {
                const r = this.i._allocateFloatVector(t.length)
                if (!r) throw Error("Unable to allocate new float vector on heap.")
                for (const e of t) this.i._addFloatVectorEntry(r, e)
                this.i._addFloatVectorToInputStream(r, e, n)
            })
        }

        addIntVectorToStream(t, e, n) {
            Uo(this, e, e => {
                const r = this.i._allocateIntVector(t.length)
                if (!r) throw Error("Unable to allocate new int vector on heap.")
                for (const e of t) this.i._addIntVectorEntry(r, e)
                this.i._addIntVectorToInputStream(r, e, n)
            })
        }

        addStringVectorToStream(t, e, n) {
            Uo(this, e, e => {
                const r = this.i._allocateStringVector(t.length)
                if (!r) throw Error("Unable to allocate new string vector on heap.")
                for (const e of t)
                    Uo(this, e, t => {
                        this.i._addStringVectorEntry(r, t)
                    })
                this.i._addStringVectorToInputStream(r, e, n)
            })
        }

        addBoolToInputSidePacket(t, e) {
            Uo(this, e, e => {
                this.i._addBoolToInputSidePacket(t, e)
            })
        }

        addDoubleToInputSidePacket(t, e) {
            Uo(this, e, e => {
                this.i._addDoubleToInputSidePacket(t, e)
            })
        }

        addFloatToInputSidePacket(t, e) {
            Uo(this, e, e => {
                this.i._addFloatToInputSidePacket(t, e)
            })
        }

        addIntToInputSidePacket(t, e) {
            Uo(this, e, e => {
                this.i._addIntToInputSidePacket(t, e)
            })
        }

        addStringToInputSidePacket(t, e) {
            Uo(this, e, e => {
                Uo(this, t, t => {
                    this.i._addStringToInputSidePacket(t, e)
                })
            })
        }

        addProtoToInputSidePacket(t, e, n) {
            Uo(this, n, n => {
                Uo(this, e, e => {
                    const r = this.i._malloc(t.length)
                    this.i.HEAPU8.set(t, r), this.i._addProtoToInputSidePacket(r, t.length, e, n), this.i._free(r)
                })
            })
        }

        addBoolVectorToInputSidePacket(t, e) {
            Uo(this, e, e => {
                const n = this.i._allocateBoolVector(t.length)
                if (!n) throw Error("Unable to allocate new bool vector on heap.")
                for (const e of t) this.i._addBoolVectorEntry(n, e)
                this.i._addBoolVectorToInputSidePacket(n, e)
            })
        }

        addDoubleVectorToInputSidePacket(t, e) {
            Uo(this, e, e => {
                const n = this.i._allocateDoubleVector(t.length)
                if (!n) throw Error("Unable to allocate new double vector on heap.")
                for (const e of t) this.i._addDoubleVectorEntry(n, e)
                this.i._addDoubleVectorToInputSidePacket(n, e)
            })
        }

        addFloatVectorToInputSidePacket(t, e) {
            Uo(this, e, e => {
                const n = this.i._allocateFloatVector(t.length)
                if (!n) throw Error("Unable to allocate new float vector on heap.")
                for (const e of t) this.i._addFloatVectorEntry(n, e)
                this.i._addFloatVectorToInputSidePacket(n, e)
            })
        }

        addIntVectorToInputSidePacket(t, e) {
            Uo(this, e, e => {
                const n = this.i._allocateIntVector(t.length)
                if (!n) throw Error("Unable to allocate new int vector on heap.")
                for (const e of t) this.i._addIntVectorEntry(n, e)
                this.i._addIntVectorToInputSidePacket(n, e)
            })
        }

        addStringVectorToInputSidePacket(t, e) {
            Uo(this, e, e => {
                const n = this.i._allocateStringVector(t.length)
                if (!n) throw Error("Unable to allocate new string vector on heap.")
                for (const e of t)
                    Uo(this, e, t => {
                        this.i._addStringVectorEntry(n, t)
                    })
                this.i._addStringVectorToInputSidePacket(n, e)
            })
        }

        attachBoolListener(t, e) {
            jo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachBoolListener(t)
                })
        }

        attachBoolVectorListener(t, e) {
            Vo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachBoolVectorListener(t)
                })
        }

        attachIntListener(t, e) {
            jo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachIntListener(t)
                })
        }

        attachIntVectorListener(t, e) {
            Vo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachIntVectorListener(t)
                })
        }

        attachDoubleListener(t, e) {
            jo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachDoubleListener(t)
                })
        }

        attachDoubleVectorListener(t, e) {
            Vo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachDoubleVectorListener(t)
                })
        }

        attachFloatListener(t, e) {
            jo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachFloatListener(t)
                })
        }

        attachFloatVectorListener(t, e) {
            Vo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachFloatVectorListener(t)
                })
        }

        attachStringListener(t, e) {
            jo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachStringListener(t)
                })
        }

        attachStringVectorListener(t, e) {
            Vo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachStringVectorListener(t)
                })
        }

        attachProtoListener(t, e, n) {
            jo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachProtoListener(t, n || !1)
                })
        }

        attachProtoVectorListener(t, e, n) {
            Vo(this, t, e),
                Uo(this, t, t => {
                    this.i._attachProtoVectorListener(t, n || !1)
                })
        }

        attachAudioListener(t, e, n) {
            this.i._attachAudioListener ||
            console.warn(
                "Attempting to use attachAudioListener without support for output audio. Is build dep \":gl_graph_runner_audio_out\" missing?",
            ),
                jo(this, t, (t, n) => {
                    ;(t = new Float32Array(t.buffer, t.byteOffset, t.length / 4)), e(t, n)
                }),
                Uo(this, t, t => {
                    this.i._attachAudioListener(t, n || !1)
                })
        }

        finishProcessing() {
            this.i._waitUntilIdle()
        }

        closeGraph() {
            this.i._closeGraph(), (this.i.simpleListeners = void 0), (this.i.emptyPacketListeners = void 0)
        }
    }),
        class extends Va {
            get ha() {
                return this.i
            }

            sa(t, e, n) {
                Uo(this, e, e => {
                    const [r, s] = Bo(this, t, e)
                    this.ha._addBoundTextureAsImageToStream(e, r, s, n)
                })
            }

            W(t, e) {
                jo(this, t, e),
                    Uo(this, t, t => {
                        this.ha._attachImageListener(t)
                    })
            }

            da(t, e) {
                Vo(this, t, e),
                    Uo(this, t, t => {
                        this.ha._attachImageVectorListener(t)
                    })
            }
        }),
)
var Va,
    Xa = class extends ja {
    }

async function Ha(t, e, n) {
    return (async function(t, e, n, r) {
        return Xo(t, e, n, r)
    })(t, n.canvas ?? ("undefined" == typeof OffscreenCanvas || Io() ? document.createElement("canvas") : void 0), e, n)
}

function Wa(t, e, n, r) {
    if (t.V) {
        const i = new si()
        if (n?.regionOfInterest) {
            if (!t.ra) throw Error("This task doesn't support region-of-interest.")
            var s = n.regionOfInterest
            if (s.left >= s.right || s.top >= s.bottom)
                throw Error("Expected RectF with left < right and top < bottom.")
            if (0 > s.left || 0 > s.top || 1 < s.right || 1 < s.bottom)
                throw Error("Expected RectF values to be in [0,1].")
            In(i, 1, (s.left + s.right) / 2),
                In(i, 2, (s.top + s.bottom) / 2),
                In(i, 4, s.right - s.left),
                In(i, 3, s.bottom - s.top)
        } else In(i, 1, 0.5), In(i, 2, 0.5), In(i, 4, 1), In(i, 3, 1)
        if (n?.rotationDegrees) {
            if (0 != n?.rotationDegrees % 90) throw Error("Expected rotation to be a multiple of 90°.")
            if ((In(i, 5, (-Math.PI * n.rotationDegrees) / 180), 0 != n?.rotationDegrees % 180)) {
                const [t, r] = No(e)
                ;(n = (Pn(i, 3) * r) / t), (s = (Pn(i, 4) * t) / r), In(i, 4, n), In(i, 3, s)
            }
        }
        t.g.addProtoToStream(i.g(), "mediapipe.NormalizedRect", t.V, r)
    }
    t.g.sa(e, t.ba, r ?? performance.now()), t.finishProcessing()
}

function za(t, e, n) {
    if (t.baseOptions?.g())
        throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.")
    Wa(t, e, n, t.C + 1)
}

function Ka(t, e, n, r) {
    if (!t.baseOptions?.g())
        throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.")
    Wa(t, e, n, r)
}

function Ya(t, e, n, r) {
    var s = e.data
    const i = e.width,
        o = i * (e = e.height)
    if ((s instanceof Uint8Array || s instanceof Float32Array) && s.length !== o)
        throw Error("Unsupported channel count: " + s.length / o)
    return (t = new _a([s], n, !1, t.g.i.canvas, t.O, i, e)), r ? t.clone() : t
}

var $a = class extends qo {
    constructor(t, e, n, r) {
        super(t), (this.g = t), (this.ba = e), (this.V = n), (this.ra = r), (this.O = new oa())
    }

    l(t, e = !0) {
        if (
            ("runningMode" in t && On(this.baseOptions, 2, !!t.runningMode && "IMAGE" !== t.runningMode),
            void 0 !== t.canvas && this.g.i.canvas !== t.canvas)
        )
            throw Error("You must create a new task to reset the canvas.")
        return super.l(t, e)
    }

    close() {
        this.O.close(), super.close()
    }
}
$a.prototype.close = $a.prototype.close
var qa = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "image_in", "norm_rect_in", !1),
                (this.j = { detections: [] }),
                kn((t = this.h = new xi()), 0, 1, (e = new bi())),
                In(this.h, 2, 0.5),
                In(this.h, 3, 0.3)
        }

        get baseOptions() {
            return Tn(this.h, bi, 1)
        }

        set baseOptions(t) {
            kn(this.h, 0, 1, t)
        }

        o(t) {
            return (
                "minDetectionConfidence" in t && In(this.h, 2, t.minDetectionConfidence ?? 0.5),
                "minSuppressionThreshold" in t && In(this.h, 3, t.minSuppressionThreshold ?? 0.3),
                    this.l(t)
            )
        }

        F(t, e) {
            return (this.j = { detections: [] }), za(this, t, e), this.j
        }

        G(t, e, n) {
            return (this.j = { detections: [] }), Ka(this, t, n, e), this.j
        }

        m() {
            var t = new Ls()
            xs(t, "image_in"), xs(t, "norm_rect_in"), Ss(t, "detections")
            const e = new hs()
            Dn(e, Li, this.h)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),
                ys(n, "IMAGE:image_in"),
                ys(n, "NORM_RECT:norm_rect_in"),
                _s(n, "DETECTIONS:detections"),
                n.o(e),
                ks(t, n),
                this.g.attachProtoVectorListener("detections", (t, e) => {
                    for (const e of t) (t = Ks(e)), this.j.detections.push(ko(t))
                    zo(this, e)
                }),
                this.g.attachEmptyPacketListener("detections", t => {
                    zo(this, t)
                }),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(qa.prototype.detectForVideo = qa.prototype.G),
    (qa.prototype.detect = qa.prototype.F),
    (qa.prototype.setOptions = qa.prototype.o),
    (qa.createFromModelPath = async function(t, e) {
        return Ha(qa, t, { baseOptions: { modelAssetPath: e } })
    }),
    (qa.createFromModelBuffer = function(t, e) {
        return Ha(qa, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (qa.createFromOptions = function(t, e) {
        return Ha(qa, t, e)
    })
var Ja = Ga(
        [61, 146],
        [146, 91],
        [91, 181],
        [181, 84],
        [84, 17],
        [17, 314],
        [314, 405],
        [405, 321],
        [321, 375],
        [375, 291],
        [61, 185],
        [185, 40],
        [40, 39],
        [39, 37],
        [37, 0],
        [0, 267],
        [267, 269],
        [269, 270],
        [270, 409],
        [409, 291],
        [78, 95],
        [95, 88],
        [88, 178],
        [178, 87],
        [87, 14],
        [14, 317],
        [317, 402],
        [402, 318],
        [318, 324],
        [324, 308],
        [78, 191],
        [191, 80],
        [80, 81],
        [81, 82],
        [82, 13],
        [13, 312],
        [312, 311],
        [311, 310],
        [310, 415],
        [415, 308],
    ),
    Za = Ga(
        [263, 249],
        [249, 390],
        [390, 373],
        [373, 374],
        [374, 380],
        [380, 381],
        [381, 382],
        [382, 362],
        [263, 466],
        [466, 388],
        [388, 387],
        [387, 386],
        [386, 385],
        [385, 384],
        [384, 398],
        [398, 362],
    ),
    Qa = Ga([276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]),
    th = Ga([474, 475], [475, 476], [476, 477], [477, 474]),
    eh = Ga(
        [33, 7],
        [7, 163],
        [163, 144],
        [144, 145],
        [145, 153],
        [153, 154],
        [154, 155],
        [155, 133],
        [33, 246],
        [246, 161],
        [161, 160],
        [160, 159],
        [159, 158],
        [158, 157],
        [157, 173],
        [173, 133],
    ),
    nh = Ga([46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]),
    rh = Ga([469, 470], [470, 471], [471, 472], [472, 469]),
    sh = Ga(
        [10, 338],
        [338, 297],
        [297, 332],
        [332, 284],
        [284, 251],
        [251, 389],
        [389, 356],
        [356, 454],
        [454, 323],
        [323, 361],
        [361, 288],
        [288, 397],
        [397, 365],
        [365, 379],
        [379, 378],
        [378, 400],
        [400, 377],
        [377, 152],
        [152, 148],
        [148, 176],
        [176, 149],
        [149, 150],
        [150, 136],
        [136, 172],
        [172, 58],
        [58, 132],
        [132, 93],
        [93, 234],
        [234, 127],
        [127, 162],
        [162, 21],
        [21, 54],
        [54, 103],
        [103, 67],
        [67, 109],
        [109, 10],
    ),
    ih = [...Ja, ...Za, ...Qa, ...eh, ...nh, ...sh],
    oh = Ga(
        [127, 34],
        [34, 139],
        [139, 127],
        [11, 0],
        [0, 37],
        [37, 11],
        [232, 231],
        [231, 120],
        [120, 232],
        [72, 37],
        [37, 39],
        [39, 72],
        [128, 121],
        [121, 47],
        [47, 128],
        [232, 121],
        [121, 128],
        [128, 232],
        [104, 69],
        [69, 67],
        [67, 104],
        [175, 171],
        [171, 148],
        [148, 175],
        [118, 50],
        [50, 101],
        [101, 118],
        [73, 39],
        [39, 40],
        [40, 73],
        [9, 151],
        [151, 108],
        [108, 9],
        [48, 115],
        [115, 131],
        [131, 48],
        [194, 204],
        [204, 211],
        [211, 194],
        [74, 40],
        [40, 185],
        [185, 74],
        [80, 42],
        [42, 183],
        [183, 80],
        [40, 92],
        [92, 186],
        [186, 40],
        [230, 229],
        [229, 118],
        [118, 230],
        [202, 212],
        [212, 214],
        [214, 202],
        [83, 18],
        [18, 17],
        [17, 83],
        [76, 61],
        [61, 146],
        [146, 76],
        [160, 29],
        [29, 30],
        [30, 160],
        [56, 157],
        [157, 173],
        [173, 56],
        [106, 204],
        [204, 194],
        [194, 106],
        [135, 214],
        [214, 192],
        [192, 135],
        [203, 165],
        [165, 98],
        [98, 203],
        [21, 71],
        [71, 68],
        [68, 21],
        [51, 45],
        [45, 4],
        [4, 51],
        [144, 24],
        [24, 23],
        [23, 144],
        [77, 146],
        [146, 91],
        [91, 77],
        [205, 50],
        [50, 187],
        [187, 205],
        [201, 200],
        [200, 18],
        [18, 201],
        [91, 106],
        [106, 182],
        [182, 91],
        [90, 91],
        [91, 181],
        [181, 90],
        [85, 84],
        [84, 17],
        [17, 85],
        [206, 203],
        [203, 36],
        [36, 206],
        [148, 171],
        [171, 140],
        [140, 148],
        [92, 40],
        [40, 39],
        [39, 92],
        [193, 189],
        [189, 244],
        [244, 193],
        [159, 158],
        [158, 28],
        [28, 159],
        [247, 246],
        [246, 161],
        [161, 247],
        [236, 3],
        [3, 196],
        [196, 236],
        [54, 68],
        [68, 104],
        [104, 54],
        [193, 168],
        [168, 8],
        [8, 193],
        [117, 228],
        [228, 31],
        [31, 117],
        [189, 193],
        [193, 55],
        [55, 189],
        [98, 97],
        [97, 99],
        [99, 98],
        [126, 47],
        [47, 100],
        [100, 126],
        [166, 79],
        [79, 218],
        [218, 166],
        [155, 154],
        [154, 26],
        [26, 155],
        [209, 49],
        [49, 131],
        [131, 209],
        [135, 136],
        [136, 150],
        [150, 135],
        [47, 126],
        [126, 217],
        [217, 47],
        [223, 52],
        [52, 53],
        [53, 223],
        [45, 51],
        [51, 134],
        [134, 45],
        [211, 170],
        [170, 140],
        [140, 211],
        [67, 69],
        [69, 108],
        [108, 67],
        [43, 106],
        [106, 91],
        [91, 43],
        [230, 119],
        [119, 120],
        [120, 230],
        [226, 130],
        [130, 247],
        [247, 226],
        [63, 53],
        [53, 52],
        [52, 63],
        [238, 20],
        [20, 242],
        [242, 238],
        [46, 70],
        [70, 156],
        [156, 46],
        [78, 62],
        [62, 96],
        [96, 78],
        [46, 53],
        [53, 63],
        [63, 46],
        [143, 34],
        [34, 227],
        [227, 143],
        [123, 117],
        [117, 111],
        [111, 123],
        [44, 125],
        [125, 19],
        [19, 44],
        [236, 134],
        [134, 51],
        [51, 236],
        [216, 206],
        [206, 205],
        [205, 216],
        [154, 153],
        [153, 22],
        [22, 154],
        [39, 37],
        [37, 167],
        [167, 39],
        [200, 201],
        [201, 208],
        [208, 200],
        [36, 142],
        [142, 100],
        [100, 36],
        [57, 212],
        [212, 202],
        [202, 57],
        [20, 60],
        [60, 99],
        [99, 20],
        [28, 158],
        [158, 157],
        [157, 28],
        [35, 226],
        [226, 113],
        [113, 35],
        [160, 159],
        [159, 27],
        [27, 160],
        [204, 202],
        [202, 210],
        [210, 204],
        [113, 225],
        [225, 46],
        [46, 113],
        [43, 202],
        [202, 204],
        [204, 43],
        [62, 76],
        [76, 77],
        [77, 62],
        [137, 123],
        [123, 116],
        [116, 137],
        [41, 38],
        [38, 72],
        [72, 41],
        [203, 129],
        [129, 142],
        [142, 203],
        [64, 98],
        [98, 240],
        [240, 64],
        [49, 102],
        [102, 64],
        [64, 49],
        [41, 73],
        [73, 74],
        [74, 41],
        [212, 216],
        [216, 207],
        [207, 212],
        [42, 74],
        [74, 184],
        [184, 42],
        [169, 170],
        [170, 211],
        [211, 169],
        [170, 149],
        [149, 176],
        [176, 170],
        [105, 66],
        [66, 69],
        [69, 105],
        [122, 6],
        [6, 168],
        [168, 122],
        [123, 147],
        [147, 187],
        [187, 123],
        [96, 77],
        [77, 90],
        [90, 96],
        [65, 55],
        [55, 107],
        [107, 65],
        [89, 90],
        [90, 180],
        [180, 89],
        [101, 100],
        [100, 120],
        [120, 101],
        [63, 105],
        [105, 104],
        [104, 63],
        [93, 137],
        [137, 227],
        [227, 93],
        [15, 86],
        [86, 85],
        [85, 15],
        [129, 102],
        [102, 49],
        [49, 129],
        [14, 87],
        [87, 86],
        [86, 14],
        [55, 8],
        [8, 9],
        [9, 55],
        [100, 47],
        [47, 121],
        [121, 100],
        [145, 23],
        [23, 22],
        [22, 145],
        [88, 89],
        [89, 179],
        [179, 88],
        [6, 122],
        [122, 196],
        [196, 6],
        [88, 95],
        [95, 96],
        [96, 88],
        [138, 172],
        [172, 136],
        [136, 138],
        [215, 58],
        [58, 172],
        [172, 215],
        [115, 48],
        [48, 219],
        [219, 115],
        [42, 80],
        [80, 81],
        [81, 42],
        [195, 3],
        [3, 51],
        [51, 195],
        [43, 146],
        [146, 61],
        [61, 43],
        [171, 175],
        [175, 199],
        [199, 171],
        [81, 82],
        [82, 38],
        [38, 81],
        [53, 46],
        [46, 225],
        [225, 53],
        [144, 163],
        [163, 110],
        [110, 144],
        [52, 65],
        [65, 66],
        [66, 52],
        [229, 228],
        [228, 117],
        [117, 229],
        [34, 127],
        [127, 234],
        [234, 34],
        [107, 108],
        [108, 69],
        [69, 107],
        [109, 108],
        [108, 151],
        [151, 109],
        [48, 64],
        [64, 235],
        [235, 48],
        [62, 78],
        [78, 191],
        [191, 62],
        [129, 209],
        [209, 126],
        [126, 129],
        [111, 35],
        [35, 143],
        [143, 111],
        [117, 123],
        [123, 50],
        [50, 117],
        [222, 65],
        [65, 52],
        [52, 222],
        [19, 125],
        [125, 141],
        [141, 19],
        [221, 55],
        [55, 65],
        [65, 221],
        [3, 195],
        [195, 197],
        [197, 3],
        [25, 7],
        [7, 33],
        [33, 25],
        [220, 237],
        [237, 44],
        [44, 220],
        [70, 71],
        [71, 139],
        [139, 70],
        [122, 193],
        [193, 245],
        [245, 122],
        [247, 130],
        [130, 33],
        [33, 247],
        [71, 21],
        [21, 162],
        [162, 71],
        [170, 169],
        [169, 150],
        [150, 170],
        [188, 174],
        [174, 196],
        [196, 188],
        [216, 186],
        [186, 92],
        [92, 216],
        [2, 97],
        [97, 167],
        [167, 2],
        [141, 125],
        [125, 241],
        [241, 141],
        [164, 167],
        [167, 37],
        [37, 164],
        [72, 38],
        [38, 12],
        [12, 72],
        [38, 82],
        [82, 13],
        [13, 38],
        [63, 68],
        [68, 71],
        [71, 63],
        [226, 35],
        [35, 111],
        [111, 226],
        [101, 50],
        [50, 205],
        [205, 101],
        [206, 92],
        [92, 165],
        [165, 206],
        [209, 198],
        [198, 217],
        [217, 209],
        [165, 167],
        [167, 97],
        [97, 165],
        [220, 115],
        [115, 218],
        [218, 220],
        [133, 112],
        [112, 243],
        [243, 133],
        [239, 238],
        [238, 241],
        [241, 239],
        [214, 135],
        [135, 169],
        [169, 214],
        [190, 173],
        [173, 133],
        [133, 190],
        [171, 208],
        [208, 32],
        [32, 171],
        [125, 44],
        [44, 237],
        [237, 125],
        [86, 87],
        [87, 178],
        [178, 86],
        [85, 86],
        [86, 179],
        [179, 85],
        [84, 85],
        [85, 180],
        [180, 84],
        [83, 84],
        [84, 181],
        [181, 83],
        [201, 83],
        [83, 182],
        [182, 201],
        [137, 93],
        [93, 132],
        [132, 137],
        [76, 62],
        [62, 183],
        [183, 76],
        [61, 76],
        [76, 184],
        [184, 61],
        [57, 61],
        [61, 185],
        [185, 57],
        [212, 57],
        [57, 186],
        [186, 212],
        [214, 207],
        [207, 187],
        [187, 214],
        [34, 143],
        [143, 156],
        [156, 34],
        [79, 239],
        [239, 237],
        [237, 79],
        [123, 137],
        [137, 177],
        [177, 123],
        [44, 1],
        [1, 4],
        [4, 44],
        [201, 194],
        [194, 32],
        [32, 201],
        [64, 102],
        [102, 129],
        [129, 64],
        [213, 215],
        [215, 138],
        [138, 213],
        [59, 166],
        [166, 219],
        [219, 59],
        [242, 99],
        [99, 97],
        [97, 242],
        [2, 94],
        [94, 141],
        [141, 2],
        [75, 59],
        [59, 235],
        [235, 75],
        [24, 110],
        [110, 228],
        [228, 24],
        [25, 130],
        [130, 226],
        [226, 25],
        [23, 24],
        [24, 229],
        [229, 23],
        [22, 23],
        [23, 230],
        [230, 22],
        [26, 22],
        [22, 231],
        [231, 26],
        [112, 26],
        [26, 232],
        [232, 112],
        [189, 190],
        [190, 243],
        [243, 189],
        [221, 56],
        [56, 190],
        [190, 221],
        [28, 56],
        [56, 221],
        [221, 28],
        [27, 28],
        [28, 222],
        [222, 27],
        [29, 27],
        [27, 223],
        [223, 29],
        [30, 29],
        [29, 224],
        [224, 30],
        [247, 30],
        [30, 225],
        [225, 247],
        [238, 79],
        [79, 20],
        [20, 238],
        [166, 59],
        [59, 75],
        [75, 166],
        [60, 75],
        [75, 240],
        [240, 60],
        [147, 177],
        [177, 215],
        [215, 147],
        [20, 79],
        [79, 166],
        [166, 20],
        [187, 147],
        [147, 213],
        [213, 187],
        [112, 233],
        [233, 244],
        [244, 112],
        [233, 128],
        [128, 245],
        [245, 233],
        [128, 114],
        [114, 188],
        [188, 128],
        [114, 217],
        [217, 174],
        [174, 114],
        [131, 115],
        [115, 220],
        [220, 131],
        [217, 198],
        [198, 236],
        [236, 217],
        [198, 131],
        [131, 134],
        [134, 198],
        [177, 132],
        [132, 58],
        [58, 177],
        [143, 35],
        [35, 124],
        [124, 143],
        [110, 163],
        [163, 7],
        [7, 110],
        [228, 110],
        [110, 25],
        [25, 228],
        [356, 389],
        [389, 368],
        [368, 356],
        [11, 302],
        [302, 267],
        [267, 11],
        [452, 350],
        [350, 349],
        [349, 452],
        [302, 303],
        [303, 269],
        [269, 302],
        [357, 343],
        [343, 277],
        [277, 357],
        [452, 453],
        [453, 357],
        [357, 452],
        [333, 332],
        [332, 297],
        [297, 333],
        [175, 152],
        [152, 377],
        [377, 175],
        [347, 348],
        [348, 330],
        [330, 347],
        [303, 304],
        [304, 270],
        [270, 303],
        [9, 336],
        [336, 337],
        [337, 9],
        [278, 279],
        [279, 360],
        [360, 278],
        [418, 262],
        [262, 431],
        [431, 418],
        [304, 408],
        [408, 409],
        [409, 304],
        [310, 415],
        [415, 407],
        [407, 310],
        [270, 409],
        [409, 410],
        [410, 270],
        [450, 348],
        [348, 347],
        [347, 450],
        [422, 430],
        [430, 434],
        [434, 422],
        [313, 314],
        [314, 17],
        [17, 313],
        [306, 307],
        [307, 375],
        [375, 306],
        [387, 388],
        [388, 260],
        [260, 387],
        [286, 414],
        [414, 398],
        [398, 286],
        [335, 406],
        [406, 418],
        [418, 335],
        [364, 367],
        [367, 416],
        [416, 364],
        [423, 358],
        [358, 327],
        [327, 423],
        [251, 284],
        [284, 298],
        [298, 251],
        [281, 5],
        [5, 4],
        [4, 281],
        [373, 374],
        [374, 253],
        [253, 373],
        [307, 320],
        [320, 321],
        [321, 307],
        [425, 427],
        [427, 411],
        [411, 425],
        [421, 313],
        [313, 18],
        [18, 421],
        [321, 405],
        [405, 406],
        [406, 321],
        [320, 404],
        [404, 405],
        [405, 320],
        [315, 16],
        [16, 17],
        [17, 315],
        [426, 425],
        [425, 266],
        [266, 426],
        [377, 400],
        [400, 369],
        [369, 377],
        [322, 391],
        [391, 269],
        [269, 322],
        [417, 465],
        [465, 464],
        [464, 417],
        [386, 257],
        [257, 258],
        [258, 386],
        [466, 260],
        [260, 388],
        [388, 466],
        [456, 399],
        [399, 419],
        [419, 456],
        [284, 332],
        [332, 333],
        [333, 284],
        [417, 285],
        [285, 8],
        [8, 417],
        [346, 340],
        [340, 261],
        [261, 346],
        [413, 441],
        [441, 285],
        [285, 413],
        [327, 460],
        [460, 328],
        [328, 327],
        [355, 371],
        [371, 329],
        [329, 355],
        [392, 439],
        [439, 438],
        [438, 392],
        [382, 341],
        [341, 256],
        [256, 382],
        [429, 420],
        [420, 360],
        [360, 429],
        [364, 394],
        [394, 379],
        [379, 364],
        [277, 343],
        [343, 437],
        [437, 277],
        [443, 444],
        [444, 283],
        [283, 443],
        [275, 440],
        [440, 363],
        [363, 275],
        [431, 262],
        [262, 369],
        [369, 431],
        [297, 338],
        [338, 337],
        [337, 297],
        [273, 375],
        [375, 321],
        [321, 273],
        [450, 451],
        [451, 349],
        [349, 450],
        [446, 342],
        [342, 467],
        [467, 446],
        [293, 334],
        [334, 282],
        [282, 293],
        [458, 461],
        [461, 462],
        [462, 458],
        [276, 353],
        [353, 383],
        [383, 276],
        [308, 324],
        [324, 325],
        [325, 308],
        [276, 300],
        [300, 293],
        [293, 276],
        [372, 345],
        [345, 447],
        [447, 372],
        [352, 345],
        [345, 340],
        [340, 352],
        [274, 1],
        [1, 19],
        [19, 274],
        [456, 248],
        [248, 281],
        [281, 456],
        [436, 427],
        [427, 425],
        [425, 436],
        [381, 256],
        [256, 252],
        [252, 381],
        [269, 391],
        [391, 393],
        [393, 269],
        [200, 199],
        [199, 428],
        [428, 200],
        [266, 330],
        [330, 329],
        [329, 266],
        [287, 273],
        [273, 422],
        [422, 287],
        [250, 462],
        [462, 328],
        [328, 250],
        [258, 286],
        [286, 384],
        [384, 258],
        [265, 353],
        [353, 342],
        [342, 265],
        [387, 259],
        [259, 257],
        [257, 387],
        [424, 431],
        [431, 430],
        [430, 424],
        [342, 353],
        [353, 276],
        [276, 342],
        [273, 335],
        [335, 424],
        [424, 273],
        [292, 325],
        [325, 307],
        [307, 292],
        [366, 447],
        [447, 345],
        [345, 366],
        [271, 303],
        [303, 302],
        [302, 271],
        [423, 266],
        [266, 371],
        [371, 423],
        [294, 455],
        [455, 460],
        [460, 294],
        [279, 278],
        [278, 294],
        [294, 279],
        [271, 272],
        [272, 304],
        [304, 271],
        [432, 434],
        [434, 427],
        [427, 432],
        [272, 407],
        [407, 408],
        [408, 272],
        [394, 430],
        [430, 431],
        [431, 394],
        [395, 369],
        [369, 400],
        [400, 395],
        [334, 333],
        [333, 299],
        [299, 334],
        [351, 417],
        [417, 168],
        [168, 351],
        [352, 280],
        [280, 411],
        [411, 352],
        [325, 319],
        [319, 320],
        [320, 325],
        [295, 296],
        [296, 336],
        [336, 295],
        [319, 403],
        [403, 404],
        [404, 319],
        [330, 348],
        [348, 349],
        [349, 330],
        [293, 298],
        [298, 333],
        [333, 293],
        [323, 454],
        [454, 447],
        [447, 323],
        [15, 16],
        [16, 315],
        [315, 15],
        [358, 429],
        [429, 279],
        [279, 358],
        [14, 15],
        [15, 316],
        [316, 14],
        [285, 336],
        [336, 9],
        [9, 285],
        [329, 349],
        [349, 350],
        [350, 329],
        [374, 380],
        [380, 252],
        [252, 374],
        [318, 402],
        [402, 403],
        [403, 318],
        [6, 197],
        [197, 419],
        [419, 6],
        [318, 319],
        [319, 325],
        [325, 318],
        [367, 364],
        [364, 365],
        [365, 367],
        [435, 367],
        [367, 397],
        [397, 435],
        [344, 438],
        [438, 439],
        [439, 344],
        [272, 271],
        [271, 311],
        [311, 272],
        [195, 5],
        [5, 281],
        [281, 195],
        [273, 287],
        [287, 291],
        [291, 273],
        [396, 428],
        [428, 199],
        [199, 396],
        [311, 271],
        [271, 268],
        [268, 311],
        [283, 444],
        [444, 445],
        [445, 283],
        [373, 254],
        [254, 339],
        [339, 373],
        [282, 334],
        [334, 296],
        [296, 282],
        [449, 347],
        [347, 346],
        [346, 449],
        [264, 447],
        [447, 454],
        [454, 264],
        [336, 296],
        [296, 299],
        [299, 336],
        [338, 10],
        [10, 151],
        [151, 338],
        [278, 439],
        [439, 455],
        [455, 278],
        [292, 407],
        [407, 415],
        [415, 292],
        [358, 371],
        [371, 355],
        [355, 358],
        [340, 345],
        [345, 372],
        [372, 340],
        [346, 347],
        [347, 280],
        [280, 346],
        [442, 443],
        [443, 282],
        [282, 442],
        [19, 94],
        [94, 370],
        [370, 19],
        [441, 442],
        [442, 295],
        [295, 441],
        [248, 419],
        [419, 197],
        [197, 248],
        [263, 255],
        [255, 359],
        [359, 263],
        [440, 275],
        [275, 274],
        [274, 440],
        [300, 383],
        [383, 368],
        [368, 300],
        [351, 412],
        [412, 465],
        [465, 351],
        [263, 467],
        [467, 466],
        [466, 263],
        [301, 368],
        [368, 389],
        [389, 301],
        [395, 378],
        [378, 379],
        [379, 395],
        [412, 351],
        [351, 419],
        [419, 412],
        [436, 426],
        [426, 322],
        [322, 436],
        [2, 164],
        [164, 393],
        [393, 2],
        [370, 462],
        [462, 461],
        [461, 370],
        [164, 0],
        [0, 267],
        [267, 164],
        [302, 11],
        [11, 12],
        [12, 302],
        [268, 12],
        [12, 13],
        [13, 268],
        [293, 300],
        [300, 301],
        [301, 293],
        [446, 261],
        [261, 340],
        [340, 446],
        [330, 266],
        [266, 425],
        [425, 330],
        [426, 423],
        [423, 391],
        [391, 426],
        [429, 355],
        [355, 437],
        [437, 429],
        [391, 327],
        [327, 326],
        [326, 391],
        [440, 457],
        [457, 438],
        [438, 440],
        [341, 382],
        [382, 362],
        [362, 341],
        [459, 457],
        [457, 461],
        [461, 459],
        [434, 430],
        [430, 394],
        [394, 434],
        [414, 463],
        [463, 362],
        [362, 414],
        [396, 369],
        [369, 262],
        [262, 396],
        [354, 461],
        [461, 457],
        [457, 354],
        [316, 403],
        [403, 402],
        [402, 316],
        [315, 404],
        [404, 403],
        [403, 315],
        [314, 405],
        [405, 404],
        [404, 314],
        [313, 406],
        [406, 405],
        [405, 313],
        [421, 418],
        [418, 406],
        [406, 421],
        [366, 401],
        [401, 361],
        [361, 366],
        [306, 408],
        [408, 407],
        [407, 306],
        [291, 409],
        [409, 408],
        [408, 291],
        [287, 410],
        [410, 409],
        [409, 287],
        [432, 436],
        [436, 410],
        [410, 432],
        [434, 416],
        [416, 411],
        [411, 434],
        [264, 368],
        [368, 383],
        [383, 264],
        [309, 438],
        [438, 457],
        [457, 309],
        [352, 376],
        [376, 401],
        [401, 352],
        [274, 275],
        [275, 4],
        [4, 274],
        [421, 428],
        [428, 262],
        [262, 421],
        [294, 327],
        [327, 358],
        [358, 294],
        [433, 416],
        [416, 367],
        [367, 433],
        [289, 455],
        [455, 439],
        [439, 289],
        [462, 370],
        [370, 326],
        [326, 462],
        [2, 326],
        [326, 370],
        [370, 2],
        [305, 460],
        [460, 455],
        [455, 305],
        [254, 449],
        [449, 448],
        [448, 254],
        [255, 261],
        [261, 446],
        [446, 255],
        [253, 450],
        [450, 449],
        [449, 253],
        [252, 451],
        [451, 450],
        [450, 252],
        [256, 452],
        [452, 451],
        [451, 256],
        [341, 453],
        [453, 452],
        [452, 341],
        [413, 464],
        [464, 463],
        [463, 413],
        [441, 413],
        [413, 414],
        [414, 441],
        [258, 442],
        [442, 441],
        [441, 258],
        [257, 443],
        [443, 442],
        [442, 257],
        [259, 444],
        [444, 443],
        [443, 259],
        [260, 445],
        [445, 444],
        [444, 260],
        [467, 342],
        [342, 445],
        [445, 467],
        [459, 458],
        [458, 250],
        [250, 459],
        [289, 392],
        [392, 290],
        [290, 289],
        [290, 328],
        [328, 460],
        [460, 290],
        [376, 433],
        [433, 435],
        [435, 376],
        [250, 290],
        [290, 392],
        [392, 250],
        [411, 416],
        [416, 433],
        [433, 411],
        [341, 463],
        [463, 464],
        [464, 341],
        [453, 464],
        [464, 465],
        [465, 453],
        [357, 465],
        [465, 412],
        [412, 357],
        [343, 412],
        [412, 399],
        [399, 343],
        [360, 363],
        [363, 440],
        [440, 360],
        [437, 399],
        [399, 456],
        [456, 437],
        [420, 456],
        [456, 363],
        [363, 420],
        [401, 435],
        [435, 288],
        [288, 401],
        [372, 383],
        [383, 353],
        [353, 372],
        [339, 255],
        [255, 249],
        [249, 339],
        [448, 261],
        [261, 255],
        [255, 448],
        [133, 243],
        [243, 190],
        [190, 133],
        [133, 155],
        [155, 112],
        [112, 133],
        [33, 246],
        [246, 247],
        [247, 33],
        [33, 130],
        [130, 25],
        [25, 33],
        [398, 384],
        [384, 286],
        [286, 398],
        [362, 398],
        [398, 414],
        [414, 362],
        [362, 463],
        [463, 341],
        [341, 362],
        [263, 359],
        [359, 467],
        [467, 263],
        [263, 249],
        [249, 255],
        [255, 263],
        [466, 467],
        [467, 260],
        [260, 466],
        [75, 60],
        [60, 166],
        [166, 75],
        [238, 239],
        [239, 79],
        [79, 238],
        [162, 127],
        [127, 139],
        [139, 162],
        [72, 11],
        [11, 37],
        [37, 72],
        [121, 232],
        [232, 120],
        [120, 121],
        [73, 72],
        [72, 39],
        [39, 73],
        [114, 128],
        [128, 47],
        [47, 114],
        [233, 232],
        [232, 128],
        [128, 233],
        [103, 104],
        [104, 67],
        [67, 103],
        [152, 175],
        [175, 148],
        [148, 152],
        [119, 118],
        [118, 101],
        [101, 119],
        [74, 73],
        [73, 40],
        [40, 74],
        [107, 9],
        [9, 108],
        [108, 107],
        [49, 48],
        [48, 131],
        [131, 49],
        [32, 194],
        [194, 211],
        [211, 32],
        [184, 74],
        [74, 185],
        [185, 184],
        [191, 80],
        [80, 183],
        [183, 191],
        [185, 40],
        [40, 186],
        [186, 185],
        [119, 230],
        [230, 118],
        [118, 119],
        [210, 202],
        [202, 214],
        [214, 210],
        [84, 83],
        [83, 17],
        [17, 84],
        [77, 76],
        [76, 146],
        [146, 77],
        [161, 160],
        [160, 30],
        [30, 161],
        [190, 56],
        [56, 173],
        [173, 190],
        [182, 106],
        [106, 194],
        [194, 182],
        [138, 135],
        [135, 192],
        [192, 138],
        [129, 203],
        [203, 98],
        [98, 129],
        [54, 21],
        [21, 68],
        [68, 54],
        [5, 51],
        [51, 4],
        [4, 5],
        [145, 144],
        [144, 23],
        [23, 145],
        [90, 77],
        [77, 91],
        [91, 90],
        [207, 205],
        [205, 187],
        [187, 207],
        [83, 201],
        [201, 18],
        [18, 83],
        [181, 91],
        [91, 182],
        [182, 181],
        [180, 90],
        [90, 181],
        [181, 180],
        [16, 85],
        [85, 17],
        [17, 16],
        [205, 206],
        [206, 36],
        [36, 205],
        [176, 148],
        [148, 140],
        [140, 176],
        [165, 92],
        [92, 39],
        [39, 165],
        [245, 193],
        [193, 244],
        [244, 245],
        [27, 159],
        [159, 28],
        [28, 27],
        [30, 247],
        [247, 161],
        [161, 30],
        [174, 236],
        [236, 196],
        [196, 174],
        [103, 54],
        [54, 104],
        [104, 103],
        [55, 193],
        [193, 8],
        [8, 55],
        [111, 117],
        [117, 31],
        [31, 111],
        [221, 189],
        [189, 55],
        [55, 221],
        [240, 98],
        [98, 99],
        [99, 240],
        [142, 126],
        [126, 100],
        [100, 142],
        [219, 166],
        [166, 218],
        [218, 219],
        [112, 155],
        [155, 26],
        [26, 112],
        [198, 209],
        [209, 131],
        [131, 198],
        [169, 135],
        [135, 150],
        [150, 169],
        [114, 47],
        [47, 217],
        [217, 114],
        [224, 223],
        [223, 53],
        [53, 224],
        [220, 45],
        [45, 134],
        [134, 220],
        [32, 211],
        [211, 140],
        [140, 32],
        [109, 67],
        [67, 108],
        [108, 109],
        [146, 43],
        [43, 91],
        [91, 146],
        [231, 230],
        [230, 120],
        [120, 231],
        [113, 226],
        [226, 247],
        [247, 113],
        [105, 63],
        [63, 52],
        [52, 105],
        [241, 238],
        [238, 242],
        [242, 241],
        [124, 46],
        [46, 156],
        [156, 124],
        [95, 78],
        [78, 96],
        [96, 95],
        [70, 46],
        [46, 63],
        [63, 70],
        [116, 143],
        [143, 227],
        [227, 116],
        [116, 123],
        [123, 111],
        [111, 116],
        [1, 44],
        [44, 19],
        [19, 1],
        [3, 236],
        [236, 51],
        [51, 3],
        [207, 216],
        [216, 205],
        [205, 207],
        [26, 154],
        [154, 22],
        [22, 26],
        [165, 39],
        [39, 167],
        [167, 165],
        [199, 200],
        [200, 208],
        [208, 199],
        [101, 36],
        [36, 100],
        [100, 101],
        [43, 57],
        [57, 202],
        [202, 43],
        [242, 20],
        [20, 99],
        [99, 242],
        [56, 28],
        [28, 157],
        [157, 56],
        [124, 35],
        [35, 113],
        [113, 124],
        [29, 160],
        [160, 27],
        [27, 29],
        [211, 204],
        [204, 210],
        [210, 211],
        [124, 113],
        [113, 46],
        [46, 124],
        [106, 43],
        [43, 204],
        [204, 106],
        [96, 62],
        [62, 77],
        [77, 96],
        [227, 137],
        [137, 116],
        [116, 227],
        [73, 41],
        [41, 72],
        [72, 73],
        [36, 203],
        [203, 142],
        [142, 36],
        [235, 64],
        [64, 240],
        [240, 235],
        [48, 49],
        [49, 64],
        [64, 48],
        [42, 41],
        [41, 74],
        [74, 42],
        [214, 212],
        [212, 207],
        [207, 214],
        [183, 42],
        [42, 184],
        [184, 183],
        [210, 169],
        [169, 211],
        [211, 210],
        [140, 170],
        [170, 176],
        [176, 140],
        [104, 105],
        [105, 69],
        [69, 104],
        [193, 122],
        [122, 168],
        [168, 193],
        [50, 123],
        [123, 187],
        [187, 50],
        [89, 96],
        [96, 90],
        [90, 89],
        [66, 65],
        [65, 107],
        [107, 66],
        [179, 89],
        [89, 180],
        [180, 179],
        [119, 101],
        [101, 120],
        [120, 119],
        [68, 63],
        [63, 104],
        [104, 68],
        [234, 93],
        [93, 227],
        [227, 234],
        [16, 15],
        [15, 85],
        [85, 16],
        [209, 129],
        [129, 49],
        [49, 209],
        [15, 14],
        [14, 86],
        [86, 15],
        [107, 55],
        [55, 9],
        [9, 107],
        [120, 100],
        [100, 121],
        [121, 120],
        [153, 145],
        [145, 22],
        [22, 153],
        [178, 88],
        [88, 179],
        [179, 178],
        [197, 6],
        [6, 196],
        [196, 197],
        [89, 88],
        [88, 96],
        [96, 89],
        [135, 138],
        [138, 136],
        [136, 135],
        [138, 215],
        [215, 172],
        [172, 138],
        [218, 115],
        [115, 219],
        [219, 218],
        [41, 42],
        [42, 81],
        [81, 41],
        [5, 195],
        [195, 51],
        [51, 5],
        [57, 43],
        [43, 61],
        [61, 57],
        [208, 171],
        [171, 199],
        [199, 208],
        [41, 81],
        [81, 38],
        [38, 41],
        [224, 53],
        [53, 225],
        [225, 224],
        [24, 144],
        [144, 110],
        [110, 24],
        [105, 52],
        [52, 66],
        [66, 105],
        [118, 229],
        [229, 117],
        [117, 118],
        [227, 34],
        [34, 234],
        [234, 227],
        [66, 107],
        [107, 69],
        [69, 66],
        [10, 109],
        [109, 151],
        [151, 10],
        [219, 48],
        [48, 235],
        [235, 219],
        [183, 62],
        [62, 191],
        [191, 183],
        [142, 129],
        [129, 126],
        [126, 142],
        [116, 111],
        [111, 143],
        [143, 116],
        [118, 117],
        [117, 50],
        [50, 118],
        [223, 222],
        [222, 52],
        [52, 223],
        [94, 19],
        [19, 141],
        [141, 94],
        [222, 221],
        [221, 65],
        [65, 222],
        [196, 3],
        [3, 197],
        [197, 196],
        [45, 220],
        [220, 44],
        [44, 45],
        [156, 70],
        [70, 139],
        [139, 156],
        [188, 122],
        [122, 245],
        [245, 188],
        [139, 71],
        [71, 162],
        [162, 139],
        [149, 170],
        [170, 150],
        [150, 149],
        [122, 188],
        [188, 196],
        [196, 122],
        [206, 216],
        [216, 92],
        [92, 206],
        [164, 2],
        [2, 167],
        [167, 164],
        [242, 141],
        [141, 241],
        [241, 242],
        [0, 164],
        [164, 37],
        [37, 0],
        [11, 72],
        [72, 12],
        [12, 11],
        [12, 38],
        [38, 13],
        [13, 12],
        [70, 63],
        [63, 71],
        [71, 70],
        [31, 226],
        [226, 111],
        [111, 31],
        [36, 101],
        [101, 205],
        [205, 36],
        [203, 206],
        [206, 165],
        [165, 203],
        [126, 209],
        [209, 217],
        [217, 126],
        [98, 165],
        [165, 97],
        [97, 98],
        [237, 220],
        [220, 218],
        [218, 237],
        [237, 239],
        [239, 241],
        [241, 237],
        [210, 214],
        [214, 169],
        [169, 210],
        [140, 171],
        [171, 32],
        [32, 140],
        [241, 125],
        [125, 237],
        [237, 241],
        [179, 86],
        [86, 178],
        [178, 179],
        [180, 85],
        [85, 179],
        [179, 180],
        [181, 84],
        [84, 180],
        [180, 181],
        [182, 83],
        [83, 181],
        [181, 182],
        [194, 201],
        [201, 182],
        [182, 194],
        [177, 137],
        [137, 132],
        [132, 177],
        [184, 76],
        [76, 183],
        [183, 184],
        [185, 61],
        [61, 184],
        [184, 185],
        [186, 57],
        [57, 185],
        [185, 186],
        [216, 212],
        [212, 186],
        [186, 216],
        [192, 214],
        [214, 187],
        [187, 192],
        [139, 34],
        [34, 156],
        [156, 139],
        [218, 79],
        [79, 237],
        [237, 218],
        [147, 123],
        [123, 177],
        [177, 147],
        [45, 44],
        [44, 4],
        [4, 45],
        [208, 201],
        [201, 32],
        [32, 208],
        [98, 64],
        [64, 129],
        [129, 98],
        [192, 213],
        [213, 138],
        [138, 192],
        [235, 59],
        [59, 219],
        [219, 235],
        [141, 242],
        [242, 97],
        [97, 141],
        [97, 2],
        [2, 141],
        [141, 97],
        [240, 75],
        [75, 235],
        [235, 240],
        [229, 24],
        [24, 228],
        [228, 229],
        [31, 25],
        [25, 226],
        [226, 31],
        [230, 23],
        [23, 229],
        [229, 230],
        [231, 22],
        [22, 230],
        [230, 231],
        [232, 26],
        [26, 231],
        [231, 232],
        [233, 112],
        [112, 232],
        [232, 233],
        [244, 189],
        [189, 243],
        [243, 244],
        [189, 221],
        [221, 190],
        [190, 189],
        [222, 28],
        [28, 221],
        [221, 222],
        [223, 27],
        [27, 222],
        [222, 223],
        [224, 29],
        [29, 223],
        [223, 224],
        [225, 30],
        [30, 224],
        [224, 225],
        [113, 247],
        [247, 225],
        [225, 113],
        [99, 60],
        [60, 240],
        [240, 99],
        [213, 147],
        [147, 215],
        [215, 213],
        [60, 20],
        [20, 166],
        [166, 60],
        [192, 187],
        [187, 213],
        [213, 192],
        [243, 112],
        [112, 244],
        [244, 243],
        [244, 233],
        [233, 245],
        [245, 244],
        [245, 128],
        [128, 188],
        [188, 245],
        [188, 114],
        [114, 174],
        [174, 188],
        [134, 131],
        [131, 220],
        [220, 134],
        [174, 217],
        [217, 236],
        [236, 174],
        [236, 198],
        [198, 134],
        [134, 236],
        [215, 177],
        [177, 58],
        [58, 215],
        [156, 143],
        [143, 124],
        [124, 156],
        [25, 110],
        [110, 7],
        [7, 25],
        [31, 228],
        [228, 25],
        [25, 31],
        [264, 356],
        [356, 368],
        [368, 264],
        [0, 11],
        [11, 267],
        [267, 0],
        [451, 452],
        [452, 349],
        [349, 451],
        [267, 302],
        [302, 269],
        [269, 267],
        [350, 357],
        [357, 277],
        [277, 350],
        [350, 452],
        [452, 357],
        [357, 350],
        [299, 333],
        [333, 297],
        [297, 299],
        [396, 175],
        [175, 377],
        [377, 396],
        [280, 347],
        [347, 330],
        [330, 280],
        [269, 303],
        [303, 270],
        [270, 269],
        [151, 9],
        [9, 337],
        [337, 151],
        [344, 278],
        [278, 360],
        [360, 344],
        [424, 418],
        [418, 431],
        [431, 424],
        [270, 304],
        [304, 409],
        [409, 270],
        [272, 310],
        [310, 407],
        [407, 272],
        [322, 270],
        [270, 410],
        [410, 322],
        [449, 450],
        [450, 347],
        [347, 449],
        [432, 422],
        [422, 434],
        [434, 432],
        [18, 313],
        [313, 17],
        [17, 18],
        [291, 306],
        [306, 375],
        [375, 291],
        [259, 387],
        [387, 260],
        [260, 259],
        [424, 335],
        [335, 418],
        [418, 424],
        [434, 364],
        [364, 416],
        [416, 434],
        [391, 423],
        [423, 327],
        [327, 391],
        [301, 251],
        [251, 298],
        [298, 301],
        [275, 281],
        [281, 4],
        [4, 275],
        [254, 373],
        [373, 253],
        [253, 254],
        [375, 307],
        [307, 321],
        [321, 375],
        [280, 425],
        [425, 411],
        [411, 280],
        [200, 421],
        [421, 18],
        [18, 200],
        [335, 321],
        [321, 406],
        [406, 335],
        [321, 320],
        [320, 405],
        [405, 321],
        [314, 315],
        [315, 17],
        [17, 314],
        [423, 426],
        [426, 266],
        [266, 423],
        [396, 377],
        [377, 369],
        [369, 396],
        [270, 322],
        [322, 269],
        [269, 270],
        [413, 417],
        [417, 464],
        [464, 413],
        [385, 386],
        [386, 258],
        [258, 385],
        [248, 456],
        [456, 419],
        [419, 248],
        [298, 284],
        [284, 333],
        [333, 298],
        [168, 417],
        [417, 8],
        [8, 168],
        [448, 346],
        [346, 261],
        [261, 448],
        [417, 413],
        [413, 285],
        [285, 417],
        [326, 327],
        [327, 328],
        [328, 326],
        [277, 355],
        [355, 329],
        [329, 277],
        [309, 392],
        [392, 438],
        [438, 309],
        [381, 382],
        [382, 256],
        [256, 381],
        [279, 429],
        [429, 360],
        [360, 279],
        [365, 364],
        [364, 379],
        [379, 365],
        [355, 277],
        [277, 437],
        [437, 355],
        [282, 443],
        [443, 283],
        [283, 282],
        [281, 275],
        [275, 363],
        [363, 281],
        [395, 431],
        [431, 369],
        [369, 395],
        [299, 297],
        [297, 337],
        [337, 299],
        [335, 273],
        [273, 321],
        [321, 335],
        [348, 450],
        [450, 349],
        [349, 348],
        [359, 446],
        [446, 467],
        [467, 359],
        [283, 293],
        [293, 282],
        [282, 283],
        [250, 458],
        [458, 462],
        [462, 250],
        [300, 276],
        [276, 383],
        [383, 300],
        [292, 308],
        [308, 325],
        [325, 292],
        [283, 276],
        [276, 293],
        [293, 283],
        [264, 372],
        [372, 447],
        [447, 264],
        [346, 352],
        [352, 340],
        [340, 346],
        [354, 274],
        [274, 19],
        [19, 354],
        [363, 456],
        [456, 281],
        [281, 363],
        [426, 436],
        [436, 425],
        [425, 426],
        [380, 381],
        [381, 252],
        [252, 380],
        [267, 269],
        [269, 393],
        [393, 267],
        [421, 200],
        [200, 428],
        [428, 421],
        [371, 266],
        [266, 329],
        [329, 371],
        [432, 287],
        [287, 422],
        [422, 432],
        [290, 250],
        [250, 328],
        [328, 290],
        [385, 258],
        [258, 384],
        [384, 385],
        [446, 265],
        [265, 342],
        [342, 446],
        [386, 387],
        [387, 257],
        [257, 386],
        [422, 424],
        [424, 430],
        [430, 422],
        [445, 342],
        [342, 276],
        [276, 445],
        [422, 273],
        [273, 424],
        [424, 422],
        [306, 292],
        [292, 307],
        [307, 306],
        [352, 366],
        [366, 345],
        [345, 352],
        [268, 271],
        [271, 302],
        [302, 268],
        [358, 423],
        [423, 371],
        [371, 358],
        [327, 294],
        [294, 460],
        [460, 327],
        [331, 279],
        [279, 294],
        [294, 331],
        [303, 271],
        [271, 304],
        [304, 303],
        [436, 432],
        [432, 427],
        [427, 436],
        [304, 272],
        [272, 408],
        [408, 304],
        [395, 394],
        [394, 431],
        [431, 395],
        [378, 395],
        [395, 400],
        [400, 378],
        [296, 334],
        [334, 299],
        [299, 296],
        [6, 351],
        [351, 168],
        [168, 6],
        [376, 352],
        [352, 411],
        [411, 376],
        [307, 325],
        [325, 320],
        [320, 307],
        [285, 295],
        [295, 336],
        [336, 285],
        [320, 319],
        [319, 404],
        [404, 320],
        [329, 330],
        [330, 349],
        [349, 329],
        [334, 293],
        [293, 333],
        [333, 334],
        [366, 323],
        [323, 447],
        [447, 366],
        [316, 15],
        [15, 315],
        [315, 316],
        [331, 358],
        [358, 279],
        [279, 331],
        [317, 14],
        [14, 316],
        [316, 317],
        [8, 285],
        [285, 9],
        [9, 8],
        [277, 329],
        [329, 350],
        [350, 277],
        [253, 374],
        [374, 252],
        [252, 253],
        [319, 318],
        [318, 403],
        [403, 319],
        [351, 6],
        [6, 419],
        [419, 351],
        [324, 318],
        [318, 325],
        [325, 324],
        [397, 367],
        [367, 365],
        [365, 397],
        [288, 435],
        [435, 397],
        [397, 288],
        [278, 344],
        [344, 439],
        [439, 278],
        [310, 272],
        [272, 311],
        [311, 310],
        [248, 195],
        [195, 281],
        [281, 248],
        [375, 273],
        [273, 291],
        [291, 375],
        [175, 396],
        [396, 199],
        [199, 175],
        [312, 311],
        [311, 268],
        [268, 312],
        [276, 283],
        [283, 445],
        [445, 276],
        [390, 373],
        [373, 339],
        [339, 390],
        [295, 282],
        [282, 296],
        [296, 295],
        [448, 449],
        [449, 346],
        [346, 448],
        [356, 264],
        [264, 454],
        [454, 356],
        [337, 336],
        [336, 299],
        [299, 337],
        [337, 338],
        [338, 151],
        [151, 337],
        [294, 278],
        [278, 455],
        [455, 294],
        [308, 292],
        [292, 415],
        [415, 308],
        [429, 358],
        [358, 355],
        [355, 429],
        [265, 340],
        [340, 372],
        [372, 265],
        [352, 346],
        [346, 280],
        [280, 352],
        [295, 442],
        [442, 282],
        [282, 295],
        [354, 19],
        [19, 370],
        [370, 354],
        [285, 441],
        [441, 295],
        [295, 285],
        [195, 248],
        [248, 197],
        [197, 195],
        [457, 440],
        [440, 274],
        [274, 457],
        [301, 300],
        [300, 368],
        [368, 301],
        [417, 351],
        [351, 465],
        [465, 417],
        [251, 301],
        [301, 389],
        [389, 251],
        [394, 395],
        [395, 379],
        [379, 394],
        [399, 412],
        [412, 419],
        [419, 399],
        [410, 436],
        [436, 322],
        [322, 410],
        [326, 2],
        [2, 393],
        [393, 326],
        [354, 370],
        [370, 461],
        [461, 354],
        [393, 164],
        [164, 267],
        [267, 393],
        [268, 302],
        [302, 12],
        [12, 268],
        [312, 268],
        [268, 13],
        [13, 312],
        [298, 293],
        [293, 301],
        [301, 298],
        [265, 446],
        [446, 340],
        [340, 265],
        [280, 330],
        [330, 425],
        [425, 280],
        [322, 426],
        [426, 391],
        [391, 322],
        [420, 429],
        [429, 437],
        [437, 420],
        [393, 391],
        [391, 326],
        [326, 393],
        [344, 440],
        [440, 438],
        [438, 344],
        [458, 459],
        [459, 461],
        [461, 458],
        [364, 434],
        [434, 394],
        [394, 364],
        [428, 396],
        [396, 262],
        [262, 428],
        [274, 354],
        [354, 457],
        [457, 274],
        [317, 316],
        [316, 402],
        [402, 317],
        [316, 315],
        [315, 403],
        [403, 316],
        [315, 314],
        [314, 404],
        [404, 315],
        [314, 313],
        [313, 405],
        [405, 314],
        [313, 421],
        [421, 406],
        [406, 313],
        [323, 366],
        [366, 361],
        [361, 323],
        [292, 306],
        [306, 407],
        [407, 292],
        [306, 291],
        [291, 408],
        [408, 306],
        [291, 287],
        [287, 409],
        [409, 291],
        [287, 432],
        [432, 410],
        [410, 287],
        [427, 434],
        [434, 411],
        [411, 427],
        [372, 264],
        [264, 383],
        [383, 372],
        [459, 309],
        [309, 457],
        [457, 459],
        [366, 352],
        [352, 401],
        [401, 366],
        [1, 274],
        [274, 4],
        [4, 1],
        [418, 421],
        [421, 262],
        [262, 418],
        [331, 294],
        [294, 358],
        [358, 331],
        [435, 433],
        [433, 367],
        [367, 435],
        [392, 289],
        [289, 439],
        [439, 392],
        [328, 462],
        [462, 326],
        [326, 328],
        [94, 2],
        [2, 370],
        [370, 94],
        [289, 305],
        [305, 455],
        [455, 289],
        [339, 254],
        [254, 448],
        [448, 339],
        [359, 255],
        [255, 446],
        [446, 359],
        [254, 253],
        [253, 449],
        [449, 254],
        [253, 252],
        [252, 450],
        [450, 253],
        [252, 256],
        [256, 451],
        [451, 252],
        [256, 341],
        [341, 452],
        [452, 256],
        [414, 413],
        [413, 463],
        [463, 414],
        [286, 441],
        [441, 414],
        [414, 286],
        [286, 258],
        [258, 441],
        [441, 286],
        [258, 257],
        [257, 442],
        [442, 258],
        [257, 259],
        [259, 443],
        [443, 257],
        [259, 260],
        [260, 444],
        [444, 259],
        [260, 467],
        [467, 445],
        [445, 260],
        [309, 459],
        [459, 250],
        [250, 309],
        [305, 289],
        [289, 290],
        [290, 305],
        [305, 290],
        [290, 460],
        [460, 305],
        [401, 376],
        [376, 435],
        [435, 401],
        [309, 250],
        [250, 392],
        [392, 309],
        [376, 411],
        [411, 433],
        [433, 376],
        [453, 341],
        [341, 464],
        [464, 453],
        [357, 453],
        [453, 465],
        [465, 357],
        [343, 357],
        [357, 412],
        [412, 343],
        [437, 343],
        [343, 399],
        [399, 437],
        [344, 360],
        [360, 440],
        [440, 344],
        [420, 437],
        [437, 456],
        [456, 420],
        [360, 420],
        [420, 363],
        [363, 360],
        [361, 401],
        [401, 288],
        [288, 361],
        [265, 372],
        [372, 353],
        [353, 265],
        [390, 339],
        [339, 249],
        [249, 390],
        [339, 448],
        [448, 255],
        [255, 339],
    )

function ah(t) {
    t.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }
}

var hh = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "image_in", "norm_rect", !1),
                (this.j = { faceLandmarks: [], faceBlendshapes: [], facialTransformationMatrixes: [] }),
                (this.outputFacialTransformationMatrixes = this.outputFaceBlendshapes = !1),
                kn((t = this.h = new Ii()), 0, 1, (e = new bi())),
                (this.v = new Oi()),
                kn(this.h, 0, 3, this.v),
                (this.s = new xi()),
                kn(this.h, 0, 2, this.s),
                Cn(this.s, 4, 1),
                In(this.s, 2, 0.5),
                In(this.v, 2, 0.5),
                In(this.h, 4, 0.5)
        }

        get baseOptions() {
            return Tn(this.h, bi, 1)
        }

        set baseOptions(t) {
            kn(this.h, 0, 1, t)
        }

        o(t) {
            return (
                "numFaces" in t && Cn(this.s, 4, t.numFaces ?? 1),
                "minFaceDetectionConfidence" in t && In(this.s, 2, t.minFaceDetectionConfidence ?? 0.5),
                "minTrackingConfidence" in t && In(this.h, 4, t.minTrackingConfidence ?? 0.5),
                "minFacePresenceConfidence" in t && In(this.v, 2, t.minFacePresenceConfidence ?? 0.5),
                "outputFaceBlendshapes" in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes),
                "outputFacialTransformationMatrixes" in t &&
                (this.outputFacialTransformationMatrixes = !!t.outputFacialTransformationMatrixes),
                    this.l(t)
            )
        }

        F(t, e) {
            return ah(this), za(this, t, e), this.j
        }

        G(t, e, n) {
            return ah(this), Ka(this, t, n, e), this.j
        }

        m() {
            var t = new Ls()
            xs(t, "image_in"), xs(t, "norm_rect"), Ss(t, "face_landmarks")
            const e = new hs()
            Dn(e, Ni, this.h)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),
                ys(n, "IMAGE:image_in"),
                ys(n, "NORM_RECT:norm_rect"),
                _s(n, "NORM_LANDMARKS:face_landmarks"),
                n.o(e),
                ks(t, n),
                this.g.attachProtoVectorListener("face_landmarks", (t, e) => {
                    for (const e of t) (t = ei(e)), this.j.faceLandmarks.push(xo(t))
                    zo(this, e)
                }),
                this.g.attachEmptyPacketListener("face_landmarks", t => {
                    zo(this, t)
                }),
            this.outputFaceBlendshapes &&
            (Ss(t, "blendshapes"),
                _s(n, "BLENDSHAPES:blendshapes"),
                this.g.attachProtoVectorListener("blendshapes", (t, e) => {
                    if (this.outputFaceBlendshapes)
                        for (const e of t) (t = Ds(e)), this.j.faceBlendshapes.push(bo(t.g() ?? []))
                    zo(this, e)
                }),
                this.g.attachEmptyPacketListener("blendshapes", t => {
                    zo(this, t)
                })),
            this.outputFacialTransformationMatrixes &&
            (Ss(t, "face_geometry"),
                _s(n, "FACE_GEOMETRY:face_geometry"),
                this.g.attachProtoVectorListener("face_geometry", (t, e) => {
                    if (this.outputFacialTransformationMatrixes)
                        for (const e of t)
                            (t = Tn(Mi(e), ni, 2)) &&
                            this.j.facialTransformationMatrixes.push({
                                rows: Mn(Fn(t, 1)) ?? 0,
                                columns: Mn(Fn(t, 2)) ?? 0,
                                data: cn(t, 3, fe).slice() ?? [],
                            })
                    zo(this, e)
                }),
                this.g.attachEmptyPacketListener("face_geometry", t => {
                    zo(this, t)
                })),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(hh.prototype.detectForVideo = hh.prototype.G),
    (hh.prototype.detect = hh.prototype.F),
    (hh.prototype.setOptions = hh.prototype.o),
    (hh.createFromModelPath = function(t, e) {
        return Ha(hh, t, { baseOptions: { modelAssetPath: e } })
    }),
    (hh.createFromModelBuffer = function(t, e) {
        return Ha(hh, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (hh.createFromOptions = function(t, e) {
        return Ha(hh, t, e)
    }),
    (hh.FACE_LANDMARKS_LIPS = Ja),
    (hh.FACE_LANDMARKS_LEFT_EYE = Za),
    (hh.FACE_LANDMARKS_LEFT_EYEBROW = Qa),
    (hh.FACE_LANDMARKS_LEFT_IRIS = th),
    (hh.FACE_LANDMARKS_RIGHT_EYE = eh),
    (hh.FACE_LANDMARKS_RIGHT_EYEBROW = nh),
    (hh.FACE_LANDMARKS_RIGHT_IRIS = rh),
    (hh.FACE_LANDMARKS_FACE_OVAL = sh),
    (hh.FACE_LANDMARKS_CONTOURS = ih),
    (hh.FACE_LANDMARKS_TESSELATION = oh)
var ch = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "image_in", "norm_rect", !0), kn((t = this.j = new Ui()), 0, 1, (e = new bi()))
        }

        get baseOptions() {
            return Tn(this.j, bi, 1)
        }

        set baseOptions(t) {
            kn(this.j, 0, 1, t)
        }

        o(t) {
            return super.l(t)
        }

        Pa(t, e, n) {
            const r = "function" != typeof e ? e : {}
            if (((this.h = "function" == typeof e ? e : n), za(this, t, r ?? {}), !this.h)) return this.s
        }

        m() {
            var t = new Ls()
            xs(t, "image_in"), xs(t, "norm_rect"), Ss(t, "stylized_image")
            const e = new hs()
            Dn(e, Bi, this.j)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.face_stylizer.FaceStylizerGraph"),
                ys(n, "IMAGE:image_in"),
                ys(n, "NORM_RECT:norm_rect"),
                _s(n, "STYLIZED_IMAGE:stylized_image"),
                n.o(e),
                ks(t, n),
                this.g.W("stylized_image", (t, e) => {
                    var n = !this.h,
                        r = t.data,
                        s = t.width
                    const i = s * (t = t.height)
                    if (r instanceof Uint8Array)
                        if (r.length === 3 * i) {
                            const e = new Uint8ClampedArray(4 * i)
                            for (let t = 0; t < i; ++t)
                                (e[4 * t] = r[3 * t]),
                                    (e[4 * t + 1] = r[3 * t + 1]),
                                    (e[4 * t + 2] = r[3 * t + 2]),
                                    (e[4 * t + 3] = 255)
                            r = new ImageData(e, s, t)
                        } else {
                            if (r.length !== 4 * i) throw Error("Unsupported channel count: " + r.length / i)
                            r = new ImageData(new Uint8ClampedArray(r.buffer, r.byteOffset, r.length), s, t)
                        }
                    else if (!(r instanceof WebGLTexture)) throw Error(`Unsupported format: ${r.constructor.name}`)
                        ;
                    (s = new Ua([r], !1, !1, this.g.i.canvas, this.O, s, t)),
                        (this.s = n = n ? s.clone() : s),
                    this.h && this.h(n),
                        zo(this, e)
                }),
                this.g.attachEmptyPacketListener("stylized_image", t => {
                    ;(this.s = null), this.h && this.h(null), zo(this, t)
                }),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(ch.prototype.stylize = ch.prototype.Pa),
    (ch.prototype.setOptions = ch.prototype.o),
    (ch.createFromModelPath = function(t, e) {
        return Ha(ch, t, { baseOptions: { modelAssetPath: e } })
    }),
    (ch.createFromModelBuffer = function(t, e) {
        return Ha(ch, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (ch.createFromOptions = function(t, e) {
        return Ha(ch, t, e)
    })
var uh = Ga(
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [5, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [9, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    [13, 17],
    [0, 17],
    [17, 18],
    [18, 19],
    [19, 20],
)

function lh(t) {
    ;(t.gestures = []), (t.landmarks = []), (t.worldLandmarks = []), (t.handedness = [])
}

function dh(t) {
    return 0 === t.gestures.length
        ? { gestures: [], landmarks: [], worldLandmarks: [], handedness: [], handednesses: [] }
        : {
            gestures: t.gestures,
            landmarks: t.landmarks,
            worldLandmarks: t.worldLandmarks,
            handedness: t.handedness,
            handednesses: t.handedness,
        }
}

function fh(t, e = !0) {
    const n = []
    for (const s of t) {
        var r = Ds(s)
        t = []
        for (const n of r.g())
            (r = e && null != Fn(n, 1) ? Mn(Fn(n, 1)) : -1),
                t.push({
                    score: Pn(n, 2) ?? 0,
                    index: r,
                    categoryName: Rn(n, 3) ?? "" ?? "",
                    displayName: Rn(n, 4) ?? "" ?? "",
                })
        n.push(t)
    }
    return n
}

var ph = class extends $a {
    constructor(t, e) {
        super(new Xa(t, e), "image_in", "norm_rect", !1),
            (this.gestures = []),
            (this.landmarks = []),
            (this.worldLandmarks = []),
            (this.handedness = []),
            kn((t = this.j = new Ji()), 0, 1, (e = new bi())),
            (this.s = new $i()),
            kn(this.j, 0, 2, this.s),
            (this.D = new Ki()),
            kn(this.s, 0, 3, this.D),
            (this.v = new Wi()),
            kn(this.s, 0, 2, this.v),
            (this.h = new Xi()),
            kn(this.j, 0, 3, this.h),
            In(this.v, 2, 0.5),
            In(this.s, 4, 0.5),
            In(this.D, 2, 0.5)
    }

    get baseOptions() {
        return Tn(this.j, bi, 1)
    }

    set baseOptions(t) {
        kn(this.j, 0, 1, t)
    }

    o(t) {
        if (
            (Cn(this.v, 3, t.numHands ?? 1),
            "minHandDetectionConfidence" in t && In(this.v, 2, t.minHandDetectionConfidence ?? 0.5),
            "minTrackingConfidence" in t && In(this.s, 4, t.minTrackingConfidence ?? 0.5),
            "minHandPresenceConfidence" in t && In(this.D, 2, t.minHandPresenceConfidence ?? 0.5),
                t.cannedGesturesClassifierOptions)
        ) {
            var e = new Gi(),
                n = e,
                r = Ao(t.cannedGesturesClassifierOptions, Tn(this.h, Gi, 3)?.h())
            kn(n, 0, 2, r), kn(this.h, 0, 3, e)
        } else void 0 === t.cannedGesturesClassifierOptions && Tn(this.h, Gi, 3)?.g()
        return (
            t.customGesturesClassifierOptions
                ? (kn((n = e = new Gi()), 0, 2, (r = Ao(t.customGesturesClassifierOptions, Tn(this.h, Gi, 4)?.h()))),
                    kn(this.h, 0, 4, e))
                : void 0 === t.customGesturesClassifierOptions && Tn(this.h, Gi, 4)?.g(),
                this.l(t)
        )
    }

    Ka(t, e) {
        return lh(this), za(this, t, e), dh(this)
    }

    La(t, e, n) {
        return lh(this), Ka(this, t, n, e), dh(this)
    }

    m() {
        var t = new Ls()
        xs(t, "image_in"),
            xs(t, "norm_rect"),
            Ss(t, "hand_gestures"),
            Ss(t, "hand_landmarks"),
            Ss(t, "world_hand_landmarks"),
            Ss(t, "handedness")
        const e = new hs()
        Dn(e, to, this.j)
        const n = new vs()
        ms(n, "mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),
            ys(n, "IMAGE:image_in"),
            ys(n, "NORM_RECT:norm_rect"),
            _s(n, "HAND_GESTURES:hand_gestures"),
            _s(n, "LANDMARKS:hand_landmarks"),
            _s(n, "WORLD_LANDMARKS:world_hand_landmarks"),
            _s(n, "HANDEDNESS:handedness"),
            n.o(e),
            ks(t, n),
            this.g.attachProtoVectorListener("hand_landmarks", (t, e) => {
                for (const e of t) {
                    t = ei(e)
                    const n = []
                    for (const e of bn(t, Zs, 1))
                        n.push({ x: Pn(e, 1) ?? 0, y: Pn(e, 2) ?? 0, z: Pn(e, 3) ?? 0, visibility: Pn(e, 4) ?? 0 })
                    this.landmarks.push(n)
                }
                zo(this, e)
            }),
            this.g.attachEmptyPacketListener("hand_landmarks", t => {
                zo(this, t)
            }),
            this.g.attachProtoVectorListener("world_hand_landmarks", (t, e) => {
                for (const e of t) {
                    t = Js(e)
                    const n = []
                    for (const e of bn(t, Ys, 1))
                        n.push({ x: Pn(e, 1) ?? 0, y: Pn(e, 2) ?? 0, z: Pn(e, 3) ?? 0, visibility: Pn(e, 4) ?? 0 })
                    this.worldLandmarks.push(n)
                }
                zo(this, e)
            }),
            this.g.attachEmptyPacketListener("world_hand_landmarks", t => {
                zo(this, t)
            }),
            this.g.attachProtoVectorListener("hand_gestures", (t, e) => {
                this.gestures.push(...fh(t, !1)), zo(this, e)
            }),
            this.g.attachEmptyPacketListener("hand_gestures", t => {
                zo(this, t)
            }),
            this.g.attachProtoVectorListener("handedness", (t, e) => {
                this.handedness.push(...fh(t)), zo(this, e)
            }),
            this.g.attachEmptyPacketListener("handedness", t => {
                zo(this, t)
            }),
            (t = t.g()),
            this.setGraph(new Uint8Array(t), !0)
    }
}

function gh(t) {
    return {
        landmarks: t.landmarks,
        worldLandmarks: t.worldLandmarks,
        handednesses: t.handedness,
        handedness: t.handedness,
    }
}
;(ph.prototype.recognizeForVideo = ph.prototype.La),
    (ph.prototype.recognize = ph.prototype.Ka),
    (ph.prototype.setOptions = ph.prototype.o),
    (ph.createFromModelPath = function(t, e) {
        return Ha(ph, t, { baseOptions: { modelAssetPath: e } })
    }),
    (ph.createFromModelBuffer = function(t, e) {
        return Ha(ph, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (ph.createFromOptions = function(t, e) {
        return Ha(ph, t, e)
    }),
    (ph.HAND_CONNECTIONS = uh)
var mh = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "image_in", "norm_rect", !1),
                (this.landmarks = []),
                (this.worldLandmarks = []),
                (this.handedness = []),
                kn((t = this.h = new $i()), 0, 1, (e = new bi())),
                (this.s = new Ki()),
                kn(this.h, 0, 3, this.s),
                (this.j = new Wi()),
                kn(this.h, 0, 2, this.j),
                Cn(this.j, 3, 1),
                In(this.j, 2, 0.5),
                In(this.s, 2, 0.5),
                In(this.h, 4, 0.5)
        }

        get baseOptions() {
            return Tn(this.h, bi, 1)
        }

        set baseOptions(t) {
            kn(this.h, 0, 1, t)
        }

        o(t) {
            return (
                "numHands" in t && Cn(this.j, 3, t.numHands ?? 1),
                "minHandDetectionConfidence" in t && In(this.j, 2, t.minHandDetectionConfidence ?? 0.5),
                "minTrackingConfidence" in t && In(this.h, 4, t.minTrackingConfidence ?? 0.5),
                "minHandPresenceConfidence" in t && In(this.s, 2, t.minHandPresenceConfidence ?? 0.5),
                    this.l(t)
            )
        }

        F(t, e) {
            return (this.landmarks = []), (this.worldLandmarks = []), (this.handedness = []), za(this, t, e), gh(this)
        }

        G(t, e, n) {
            return (this.landmarks = []), (this.worldLandmarks = []), (this.handedness = []), Ka(this, t, n, e), gh(this)
        }

        m() {
            var t = new Ls()
            xs(t, "image_in"),
                xs(t, "norm_rect"),
                Ss(t, "hand_landmarks"),
                Ss(t, "world_hand_landmarks"),
                Ss(t, "handedness")
            const e = new hs()
            Dn(e, Qi, this.h)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),
                ys(n, "IMAGE:image_in"),
                ys(n, "NORM_RECT:norm_rect"),
                _s(n, "LANDMARKS:hand_landmarks"),
                _s(n, "WORLD_LANDMARKS:world_hand_landmarks"),
                _s(n, "HANDEDNESS:handedness"),
                n.o(e),
                ks(t, n),
                this.g.attachProtoVectorListener("hand_landmarks", (t, e) => {
                    for (const e of t) (t = ei(e)), this.landmarks.push(xo(t))
                    zo(this, e)
                }),
                this.g.attachEmptyPacketListener("hand_landmarks", t => {
                    zo(this, t)
                }),
                this.g.attachProtoVectorListener("world_hand_landmarks", (t, e) => {
                    for (const e of t) (t = Js(e)), this.worldLandmarks.push(So(t))
                    zo(this, e)
                }),
                this.g.attachEmptyPacketListener("world_hand_landmarks", t => {
                    zo(this, t)
                }),
                this.g.attachProtoVectorListener("handedness", (t, e) => {
                    var n = this.handedness,
                        r = n.push
                    const s = []
                    for (const e of t) {
                        t = Ds(e)
                        const n = []
                        for (const e of t.g())
                            n.push({
                                score: Pn(e, 2) ?? 0,
                                index: Mn(Fn(e, 1)) ?? -1,
                                categoryName: Rn(e, 3) ?? "" ?? "",
                                displayName: Rn(e, 4) ?? "" ?? "",
                            })
                        s.push(n)
                    }
                    r.call(n, ...s), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("handedness", t => {
                    zo(this, t)
                }),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(mh.prototype.detectForVideo = mh.prototype.G),
    (mh.prototype.detect = mh.prototype.F),
    (mh.prototype.setOptions = mh.prototype.o),
    (mh.createFromModelPath = function(t, e) {
        return Ha(mh, t, { baseOptions: { modelAssetPath: e } })
    }),
    (mh.createFromModelBuffer = function(t, e) {
        return Ha(mh, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (mh.createFromOptions = function(t, e) {
        return Ha(mh, t, e)
    }),
    (mh.HAND_CONNECTIONS = uh)
var yh = Ga(
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 7],
    [0, 4],
    [4, 5],
    [5, 6],
    [6, 8],
    [9, 10],
    [11, 12],
    [11, 13],
    [13, 15],
    [15, 17],
    [15, 19],
    [15, 21],
    [17, 19],
    [12, 14],
    [14, 16],
    [16, 18],
    [16, 20],
    [16, 22],
    [18, 20],
    [11, 23],
    [12, 24],
    [23, 24],
    [23, 25],
    [24, 26],
    [25, 27],
    [26, 28],
    [27, 29],
    [28, 30],
    [29, 31],
    [30, 32],
    [27, 31],
    [28, 32],
)

function _h(t) {
    t.h = {
        faceLandmarks: [],
        faceBlendshapes: [],
        poseLandmarks: [],
        poseWorldLandmarks: [],
        poseSegmentationMasks: [],
        leftHandLandmarks: [],
        leftHandWorldLandmarks: [],
        rightHandLandmarks: [],
        rightHandWorldLandmarks: [],
    }
}

function vh(t) {
    try {
        if (!t.D) return t.h
        t.D(t.h)
    } finally {
        $o(t)
    }
}

function Eh(t, e) {
    ;(t = ei(t)), e.push(xo(t))
}

var wh = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "input_frames_image", null, !1),
                (this.h = {
                    faceLandmarks: [],
                    faceBlendshapes: [],
                    poseLandmarks: [],
                    poseWorldLandmarks: [],
                    poseSegmentationMasks: [],
                    leftHandLandmarks: [],
                    leftHandWorldLandmarks: [],
                    rightHandLandmarks: [],
                    rightHandWorldLandmarks: [],
                }),
                (this.outputPoseSegmentationMasks = this.outputFaceBlendshapes = !1),
                kn((t = this.j = new ao()), 0, 1, (e = new bi())),
                (this.I = new Ki()),
                kn(this.j, 0, 2, this.I),
                (this.aa = new eo()),
                kn(this.j, 0, 3, this.aa),
                (this.s = new xi()),
                kn(this.j, 0, 4, this.s),
                (this.P = new Oi()),
                kn(this.j, 0, 5, this.P),
                (this.v = new ro()),
                kn(this.j, 0, 6, this.v),
                (this.J = new io()),
                kn(this.j, 0, 7, this.J),
                In(this.s, 2, 0.5),
                In(this.s, 3, 0.3),
                In(this.P, 2, 0.5),
                In(this.v, 2, 0.5),
                In(this.v, 3, 0.3),
                In(this.J, 2, 0.5),
                In(this.I, 2, 0.5)
        }

        get baseOptions() {
            return Tn(this.j, bi, 1)
        }

        set baseOptions(t) {
            kn(this.j, 0, 1, t)
        }

        o(t) {
            return (
                "minFaceDetectionConfidence" in t && In(this.s, 2, t.minFaceDetectionConfidence ?? 0.5),
                "minFaceSuppressionThreshold" in t && In(this.s, 3, t.minFaceSuppressionThreshold ?? 0.3),
                "minFacePresenceConfidence" in t && In(this.P, 2, t.minFacePresenceConfidence ?? 0.5),
                "outputFaceBlendshapes" in t && (this.outputFaceBlendshapes = !!t.outputFaceBlendshapes),
                "minPoseDetectionConfidence" in t && In(this.v, 2, t.minPoseDetectionConfidence ?? 0.5),
                "minPoseSuppressionThreshold" in t && In(this.v, 3, t.minPoseSuppressionThreshold ?? 0.3),
                "minPosePresenceConfidence" in t && In(this.J, 2, t.minPosePresenceConfidence ?? 0.5),
                "outputPoseSegmentationMasks" in t && (this.outputPoseSegmentationMasks = !!t.outputPoseSegmentationMasks),
                "minHandLandmarksConfidence" in t && In(this.I, 2, t.minHandLandmarksConfidence ?? 0.5),
                    this.l(t)
            )
        }

        F(t, e, n) {
            const r = "function" != typeof e ? e : {}
            return (this.D = "function" == typeof e ? e : n), _h(this), za(this, t, r), vh(this)
        }

        G(t, e, n, r) {
            const s = "function" != typeof n ? n : {}
            return (this.D = "function" == typeof n ? n : r), _h(this), Ka(this, t, s, e), vh(this)
        }

        m() {
            var t = new Ls()
            xs(t, "input_frames_image"),
                Ss(t, "pose_landmarks"),
                Ss(t, "pose_world_landmarks"),
                Ss(t, "face_landmarks"),
                Ss(t, "left_hand_landmarks"),
                Ss(t, "left_hand_world_landmarks"),
                Ss(t, "right_hand_landmarks"),
                Ss(t, "right_hand_world_landmarks")
            const e = new hs(),
                n = new Jr()
            gn(
                n,
                1,
                ke("type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),
                "",
            ),
                (function(t, e) {
                    if (null != e)
                        if (Array.isArray(e)) rn(t, 2, Ye(e, qe, void 0, void 0, !1))
                        else {
                            if (!("string" == typeof e || e instanceof U || R(e)))
                                throw Error(
                                    "invalid value in Any.value field: " +
                                    e +
                                    " expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array",
                                )
                            gn(t, 2, se(e, !1, !1), D())
                        }
                })(n, this.j.g())
            const r = new vs()
            ms(r, "mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),
                Ln(r, 8, Jr, n),
                ys(r, "IMAGE:input_frames_image"),
                _s(r, "POSE_LANDMARKS:pose_landmarks"),
                _s(r, "POSE_WORLD_LANDMARKS:pose_world_landmarks"),
                _s(r, "FACE_LANDMARKS:face_landmarks"),
                _s(r, "LEFT_HAND_LANDMARKS:left_hand_landmarks"),
                _s(r, "LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),
                _s(r, "RIGHT_HAND_LANDMARKS:right_hand_landmarks"),
                _s(r, "RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),
                r.o(e),
                ks(t, r),
                Ko(this, t),
                this.g.attachProtoListener("pose_landmarks", (t, e) => {
                    Eh(t, this.h.poseLandmarks), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("pose_landmarks", t => {
                    zo(this, t)
                }),
                this.g.attachProtoListener("pose_world_landmarks", (t, e) => {
                    var n = this.h.poseWorldLandmarks
                    ;(t = Js(t)), n.push(So(t)), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("pose_world_landmarks", t => {
                    zo(this, t)
                }),
            this.outputPoseSegmentationMasks &&
            (_s(r, "POSE_SEGMENTATION_MASK:pose_segmentation_mask"),
                Yo(this, "pose_segmentation_mask"),
                this.g.W("pose_segmentation_mask", (t, e) => {
                    ;(this.h.poseSegmentationMasks = [Ya(this, t, !0, !this.D)]), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("pose_segmentation_mask", t => {
                    ;(this.h.poseSegmentationMasks = []), zo(this, t)
                })),
                this.g.attachProtoListener("face_landmarks", (t, e) => {
                    Eh(t, this.h.faceLandmarks), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("face_landmarks", t => {
                    zo(this, t)
                }),
            this.outputFaceBlendshapes &&
            (Ss(t, "extra_blendshapes"),
                _s(r, "FACE_BLENDSHAPES:extra_blendshapes"),
                this.g.attachProtoListener("extra_blendshapes", (t, e) => {
                    var n = this.h.faceBlendshapes
                    this.outputFaceBlendshapes && ((t = Ds(t)), n.push(bo(t.g() ?? []))), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("extra_blendshapes", t => {
                    zo(this, t)
                })),
                this.g.attachProtoListener("left_hand_landmarks", (t, e) => {
                    Eh(t, this.h.leftHandLandmarks), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("left_hand_landmarks", t => {
                    zo(this, t)
                }),
                this.g.attachProtoListener("left_hand_world_landmarks", (t, e) => {
                    var n = this.h.leftHandWorldLandmarks
                    ;(t = Js(t)), n.push(So(t)), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("left_hand_world_landmarks", t => {
                    zo(this, t)
                }),
                this.g.attachProtoListener("right_hand_landmarks", (t, e) => {
                    Eh(t, this.h.rightHandLandmarks), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("right_hand_landmarks", t => {
                    zo(this, t)
                }),
                this.g.attachProtoListener("right_hand_world_landmarks", (t, e) => {
                    var n = this.h.rightHandWorldLandmarks
                    ;(t = Js(t)), n.push(So(t)), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("right_hand_world_landmarks", t => {
                    zo(this, t)
                }),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(wh.prototype.detectForVideo = wh.prototype.G),
    (wh.prototype.detect = wh.prototype.F),
    (wh.prototype.setOptions = wh.prototype.o),
    (wh.createFromModelPath = function(t, e) {
        return Ha(wh, t, { baseOptions: { modelAssetPath: e } })
    }),
    (wh.createFromModelBuffer = function(t, e) {
        return Ha(wh, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (wh.createFromOptions = function(t, e) {
        return Ha(wh, t, e)
    }),
    (wh.HAND_CONNECTIONS = uh),
    (wh.POSE_CONNECTIONS = yh),
    (wh.FACE_LANDMARKS_LIPS = Ja),
    (wh.FACE_LANDMARKS_LEFT_EYE = Za),
    (wh.FACE_LANDMARKS_LEFT_EYEBROW = Qa),
    (wh.FACE_LANDMARKS_LEFT_IRIS = th),
    (wh.FACE_LANDMARKS_RIGHT_EYE = eh),
    (wh.FACE_LANDMARKS_RIGHT_EYEBROW = nh),
    (wh.FACE_LANDMARKS_RIGHT_IRIS = rh),
    (wh.FACE_LANDMARKS_FACE_OVAL = sh),
    (wh.FACE_LANDMARKS_CONTOURS = ih),
    (wh.FACE_LANDMARKS_TESSELATION = oh)
var Th = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "input_image", "norm_rect", !0),
                (this.j = { classifications: [] }),
                kn((t = this.h = new ho()), 0, 1, (e = new bi()))
        }

        get baseOptions() {
            return Tn(this.h, bi, 1)
        }

        set baseOptions(t) {
            kn(this.h, 0, 1, t)
        }

        o(t) {
            return kn(this.h, 0, 2, Ao(t, Tn(this.h, mi, 2))), this.l(t)
        }

        ua(t, e) {
            return (this.j = { classifications: [] }), za(this, t, e), this.j
        }

        va(t, e, n) {
            return (this.j = { classifications: [] }), Ka(this, t, n, e), this.j
        }

        m() {
            var t = new Ls()
            xs(t, "input_image"), xs(t, "norm_rect"), Ss(t, "classifications")
            const e = new hs()
            Dn(e, co, this.h)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),
                ys(n, "IMAGE:input_image"),
                ys(n, "NORM_RECT:norm_rect"),
                _s(n, "CLASSIFICATIONS:classifications"),
                n.o(e),
                ks(t, n),
                this.g.attachProtoListener("classifications", (t, e) => {
                    ;(this.j = (function(t) {
                        const e = {
                            classifications: bn(t, ii, 1).map(t =>
                                bo(Tn(t, Cs, 4)?.g() ?? [], Mn(Fn(t, 2)), Rn(t, 3) ?? ""),
                            ),
                        }
                        return null != Ae(en(t, 2)) && (e.timestampMs = Mn(Ae(en(t, 2)))), e
                    })(hi(t))),
                        zo(this, e)
                }),
                this.g.attachEmptyPacketListener("classifications", t => {
                    zo(this, t)
                }),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(Th.prototype.classifyForVideo = Th.prototype.va),
    (Th.prototype.classify = Th.prototype.ua),
    (Th.prototype.setOptions = Th.prototype.o),
    (Th.createFromModelPath = function(t, e) {
        return Ha(Th, t, { baseOptions: { modelAssetPath: e } })
    }),
    (Th.createFromModelBuffer = function(t, e) {
        return Ha(Th, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (Th.createFromOptions = function(t, e) {
        return Ha(Th, t, e)
    })
var Ah = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "image_in", "norm_rect", !0),
                (this.h = new uo()),
                (this.embeddings = { embeddings: [] }),
                kn((t = this.h), 0, 1, (e = new bi()))
        }

        get baseOptions() {
            return Tn(this.h, bi, 1)
        }

        set baseOptions(t) {
            kn(this.h, 0, 1, t)
        }

        o(t) {
            var e = this.h,
                n = Tn(this.h, _i, 2)
            return (
                (n = n ? n.clone() : new _i()),
                    void 0 !== t.l2Normalize ? On(n, 1, t.l2Normalize) : "l2Normalize" in t && rn(n, 1),
                    void 0 !== t.quantize ? On(n, 2, t.quantize) : "quantize" in t && rn(n, 2),
                    kn(e, 0, 2, n),
                    this.l(t)
            )
        }

        Ba(t, e) {
            return za(this, t, e), this.embeddings
        }

        Ca(t, e, n) {
            return Ka(this, t, n, e), this.embeddings
        }

        m() {
            var t = new Ls()
            xs(t, "image_in"), xs(t, "norm_rect"), Ss(t, "embeddings_out")
            const e = new hs()
            Dn(e, lo, this.h)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),
                ys(n, "IMAGE:image_in"),
                ys(n, "NORM_RECT:norm_rect"),
                _s(n, "EMBEDDINGS:embeddings_out"),
                n.o(e),
                ks(t, n),
                this.g.attachProtoListener("embeddings_out", (t, e) => {
                    ;(t = gi(t)),
                        (this.embeddings = (function(t) {
                            return {
                                embeddings: bn(t, li, 1).map(t => {
                                    const e = { headIndex: Mn(Fn(t, 3)) ?? -1, headName: Rn(t, 4) ?? "" ?? "" }
                                    if (void 0 !== wn(t, ci, _n(t, 1)))
                                        (t = cn((t = Tn(t, ci, _n(t, 1))), 1, fe)), (e.floatEmbedding = t.slice())
                                    else {
                                        const n = new Uint8Array(0)
                                        e.quantizedEmbedding = Tn(t, ui, _n(t, 2))?.qa()?.h() ?? n
                                    }
                                    return e
                                }),
                                timestampMs: Mn(Ae(en(t, 2))),
                            }
                        })(t)),
                        zo(this, e)
                }),
                this.g.attachEmptyPacketListener("embeddings_out", t => {
                    zo(this, t)
                }),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(Ah.cosineSimilarity = function(t, e) {
    if (t.floatEmbedding && e.floatEmbedding) t = Fo(t.floatEmbedding, e.floatEmbedding)
    else {
        if (!t.quantizedEmbedding || !e.quantizedEmbedding)
            throw Error("Cannot compute cosine similarity between quantized and float embeddings.")
        t = Fo(Lo(t.quantizedEmbedding), Lo(e.quantizedEmbedding))
    }
    return t
}),
    (Ah.prototype.embedForVideo = Ah.prototype.Ca),
    (Ah.prototype.embed = Ah.prototype.Ba),
    (Ah.prototype.setOptions = Ah.prototype.o),
    (Ah.createFromModelPath = function(t, e) {
        return Ha(Ah, t, { baseOptions: { modelAssetPath: e } })
    }),
    (Ah.createFromModelBuffer = function(t, e) {
        return Ha(Ah, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (Ah.createFromOptions = function(t, e) {
        return Ha(Ah, t, e)
    })
var bh = class {
    constructor(t, e, n) {
        ;(this.confidenceMasks = t), (this.categoryMask = e), (this.qualityScores = n)
    }

    close() {
        this.confidenceMasks?.forEach(t => {
            t.close()
        }),
            this.categoryMask?.close()
    }
}

function kh(t) {
    ;(t.categoryMask = void 0), (t.confidenceMasks = void 0), (t.qualityScores = void 0)
}

function xh(t) {
    try {
        const e = new bh(t.confidenceMasks, t.categoryMask, t.qualityScores)
        if (!t.j) return e
        t.j(e)
    } finally {
        $o(t)
    }
}

bh.prototype.close = bh.prototype.close
var Sh = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "image_in", "norm_rect", !1),
                (this.s = []),
                (this.outputCategoryMask = !1),
                (this.outputConfidenceMasks = !0),
                (this.h = new yo()),
                (this.v = new fo()),
                kn(this.h, 0, 3, this.v),
                kn((t = this.h), 0, 1, (e = new bi()))
        }

        get baseOptions() {
            return Tn(this.h, bi, 1)
        }

        set baseOptions(t) {
            kn(this.h, 0, 1, t)
        }

        o(t) {
            return (
                void 0 !== t.displayNamesLocale
                    ? rn(this.h, 2, ke(t.displayNamesLocale))
                    : "displayNamesLocale" in t && rn(this.h, 2),
                "outputCategoryMask" in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1),
                "outputConfidenceMasks" in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0),
                    super.l(t)
            )
        }

        K() {
            !(function(t) {
                const e = bn(t.fa(), vs, 1).filter(t =>
                    (Rn(t, 1) ?? "").includes("mediapipe.tasks.TensorsToSegmentationCalculator"),
                )
                if (((t.s = []), 1 < e.length))
                    throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.")
                1 === e.length &&
                (Tn(e[0], hs, 7)?.l()?.g() ?? new Map()).forEach((e, n) => {
                    t.s[Number(n)] = Rn(e, 1) ?? ""
                })
            })(this)
        }

        ga(t, e, n) {
            const r = "function" != typeof e ? e : {}
            return (this.j = "function" == typeof e ? e : n), kh(this), za(this, t, r), xh(this)
        }

        Na(t, e, n, r) {
            const s = "function" != typeof n ? n : {}
            return (this.j = "function" == typeof n ? n : r), kh(this), Ka(this, t, s, e), xh(this)
        }

        Fa() {
            return this.s
        }

        m() {
            var t = new Ls()
            xs(t, "image_in"), xs(t, "norm_rect")
            const e = new hs()
            Dn(e, _o, this.h)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),
                ys(n, "IMAGE:image_in"),
                ys(n, "NORM_RECT:norm_rect"),
                n.o(e),
                ks(t, n),
                Ko(this, t),
            this.outputConfidenceMasks &&
            (Ss(t, "confidence_masks"),
                _s(n, "CONFIDENCE_MASKS:confidence_masks"),
                Yo(this, "confidence_masks"),
                this.g.da("confidence_masks", (t, e) => {
                    ;(this.confidenceMasks = t.map(t => Ya(this, t, !0, !this.j))), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("confidence_masks", t => {
                    ;(this.confidenceMasks = []), zo(this, t)
                })),
            this.outputCategoryMask &&
            (Ss(t, "category_mask"),
                _s(n, "CATEGORY_MASK:category_mask"),
                Yo(this, "category_mask"),
                this.g.W("category_mask", (t, e) => {
                    ;(this.categoryMask = Ya(this, t, !1, !this.j)), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("category_mask", t => {
                    ;(this.categoryMask = void 0), zo(this, t)
                })),
                Ss(t, "quality_scores"),
                _s(n, "QUALITY_SCORES:quality_scores"),
                this.g.attachFloatVectorListener("quality_scores", (t, e) => {
                    ;(this.qualityScores = t), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("quality_scores", t => {
                    ;(this.categoryMask = void 0), zo(this, t)
                }),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(Sh.prototype.getLabels = Sh.prototype.Fa),
    (Sh.prototype.segmentForVideo = Sh.prototype.Na),
    (Sh.prototype.segment = Sh.prototype.ga),
    (Sh.prototype.setOptions = Sh.prototype.o),
    (Sh.createFromModelPath = function(t, e) {
        return Ha(Sh, t, { baseOptions: { modelAssetPath: e } })
    }),
    (Sh.createFromModelBuffer = function(t, e) {
        return Ha(Sh, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (Sh.createFromOptions = function(t, e) {
        return Ha(Sh, t, e)
    })
var Lh = class {
    constructor(t, e, n) {
        ;(this.confidenceMasks = t), (this.categoryMask = e), (this.qualityScores = n)
    }

    close() {
        this.confidenceMasks?.forEach(t => {
            t.close()
        }),
            this.categoryMask?.close()
    }
}
Lh.prototype.close = Lh.prototype.close
var Fh = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Rh = [0, Pr, -2],
    Mh = [0, kr, -3, Ir],
    Ph = [0, kr, -3, Ir, kr, -1],
    Oh = [0, Ph],
    Ch = [0, Oh, Rh],
    Ih = [0, Ph, Rh],
    Dh = [0, Ph, Pr, -1],
    Nh = [0, Dh, Rh],
    Uh = [0, kr, -3, Ir, Rh, -1],
    Bh = [0, kr, -3, Ir, Wr],
    Gh = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    jh = [0, kr, -1, Ir],
    Vh = class extends Nn {
        constructor() {
            super()
        }
    }
Vh.A = [1]
var Xh = class extends Nn {
        constructor(t) {
            super(t)
        }
    },
    Hh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 15],
    Wh = [
        0,
        Hh,
        Vr,
        Ph,
        Vr,
        Ih,
        Vr,
        Oh,
        Vr,
        Ch,
        Vr,
        jh,
        Vr,
        Bh,
        Vr,
        Mh,
        Vr,
        [0, Br, kr, -2, Ir, Pr, Ir, -1, 2, kr, Rh],
        Vr,
        Dh,
        Vr,
        Nh,
        kr,
        Rh,
        Br,
        Vr,
        Uh,
        Vr,
        [0, br, jh],
    ],
    zh = [0, Br, Pr, -1, Ir],
    Kh = class extends Nn {
        constructor() {
            super()
        }
    }
;(Kh.A = [1]), (Kh.prototype.g = qr([0, br, Wh, Br, zh]))
var Yh = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "image_in", "norm_rect_in", !1),
                (this.outputCategoryMask = !1),
                (this.outputConfidenceMasks = !0),
                (this.h = new yo()),
                (this.s = new fo()),
                kn(this.h, 0, 3, this.s),
                kn((t = this.h), 0, 1, (e = new bi()))
        }

        get baseOptions() {
            return Tn(this.h, bi, 1)
        }

        set baseOptions(t) {
            kn(this.h, 0, 1, t)
        }

        o(t) {
            return (
                "outputCategoryMask" in t && (this.outputCategoryMask = t.outputCategoryMask ?? !1),
                "outputConfidenceMasks" in t && (this.outputConfidenceMasks = t.outputConfidenceMasks ?? !0),
                    super.l(t)
            )
        }

        ga(t, e, n, r) {
            const s = "function" != typeof n ? n : {}
            ;(this.j = "function" == typeof n ? n : r),
                (this.qualityScores = this.categoryMask = this.confidenceMasks = void 0),
                (n = this.C + 1),
                (r = new Kh())
            const i = new Xh()
            var o = new Fh()
            if ((Cn(o, 1, 255), kn(i, 0, 12, o), e.keypoint && e.scribble))
                throw Error("Cannot provide both keypoint and scribble.")
            if (e.keypoint) {
                var a = new Gh()
                On(a, 3, !0), In(a, 1, e.keypoint.x), In(a, 2, e.keypoint.y), xn(i, 5, Hh, a)
            } else {
                if (!e.scribble) throw Error("Must provide either a keypoint or a scribble.")
                for (a of ((o = new Vh()), e.scribble))
                    On((e = new Gh()), 3, !0), In(e, 1, a.x), In(e, 2, a.y), Ln(o, 1, Gh, e)
                xn(i, 15, Hh, o)
            }
            Ln(r, 1, Xh, i), this.g.addProtoToStream(r.g(), "drishti.RenderData", "roi_in", n), za(this, t, s)
            t: {
                try {
                    const t = new Lh(this.confidenceMasks, this.categoryMask, this.qualityScores)
                    if (!this.j) {
                        var h = t
                        break t
                    }
                    this.j(t)
                } finally {
                    $o(this)
                }
                h = void 0
            }
            return h
        }

        m() {
            var t = new Ls()
            xs(t, "image_in"), xs(t, "roi_in"), xs(t, "norm_rect_in")
            const e = new hs()
            Dn(e, _o, this.h)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraph"),
                ys(n, "IMAGE:image_in"),
                ys(n, "ROI:roi_in"),
                ys(n, "NORM_RECT:norm_rect_in"),
                n.o(e),
                ks(t, n),
                Ko(this, t),
            this.outputConfidenceMasks &&
            (Ss(t, "confidence_masks"),
                _s(n, "CONFIDENCE_MASKS:confidence_masks"),
                Yo(this, "confidence_masks"),
                this.g.da("confidence_masks", (t, e) => {
                    ;(this.confidenceMasks = t.map(t => Ya(this, t, !0, !this.j))), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("confidence_masks", t => {
                    ;(this.confidenceMasks = []), zo(this, t)
                })),
            this.outputCategoryMask &&
            (Ss(t, "category_mask"),
                _s(n, "CATEGORY_MASK:category_mask"),
                Yo(this, "category_mask"),
                this.g.W("category_mask", (t, e) => {
                    ;(this.categoryMask = Ya(this, t, !1, !this.j)), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("category_mask", t => {
                    ;(this.categoryMask = void 0), zo(this, t)
                })),
                Ss(t, "quality_scores"),
                _s(n, "QUALITY_SCORES:quality_scores"),
                this.g.attachFloatVectorListener("quality_scores", (t, e) => {
                    ;(this.qualityScores = t), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("quality_scores", t => {
                    ;(this.categoryMask = void 0), zo(this, t)
                }),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(Yh.prototype.segment = Yh.prototype.ga),
    (Yh.prototype.setOptions = Yh.prototype.o),
    (Yh.createFromModelPath = function(t, e) {
        return Ha(Yh, t, { baseOptions: { modelAssetPath: e } })
    }),
    (Yh.createFromModelBuffer = function(t, e) {
        return Ha(Yh, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (Yh.createFromOptions = function(t, e) {
        return Ha(Yh, t, e)
    })
var $h = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "input_frame_gpu", "norm_rect", !1),
                (this.j = { detections: [] }),
                kn((t = this.h = new vo()), 0, 1, (e = new bi()))
        }

        get baseOptions() {
            return Tn(this.h, bi, 1)
        }

        set baseOptions(t) {
            kn(this.h, 0, 1, t)
        }

        o(t) {
            return (
                void 0 !== t.displayNamesLocale
                    ? rn(this.h, 2, ke(t.displayNamesLocale))
                    : "displayNamesLocale" in t && rn(this.h, 2),
                    void 0 !== t.maxResults ? Cn(this.h, 3, t.maxResults) : "maxResults" in t && rn(this.h, 3),
                    void 0 !== t.scoreThreshold ? In(this.h, 4, t.scoreThreshold) : "scoreThreshold" in t && rn(this.h, 4),
                    void 0 !== t.categoryAllowlist
                        ? pn(this.h, 5, t.categoryAllowlist)
                        : "categoryAllowlist" in t && rn(this.h, 5),
                    void 0 !== t.categoryDenylist
                        ? pn(this.h, 6, t.categoryDenylist)
                        : "categoryDenylist" in t && rn(this.h, 6),
                    this.l(t)
            )
        }

        F(t, e) {
            return (this.j = { detections: [] }), za(this, t, e), this.j
        }

        G(t, e, n) {
            return (this.j = { detections: [] }), Ka(this, t, n, e), this.j
        }

        m() {
            var t = new Ls()
            xs(t, "input_frame_gpu"), xs(t, "norm_rect"), Ss(t, "detections")
            const e = new hs()
            Dn(e, Eo, this.h)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.ObjectDetectorGraph"),
                ys(n, "IMAGE:input_frame_gpu"),
                ys(n, "NORM_RECT:norm_rect"),
                _s(n, "DETECTIONS:detections"),
                n.o(e),
                ks(t, n),
                this.g.attachProtoVectorListener("detections", (t, e) => {
                    for (const e of t) (t = Ks(e)), this.j.detections.push(ko(t))
                    zo(this, e)
                }),
                this.g.attachEmptyPacketListener("detections", t => {
                    zo(this, t)
                }),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;($h.prototype.detectForVideo = $h.prototype.G),
    ($h.prototype.detect = $h.prototype.F),
    ($h.prototype.setOptions = $h.prototype.o),
    ($h.createFromModelPath = async function(t, e) {
        return Ha($h, t, { baseOptions: { modelAssetPath: e } })
    }),
    ($h.createFromModelBuffer = function(t, e) {
        return Ha($h, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    ($h.createFromOptions = function(t, e) {
        return Ha($h, t, e)
    })
var qh = class {
    constructor(t, e, n) {
        ;(this.landmarks = t), (this.worldLandmarks = e), (this.segmentationMasks = n)
    }

    close() {
        this.segmentationMasks?.forEach(t => {
            t.close()
        })
    }
}

function Jh(t) {
    ;(t.landmarks = []), (t.worldLandmarks = []), (t.segmentationMasks = void 0)
}

function Zh(t) {
    try {
        const e = new qh(t.landmarks, t.worldLandmarks, t.segmentationMasks)
        if (!t.s) return e
        t.s(e)
    } finally {
        $o(t)
    }
}

qh.prototype.close = qh.prototype.close
var Qh = class extends $a {
        constructor(t, e) {
            super(new Xa(t, e), "image_in", "norm_rect", !1),
                (this.landmarks = []),
                (this.worldLandmarks = []),
                (this.outputSegmentationMasks = !1),
                kn((t = this.h = new wo()), 0, 1, (e = new bi())),
                (this.v = new io()),
                kn(this.h, 0, 3, this.v),
                (this.j = new ro()),
                kn(this.h, 0, 2, this.j),
                Cn(this.j, 4, 1),
                In(this.j, 2, 0.5),
                In(this.v, 2, 0.5),
                In(this.h, 4, 0.5)
        }

        get baseOptions() {
            return Tn(this.h, bi, 1)
        }

        set baseOptions(t) {
            kn(this.h, 0, 1, t)
        }

        o(t) {
            return (
                "numPoses" in t && Cn(this.j, 4, t.numPoses ?? 1),
                "minPoseDetectionConfidence" in t && In(this.j, 2, t.minPoseDetectionConfidence ?? 0.5),
                "minTrackingConfidence" in t && In(this.h, 4, t.minTrackingConfidence ?? 0.5),
                "minPosePresenceConfidence" in t && In(this.v, 2, t.minPosePresenceConfidence ?? 0.5),
                "outputSegmentationMasks" in t && (this.outputSegmentationMasks = t.outputSegmentationMasks ?? !1),
                    this.l(t)
            )
        }

        F(t, e, n) {
            const r = "function" != typeof e ? e : {}
            return (this.s = "function" == typeof e ? e : n), Jh(this), za(this, t, r), Zh(this)
        }

        G(t, e, n, r) {
            const s = "function" != typeof n ? n : {}
            return (this.s = "function" == typeof n ? n : r), Jh(this), Ka(this, t, s, e), Zh(this)
        }

        m() {
            var t = new Ls()
            xs(t, "image_in"),
                xs(t, "norm_rect"),
                Ss(t, "normalized_landmarks"),
                Ss(t, "world_landmarks"),
                Ss(t, "segmentation_masks")
            const e = new hs()
            Dn(e, To, this.h)
            const n = new vs()
            ms(n, "mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),
                ys(n, "IMAGE:image_in"),
                ys(n, "NORM_RECT:norm_rect"),
                _s(n, "NORM_LANDMARKS:normalized_landmarks"),
                _s(n, "WORLD_LANDMARKS:world_landmarks"),
                n.o(e),
                ks(t, n),
                Ko(this, t),
                this.g.attachProtoVectorListener("normalized_landmarks", (t, e) => {
                    this.landmarks = []
                    for (const e of t) (t = ei(e)), this.landmarks.push(xo(t))
                    zo(this, e)
                }),
                this.g.attachEmptyPacketListener("normalized_landmarks", t => {
                    ;(this.landmarks = []), zo(this, t)
                }),
                this.g.attachProtoVectorListener("world_landmarks", (t, e) => {
                    this.worldLandmarks = []
                    for (const e of t) (t = Js(e)), this.worldLandmarks.push(So(t))
                    zo(this, e)
                }),
                this.g.attachEmptyPacketListener("world_landmarks", t => {
                    ;(this.worldLandmarks = []), zo(this, t)
                }),
            this.outputSegmentationMasks &&
            (_s(n, "SEGMENTATION_MASK:segmentation_masks"),
                Yo(this, "segmentation_masks"),
                this.g.da("segmentation_masks", (t, e) => {
                    ;(this.segmentationMasks = t.map(t => Ya(this, t, !0, !this.s))), zo(this, e)
                }),
                this.g.attachEmptyPacketListener("segmentation_masks", t => {
                    ;(this.segmentationMasks = []), zo(this, t)
                })),
                (t = t.g()),
                this.setGraph(new Uint8Array(t), !0)
        }
    }
;(Qh.prototype.detectForVideo = Qh.prototype.G),
    (Qh.prototype.detect = Qh.prototype.F),
    (Qh.prototype.setOptions = Qh.prototype.o),
    (Qh.createFromModelPath = function(t, e) {
        return Ha(Qh, t, { baseOptions: { modelAssetPath: e } })
    }),
    (Qh.createFromModelBuffer = function(t, e) {
        return Ha(Qh, t, { baseOptions: { modelAssetBuffer: e } })
    }),
    (Qh.createFromOptions = function(t, e) {
        return Ha(Qh, t, e)
    }),
    (Qh.POSE_CONNECTIONS = yh)
export {
    Fa as DrawingUtils,
    qa as FaceDetector,
    hh as FaceLandmarker,
    ch as FaceStylizer,
    Co as FilesetResolver,
    ph as GestureRecognizer,
    mh as HandLandmarker,
    wh as HolisticLandmarker,
    Th as ImageClassifier,
    Ah as ImageEmbedder,
    Sh as ImageSegmenter,
    bh as ImageSegmenterResult,
    Yh as InteractiveSegmenter,
    Lh as InteractiveSegmenterResult,
    Ua as MPImage,
    _a as MPMask,
    $h as ObjectDetector,
    Qh as PoseLandmarker,
    qo as TaskRunner,
    $a as VisionTaskRunner,
}
//# sourceMappingURL=vision_bundle_mjs.js.map
