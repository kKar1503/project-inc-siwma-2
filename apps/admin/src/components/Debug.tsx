interface Props {
  children: JSX.Element | string;
}

const Debug = ({ children }:Props) => (
    <div style={{ border: '1px solid red', width: '100%', height: '100%' }}>
      {children}
    </div>
  );

// eslint-disable-next-line react/jsx-no-useless-fragment
const NoDebug = ({ children }: Props) => <>{children}</>;


export default Debug;
