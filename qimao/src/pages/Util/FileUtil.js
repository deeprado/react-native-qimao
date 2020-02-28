import RNFS from 'react-native-fs';

export function sortByLowerName(v1, v2) {
  var a = v1.lowerName;
  var b = v2.lowerName;
  var reg = /[0-9]+/g;
  var lista = a.match(reg);
  var listb = b.match(reg);
  if (!lista || !listb) {
    return a.localeCompare(b);
  }
  for (
    var i = 0, minLen = Math.min(lista.length, listb.length);
    i < minLen;
    i++
  ) {
    // 数字所在位置序号
    var indexa = a.indexOf(lista[i]);
    var indexb = b.indexOf(listb[i]);
    // 数字前面的前缀
    var prefixa = a.substring(0, indexa);
    var prefixb = b.substring(0, indexb);
    // 数字的string
    var stra = lista[i];
    var strb = listb[i];
    // 数字的值
    var numa = parseInt(stra);
    var numb = parseInt(strb);
    // 如果数字的序号不等或前缀不等，属于前缀不同的情况，直接比较
    if (indexa != indexb || prefixa != prefixb) {
      return a.localeCompare(b);
    } else {
      // 数字的string全等
      if (stra === strb) {
        // 如果是最后一个数字，比较数字的后缀
        if (i == minLen - 1) {
          return a.substring(indexa).localeCompare(b.substring(indexb));
        }
        // 如果不是最后一个数字，则循环跳转到下一个数字，并去掉前面相同的部分
        else {
          a = a.substring(indexa + stra.length);
          b = b.substring(indexa + stra.length);
        }
      }
      // 如果数字的string不全等，但值相等
      else if (numa == numb) {
        //直接比较数字前缀0的个数，多的更小
        return strb.lastIndexOf(numb + '') - stra.lastIndexOf(numa + '');
      } else {
        // 如果数字不等，直接比较数字大小
        return numa - numb;
      }
    }
  }
}

function commonCompare(v1, v2) {
  if (v1 === v2) {
    return 0;
  } else {
    return v1 < v2 ? -1 : 1;
  }
}

export function ksort(fileNames) {
  return fileNames.sort(function(a, b) {
    return commonCompare(a, b);
  });
}

export function statTotal(dirStats) {
  let dirTotal = 0;
  dirStats.map(function(item) {
    if (!item.isFile) {
      dirTotal += 1;
    }
  });
  return dirTotal;
}

export async function statDirs(rootPath) {
  console.log('rootPath', rootPath);
  let {dirStats, fileStats} = await this.parseDirs(rootPath);
  dirStats = dirStats.sort(this.sortByLowerName);
  let stats = await this.parseDirStats(rootPath, dirStats);
  return {
    fileStats,
    dirStats: stats,
  };
}

export async function parseDirStats(rootPath, dirStats) {
  let that = this;
  const promises = dirStats.map(async (item, idx) => {
    let fpath = rootPath + '/' + item.name;
    let res = await that.parseDirs(fpath);
    return {
      ...item,
      total: res.dirStats.length + res.fileStats.length,
    };
  });
  let stats = await Promise.all(promises);
  return stats;
}

export async function parseDirs(rootPath) {
  return await RNFS.readDir(rootPath)
    .then(result => {
      let dirStats = [];
      let fileStats = [];
      let dirNames = [];
      let txtReg = /\.(txt)$/i;
      let hideNameReg = /^\./i;

      result.map(function(item, index) {
        if (!hideNameReg.test(item.name)) {
          if (item.isDirectory()) {
            dirNames.push(item.name);
            dirStats.push({
              name: item.name,
              lowerName: item.name.toLowerCase(),
              isFile: false,
              type: 'dir',
              size: item.size,
              path: item.path,
            });
          }
          if (item.isFile() && txtReg.test(item.name)) {
            fileStats.push({
              name: item.name,
              lowerName: item.name.toLowerCase(),
              isFile: true,
              type: 'txt',
              size: item.size,
              path: item.path,
            });
          }
        }
      });

      return {
        dirNames,
        fileStats,
        dirStats,
      };
    })
    .catch(err => {
      console.log(err.message, err.code);

      return {
        dirNames: [],
        fileStats: [],
        dirStats: [],
      };
    });
}

export async function exists(rootPath) {
  return await RNFS.exists(rootPath);
}

export function basename(str) {
  var idx = str.lastIndexOf('/');
  idx = idx > -1 ? idx : str.lastIndexOf('\\');
  if (idx < 0) {
    return str;
  }
  return str.substring(0, idx + 1);
}
