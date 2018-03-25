package com.itrjp.framework.common.utils;

import org.apache.log4j.Logger;

import java.io.*;
import java.lang.reflect.Array;
import java.net.InetAddress;
import java.net.URLDecoder;
import java.net.UnknownHostException;
import java.util.*;

/**
 * 工具类
 *
 * @author 孙少平
 * @date 2015年5月22日
 */
public abstract class HelpUtils {

    private static Logger log = Logger.getLogger(HelpUtils.class);

    /**
     * 大写字母
     */
    private static Set<Character> capital = new HashSet<Character>();
    /**
     * 小写字母
     */
    private static Set<Character> lowercase = new HashSet<Character>();

    static {
        for (int i = 0; i < 26; i++) {
            capital.add(new Character((char) ('A' + i)));
            lowercase.add(new Character((char) ('a' + i)));
        }
    }

    /**
     * 返回大写字母
     *
     * @return
     * @author 孙少平
     * @date 2015年8月13日
     */
    public static Set<Character> getCapital() {
        return capital;
    }

    /**
     * 返回小写字母
     *
     * @return
     * @author 孙少平
     * @date 2015年8月13日
     */
    public static Set<Character> getLowercase() {
        return lowercase;
    }

    public static String toTransferredStr(String str) throws Exception {
        if (isNotEmpty(str)) {
            return URLDecoder.decode(str, "UTF-8").replaceAll("%2F", "/");
        }
        return null;
    }

    /**
     * 支持 String 数组 Collection 判空，如果为空返回true否则返回false
     *
     * @param obj
     * @return
     * @author 孙少平
     * @date 2015年3月23日
     */
    @SuppressWarnings("rawtypes")
    public static boolean isEmpty(Object obj) {
        if (obj == null) {
            return true;
        }
        if (obj.getClass().isArray()) {
            return Array.getLength(obj) == 0;
        }
        if (obj instanceof CharSequence) {
            return ((CharSequence) obj).length() == 0;
        }
        if (obj instanceof Collection) {
            return ((Collection) obj).isEmpty();
        }
        if (obj instanceof Map) {
            return ((Map) obj).isEmpty();
        }
        return false;
    }

    /**
     * 判断是否不是空
     *
     * @param obj 判断空对象
     * @return 空的情况下返回 false，是空的情况下 返回true
     */
    public static boolean isNotEmpty(Object obj) {
        return !isEmpty(obj);
    }

    /**
     * 创建类的实例
     *
     * @param clazz
     * @param className
     * @return
     * @author 孙少平
     * @date 2015年5月22日
     */
    public static <T> T instance(Class<T> clazz, String className) {
        return clazz.cast(instance(className));

    }

