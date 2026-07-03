"use client";

import { useState } from "react";
import StepIndicator from "@/components/form/StepIndicator";
import DataDiriStep from "@/components/form/DataDiriStep";
import KuesionerStep from "@/components/form/KuesionerStep";
import SuccessState from "@/components/form/SuccessState";
import FloatingShapes from "@/components/FloatingShapes";
import { submitSurvey } from "@/lib/submitSurvey";
import type { DataDiri, JawabanKuesioner, SurveyPayload } from "@/types";

const INITIAL_DATA_DIRI: DataDiri = {
  nama: "",
  usia: "",
  asalMode: "desa",
  asalDesa: "",
  asalKarangTaruna: "",
  jenisKelamin: ""
};

const INITIAL_JAWABAN: JawabanKuesioner = {
  q1: null,
  q2: null,
  q3: null,
  q4: null,
  q5: null,
  q6: null,
  q7: null,
  saran: ""
};

export default function KuesionerPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [dataDiri, setDataDiri] = useState<DataDiri>(INITIAL_DATA_DIRI);
  const [jawaban, setJawaban] = useState<JawabanKuesioner>(INITIAL_JAWABAN);
  const [dataDiriErrors, setDataDiriErrors] = useState<Partial<Record<keyof DataDiri, string>>>({});
  const [jawabanErrors, setJawabanErrors] = useState<Partial<Record<keyof JawabanKuesioner, boolean>>>(
    {}
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateDataDiri = () => {
    const errors: Partial<Record<keyof DataDiri, string>> = {};
    if (!dataDiri.nama.trim()) errors.nama = "Nama lengkap wajib diisi.";
    if (!dataDiri.usia.trim()) {
      errors.usia = "Usia wajib diisi.";
    } else if (Number(dataDiri.usia) <= 0) {
      errors.usia = "Usia tidak valid.";
    }
    if (dataDiri.asalMode === "desa" && !dataDiri.asalDesa) {
      errors.asalDesa = "Silakan pilih desa asal Anda.";
    }
    if (dataDiri.asalMode === "karang_taruna" && !dataDiri.asalKarangTaruna.trim()) {
      errors.asalKarangTaruna = "Nama Karang Taruna wajib diisi.";
    }
    if (!dataDiri.jenisKelamin) errors.jenisKelamin = "Silakan pilih jenis kelamin.";

    setDataDiriErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateDataDiri()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const validateJawaban = () => {
    const errors: Partial<Record<keyof JawabanKuesioner, boolean>> = {};
    (["q1", "q2", "q3", "q4", "q5", "q6", "q7"] as const).forEach((key) => {
      if (jawaban[key] === null) errors[key] = true;
    });
    setJawabanErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    if (!validateJawaban()) {
      setSubmitError("Mohon lengkapi seluruh pertanyaan wajib sebelum mengirim.");
      return;
    }

    const payload: SurveyPayload = {
      timestamp: new Date().toISOString(),
      nama: dataDiri.nama.trim(),
      usia: dataDiri.usia,
      asal: dataDiri.asalMode === "desa" ? dataDiri.asalDesa : dataDiri.asalKarangTaruna.trim(),
      jenis_kelamin: dataDiri.jenisKelamin,
      q1: jawaban.q1 as number,
      q2: jawaban.q2 as number,
      q3: jawaban.q3 as number,
      q4: jawaban.q4 as number,
      q5: jawaban.q5 as number,
      q6: jawaban.q6 as number,
      q7: jawaban.q7 as number,
      saran: jawaban.saran.trim()
    };

    setSubmitting(true);
    try {
      await submitSurvey(payload);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim jawaban. Silakan coba lagi."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24">
      <div className="absolute inset-0 -z-10 terrace-texture text-forest-200 dark:text-nightforest-surface2" />
      <FloatingShapes className="opacity-60" />

      <div className="relative mx-auto max-w-2xl px-6">
        {!success && (
          <>
            <div className="mb-10 text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-clay dark:text-turmeric-light">
                Evaluasi Peserta
              </span>
              <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Kuesioner Program
              </h1>
            </div>
            <div className="mb-10">
              <StepIndicator step={step} />
            </div>
          </>
        )}

        {success ? (
          <SuccessState />
        ) : step === 1 ? (
          <DataDiriStep
            data={dataDiri}
            onChange={setDataDiri}
            onNext={handleNext}
            errors={dataDiriErrors}
          />
        ) : (
          <KuesionerStep
            jawaban={jawaban}
            onChange={setJawaban}
            onBack={() => {
              setStep(1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSubmit={handleSubmit}
            errors={jawabanErrors}
            submitting={submitting}
            submitError={submitError}
          />
        )}
      </div>
    </section>
  );
}
