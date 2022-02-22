import {
  faAddressCard,
  faCoffee,
  faCopy,
  faGlobeEurope,
  faStar,
  faTrash,
  faVoicemail,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { memo } from "react";

import "./Trigger.css";

import mapping_data from "./Data";
import HandleCss from "./HandleCss";

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

  const filteredElementData = mapping_data?.find(
    (element) => element?.type?.trim() === data?.label?.trim()
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
          {Array(filteredElementData?.handles?.left)
            ?.fill("")
            ?.map((_, index) => (
              <Handle
                type="target"
                position={Position?.Top}
                id={`target_${index.toString()}`}
                style={{ borderRadius: "50%", top: `0%` }}
              />
            ))}

          {Array(filteredElementData?.handles?.right)
            ?.fill("")
            ?.map((_, index) => (
              <div>
                <Handle
                  type="source"
                  position={Position?.Bottom}
                  id={filteredElementData?.handleRightData[index]}
                  style={{
                    borderRadius: "50%",
                    top: `30%`,
                  }}
                />
              </div>
            ))}

          <div style={{ display: "flex" }}>
            <div>
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                style={{
                  height: "auto",
                  width: "15px",
                  color: "white",
                  padding: "5px",
                  borderRadius: "50%",
                  backgroundColor: "green",
                  marginLeft: "60px",
                  position: "absolute",
                  top: "27%",
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
