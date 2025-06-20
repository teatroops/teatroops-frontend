import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const API_BASE = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') || '';

function getInitial(name) {
  if (!name) return '?';
  return name.trim().charAt(0).toUpperCase();
}

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => (
  <svg
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={`w-6 h-6 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.538 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.967a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z" />
  </svg>
);


const ReviewSection = ({ productId }) => {
  const { user } = useContext(ShopContext);
  const [reviews, setReviews] = useState([]);
  const sliderRef = useRef(null);
  const [sliderScroll, setSliderScroll] = useState(0);
  const [maxSliderScroll, setMaxSliderScroll] = useState(0);

  // Calculate max scroll when reviews change
  useEffect(() => {
    if (sliderRef.current) {
      const el = sliderRef.current;
      setMaxSliderScroll(el.scrollWidth - el.clientWidth);
      setSliderScroll(el.scrollLeft);
    }
  }, [reviews]);

  // Update scroll position state on scroll
  const handleSliderScroll = () => {
    if (sliderRef.current) {
      setSliderScroll(sliderRef.current.scrollLeft);
    }
  };

  const [summary, setSummary] = useState({ average: 0, total: 0, stars: [0,0,0,0,0] });
  const [form, setForm] = useState({ rating: 0, title: '', comment: '' });
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    fetchReviews();
    fetchSummary();
    // eslint-disable-next-line
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/reviews/${productId}`);
      setReviews(res.data);
    } catch (err) {
      setReviews([]);
    }
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/reviews/${productId}/summary`);
      setSummary(res.data);
    } catch (err) {
      setSummary({ average: 0, total: 0, stars: [0,0,0,0,0] });
    }
  };

  const handleStar = (idx) => setForm(f => ({ ...f, rating: idx + 1 }));

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Use logged-in user info if available, else guest
      const userId = user && user._id ? user._id : null;
      const name = user && user.name ? user.name : 'Guest';
      await axios.post(`${API_BASE}/api/reviews/${productId}`, {
        userId,
        name,
        ...form
      });
      setForm({ rating: 0, title: '', comment: '' });
      setShowForm(false);
      fetchReviews();
      fetchSummary();
    } catch (err) {
      setError('Failed to submit review.');
    }
    setLoading(false);
  };

  const scrollToForm = () => {
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className="my-16 w-full max-w-5xl mx-auto px-2">
      {/* Summary Box */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">{typeof summary?.average === 'number' ? summary.average.toFixed(1) : '0.0'}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < Math.round(summary.average)} />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-1">Based on {summary.total} Reviews</div>
        </div>
        <div className="flex flex-col gap-1 w-56">
          {[5,4,3,2,1].map((star, i) => (
            <div key={star} className="flex items-center gap-2">
              <span className="w-4 text-sm">{star}</span>
              <Star filled={true} />
              <div className="bg-gray-200 rounded h-2 flex-1 mx-1">
                <div style={{ width: `${summary.total ? (summary.stars[5-star]/summary.total)*100 : 0}%` }}
                  className="bg-yellow-400 h-2 rounded"></div>
              </div>
              <span className="w-6 text-xs">{Array.isArray(summary.stars) && summary.stars[5-star] !== undefined ? summary.stars[5-star] : 0}</span>
            </div>
          ))}
        </div>
        <button onClick={scrollToForm} className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition self-start">Write a review</button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-12 flex flex-col gap-4 w-full max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} filled={i < form.rating} onClick={() => handleStar(i)} />
            ))}
            <span className="ml-2 text-sm">{form.rating ? `${form.rating} Star${form.rating > 1 ? 's' : ''}` : ''}</span>
          </div>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            placeholder="Review title"
            required
          />
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full min-h-[80px]"
            placeholder="Write your review..."
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button disabled={loading} className="bg-[--primary-color] text-white px-6 py-2 rounded hover:bg-green-700 transition">
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {/* Reviews Slider */}
      <div className="relative mt-8">
        {reviews.length === 0 && (
          <div className="text-center text-gray-500">No reviews yet. Be the first to write one!</div>
        )}
        {reviews.length > 0 && (
          <div className="flex items-center">
            {/* Left arrow */}
            <button
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-[--primary-color] mr-2 shadow transition disabled:opacity-50"
              onClick={() => sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' })}
              disabled={sliderScroll === 0}
              aria-label="Scroll left"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            {/* Slider */}
            <div
              ref={sliderRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:w-[960px] w-full px-1"
              style={{ scrollBehavior: 'smooth' }}
              onScroll={handleSliderScroll}
            >
              {reviews.map(r => (
                <div
                  key={r._id}
                  className="bg-white p-6 flex flex-col gap-2 min-w-[300px] max-w-[320px] snap-center"
                  style={{ flex: '0 0 320px' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-700">
                      {getInitial(r.name)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{r.name}</div>
                      <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} filled={i < r.rating} />
                    ))}
                  </div>
                  <div className="font-bold mt-2">{r.title}</div>
                  <div className="text-gray-700 text-sm">{r.comment}</div>
                </div>
              ))}
            </div>
            {/* Right arrow */}
            <button
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-[--primary-color] ml-2 shadow transition disabled:opacity-50"
              onClick={() => sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' })}
              disabled={sliderScroll >= maxSliderScroll}
              aria-label="Scroll right"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
