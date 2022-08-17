import React, { useState, useEffect } from "react";
import cls from "./constructor.module.scss";
import {
  API_GetColors,
  API_GetFrames,
  API_GetGroups,
  API_GetMechanisms,
  API_GetCollections,
  API_GetMaterials,
  API_GetSingleFrame,
  API_AddToCart,
} from "../../api/constructor";
import Select from "react-select";
import Loader from "./components/Loader";
import Bottom from "./components/Bottom";

const Constructor = () => {
  const [colorMechanisms, setColorMechanisms] = useState([]);
  const [colorMechanism, setColorMechanism] = useState("");
  const [colorFrames, setColorFrames] = useState([]);
  const [colorFrame, setColorFrame] = useState("");

  const [frames, setFrames] = useState([]);
  const [framePage, setFramePage] = useState(1);
  const [isFramePaginated, setIsFramePaginated] = useState(true);
  const [isFramesLoading, setIsFramesLoading] = useState(false);
  const [chosenFrame, setChosenFrame] = useState({});

  const [mechanisms, setMechanisms] = useState([]);
  const [mechanismPage, setMechanismPage] = useState(1);
  const [isMechanismPaginated, setIsMechanismPaginated] = useState(true);
  const [isMechanismsLoading, setIsMechanismsLoading] = useState(false);
  const [chosenMechanisms, setChosenMechanisms] = useState([]);

  const [groups, setGroups] = useState([]);
  const [group, setGroup] = useState("");
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState("");
  const [materials, setMaterials] = useState([]);
  const [material, setMaterial] = useState("");

  const [activePost, setActivePost] = useState(1);
  const [selectedFrameId, setSelectedFrameId] = useState("");
  const [draggingElement, setDraggingElement] = useState({});
  const [frameHeight, setFrameHeight] = useState(150);
  const [frameWidth, setFrameWidth] = useState(150);
  const [framePosition, setFramePosition] = useState("horizontal");
  const [framePositionClass, setFramePositionClass] = useState(cls.horizontal);
  const [activeOrientationClass, setActiveOrientationClass] = useState(
    cls.myRadio__item_active
  );

  const [frameImage, setFrameImage] = useState({});
  const [isFrameImageLoading, setIsFrameImageLoading] = useState(false);

  const [numberOfPositions, setNumberOfPositions] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const themeCustom = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      neutral0: "#fafafa",
      primary: "#FFF212",
      // neutral10: '#000000',
      primary25: "#FFFBB3",
      primary50: "#FFF212",
      primary75: "#FFF212",
    },
  });

  //   Inputs work together
  useEffect(() => {
    setFramePage(1);
    setMechanismPage(1);
    const frames = document.getElementsByClassName(`${cls.frame__place}`);
    Array.from(frames).forEach((el) => {
      el.style.backgroundImage = "";
    });
    setFrameImage({});
    API_GetFrames(1, collection?.value, colorFrame?.value, material?.value)
      .then((res) => {
        setIsFramePaginated(Boolean(res.data?.links?.next));
        setFrames(res.data.data);
      })
      .catch((err) => {});
    API_GetMechanisms(1, collection?.value, colorMechanism?.value, group?.value)
      .then((res) => {
        setIsMechanismPaginated(Boolean(res.data?.links?.next));
        setMechanisms(res.data.data);
      })
      .catch((err) => {});
    API_GetCollections()
      .then((res) => {
        setCollections(res.data);
      })
      .catch((err) => {});
    API_GetColors("frames", collection?.value, group?.value)
      .then((res) => {
        setColorFrames(res.data);
      })
      .catch((err) => {});
    API_GetColors("mechanisms", collection?.value, group?.value)
      .then((res) => {
        setColorMechanisms(res.data);
      })
      .catch((err) => {});
    API_GetMaterials(collection?.value)
      .then((res) => {
        setMaterials(res.data);
      })
      .catch((err) => {});
    API_GetGroups(collection?.value, colorMechanism?.value)
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {});
  }, [collection?.value]);

  useEffect(() => {
    setFramePage(1);
    API_GetFrames(1, collection?.value, colorFrame?.value, material?.value)
      .then((res) => {
        setIsFramePaginated(Boolean(res.data?.links?.next));
        setFrames(res.data.data);
      })
      .catch((err) => {});
  }, [material?.value]);

  useEffect(() => {
    setFramePage(1);
    API_GetFrames(1, collection?.value, colorFrame?.value, material?.value)
      .then((res) => {
        setIsFramePaginated(Boolean(res.data?.links?.next));
        setFrames(res.data.data);
      })
      .catch((err) => {});
  }, [colorFrame?.value]);

  useEffect(() => {
    setMechanismPage(1);
    API_GetGroups(collection?.value, colorMechanism?.value)
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {});
    API_GetMechanisms(1, collection?.value, colorMechanism?.value, group?.value)
      .then((res) => {
        setIsMechanismPaginated(Boolean(res.data?.links?.next));
        setMechanisms(res.data.data);
      })
      .catch((err) => {});
  }, [colorMechanism?.value]);

  useEffect(() => {
    setMechanismPage(1);
    API_GetColors("mechanisms", collection?.value, group?.value)
      .then((res) => {
        setColorFrames(res.data);
      })
      .catch((err) => {});
    API_GetMechanisms(1, collection?.value, colorMechanism?.value, group?.value)
      .then((res) => {
        setIsMechanismPaginated(Boolean(res.data?.links?.next));
        setMechanisms(res.data.data);
      })
      .catch((err) => {});
  }, [group?.value]);

  //   Plus minus size at constructor
  const plusSize = () => {
    let max_height = 0;
    if (framePosition === "horizontal") {
      switch (activePost) {
        case 1:
          max_height = 320;
          break;
        case 2:
          max_height = 520;
          break;
        case 3:
          max_height = 600;
          break;
        case 4:
          max_height = 600;
          break;
        case 5:
          max_height = 600;
          break;
        default:
          break;
      }
    } else {
      switch (activePost) {
        case 1:
          max_height = 320;
          break;
        case 2:
          max_height = 330;
          break;
        case 3:
          max_height = 340;
          break;
        case 4:
          max_height = 320;
          break;
        case 5:
          max_height = 330;
          break;
        default:
          break;
      }
    }

    if (frameHeight < max_height) {
      setFrameWidth(frameWidth + 50);
      setFrameHeight(frameHeight + 50);
    }
  };
  const minusSize = () => {
    setFrameWidth(frameWidth - 50);
    setFrameHeight(frameHeight - 50);
  };

  // Change frame
  const changeOrientation = (position) => {
    setFramePosition(position);
    setFramePositionClass(cls[position]);
  };
  const changeLengths = (pos) => {
    // if (!frameImage?.client_width) {
    //   setIsFrameImageLoading(false);
    //   return;
    // }
    if (pos === "horizontal") {
      switch (activePost) {
        case 1:
          length = 200;
          break;
        case 2:
          length = 300;
          break;
        case 3:
          length = 400;
          break;
        case 4:
          length = 500;
          break;
        case 5:
          length = 600;
          break;
        default:
          break;
      }
    } else {
      switch (activePost) {
        case 1:
          length = 200;
          break;
        case 2:
          length = 300;
          break;
        case 3:
          length = 340;
          break;
        case 4:
          length = 320;
          break;
        case 5:
          length = 330;
          break;
        default:
          break;
      }
    }
    setFrameWidth(length);
    setFrameHeight(length);
    setIsFrameImageLoading(false);
  };

  // Select frame
  const selectFrame = (id, element) => {
    setIsFrameImageLoading(true);
    setSelectedFrameId(id);
    if (element) {
      setChosenFrame(element);
      console.log(element);
      setCollection({
        value: element?.collection?.id,
        label: element?.collection?.name,
      });
    }
    if (
      collection?.value !== element?.collection?.id &&
      element?.collection?.id
    ) {
      setChosenMechanisms([]);
    }
    API_GetSingleFrame(id, activePost)
      .then((res) => {
        if (res && res.data) {
          setFrameImage(res.data.data.image);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    changeLengths(framePosition);
  }, [frameImage]);

  useEffect(() => {
    selectFrame(selectedFrameId, null);
  }, [activePost]);

  // Select mechanism
  const onDragStart = (e, element) => {
    window.draggable = document.getElementById(`${element.id}mech`);
    setDraggingElement(element);
  };
  const onDragEnd = (e) => {
    delete window.draggable;
    setDraggingElement({});
  };
  const onDrop = (e, index) => {
    if (window.draggable && draggingElement?.connect) {
      const newMechanisms = [...chosenMechanisms];
      newMechanisms[index] = { ...draggingElement };
      setChosenMechanisms(newMechanisms);
      e.target.classList.remove(cls.hovered);
    }
  };
  const onDragEnter = (e) => {
    e.preventDefault();
    if (window.draggable) {
      e.target.classList.add(cls.hovered);
    }
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDragLeave = (e) => {
    e.target.classList.remove(cls.hovered);
  };
  const addMechanismToFrame = (e, element) => {
    let setted = false;
    const newMechanisms = chosenMechanisms.map((mech) => {
      if (!mech?.connect && !setted) {
        setted = true;
        return element;
      }
      return mech;
    });
    setChosenMechanisms(newMechanisms);
    if (!setted) {
      if (chosenMechanisms.length < activePost) {
        setChosenMechanisms([...chosenMechanisms, element]);
        return;
      }
    }
  };
  const removeMechanicsFromFrame = (e, htmlId, id) => {
    document.getElementById(`x-${htmlId}`).style.opacity = 0;
    const newMechanisms = chosenMechanisms.map((el, index) => {
      if (index === id) {
        return {};
      }
      return el;
    });
    setChosenMechanisms(newMechanisms);
  };

  // Infinity scroll
  const getNextPageFrames = (e) => {
    if (e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight) {
      if (!isFramePaginated || isFramesLoading) {
        return;
      }
      setIsFramesLoading(true);
      API_GetFrames(
        framePage + 1,
        collection?.value,
        colorFrame?.value,
        material?.value
      ).then((res) => {
        setIsFramesLoading(false);
        setFramePage(framePage + 1);
        setIsFramePaginated(Boolean(res.data?.links?.next));
        setFrames([...frames, ...res.data.data]);
      });
    }
  };
  const getNextPageMechanisms = (e) => {
    if (e.target.scrollTop === e.target.scrollHeight - e.target.clientHeight) {
      if (!isMechanismPaginated || isMechanismsLoading) {
        return;
      }
      setIsMechanismsLoading(true);

      API_GetMechanisms(
        mechanismPage + 1,
        collection?.value,
        colorMechanism?.value,
        group?.value
      ).then((res) => {
        setIsMechanismsLoading(false);
        setMechanismPage(mechanismPage + 1);
        setIsMechanismPaginated(Boolean(res.data?.links?.next));
        setMechanisms([...mechanisms, ...res.data.data]);
      });
    }
  };
  // Calculations
  useEffect(() => {
    calculatePrice();
  }, [activePost, chosenFrame, chosenMechanisms]);
  const calculatePrice = () => {
    let numOfPos = 0;
    let price = 0;
    if (chosenFrame?.connect) {
      numOfPos++;
      price += +chosenFrame.connect.price * activePost;
    }
    chosenMechanisms.forEach((el) => {
      if (el?.connect) {
        numOfPos++;
        price += el.connect?.price;
      }
    });
    setNumberOfPositions(numOfPos);
    setTotalPrice(price);
  };
  const addToCart = () => {
    API_AddToCart([1, 2]);
  };

  // Styled selects
  const parseCollectionOptions = () =>
    collections.map((item) => ({ value: item.id, label: item.name }));
  const parseColorFrameOptions = () =>
    colorFrames.map((item) => ({ value: item.id, label: item.name }));
  const parseMaterialOptions = () =>
    materials.map((item) => ({ value: item.id, label: item.name }));
  const parseGroupOptions = () =>
    groups.map((item) => ({ value: item.id, label: item.name }));
  const parseColorMechanismOptions = () =>
    colorMechanisms.map((item) => ({ value: item.id, label: item.name }));

  return (
    <div className={cls.configurator} style={{ display: "block" }}>
      <div
        className={cls.configuratorMain}
        style={{
          maxWidth: "1220px",
          paddingRight: "20px",
          paddingLeft: "20px",
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <div className={cls.config__topLeft}>
          <h1
            className={`${cls.config__title} js-call-popup`}
            data-target="popup-config"
            style={{ textTransform: "uppercase" }}
          >
            КОНФИГУРАТОР РАМОК И МЕХАНИЗМОВ
          </h1>

          <div className={`config-settings ${cls.config__settings}`}>
            <div className={cls.configSettings__blocks}>
              <div className={cls.configSettings__block}>
                <div className={cls.configSettings__title}>
                  ОРИЕНТАЦИЯ РАМКИ
                </div>
                <div className={cls.configSettings__content}>
                  <div
                    className={`${cls.frameOrientation} ${cls.myRadio}`}
                    data-configurator-param=""
                    data-type="orientation"
                  >
                    <div
                      className={`${cls.frameOrientation__block} ${
                        cls.myRadio__item
                      } ${
                        framePosition === "horizontal" && activeOrientationClass
                      }`}
                      data-configurator-button=""
                      onClick={() => changeOrientation("horizontal")}
                    >
                      <div className={cls.frameOrientation__horiz}></div>
                    </div>
                    <div
                      className={`${cls.frameOrientation__block} ${
                        cls.myRadio__item
                      } ${
                        framePosition === "vertical" && activeOrientationClass
                      }`}
                      data-configurator-button=""
                      onClick={() => changeOrientation("vertical")}
                    >
                      <div className={cls.frameOrientation__vert}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`${cls.configSettings__block} ${cls.configSettings__block_posts}`}
              >
                <div className={`${cls.configSettings__title}`}>
                  КОЛИЧЕСТВО{" "}
                  <span className="js-qt-posts-title" data-value="post">
                    ПОСТОВ
                  </span>
                </div>
                <div className={cls.configSettings__content}>
                  <div className={`${cls.postsNumber} ${cls.myRadio}`}>
                    <div
                      className={`${cls.postsNumber__block} ${
                        cls.myRadio__item
                      } ${activePost === 1 && activeOrientationClass}`}
                      onClick={() => setActivePost(1)}
                      style={{ display: "flex" }}
                    >
                      1
                    </div>
                    <div
                      className={`${cls.postsNumber__block} ${
                        cls.myRadio__item
                      } ${activePost === 2 && activeOrientationClass}`}
                      onClick={() => setActivePost(2)}
                      style={{ display: "flex" }}
                    >
                      2
                    </div>
                    <div
                      className={`${cls.postsNumber__block} ${
                        cls.myRadio__item
                      } ${activePost === 3 && activeOrientationClass}`}
                      onClick={() => setActivePost(3)}
                      style={{ display: "flex" }}
                    >
                      3
                    </div>
                    <div
                      className={`${cls.postsNumber__block} ${
                        cls.myRadio__item
                      } ${activePost === 4 && activeOrientationClass}`}
                      onClick={() => setActivePost(4)}
                      style={{ display: "flex" }}
                    >
                      4
                    </div>
                    <div
                      className={`${cls.postsNumber__block} ${
                        cls.myRadio__item
                      } ${activePost === 5 && activeOrientationClass}`}
                      onClick={() => setActivePost(5)}
                      style={{ display: "flex" }}
                    >
                      5
                    </div>
                  </div>
                </div>
              </div>

              <div className={cls.configSettings__block}>
                <div className={cls.configSettings__title}>МАСШТАБ</div>
                <div className={cls.configSettings__content}>
                  <div
                    className={`${cls.confZoom} ${cls.myRadio}`}
                    data-configurator-param=""
                    data-type="zoom"
                  >
                    <div
                      className={`${cls.confZoom__block} ${cls.myRadio__item}`}
                      onClick={minusSize}
                    >
                      -
                    </div>
                    <div
                      className={`${cls.confZoom__block} ${cls.myRadio__item}`}
                      onClick={plusSize}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cls.config__scene}>
            <div
              className={`${cls.config__view} ${cls.configMain} ${cls.layout}`}
            >
              <div data-configurator-wrap className={cls.config__wrap}>
                <div className={`${cls.configGrid} ${cls.config__grid}`}>
                  {!isFrameImageLoading ? (
                    <div
                      data-type="frame"
                      className={`${cls.configGrid__frame} ${cls.frame} ${framePositionClass}`}
                      style={{
                        maxHeight: `${frameHeight}px`,
                        maxWidth: `${frameWidth}px`,
                      }}
                    >
                      <div className={cls.frame__wrapper}>
                        <img
                          src={frameImage?.url}
                          // width={frameImage?.client_width}
                          // height={frameImage?.client_height}
                          width={frameImage && frameWidth}
                          height={frameImage && frameHeight}
                        />
                        {frameImage?.coords?.map((item, index) => {
                          const diff = frameWidth / frameImage.client_width;
                          const id = `frame-mechanics-${index}`;
                          const bgUrl = chosenMechanisms[index]?.image;
                          return (
                            <div
                              key={index}
                              id={id}
                              className={`${cls.frame__place}`}
                              style={{
                                top: item.y * diff,
                                left: item.x * diff,
                                width: item.w * diff,
                                height: item.h * diff,
                                backgroundImage: bgUrl ? `url(${bgUrl})` : "",
                              }}
                              onDrop={(e) => onDrop(e, index)}
                              onDragOver={(e) => onDragOver(e)}
                              onDragEnter={(e) => onDragEnter(e)}
                              onDragLeave={(e) => onDragLeave(e)}
                            >
                              {bgUrl && (
                                <div
                                  className={cls.place__remove}
                                  id={`x-${id}`}
                                  style={{ opacity: 0 }}
                                  onMouseEnter={(e) => {
                                    if (
                                      document.getElementById(id).style
                                        .backgroundImage === ""
                                    ) {
                                      return;
                                    }
                                    e.target.style.opacity = 1;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.opacity = 0;
                                  }}
                                  onClick={(e) =>
                                    removeMechanicsFromFrame(e, id, index)
                                  }
                                >
                                  <div className={cls.closeIcon}></div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <Loader width={120} height={120} />
                  )}
                  <div className="configurator-set"></div>
                </div>
              </div>

              <div data-configurator-bg className={cls.config__bg}></div>
            </div>
          </div>
        </div>
        <div className={cls.config__topRight}>
          <div className={cls.configPanel}>
            <div
              className={`${cls.configPanel__row} ${cls.configPanel__row_desktop}`}
            >
              <div className={`${cls.configPanel__column}`}>
                <div className={cls.configPanel__title}>выбор рамки</div>

                <div className={cls.configPanel__selectRow}>
                  <div
                    className={`${cls.configPanel__select} ${cls.selectFrameCollection} ${cls.airSelect} ${cls.airSelect_frame}`}
                  >
                    <Select
                      instanceId={"collection"}
                      className="my-select"
                      color={"yellow"}
                      value={collection}
                      onChange={(collec) => setCollection(collec)}
                      options={parseCollectionOptions()}
                      placeholder={"Коллекция"}
                      theme={(theme) => themeCustom(theme)}
                    />
                  </div>
                </div>

                <div
                  className={`${cls.configPanel__selectRow} ${cls.configPanel__selectRow_2}`}
                >
                  <div
                    className={`${cls.configPanel__select} ${cls.configPanel__select_color} ${cls.selectFrameColor} ${cls.airSelect} ${cls.airSelect_frame}`}
                  >
                    <Select
                      instanceId={"frame-color"}
                      className="my-select"
                      color={"yellow"}
                      value={colorFrame}
                      onChange={(colFr) => setColorFrame(colFr)}
                      options={parseColorFrameOptions()}
                      placeholder={"Цвет"}
                      theme={(theme) => themeCustom(theme)}
                    />
                  </div>

                  <div
                    className={`${cls.configPanel__select} ${cls.configPanel__select_flex} ${cls.selectFrameMaterial} ${cls.airSelect} ${cls.airSelect_frame}`}
                  >
                    <Select
                      instanceId={"frame-material"}
                      className="my-select"
                      color={"yellow"}
                      value={material}
                      onChange={(mat) => setMaterial(mat)}
                      options={parseMaterialOptions()}
                      placeholder={"Материал"}
                      theme={(theme) => themeCustom(theme)}
                    />
                  </div>
                </div>
              </div>

              <div className={`${cls.configPanel__column}`}>
                <div className={cls.configPanel__title}>выбор механизма</div>

                <div className={cls.configPanel__selectRow}>
                  <div
                    className={`${cls.configPanel__select} ${cls.selectMechCollection} ${cls.airSelect} ${cls.airSelect_mechanism}`}
                  >
                    <Select
                      instanceId={"mechanism-group"}
                      className="my-select"
                      color={"yellow"}
                      value={group}
                      onChange={(gr) => setGroup(gr)}
                      options={parseGroupOptions()}
                      placeholder={"Группа функций"}
                      theme={(theme) => themeCustom(theme)}
                    />
                  </div>
                </div>

                <div className={cls.configPanel__selectRow}>
                  <div
                    className={`${cls.configPanel__select} ${cls.configPanel__select_color} ${cls.selectMechColor} ${cls.airSelect} ${cls.airSelect_mechanism}`}
                  >
                    <Select
                      instanceId={"mechanism-color"}
                      className="my-select"
                      color={"yellow"}
                      value={colorMechanism}
                      onChange={(colMech) => setColorMechanism(colMech)}
                      options={parseColorMechanismOptions()}
                      placeholder={"Цвет"}
                      theme={(theme) => themeCustom(theme)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`${cls.configPanel__row} ${cls.configPanel__row_second}`}
            >
              <div className={`${cls.configPanel__column} ${cls.shadow}`}>
                <div className={`${cls.configGoods} ${cls.configGoods_frames}`}>
                  <div className={`${cls.configGoods__wrap}`}>
                    <div
                      className={`${cls.configFrame} ${cls.configGoods__top} ${cls.dataSimplebar}`}
                      data-simplebar="data-simplebar"
                      data-simplebar-auto-hide="false"
                    >
                      <div
                        className={cls.configFrame__list}
                        id="koll-list"
                        onScroll={(e) => getNextPageFrames(e)}
                      >
                        {frames?.map((element) => (
                          <div
                            key={element.id}
                            className={cls.configFrame__item}
                            onClick={(e) => selectFrame(element.id, element)}
                          >
                            <div className={`${cls.configFrame__left}`}>
                              <img
                                draggable="false"
                                className="js-set-frame lazy has-big-pic"
                                data-src={element.images[0].url}
                                src={element.images[0].url}
                              />
                            </div>
                            <div className={cls.configFrame__right}>
                              <div className="configFrame__title">
                                {element.collection?.name}
                              </div>
                              <div className={cls.configFrame__color}>
                                {element.subtitle}
                              </div>
                              <div className={cls.configFrame__posts}>
                                Пост: 1 &ndash; {element.posts}
                              </div>
                              <div className={cls.configFrame__price}>
                                {element.connect.price.toLocaleString()} cум.
                              </div>
                            </div>
                          </div>
                        ))}
                        {isFramesLoading && <Loader width={60} height={60} />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${cls.configPanel__column} ${cls.shadow}`}>
                <div
                  className={`${cls.configGoods} ${cls.configGoods_mechanisms}`}
                >
                  <div className={`${cls.configGoods__wrap}`}>
                    <div
                      className={`${cls.configFrame} ${cls.configGoods__top} ${cls.dataSimplebar}`}
                      data-simplebar="data-simplebar"
                      data-simplebar-auto-hide="false"
                    >
                      <div
                        className={cls.configFrame__list}
                        id="mex-list"
                        onScroll={(e) => getNextPageMechanisms(e)}
                      >
                        {mechanisms?.map((element) => (
                          <div
                            className={cls.configFrame__item}
                            key={element.id}
                            id={`${element.id}mech`}
                          >
                            <div className={cls.configFrame__left}>
                              <img
                                className="configFrame__preview js-draggable js-set-breaker lazy Inspiria has-big-pic"
                                data-src={element.image}
                                src={element.image}
                                draggable="true"
                                onDragStart={(e) => onDragStart(e, element)}
                                onDragEnd={(e) => onDragEnd(e)}
                                onClick={(e) => addMechanismToFrame(e, element)}
                              />
                            </div>

                            <div className={cls.configFrame__right}>
                              <div className={cls.configFrame__title}>
                                {element.collection?.name}
                              </div>
                              <div className={cls.configFrame__color}>
                                {element.subtitle}
                              </div>
                              <div className={cls.configFrame__price}>
                                {element.connect.price.toLocaleString()} сум.
                              </div>
                            </div>
                          </div>
                        ))}
                        {isMechanismsLoading && (
                          <div
                            className={cls.loade}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "absolute",
                              left: "30%",
                              width: "60px",
                              height: "60px",
                              backgroundColor: "rgba(255,255,255,0.8)",
                            }}
                          >
                            <svg
                              width={38}
                              height={38}
                              viewBox="0 0 38 38"
                              xmlns="http://www.w3.org/2000/svg"
                              stroke="#222f3e"
                            >
                              <g fill="none" fillRule="evenodd">
                                <g transform="translate(1 1)" strokeWidth="2">
                                  <circle
                                    strokeOpacity=".5"
                                    cx="18"
                                    cy="18"
                                    r="18"
                                  />
                                  <path d="M36 18c0-9.94-8.06-18-18-18">
                                    <animateTransform
                                      attributeName="transform"
                                      type="rotate"
                                      from="0 18 18"
                                      to="360 18 18"
                                      dur="1s"
                                      repeatCount="indefinite"
                                    />
                                  </path>
                                </g>
                              </g>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Bottom
        addToCart={addToCart}
        totalPrice={totalPrice}
        numberOfPositions={numberOfPositions}
      />
    </div>
  );
};

export default Constructor;
