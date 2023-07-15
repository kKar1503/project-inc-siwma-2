import { VictoryLabel, VictoryPortal } from 'victory';

export interface TitleProps {
  title: string;
  subtitle?: string;
  x?: number;
  y?: number;
  primarySize?:number;
  secondaySize?:number;
}

const Title = (
  {
    title,
    subtitle,
    x = 0,
    y = 10,
    primarySize = 17,
    secondaySize = 13,
  }: TitleProps) =>
  <VictoryPortal>
    <>
      <VictoryLabel
        textAnchor='start'
        style={{ fontSize: primarySize, fontWeight: 'bold' }}
        x={x} y={y}
        text={title}
      />
      <VictoryLabel
        textAnchor='start'
        style={{ fontSize: secondaySize, color: 'text.secondary' }}
        x={x} y={y + 20}
        text={subtitle}
      />
    </>
  </VictoryPortal>;

export default Title;
