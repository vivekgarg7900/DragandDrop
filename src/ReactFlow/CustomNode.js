import {
  faAddressCard,
  faCoffee,
  faCopy,
  faGlobeEurope,
  faStar,
  faTrash,
  faVoicemail,
  faArrowAltCircleRight,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";
import "./Trigger.css";
import mapping_data from "./Data";

const d = {
  send_email: {
    icon: faStar,
  },
  send_sms: {
    icon: faCoffee,
  },
  send_push: {
    icon: faVoicemail,
  },
  enter_exit: {
    icon: faGlobeEurope,
  },
  specific_users: {
    icon: faAddressCard,
  },
};

const CustomNode = memo(({ data = {} }) => {
  const Handle = data?.Handle || null;
  const Position = data?.Position || null;

  const handleCopy = data?.copyElement || null;

  const mappeddata = mapping_data?.find(
    (x) => x?.type?.trim() === data?.label?.trim()
  );


  return (
    <div>
      <div>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => data?.setDeleteNodeId(data?.id)}
          style={{
            height: "auto",
            width: "12px",
            color: "#ffff",
            padding: "5px",
            borderRadius: "50%",
            backgroundColor: "#ff4d4d",
          }}
        />
        <FontAwesomeIcon
          icon={faCopy}
          onClick={() => data?.setCopyNodeId(data?.id)}
          style={{
            height: "auto",
            width: "12px",
            marginLeft: "5px",
            color: "white",
            padding: "5px",
            borderRadius: "50%",
            backgroundColor: "ThreeDFace",
          }}
        />
      </div>
      <div style={{ display: "flex" }}>
        <div
          className="Trigger"
          onDragOver={(event) => data?.onDrop(event, data)}
        >
          <FontAwesomeIcon
            icon={d[data.label].icon}
            style={{
              height: "auto",
              width: "24px",
              color: "#ffff",
              padding: "8px",
              borderRadius: "50%",
              marginLeft: "-29px",
              backgroundColor: "#1E90FF",
            }}
          />

          <div className="text">{data.label || data.type}</div>
          {Array(mappeddata?.handles?.left)
            ?.fill("")
            ?.map((_, index) => (
              <Handle
                type="target"
                position={Position?.Top}
                id={`target_${index.toString()}`}
                style={{ borderRadius: "50%", top: `10px` }}
              ></Handle>
            ))}

          {Array(mappeddata?.handles?.right)
            ?.fill("")
            ?.map((_, index) => (
              <div>
                <Handle
                  type="source"
                  position={Position?.Bottom}
                  id={mappeddata?.handleRightData[index]}
                  style={{
                    borderRadius: "50%",
                    top: `10`,
                    transform: `rotate(${
                      (180 / mappeddata?.right?.handles) * index
                    })`,
                  }}
                ></Handle>
              </div>
            ))}

          <div style={{display:"flex"}}>
            <div>
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              style={{
                height: "auto",
                width: "15px",
                marginLeft: "5px",
                color: "white",
                padding: "5px",
                borderRadius: "50%",
                backgroundColor: "green",
                marginLeft:"60px",
                position:"absolute",
                top:"50%"
              }}
            />
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
});

export default CustomNode;
