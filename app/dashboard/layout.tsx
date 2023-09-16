import { Navigator } from "../../components/navigator/Navigator";
import { ReactNode } from "react";
import styles from "../../components/navigator/Navigator.module.scss";

const NavigatorLayout = (props: { children: ReactNode }) => {
  return (
    <div>
      <Navigator>
        <div className={styles.childrenWrapper}>{props.children}</div>
      </Navigator>
    </div>
  );
};

export default NavigatorLayout;
