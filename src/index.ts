interface IStyle {
    fontSize?: string; // 字体大小
    fontFamily?: string; // 文字字体
    fontColor?: string; // 字体颜色
    logoWidth?: string | null; // logo宽度，默认图片的宽度
    logoHeight?: string | null; // logo高度，默认图片的高度
}

interface IOptions {
    imgArr: Array<string>; // 图片url，不支持跨域
    txt?: string; // 水印文字
    logo?: string; // 水印图片
    style?: IStyle; // 样式相关
}

const defaultOptions: IOptions = {
    imgArr: [],
    txt: '',
    logo: '',
    style: {
        fontSize: '14px',
        fontFamily: 'microsoft yahei',
        fontColor: '#333',
        logoWidth: null,
        logoHeight: null,
    },
};

class ImageWatermark {
    private imgArr: Array<string>;
    private txt: string | null | undefined;
    private logo: string | null;
    private style: {
        logoHeight?: string | null;
        fontFamily?: string;
        logoWidth?: string | null;
        fontSize?: string;
        fontColor?: string;
    };
    private ctx: HTMLCanvasElement | undefined;
    constructor(options: IOptions = defaultOptions) {
        this.imgArr = options.imgArr;
        this.txt = options.txt ?? '';
        this.logo = options.logo ?? null;
        this.style = {
            ...defaultOptions.style,
            ...(options?.style ?? {}),
        };
        this.init();
    }

    private init() {
        const self = this;
        self.ctx = document.createElement('canvas');
        self.imgArr.forEach((img) => {
            const [width, height] = self.getImgSize(img);
        });
    }

    private getImgSize(imgUrl: string): Array<number> {
        let _w = 0,
            _h = 0;
        const imgDom: HTMLImageElement = document.createElement('img');
        imgDom.onload = () => {
            _w = imgDom.width;
            _h = imgDom.height;
        };
        imgDom.src = imgUrl;

        return [_w, _h];
    }

    mark(): Array<any> {
        const self = this;
        return [];
    }
}

export default ImageWatermark;
