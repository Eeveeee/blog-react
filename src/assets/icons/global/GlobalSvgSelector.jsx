function GlobalSvgSelector({ id }) {
  switch (id) {
    case 'signIn':
      return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.1665 6.00016L6.99984 10.1668L11.1665 14.3335"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 10L17.5 10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'signOut':
      return (
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.5 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H7.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M13.3334 14.1663L17.5 9.99967L13.3334 5.83301"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 10H7.5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'google':
      return (
        <svg
          enableBackground="new 0 0 128 128"
          id="Social_Icons"
          version="1.1"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="_x31__stroke">
            <g id="Google">
              <rect
                clipRule="evenodd"
                fill="none"
                fillRule="evenodd"
                height="128"
                width="128"
              />
              <path
                clipRule="evenodd"
                d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648    C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"
                fill="#FBBC05"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16    C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"
                fill="#EA4335"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937    L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221    C80.964,99.86,73.689,101.818,65.457,101.818"
                fill="#34A853"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727    h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"
                fill="#4285F4"
                fillRule="evenodd"
              />
            </g>
          </g>
        </svg>
      );
    case 'edit':
      return (
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
          <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
        </svg>
      );
    case 'remove':
      return (
        <svg
          baseProfile="tiny"
          version="1.1"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g id="Guides__x26__Forms" />
          <g id="Icons">
            <g>
              <g>
                <g>
                  <polygon points="21,10 21,25 11,25 11,10 9,10 9,27 23,27 23,10     " />
                </g>
                <path d="M18,7V5h-4v2H8v2h16V7H18z" />
              </g>
            </g>
          </g>
        </svg>
      );
    case 'save':
      return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <polyline
            fill="none"
            points="17 21 17 13 7 13 7 21"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <polyline
            fill="none"
            points="7 3 7 8 15 8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      );
    case 'return':
      return (
        <svg
          id="return-back-redo-arrow"
          stroke="white"
          version="1.1"
          viewBox="0 0 15.207 10.854"
        >
          <path d="M11.707,0h-4v1h4c1.378,0,2.5,1.122,2.5,2.5S13.085,6,11.707,6H1.914l3.146-3.146L4.354,2.146L0,6.5l4.354,4.354  l0.707-0.707L1.914,7h9.793c1.93,0,3.5-1.57,3.5-3.5S13.637,0,11.707,0z" />
        </svg>
      );
    default:
      return null;
  }
}
export default GlobalSvgSelector;
