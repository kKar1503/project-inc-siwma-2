import { VictoryLabel } from 'victory';

export interface TitleProps {
  title: string;
  subtitle?: string;
  x?: number;
  y?: number;
}

const Title = (
  {
    title,
    subtitle,
    x = 0,
    y = 10,
  }: TitleProps) =>
  <>
    <VictoryLabel
      textAnchor='start'
      style={{ fontSize: 20, fontWeight: 'bold' }}
      x={x} y={y}
      text={title}
    />
    <VictoryLabel
      textAnchor='start'
      style={{ fontSize: 14, color: 'text.secondary' }}
      x={x} y={y + 20}
      text={subtitle}
    />
  </>;

export default Title;
