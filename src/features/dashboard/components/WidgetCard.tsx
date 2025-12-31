import type { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "../../../shared/Card";

export default function WidgetCard({
  title,
  subtitle,
  right,
  children,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} right={right} />
      <CardBody>{children}</CardBody>
    </Card>
  );
}
