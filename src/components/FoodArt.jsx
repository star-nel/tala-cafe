import { useId } from 'react'
import './FoodArt.css'

const palettes = {
  coffee: ['#9d5730', '#f4cc8c', '#462519'],
  latte: ['#bf8150', '#f7ddb3', '#5d301d'],
  cocoa: ['#78432e', '#e7b77d', '#341c16'],
  coldbrew: ['#563627', '#cf8c4c', '#271a14'],
  chai: ['#ac6b38', '#efd19b', '#55301d'],
  croissant: ['#bb6f2c', '#f6c477', '#784019'],
  pancakes: ['#c17a3c', '#f0ce84', '#80502e'],
  toast: ['#a56636', '#88a25d', '#6c3e24'],
  omelette: ['#e1ae55', '#839057', '#644322'],
  granola: ['#be8044', '#d2ab5d', '#57724b'],
  sandwich: ['#b77842', '#889657', '#6a3d25'],
  pasta: ['#d3a64f', '#729050', '#985333'],
  rice: ['#b77842', '#f0d7a2', '#61402b'],
  chicken: ['#c48c4a', '#b95f3b', '#69804c'],
  risotto: ['#dcbd77', '#87944f', '#6d4930'],
  salmon: ['#d87a59', '#77905d', '#edd094'],
  steak: ['#9b4e35', '#87935a', '#d0a45f'],
  gnocchi: ['#e8c989', '#829151', '#b37944'],
  cake: ['#d6a461', '#f0d7a8', '#8e5938'],
  tart: ['#d49c55', '#ad5843', '#78915c'],
  affogato: ['#f0d4a0', '#70412d', '#b57648'],
  pudding: ['#60402c', '#d9ad70', '#3b251d'],
  cheesecake: ['#e4cb98', '#ba8051', '#788751'],
  cookie: ['#b56e39', '#e5be79', '#65402a'],
}

function resolveArt(name, category, fallbackType) {
  const itemName = name?.toLowerCase() ?? ''
  if (/\b(latte|macchiato|frappe|kapeng|coffee|matcha|mocha|barako|cold brew)\b/.test(itemName)) return 'coffee'
  if (/\b(croissant|roll|ensaymada|pandesal|turon|pastry|bun)\b/.test(itemName)) return 'croissant'
  if (/\b(carbonara|pasta)\b/.test(itemName)) return 'pasta'
  if (/\b(cheesecake|cake|tiramisu|flan)\b/.test(itemName)) return 'cake'
  if (/\b(silog|rice bowl|rice plate|kare-kare bowl)\b/.test(itemName)) return 'rice'
  if (fallbackType && palettes[fallbackType]) return fallbackType
  const defaults = { coffee: 'coffee', breakfast: 'pancakes', mains: 'rice', desserts: 'cake' }
  return defaults[category?.toLowerCase()] ?? 'coffee'
}

