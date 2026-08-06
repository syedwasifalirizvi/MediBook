import React, { useState } from 'react';
import { Activity, Download, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/formatters';
import { Modal } from '../../components/common/Modal';

export const PatientReportsPage: React.FC = () => {
  const { user } = useAuth();
  const { reports } = useData();
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const userReports = reports.filter((r) => r.patientId === (user?.id || 'patient-1'));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase font-bold tracking-wider text-[#0F3040]">Patient Portal</span>
        <h1 className="font-display text-3xl font-bold text-[#1F2937]">Diagnostic Reports & Lab Results</h1>
        <p className="text-xs text-[#6B7280]">
          Review official pathology, radiology, and electrocardiography reports uploaded by certified laboratories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userReports.map((rep) => (
          <div key={rep.id} className="glass-card p-6 rounded-3xl border border-black/5 shadow-card space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#0F3040]/15 text-[#0F3040] flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#1F2937]">{rep.title}</h3>
                  <p className="text-xs text-[#6B7280]">{rep.type} • {formatDate(rep.date)}</p>
                </div>
              </div>

              <span className="px-3 py-1 bg-[#2E7D32]/10 text-[#2E7D32] text-xs font-bold rounded-full">
                {rep.status}
              </span>
            </div>

            <p className="text-xs text-[#6B7280] line-clamp-2 bg-[#F8F7F5] p-3 rounded-2xl border border-black/5">
              {rep.summary}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[#6B7280]">File Size: {rep.fileSize}</span>
              <button
                onClick={() => setSelectedReport(rep)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F] transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> View Report
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        title={selectedReport?.title || 'Report Details'}
      >
        {selectedReport && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-white rounded-xl border border-black/5 flex justify-between">
              <span className="text-[#6B7280]">Category:</span>
              <span className="font-bold text-[#1F2937]">{selectedReport.type}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/5 flex justify-between">
              <span className="text-[#6B7280]">Test Date:</span>
              <span className="font-bold text-[#1F2937]">{formatDate(selectedReport.date)}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-black/5 flex justify-between">
              <span className="text-[#6B7280]">Clinical Status:</span>
              <span className="font-bold text-[#2E7D32]">{selectedReport.status}</span>
            </div>

            <div className="p-4 bg-[#F8F7F5] rounded-2xl border border-black/5 space-y-2">
              <h5 className="font-bold text-[#1F2937]">Detailed Clinical Summary:</h5>
              <p className="text-[#6B7280] leading-relaxed">{selectedReport.summary}</p>
            </div>

            <button
              onClick={() => alert('Report downloaded successfully')}
              className="w-full py-3 text-xs font-bold text-white bg-[#0F3040] rounded-xl hover:bg-[#D99B7F] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Official PDF Report ({selectedReport.fileSize})
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};
