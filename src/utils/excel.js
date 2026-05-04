import * as XLSX from 'xlsx';

const STORAGE_KEY = 'mbwaay_orders';

export const PACK_PRICES = {
  'Power Clean 1L':       12,
  'Power Clean 500ml':    7,
  'Pack Duo (2×1L)':      22,
  'Pack Famille (4×1L)':  40,
};

export function getStoredOrders() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const orders = getStoredOrders();
  orders.push(order);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  return orders;
}

export function exportToExcel(orders) {
  const wb = XLSX.utils.book_new();

  // --- Sheet 1: Commandes ---
  const ws = XLSX.utils.json_to_sheet(orders);
  ws['!cols'] = [
    { wch: 20 }, { wch: 14 }, { wch: 14 }, { wch: 16 },
    { wch: 30 }, { wch: 22 }, { wch: 10 }, { wch: 14 }, { wch: 28 }, { wch: 14 },
  ];
  XLSX.utils.book_append_sheet(wb, ws, 'Commandes');

  // --- Sheet 2: Résumé ---
  const ca = orders.reduce((s, o) => s + (o['Total (TND)'] || 0), 0);
  const summaryData = [
    ['📦 MBWAAY – Résumé des commandes'],
    [],
    ['Total commandes',          orders.length],
    ["Chiffre d'affaires (TND)", ca],
    ['Exporté le',               new Date().toLocaleDateString('fr-FR')],
  ];
  const ws2 = XLSX.utils.aoa_to_sheet(summaryData);
  ws2['!cols'] = [{ wch: 32 }, { wch: 20 }];
  XLSX.utils.book_append_sheet(wb, ws2, 'Résumé');

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `MBWAAY_Commandes_${date}.xlsx`);
}
