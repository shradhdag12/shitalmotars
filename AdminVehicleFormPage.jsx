import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import api from '../services/api';
import { formatCurrency } from '../utils/formatters';
import { 
  Car, 
  Upload, 
  Trash2, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight, 
  Star,
  Plus,
  ShieldCheck
} from 'lucide-react';

const BRANDS = ['Hyundai', 'Maruti Suzuki', 'Honda', 'Toyota', 'Tata', 'Mahindra', 'Kia', 'Ford', 'Volkswagen', 'BMW', 'Mercedes-Benz', 'Other'];
const FUELS = ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid', 'Other'];
const TRANSMISSIONS = ['Manual', 'Automatic', 'AMT', 'CVT', 'DCT', 'Other'];
const BODY_TYPES = ['SUV', 'Sedan', 'Hatchback', 'MUV', 'Coupe', 'Convertible', 'Other'];
const OWNERS = ['1st Owner', '2nd Owner', '3rd Owner', '4th Owner+'];

const DEFAULT_IMAGE_LIST = [
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800'
];

const AdminVehicleFormPage = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Form State
  const [formData, setFormData] = useState({
    brand: 'Hyundai',
    model: '',
    variant: '',
    modelYear: new Date().getFullYear(),
    registrationYear: new Date().getFullYear(),
    price: '',
    isNegotiable: true,
    kmDriven: '',
    fuelType: 'Diesel',
    transmission: 'Manual',
    ownerNumber: '1st Owner',
    bodyType: 'SUV',
    description: '',
    featuresInput: 'Panoramic Sunroof, Touchscreen Infotainment, Leather Seats, Push Button Start',
    features: ['Panoramic Sunroof', 'Touchscreen Infotainment'],
    images: DEFAULT_IMAGE_LIST.map((url, idx) => ({ url, isMain: idx === 0 })),
    mainImage: DEFAULT_IMAGE_LIST[0],
    status: 'AVAILABLE',
    isNewStock: true
  });

  const [customImageUrl, setCustomImageUrl] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchVehicle();
    }
  }, [id]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/vehicles/${id}`);
      if (res.data.success) {
        const v = res.data.data;
        const imgList = v.images && v.images.length > 0
          ? v.images.map(img => typeof img === 'string' ? { url: img, isMain: img === v.mainImage } : img)
          : DEFAULT_IMAGE_LIST.map((url, idx) => ({ url, isMain: idx === 0 }));

        setFormData({
          ...v,
          featuresInput: (v.features || []).join(', '),
          images: imgList,
          mainImage: v.mainImage || imgList[0]?.url || ''
        });
      }
    } catch (err) {
      console.error('Failed to load vehicle for editing', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddCustomImage = () => {
    if (!customImageUrl.trim()) return;
    const newImg = { url: customImageUrl.trim(), isMain: formData.images.length === 0 };
    const updatedImages = [...formData.images, newImg];
    setFormData(prev => ({
      ...prev,
      images: updatedImages,
      mainImage: prev.mainImage || customImageUrl.trim()
    }));
    setCustomImageUrl('');
    setToast({ message: 'Image added to gallery', type: 'success' });
  };

  const handleSetMainImage = (url) => {
    const updated = formData.images.map(img => ({
      ...img,
      isMain: img.url === url
    }));
    setFormData(prev => ({
      ...prev,
      images: updated,
      mainImage: url
    }));
  };

  const handleRemoveImage = (url) => {
    const updated = formData.images.filter(img => img.url !== url);
    const newMain = updated[0]?.url || '';
    setFormData(prev => ({
      ...prev,
      images: updated,
      mainImage: newMain
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.brand || !formData.model || !formData.price || !formData.kmDriven) {
        setToast({ message: 'Please complete all required vehicle fields', type: 'error' });
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSaveVehicle = async () => {
    try {
      setLoading(true);
      const parsedFeatures = formData.featuresInput
        ? formData.featuresInput.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      const payload = {
        ...formData,
        price: Number(formData.price),
        kmDriven: Number(formData.kmDriven),
        modelYear: Number(formData.modelYear),
        registrationYear: Number(formData.registrationYear),
        features: parsedFeatures,
        mainImage: formData.mainImage || (formData.images[0]?.url || '')
      };

      let res;
      if (isEdit) {
        res = await api.put(`/vehicles/${id}`, payload);
      } else {
        res = await api.post('/vehicles', payload);
      }

      if (res.data.success) {
        setToast({ message: isEdit ? 'Vehicle updated successfully!' : 'Vehicle created successfully!', type: 'success' });
        setTimeout(() => {
          navigate('/admin/vehicles');
        }, 1000);
      }
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Failed to save vehicle', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-100 flex">
      <AdminSidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <AdminHeader
          title={isEdit ? 'Edit Vehicle Entry' : 'Add New Vehicle Entry'}
          subtitle="Multi-step form with specs, photo manager, and live preview"
          onMobileToggle={() => setMobileSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl">
          
          {/* Form Step Indicator Progress Bar */}
          <div className="bg-[#121216] border border-dark-border rounded-2xl p-4 flex items-center justify-between">
            {[
              { num: 1, title: '1. Vehicle Info' },
              { num: 2, title: '2. Upload Photos' },
              { num: 3, title: '3. Preview & Save' }
            ].map(s => (
              <div
                key={s.num}
                className={`flex items-center gap-2 text-xs font-bold ${
                  step === s.num
                    ? 'text-gold-500'
                    : step > s.num
                    ? 'text-emerald-400'
                    : 'text-slate-500'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs font-extrabold ${
                  step === s.num
                    ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                    : step > s.num
                    ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                    : 'border-dark-border text-slate-500'
                }`}>
                  {s.num}
                </div>
                <span className="hidden sm:inline">{s.title}</span>
              </div>
            ))}
          </div>

          {/* STEP 1: VEHICLE INFORMATION */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white border-b border-dark-border pb-3">Step 1: Vehicle Specifications</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
                
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Vehicle Brand *</label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleTextChange}
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  >
                    {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Vehicle Model *</label>
                  <input
                    type="text"
                    name="model"
                    required
                    value={formData.model}
                    onChange={handleTextChange}
                    placeholder="e.g. Creta, Brezza, City"
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Variant / Trim</label>
                  <input
                    type="text"
                    name="variant"
                    value={formData.variant}
                    onChange={handleTextChange}
                    placeholder="e.g. SX(O) 1.5 Diesel"
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Model Year *</label>
                  <input
                    type="number"
                    name="modelYear"
                    required
                    value={formData.modelYear}
                    onChange={handleTextChange}
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Registration Year *</label>
                  <input
                    type="number"
                    name="registrationYear"
                    required
                    value={formData.registrationYear}
                    onChange={handleTextChange}
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Price (₹ INR) *</label>
                  <input
                    type="number"
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleTextChange}
                    placeholder="e.g. 1125000"
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">KM Driven *</label>
                  <input
                    type="number"
                    name="kmDriven"
                    required
                    value={formData.kmDriven}
                    onChange={handleTextChange}
                    placeholder="e.g. 45000"
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Fuel Type *</label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleTextChange}
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  >
                    {FUELS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Transmission *</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleTextChange}
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  >
                    {TRANSMISSIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Ownership *</label>
                  <select
                    name="ownerNumber"
                    value={formData.ownerNumber}
                    onChange={handleTextChange}
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  >
                    {OWNERS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Body Type *</label>
                  <select
                    name="bodyType"
                    value={formData.bodyType}
                    onChange={handleTextChange}
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  >
                    {BODY_TYPES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Listing Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleTextChange}
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="SOLD">SOLD</option>
                  </select>
                </div>

              </div>

              {/* Checkbox Flags */}
              <div className="flex flex-wrap gap-6 pt-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isNegotiable"
                    checked={formData.isNegotiable}
                    onChange={handleTextChange}
                    className="accent-gold-500"
                  />
                  <span>Price Negotiable</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isNewStock"
                    checked={formData.isNewStock}
                    onChange={handleTextChange}
                    className="accent-gold-500"
                  />
                  <span>Show 'NEW STOCK' Badge</span>
                </label>
              </div>

              {/* Description & Features */}
              <div className="space-y-4 pt-2 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Vehicle Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleTextChange}
                    placeholder="Enter detailed car condition, service history notes, inspection summary..."
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl p-3 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Key Features (Comma Separated)</label>
                  <input
                    type="text"
                    name="featuresInput"
                    value={formData.featuresInput}
                    onChange={handleTextChange}
                    placeholder="Sunroof, Alloy Wheels, Touchscreen, Reverse Camera"
                    className="w-full bg-[#0A0A0C] border border-dark-border rounded-xl px-3 py-2.5 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="gold-button px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <span>Next: Upload Photos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: PHOTO MANAGER */}
          {step === 2 && (
            <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white border-b border-dark-border pb-3">Step 2: Manage Vehicle Imagery</h3>

              {/* Add Custom Photo URL */}
              <div className="p-4 rounded-xl bg-[#0A0A0C] border border-dark-border space-y-3">
                <label className="text-xs font-semibold text-slate-300">Add Image URL (Unsplash or direct URL)</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 bg-[#121216] border border-dark-border rounded-xl px-3 py-2 text-xs text-white focus:border-gold-500 focus:outline-none"
                  />
                  <button
                    onClick={handleAddCustomImage}
                    className="gold-button px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Images Grid */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400">Current Photo Gallery ({formData.images.length} Photos)</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.images.map((img, idx) => (
                    <div key={idx} className="relative group aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0A0C] border border-dark-border">
                      <img src={img.url} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                      
                      {img.url === formData.mainImage && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-gold-500 text-black text-[10px] font-extrabold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-black" />
                          <span>MAIN COVER</span>
                        </span>
                      )}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {img.url !== formData.mainImage && (
                          <button
                            onClick={() => handleSetMainImage(img.url)}
                            className="px-2.5 py-1 rounded bg-gold-500 text-black text-[10px] font-bold"
                          >
                            Set Main
                          </button>
                        )}
                        <button
                          onClick={() => handleRemoveImage(img.url)}
                          className="p-1.5 rounded bg-rose-600 text-white"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300"
                >
                  Back to Specs
                </button>

                <button
                  onClick={() => setStep(3)}
                  className="gold-button px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <span>Next: Preview & Save</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: LIVE PREVIEW & SAVE */}
          {step === 3 && (
            <div className="bg-[#121216] border border-dark-border rounded-2xl p-6 space-y-6 shadow-xl">
              <h3 className="text-lg font-bold text-white border-b border-dark-border pb-3">Step 3: Preview Customer View</h3>

              {/* Preview Box */}
              <div className="bg-[#0A0A0C] border border-dark-border rounded-2xl p-5 space-y-4 max-w-xl mx-auto">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black">
                  <img src={formData.mainImage || DEFAULT_IMAGE_LIST[0]} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gold-500 uppercase">{formData.brand}</span>
                  <h4 className="text-xl font-bold text-white">{formData.model} <span className="text-sm font-normal text-slate-400">{formData.variant}</span></h4>
                  <div className="text-2xl font-black text-white">{formatCurrency(formData.price)}</div>
                  <div className="text-xs text-slate-400">
                    {formData.modelYear} • {formData.fuelType} • {formData.transmission} • {formData.kmDriven} KM
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-300"
                >
                  Back to Photos
                </button>

                <button
                  onClick={handleSaveVehicle}
                  disabled={loading}
                  className="gold-button px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-gold-500/20"
                >
                  {loading ? (
                    <span>Saving...</span>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>{isEdit ? 'UPDATE VEHICLE ENTRY' : 'SAVE & PUBLISH VEHICLE'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
};

export default AdminVehicleFormPage;
