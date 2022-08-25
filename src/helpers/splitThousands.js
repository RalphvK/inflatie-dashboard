export function splitThousands(strNumber)
{
  let sectionCount = Math.floor(strNumber.length / 3);
  let firstSectionLength = strNumber.length - (sectionCount * 3);
  // get first section
  let firstSection = strNumber.slice(0, firstSectionLength);
  // get other sections
  strNumber = strNumber.slice(firstSectionLength);
  let otherSections = splitChunks(strNumber, 3);
  // return array of sections
  return [
    firstSection,
    ...otherSections
  ]
}

function splitChunks(str, chunkLength = 3) {
  var chunks = [];
  for (var i = 0, charsLength = str.length; i < charsLength; i += chunkLength) {
      chunks.push(str.slice(i, i + chunkLength));
  }
  return chunks;
}