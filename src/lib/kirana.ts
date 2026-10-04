export type Product = {
  id: string;
  name: string;
  hindi: string;
  price: number;
  unit: "kg" | "pkt" | "L";
  loose: boolean;
  aliases: string[];
};

export const PRODUCTS: Product[] = [
  { id: "toor", name: "Toor Dal", hindi: "तूर दाल", price: 120, unit: "kg", loose: true, aliases: ["arhar", "tur", "toor"] },
  { id: "chana", name: "Chana Dal", hindi: "चना दाल", price: 90, unit: "kg", loose: true, aliases: ["chana", "channa"] },
  { id: "besan", name: "Besan", hindi: "बेसन", price: 80, unit: "kg", loose: true, aliases: ["gram flour", "besan"] },
  { id: "sugar", name: "Sugar", hindi: "चीनी", price: 48, unit: "kg", loose: true, aliases: ["chini", "cheeni", "cheni", "shakar", "shakkar"] },
  { id: "rice", name: "Rice", hindi: "चावल", price: 55, unit: "kg", loose: true, aliases: ["chawal", "chaval"] },
  { id: "atta", name: "Atta", hindi: "आटा", price: 48, unit: "kg", loose: true, aliases: ["aata", "wheat flour", "gehu"] },
  { id: "potato", name: "Potato", hindi: "आलू", price: 35, unit: "kg", loose: true, aliases: ["aloo", "alu"] },
  { id: "onion", name: "Onion", hindi: "प्याज़", price: 40, unit: "kg", loose: true, aliases: ["pyaz", "pyaaz", "kanda"] },
  { id: "pumpkin", name: "Pumpkin", hindi: "कद्दू", price: 40, unit: "kg", loose: true, aliases: ["kaddu", "sitaphal"] },
  { id: "parleg", name: "Parle-G", hindi: "पारले-जी", price: 5, unit: "pkt", loose: false, aliases: ["parle", "biscuit"] },
  { id: "milk", name: "Amul Milk", hindi: "अमूल दूध", price: 30, unit: "pkt", loose: false, aliases: ["doodh", "dudh", "amul"] },
  { id: "salt", name: "Tata Salt", hindi: "नमक", price: 28, unit: "pkt", loose: false, aliases: ["namak", "tata"] },
  { id: "maggi", name: "Maggi", hindi: "मैगी", price: 14, unit: "pkt", loose: false, aliases: ["noodles", "magi"] },
  { id: "sunoil", name: "Fortune Sunflower Oil", hindi: "सूरजमुखी तेल", price: 150, unit: "L", loose: false, aliases: ["sunflower", "fortune", "tel"] },
  { id: "mustard", name: "Mustard Oil", hindi: "सरसों तेल", price: 170, unit: "L", loose: false, aliases: ["sarson", "mustard", "tel"] },
  { id: "soyoil", name: "Soybean Oil", hindi: "सोयाबीन तेल", price: 140, unit: "L", loose: false, aliases: ["soya", "soybean", "tel"] },
  { id: "groundnut", name: "Groundnut Oil", hindi: "मूंगफली तेल", price: 190, unit: "L", loose: false, aliases: ["moongfali", "peanut", "tel"] },
];

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)!;

function lev(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

export function fuzzySearch(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return PRODUCTS.map((p) => {
    const terms = [p.name.toLowerCase(), ...p.aliases];
    let best = 99;
    let hit = "";
    for (const t of terms) {
      const score = t.startsWith(s) || t.includes(s) ? 0 : lev(s, t.slice(0, Math.max(s.length, 3)));
      if (score < best) { best = score; hit = t; }
    }
    return { p, best, hit };
  })
    .filter((r) => r.best <= Math.max(1, Math.floor(s.length / 3)))
    .sort((a, b) => a.best - b.best)
    .slice(0, 6);
}

export const rupee = (n: number) => "₹" + (Math.round(n * 100) / 100).toLocaleString("en-IN");
