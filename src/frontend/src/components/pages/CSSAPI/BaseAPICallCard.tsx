import React, { ReactNode } from 'react';
import { Stack, Card, Txt } from "components/common";

type BaseAPICallCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export const BaseAPICallCard = (props: BaseAPICallCardProps) => {
	return (
    <Card paddingY="10px" color={`var(--bcgov_lighter-blue4)`}>
			<Stack>
				<Stack direction="row">
						<Txt bold>{props.title}</Txt>
						<Txt>{props.description}</Txt>
				</Stack>
				<hr />
				{props.children}
			</Stack>
		</Card>
	);
};
