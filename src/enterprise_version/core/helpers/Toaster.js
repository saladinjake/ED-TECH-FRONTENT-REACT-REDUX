import React, { useState, useEffect } from "react";
// import toast, { useToaster } from "react-hot-toast";
import $ from "jquery";
import { toast, ToastBar, Toaster } from 'react-hot-toast';
// const Notifications = () => {
//   const { toasts, handlers } = useToaster();
//   const { zIndexTop, setHighestZIndex } = useState("");
//   const { startPause, endPause, calculateOffset, updateHeight } = handlers;
//   var maxZ = 9000000;

//   $(document).ready(function () {
//     var maxZ = Math.max.apply(
//       null,
//       $.map($("body *"), function (e, n) {
//         if ($(e).css("position") != "static")
//           return parseInt($(e).css("z-index")) || 1;
//       })
//     );
//   });

//   return (
//     <div
//       class="toast-note"
//       onMouseEnter={startPause}
//       onMouseLeave={endPause}
//     >
//       {toasts.map((toast) => {
//         console.log(toast);
//         const offset = calculateOffset(toast.id, {
//           reverseOrder: false,
//           margin: 8,
//         });
//         const ref = (el) => {
//           if (el && !toast.height) {
//             const height = el.getBoundingClientRect().height;
//             updateHeight(toast.id, height);
//           }
//         };
//         const bg = toast.type == "error" ? "red" : "green";
//         return (
//           <div
//             key={toast.id}
//             ref={ref}
//             className="card-box"
//             style={{
//               position: "absolute",
//               background: bg,
//               width: "300px",
//               fontSize: "20px",
//               margin: "10px",
//               padding: "20px",
//               color: "#fff",
//               zIndex: zIndexTop ,

//               transition: "all 0.5s ease-out",
//               opacity: toast.visible ? 1 : 0,
//               transform: `translateY(${offset}px)`,
//             }}
//           >
//             {toast.message}
//           </div>
//         );
//       })}
//     </div>
//   );
// };










function DismissableToast() {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button
                    className='p-1 rounded-full ring-primary-400 transition hover:bg-[#444] focus:outline-none focus-visible:ring'
                    onClick={() => toast.dismiss(t.id)}
                  >
                  close
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}

export default DismissableToast;
