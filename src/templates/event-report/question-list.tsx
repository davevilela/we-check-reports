import orderBy from "lodash.orderby";
import {
  QuestionContext,
  useQuestion,
  useReport,
  useSection,
} from "./hooks/use-context";

function QuestionComment() {
  const question = useQuestion();

  if (!question?.answers?.[0]?.comment) return <></>;

  return (
    <div className="flex flex-col gap-2 text-sm text-slate-700">
      <span className="mr-2">Notas: </span>
      <div className="rounded border border-slate-300 p-2 text-start">
        <span>{question?.answers?.[0]?.comment}</span>
      </div>
    </div>
  );
}

function QuestionReaction(props: { type: "like" | "dislike"; count: number }) {
  const { count = 0, type } = props;
  const label = type === "dislike" ? "Dislikes" : "Likes";

  const variants = {
    like: ["border-green-600", "bg-green-300", "text-green-800"],
    dislike: ["border-red-600", "bg-red-300", "text-red-800"],
  };

  return (
    <span
      className={`mr-2 rounded border px-2.5 py-0.5 text-sm font-medium ${variants[
        type
      ].join(" ")}`}
    >{`${count} ${label}`}</span>
  );
}

function QuestionReactions() {
  const question = useQuestion();

  if (!question.likes && !question.dislikes) return <></>;

  return (
    <div className="flex flex-row gap-2">
      <QuestionReaction count={question.likes || 0} type="like" />
      <QuestionReaction count={question.dislikes || 0} type="dislike" />
    </div>
  );
}

function QuestionScore() {
  const { header } = useReport();
  const question = useQuestion();

  if (!question.answers[0]?.score || header.hide_score) return <></>;

  return (
    <div className="text-sm text-slate-700">
      <span className="mr-2">Peso da pergunta: {question.weight}</span>
      <span>Pontuação obtida: {question.score_obtained}</span>
    </div>
  );
}

function QuestionHeader() {
  const { header } = useReport();
  const question = useQuestion();
  return (
    <div className="flex flex-col gap-0 border-b border-gray-300 pb-2">
      <h2 className="text-sm font-semibold">{question.name}</h2>

      <QuestionScore />
    </div>
  );
}

export function QuestionItem({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-md bg-white p-4">
      <QuestionHeader />
      {!!children && (
        <div className=" rounded-md border-[1px] border-slate-300 p-3">
          {children}
        </div>
      )}
      <QuestionReactions />
      <QuestionComment />
    </div>
  );
}

export function QuestionList({ children }: { children?: React.ReactNode }) {
  const { questions } = useSection();

  return (
    <div className="flex w-full flex-col gap-6 p-1">
      {orderBy(questions, "position", "asc").map((question, idx) => (
        <QuestionContext value={question} key={`${question.name}-${idx}`}>
          <QuestionItem>{children}</QuestionItem>
        </QuestionContext>
      ))}
    </div>
  );
}
