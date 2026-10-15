import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Fallback high quality image if all candidate URLs fail
const GLOBAL_FALLBACK = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80';

// Mapping for all 120 products
const productsMap = {
  // Category 1: Medicines (1-30)
  1: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Paracetamol_650.jpg?width=600',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  2: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80'
  ],
  3: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Ibalgin.JPG?width=600',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80'
  ],
  4: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Zyrtec-D_blister_pack.png?width=600',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  5: [
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80'
  ],
  6: [
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80'
  ],
  7: [
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80'
  ],
  8: [
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80'
  ],
  9: [
    'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  10: [
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80'
  ],
  11: [
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  12: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80'
  ],
  13: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  14: [
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80',
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80'
  ],
  15: [
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  16: [
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  17: [
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  18: [
    'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  19: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Regular_strength_enteric_coated_aspirin_tablets.jpg?width=600',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80'
  ],
  20: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80'
  ],
  21: [
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80'
  ],
  22: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  23: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80'
  ],
  24: [
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80'
  ],
  25: [
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&q=80',
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600&q=80'
  ],
  26: [
    'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  27: [
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  28: [
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80',
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80'
  ],
  29: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80'
  ],
  30: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80'
  ],

  // Category 2: Supplements (31-60)
  31: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/ASCOMES_Vitamin_C_Tablet.jpg?width=600',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  32: [
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80',
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80'
  ],
  33: [
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80',
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&q=80'
  ],
  34: [
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80',
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80'
  ],
  35: [
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80',
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80'
  ],
  36: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Calcium-Tablets-2007.jpg?width=600',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80'
  ],
  37: [
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  38: [
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&q=80'
  ],
  39: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  40: [
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80',
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80'
  ],
  41: [
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80'
  ],
  42: [
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80',
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&q=80'
  ],
  43: [
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80'
  ],
  44: [
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80'
  ],
  45: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80'
  ],
  46: [
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&q=80',
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80'
  ],
  47: [
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80',
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80'
  ],
  48: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80'
  ],
  49: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80'
  ],
  50: [
    'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&q=80',
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80'
  ],
  51: [
    'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&q=80',
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&q=80'
  ],
  52: [
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80',
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80'
  ],
  53: [
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&q=80',
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80'
  ],
  54: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Spirulina_tablets.jpg?width=600',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80'
  ],
  55: [
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80'
  ],
  56: [
    'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=600&q=80',
    'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&q=80'
  ],
  57: [
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80',
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&q=80'
  ],
  58: [
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&q=80',
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80'
  ],
  59: [
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80',
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&q=80'
  ],
  60: [
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=600&q=80',
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&q=80'
  ],

  // Category 3: Devices (61-90)
  61: [
    'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  62: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Digital_Blood_Pressure_Monitor.jpg?width=600',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  63: [
    'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  64: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/First_Aid_Kit.jpg?width=600',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  65: [
    'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  66: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80'
  ],
  67: [
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  68: [
    'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  69: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80'
  ],
  70: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80'
  ],
  71: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80'
  ],
  72: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  73: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  74: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Digital_Blood_Pressure_Monitor.jpg?width=600',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  75: [
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  76: [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  77: [
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  78: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  79: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  80: [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80'
  ],
  81: [
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80'
  ],
  82: [
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  83: [
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  84: [
    'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  85: [
    'https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  86: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80',
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80'
  ],
  87: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  88: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  89: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&q=80'
  ],
  90: [
    'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],

  // Category 4: Personal Care (91-120)
  91: [
    'https://commons.wikimedia.org/wiki/Special:FilePath/Hand_sanitizer.jpg?width=600',
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80'
  ],
  92: [
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&q=80'
  ],
  93: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80'
  ],
  94: [
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  95: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80'
  ],
  96: [
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  97: [
    'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80'
  ],
  98: [
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80'
  ],
  99: [
    'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80'
  ],
  100: [
    'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  101: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80'
  ],
  102: [
    'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80'
  ],
  103: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  104: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80'
  ],
  105: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80'
  ],
  106: [
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80'
  ],
  107: [
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  108: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  109: [
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  110: [
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  111: [
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  112: [
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=600&q=80',
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80'
  ],
  113: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80'
  ],
  114: [
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  115: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80'
  ],
  116: [
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80',
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80'
  ],
  117: [
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  118: [
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80',
    'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=600&q=80'
  ],
  119: [
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80'
  ],
  120: [
    'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=600&q=80'
  ]
};

async function downloadUrl(url, targetPath) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'MedicineHealthcareApp/1.0 (contact@healthcare-catalog.org)'
      }
    });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1500) return false;
    fs.writeFileSync(targetPath, buf);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  console.log('Starting download for all 120 products...');
  let successCount = 0;
  let failCount = 0;

  for (let id = 1; id <= 120; id++) {
    const targetFile = path.join(outDir, `${id}.jpg`);
    const urls = productsMap[id] || [];
    urls.push(GLOBAL_FALLBACK);

    let downloaded = false;
    for (const u of urls) {
      if (await downloadUrl(u, targetFile)) {
        downloaded = true;
        break;
      }
    }

    if (downloaded) {
      successCount++;
      if (id % 10 === 0 || id === 1 || id === 120) {
        console.log(`Progress: ${id}/120 downloaded successfully.`);
      }
    } else {
      failCount++;
      console.error(`Failed to download image for ID: ${id}`);
    }
  }

  console.log(`Finished: ${successCount} succeeded, ${failCount} failed.`);

  // Update db.json
  const dbPath = path.resolve('db.json');
  if (fs.existsSync(dbPath)) {
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    if (Array.isArray(db.products)) {
      for (const p of db.products) {
        p.image = `/images/${p.id}.jpg`;
      }
      fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
      console.log('db.json updated with local /images/<id>.jpg paths.');
    }
  }
}

run();
