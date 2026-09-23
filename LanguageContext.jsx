import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.availableStock': 'Available Stock',
    'nav.rental': 'Rental',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.wishlist': 'Wishlist',
    'nav.enquiry': 'Enquiry',
    'nav.adminLogin': 'Admin Login',
    'nav.dashboard': 'Dashboard',

    // Hero
    'hero.tagline': 'QUALITY USED CARS & RELIABLE RENTAL SERVICES',
    'hero.headline': 'DRIVE YOUR DREAM WITH SHITAL MOTORS',
    'hero.subtext': 'Best Quality Used Cars. Trusted Vehicles. Transparent Deals. Best Prices in Town.',
    'hero.btnStock': 'VIEW AVAILABLE CARS',
    'hero.btnContact': 'CONTACT US',
    'hero.btnRental': 'EXPLORE RENTAL',

    // Features / Chips
    'chip.trusted': 'Trusted Vehicles',
    'chip.bestPrices': 'Best Prices',
    'chip.transparent': 'Transparent Deals',
    'chip.service247': '24/7 Rental Support',

    // Search & Filter
    'filter.title': 'SEARCH & FILTER CARS',
    'filter.brand': 'Select Brand',
    'filter.model': 'Select Model',
    'filter.fuel': 'Fuel Type',
    'filter.transmission': 'Transmission',
    'filter.body': 'Body Type',
    'filter.minPrice': 'Min Price (₹)',
    'filter.maxPrice': 'Max Price (₹)',
    'filter.searchBtn': 'SEARCH',
    'filter.resetBtn': 'RESET FILTERS',
    'filter.allBrands': 'All Brands',
    'filter.allFuel': 'All Fuel Types',
    'filter.allTrans': 'All Transmissions',

    // Vehicle Card
    'card.viewDetails': 'VIEW DETAILS',
    'card.call': 'CALL NOW',
    'card.whatsapp': 'WHATSAPP',
    'card.negotiable': 'Price Negotiable',
    'card.available': 'AVAILABLE',
    'card.sold': 'SOLD',
    'card.new': 'NEW STOCK',

    // Sections
    'sec.recentlyAdded': 'RECENTLY ADDED VEHICLES',
    'sec.availableStock': 'AVAILABLE STOCK',
    'sec.popularFilters': 'POPULAR FILTERS',
    'sec.whyChoose': 'WHY CHOOSE SHITAL MOTORS',
    'sec.ourServices': 'OUR SERVICES',
    'sec.rentalServices': 'CAR RENTAL SERVICES',
    'sec.viewAll': 'View All Stock',

    // Wishlist
    'wishlist.title': 'YOUR FAVOURITE VEHICLES',
    'wishlist.empty': 'No favourite vehicles saved yet.',
    'wishlist.browseBtn': 'BROWSE AVAILABLE CARS',
    'wishlist.added': 'Vehicle added to wishlist!',
    'wishlist.removed': 'Vehicle removed from wishlist.',

    // Common Buttons & Messages
    'btn.submit': 'SUBMIT ENQUIRY',
    'btn.bookNow': 'BOOK NOW',
    'btn.back': 'BACK',
    'btn.save': 'SAVE',
    'msg.noResults': 'No vehicles match your search criteria.'
  },
  mr: {
    // Nav
    'nav.home': 'मुख्यपृष्ठ',
    'nav.availableStock': 'उपलब्ध गाड्या',
    'nav.rental': 'कार भाड्याने',
    'nav.services': 'सेवा',
    'nav.about': 'आमच्याबद्दल',
    'nav.contact': 'संपर्क',
    'nav.wishlist': 'आवडत्या गाड्या',
    'nav.enquiry': 'चौकशी',
    'nav.adminLogin': 'अ‍ॅडमिन लॉगिन',
    'nav.dashboard': 'डॅशबोर्ड',

    // Hero
    'hero.tagline': 'उत्कृष्ट दर्जाच्या जुन्या गाड्या आणि विश्वासू कार भाडे सेवा',
    'hero.headline': 'शीतल मोटर्स सोबत तुमचे स्वप्न साकार करा',
    'hero.subtext': 'सर्वोत्तम दर्जाच्या गाड्या. विश्वासार्ह व्यवहार. वाजवी दर.',
    'hero.btnStock': 'उपलब्ध गाड्या पहा',
    'hero.btnContact': 'संपर्क करा',
    'hero.btnRental': 'कार भाडे सेवा',

    // Features / Chips
    'chip.trusted': 'विश्वासार्ह गाड्या',
    'chip.bestPrices': 'सर्वोत्तम दर',
    'chip.transparent': 'पारदर्शक व्यवहार',
    'chip.service247': '२४/७ सेवा उपलब्ध',

    // Search & Filter
    'filter.title': 'गाड्या शोधा आणि फिल्टर करा',
    'filter.brand': 'ब्रांड निवडा',
    'filter.model': 'मॉडेल निवडा',
    'filter.fuel': 'इंधन प्रकार',
    'filter.transmission': 'गिअर प्रकार',
    'filter.body': 'बॉडी टाईप',
    'filter.minPrice': 'किमान किंमत (₹)',
    'filter.maxPrice': 'कमाल किंमत (₹)',
    'filter.searchBtn': 'शोधा',
    'filter.resetBtn': 'फिल्टर रिसेट',
    'filter.allBrands': 'सर्व ब्रांड्स',
    'filter.allFuel': 'सर्व इंधन',
    'filter.allTrans': 'सर्व गिअर प्रकार',

    // Vehicle Card
    'card.viewDetails': 'माहिती पहा',
    'card.call': 'कॉल करा',
    'card.whatsapp': 'व्हॉट्सअ‍ॅप',
    'card.negotiable': 'किंमत वाटाघाटी योग्य',
    'card.available': 'उपलब्ध',
    'card.sold': 'विक्री झाली',
    'card.new': 'नवीन स्टॉक',

    // Sections
    'sec.recentlyAdded': 'नुकत्याच आलेल्या गाड्या',
    'sec.availableStock': 'उपलब्ध गाड्यांचा साठा',
    'sec.popularFilters': 'लोकप्रिय पर्याय',
    'sec.whyChoose': 'शीतल मोटर्स का निवडावे?',
    'sec.ourServices': 'आमच्या मुख्य सेवा',
    'sec.rentalServices': 'कार भाडे सेवा',
    'sec.viewAll': 'सर्व गाड्या पहा',

    // Wishlist
    'wishlist.title': 'तुमच्या आवडत्या गाड्या',
    'wishlist.empty': 'अद्याप एकही गाडी सेव्ह केलेली नाही.',
    'wishlist.browseBtn': 'उपलब्ध गाड्या पहा',
    'wishlist.added': 'गाडी विशलिस्टमध्ये जोडली!',
    'wishlist.removed': 'गाडी विशलिस्टमधून काढली.',

    // Common Buttons & Messages
    'btn.submit': 'चौकशी पाठवा',
    'btn.bookNow': 'बुकिंग करा',
    'btn.back': 'मागे जा',
    'btn.save': 'जतन करा',
    'msg.noResults': 'तुमच्या शोधानुसार एकही गाडी आढळली नाही.'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('shital_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('shital_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'mr' : 'en'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
