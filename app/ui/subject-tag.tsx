import { SUBJECT_BG_COLORS, SUBJECT_BORDER_COLORS, SUBJECTS_COLORS_1 } from "../lib/utils";

export default function SubjectTag({ subject }: { subject: string }) {
  return <div className={`${SUBJECT_BG_COLORS[subject]} cursor-pointer  ${SUBJECTS_COLORS_1[subject]} ${SUBJECT_BORDER_COLORS[subject]} border text-xs truncate  font-medium mr-2 px-1.5 rounded-full py-[2px]`}>
      {subject}
    </div>;
}