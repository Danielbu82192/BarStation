using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DTOComandas
    {
        private int idComandas;
        private int cedulaCociUsu;
        private int cedulaCamaUsu;
        private int idEstado;
        private int idMesa;
        private string Comentario;
        private string estado;

        public DTOComandas(int idComandas, int cedulaCociUsu, int cedulaCamaUsu, int idEstado)
        {
            this.idComandas = idComandas;
            this.cedulaCociUsu = cedulaCociUsu;
            this.cedulaCamaUsu = cedulaCamaUsu;
            this.idEstado = idEstado;
        }

        public DTOComandas()
        {
        }
        public string getestado()
        {
            return estado;
        }
        public void setestado(string estado)
        {
            this.estado = estado;
        }
        public int getIdComandas()
        {
            return idComandas;
        }
        public void setComentario(string Comentario)
        {
            this.Comentario = Comentario;
        }
        public string getComentario()
        {
            return Comentario;
        }
        public void setidMesa(int idMesa)
        {
            this.idMesa = idMesa;
        }
        public int getidMesa()
        {
            return idMesa;
        }

        public void setIdComandas(int idComandas)
        {
            this.idComandas = idComandas;
        }

        public int getCedulaCociUsu()
        {
            return cedulaCociUsu;
        }

        public void setCedulaCociUsu(int cedulaCociUsu)
        {
            this.cedulaCociUsu = cedulaCociUsu;
        }

        public int getCedulaCamaUsu()
        {
            return cedulaCamaUsu;
        }

        public void setCedulaCamaUsu(int cedulaCamaUsu)
        {
            this.cedulaCamaUsu = cedulaCamaUsu;
        }

        public int getIdEstado()
        {
            return idEstado;
        }

        public void setIdEstado(int idEstado)
        {
            this.idEstado = idEstado;
        }
         
        public String[] convertirVector(List<DTOComandas> lista)
        {
            String[] ListArr = new String[lista.Count];
            for (int i = 0; i < lista.Count; i++)
            {
                DTOComandas coman = lista[i];
                ListArr[i] = coman.getIdComandas().ToString() + "|" + coman.getCedulaCamaUsu() + "|" + coman.getIdEstado().ToString() + "|" + coman.getidMesa().ToString();
            }
            return ListArr;
        }

        public String[] convertirVector1(List<DTOComandas> lista)
        {
            String[] ListArr = new String[lista.Count];
            for (int i = 0; i < lista.Count; i++)
            {
                DTOComandas coman = lista[i];
                ListArr[i] = coman.getIdComandas().ToString() + "|" +  coman.getIdEstado().ToString() + "|" + coman.getidMesa().ToString() + "|" + coman.getestado().ToString();
            }
            return ListArr;
        }
    }
}
