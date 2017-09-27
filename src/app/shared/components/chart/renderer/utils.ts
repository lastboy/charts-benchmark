export class ChartUtils {

  public static createChartElement(name, element, elementType: string = 'div') {

    if (elementType === 'canvas') {
      const html = `<${elementType} id="${name}" class="graph"></${elementType}>`;
      element.innerHTML = html;

      return element.querySelector(`[id='${name}']`);;
    } else {
      element.id = name ;
    }

    return element;
  }

  public static destroyChartElement(element) {

    element.innerHTML = "";

    return element;
  }


}
