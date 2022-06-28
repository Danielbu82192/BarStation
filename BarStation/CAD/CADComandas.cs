using DTO;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CAD
{
    //Clase de logica de negocio de Comandas
    public class CADComandas
    {

        //Llamado a la conexion 
        MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["Con_BarStation"].ConnectionString);

        //Cargar todos los platos
        public List<DTOPlatos> CargarPlatos()
        {
            List<DTOPlatos> listPlatos = new List<DTOPlatos>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "SELECT * FROM `platos` WHERE idEstado=1 ";
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                DTOPlatos platos = new DTOPlatos();
                foreach (var item in dr)
                {
                    platos = new DTOPlatos();
                    platos.setIdPlato(int.Parse(dr["idPlato"].ToString()));
                    platos.setNombrePlato(dr["nombrePlato"].ToString());
                    platos.setPrecioPlato(int.Parse(dr["precioPlato"].ToString()));
                    listPlatos.Add(platos);
                }
                con.Close();
            }
            catch (Exception ex)
            {
                Console.Write("No conectado");
                con.Close();
            }
            return listPlatos;

        }

        public List<DTOComandas> CargarComandas()
        {
            List<DTOComandas> listPlatos = new List<DTOComandas>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "SELECT `idComandas`, `cedulaCociUsu`, `cedulaCamaUsu`, `idEstado`, `idMesa`,est.estadosCom FROM estados_comandas as est INNER JOIN `comandas` as cm on est.idEstadosCom=cm.idEstado inner JOIN mesa as ms on cm.idMesa=ms.idMesas";
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                DTOComandas comn = new DTOComandas();
                foreach (var item in dr)
                {
                    comn = new DTOComandas();
                    comn.setIdComandas(int.Parse(dr["idComandas"].ToString()));
                    comn.setestado(dr["estadosCom"].ToString());
                    comn.setIdEstado(int.Parse(dr["idEstado"].ToString()));
                    comn.setidMesa(int.Parse(dr["idMesa"].ToString()));
                    listPlatos.Add(comn);
                }
                con.Close();
            }
            catch (Exception ex)
            {
                Console.Write("No conectado");
                con.Close();
            }
            return listPlatos;

        }

        //Cargar el numero de mesas
        public int NumeroMesas()
        {
            int mensaje = 0;
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "SELECT count(*) AS 'Cantidad' FROM mesa ";
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                foreach (var item in dr)
                {
                    mensaje = int.Parse(dr["Cantidad"].ToString());
                }
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return mensaje;

        }

        //Buscar ultima comanda para traer el id de la dicha
        public int buscarultimaComanda()
        {
            int mensaje = 0;
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "SELECT count(*) AS 'Cantidad' FROM comandas ";
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                foreach (var item in dr)
                {
                    mensaje = int.Parse(dr["Cantidad"].ToString());
                }
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return mensaje + 1;
        }

        //Crear la comanda
        public int CrearComanda(DTOMesas DMesa, String Comentario)
        {
            int idComand = 0;
            try
            {
                idComand = buscarultimaComanda();
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "INSERT INTO `comandas` (`idComandas`, `cedulaCociUsu`, `cedulaCamaUsu`, `idEstado`, `idMesa`, `comentario`) " +
                    "VALUES ('" + idComand + "', NULL, (SELECT cedulaUsu FROM `usuarios` WHERE correoUsu='" + HttpContext.Current.Session["Usuario"].ToString() + "'), '5', '" + DMesa.getIdMesas() + "','"+ Comentario+"')";
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                int rows = cmd.ExecuteNonQuery();
                if (rows == 0) idComand = 0;
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return idComand;
        }

        //Crear la remacion de la comanda y los platos con la cantidad de cada plato 
        public int CrearComanda_platos(DTOPlatos plato, int id_comandas,int cant)
        {
            int id_plato= buscarIDplato(plato);
            int mensaje = 0;
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "INSERT INTO `platos_comandas` (`idPlato`, `idComanda`, `cantidad`) VALUES ('" + id_plato + "', '" + id_comandas + "','"+cant+"')";
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                mensaje = cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return mensaje;
        }

        //Buscarmos el id del plato por el nombre del mismo
        public int buscarIDplato (DTOPlatos plato)
        {
            int mensaje = 0;
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "SELECT idPlato FROM `platos` WHERE nombrePlato='"+plato.getNombrePlato()+"'";
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                foreach (var item in dr)
                {
                    mensaje = int.Parse(dr["idPlato"].ToString());
                }
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return mensaje;
        }
        
        //Modificamos el estado de la comanda y enviamos el usuario.
        public int ModificarEstdoComanda(int idComanda,int estado)
        {
            int idComand = 0;
            try
            {
                idComand = buscarultimaComanda();
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "UPDATE `comandas` SET `idEstado`='"+estado+ "',cedulaCociUsu=(SELECT cedulaUsu FROM `usuarios` WHERE correoUsu='" + HttpContext.Current.Session["Usuario"].ToString()+"') WHERE `idComandas`=" + idComanda;
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                int rows = cmd.ExecuteNonQuery();
                if (rows == 0) idComand = 0;
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return idComand;
        }

        public int EstdoComanda(int idComanda, int estado)
        {
            int idComand = 0;
            try
            {
                idComand = buscarultimaComanda();
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "UPDATE `comandas` SET `idEstado`='" + estado + "'  WHERE `idComandas`=" + idComanda;
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                int rows = cmd.ExecuteNonQuery();
                if (rows == 0) idComand = 0;
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return idComand;
        }
        //Modificar Comandas
        public int Modificar(int idComanda, int estado)
        {
            int idComand = 0;
            try
            {
                idComand = buscarultimaComanda();
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "UPDATE `comandas` SET `idEstado`='" + estado + "',cedulaCociUsu=(SELECT cedulaUsu FROM `usuarios` WHERE correoUsu='" + HttpContext.Current.Session["Usuario"].ToString() + "') WHERE `idComandas`=" + idComanda;
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                int rows = cmd.ExecuteNonQuery();
                if (rows == 0) idComand = 0;
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return idComand;
        }

        public int ActualizaComanda(DTOComandas comn)
        {
            int idComand = 0;
            try
            {
                idComand = buscarultimaComanda();
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "UPDATE `comandas` SET comentario='"+comn.getComentario()+"' WHERE `idComandas`=" + comn.getIdComandas();
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                int rows = cmd.ExecuteNonQuery();
                if (rows == 0) idComand = 0;
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return idComand;
        }

        public List<DTOPlatos> CargarUnaComanda(int idcomanda)
        {
            List<DTOPlatos> listPlatos = new List<DTOPlatos>();
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "SELECT pl.idPlato as 'ID', pl.nombrePlato as 'Nombre', pc.cantidad AS 'Cantidad' FROM `platos` as pl INNER JOIN platos_comandas as pc on pl.idPlato=pc.idPlato inner join comandas as cm on pc.idComanda=cm.idComandas WHERE cm.idComandas=" + idcomanda;
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                DTOPlatos comn = new DTOPlatos();
                foreach (var item in dr)
                {
                    comn = new DTOPlatos();
                    comn.setIdPlato(int.Parse(dr["ID"].ToString()));
                    comn.setNombrePlato(dr["Nombre"].ToString());
                    comn.setCantidad(int.Parse(dr["Cantidad"].ToString())); 
                    listPlatos.Add(comn);
                }
                con.Close();
            }
            catch (Exception ex)
            {
                Console.Write("No conectado");
                con.Close();
            }
            return listPlatos;
        }

        public string CargarComentario(int idComanda)
        {
            string comentario = "";
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "SELECT  `comentario` FROM `comandas` WHERE `idComandas`=" + idComanda;
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                MySqlDataReader dr = cmd.ExecuteReader();
                DTOPlatos comn = new DTOPlatos();
                foreach (var item in dr)
                { 
                    comentario=dr["comentario"].ToString(); 
                }
                con.Close();
            }
            catch (Exception ex)
            {
                Console.Write("No conectado");
                con.Close();
            }
            return comentario;

        }


        public int AgregarPlatoComanda(int idComanda, string idplato, int cant)
        { 
            int mensaje = 0;
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = "INSERT INTO `platos_comandas` (`idPlato`, `idComanda`, `cantidad`) VALUES ((SELECT `idPlato` FROM `platos` WHERE `nombrePlato`='" + idplato+"'), '"+idComanda+"', '"+cant+"')";
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                mensaje = cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return mensaje;
        }

        public int EliminarPlatoComanda(int idComanda, string idplato)
        {
            int mensaje = 0;
            try
            {
                MySqlCommand cmd = new MySqlCommand();
                cmd.Connection = con;
                cmd.CommandText = " DELETE FROM `platos_comandas` WHERE `idPlato`= (SELECT `idPlato` FROM `platos` WHERE `nombrePlato`= '" + idplato + "') AND `idComanda`='"+idComanda+"'";
                cmd.CommandType = System.Data.CommandType.Text;
                con.Open();
                mensaje = cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                con.Close();
            }
            return mensaje;
        }
    }
}
 