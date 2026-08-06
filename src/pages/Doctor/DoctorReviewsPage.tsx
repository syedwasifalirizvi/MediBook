import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/formatters';

export const DoctorReviewsPage: React.FC = () => {
  const { reviews } = useData();
  const docReviews = reviews.filter((r) => r.doctorId === 'doc-1');

  const avgRating = docReviews.reduce((acc, curr) => acc + curr.rating, 0) / (docReviews.length || 1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Doctor Portal</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">Patient Feedback & Ratings</h1>
        <p className="text-xs text-[#6B7280]">Real reviews left by verified patients after completed care sessions.</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-black/10 shadow-card flex flex-col sm:flex-row items-center gap-8">
        <div className="text-center sm:border-r border-black/10 sm:pr-8">
          <p className="font-display text-5xl font-bold text-[#1F2937]">{avgRating.toFixed(2)}</p>
          <div className="flex items-center justify-center gap-1 text-[#A56F63] my-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-xs text-[#6B7280]">{docReviews.length} Total Patient Reviews</p>
        </div>

        <div className="space-y-2 flex-1 text-xs">
          <div className="flex items-center gap-3">
            <span className="w-12 text-[#1F2937] font-bold">5 Stars</span>
            <div className="flex-1 bg-black/5 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#0F3040] h-full w-[90%]" />
            </div>
            <span className="text-[#6B7280]">90%</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-12 text-[#1F2937] font-bold">4 Stars</span>
            <div className="flex-1 bg-black/5 h-2.5 rounded-full overflow-hidden">
              <div className="bg-[#0F3040] h-full w-[10%]" />
            </div>
            <span className="text-[#6B7280]">10%</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {docReviews.map((rev) => (
          <div key={rev.id} className="glass-card p-6 rounded-3xl border border-black/5 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0F3040]/20 text-[#1F2937] font-bold flex items-center justify-center">
                  {rev.patientName[0]}
                </div>
                <div>
                  <h4 className="font-bold text-[#1F2937] text-sm">{rev.patientName}</h4>
                  <span className="text-[10px] text-[#6B7280]">{formatDate(rev.date)}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[#A56F63]">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-[#6B7280] leading-relaxed italic">"{rev.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};
