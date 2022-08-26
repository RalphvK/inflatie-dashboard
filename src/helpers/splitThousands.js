export function splitThousands(strNumber)
{
  let sectionCount = Math.floor(strNumber.length / 3);
  let firstSectionLength = strNumber.length - (sectionCount * 3);
  let sections = [];
  // get first section
  if (firstSectionLength > 0) {
    sections.push(strNumber.slice(0, firstSectionLength));
  }
  // get other sections and return
  strNumber = strNumber.slice(firstSectionLength);
  sections.push(...splitChunks(strNumber, 3));
  return sections;
}

function splitChunks(str, chunkLength = 3) {
  var chunks = [];
  for (var i = 0, charsLength = str.length; i < charsLength; i += chunkLength) {
      chunks.push(str.slice(i, i + chunkLength));
  }
  return chunks;
}