import React from "react";
import { GENERAL_HOME_LANG } from "../../lang";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import ShopsMenuBar from "../../components/ShopsMenuBar";
import { Card } from "primereact/card";
import BottomNav from "../../components/BottomNav";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Link } from "react-router-dom";

export default function FAQ({}) {
  const lang = useSelector((state: RootState) => state.preferences.lang);

  return (
    <div>
      <ShopsMenuBar />

      <div className="p-3">
        <Card title={GENERAL_HOME_LANG[4][lang]}>
          <Accordion activeIndex={0}>
            <AccordionTab header={GENERAL_HOME_LANG[60][lang]}>
              <p className="m-0 mb-2">{GENERAL_HOME_LANG[61][lang]}</p>
              <p className="m-0">{GENERAL_HOME_LANG[62][lang]}</p>
            </AccordionTab>
            <AccordionTab header={GENERAL_HOME_LANG[63][lang]}>
              <h3 className="m-0 font-bold">{GENERAL_HOME_LANG[64][lang]}</h3>

              <a href="https://forms.gle/ADXEpHzbR1NBk1QYA">
                <p className="m-0 mb-2">{GENERAL_HOME_LANG[65][lang]}</p>
              </a>

              <h3 className="m-0 font-bold">{GENERAL_HOME_LANG[66][lang]}</h3>
              <Link to={"/userguide"}>
                <p className="m-0 mb-2">{GENERAL_HOME_LANG[67][lang]}</p>
              </Link>
              <h3 className="m-0 font-bold">{GENERAL_HOME_LANG[68][lang]}</h3>
              <p className="m-0 mb-2">{GENERAL_HOME_LANG[69][lang]}</p>
              <h3 className="m-0 font-bold">{GENERAL_HOME_LANG[70][lang]}</h3>
              <p className="m-0 mb-2">{GENERAL_HOME_LANG[71][lang]}</p>
            </AccordionTab>
            <AccordionTab header={GENERAL_HOME_LANG[72][lang]}>
              <p className="m-0">{GENERAL_HOME_LANG[73][lang]}</p>
              <p className="m-0">{GENERAL_HOME_LANG[74][lang]}</p>
              <p className="m-0">{GENERAL_HOME_LANG[75][lang]}</p>
            </AccordionTab>
            <AccordionTab header={GENERAL_HOME_LANG[76][lang]}>
              <p className="m-0 mb-2">{GENERAL_HOME_LANG[77][lang]}</p>
              <p className="m-0 mb-2">{GENERAL_HOME_LANG[78][lang]}</p>
              <p className="m-0">{GENERAL_HOME_LANG[79][lang]}</p>
            </AccordionTab>
            <AccordionTab header={GENERAL_HOME_LANG[80][lang]}>
              <p className="m-0">{GENERAL_HOME_LANG[81][lang]}</p>
            </AccordionTab>
          </Accordion>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
