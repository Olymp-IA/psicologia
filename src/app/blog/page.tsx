'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

// Posts de ejemplo (en producción vendrían del backend)
const posts = [
    {
        id: '1',
        slug: 'como-manejar-la-ansiedad',
        title: 'Cómo manejar la ansiedad en tiempos difíciles',
        excerpt: 'Descubre técnicas efectivas para gestionar la ansiedad y recuperar tu bienestar emocional. Te compartimos estrategias probadas que puedes aplicar hoy mismo.',
        category: 'Ansiedad',
        readTime: '5 min',
        date: '2024-01-15',
        image: '🧘',
    },
    {
        id: '2',
        slug: 'mejorar-comunicacion-pareja',
        title: 'Claves para mejorar la comunicación en pareja',
        excerpt: 'La comunicación efectiva es la base de una relación saludable. Aprende a expresar tus necesidades y escuchar a tu pareja de manera constructiva.',
        category: 'Pareja',
        readTime: '7 min',
        date: '2024-01-10',
        image: '💑',
    },
    {
        id: '3',
        slug: 'autoestima-saludable',
        title: 'Construyendo una autoestima saludable',
        excerpt: 'La autoestima influye en todas las áreas de nuestra vida. Descubre cómo fortalecer la relación contigo mismo y desarrollar una autoimagen positiva.',
        category: 'Desarrollo Personal',
        readTime: '6 min',
        date: '2024-01-05',
        image: '💚',
    },
    {
        id: '4',
        slug: 'superar-duelo',
        title: 'Cómo atravesar el proceso de duelo',
        excerpt: 'El duelo es un proceso natural ante las pérdidas. Conoce las etapas del duelo y herramientas para transitar este camino de manera saludable.',
        category: 'Duelo',
        readTime: '8 min',
        date: '2024-01-01',
        image: '🕊️',
    },
    {
        id: '5',
        slug: 'estres-laboral',
        title: 'Manejando el estrés laboral',
        excerpt: 'El burnout es cada vez más común. Aprende a identificar señales de estrés laboral y estrategias para encontrar un equilibrio saludable.',
        category: 'Estrés',
        readTime: '6 min',
        date: '2023-12-28',
        image: '💼',
    },
    {
        id: '6',
        slug: 'mindfulness-diario',
        title: 'Incorporando mindfulness en tu día a día',
        excerpt: 'El mindfulness no requiere horas de meditación. Descubre formas sencillas de practicar la atención plena en tu rutina diaria.',
        category: 'Mindfulness',
        readTime: '5 min',
        date: '2023-12-20',
        image: '🧠',
    },
];

const categories = ['Todos', 'Ansiedad', 'Pareja', 'Desarrollo Personal', 'Duelo', 'Estrés', 'Mindfulness'];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = React.useState('Todos');

    const filteredPosts = selectedCategory === 'Todos'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className={styles.badge}>Blog</span>
                        <h1 className={styles.title}>
                            Recursos para tu <span className="gradient-text">bienestar</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Artículos, consejos y herramientas para cuidar tu salud mental.
                            Información profesional y accesible para todos.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section className={styles.categoriesSection}>
                <div className={styles.container}>
                    <div className={styles.categories}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className={styles.posts}>
                <div className={styles.container}>
                    <div className={styles.postsGrid}>
                        {filteredPosts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                className={styles.postCard}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <div className={styles.postImage}>
                                    <span>{post.image}</span>
                                </div>
                                <div className={styles.postContent}>
                                    <div className={styles.postMeta}>
                                        <span className={styles.postCategory}>{post.category}</span>
                                        <span className={styles.postReadTime}>📖 {post.readTime}</span>
                                    </div>
                                    <h2 className={styles.postTitle}>{post.title}</h2>
                                    <p className={styles.postExcerpt}>{post.excerpt}</p>
                                    <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                                        Leer más →
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    {filteredPosts.length === 0 && (
                        <div className={styles.noPosts}>
                            <p>No hay artículos en esta categoría.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className={styles.newsletter}>
                <div className={styles.container}>
                    <motion.div
                        className={styles.newsletterCard}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3>📬 Suscríbete a nuestro newsletter</h3>
                        <p>Recibe artículos, consejos y recursos directamente en tu correo.</p>
                        <form className={styles.newsletterForm}>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                required
                            />
                            <button type="submit" className="btn btn-primary">
                                Suscribirse
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
