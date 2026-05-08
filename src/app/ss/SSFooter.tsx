export default function SSFooter() {
  return (
    <footer id="kontakt" className="px-6 sm:px-10 mt-10 sm:mt-14">
      <div className="max-w-3xl mx-auto rounded-2xl bg-[#111] px-8 sm:px-12 py-8 sm:py-10">
        <h2 className="text-lg font-medium text-white tracking-tight mb-2">
          Interessert?
        </h2>
        <p className="text-sm text-[#999] leading-relaxed mb-5">
          Me tar gjerne ein uforpliktande prat om kva me kan bidra med hjå dykk.
        </p>
        <a
          href="mailto:hei@selsengsystaddal.no"
          className="inline-flex items-center gap-2 text-sm text-[#111] bg-white rounded-full px-5 py-2.5 hover:bg-[#eee] transition-colors"
        >
          Book eit innsiktsmøte <span>&rarr;</span>
        </a>
        <p className="text-xs text-[#666] mt-10">
          &copy; {new Date().getFullYear()} Selseng & Systaddal AS
        </p>
      </div>
      <div className="h-6 sm:h-10" />
    </footer>
  );
}
