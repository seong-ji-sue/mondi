export const wonComma = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const productStateToMessage = (state: number) => {
  switch (state) {
    case 1: return "모집중";
    case 2: return "모집예정";
    case 3: return "모집완료";
  }
  return "";
}

export const productStateToImgMessage = (state: number) => {
  switch (state) {
    case 2: return "오픈\n예정";
    case 3: return "마감";
  }
  return "";
}

export const productStateToButtonText = (state: number) => {
  switch (state) {
    case 1: return "참여하기";
    case 2: return "오픈예정";
    case 3: return "참여마감";
  }
  return "";
}

export const regionToregionName = (region: Client.IRegion) => {
  return `${region.regionDepth2.regionDepth1.name} ${region.regionDepth2.name} ${region.name}`;
};