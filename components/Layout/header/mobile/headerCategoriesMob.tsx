import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { GrClose } from "react-icons/gr";
import { FiInfo, FiGitBranch, FiPhoneCall } from "react-icons/fi";
import { BiNews, BiEnvelope } from "react-icons/bi";
import { MdExpandMore, MdContacts } from "react-icons/md";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { useTypedSelector } from "../../../../store/hooks/useTypedSelector";
import Link from "next/link";

interface HeaderMobileProps {
  open: boolean;
  onMenuOpen(anchor: string): void;
  anchor?: string;
  deviceWidth?: number;
}

const HeaderCategoriesMob: React.FC<HeaderMobileProps> = ({
  open,
  onMenuOpen,
  anchor = "left",
  deviceWidth,
}) => {
  const useStyles = makeStyles({
    list: {
      width: deviceWidth ? (deviceWidth <= 768 ? 300 : 500) : 300,
    },
    accordion: {
      border: "none",
      boxShadow: "none",
      width: "100%",
    },
    listItem: {
      padding: 0,
    },
    accordionSummary: {
      minHeight: 35,
      transition: "all 250ms ease",
      "&:hover, &:focus": {
        // backgroundColor: '#F9CC00',
        backgroundColor: "#fff212",
      },
    },
    accordionDetail: {
      padding: "0px 16px 0px 16px",
      flexDirection: "column",
    },
    typography: {},
    heading: {
      padding: "0 16px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: "16px 0 30px 0",
    },
    itemText: {
      fontSize: "0.95rem",
      paddingLeft: 15,
      margin: "10px 0",
      fontWeight: "bold",
    },
  });

  const classes = useStyles();
  const { categories } = useTypedSelector((state) => state.category);
  const contacts = useTypedSelector((state) => state.contacts);
  const LinkProps = {
    onClick: () => onMenuOpen(anchor),
    className: classes.itemText,
  };

  const toggleDrawer =
    (anchor: string) =>
    (
      event:
        | React.KeyboardEvent
        | React.MouseEvent
        | React.TouchEvent
        | React.FocusEvent
    ) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      onMenuOpen(anchor);
    };

  const listLeft = () => (
    <div
      className={classes.list}
      role="presentation"
      // onClick={toggleDrawer()}
      // onKeyDown={toggleDrawer()}
    >
      <List className="pb-0">
        <h4 className={classes.heading}>
          Категории{" "}
          <div onClick={() => onMenuOpen(anchor)}>
            <GrClose />
          </div>
        </h4>
        {categories.map((category, i) => (
          <ListItem
            className={classes.listItem}
            // button -> when true it will add background
            key={i}
          >
            {category.childs?.length ? (
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  className={classes.accordionSummary}
                  expandIcon={<MdExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.typography}>
                    {category.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetail}>
                  <div {...LinkProps}>
                    <Link href={`/catalog/${category.slug}`}>
                      <a>Показать все</a>
                    </Link>
                  </div>
                  {category.childs.map((child, idx) => (
                    <div key={`${i}-${idx}`} {...LinkProps}>
                      <Link href={`/catalog/${child.slug}`}>
                        <a>{child.name}</a>
                      </Link>
                    </div>
                  ))}
                </AccordionDetails>
              </Accordion>
            ) : (
              <div key={i} {...LinkProps}>
                <Link href={`/catalog/${category.slug}`}>
                  <a>
                    <ListItemText primary={category.name} />
                  </a>
                </Link>
              </div>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  const rightSideLinks = [
    // {
    //   link: "constructor",
    //   name: "Конструктор",
    //   icon: <FiInfo />,
    // },
    {
      link: "about",
      name: "О нас",
      icon: <FiInfo />,
    },
    {
      link: "branches",
      name: "Филиалы",
      icon: <FiGitBranch />,
    },
    {
      link: "news",
      name: "Новости",
      icon: <BiNews />,
    },
    {
      link: "contact",
      name: "Контакты",
      icon: <MdContacts />,
    },
  ];

  const listRight = () => (
    <div className={classes.list} role="presentation">
      <List className="pb-0">
        {rightSideLinks.map((rlink, i) => (
          <ListItem key={i} className={classes.listItem}>
            <div {...LinkProps} style={{ paddingLeft: 24 }}>
              <Link href={`/${rlink.link}`}>
                <a>
                  <div className="d-flex align-items-center">
                    {rlink.icon}{" "}
                    <ListItemText className="ml-2" primary={rlink.name} />
                  </div>
                </a>
              </Link>
            </div>
          </ListItem>
        ))}

        <ListItem className={classes.listItem}>
          <div {...LinkProps} style={{ paddingLeft: 24 }}>
            {/* <a href={`tel:${contacts.supportPhoneNumber}`}>
              <div className="d-flex align-items-center">
                <FiPhoneCall />{" "}
                <ListItemText
                  className="ml-2"
                  // primary={contacts.supportPhoneNumber}
                />
              </div>
            </a> */}
          </div>
        </ListItem>

        <ListItem className={classes.listItem}>
          <div {...LinkProps} style={{ paddingLeft: 24 }}>
            {/* <a href={`mailto:${contacts.email}`}>
              <div className="d-flex align-items-center">
                <BiEnvelope />{" "}
                <ListItemText className="ml-2" primary={`${contacts.email}`} />
              </div>
            </a> */}
          </div>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer
        // @ts-ignore
        anchor={anchor ? anchor : "left"}
        open={open}
        disableSwipeToOpen={true}
        onClose={toggleDrawer(anchor)}
        onOpen={toggleDrawer(anchor)}
      >
        {anchor === "left" ? listLeft() : listRight()}
      </SwipeableDrawer>
    </div>
  );
};

export default HeaderCategoriesMob;
