import React from 'react'
import { useTheme } from '../hooks/useTheme';
import './Footer.css'

export default function Footer() {
  const {mode} = useTheme();
  return ( 
    <div className={`container-fluid footerStyle ${mode}`}>
       <div className='footerbrand'>BOOOK</div>
       <div className='footerbodystyle'>
        <div className='footertablestyle'>
          <table className='table table-borderless'>
            <thead>
                <tr>
                 <th scope="col" style={{width:'25%'}}>ادبیات ملل</th>
                 <th scope="col" style={{width:'25%'}}>جوایز ادبی</th>
                 <th scope="col" style={{width:'25%'}}>کتاب‌های برگزیده</th>
                 <th scope="col" style={{width:'25%'}}>دسته بندی موضوعات</th>
                </tr>
            </thead>
             <tbody>

                 <tr>
                 <td>ادبیات ایران</td>
                  <td>جایزه ادبیات نوبل</td>
                  <td style={{direction:'rtl'}}>۱۰۰۱ رمانی که قبل از مرگ بخوانید</td>
                  <td>ادبیات داستانی</td>
                  </tr>


                  <tr>
                  <td>ادبیات آمریکا</td>
                  <td>جایزه من بوکر</td>
                  <td>پر‌فروش‌های نیویورک تایمز</td>
                  <td>خودپروری</td>
                  </tr>

                  <tr>
                  <td >ادبیات فرانسه</td>
                  <td>جایزه پولیتزر داستان</td>
                  <td>برترین کتاب‌های خودپروری</td>
                  <td>روانشناسی</td>
                  </tr>

                  <tr>
                  <td >ادبیات ژاپن</td>
                  <td>جایزه گنکور</td>
                  <td>صد کتاب قرن لوموند</td>
                  <td>فلسفی</td>
                  </tr>

                  <tr>
                  <td>ادبیات روسیه </td>
                  <td>جایزه ایمپک دوبلین</td>
                  <td>برترین‌های گاردین</td>
                  <td>داستان کوتاه</td>
                  </tr>

                  <tr>
                  <td >ادبیات آلمان </td>
                  <td>حلقه منتقدین کتاب آمریکا</td>
                  <td>صد رمان مدرن لایبرری</td>
                  <td>ادبیات نمایشی</td>
                  </tr>

                  <tr>
                  <td >ادبیات انگلیس </td>
                  <td>جایزه هوشنگ گلشیری</td>
                  <td>برترین‌های انجمن کتاب نروژ</td>
                  <td>تاریخی</td>

                  </tr>


                  <tr style={{position:'relative',bottom:'5px'}}>
                  <td > ادبیات کانادا</td>
                  <td></td>
                  <td>برترین رمان‌های ادبیات نوجوان</td>
                  <td>سیاسی</td>
                  </tr>

                  <tr style={{position:'relative',bottom:'8px'}}>
                    <td></td>
                    <td></td>
                    <td>بیش‌ترین ترجمه شده‌ها</td>
                    <td>کتاب کودک</td>
                  </tr>

                  <tr style={{position:'relative',bottom:'20px'}}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>زبان اصلی</td>
                  </tr>
            </tbody>

          </table>

        </div>
        <div className='footertextbodystyle'>
          <div className='footertextstyle'>
            نئور، راهکار شما برای انتقال از زیرساخت نرم‌افزاری سنتی به دنیای مدرن دیجیتال است. با تمرکز بر نوآوری و بهینه‌سازی سیستم زیرساخت شما، از سرویس‌های ابری خود برای رشد کسب و کار خود به قله‌های جدید پیشرفت بهره ببرید. راهکار‌های دواپس نئور به طور مهندسی شده برای نیاز‌های شما طراحی شده اند تا در دنیای مدرن امروزی از تمامی قابلیت‌های مقیاس‌پذیری، امنیت اطلاعات و چابکی فرآیند بهره ببرید.
          </div>
          <div className='footerconnect'>
            <div className='telephoneicon'>
              <span>تلفن پشتیبانی</span>
              <i className="fa-solid fa-headset"></i>
            </div>
            <div className='phonebody'>
               <div className='phone'>
               ۰۲۱-۱۲۳۴۵۶۷۸
               </div>
               <hr style={{ width: '1px', height: '20px', backgroundColor: 'white', border: 'none',margin:'10px' }} />
               <div className='time'>
               شنبه تا چهارشنبه از ساعت ۹ تا ۱۸
               </div>

            </div>

          </div>
 
        </div>

       </div>
     
    </div>
  )
}
