type TemplateValues<T extends string = string> = Record<T, boolean | number | string>;

function stringTemplate<T extends string = string>(template: string, values: TemplateValues<T>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key: keyof TemplateValues<T>) => {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      return String(values[key]);
    }
    return match;
  });
}

export default stringTemplate;
