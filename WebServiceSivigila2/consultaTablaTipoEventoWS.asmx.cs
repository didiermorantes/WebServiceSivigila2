using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

//usamos las siguientes librerias para la conexion a base de datos
using System.Data;
using System.Data.SqlClient;

//usaremos las siguientes librerias para seliarizar en json
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using Newtonsoft.Json;

namespace WebServiceSivigila2
{
    /// <summary>
    /// Descripción breve de consultaTablaTipoEventoWS
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class consultaTablaTipoEventoWS : System.Web.Services.WebService
    {

        [WebMethod]
        public string HelloWorld()
        {
            return "Hola a todos";
        }
        //Describimos el servicio
        [WebMethod(Description ="La consulta de la tablaTipoEvento retorna un JSON")]
        //indicamos la forma en que se retornarán los datos (JSON)
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        //retornamos un String
        public string GetData()
        {
            //creamos un objeto para conexión de bases de datos
            SqlConnection con = new SqlConnection();
            //String de Datos de conexión al servidor de bases de datos
            con.ConnectionString = "Data Source=DESKTOP-R3GF3UI; Initial Catalog=Sivigila; Persist Security Info=True;Integrated Security=SSPI;";
            //adaptador donde indico la consulta que quiero y el objeto de conexion
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM TablaTipoEvento", con);
            //creamos un data set que almacene la consulta que se pide a través del adaptador
            DataSet ds = new DataSet();
            //con el data adapter lleno el dataset
            da.Fill(ds);

            //LAS SIGUIENTES LINEAS SE USAN CUANDO SE QUIERE MOSTRAR UNA SERIALIZACION CORTA
            //creamos un objeto de tipo JavaSrciptSerializer que será la encargada de serializar nuestro objeto para retornarlo
            //JavaScriptSerializer js = new JavaScriptSerializer();

            //creamos una variable de tipo string denominada strJSON que se encargará de almacenar el dataset serializado
            //string strJSON = js.Serialize(ds);

            //es necesario instalar un paquete para que funcione JsonConvert
            //Tools->NuGet Package Manager -> Package Manager Console    -->> PM> Install-Package Newtonsoft.Json  -->> using Newtonsoft.Json;
            string strJSON = JsonConvert.SerializeObject(ds, Formatting.Indented);

          

            //retornamos el string que contiene el dataset serializado
            return strJSON;

            //el consumo del webservices lo hacemos en otro proyecto

        }

    }
}
