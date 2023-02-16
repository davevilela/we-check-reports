import { Badge } from "src/components/badge";
import { Table, Td } from "src/components/table";
import { useReport } from "./hooks/use-context";

function ReportDetails() {
  const { header } = useReport();

  if (!header) return null;

  const {
    event_type,
    event_name,
    event_date_time,
    author_email,
    hide_score,
    score_obtained,
    total_score,
    local,
    percent_score,
    fantasy_name,
    company_name,
    address,
    document: companyDocument,
  } = header;

  return (
    <div className="w-full text-sm font-bold">
      <Table>
        <tbody>
          <tr>
            <Td>Tipo do evento</Td>
            <Td>{event_type}</Td>
          </tr>
          <tr>
            <Td>Nome do evento</Td>
            <Td>{event_name}</Td>
          </tr>

          <tr>
            <Td>Data e hora</Td>
            <Td>{event_date_time}</Td>
          </tr>

          <tr>
            <Td>Autor</Td>
            <Td>{author_email}</Td>
          </tr>

          {!hide_score && (
            <tr>
              <Td>Pontuação do checklist</Td>
              <Td>
                {score_obtained} / {total_score} - {percent_score}%
              </Td>
            </tr>
          )}

          {!!local && (
            <tr>
              <Td>Local do evento:</Td>
              <Td>
                {` ${local.name}`}
                {local.address ? `, ${local.address}` : null}
                {local.city ? `, ${local.city}` : null}
                {local.state ? `, ${local.state}` : null}
              </Td>
            </tr>
          )}

          {!(!header.company_name || !header.fantasy_name) && (
            <tr>
              <Td>Dados da empresa:</Td>
              <Td>
                {fantasy_name ? ` ${fantasy_name}` : ""}
                {company_name ? ` - ${company_name}` : ""}
                {companyDocument ? `, ${companyDocument}` : ""}
                {address ? `, ${address}` : ""}
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export function Header() {
  const { header } = useReport();

  if (!header) return null;

  return (
    <div className="prose flex w-full flex-col gap-10 text-slate-700">
      <img className="h-auto w-36" src={header.logo} alt="logo" />
      <h1 className="text-4xl font-medium leading-tight ">
        {header.event_name}
      </h1>

      <div>
        <span className="mr-2">Status:</span>
        <Badge>Completa</Badge>
      </div>
      <ReportDetails />
    </div>
  );
}