    public static Object instance(String className) {
        try {
            return Class.forName(className).newInstance();
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    /**
     * 创建实例
     *
     * @param clazz
     * @return
     * @author 孙少平
     * @date 2015年5月23日
     */
    public static <T> T instance(Class<T> clazz) {
        return instance(clazz, clazz.getName());
    }

    /**
     * 深层克隆
     *
     * @param obj
     * @return
     * @author 孙少平
     * @date 2015年5月25日
     */
    @SuppressWarnings("unchecked")
    public static <T extends Serializable> T deepClone(Serializable obj) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            new ObjectOutputStream(baos).writeObject(obj);
            return (T) new ObjectInputStream(new ByteArrayInputStream(baos.toByteArray())).readObject();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * 返回服务器ip地址
     *
     * @return
     * @author 孙少平
     * @date 2015年6月17日
     */
    public static String getIpAddress() {
        try {
            InetAddress address = InetAddress.getLocalHost();
            return address.getHostAddress();
        } catch (UnknownHostException e) {
            log.error(e.getMessage(), e);
            throw new RuntimeException(e);
        }
    }

    public static String getUUID() {
        return getUUID(UUID.randomUUID());
    }

    /**
     * 返回大写的uuid,长度32(81BE245897EA47329E685259FEB2D784)
     *
     * @return
     * @author 孙少平
     * @date 2015年12月12日
     */
    public static String getUUID(UUID uuid) {
        StringBuilder sb = new StringBuilder();
        sb.append(digits(uuid.getMostSignificantBits() >> 32, 8));
        sb.append(digits(uuid.getMostSignificantBits() >> 16, 4));
        sb.append(digits(uuid.getMostSignificantBits(), 4));
        sb.append(digits(uuid.getLeastSignificantBits() >> 48, 4));
        sb.append(digits(uuid.getLeastSignificantBits(), 12));
        return sb.toString();
    }

    /**
     * Returns val represented by the specified number of hex digits.
     */
    private static String digits(long val, int digits) {
        long hi = 1L << (digits * 4);
        return Long.toHexString(hi | (val & (hi - 1))).substring(1).toUpperCase();
    }

    /**
     * 关闭资源
     *
     * @param resource
     * @author 孙少平
     * @date 2016年1月7日
     */
    public static void close(AutoCloseable resource) {
        if (!isEmpty(resource)) {
            try {
                resource.close();
            } catch (Exception e) {
                log.error(e.getMessage(), e);
                throw new RuntimeException(e);
            }
        }
    }

    /*public static String getPYIndexStr(String strChinese, boolean bUpCase) {
        try {
            StringBuffer buffer = new StringBuffer();
            byte b[] = strChinese.getBytes("GBK");//把中文转化成byte数组
            for (int i = 0; i < 1; i++) {
                if ((b[i] & 255) > 128) {
                    int char1 = b[i++] & 255;
                    char1 <<= 8;//左移运算符用“<<”表示，是将运算符左边的对象，向左移动运算符右边指定的位数，并且在低位补零。其实，向左移n位，就相当于乘上2的n次方
                    int chart = char1 + (b[i] & 255);
                    buffer.append(getPYIndexChar((char) chart, bUpCase));
                    continue;
                }
                char c = (char) b[i];
                if (!Character.isJavaIdentifierPart(c))//确定指定字符是否可以是 Java 标识符中首字符以外的部分。
                    c = 'A';
                buffer.append(c);
            }
            return buffer.toString();
        } catch (Exception e) {
            System.out.println((new StringBuilder()).append("\u53D6\u4E2D\u6587\u62FC\u97F3\u6709\u9519").append(e.getMessage()).toString());
        }
        return null;
    }*/

    /**
     * 得到首字母
     *
     * @param strChinese
     * @param bUpCase
     * @return
     */
    public static String getPYIndexChar(int strChinese, boolean bUpCase) {
        int charGBK = strChinese;
        String result;
        if ((charGBK & 255) <= 128) {
            return String.valueOf((char) charGBK).toUpperCase();
        }
        if (charGBK >= 45217 && charGBK <= 45252)
            result = "A";
        else if (charGBK >= 45253 && charGBK <= 45760)
            result = "B";
        else if (charGBK >= 45761 && charGBK <= 46317)
            result = "C";
        else if (charGBK >= 46318 && charGBK <= 46825)
            result = "D";
        else if (charGBK >= 46826 && charGBK <= 47009)
            result = "E";
        else if (charGBK >= 47010 && charGBK <= 47296)
            result = "F";
        else if (charGBK >= 47297 && charGBK <= 47613)
            result = "G";
        else if (charGBK >= 47614 && charGBK <= 48118)
            result = "H";
        else if (charGBK >= 48119 && charGBK <= 49061)
            result = "J";
        else if (charGBK >= 49062 && charGBK <= 49323)
            result = "K";
        else if (charGBK >= 49324 && charGBK <= 49895)
            result = "L";
        else if (charGBK >= 49896 && charGBK <= 50370)
            result = "M";
        else if (charGBK >= 50371 && charGBK <= 50613)
            result = "N";
        else if (charGBK >= 50614 && charGBK <= 50621)
            result = "O";
        else if (charGBK >= 50622 && charGBK <= 50905)
            result = "P";
        else if (charGBK >= 50906 && charGBK <= 51386)
            result = "Q";
        else if (charGBK >= 51387 && charGBK <= 51445)
            result = "R";
        else if (charGBK >= 51446 && charGBK <= 52217)
            result = "S";
        else if (charGBK >= 52218 && charGBK <= 52697)
            result = "T";
        else if (charGBK >= 52698 && charGBK <= 52979)
            result = "W";
        else if (charGBK >= 52980 && charGBK <= 53688)
            result = "X";
        else if (charGBK >= 53689 && charGBK <= 54480)
            result = "Y";
        else if (charGBK >= 54481 && charGBK <= 55289)
            result = "Z";
        else
            result = "1";
        if (!bUpCase)
            result = result.toLowerCase();
        return result;
    }

    public static List<String> getAtoZList() {
        List<String> list = new ArrayList<>();
        for (char c = 65; c <= 90; c++) {
            list.add(String.valueOf(c));
        }
        return list;
    }

    /**
     * @Author liyunhe
     * @Date 2017/11/8 13:55
     * @DEC 判断字符串是否为数字
     */
    public static boolean isNumeric(String str) {
        try {
            Integer.parseInt(str);
            return true;
        } catch (NumberFormatException e) {
            System.out.println("异常：\"" + str + "\"不是数字/整数...");
            return false;
        }
    }
}
