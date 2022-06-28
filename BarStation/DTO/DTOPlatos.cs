using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DTOPlatos
    {
        private int idPlato;
        private String nombrePlato;
        private int precioPlato;
        private int idEstado;
        private String estado;
        private int cantidad;

        public DTOPlatos()
        {
        }

        public DTOPlatos(int idPlato, String nombrePlato, int precioPlato, string estado)
        {
            this.idPlato = idPlato;
            this.nombrePlato = nombrePlato;
            this.precioPlato = precioPlato;
            this.estado = estado;
        }
        public DTOPlatos(int idPlato, String nombrePlato, int precioPlato, int idEstado)
        {
            this.idPlato = idPlato;
            this.nombrePlato = nombrePlato;
            this.precioPlato = precioPlato;
            this.idEstado = idEstado;
        }
        public int getCantidad()
        {
            return cantidad;
        }
        public void setCantidad(int cantidad)
        {
            this.cantidad = cantidad;
        }

        /**
         * @return the idPlato
         */
        public String getEstado()
        {
            return estado;
        }
        /**
         * @param idPlato the idPlato to set
         */
        public void setEstado(String estado)
        {
            this.estado = estado;
        }

        /**
         * @return the idPlato
         */
        public int getIdPlato()
        {
            return idPlato;
        }

        /**
         * @param idPlato the idPlato to set
         */
        public void setIdPlato(int idPlato)
        {
            this.idPlato = idPlato;
        }

        /**
         * @return the nombrePlato
         */
        public String getNombrePlato()
        {
            return nombrePlato;
        }

        /**
         * @param nombrePlato the nombrePlato to set
         */
        public void setNombrePlato(String nombrePlato)
        {
            this.nombrePlato = nombrePlato;
        }

        /**
         * @return the precioPlato
         */
        public int getPrecioPlato()
        {
            return precioPlato;
        }

        /**
         * @param precioPlato the precioPlato to set
         */
        public void setPrecioPlato(int precioPlato)
        {
            this.precioPlato = precioPlato;
        }

        /**
         * @return the idEstado
         */
        public int getIdEstado()
        {
            return idEstado;
        }

        /**
         * @param idEstado the idEstado to set
         */
        public void setIdEstado(int idEstado)
        {
            this.idEstado = idEstado;
        }

        public String[] ConvertVector(List<DTOPlatos> listPlatos)
        {
            String[] ListArr = new String[listPlatos.Count];
            for(int i = 0; i < listPlatos.Count; i++) {
                DTOPlatos plato = listPlatos[i];
                ListArr[i] = plato.getIdPlato().ToString()+"|"+ plato.getNombrePlato() + "|" + plato.getPrecioPlato().ToString();             
            }
            return ListArr;
        }
        public String[] ConvertVector2(List<DTOPlatos> listPlatos)
        {
            String[] ListArr = new String[listPlatos.Count];
            for (int i = 0; i < listPlatos.Count; i++)
            {
                DTOPlatos plato = listPlatos[i];
                ListArr[i] = plato.getIdPlato().ToString() + "|" + plato.getNombrePlato() + "|" + plato.getPrecioPlato().ToString() + "|" + plato.getEstado().ToString();
            }
            return ListArr;
        }

        public String[] ConvertVector3(List<DTOPlatos> listPlatos)
        {
            String[] ListArr = new String[listPlatos.Count];
            for (int i = 0; i < listPlatos.Count; i++)
            {
                DTOPlatos plato = listPlatos[i];
                ListArr[i] = plato.getNombrePlato().ToString() + "|" + plato.getCantidad();
            }
            return ListArr;
        }

        public String[] ConvertVector4(List<DTOPlatos> listPlatos)
        {
            String[] ListArr = new String[listPlatos.Count];
            for (int i = 0; i < listPlatos.Count; i++)
            {
                DTOPlatos plato = listPlatos[i];
                ListArr[i] = plato.getNombrePlato() + "|" + plato.getNombrePlato().ToString() + "|" + plato.getCantidad();
            }
            return ListArr;
        }
    }
}