export default function FoodArt({ type, name, category, label }) {
  const artType = resolveArt(name, category, type)
  const [main, light, dark] = palettes[artType] ?? palettes.coffee
  const title = label || name || artType.replaceAll('-', ' ')
  const id = useId().replaceAll(':', '')
  return (
    <svg className="food-art" viewBox="0 0 280 220" role="img" aria-label={`${title} illustration`}>
      <defs>
        <linearGradient id={`food-${id}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={main} />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="45%" r="65%">
          <stop offset="0" stopColor={light} stopOpacity=".33" />
          <stop offset="1" stopColor={dark} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="140" cy="177" rx="100" ry="25" fill={dark} opacity=".32" />
      <ellipse cx="140" cy="111" rx="104" ry="88" fill={`url(#glow-${id})`} />
      {['coffee', 'latte', 'cocoa', 'chai', 'coldbrew', 'affogato'].includes(artType) ? (
        <g>
          <path d="M75 91h112l-11 60a22 22 0 0 1-22 18h-46a22 22 0 0 1-22-18Z" fill={`url(#food-${id})`} stroke="#f4ddbb" strokeWidth="3" />
          <path d="M187 103h12a20 20 0 0 1 0 40h-18" fill="none" stroke="#f4ddbb" strokeWidth="8" />
          <ellipse cx="131" cy="92" rx="56" ry="12" fill={dark} />
          <ellipse cx="131" cy="91" rx="49" ry="8" fill={main} />
          {artType === 'latte' && <path d="M127 96c-21-19-33 10-7 11 19 1 16-18 2-17-12 0-12 20 8 18 17-2 13-21-4-20" fill="none" stroke="#f4e3bf" strokeWidth="3" />}
          {artType === 'cocoa' && <circle cx="128" cy="91" r="4" fill="#f3d09a" />}
          <path d="M102 54c-8-10 9-12 1-23m23 24c-9-11 9-13 1-24m24 24c-8-10 9-12 1-23" fill="none" stroke="#f0c99d" strokeLinecap="round" strokeWidth="4" opacity=".8" />
          <path d="M95 117v28m12-28v38m51-35v24" stroke="#fff1d9" strokeLinecap="round" strokeWidth="3" opacity=".3" />
        </g>
      ) : ['pasta', 'gnocchi', 'risotto', 'rice'].includes(artType) ? (
        <g>
          <path d="M51 111h178c-5 38-42 63-89 63s-84-25-89-63Z" fill={light} stroke="#f5e1c4" strokeWidth="3" />
          <ellipse cx="140" cy="111" rx="90" ry="32" fill="#f2dfc0" />
          <ellipse cx="140" cy="108" rx="78" ry="26" fill={main} />
          {artType === 'pasta' ? <path d="M77 106c19-20 36 27 56 0 16-21 29 24 48-1m-83 18c18-21 35 25 53 0 17-21 31 25 48-1" fill="none" stroke="#f4cb70" strokeWidth="7" strokeLinecap="round" /> : artType === 'rice' ? <g fill="#fff5dc"><ellipse cx="104" cy="103" rx="4" ry="2.5"/><ellipse cx="120" cy="99" rx="4" ry="2.5"/><ellipse cx="138" cy="105" rx="4" ry="2.5"/><ellipse cx="157" cy="99" rx="4" ry="2.5"/><ellipse cx="176" cy="106" rx="4" ry="2.5"/><ellipse cx="111" cy="117" rx="4" ry="2.5"/><ellipse cx="130" cy="115" rx="4" ry="2.5"/><ellipse cx="151" cy="119" rx="4" ry="2.5"/><ellipse cx="169" cy="117" rx="4" ry="2.5"/></g> : <g fill="#eacb8e"><circle cx="103" cy="102" r="11"/><circle cx="134" cy="97" r="12"/><circle cx="164" cy="104" r="11"/><circle cx="122" cy="120" r="11"/><circle cx="154" cy="121" r="10"/></g>}
          {artType !== 'rice' && <path d="m108 93 9-9m28 12 9-10m-40 40 8-8m28 11 8-8" stroke="#77914e" strokeWidth="5" strokeLinecap="round" />}
        </g>
      ) : (
        <g>
          {['cake', 'cheesecake', 'tart'].includes(artType) ? (
            <g>
              <path d="m78 141 26-75 95 30-28 76Z" fill={`url(#food-${id})`} stroke="#f4e1c4" strokeWidth="3" />
              <path d="m78 141 26-75 22 11-27 75Z" fill={light} />
              <path d="m104 66 95 30-5 13-94-30Z" fill="#f5dba8" />
              <path d="M124 78c17-17 32-2 33 3m5 9c16-16 28-4 29 1" fill="none" stroke="#a74938" strokeWidth="7" strokeLinecap="round" />
            </g>
          ) : (
            <g>
              <ellipse cx="140" cy="141" rx="79" ry="27" fill="#f3dfc1" />
              <path d="M77 114h126v26c0 20-28 36-63 36s-63-16-63-36Z" fill={`url(#food-${id})`} stroke="#f4e1c4" strokeWidth="3" />
              <ellipse cx="140" cy="114" rx="63" ry="22" fill={main} />
              {artType === 'pancakes' && <g><ellipse cx="139" cy="109" rx="43" ry="15" fill="#e6b866"/><ellipse cx="139" cy="98" rx="40" ry="13" fill="#c68039"/><path d="M125 86h27v11h-27Z" fill="#f1d38f"/><circle cx="141" cy="87" r="6" fill="#8e4e32"/></g>}
              {artType === 'croissant' && <path d="M91 125c-8-24 13-36 29-20 11-25 34-25 43 0 18-13 35 3 26 23-19-11-34-10-49 1-14-11-30-13-49-4Z" fill={light} stroke="#f3d296" strokeWidth="3"/>}
              {artType === 'toast' && <g><rect x="95" y="81" width="91" height="51" rx="14" fill="#d9a05f" transform="rotate(-8 140 106)"/><path d="M111 111c16-29 37-6 55-22 13 19-4 38-25 39-16 1-22-8-30-17Z" fill="#78965d"/><circle cx="136" cy="108" r="4" fill="#f0d68e"/></g>}
              {!['pancakes', 'croissant', 'toast'].includes(artType) && <g fill={light}><circle cx="111" cy="108" r="9"/><circle cx="141" cy="101" r="11"/><circle cx="169" cy="110" r="9"/></g>}
            </g>
          )}
        </g>
      )}
      <path d="M64 188h152" stroke="#f3dfc1" strokeLinecap="round" strokeWidth="2" opacity=".4" />
    </svg>
  )
}
