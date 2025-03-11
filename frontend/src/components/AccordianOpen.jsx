import {useState} from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

export default function AccordianOpen({title, content}) {
  const [openAcc1, setOpenAcc1] = useState(true);

  const handleOpenAcc1 = () => setOpenAcc1((cur) => !cur);
  console.log(Array.isArray(content));
  console.log(typeof content);
  return (
    <>
      <Accordion open={openAcc1}>
        <AccordionHeader onClick={handleOpenAcc1}>{title}</AccordionHeader>
        {Array.isArray(content) ? (
          content.map((item, index) => {
            console.log(item);
            return (
              <div key={index}>
                <AccordionBody>
                  I worked in {item.company} as a{" "}
                  {item.title ? item.title : "N/A"} for {item.years} years
                </AccordionBody>
              </div>
            );
          })
        ) : (
          <>
            <AccordionBody>{content}</AccordionBody>
          </>
        )}
      </Accordion>
    </>
  );
}
