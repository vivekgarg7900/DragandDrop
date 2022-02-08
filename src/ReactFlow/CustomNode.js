import { faAddressCard, faCoffee, faCopy, faGlobeEurope, faStar, faTrash, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import "./Trigger.css"
import mapping_data from './Data'

const d = {
  "send_email":
  {
    icon: faStar,

  },
  "send_sms": {
    icon: faCoffee,

  },
  "send_push": {
    icon: faVoicemail,

  },
  "enter_exit":
  {
    icon: faGlobeEurope
  },
  "specific_users": {
    icon: faAddressCard
  }
};


const CustomNode = memo(({ data = {} }) => {

  console.log(data, "data");

  const Handle = data?.Handle || null;
  const Position = data?.Position || null;
  const handleDelete = data?.removeElements || null;
  const handleCopy = data?.copyElement || null;
  const mappeddata = mapping_data?.find(
    (x) => x?.type?.trim() === data?.label?.trim()
  )
  console.log(mappeddata, "mapped adata")

 
  return (
    <div>
      <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete([data])} style={{ height: "auto", width: "12px", color: '#ffff', padding: '5px', borderRadius: '50%', backgroundColor: '#ff4d4d' }} />
      <FontAwesomeIcon icon={faCopy} onClick={(event) => handleCopy(data)} style={{ height: "auto", width: "12px", marginLeft: "5px", color: 'white', padding: '5px', borderRadius: '50%', backgroundColor: "ThreeDFace" }} />
       
      <div className='Trigger'>
        <FontAwesomeIcon icon={d[data.label].icon} style={{ height: "auto", width: "24px", color: '#ffff', padding: '8px', borderRadius: '50%', marginLeft: '-29px', backgroundColor: '#1E90FF' }} />
        
        <div className='text'>
          {data.label || data.type}
        </div>
        {/* <FontAwesomeIcon icon={faArrowAltCircleRight}  style={{ height: "auto", width: "15px", color: '#ffff', padding: '5px', borderRadius: '25%', backgroundColor: '#ff4d4d',marginLeft:"60px" }} /> */}
        {

          Array(mappeddata?.handles?.left)
            ?.fill("")
            ?.map((_, index) => (
              <Handle
                type="target"
                position={Position?.Left}
                id={`target_${index.toString()}`}
                style={{ borderRadius: "50%", top: `${(index) * 10}px` }}
                draggable
              >
                
              </Handle>

            ))

        }

        {
          
          Array(mappeddata?.handles?.right)
            ?.fill("")
            ?.map((_, index) => (
              <Handle

                type="source"
                position={Position?.Right}
                id={mappeddata?.handleRightData[index]}
                style={{ borderRadius: "0", top: `${(index) * 30}%` }}
                
                className='handlecss'

              >
                
                
              </Handle>

            ))
        }
      </div>





    </div>
  );
});

export default CustomNode;