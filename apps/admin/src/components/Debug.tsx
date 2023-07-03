interface Props {
  children: unknown;
}


const Debug = ({ children }:Props) => (
    <div style={{ border: '1px solid red', width: '100%', height: '100%' }}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment,spaced-comment */}
      {/*// @ts-ignore*/}
      {children}
    </div>
  );

// eslint-disable-next-line react/jsx-no-useless-fragment
const NoDebug = ({ children }: Props) => <>{children}</>;


export default NoDebug;
