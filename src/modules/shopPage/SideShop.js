import env from "../../env"
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';
  import 'react-accessible-accordion/dist/fancy-example.css';

function SideShop(props){
    const  category = props.category;
    const handleInput=(e)=>{
    console.log(e)
}
    return(
        <div className="categorySide">
            <h3>فروشگاه</h3>
    <Accordion preExpanded={['0']} allowZeroExpanded>
            <AccordionItem uuid={'0'}>
                <AccordionItemHeading>
                    <AccordionItemButton >
                        بر اساس محصول
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className="sideBarFilters">
                      <ul>
                      {category.productCategories.nodes.map((cats,i)=>(
                        <li key={i}>
                            <div className="filterShop">{cats.name}</div>
                        </li>
                        ))}
                    </ul>
                    </div>
                </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem uuid={'1'}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        برند
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        In ad velit in ex nostrud dolore cupidatat consectetur
                        ea in ut nostrud velit in irure cillum tempor laboris
                        sed adipisicing eu esse duis nulla non.
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
        </Accordion>
        </div>
    )
}
export default SideShop