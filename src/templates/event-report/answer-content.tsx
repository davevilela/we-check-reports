/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @next/next/no-img-element */
import orderBy from "lodash.orderby";
import { useQuestion } from "./hooks/use-context";
import type {
  AnswerData,
  CollectionItemData,
  CollectionItemPropertiesData,
} from "./types";

function CollectionItem(props: { collectionItem: CollectionItemData }) {
  const { collectionItem } = props;

  const renderProperty = (property: CollectionItemPropertiesData) => {
    return (
      <div
        key={property.name}
        className="flex flex-row content-center justify-start text-xs"
      >
        <span className="mr-2">{property.name}</span>
        <span>{property.content}</span>
      </div>
    );
  };

  return (
    <div className="font-xs items-start justify-start border border-slate-50 p-2 font-semibold">
      <p>Nome: {collectionItem.name}</p>
      <p>Coleção: {collectionItem.collection}</p>
      <p>Descrição: {collectionItem.description}</p>
      <p>Código: {collectionItem.code}</p>

      {collectionItem.properties.map((property) => renderProperty(property))}
    </div>
  );
}

function CollectionContent() {
  const { answers } = useQuestion();

  const renderItem = (answer: AnswerData) => {
    const { id, collection_item } = answer;
    return <CollectionItem key={id} collectionItem={collection_item} />;
  };

  return (
    <div className="flex h-full flex-col items-start justify-start gap-2">
      {answers.map((answer) => renderItem(answer))}
    </div>
  );
}

function CheckboxContent() {
  const { answers } = useQuestion();

  const renderItem = (item: AnswerData) => {
    return (
      <li className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center pl-3" key={item.id}>
          <input
            type="checkbox"
            defaultChecked
            className="bg-gray-10 pointer-events-none h-5 w-5 rounded border-gray-300 focus:ring-2"
          />
          <label className="ml-2 w-full py-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {item.option}
          </label>
        </div>
      </li>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <ul className="w-48 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
        {answers.map((answer) => renderItem(answer))}
      </ul>
    </div>
  );
}

function DefaultContent() {
  const { answers } = useQuestion();

  const answer = answers[0];

  return <p>{answer?.content}</p>;
}

function GalleryContent() {
  const { answers } = useQuestion();

  const renderItem = (answer: AnswerData) => {
    return (
      <img
        key={answer.id}
        className="mb-4 aspect-auto h-auto rounded-md"
        src={`${answer.content}`}
        alt="img"
      />
    );
  };

  return (
    <div className="columns-3 gap-8">
      {orderBy(answers, "position", "asc").map((answer) => renderItem(answer))}
    </div>
  );
}

export function AnswerContent() {
  const question = useQuestion();
  switch (question.type) {
    case "gallery":
    case "picture":
    case "signature":
    case "geolocation":
      return <GalleryContent />;

    case "checkbox":
    case "checkbox_combo":
    case "radio":
    case "radio_combo":
      return <CheckboxContent />;

    case "collections":
      return <CollectionContent />;

    default:
      return <DefaultContent />;
  }
}
